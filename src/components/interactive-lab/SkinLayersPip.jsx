import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { buildPhysical3DTray } from './physicalTray';
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
  const adhesionMeshRef = useRef(null);
  const stasisMeshRef = useRef(null);
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

    const camera = new THREE.PerspectiveCamera(38, initW / initH, 0.1, 50);
    if (fullStage) {
      camera.position.set(0.18, 1.25, 2.85);
      camera.lookAt(0.18, 0.02, 0.12);
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
    controls.target.set(fullStage ? 0.18 : 0, fullStage ? 0.02 : 0.05, fullStage ? 0.12 : 0);
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

    // 4. Surgical 3D Tools Operating on Top of the Skin Model
    const offsetX = fullStage ? -0.38 : 0.0;
    const offsetZ = 0.485; // Positioned directly at visible cut strata front face!

    // A. 3D Needle Assembly
    const needleAssembly = new THREE.Group();
    needleAssembly.position.set(offsetX, 0.285, offsetZ);
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

    // Conical bevel needle tip
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

    // B. 3D Glass Vacuum Cup (Realistic, visible, solid medical glassware)
    const cupGroup = new THREE.Group();
    cupGroup.position.set(offsetX, 0.28, offsetZ);
    cupGroup.visible = false;
    scene.add(cupGroup);
    cupGroupRef.current = cupGroup;

    const cupGlassMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.12,
      metalness: 0.15,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide
    });

    // 1. Thick Smooth Rounded Lip Rim (Base on skin)
    const cupRim = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.014, 20, 36), cupGlassMat);
    cupRim.rotation.x = Math.PI / 2;
    cupRim.position.y = 0.014;
    cupGroup.add(cupRim);

    // 1b. Crisp Specular Edge Highlight Ring
    const rimHighlight = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.004, 16, 36),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0.8 })
    );
    rimHighlight.rotation.x = Math.PI / 2;
    rimHighlight.position.y = 0.014;
    cupGroup.add(rimHighlight);

    // 2. Flared Bell Body
    const cupBell = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.14, 0.13, 32, 1, true),
      cupGlassMat
    );
    cupBell.position.y = 0.079;
    cupGroup.add(cupBell);

    // 3. Smooth Bulbous Glass Dome
    const cupDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.112, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.5),
      cupGlassMat
    );
    cupDome.position.y = 0.144;
    cupGroup.add(cupDome);

    // 4. Brass Vacuum Valve Collar on Top Dome
    const valveCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.020, 0.025, 24),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.2 })
    );
    valveCollar.position.y = 0.256;
    cupGroup.add(valveCollar);

    // 5. Polished Brass Mechanical Suction Valve Pin
    const cupValve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.006, 0.009, 0.035, 16),
      new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.95, roughness: 0.2 })
    );
    cupValve.position.y = 0.276;
    cupGroup.add(cupValve);

    // 6. Hyperemic suction tissue bulge inside glass cup
    const bulgeMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.35,
      transparent: true,
      opacity: 0.92
    });
    const suctionBulge = new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 18, 0, Math.PI * 2, 0, Math.PI / 2), bulgeMat);
    suctionBulge.position.y = 0.0;
    suctionBulge.scale.set(1.0, 0.01, 1.0);
    cupGroup.add(suctionBulge);
    suctionBulgeRef.current = suctionBulge;

    // C. 3D Moxa Herbal Warmer
    const moxaGroup = new THREE.Group();
    moxaGroup.position.set(offsetX, 0.38, offsetZ);
    moxaGroup.visible = (activeTool === 'moxa');
    scene.add(moxaGroup);
    moxaGroupRef.current = moxaGroup;

    // Ensure initial tool visibilities match activeTool prop on mount
    if (needleGroupRef.current) needleGroupRef.current.visible = (activeTool === 'needle');
    if (cupGroupRef.current) cupGroupRef.current.visible = (activeTool === 'cup');

    const moxaBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.28, 18),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 })
    );
    moxaBody.position.y = 0.14;
    moxaGroup.add(moxaBody);

    // Glowing ember burning tip
    const ember = new THREE.Mesh(
      new THREE.CylinderGeometry(0.034, 0.034, 0.03, 18),
      new THREE.MeshStandardMaterial({
        color: 0xff3b00,
        emissive: 0xff2200,
        emissiveIntensity: 2.2,
        roughness: 0.2
      })
    );
    ember.position.y = 0.0;
    moxaGroup.add(ember);

    // Concentric thermal infrared radiation ring
    const thermalRing = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.22, 32),
      new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
    );
    thermalRing.rotation.x = -Math.PI / 2;
    thermalRing.position.y = -0.18;
    moxaGroup.add(thermalRing);

    // 5. 3 Distinct Clinical Pathologies Corresponding to Tools (Flush on Cut Face)
    // A. Needle Target: Spastic Motor Endplate Knot (Striated Muscle, 12mm)
    const knotGeo = new THREE.TorusKnotGeometry(0.075, 0.024, 64, 16, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xff1e46,
      emissive: 0xbe123c,
      emissiveIntensity: 1.6,
      roughness: 0.25
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.set(offsetX, -0.18, offsetZ); // Deep striated muscle layer right on cut face!
    knot.castShadow = true;
    knot.visible = (activeTool === 'needle');
    scene.add(knot);
    knotMeshRef.current = knot;

    // B. Cupping Target: Fibrotic Fascial Adhesion (Subcutaneous Fascia, 6mm)
    const adhesionGeo = new THREE.IcosahedronGeometry(0.08, 2);
    const adhesionMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 1.6,
      roughness: 0.25,
      transparent: true,
      opacity: 0.95
    });
    const adhesion = new THREE.Mesh(adhesionGeo, adhesionMat);
    adhesion.position.set(offsetX, -0.05, offsetZ); // Deep fascia layer right on cut face!
    adhesion.castShadow = true;
    adhesion.visible = (activeTool === 'cup');
    scene.add(adhesion);
    adhesionMeshRef.current = adhesion;

    // C. Moxa Target: Cold Damp Stasis Pool (Dermal Plexus, 43°C)
    const stasisGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.035, 24);
    const stasisMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.6,
      roughness: 0.20,
      transparent: true,
      opacity: 0.90
    });
    const stasis = new THREE.Mesh(stasisGeo, stasisMat);
    stasis.rotation.x = Math.PI / 2;
    stasis.position.set(offsetX, 0.16, offsetZ); // Dermal microvascular layer right on cut face!
    stasis.castShadow = true;
    stasis.visible = (activeTool === 'moxa');
    scene.add(stasis);
    stasisMeshRef.current = stasis;

    // 6. Thanos Particle Ash System for Disintegration
    const pCount = 3000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pVel = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = offsetX + (Math.random() - 0.5) * 0.18;
      pPos[i * 3 + 1] = -0.15 + (Math.random() - 0.5) * 0.15;
      pPos[i * 3 + 2] = offsetZ + (Math.random() - 0.5) * 0.08;
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

      buildPhysical3DTray(
        trayMount,
        trayToolHitboxesRef.current,
        trayHaloMeshesRef.current,
        trayLabelSpritesRef.current
      );
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
        stasisMeshRef.current.material.opacity = Math.max(0.1, 0.85 - tempFraction * 0.6);
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
      const { w, h } = getContainerDims();
      if (w > 50 && h > 50) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h, false);
        rendererRef.current.domElement.style.width = '100%';
        rendererRef.current.domElement.style.height = '100%';
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
      if (trayHaloMeshesRef.current[key]) {
        trayHaloMeshesRef.current[key].material.opacity = (key === activeTool) ? 0.85 : 0.0;
      }
    });

    if (needleGroupRef.current) needleGroupRef.current.visible = (activeTool === 'needle');
    if (cupGroupRef.current) cupGroupRef.current.visible = (activeTool === 'cup');
    if (moxaGroupRef.current) moxaGroupRef.current.visible = (activeTool === 'moxa');

    if (activeTool === 'needle' && needleGroupRef.current) {
      // At depth 0mm: needle tip sits right on skin surface (y = 0.285)
      // At depth 15mm: needle tip penetrates into deep muscle knot (y = -0.18)
      const fraction = Math.min(1.0, depth / 15.0);
      needleGroupRef.current.position.y = 0.285 - fraction * 0.465;
    } else if (activeTool === 'cup' && cupGroupRef.current) {
      cupGroupRef.current.position.y = 0.28;
      if (suctionBulgeRef.current) {
        const suctionFraction = Math.min(1.0, depth / 6.0);
        suctionBulgeRef.current.scale.set(1.0, suctionFraction * 0.45 + 0.02, 1.0);
      }
    } else if (activeTool === 'moxa' && moxaGroupRef.current) {
      moxaGroupRef.current.position.y = 0.38;
    }

    if (knotMeshRef.current) {
      knotMeshRef.current.visible = (activeTool === 'needle') && !isDisintegrated;
    }
    if (adhesionMeshRef.current) {
      adhesionMeshRef.current.visible = (activeTool === 'cup') && !isDisintegrated;
    }
    if (stasisMeshRef.current) {
      stasisMeshRef.current.visible = (activeTool === 'moxa') && !isDisintegrated;
    }
  }, [activeTool, depth, isDisintegrated]);

  // Trigger Disintegration Particles
  useEffect(() => {
    if (isSnapping && particlesRef.current) {
      particlesRef.current.active = true;
      particlesRef.current.timer = 0;
      particlesRef.current.mat.opacity = 1.0;
      particlesRef.current.mat.color.set(
        activeTool === 'needle' ? 0xe02868 : activeTool === 'cup' ? 0xc084fc : 0x38bdf8
      );
      if (knotMeshRef.current) knotMeshRef.current.visible = false;
      if (adhesionMeshRef.current) adhesionMeshRef.current.visible = false;
      if (stasisMeshRef.current) stasisMeshRef.current.visible = false;
    }
  }, [isSnapping, activeTool]);

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
            {[
              { id: 'needle', name: '01 Needle', icon: Zap, sub: '0.18mm Guide-Tube Needle' },
              { id: 'cup', name: '02 Cup', icon: Flame, sub: 'Negative Pressure Fire Cup' },
              { id: 'moxa', name: '03 Moxa', icon: Flame, sub: 'Artemisia Thermal Stick' }
            ].map(t => (
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
                <t.icon className="w-3.5 h-3.5" />
                <span>{t.name}</span>
              </button>
            ))}
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
                <span className="font-bold text-emerald-400">{pointCode} ({pointName}):</span>{' '}
                <span className="text-neutral-200">{painName}</span>{' '}
                <span className="text-emerald-300 font-semibold">• Vanished into Ash</span>
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
                  ✓ {painName} Disintegrated into Ash! Spasm Relieved.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
