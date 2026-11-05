import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
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
  depthCun = "0.5–1.0 cun",
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
  const knotGroupRef = useRef(null);
  const knotMeshRef = useRef(null);
  const knotBadgeRef = useRef(null);
  const axonMatRef = useRef(null);
  const hyperemicHaloRef = useRef(null);
  const collagenMatRef = useRef(null);
  const venuleGroupRef = useRef(null);
  const adhesionHaloRef = useRef(null);
  const stasisCapMatRef = useRef(null);
  const stasisBlushRef = useRef(null);
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

    const camera = new THREE.PerspectiveCamera(36, initW / initH, 0.1, 50);
    if (fullStage) {
      // Comfortably framed so entire 3D strata + surgical tools fit with generous breathing margins
      camera.position.set(0.24, 0.35, 3.65);
      camera.lookAt(0.20, 0.28, 0.0);
    } else {
      camera.position.set(2.0, 1.4, 2.2);
      camera.lookAt(0, 0.05, 0);
    }
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.shadowMap.enabled = false;
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
    controls.target.set(fullStage ? 0.20 : 0, fullStage ? 0.28 : 0.05, fullStage ? 0.05 : 0);
    controlsRef.current = controls;

    // 2. Studio Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(3, 5, 3.5);
    dirLight1.castShadow = false;
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
      skinGroup.position.set(0.12, 0.0, 0.0);
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
        const normScale = (fullStage ? 1.15 : 1.35) / maxDim;
        model.scale.setScalar(normScale);

        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center.multiplyScalar(normScale));
        model.position.y += 0.02; // Fine tune height

        // Enable shadows on meshes
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false;
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
    const offsetX = fullStage ? 0.12 : 0.0;
    const skinSurfaceY = 0.488; // Exact top skin surface height of skin_layers.glb!

    // Helper: High-Definition Retina-Sharp 3D Floating Callout Badge + Reticle + Leader Line
    const createUltraCrispBadge = (icon, title, subtitle, colorHex) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');

      // Semi-transparent sleek dark background with rounded corners
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = colorHex;
      ctx.lineWidth = 7;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(8, 8, 1008, 240, 36);
      else ctx.rect(8, 8, 1008, 240);
      ctx.fill();
      ctx.stroke();

      // Subtle inner gradient sheen
      const sheen = ctx.createLinearGradient(0, 0, 1024, 0);
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.0)');
      sheen.addColorStop(1, 'rgba(255, 255, 255, 0.04)');
      ctx.fillStyle = sheen;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(8, 8, 1008, 240, 36);
      else ctx.rect(8, 8, 1008, 240);
      ctx.fill();

      // Status icon circle
      ctx.fillStyle = colorHex;
      ctx.beginPath();
      ctx.arc(80, 128, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon, 80, 128);

      // Title text (Large, bold, high-contrast, razor sharp)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(title, 135, 102);

      // Subtitle text (Crisp, light slate gray)
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(subtitle, 135, 168);

      const tex = new THREE.CanvasTexture(canvas);
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;

      const spriteMat = new THREE.SpriteMaterial({
        map: tex,
        depthTest: false,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.56, 0.14, 1.0);

      // Group containing the sprite, the reticle ring, and the angled leader line
      const container = new THREE.Group();

      // 1. Glowing reticle ring on the pathology
      const ringGeo = new THREE.RingGeometry(0.016, 0.024, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.95 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      container.add(ring);

      const dot = new THREE.Mesh(
        new THREE.CircleGeometry(0.007, 16),
        new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide })
      );
      dot.position.z = 0.001;
      container.add(dot);

      // 2. Angled leader line from reticle (0, 0, 0) to badge left edge
      const lineMat = new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.90 });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0.024, 0, 0.002),
        new THREE.Vector3(0.07, 0.035, 0.002),
        new THREE.Vector3(0.12, 0.035, 0.002)
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      container.add(line);

      // 3. Position the sprite badge right beside the leader line
      sprite.position.set(0.40, 0.035, 0.015);
      container.add(sprite);

      return container;
    };

    // Dedicated Pathology Showcase Spotlight (Illuminates the cut face and pathologies directly)
    const showcaseLight = new THREE.PointLight(0xfff8ed, 2.4, 3.2);
    showcaseLight.position.set(offsetX + 0.15, 0.20, 0.95);
    scene.add(showcaseLight);

    // A. 3D Needle Assembly (Operates along the visible front cut face at z = 0.410)
    const needleAssembly = new THREE.Group();
    needleAssembly.position.set(offsetX, 0.490, 0.410);
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
    cupGroup.position.set(offsetX, skinSurfaceY, 0.140);
    cupGroup.visible = false;
    scene.add(cupGroup);
    cupGroupRef.current = cupGroup;

    // Crystal-Clear Borosilicate Fire Cupping Glass (Transmission = 0.96)
    const realGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      roughness: 0.04,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
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
    moxaGroup.position.set(offsetX, 0.610, 0.250);
    moxaGroup.visible = (activeTool === 'moxa');
    scene.add(moxaGroup);
    moxaGroupRef.current = moxaGroup;

    // Ensure initial tool visibilities match activeTool prop on mount
    if (needleGroupRef.current) needleGroupRef.current.visible = (activeTool === 'needle');
    if (cupGroupRef.current) cupGroupRef.current.visible = (activeTool === 'cup');

    // 1. Slender Traditional Artemisia Moxa Roll (1:12 Authentic Clinical Ratio)
    const moxaTex = createAuthenticMoxaTexture();
    const moxaPaperMat = new THREE.MeshStandardMaterial({
      map: moxaTex,
      roughness: 0.82,
      metalness: 0.04
    });
    // Slender, elegant, realistic moxa roll (radius 0.024, length 0.44)
    const moxaBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.024, 0.024, 0.44, 24),
      moxaPaperMat
    );
    moxaBody.position.y = 0.22;
    moxaGroup.add(moxaBody);

    // 2. Burning Ash Ember Tip with Incandescent Glowing Fissures
    const emberTex = createMoxaEmberTexture();
    const emberMat = new THREE.MeshStandardMaterial({
      map: emberTex,
      color: 0xff3b00,
      emissive: 0xff2200,
      emissiveIntensity: 1.8,
      roughness: 0.55
    });
    const ember = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.024, 0.038, 24),
      emberMat
    );
    ember.position.y = 0.0;
    moxaGroup.add(ember);

    // 3. Turned Dark Walnut Wood Handle Cap on Rear End
    const woodCapMat = new THREE.MeshStandardMaterial({
      color: 0x27170e,
      roughness: 0.45,
      metalness: 0.08
    });
    const woodCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.026, 0.026, 0.032, 24),
      woodCapMat
    );
    woodCap.position.y = 0.456;
    moxaGroup.add(woodCap);

    // Polished brass ferrule ring
    const ferrule = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0265, 0.0265, 0.008, 24),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.25 })
    );
    ferrule.position.y = 0.440;
    moxaGroup.add(ferrule);

    // Concentric thermal infrared radiation ring (soft warm falloff)
    const thermalRing = new THREE.Mesh(
      new THREE.RingGeometry(0.03, 0.16, 32),
      new THREE.MeshBasicMaterial({ color: 0xff5500, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    );
    thermalRing.rotation.x = -Math.PI / 2;
    thermalRing.position.y = -0.11;
    moxaGroup.add(thermalRing);

    // 5. 3 Vibrant, High-Contrast Authentic Clinical Pathologies on Cut Face (z = 0.430)

    // A. Needle Target: Highly Defined Taut Band Myofascial Trigger Point Knot (Striated Muscle)
    // A. Needle Target: Highly Defined Taut Band Myofascial Trigger Point Knot in DEEP STRIATED MUSCLE LAYER (y = -0.040)
    const knotY = -0.040;
    const knotGroup = new THREE.Group();
    knotGroup.position.set(offsetX, knotY, 0.438);
    knotGroup.visible = (activeTool === 'needle');
    scene.add(knotGroup);
    knotGroupRef.current = knotGroup;

    // 1. Inflamed Hyperemic Striated Muscle Fascicles (Vibrant Ruby-Crimson with Specular Sheen)
    const muscleFiberMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626, // Bright, distinct arterial muscle red for high visibility
      roughness: 0.35,
      metalness: 0.08
    });
    const knotFibers = new THREE.Group();
    knotGroup.add(knotFibers);
    knotMeshRef.current = knotFibers; // Animated twitch fasciculation on contact

    for (let f = -4; f <= 4; f++) {
      const fy = f * 0.013;
      const fz = (f % 2 === 0 ? 0.008 : -0.004);
      const bulge = Math.cos((f / 4) * (Math.PI / 2)) * 0.028;
      const fCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.16, fy * 0.5, fz),
        new THREE.Vector3(-0.06, fy + bulge, fz + 0.010),
        new THREE.Vector3(0.06, fy + bulge, fz + 0.010),
        new THREE.Vector3(0.16, fy * 0.5, fz)
      ]);
      const fiber = new THREE.Mesh(new THREE.TubeGeometry(fCurve, 14, 0.0055, 8, false), muscleFiberMat);
      knotFibers.add(fiber);
    }

    // 2. Central Hypercontracted Sarcomere Core Spindle (Deep Warm Crimson with Internal Bio-Glow)
    const spindleCoreMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      emissive: 0x991b1b,
      emissiveIntensity: 0.65,
      roughness: 0.40,
      metalness: 0.05
    });
    const spindleCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.026, 0.026, 0.12, 20),
      spindleCoreMat
    );
    spindleCore.rotation.z = Math.PI / 2;
    knotGroup.add(spindleCore);

    // 3. Focal Ischemic Blanching Striations (pale contractile center)
    const ischemicMat = new THREE.MeshStandardMaterial({
      color: 0xf87171,
      roughness: 0.45,
      metalness: 0.02
    });
    const ischemicNodule = new THREE.Mesh(
      new THREE.SphereGeometry(0.019, 14, 12),
      ischemicMat
    );
    ischemicNodule.scale.set(1.6, 0.8, 0.8);
    ischemicNodule.position.z = 0.010;
    knotGroup.add(ischemicNodule);

    // 4. Branching Golden Motor Endplate Axon (Bio-Electric Nerve Terminal)
    const axonCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.12, 0.13, 0.010),
      new THREE.Vector3(0.06, 0.06, 0.012),
      new THREE.Vector3(0.0, 0.01, 0.015)
    ]);
    const axonMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 1.5 });
    axonMatRef.current = axonMat;
    const axon = new THREE.Mesh(
      new THREE.TubeGeometry(axonCurve, 12, 0.004, 6, false),
      axonMat
    );
    knotGroup.add(axon);

    // 5. Localized Hyperemic Inflammatory Halo (Translucent Warm Red Aura)
    const hyperemicHalo = new THREE.Mesh(
      new THREE.RingGeometry(0.02, 0.09, 32),
      new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.28, side: THREE.DoubleSide })
    );
    hyperemicHalo.position.z = 0.002;
    hyperemicHaloRef.current = hyperemicHalo;
    knotGroup.add(hyperemicHalo);

    // 6. High-Definition 3D Floating Callout Badge + Reticle + Leader Line
    const knotBadge = createUltraCrispBadge(
      '⚡',
      `TAUT BAND TRIGGER POINT • ${targetDepth || 12}mm`,
      'Hypercontracted Sarcomere Spindle • Motor Endplate',
      '#f43f5e'
    );
    knotBadge.position.set(0, 0, 0.016);
    knotGroup.add(knotBadge);
    knotBadgeRef.current = knotBadge;

    // B. Cupping Target: Highly Defined Fibrotic Fascial Adhesion (Subcutaneous Fascia, y = 0.22)
    const adhesionGroup = new THREE.Group();
    adhesionGroup.position.set(offsetX, 0.100, 0.438);
    adhesionGroup.visible = (activeTool === 'cup');
    scene.add(adhesionGroup);

    // 1. Radiant Pearlescent Collagenous Plaque Sheath (Glistening White-Lilac)
    const collagenMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xddd6fe,
      emissiveIntensity: 0.45,
      roughness: 0.25,
      metalness: 0.20,
      transparent: true,
      opacity: 0.95
    });
    collagenMatRef.current = collagenMat;
    const adhesionMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.095, 0.026, 24), collagenMat);
    adhesionMesh.rotation.x = Math.PI / 2;
    adhesionGroup.add(adhesionMesh);
    adhesionMeshRef.current = adhesionMesh;

    // 2. Interwoven Retinacula Cutis Collagen Strands (Wavy Lilac Connective Bands)
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      roughness: 0.32,
      transparent: true,
      opacity: 0.90
    });
    for (let b = 0; b < 8; b++) {
      const angle = (b / 8) * Math.PI * 2;
      const bCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * 0.06, Math.sin(angle) * 0.06, 0.012),
        new THREE.Vector3(Math.cos(angle) * 0.11, Math.sin(angle) * 0.11, 0.005)
      ]);
      const band = new THREE.Mesh(new THREE.TubeGeometry(bCurve, 12, 0.004, 6, false), bandMat);
      adhesionGroup.add(band);
    }

    // 3. Entrapped Hypoxic Micro-Venules (Deep Plum/Purple Capillaries)
    const venuleMat = new THREE.MeshStandardMaterial({ color: 0x7e22ce, emissive: 0x581c87, emissiveIntensity: 0.8 });
    for (let v = 0; v < 3; v++) {
      const vCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.06 + v * 0.05, -0.035, 0.009),
        new THREE.Vector3(-0.03 + v * 0.05, 0.012, 0.012),
        new THREE.Vector3(-0.01 + v * 0.05, 0.045, 0.007)
      ]);
      const venule = new THREE.Mesh(new THREE.TubeGeometry(vCurve, 10, 0.0035, 6, false), venuleMat);
      adhesionGroup.add(venule);
    }

    // 4. Soft Violet Decompression Aura
    const adhesionHalo = new THREE.Mesh(
      new THREE.RingGeometry(0.03, 0.12, 32),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    );
    adhesionHalo.position.z = 0.002;
    adhesionHaloRef.current = adhesionHalo;
    adhesionGroup.add(adhesionHalo);

    // 5. High-Definition 3D Floating Callout Badge + Reticle + Leader Line
    const adhesionBadge = createUltraCrispBadge(
      '🧬',
      'FIBROTIC FASCIAL ADHESION • -35 kPa',
      'Dense Cross-Linked Collagen • Retinacula Restriction',
      '#a855f7'
    );
    adhesionBadge.position.set(0, 0, 0.016);
    adhesionGroup.add(adhesionBadge);
    adhesionBadgeRef.current = adhesionBadge;

    // C. Moxa Target: Highly Defined Cold-Damp Microvascular Stasis (Reticular Dermis, y = 0.44)
    const stasisGroup = new THREE.Group();
    stasisGroup.position.set(offsetX, 0.440, 0.438);
    stasisGroup.visible = (activeTool === 'moxa');
    scene.add(stasisGroup);

    // 1. Winding Hypoxic Capillary Loops (Luminous Cyan-Cobalt Plexus)
    const stasisCapMat = new THREE.MeshStandardMaterial({

      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.2,
      roughness: 0.40,
      metalness: 0.10
    });
    const stasisMesh = new THREE.Group();
    stasisGroup.add(stasisMesh);
    stasisMeshRef.current = stasisMesh;
    stasisCapMatRef.current = stasisCapMat;

    for (let c = 0; c < 6; c++) {
      const angle = (c / 6) * Math.PI * 2;
      const cCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.06 + c * 0.024, -0.025, 0.010),
        new THREE.Vector3(-0.04 + c * 0.024 + Math.cos(angle) * 0.025, 0.015, 0.015),
        new THREE.Vector3(-0.01 + c * 0.024, 0.035, 0.010)
      ]);
      const cap = new THREE.Mesh(new THREE.TubeGeometry(cCurve, 12, 0.0038, 6, false), stasisCapMat);
      stasisMesh.add(cap);
    }

    // 2. Glowing Cyanic Interstitial Fluid Pooling Aura
    const stasisBlushMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.38,
      side: THREE.DoubleSide
    });
    const stasisBlush = new THREE.Mesh(new THREE.RingGeometry(0.015, 0.09, 32), stasisBlushMat);
    stasisBlush.position.z = 0.006;
    stasisMesh.add(stasisBlush);
    stasisBlushRef.current = stasisBlush;

    // 3. High-Definition 3D Floating Callout Badge + Reticle + Leader Line
    const stasisBadge = createUltraCrispBadge(
      '❄️',
      'COLD-DAMP VASCULAR STASIS • 43°C',
      'Capillary Vasoconstriction • Sluggish Venous Pooling',
      '#38bdf8'
    );
    stasisBadge.position.set(0, 0, 0.016);
    stasisGroup.add(stasisBadge);
    stasisBadgeRef.current = stasisBadge;

    // 6. Thanos Particle Ash System for Disintegration
    const pCount = 300;
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

    // 6B. Physical 3D Tray omitted in fullStage to eliminate GPU draw calls and offscreen clipping

    // 7. Animation Loop
    const clock = new THREE.Clock();
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorCrimson = new THREE.Color(0xdc2626);
    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const curD = depthRef.current;

      // 1. LIVE ANIMATION: Taut Band Trigger Point Muscle Spasm & Fasciculation
      if (knotMeshRef.current && knotMeshRef.current.visible) {
        // Continuous biological spasm rhythm
        const spasm = Math.sin(elapsedTime * 4.5) * 0.05 + Math.sin(elapsedTime * 9.0) * 0.025;
        // Intense De-Qi micro-twitch contracture discharge when needle reaches target
        const isNearNeedle = curD >= ((targetDepth || 12.0) - 1.2);
        const needleTwitch = isNearNeedle ? Math.sin(elapsedTime * 22.0) * 0.10 : 0.0;
        const totalTwitch = spasm + needleTwitch;
        knotMeshRef.current.scale.set(1.0 + totalTwitch, 1.0 - totalTwitch * 0.5, 1.0 + totalTwitch);

        // Axon terminal bio-electric pulsing
        if (axonMatRef.current) {
          axonMatRef.current.emissiveIntensity = 1.2 + Math.sin(elapsedTime * 6.0) * 0.8;
        }
        // Hyperemic inflammatory halo breathing
        if (hyperemicHaloRef.current) {
          hyperemicHaloRef.current.scale.setScalar(1.0 + Math.sin(elapsedTime * 3.5) * 0.12);
          hyperemicHaloRef.current.material.opacity = 0.32 + Math.sin(elapsedTime * 3.5) * 0.12;
        }
      }

      // 2. LIVE ANIMATION: Fibrotic Fascial Adhesion Tension & Decompression Lift
      if (adhesionMeshRef.current && adhesionMeshRef.current.visible) {
        // Collagen plaque tension shimmer
        if (collagenMatRef.current) {
          collagenMatRef.current.emissiveIntensity = 0.45 + Math.sin(elapsedTime * 3.0) * 0.25;
        }
        // Fascial decompression lift under suction
        const lift = Math.min(1.0, curD / 6.0) * 0.06;
        adhesionMeshRef.current.position.y = lift;
        if (adhesionHaloRef.current) {
          adhesionHaloRef.current.scale.setScalar(1.0 + Math.sin(elapsedTime * 2.8) * 0.10);
        }
      }

      // 3. LIVE ANIMATION: Cold-Damp Microvascular Stasis & Thermal Vasodilation
      if (stasisMeshRef.current && stasisMeshRef.current.visible) {
        const heatFrac = Math.max(0, Math.min(1.0, (curD - 24.0) / 19.0));
        if (stasisCapMatRef.current) {
          // Luminescence breathing pulse
          stasisCapMatRef.current.emissiveIntensity = (1.2 + Math.sin(elapsedTime * 3.5) * 0.5) * (1.0 - heatFrac * 0.5);
          // Thermal flush from hypoxic cyan (#38bdf8) to arterial crimson (#dc2626)
          stasisCapMatRef.current.color.lerpColors(colorCyan, colorCrimson, heatFrac);
        }
        if (stasisBlushRef.current) {
          stasisBlushRef.current.scale.setScalar(1.0 + Math.sin(elapsedTime * 2.5) * 0.12);
          stasisBlushRef.current.material.opacity = Math.max(0.05, (0.38 + Math.sin(elapsedTime * 2.5) * 0.1) * (1.0 - heatFrac));
        }
      }

      // 4. Thanos disintegration ash physics
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

      // 5. Moxa thermal radiance flicker
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
      needleGroupRef.current.position.y = 0.490 - fraction * 0.530;
    } else if (activeTool === 'cup' && cupGroupRef.current) {
      cupGroupRef.current.position.y = 0.488;
      cupGroupRef.current.position.z = 0.140;
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
      const pCount = 300;
      const pos = particlesRef.current.geo.attributes.position.array;
      const originY = activeTool === 'needle' ? -0.04 : activeTool === 'cup' ? 0.22 : 0.44;
      const offsetX = fullStage ? 0.12 : 0.0;
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
        {/* Full 3D WebGL Canvas */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top Header Bar */}
        <header className="absolute top-3 inset-x-3 sm:inset-x-4 z-20 flex items-center justify-between pointer-events-none">
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
                {activeTool === 'needle' ? `Target: ${targetDepth || 12}mm (${depthCun})` : activeTool === 'cup' ? 'Suction: -35 kPa' : 'Heat: 43°C'}
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-500/15 px-2 py-0.5 rounded-full">
                {activeTool === 'needle' ? '⚠️ Spastic Motor Knot' : activeTool === 'cup' ? '⚠️ Fascial Adhesion' : '⚠️ Cold Damp Stasis'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-[11px] font-medium text-neutral-600 shadow-sm">
              <Eye className="w-3.5 h-3.5 text-[#e02868]" />
              <span>Drag to rotate 3D strata</span>
            </div>
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white border border-neutral-200/90 text-xs font-semibold text-neutral-700 hover:text-[#09090b] transition shadow-sm"
              title="Reset Treatment"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#e02868]" />
              <span>Reset</span>
            </button>
          </div>
        </header>

        {/* Left Side: Consolidated Clinical Treatment Console */}
        <aside className="absolute top-14 left-3 sm:left-4 z-20 pointer-events-auto max-w-[340px] w-full max-h-[calc(100vh-4.5rem)] flex flex-col p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl space-y-3 overflow-y-auto animate-in fade-in slide-in-from-left-2">
          
          {/* 1. Clinical Tool Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Select Therapy Tool
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                {allowedTools.length} Available
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {Object.values(CLINICAL_TOOLS).map(t => {
                const isAllowed = allowedToolIds.includes(t.id);
                const isSelected = activeTool === t.id;
                const IconComp = t.id === 'needle' ? Zap : t.id === 'cup' ? CircleDot : Flame;
                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={!isAllowed}
                    onClick={() => isAllowed && onSelectTool && onSelectTool(t.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition ${
                      isSelected
                        ? 'bg-[#e02868] text-white shadow-sm ring-2 ring-[#e02868]/30'
                        : isAllowed
                        ? 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80'
                        : 'bg-neutral-100/50 text-neutral-400 border border-dashed border-neutral-200 cursor-not-allowed opacity-50'
                    }`}
                    title={isAllowed ? t.sub : 'Contraindicated for this anatomical region'}
                  >
                    <IconComp className={`w-4 h-4 mb-0.5 ${isSelected ? 'text-white' : 'text-neutral-500'}`} />
                    <span className="text-[11px] font-bold leading-tight">{t.name}</span>
                    <span className={`text-[9px] truncate max-w-full ${isSelected ? 'text-white/80' : 'text-neutral-400'}`}>
                      {isAllowed ? t.sub : 'Contraindicated'}
                    </span>
                  </button>
                );
              })}
            </div>
            {allowedTools.length === 1 && (
              <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200/80 p-1.5 rounded-lg font-medium mt-1.5 leading-snug">
                Notice: Cupping & Moxa contraindicated on bony distal joint.
              </p>
            )}
          </div>

          {/* 2. Pathology & Histology Details */}
          <div className="p-2.5 rounded-xl bg-neutral-50/80 border border-neutral-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Target Pathology
              </span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                isDisintegrated
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {isDisintegrated ? '✓ Released & Restored' : '● Active Pathology'}
              </span>
            </div>
            <h4 className="text-xs font-bold text-neutral-900 leading-tight">
              {activeTool === 'needle' && 'Taut Band Myofascial Trigger Point Knot (12mm)'}
              {activeTool === 'cup' && 'Fibrotic Fascial Restriction & Adhesion (6mm)'}
              {activeTool === 'moxa' && 'Cold-Damp Microvascular Stasis & Vasoconstriction (43°C)'}
            </h4>
            <p className="text-[10px] text-neutral-600 font-medium leading-relaxed">
              {activeTool === 'needle' && 'Histology: Hypercontracted sarcomere cluster with microvascular ischemia and localized motor endplate tension.'}
              {activeTool === 'cup' && 'Histology: Dense cross-linked collagen bundles tethering subcutaneous adipose to deep epimysium with stagnant venules.'}
              {activeTool === 'moxa' && 'Histology: Hypoxic capillary vasoconstriction with sluggish venous pooling and interstitial micro-edema.'}
            </p>
            <div className="pt-1.5 border-t border-neutral-200/70 text-[9.5px] text-neutral-600 leading-relaxed">
              <span className="font-bold text-neutral-800">Mechanism: </span>
              {activeTool === 'needle' && 'Mechanical filiform stimulation triggers a local twitch fasciculation, resetting spastic motor loop.'}
              {activeTool === 'cup' && 'Negative pressure (-35 kPa) lifts skin & fascia upward into glass jar, breaking adhesions.'}
              {activeTool === 'moxa' && 'Deep infrared radiation (43°C) dilates microvascular capillary loops, expelling cold stasis.'}
            </div>
          </div>

          {/* 3. Interactive Depth / Dose Controller */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                {activeTool === 'needle' && 'Needle Insertion Depth'}
                {activeTool === 'cup' && 'Negative Pressure Suction'}
                {activeTool === 'moxa' && 'Moxa Infrared Thermal Dose'}
              </span>
              <span className="text-xs font-mono font-bold text-[#e02868]">
                {activeTool === 'needle' && `${depth.toFixed(1)} / 15mm`}
                {activeTool === 'cup' && `${depth.toFixed(1)} / 6mm`}
                {activeTool === 'moxa' && `${depth.toFixed(0)} / 43°C`}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={activeTool === 'needle' ? 15.0 : activeTool === 'cup' ? 6.0 : 43.0}
              step="0.5"
              value={depth}
              onChange={(e) => onDepthChange && onDepthChange(parseFloat(e.target.value))}
              className="w-full accent-[#e02868] cursor-pointer"
            />

            <button
              type="button"
              onClick={() => {
                const targetVal = activeTool === 'needle' ? (targetDepth || 12.0) : activeTool === 'cup' ? 6.0 : 43.0;
                if (onDepthChange) onDepthChange(targetVal);
              }}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#e02868] hover:bg-[#c91f58] text-white text-xs font-bold shadow-md transition"
            >
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>
                {activeTool === 'needle' && `Insert Needle to Target (${targetDepth || 12}mm)`}
                {activeTool === 'cup' && 'Apply Full Fire Cup Suction (6mm)'}
                {activeTool === 'moxa' && 'Deliver Full Moxa Heat (43°C)'}
              </span>
            </button>
          </div>

          {/* 4. Clinical Outcome Box (Embedded cleanly in console, NOT blocking the 3D model!) */}
          {isDisintegrated && (
            <div className="p-2.5 rounded-xl bg-emerald-950 text-white border border-emerald-500/50 shadow-md space-y-1.5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-spin" />
                  <span>De-Qi Release Achieved</span>
                </span>
                <button
                  type="button"
                  onClick={onReset}
                  className="px-2 py-0.5 text-[10px] font-bold bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 rounded-md transition"
                >
                  Reset
                </button>
              </div>
              <p className="text-[10px] text-emerald-200/90 leading-snug">
                <span className="font-semibold">{clinicalOutcome.painLabel}:</span> {clinicalOutcome.highlight}
              </p>
              <p className="text-[9.5px] text-neutral-400 leading-snug">
                {clinicalOutcome.detail}
              </p>
            </div>
          )}
        </aside>
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

          {/* Prominent High-Contrast Pathology Description Card */}
          <div className="p-2.5 rounded-xl bg-white border border-neutral-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-900">
              <span className="flex items-center gap-1.5">
                <span>{activeTool === 'needle' ? '⚡' : activeTool === 'cup' ? '🔥' : '🌿'}</span>
                <span>
                  {activeTool === 'needle' && 'Taut Band Trigger Point (12mm)'}
                  {activeTool === 'cup' && 'Fibrotic Fascial Restriction (6mm)'}
                  {activeTool === 'moxa' && 'Cold-Damp Microvascular Stasis (43°C)'}
                </span>
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                isDisintegrated ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {isDisintegrated ? '✓ Released' : '● Active'}
              </span>
            </div>
            <p className="text-[10px] text-neutral-600 leading-tight">
              {activeTool === 'needle' && 'Hypercontracted sarcomere knot with localized motor endplate ischemia.'}
              {activeTool === 'cup' && 'Dense cross-linked collagen bundles tethering subcutaneous fascia.'}
              {activeTool === 'moxa' && 'Sluggish deoxygenated capillary loops with localized cold pooling.'}
            </p>
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
                {activeTool === 'needle' ? `Target: ${targetDepth || 12}mm` : activeTool === 'cup' ? 'Target: -35 kPa' : 'Target: 43°C'}
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
