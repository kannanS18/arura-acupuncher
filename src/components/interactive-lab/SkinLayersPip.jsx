import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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
  isDisintegrated = false,
  isSnapping = false,
  onDepthChange,
  onReset,
  onClose,
  isMuted = false,
  playAcuSound
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
  const particlesRef = useRef(null);
  const thermalLightRef = useRef(null);
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
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfbfcfe);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(2.0, 1.4, 2.2);
    camera.lookAt(0, 0.05, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxDistance = 6.0;
    controls.minDistance = 0.8;
    controls.target.set(0, 0.05, 0);
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
        const normScale = 1.45 / maxDim;
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
    // A. 3D Needle Assembly
    const needleAssembly = new THREE.Group();
    needleAssembly.position.set(0.0, 0.65, 0.0); // Above epidermis surface (surface ~0.42)
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

    // B. 3D Glass Vacuum Cup
    const cupGroup = new THREE.Group();
    cupGroup.position.set(0.0, 0.50, 0.0);
    cupGroup.visible = false;
    scene.add(cupGroup);
    cupGroupRef.current = cupGroup;

    const cupGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.45,
      roughness: 0.08,
      transmission: 0.92,
      thickness: 0.05
    });
    const cupDome = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), cupGlassMat);
    cupDome.rotation.x = Math.PI;
    cupDome.position.y = 0.18;
    cupGroup.add(cupDome);

    const cupRim = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.014, 12, 32), cupGlassMat);
    cupRim.rotation.x = Math.PI / 2;
    cupRim.position.y = 0.0;
    cupGroup.add(cupRim);

    // Hyperemic suction tissue bulge
    const bulgeMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.35,
      transparent: true,
      opacity: 0.85
    });
    const suctionBulge = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2), bulgeMat);
    suctionBulge.position.y = 0.0;
    suctionBulge.scale.set(1.0, 0.01, 1.0);
    cupGroup.add(suctionBulge);
    suctionBulgeRef.current = suctionBulge;

    // C. 3D Moxa Herbal Warmer
    const moxaGroup = new THREE.Group();
    moxaGroup.position.set(0.0, 0.72, 0.0);
    moxaGroup.visible = false;
    scene.add(moxaGroup);
    moxaGroupRef.current = moxaGroup;

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

    // 5. Deep Muscle Motor Knot (Tense Trigger Point Target)
    const knotGeo = new THREE.SphereGeometry(0.055, 16, 16);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.4,
      roughness: 0.45
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.set(0.0, -0.12, 0.0); // Inside deep muscle layer!
    knot.castShadow = true;
    scene.add(knot);
    knotMeshRef.current = knot;

    // 6. Thanos Particle Ash System for Disintegration
    const pCount = 3000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pVel = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 0.12;
      pPos[i * 3 + 1] = -0.12 + (Math.random() - 0.5) * 0.08;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
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

    // 7. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle gentle rotation of the skin model when not interacting
      if (!controls.state || controls.state === -1) {
        skinGroup.rotation.y += 0.0015;
      }

      // Live electric bio-pulse on muscle knot
      if (knotMeshRef.current) {
        if (depth >= 11.5) {
          const pulse = Math.sin(elapsedTime * 12) * 0.5 + 0.5;
          knotMeshRef.current.material.emissiveIntensity = 1.0 + pulse * 1.5;
          knotMeshRef.current.material.emissive.setHex(0xe02868);
          knotMeshRef.current.scale.setScalar(1.0 + pulse * 0.12);
        } else {
          knotMeshRef.current.material.emissiveIntensity = 0.3;
          knotMeshRef.current.material.emissive.setHex(0x7f1d1d);
          knotMeshRef.current.scale.set(1, 1, 1);
        }
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

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animIdRef.current);
      renderer.dispose();
    };
  }, []); // Run on mount

  // Sync Active Tool Visibility & Physics Depth
  useEffect(() => {
    if (needleGroupRef.current) needleGroupRef.current.visible = (activeTool === 'needle');
    if (cupGroupRef.current) cupGroupRef.current.visible = (activeTool === 'cup');
    if (moxaGroupRef.current) moxaGroupRef.current.visible = (activeTool === 'moxa');

    if (activeTool === 'needle' && needleGroupRef.current) {
      // At depth 0mm: needle tip sits right on skin surface (y = 0.42)
      // At depth 15mm: needle tip penetrates into deep muscle (y = -0.15)
      const fraction = Math.min(1.0, depth / 15.0);
      needleGroupRef.current.position.y = 0.42 - fraction * 0.57;
    } else if (activeTool === 'cup' && cupGroupRef.current) {
      cupGroupRef.current.position.y = 0.42;
      if (suctionBulgeRef.current) {
        const suctionFraction = Math.min(1.0, depth / 6.0);
        suctionBulgeRef.current.scale.set(1.0, suctionFraction * 0.45 + 0.02, 1.0);
      }
    } else if (activeTool === 'moxa' && moxaGroupRef.current) {
      moxaGroupRef.current.position.y = 0.55;
    }

    if (knotMeshRef.current) {
      knotMeshRef.current.visible = !isDisintegrated;
    }
  }, [activeTool, depth, isDisintegrated]);

  // Trigger Disintegration Particles
  useEffect(() => {
    if (isSnapping && particlesRef.current) {
      particlesRef.current.active = true;
      particlesRef.current.timer = 0;
      particlesRef.current.mat.opacity = 1.0;
      if (knotMeshRef.current) knotMeshRef.current.visible = false;
    }
  }, [isSnapping]);

  return (
    <aside 
      aria-label="3D Anatomical Tissue Strata Viewport"
      className="absolute top-14 right-3 z-30 pointer-events-auto w-[330px] md:w-[360px] bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-neutral-50/90 border-b border-neutral-200/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e02868] animate-pulse" />
          <div>
            <h4 className="text-xs font-bold text-neutral-900 leading-none">
              3D Tissue Strata Microscopy
            </h4>
            <span className="text-[9px] text-neutral-500 font-mono">
              {pointCode} • {pointName}
            </span>
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

          {/* Clinical Insertion & Treatment Controller */}
          <div className="space-y-1.5 pt-1 border-t border-neutral-200/80">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
              <span className="text-[10px] text-neutral-600 font-mono">
                {activeTool === 'needle' && 'Penetration Depth (0–15mm):'}
                {activeTool === 'cup' && 'Negative Pressure Suction (0–6mm):'}
                {activeTool === 'moxa' && 'Thermal Warming (35–43°C):'}
              </span>
              <span className="text-[10px] font-mono text-[#e02868]">
                {depth.toFixed(1)} {activeTool === 'moxa' ? '°C' : 'mm'}
              </span>
            </div>

            <input
              type="range"
              min={activeTool === 'moxa' ? 35 : 0}
              max={maxDepth}
              step={0.1}
              value={depth}
              onChange={(e) => onDepthChange && onDepthChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#e02868]"
            />

            {/* Quick Action Button */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onDepthChange && onDepthChange(targetDepth)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-[#e02868] hover:bg-[#c21e54] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>
                  {activeTool === 'needle' && `Reach Knot (${targetDepth}mm)`}
                  {activeTool === 'cup' && 'Apply Full Suction'}
                  {activeTool === 'moxa' && 'Full Heat (43°C)'}
                </span>
              </button>

              <button
                type="button"
                onClick={onReset}
                className="p-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition"
                title="Reset Treatment"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Cure feedback */}
            {isDisintegrated && (
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px]">Motor Endplate Knot Vaporized! De-Qi Active.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
