import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { buildPhysical3DTray, createAuthenticMoxaTexture, createMoxaEmberTexture, updateTrayToolAvailability } from './physicalTray';
import { getAllowedToolsForPoint, getClinicalOutcome, CLINICAL_TOOLS, CLINICAL_ACUPOINTS } from './acupointsData';
import { ArrowLeft } from 'lucide-react';
import { 
  Sparkles, 
  RotateCcw, 
  Zap, 
  Layers, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  ShieldCheck,
  Flame,
  CircleDot
} from 'lucide-react';

export default function SkinLayersPip({
  activeTool = 'needle', // 'needle', 'cup', 'moxa'
  depth = 0,
  maxDepth = 15.0,
  targetDepth = 12.0,
  pointCode = 'PC-6',
  pointName = 'Inner Gate',
  painName = 'Spastic Motor Endplate Knot',
  isDisintegrated = false,
  isSnapping = false,
  onDepthChange,
  onReset,
  onClose,
  isMuted = false,
  playAcuSound,
  embedded = false,
  fullStage = false,
  onBackToBody = null,
  onSelectTool = null,
  className = ''
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animIdRef = useRef(null);

  // 3D Objects in Skin Layers Scene
  const needleGroupRef = useRef(null);
  const cupGroupRef = useRef(null);
  const moxaGroupRef = useRef(null);
  const knotMeshRef = useRef(null);
  const knotBadgeRef = useRef(null);
  const adhesionMeshRef = useRef(null);
  const adhesionBadgeRef = useRef(null);
  const stasisMeshRef = useRef(null);
  const stasisBadgeRef = useRef(null);
  const particlesRef = useRef(null);
  const thermalLightRef = useRef(null);
  const trayToolHitboxesRef = useRef([]);
  const trayHaloMeshesRef = useRef({});
  const trayLabelSpritesRef = useRef({});
  const onSelectToolRef = useRef(null);
  onSelectToolRef.current = onSelectTool;
  const depthRef = useRef(depth);
  depthRef.current = depth;
  const onDepthChangeRef = useRef(onDepthChange);
  onDepthChangeRef.current = onDepthChange;
  const activeToolRef = useRef(activeTool);
  activeToolRef.current = activeTool;
  const suctionBulgeRef = useRef(null);
  const bulgeMatRef = useRef(null);
  const erythemaRingRef = useRef(null);
  const traySlotsRef = useRef(null);

  const currentPoint = CLINICAL_ACUPOINTS.find(p => p.code === pointCode) || {
    code: pointCode,
    translation: pointName,
    painName: painName,
    region: 'arm_left'
  };
  const allowedTools = getAllowedToolsForPoint(currentPoint);
  const allowedToolIds = allowedTools.map(t => t.id);
  const clinicalOutcome = getClinicalOutcome(activeTool, currentPoint);
  const allowedToolIdsRef = useRef(allowedToolIds);
  allowedToolIdsRef.current = allowedToolIds;

  const [isMinimized, setIsMinimized] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);

  // Determine active stratum layer name from current depth
  const getStratumInfo = (d) => {
    if (activeTool === 'needle') {
      if (d < 1.5) return { name: 'Epidermis', sub: 'Keratinized Stratum Basale', color: '#f43f5e', num: 1 };
      if (d < 5.0) return { name: 'Dermis', sub: 'Vascular & Nerve Plexus', color: '#ec4899', num: 2 };
      if (d < 9.5) return { name: 'Subcutaneous Adipose', sub: 'Adipocyte Fat Matrix', color: '#f59e0b', num: 3 };
      if (d < 12.0) return { name: 'Deep Fascia', sub: 'Dense Epimysial Sheath', color: '#8b5cf6', num: 4 };
      return { name: 'Striated Muscle', sub: 'Motor Knot Trigger Point', color: '#10b981', num: 5 };
    } else if (activeTool === 'cup') {
      if (d < 2.0) return { name: 'Epidermal Seal', sub: 'Glass Suction Contact', color: '#38bdf8', num: 1 };
      if (d < 4.0) return { name: 'Fascial Decompression', sub: 'Lifting Tangled Fibers', color: '#818cf8', num: 2 };
      return { name: 'Microvascular Surge', sub: '+380% Hyperemic Oxygenation', color: '#a855f7', num: 3 };
    } else {
      if (d < 38.0) return { name: 'Infrared Radiance', sub: 'Stratum Warming (38°C)', color: '#fb923c', num: 1 };
      if (d < 41.0) return { name: 'Dermal Dispersion', sub: 'Capillary Vasodilation (41°C)', color: '#f97316', num: 2 };
      return { name: 'Deep Thermal De-Qi', sub: 'Cold Stasis Dispelled (43°C)', color: '#ea580c', num: 3 };
    }
  };

  const stratum = getStratumInfo(depth);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const getContainerDims = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(container.clientWidth || rect.width || window.innerWidth, 320);
      const h = Math.max(container.clientHeight || rect.height || (container.parentElement ? container.parentElement.clientHeight : 600), 320);
      return { w, h };
    };
    const { w: initW, h: initH } = getContainerDims();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, initW / initH, 0.1, 50);
    if (fullStage) {
      camera.position.set(0.18, 1.62, 3.10);
      camera.lookAt(0.18, 0.28, 0.15);
    } else {
      camera.position.set(2.0, 1.4, 2.2);
      camera.lookAt(0, 0.05, 0);
    }
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxDistance = 6.0;
    controls.minDistance = 0.8;
    controls.target.set(fullStage ? 0.18 : 0, fullStage ? 0.28 : 0.05, fullStage ? 0.15 : 0);
    controlsRef.current = controls;

    // 2. Studio Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(3, 5, 3.5);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const fillLight = new THREE.DirectionalLight(0xffe4e6, 0.7);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const thermalLight = new THREE.PointLight(0xff6b00, 0.0, 3.0);
    thermalLight.position.set(0, 0.5, 0);
    scene.add(thermalLight);
    thermalLightRef.current = thermalLight;

    // 3. Load Meshy AI Skin Layers GLB Model
    const skinGroup = new THREE.Group();
    if (fullStage) {
      skinGroup.position.set(-0.38, -0.05, 0.0);
    }
    scene.add(skinGroup);

    const loader = new GLTFLoader();
    const modelUrl = `${import.meta.env.BASE_URL}models/skin_layers.glb`;

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;

        // Auto-center and normalize size
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const normScale = (fullStage ? 1.38 : 1.35) / maxDim;
        model.scale.setScalar(normScale);

        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center.multiplyScalar(normScale));
        model.position.y += 0.02; // Fine tune height

        // Enable shadows on meshes
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.roughness = Math.max(child.material.roughness || 0.4, 0.35);
            }
          }
        });

        skinGroup.add(model);
        setModelLoading(false);
      },
      undefined,
      (err) => {
        console.error('Failed to load skin_layers.glb in PiP:', err);
        setModelLoading(false);
      }
    );

    // 4. Surgical 3D Tools Operating Flush on Top of the Skin Model
    const offsetX = fullStage ? -0.38 : 0.0;
    const skinSurfaceY = 0.550; // Exact top skin surface height of skin_layers.glb!

    // Helper: 3D Pathology Callout Badge on Cut Strata Face
    const createPathologyBadge = (title, subtitle, colorHex) => {
      const canvas = document.createElement('canvas');
      canvas.width = 340;
      canvas.height = 80;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
      ctx.strokeStyle = colorHex;
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(4, 4, 332, 72, 14);
      else ctx.rect(4, 4, 332, 72);
      ctx.fill();
      ctx.stroke();

      // Left warning indicator dot
      ctx.fillStyle = colorHex;
      ctx.beginPath();
      ctx.arc(28, 40, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(28, 40, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Primary title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(title, 48, 34);

      // Subtitle
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(subtitle, 48, 54);

      const tex = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: tex, depthTest: false, depthWrite: false });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.40, 0.095, 1.0);
      return sprite;
    };

    // A. 3D Needle Assembly (Operates along the visible front cut face at z = 0.410)
    const needleAssembly = new THREE.Group();
    needleAssembly.position.set(offsetX, skinSurfaceY, 0.410);
    scene.add(needleAssembly);
    needleGroupRef.current = needleAssembly;

    // Stainless steel needle shaft (0.18mm hair-thin aesthetic)
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.95,
      roughness: 0.12
    });
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.70, 16), shaftMat);
    shaft.position.y = 0.35;
    shaft.castShadow = true;
    needleAssembly.add(shaft);

    // Conical bevel needle tip (tip points down at y = 0)
    const tipMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.98, roughness: 0.08 });
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.007, 0.035, 16), tipMat);
    tip.rotation.x = Math.PI;
    tip.position.y = 0.0175;
    needleAssembly.add(tip);

    // Translucent guide tube
    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.38,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.02
    });
    const guideTube = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.38, 20), tubeMat);
    guideTube.position.y = 0.48;
    needleAssembly.add(guideTube);

    // Copper coiled needle handle
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.25 });
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.14, 16), handleMat);
    handle.position.y = 0.77;
    needleAssembly.add(handle);

    // B. Traditional Thick Molded Glass Fire Cupping Jar
    // Crystal-clear borosilicate glass with thick rolled rim, spherical suction chamber & flat top base
    const cupGroup = new THREE.Group();
    cupGroup.position.set(offsetX, skinSurfaceY, 0.360);
    cupGroup.visible = false;
    scene.add(cupGroup);
    cupGroupRef.current = cupGroup;

    // Crystal-Clear Borosilicate Fire Cupping Glass (Transmission = 0.96)
    const realGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      opacity: 1.0,
      transparent: true,
      roughness: 0.04,
      metalness: 0.02,
      ior: 1.52,
      thickness: 0.16,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    // 1. Thick Smooth Rolled Glass Lip Rim (Seals firmly on skin surface)
    const cupRim = new THREE.Mesh(new THREE.TorusGeometry(0.145, 0.016, 28, 48), realGlassMat);
    cupRim.rotation.x = Math.PI / 2;
    cupRim.position.y = 0.016;
    cupGroup.add(cupRim);

    // 1b. Specular Rim Highlight Glint
    const rimHighlight = new THREE.Mesh(
      new THREE.TorusGeometry(0.145, 0.003, 16, 36),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.02, metalness: 0.95 })
    );
    rimHighlight.rotation.x = Math.PI / 2;
    rimHighlight.position.y = 0.016;
    cupGroup.add(rimHighlight);

    // 2. Bulbous Spherical Glass Suction Chamber (Translucent Globe Jar matching real fire cupping)
    const cupGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(0.148, 36, 28, 0, Math.PI * 2, 0.22, Math.PI * 0.76),
      realGlassMat
    );
    cupGlobe.rotation.x = Math.PI;
    cupGlobe.position.y = 0.235;
    cupGroup.add(cupGlobe);

    // 3. Molded Anti-Slip Glass Finger Grip Grooves (Left and Right)
    const gripL = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.048, 0.038), realGlassMat);
    gripL.position.set(-0.138, 0.110, 0);
    cupGroup.add(gripL);
    const gripR = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.048, 0.038), realGlassMat);
    gripR.position.set(0.138, 0.110, 0);
    cupGroup.add(gripR);

    // 4. Flat Circular Top Standing Base with Molded Thumb Recess (Fire-Cup hallmark)
    const glassTopBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.075, 0.022, 32),
      realGlassMat
    );
    glassTopBase.position.y = 0.246;
    cupGroup.add(glassTopBase);

    // 5. Authentic Organic Flesh Suction Mound inside the Cup
    // Dynamic skin dome: bulges upward into the glass chamber as negative pressure intensifies
    const bulgeMat = new THREE.MeshStandardMaterial({
      color: 0xf5d0c0, // Natural skin tone initially
      roughness: 0.22,
      metalness: 0.04
    });
    bulgeMatRef.current = bulgeMat;

    const suctionBulgeGeo = new THREE.SphereGeometry(0.140, 36, 28, 0, Math.PI * 2, 0, Math.PI / 2);
    const suctionBulge = new THREE.Mesh(suctionBulgeGeo, bulgeMat);
    suctionBulge.position.y = 0.0;
    suctionBulge.scale.set(1.0, 0.02, 1.0);
    cupGroup.add(suctionBulge);
    suctionBulgeRef.current = suctionBulge;

    // 6. Circular Petechial Hyperemic Ring on Skin Surface (Erythema suction footprint)
    const erythemaRing = new THREE.Mesh(
      new THREE.RingGeometry(0.125, 0.155, 36),
      new THREE.MeshBasicMaterial({ color: 0x9f1239, transparent: true, opacity: 0.0, side: THREE.DoubleSide })
    );
    erythemaRing.rotation.x = -Math.PI / 2;
    erythemaRing.position.y = 0.002;
    cupGroup.add(erythemaRing);
    erythemaRingRef.current = erythemaRing;

    // C. Authentic Chinese Artemisia Moxa Warmer (Hovers above skin at y = 0.670, z = 0.400)
    // NOT a cigarette! Xuan rice paper, gold foil bands, emerald header, cinnabar seal & dark ash tip
    const moxaGroup = new THREE.Group();
    moxaGroup.position.set(offsetX, 0.670, 0.400);
    moxaGroup.visible = (activeTool === 'moxa');
    scene.add(moxaGroup);
    moxaGroupRef.current = moxaGroup;

    // Ensure initial tool visibilities match activeTool prop on mount
    if (needleGroupRef.current) needleGroupRef.current.visible = (activeTool === 'needle');
    if (cupGroupRef.current) cupGroupRef.current.visible = (activeTool === 'cup');

    // 1. Moxa Roll Body with Artisanal Xuan Rice Paper & Gold Calligraphy Texture
    const moxaTex = createAuthenticMoxaTexture();
    const moxaPaperMat = new THREE.MeshStandardMaterial({
      map: moxaTex,
      roughness: 0.75,
      metalness: 0.15
    });
    const moxaBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 0.28, 24),
      moxaPaperMat
    );
    moxaBody.position.y = 0.14;
    moxaGroup.add(moxaBody);

    // 2. Burning Ash Ember Tip with Radial Incandescent Glowing Fissures
    const emberTex = createMoxaEmberTexture();
    const emberMat = new THREE.MeshStandardMaterial({
      map: emberTex,
      color: 0xff3b00,
      emissive: 0xff2200,
      emissiveIntensity: 2.2,
      roughness: 0.35
    });
    const ember = new THREE.Mesh(
      new THREE.CylinderGeometry(0.036, 0.038, 0.035, 24),
      emberMat
    );
    ember.position.y = 0.0;
    moxaGroup.add(ember);

    // 3. Turned Dark Walnut Wood Handle Cap on Rear End (Eliminates cigarette look!)
    const woodCapMat = new THREE.MeshStandardMaterial({
      color: 0x27170e,
      roughness: 0.35,
      metalness: 0.1
    });
    const woodCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.040, 0.040, 0.032, 24),
      woodCapMat
    );
    woodCap.position.y = 0.296;
    moxaGroup.add(woodCap);

    // Polished brass ferrule ring
    const ferrule = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0405, 0.0405, 0.008, 24),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.2 })
    );
    ferrule.position.y = 0.280;
    moxaGroup.add(ferrule);

    // Concentric thermal infrared radiation ring
    const thermalRing = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.22, 32),
      new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
    );
    thermalRing.rotation.x = -Math.PI / 2;
    thermalRing.position.y = -0.11;
    moxaGroup.add(thermalRing);

    // 5. 3 Distinct Clinical Pathologies DIRECTLY ON THE VISIBLE FRONT CUT FACE (z = 0.430)
    // 100% VISIBLE TO USER WITH 3D CALLOUT BADGES & PULSATING RETICLES!

    // A. Needle Target: Authentic Taut Band Myofascial Trigger Point (Deep Striated Muscle, y = -0.04, z = 0.430)
    // Realistic anatomical spindle of hypercontracted skeletal muscle sarcomeres & ischemic motor endplate
    const knotGroup = new THREE.Group();
    knotGroup.position.set(offsetX, -0.04, 0.430);
    knotGroup.visible = (activeTool === 'needle');
    scene.add(knotGroup);

    // 1. Hypercontracted Myoglobin-Congested Central Nodule (Spindle core)
    const knotCoreMat = new THREE.MeshStandardMaterial({
      color: 0x881337,
      emissive: 0x4c0519,
      emissiveIntensity: 0.6,
      roughness: 0.32,
      metalness: 0.08
    });
    const knotMesh = new THREE.Mesh(new THREE.SphereGeometry(0.065, 24, 20), knotCoreMat);
    knotMesh.scale.set(1.4, 0.85, 0.85);
    knotGroup.add(knotMesh);
    knotMeshRef.current = knotMesh;

    // 2. Taut Contractile Fiber Cords (Radiating along striated muscle fascicles)
    const fiberMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.35, metalness: 0.1 });
    for (let f = -3; f <= 3; f++) {
      const fy = f * 0.018;
      const fCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.16, fy * 0.6, 0),
        new THREE.Vector3(-0.05, fy * 1.3, 0.008),
        new THREE.Vector3(0.05, fy * 1.3, 0.008),
        new THREE.Vector3(0.16, fy * 0.6, 0)
      ]);
      const fiber = new THREE.Mesh(new THREE.TubeGeometry(fCurve, 16, 0.0055, 6, false), fiberMat);
      knotGroup.add(fiber);
    }

    // 3. Focal Ischemic Blanching Core (Microvascular compression at center)
    const ischemicCenter = new THREE.Mesh(
      new THREE.SphereGeometry(0.024, 16, 12),
      new THREE.MeshStandardMaterial({ color: 0xfca5a5, roughness: 0.4 })
    );
    ischemicCenter.position.z = 0.012;
    knotGroup.add(ischemicCenter);

    // 4. Branching Golden Motor Endplate Axon Innervating the Spindle
    const axonCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.10, 0.12, 0.01),
      new THREE.Vector3(0.04, 0.05, 0.012),
      new THREE.Vector3(0.0, 0.0, 0.015)
    ]);
    const axon = new THREE.Mesh(
      new THREE.TubeGeometry(axonCurve, 12, 0.004, 6, false),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xeab308, emissiveIntensity: 1.2 })
    );
    knotGroup.add(axon);

    // Floating 3D Pathology Badge on Cut Face
    const knotBadge = createPathologyBadge('⚡ TAUT BAND TRIGGER POINT • 12mm', 'Hypercontracted Sarcomeres & Motor Endplate', '#e02868');
    knotBadge.position.set(offsetX + 0.30, -0.04, 0.445);
    knotBadge.visible = (activeTool === 'needle');
    scene.add(knotBadge);
    knotBadgeRef.current = knotBadge;

    // B. Cupping Target: Authentic Densified Fibrotic Fascial Adhesion (Subcutaneous Fascia, y = 0.22, z = 0.430)
    // Dense cross-linked collagenous septa tethering the subcutaneous adipose to deep fascia
    const adhesionGroup = new THREE.Group();
    adhesionGroup.position.set(offsetX, 0.22, 0.430);
    adhesionGroup.visible = (activeTool === 'cup');
    scene.add(adhesionGroup);

    // 1. Pearlescent Collagenous Dense Plaque
    const collagenMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.24,
      metalness: 0.15,
      transparent: true,
      opacity: 0.94
    });
    const adhesionMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.038, 24), collagenMat);
    adhesionMesh.rotation.x = Math.PI / 2;
    adhesionGroup.add(adhesionMesh);
    adhesionMeshRef.current = adhesionMesh;

    // 2. Interwoven Retinacula Cutis Tethering Bands (Spider-web collagen strands)
    const bandMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.28, transparent: true, opacity: 0.90 });
    for (let b = 0; b < 8; b++) {
      const angle = (b / 8) * Math.PI * 2;
      const bCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * 0.06, Math.sin(angle) * 0.06, 0.015),
        new THREE.Vector3(Math.cos(angle) * 0.12, Math.sin(angle) * 0.12, (b % 2 === 0 ? 0.02 : -0.01))
      ]);
      const band = new THREE.Mesh(new THREE.TubeGeometry(bCurve, 12, 0.0045, 6, false), bandMat);
      adhesionGroup.add(band);
    }

    // 3. Entrapped Sluggish Micro-Venules (Hypoxic purple capillaries)
    const venuleMat = new THREE.MeshStandardMaterial({ color: 0x4338ca, roughness: 0.35 });
    for (let v = 0; v < 3; v++) {
      const vCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.06 + v * 0.05, -0.04, 0.008),
        new THREE.Vector3(-0.04 + v * 0.05, 0.02, 0.012),
        new THREE.Vector3(-0.01 + v * 0.05, 0.05, 0.008)
      ]);
      const venule = new THREE.Mesh(new THREE.TubeGeometry(vCurve, 10, 0.0035, 6, false), venuleMat);
      adhesionGroup.add(venule);
    }

    // Floating 3D Pathology Badge on Cut Face
    const adhesionBadge = createPathologyBadge('🧬 FIBROTIC FASCIAL ADHESION • 6mm', 'Cross-Linked Collagen Tethering Retinacula', '#8b5cf6');
    adhesionBadge.position.set(offsetX + 0.30, 0.22, 0.445);
    adhesionBadge.visible = (activeTool === 'cup');
    scene.add(adhesionBadge);
    adhesionBadgeRef.current = adhesionBadge;

    // C. Moxa Target: Authentic Cold-Damp Microvascular Stasis (Reticular Dermis, y = 0.44, z = 0.430)
    // Hypoxic capillary vasoconstriction, sluggish venous pooling & interstitial micro-edema
    const stasisGroup = new THREE.Group();
    stasisGroup.position.set(offsetX, 0.44, 0.430);
    stasisGroup.visible = (activeTool === 'moxa');
    scene.add(stasisGroup);

    // 1. Branching Stagnant Cyanic Capillary Plexus
    const stasisCapMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8, // Hypoxic cyanic blue
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      transparent: true
    });
    const stasisMesh = new THREE.Group();
    stasisGroup.add(stasisMesh);
    stasisMeshRef.current = stasisMesh;

    for (let c = 0; c < 8; c++) {
      const angle = (c / 8) * Math.PI * 2;
      const cCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0.01),
        new THREE.Vector3(Math.cos(angle) * 0.05, Math.sin(angle) * 0.04, 0.015),
        new THREE.Vector3(Math.cos(angle + 0.3) * 0.10, Math.sin(angle + 0.3) * 0.08, 0.01)
      ]);
      const cap = new THREE.Mesh(new THREE.TubeGeometry(cCurve, 12, 0.004, 6, false), stasisCapMat);
      stasisMesh.add(cap);
    }

    // 2. Interstitial Micro-Edema Pearls (Translucent fluid pooling)
    const edemaMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.65,
      roughness: 0.15
    });
    for (let e = 0; e < 6; e++) {
      const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.016, 10, 10), edemaMat);
      const ang = (e / 6) * Math.PI * 2;
      pearl.position.set(Math.cos(ang) * 0.06, Math.sin(ang) * 0.05, 0.015);
      stasisMesh.add(pearl);
    }

    // Floating 3D Pathology Badge on Cut Face
    const stasisBadge = createPathologyBadge('❄️ COLD-DAMP VASCULAR STASIS • 43°C', 'Capillary Vasoconstriction & Venous Pooling', '#0284c7');
    stasisBadge.position.set(offsetX + 0.30, 0.44, 0.445);
    stasisBadge.visible = (activeTool === 'moxa');
    scene.add(stasisBadge);
    stasisBadgeRef.current = stasisBadge;

    // 6. Thanos Particle Ash System for Disintegration
    const pCount = 3000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pVel = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = offsetX + (Math.random() - 0.5) * 0.18;
      pPos[i * 3 + 1] = -0.04 + (Math.random() - 0.5) * 0.12;
      pPos[i * 3 + 2] = 0.430 + (Math.random() - 0.5) * 0.06;
      pVel[i * 3] = (Math.random() - 0.5) * 0.008;
      pVel[i * 3 + 1] = 0.004 + Math.random() * 0.012; // Floating upward
      pVel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xe02868,
      size: 0.014,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    scene.add(pSystem);

    particlesRef.current = {
      points: pSystem,
      geo: pGeo,
      mat: pMat,
      velocities: pVel,
      active: false,
      timer: 0
    };

    // 6B. Mount Physical 3D Surgical Instrument Tray Comfortably Beside Tissue Block
    if (fullStage) {
      const trayMount = new THREE.Group();
      trayMount.position.set(0.78, -0.06, 0.38);
      trayMount.rotation.y = -0.32;
      trayMount.scale.setScalar(1.22);
      scene.add(trayMount);

      traySlotsRef.current = buildPhysical3DTray(
        trayMount,
        trayToolHitboxesRef.current,
        trayHaloMeshesRef.current,
        trayLabelSpritesRef.current
      );
      updateTrayToolAvailability(traySlotsRef.current, allowedToolIds);
    }

    // 7. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const curD = depthRef.current;
      // Live electric bio-pulse on muscle knot
      if (knotMeshRef.current && knotMeshRef.current.visible) {
        if (curD >= 11.5) {
          const pulse = Math.sin(elapsedTime * 12) * 0.5 + 0.5;
          knotMeshRef.current.material.emissiveIntensity = 1.2 + pulse * 1.5;
          knotMeshRef.current.material.emissive.setHex(0xe02868);
          knotMeshRef.current.scale.setScalar(1.0 + pulse * 0.12);
        } else {
          knotMeshRef.current.material.emissiveIntensity = 0.5;
          knotMeshRef.current.material.emissive.setHex(0x9f1239);
          knotMeshRef.current.scale.set(1, 1, 1);
        }
      }

      // Live fascial adhesion tension feedback
      if (adhesionMeshRef.current && adhesionMeshRef.current.visible) {
        const pulse = Math.sin(elapsedTime * 6) * 0.5 + 0.5;
        adhesionMeshRef.current.material.emissiveIntensity = 0.6 + (curD / 6.0) * 1.4 + pulse * 0.3;
      }

      // Live cold stasis thermal dispersion feedback
      if (stasisMeshRef.current && stasisMeshRef.current.visible) {
        const tempFraction = Math.max(0, (curD - 20) / 23);
        stasisMeshRef.current.traverse(child => { if (child.isMesh && child.material) { child.material.opacity = Math.max(0.1, 0.85 - tempFraction * 0.6); } });
      }

      // Thanos disintegration ash physics
      const pData = particlesRef.current;
      if (pData && pData.active) {
        pData.timer += 0.016;
        const pos = pData.geo.attributes.position.array;
        const vel = pData.velocities;

        for (let i = 0; i < pCount; i++) {
          pos[i * 3] += vel[i * 3];
          pos[i * 3 + 1] += vel[i * 3 + 1];
          pos[i * 3 + 2] += vel[i * 3 + 2];
        }
        pData.geo.attributes.position.needsUpdate = true;
        pData.mat.opacity = Math.max(0, 1.0 - pData.timer / 2.0);

        if (pData.timer >= 2.0) {
          pData.active = false;
        }
      }

      // Moxa thermal flicker
      if (thermalLightRef.current && activeTool === 'moxa') {
        const flicker = Math.sin(elapsedTime * 8) * 0.25 + 0.75;
        thermalLightRef.current.intensity = (depth / 43.0) * 2.5 * flicker;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Raycast click on physical tray tools
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let downPos = { x: 0, y: 0 };

    const onPointerDown = (e) => {
      downPos = { x: e.clientX, y: e.clientY };
    };

    const onClickCanvas = (e) => {
      const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      if (dist > 8) return; // Dragged

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      if (fullStage) {
        const trayHits = raycaster.intersectObjects(trayToolHitboxesRef.current, true);
        if (trayHits.length > 0) {
          let hitSlot = trayHits[0].object;
          while (hitSlot && (!hitSlot.userData || !hitSlot.userData.toolId)) {
            hitSlot = hitSlot.parent;
          }
          if (hitSlot && hitSlot.userData && hitSlot.userData.toolId) {
            if (onSelectToolRef.current) {
              onSelectToolRef.current(hitSlot.userData.toolId);
            }
            return;
          }
        }
      }
    };

    let isDraggingTool = false;
    let dragStartY = 0;
    let dragStartDepth = 0;

    const onPointerDownCustom = (e) => {
      onPointerDown(e);
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const toolHits = raycaster.intersectObjects([needleAssembly, cupGroup, moxaGroup, skinGroup], true);
      if (toolHits.length > 0) {
        isDraggingTool = true;
        dragStartY = e.clientY;
        dragStartDepth = depthRef.current;
        controls.enabled = false;
        renderer.domElement.style.cursor = 'ns-resize';
      }
    };

    const onPointerMove = (e) => {
      if (isDraggingTool) {
        const deltaY = e.clientY - dragStartY;
        const change = deltaY * 0.08;
        const currentTool = activeToolRef.current;
        const maxD = currentTool === 'needle' ? 15.0 : currentTool === 'cup' ? 6.0 : 43.0;
        const newD = Math.max(0, Math.min(maxD, dragStartDepth + change));
        if (onDepthChangeRef.current) {
          onDepthChangeRef.current(newD);
        }
      }
    };

    const onPointerUp = () => {
      if (isDraggingTool) {
        isDraggingTool = false;
        controls.enabled = true;
        renderer.domElement.style.cursor = 'grab';
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDownCustom);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('click', onClickCanvas);

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const rect = container.getBoundingClientRect();
      const w = Math.max(container.clientWidth || rect.width || window.innerWidth, 320);
      const h = Math.max(container.clientHeight || rect.height || (container.parentElement ? container.parentElement.clientHeight : 600), 320);
      if (w > 50 && h > 50) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
        rendererRef.current.domElement.style.width = '100%';
        rendererRef.current.domElement.style.height = '100%';
        rendererRef.current.domElement.style.position = 'absolute';
        rendererRef.current.domElement.style.inset = '0';
        rendererRef.current.domElement.style.display = 'block';
      }
    };
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    requestAnimationFrame(handleResize);
    setTimeout(handleResize, 60);
    setTimeout(handleResize, 180);
    setTimeout(handleResize, 360);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDownCustom);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('click', onClickCanvas);
      cancelAnimationFrame(animIdRef.current);
      renderer.dispose();
    };
  }, []); // Run on mount

  // Sync Active Tool Visibility & Physics Depth
  useEffect(() => {
    Object.keys(trayHaloMeshesRef.current).forEach((key) => {
      if (trayHaloMeshesRef.current[key] && trayHaloMeshesRef.current[key].material) {
        trayHaloMeshesRef.current[key].material.opacity = (key === activeTool) ? 0.85 : 0.0;
      }
    });

    if (needleGroupRef.current) needleGroupRef.current.visible = (activeTool === 'needle');
    if (cupGroupRef.current) cupGroupRef.current.visible = (activeTool === 'cup');
    if (moxaGroupRef.current) moxaGroupRef.current.visible = (activeTool === 'moxa');

    if (activeTool === 'needle' && needleGroupRef.current) {
      // At depth 0mm: needle tip sits right on top skin surface (y = 0.550, z = 0.410)
      // At depth 15mm: needle tip penetrates down along cut face to muscle knot center (y = -0.04)
      const fraction = Math.min(1.0, depth / 15.0);
      needleGroupRef.current.position.y = 0.550 - fraction * 0.59;
    } else if (activeTool === 'cup' && cupGroupRef.current) {
      cupGroupRef.current.position.y = 0.550;
      const suctionFraction = Math.min(1.0, depth / 6.0);
      if (suctionBulgeRef.current) {
        // Expand flesh mound upward into the glass chamber (up to 0.12 units high!)
        suctionBulgeRef.current.scale.set(1.0, suctionFraction * 0.85 + 0.02, 1.0);
      }
      if (bulgeMatRef.current) {
        // Dynamically flush from natural skin (#f5d0c0) to rich hyperemic rose-crimson (#be123c)
        bulgeMatRef.current.color.lerpColors(
          new THREE.Color(0xf5d0c0),
          new THREE.Color(0xbe123c),
          suctionFraction
        );
      }
      if (erythemaRingRef.current && erythemaRingRef.current.material) {
        erythemaRingRef.current.material.opacity = suctionFraction * 0.85;
      }
    } else if (activeTool === 'moxa' && moxaGroupRef.current) {
      moxaGroupRef.current.position.y = 0.670;
    }

    if (knotMeshRef.current && knotMeshRef.current.parent) {
      knotMeshRef.current.parent.visible = (activeTool === 'needle') && !isDisintegrated;
    }
    if (knotBadgeRef.current) {
      knotBadgeRef.current.visible = (activeTool === 'needle') && !isDisintegrated;
    }

    if (adhesionMeshRef.current && adhesionMeshRef.current.parent) {
      adhesionMeshRef.current.parent.visible = (activeTool === 'cup') && !isDisintegrated;
    }
    if (adhesionBadgeRef.current) {
      adhesionBadgeRef.current.visible = (activeTool === 'cup') && !isDisintegrated;
    }

    if (stasisMeshRef.current && stasisMeshRef.current.parent) {
      stasisMeshRef.current.parent.visible = (activeTool === 'moxa') && !isDisintegrated;
    }
    if (stasisBadgeRef.current) {
      stasisBadgeRef.current.visible = (activeTool === 'moxa') && !isDisintegrated;
    }

    // Sync 3D physical tray slot visibility with allowed clinical tools
    if (traySlotsRef.current) {
      updateTrayToolAvailability(traySlotsRef.current, allowedToolIds);
    }
  }, [activeTool, depth, isDisintegrated, allowedToolIds]);

  // Trigger Disintegration Particles
  useEffect(() => {
    if (isSnapping && particlesRef.current) {
      particlesRef.current.active = true;
      particlesRef.current.timer = 0;
      particlesRef.current.mat.opacity = 1.0;
      particlesRef.current.mat.color.set(
        activeTool === 'needle' ? 0xe02868 : activeTool === 'cup' ? 0xc084fc : 0x38bdf8
      );

      // Reset particle burst origin directly on the active pathology on the cut face
      const pCount = 3000;
      const pos = particlesRef.current.geo.attributes.position.array;
      const originY = activeTool === 'needle' ? -0.04 : activeTool === 'cup' ? 0.22 : 0.44;
      const offsetX = fullStage ? -0.38 : 0.0;
      for (let i = 0; i < pCount; i++) {
        pos[i * 3] = offsetX + (Math.random() - 0.5) * 0.18;
        pos[i * 3 + 1] = originY + (Math.random() - 0.5) * 0.12;
        pos[i * 3 + 2] = 0.430 + (Math.random() - 0.5) * 0.06;
      }
      particlesRef.current.geo.attributes.position.needsUpdate = true;

      if (knotMeshRef.current && knotMeshRef.current.parent) knotMeshRef.current.parent.visible = false;
      if (knotBadgeRef.current) knotBadgeRef.current.visible = false;
      if (adhesionMeshRef.current && adhesionMeshRef.current.parent) adhesionMeshRef.current.parent.visible = false;
      if (adhesionBadgeRef.current) adhesionBadgeRef.current.visible = false;
      if (stasisMeshRef.current && stasisMeshRef.current.parent) stasisMeshRef.current.parent.visible = false;
      if (stasisBadgeRef.current) stasisBadgeRef.current.visible = false;
    }
  }, [isSnapping, activeTool, fullStage]);

  if (fullStage) {
    return (
      <div className={`absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] select-none ${className}`}>
        {/* Main 3D Canvas */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top Header Bar */}
        <div className="absolute top-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {onBackToBody && (
              <button
                type="button"
                onClick={onBackToBody}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold shadow-md transition"
                title="Return to Whole Human Body Model"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#e02868]" />
                <span>← Back to 3D Anatomy</span>
              </button>
            )}

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-xs font-bold text-[#09090b] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#e02868] animate-ping" />
              <span>Treating: {pointCode} • {pointName}</span>
              <span className="text-[10px] font-mono text-[#e02868] bg-[#e02868]/10 px-2 py-0.5 rounded-full">
                {activeTool === 'needle' ? `Target: ${targetDepth || 12}mm` : activeTool === 'cup' ? 'Suction: 6.0mm' : 'Heat: 43°C'}
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-500/15 px-2 py-0.5 rounded-full">
                {activeTool === 'needle' ? '⚠️ Spastic Motor Knot' : activeTool === 'cup' ? '⚠️ Fascial Adhesion' : '⚠️ Cold Damp Stasis'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white border border-neutral-200/90 text-xs font-semibold text-neutral-700 hover:text-[#09090b] transition shadow-sm"
              title="Reset Treatment Depth"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#e02868]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Bottom Interactive Surgical Controls & Tool Dock */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-auto flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-1 pr-2 border-r border-neutral-200/80">
            {allowedTools.map(t => {
              const IconComp = t.id === 'needle' ? Zap : Flame;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onSelectTool && onSelectTool(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeTool === t.id
                      ? 'bg-[#e02868] text-white shadow-sm'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80'
                  }`}
                  title={t.sub}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{t.name}</span>
                </button>
              );
            })}
            {allowedTools.length === 1 && (
              <span className="hidden sm:inline-flex text-[10px] text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-lg font-medium">
                Cupping contraindicated on bony distal joint
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 px-2">
            <span className="text-[11px] font-bold text-neutral-700 whitespace-nowrap">
              {activeTool === 'needle' && `Depth: ${depth.toFixed(1)} / 15mm`}
              {activeTool === 'cup' && `Suction: ${depth.toFixed(1)} / 6mm`}
              {activeTool === 'moxa' && `Heat: ${depth.toFixed(0)} / 43°C`}
            </span>
            <input
              type="range"
              min="0"
              max={activeTool === 'needle' ? 15.0 : activeTool === 'cup' ? 6.0 : 43.0}
              step="0.5"
              value={depth}
              onChange={(e) => onDepthChange && onDepthChange(parseFloat(e.target.value))}
              className="w-24 sm:w-28 accent-[#e02868] cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              const targetVal = activeTool === 'needle' ? (targetDepth || 12.0) : activeTool === 'cup' ? 6.0 : 43.0;
              if (onDepthChange) onDepthChange(targetVal);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#e02868] hover:bg-[#c91f58] text-white text-xs font-bold shadow-md transition"
          >
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>
              {activeTool === 'needle' && `Insert Needle (${targetDepth || 12}mm)`}
              {activeTool === 'cup' && 'Apply Full Suction (6mm)'}
              {activeTool === 'moxa' && 'Apply Moxa Warmth (43°C)'}
            </span>
          </button>
        </div>

        {/* Orbit Hint Pill */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-sm text-xs font-medium text-neutral-600">
          <Eye className="w-3.5 h-3.5 text-[#e02868]" />
          <span>Tissue Strata on Left • Physical Surgical Tray on Right</span>
        </div>

        {/* Thanos Disintegration Floating Toast */}
        {isDisintegrated && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 max-w-lg w-[92%] sm:w-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-neutral-900/95 text-white border border-emerald-500/50 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-2 pointer-events-auto">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 animate-spin" />
              <div className="text-xs">
                <span className="font-bold text-emerald-400">{clinicalOutcome.pointLabel}:</span>{' '}
                <span className="text-neutral-200">{clinicalOutcome.painLabel}</span>{' '}
                <span className="text-emerald-300 font-semibold">{clinicalOutcome.highlight}</span>
                <p className="text-[11px] text-neutral-400 mt-0.5">{clinicalOutcome.detail}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onReset}
              className="px-2.5 py-1 text-[11px] font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition shrink-0 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  const asideClass = embedded
    ? `w-full bg-white/95 border-b border-neutral-200/80 overflow-hidden flex flex-col ${className}`
    : `absolute top-14 right-3 z-30 pointer-events-auto w-[330px] md:w-[360px] bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${className}`;

  return (
    <aside 
      aria-label="3D Anatomical Tissue Strata Viewport"
      className={asideClass}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-neutral-50/90 border-b border-neutral-200/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e02868] animate-pulse" />
          <div>
            <h4 className="text-xs font-bold text-neutral-900 leading-none">
              3D Tissue Strata Microscopy
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] text-neutral-500 font-mono">
                {pointCode} • {pointName}
              </span>
              <span className="text-[9px] text-[#e02868] font-bold truncate max-w-[170px]">
                • {painName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-lg hover:bg-neutral-200/60 text-neutral-600 transition"
            title={isMinimized ? 'Expand Strata' : 'Minimize Strata'}
          >
            {isMinimized ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-neutral-200/60 text-neutral-600 transition"
              title="Close Microscopy View"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {!isMinimized && (
        <div className="p-3 space-y-2.5">
          {/* 3D Model Viewport */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-neutral-900/5 border border-neutral-200/80 shadow-inner">
            <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
            
            {modelLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-xs">
                <span className="text-[11px] font-bold text-neutral-600 animate-pulse flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#e02868] animate-spin" />
                  <span>Loading Histological Strata...</span>
                </span>
              </div>
            )}

            {/* Orbit Hint Pill */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-neutral-200/80 text-[8px] font-mono font-semibold text-neutral-600 flex items-center gap-1 pointer-events-none shadow-xs">
              <Eye className="w-2.5 h-2.5 text-[#e02868]" />
              <span>Drag to Rotate 3D Block</span>
            </div>

            {/* Active Depth Overlay Badge */}
            <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-neutral-900/90 backdrop-blur-xs text-white text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stratum.color }} />
              <span>
                {activeTool === 'needle' && `${depth.toFixed(1)} mm`}
                {activeTool === 'cup' && `${depth.toFixed(1)} mm lift`}
                {activeTool === 'moxa' && `${depth.toFixed(0)} °C`}
              </span>
            </div>
          </div>

          {/* Histological Stratum Live Feedback */}
          <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#e02868]" />
                <span>Active Stratum:</span>
              </span>
              <span className="text-xs font-bold" style={{ color: stratum.color }}>
                {stratum.name}
              </span>
            </div>

            <div className="text-[11px] text-neutral-700 font-medium leading-tight">
              {stratum.sub}
            </div>

            {/* 5-Stratum Progress Bar */}
            <div className="grid grid-cols-5 gap-1 pt-1">
              {[
                { name: 'Epi', range: '0-1.5' },
                { name: 'Derm', range: '1.5-5' },
                { name: 'Adip', range: '5-9.5' },
                { name: 'Fasc', range: '9.5-12' },
                { name: 'Knot', range: '12-15' }
              ].map((layer, i) => {
                const isActive = (stratum.num === i + 1);
                const isPassed = (stratum.num > i + 1);
                return (
                  <div key={layer.name} className="flex flex-col items-center">
                    <div className={`w-full h-1.5 rounded-full transition-all duration-200 ${
                      isActive ? 'bg-[#e02868] shadow-sm shadow-[#e02868]/40' : isPassed ? 'bg-neutral-400' : 'bg-neutral-200'
                    }`} />
                    <span className={`text-[8px] mt-0.5 font-mono ${isActive ? 'text-[#e02868] font-bold' : 'text-neutral-500'}`}>
                      {layer.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical Insertion & Real-Time Histological Readout (Direct 3D Stabbing) */}
          <div className="space-y-1.5 pt-1 border-t border-neutral-200/80">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
              <span className="text-[10px] text-neutral-600 font-mono">
                {activeTool === 'needle' && 'Penetration Depth (Direct 3D Drag):'}
                {activeTool === 'cup' && 'Negative Pressure Lift:'}
                {activeTool === 'moxa' && 'Thermal Radiance:'}
              </span>
              <span className="text-[10px] font-mono text-[#e02868] font-bold">
                {depth.toFixed(1)} {activeTool === 'moxa' ? '°C' : 'mm'}
              </span>
            </div>

            {/* Direct Physical Stabbing Indicator Tag */}
            <div className="p-2 rounded-xl bg-neutral-900/5 border border-neutral-200/80 flex items-center justify-between text-[10px] font-medium text-neutral-600">
              <span className="flex items-center gap-1.5 font-bold text-[#e02868]">
                <Zap className="w-3.5 h-3.5 animate-pulse" />
                <span>{activeTool === 'needle' ? 'Drag 3D Needle on Body to Stab' : activeTool === 'cup' ? 'Drag 3D Cup to Decompress' : 'Hover 3D Moxa to Radiate'}</span>
              </span>
              <span className="font-mono text-[9px] text-neutral-500">
                {activeTool === 'needle' ? 'Target: 12mm' : activeTool === 'cup' ? 'Target: 6mm' : 'Target: 43°C'}
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onDepthChange && onDepthChange(targetDepth)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-[#e02868] hover:bg-[#c21e54] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>
                  {activeTool === 'needle' && `Insert to Knot (${targetDepth}mm)`}
                  {activeTool === 'cup' && 'Apply Full Suction'}
                  {activeTool === 'moxa' && 'Full Heat (43°C)'}
                </span>
              </button>

              <button
                type="button"
                onClick={onReset}
                className="p-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition"
                title="Reset Needle & Pathology"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Cure feedback */}
            {isDisintegrated && (
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] leading-tight">
                  ✓ {clinicalOutcome.highlight.replace('• ', '')} — {clinicalOutcome.detail}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
