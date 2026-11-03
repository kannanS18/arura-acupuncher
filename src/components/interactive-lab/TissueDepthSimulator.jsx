import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Layers, 
  ArrowDown, 
  Check, 
  Activity, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

// Authentic Web Audio Synthesizer (Snap Pop + Ethereal Wind Whoosh + 528Hz Harmonic Chime)
function playAcuSound(type, isMuted) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'snap') {
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(1450, ctx.currentTime);
      snapOsc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08);

      snapGain.gain.setValueAtTime(0.75, ctx.currentTime);
      snapGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start();
      snapOsc.stop(ctx.currentTime + 0.09);

      // Wind / Ash Dissolve Ethereal Whoosh
      const bufferSize = ctx.sampleRate * 1.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, ctx.currentTime + 0.04);
      filter.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 1.3);
      filter.Q.value = 3.2;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.12);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(ctx.currentTime + 0.04);
      whiteNoise.stop(ctx.currentTime + 1.5);

      // 528 Hz Healing Harmonic Tone
      setTimeout(() => {
        try {
          const toneOsc = ctx.createOscillator();
          const toneGain = ctx.createGain();
          toneOsc.type = 'sine';
          toneOsc.frequency.value = 528;
          toneGain.gain.setValueAtTime(0.25, ctx.currentTime);
          toneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
          toneOsc.connect(toneGain);
          toneGain.connect(ctx.destination);
          toneOsc.start();
          toneOsc.stop(ctx.currentTime + 1.4);
        } catch (_) {}
      }, 250);

    } else if (type === 'suction') {
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * (i / buffer.length));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.35);
      noise.connect(filter);
      filter.connect(ctx.destination);
      noise.start();

    } else if (type === 'moxa') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);

    } else if (type === 'breach') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === 'pickup') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (_) {}
}

// Curve for Authentic Spiral Copper Needle Handle
class SpiralHandleCurve extends THREE.Curve {
  constructor(radius = 0.022, height = 0.28, turns = 24) {
    super();
    this.radius = radius;
    this.height = height;
    this.turns = turns;
  }
  getPoint(t) {
    const angle = t * Math.PI * 2 * this.turns;
    const x = Math.cos(angle) * this.radius;
    const z = Math.sin(angle) * this.radius;
    const y = (t - 0.5) * this.height;
    return new THREE.Vector3(x, y, z);
  }
}

const CLINICAL_PROBLEMS = [
  {
    id: 'knot',
    name: 'Spastic Motor Knot',
    layer: 'Deep Striated Muscle (12mm)',
    depthTarget: 12.0,
    depthUnit: 'mm',
    toolId: 'needle',
    toolName: '0.18mm Solid Needle',
    description: 'Hyper-contracted motor endplate nodule in deep skeletal muscle.',
    actionHint: 'Drag down on the 3D block to drop the needle through the strata into the 12mm knot',
    skinPhysicsText: 'Skin dimples downward on contact, pops through stratum corneum, glides past adipose into muscle',
    colorHex: 0xff1e46,
    reliefTitle: 'Deep Motor Spasm Dissolved (De-Qi)',
    reliefText: 'Spastic knot vaporized into ash. Muscle fibers uncoil into relaxed parallel flow.'
  },
  {
    id: 'adhesion',
    name: 'Fascial Adhesion',
    layer: 'Subcutaneous Fascia (6mm)',
    depthTarget: 6.0,
    depthUnit: 'mm bulge',
    toolId: 'cup',
    toolName: 'Glass Fire Cupping',
    description: 'Tangled fibrotic fascial matrix restricting micro-circulation.',
    actionHint: 'Drag slider or block to create vacuum suction and lift fascia',
    skinPhysicsText: 'Skin bulges and rises upward inside glass dome, decompressing stuck fascia',
    colorHex: 0xc084fc,
    reliefTitle: 'Myofascial Adhesion Unlocked',
    reliefText: 'Negative pressure separates restricted fascia. Micro-circulation surges +380%.'
  },
  {
    id: 'stasis',
    name: 'Cold Damp Stasis',
    layer: 'Epidermis & Dermis (43°C)',
    depthTarget: 43.0,
    depthUnit: '°C',
    toolId: 'moxa',
    toolName: 'Pure Herbal Moxa Roll',
    description: 'Cold micro-vascular constriction and stagnant lymphatic circulation.',
    actionHint: 'Hover or drag slider to radiate 43°C thermal infrared heat',
    skinPhysicsText: 'Expanding thermal heat ring radiates across skin, dilating micro-capillaries',
    colorHex: 0x38bdf8,
    reliefTitle: 'Cold Stagnation Vaporized',
    reliefText: 'Infrared heat clears cold constriction. Soothing therapeutic warmth active.'
  }
];

export default function TissueDepthSimulator({ onOpenBooking }) {
  const mountRef = useRef(null);
  const [selectedProblemIdx, setSelectedProblemIdx] = useState(0);
  const [activeTool, setActiveTool] = useState('needle'); // 'needle', 'cup', 'moxa'
  const [interactiveDepth, setInteractiveDepth] = useState(0);
  const [isDisintegrated, setIsDisintegrated] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);

  // 3D Meshes
  const skinMeshRef = useRef(null);
  const originalSkinPositionsRef = useRef(null);
  const knotMeshRef = useRef(null);
  const adhesionMeshRef = useRef(null);
  const stasisMeshRef = useRef(null);
  const thermalRingRef = useRef(null);

  // 3D Tools
  const activeNeedleRef = useRef(null);
  const activeCupRef = useRef(null);
  const activeMoxaRef = useRef(null);

  // Drag Tracking
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartValRef = useRef(0);

  // 3D Thanos Particles
  const particlesRef = useRef(null);

  const currentProb = CLINICAL_PROBLEMS[selectedProblemIdx];

  // Helper to apply skin vertex deformation and needle drop
  const applySkinPhysicsAndToolHeight = useCallback((val) => {
    const skinMesh = skinMeshRef.current;
    const origPos = originalSkinPositionsRef.current;
    if (!skinMesh || !origPos) return;

    const posAttr = skinMesh.geometry.attributes.position;
    const posArr = posAttr.array;

    const targetLocalX = 0;
    const targetLocalZ = 0.85;

    if (activeTool === 'needle') {
      const fraction = Math.min(1.0, val / 15.0);
      if (activeNeedleRef.current) {
        // Needle tip starts at skin surface (y = 1.25) and plunges to y = -0.04 (12mm knot)
        activeNeedleRef.current.position.y = 1.25 - fraction * 1.29;
      }

      // Skin Elastic Dimpling
      const dimpleAmount = val < 2.5 ? (val / 2.5) * 0.08 : Math.max(0, 0.08 - (val - 2.5) * 0.03);

      for (let i = 0; i < posArr.length; i += 3) {
        const vx = origPos[i];
        const vz = origPos[i + 2];
        const dist = Math.hypot(vx - targetLocalX, vz - targetLocalZ);

        if (dist < 0.28) {
          const falloff = Math.cos((dist / 0.28) * (Math.PI / 2));
          posArr[i + 1] = origPos[i + 1] - dimpleAmount * falloff;
        } else {
          posArr[i + 1] = origPos[i + 1];
        }
      }
      posAttr.needsUpdate = true;

    } else if (activeTool === 'cup') {
      const fraction = Math.min(1.0, val / 10.0);
      if (activeCupRef.current) {
        activeCupRef.current.position.y = 1.35 - fraction * 0.55;
      }

      const bulgeHeight = fraction * 0.16;
      for (let i = 0; i < posArr.length; i += 3) {
        const vx = origPos[i];
        const vz = origPos[i + 2];
        const dist = Math.hypot(vx - targetLocalX, vz - targetLocalZ);

        if (dist < 0.28) {
          const falloff = Math.cos((dist / 0.28) * (Math.PI / 2));
          posArr[i + 1] = origPos[i + 1] + bulgeHeight * falloff;
        } else {
          posArr[i + 1] = origPos[i + 1];
        }
      }
      posAttr.needsUpdate = true;

    } else if (activeTool === 'moxa') {
      const fraction = Math.min(1.0, val / 45.0);
      if (activeMoxaRef.current) {
        activeMoxaRef.current.position.y = 1.35 - fraction * 0.45;
      }

      if (thermalRingRef.current) {
        thermalRingRef.current.material.opacity = fraction * 0.9;
      }
    }
  }, [activeTool]);

  // 3D Thanos Snap Disintegration Engine
  const triggerThanosDisintegration = useCallback(() => {
    if (isSnapping || isDisintegrated) return;
    setIsSnapping(true);
    playAcuSound('snap', isMuted);

    // Hide active 3D pathology geometry
    if (knotMeshRef.current) knotMeshRef.current.visible = false;
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = false;
    if (stasisMeshRef.current) stasisMeshRef.current.visible = false;

    // Spawn 5,000 Thanos 3D Particles at target location
    const pData = particlesRef.current;
    if (pData) {
      pData.active = true;
      pData.timer = 0;
      pData.mat.opacity = 1.0;
      pData.mat.color = new THREE.Color(currentProb.colorHex);

      const posAttr = pData.geo.attributes.position;
      const posArr = posAttr.array;
      const originY = activeTool === 'needle' ? -0.42 : activeTool === 'cup' ? 0.05 : 0.68;

      for (let i = 0; i < 5000; i++) {
        posArr[i * 3] = -0.2 + (Math.random() - 0.5) * 0.4;
        posArr[i * 3 + 1] = originY + (Math.random() - 0.5) * 0.35;
        posArr[i * 3 + 2] = 0.88 + (Math.random() - 0.5) * 0.35;
      }
      posAttr.needsUpdate = true;
    }

    setTimeout(() => {
      setIsDisintegrated(true);
      setIsSnapping(false);
    }, 400);
  }, [isSnapping, isDisintegrated, activeTool, isMuted, currentProb]);

  // Handle interactive value change
  const handleInteractiveChange = useCallback((val) => {
    setInteractiveDepth(val);
    applySkinPhysicsAndToolHeight(val);

    if (activeTool === 'needle' && val >= 1.5 && val < 2.5) {
      playAcuSound('breach', isMuted);
    } else if (activeTool === 'cup' && val >= 3.0 && val < 4.0) {
      playAcuSound('suction', isMuted);
    } else if (activeTool === 'moxa' && val >= 25.0 && val < 28.0) {
      playAcuSound('moxa', isMuted);
    }

    if (val >= currentProb.depthTarget && !isDisintegrated && !isSnapping) {
      triggerThanosDisintegration();
    }
  }, [activeTool, currentProb.depthTarget, isDisintegrated, isSnapping, isMuted, applySkinPhysicsAndToolHeight, triggerThanosDisintegration]);

  // Reset treatment
  const handleReset = useCallback(() => {
    setIsDisintegrated(false);
    setIsSnapping(false);
    setInteractiveDepth(0);
    applySkinPhysicsAndToolHeight(0);

    if (knotMeshRef.current) knotMeshRef.current.visible = (selectedProblemIdx === 0);
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = (selectedProblemIdx === 1);
    if (stasisMeshRef.current) stasisMeshRef.current.visible = (selectedProblemIdx === 2);

    if (thermalRingRef.current) thermalRingRef.current.material.opacity = 0;
  }, [selectedProblemIdx, applySkinPhysicsAndToolHeight]);

  // Select tool
  const handleSelectTool = useCallback((toolId) => {
    setActiveTool(toolId);
    const probIdx = toolId === 'needle' ? 0 : toolId === 'cup' ? 1 : 2;
    setSelectedProblemIdx(probIdx);
    handleReset();
    playAcuSound('pickup', isMuted);
  }, [handleReset, isMuted]);

  // Animate Needle Drop Down to Target (Butter smooth V2 drop!)
  const dropNeedleToTarget = useCallback(() => {
    if (isSnapping || isDisintegrated) return;
    const target = currentProb.depthTarget;
    const startVal = interactiveDepth;
    const duration = 400; // ms
    const startTime = performance.now();

    const animatePlunge = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = startVal + (target - startVal) * ease;
      handleInteractiveChange(val);

      if (progress < 1.0) {
        requestAnimationFrame(animatePlunge);
      }
    };
    requestAnimationFrame(animatePlunge);
  }, [currentProb.depthTarget, interactiveDepth, isSnapping, isDisintegrated, handleInteractiveChange]);

  // Initialize Three.js Scene with FULL VOLUMETRIC 3D ANATOMICAL MODEL
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    // 1. Scene & Camera centered on volumetric block
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0d14);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(2.0, 2.3, 3.5);
    cameraRef.current = camera;

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxDistance = 6.2;
    controls.minDistance = 1.6;
    controls.target.set(-0.1, 0.0, 0.2);
    controlsRef.current = controls;

    // 4. Clinical Studio Three-Point Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3.5, 6, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const softFill = new THREE.DirectionalLight(0xfef08a, 0.9);
    softFill.position.set(-3, 3, 2);
    scene.add(softFill);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);

    // Clinical Table / Ground Surface with Soft Shadow Catching
    const table = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.MeshStandardMaterial({ color: 0x07090f, roughness: 0.85, metalness: 0.1 })
    );
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.85;
    table.receiveShadow = true;
    scene.add(table);

    // =========================================================================
    // 5. TRUE VOLUMETRIC 3D ANATOMICAL MODEL (REAL 3D GEOMETRY - NOT A 2D PIC!)
    // =========================================================================
    const tissueGroup = new THREE.Group();
    tissueGroup.position.set(-0.2, 0, 0); // Front and center
    scene.add(tissueGroup);

    const blockWidth = 2.6;
    const blockDepth = 1.8;

    // -------------------------------------------------------------------------
    // LAYER 1: 3D EPIDERMIS & DERMIS (Top 0–3mm, y: 0.40 to 0.75)
    // -------------------------------------------------------------------------
    const dermisMat = new THREE.MeshStandardMaterial({
      color: 0xe5ad92, // Living human skin tone
      roughness: 0.48,
      metalness: 0.02
    });

    const dermisGeo = new THREE.BoxGeometry(blockWidth, 0.35, blockDepth);
    const dermisMesh = new THREE.Mesh(dermisGeo, dermisMat);
    dermisMesh.position.y = 0.575;
    dermisMesh.castShadow = true;
    dermisMesh.receiveShadow = true;
    tissueGroup.add(dermisMesh);

    // Top Skin Plane for Real-Time Dynamic Indentation / Dimpling
    const topSkinGeo = new THREE.PlaneGeometry(blockWidth, blockDepth, 32, 32);
    topSkinGeo.rotateX(-Math.PI / 2);
    const topSkinMat = new THREE.MeshStandardMaterial({
      color: 0xebbaa4,
      roughness: 0.44,
      metalness: 0.02,
      side: THREE.DoubleSide
    });
    const topSkin = new THREE.Mesh(topSkinGeo, topSkinMat);
    topSkin.position.y = 0.755;
    topSkin.receiveShadow = true;
    tissueGroup.add(topSkin);
    skinMeshRef.current = topSkin;

    const skinPosAttr = topSkinGeo.attributes.position;
    originalSkinPositionsRef.current = new Float32Array(skinPosAttr.array);

    // 3D Dermal Capillary Mesh (Real 3D micro-vascular tubes winding inside the dermis)
    const vascularGroup = new THREE.Group();
    const vesselMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.3 });
    for (let i = 0; i < 28; i++) {
      const vCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3((Math.random() - 0.5) * 2.4, 0.42, 0.88),
        new THREE.Vector3((Math.random() - 0.5) * 2.4, 0.55 + Math.random() * 0.1, 0.89),
        new THREE.Vector3((Math.random() - 0.5) * 2.4, 0.68, 0.88)
      ]);
      const vGeo = new THREE.TubeGeometry(vCurve, 12, 0.007, 6, false);
      const vMesh = new THREE.Mesh(vGeo, vesselMat);
      vascularGroup.add(vMesh);
    }
    tissueGroup.add(vascularGroup);

    // Target Acupoint Beacon Ring (BL-54 / GB-34)
    const beacon = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.12, 28),
      new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
    );
    beacon.rotation.x = -Math.PI / 2;
    beacon.position.set(0, 0.76, blockDepth / 2 - 0.05);
    tissueGroup.add(beacon);

    // Thermal Bloom Ring (When Moxa is active)
    const thermalRing = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.42, 32),
      new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.0, side: THREE.DoubleSide })
    );
    thermalRing.rotation.x = -Math.PI / 2;
    thermalRing.position.set(0, 0.762, blockDepth / 2 - 0.05);
    tissueGroup.add(thermalRing);
    thermalRingRef.current = thermalRing;

    // -------------------------------------------------------------------------
    // LAYER 2: 3D SUBCUTANEOUS ADIPOSE (FAT) - 500+ INDIVIDUAL 3D SPHERES!
    // -------------------------------------------------------------------------
    // Supportive matrix base
    const fatBaseMat = new THREE.MeshStandardMaterial({
      color: 0xca8a04,
      roughness: 0.4,
      metalness: 0.05
    });
    const fatBase = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, 0.4, blockDepth), fatBaseMat);
    fatBase.position.y = 0.2;
    fatBase.receiveShadow = true;
    tissueGroup.add(fatBase);

    // 500+ Real 3D Spherical Adipose Fat Globules (Clustered lipid pearls)
    const fatSphereGeo = new THREE.SphereGeometry(0.055, 12, 12);
    const fatSphereMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.22,
      metalness: 0.15
    });
    const fatInstances = new THREE.InstancedMesh(fatSphereGeo, fatSphereMat, 520);
    fatInstances.castShadow = true;
    fatInstances.receiveShadow = true;

    const dummy = new THREE.Object3D();
    let fatCount = 0;

    // Clustered throughout the adipose volume, with dense protrusion on the front cutaway
    for (let x = -1.22; x <= 1.22; x += 0.14) {
      for (let y = 0.03; y <= 0.37; y += 0.11) {
        // Front cutaway dense face
        dummy.position.set(
          x + (Math.random() - 0.5) * 0.06,
          y + (Math.random() - 0.5) * 0.04,
          0.88 + Math.random() * 0.06
        );
        const s = 0.75 + Math.random() * 0.6;
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        fatInstances.setMatrixAt(fatCount++, dummy.matrix);

        // Deeper interior adipose
        if (fatCount < 520) {
          dummy.position.set(
            x + (Math.random() - 0.5) * 0.08,
            y + (Math.random() - 0.5) * 0.05,
            (Math.random() - 0.5) * 1.5
          );
          dummy.scale.set(s * 0.9, s * 0.9, s * 0.9);
          dummy.updateMatrix();
          fatInstances.setMatrixAt(fatCount++, dummy.matrix);
        }
      }
    }
    fatInstances.instanceMatrix.needsUpdate = true;
    tissueGroup.add(fatInstances);

    // 3D Fibrous Collagen Septa Sheets (Glistening white fascial bands dividing fat lobules)
    const septaMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.65
    });
    for (let i = 0; i < 6; i++) {
      const septa = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.36, 0.15), septaMat);
      septa.position.set(-1.0 + i * 0.4, 0.2, 0.9);
      septa.rotation.z = (Math.random() - 0.5) * 0.3;
      tissueGroup.add(septa);
    }

    // -------------------------------------------------------------------------
    // LAYER 3: 3D DEEP FASCIA MEMBRANE SHEATH (At y = 0.0)
    // -------------------------------------------------------------------------
    const fasciaSheath = new THREE.Mesh(
      new THREE.BoxGeometry(blockWidth, 0.02, blockDepth),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25, metalness: 0.15, transparent: true, opacity: 0.85 })
    );
    fasciaSheath.position.y = 0.0;
    tissueGroup.add(fasciaSheath);

    // -------------------------------------------------------------------------
    // LAYER 4: 3D STRIATED SKELETAL MUSCLE WITH CYLINDRICAL FASCICLE BUNDLES
    // -------------------------------------------------------------------------
    const muscleBaseMat = new THREE.MeshStandardMaterial({
      color: 0x4c0519, // Deep dark crimson
      roughness: 0.6,
      metalness: 0.05
    });
    const muscleBase = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, 0.74, blockDepth), muscleBaseMat);
    muscleBase.position.y = -0.37;
    muscleBase.receiveShadow = true;
    tissueGroup.add(muscleBase);

    // Rows of 3D Cylindrical Muscle Fascicle Cords running horizontally across cutaway
    const fascicleMat = new THREE.MeshStandardMaterial({
      color: 0x881337,
      roughness: 0.35,
      metalness: 0.1
    });
    for (let y = -0.7; y <= -0.05; y += 0.065) {
      const fascicle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.028, 0.028, blockWidth, 12),
        fascicleMat
      );
      fascicle.rotation.z = Math.PI / 2;
      fascicle.position.set(0, y, 0.9);
      fascicle.castShadow = true;
      fascicle.receiveShadow = true;
      tissueGroup.add(fascicle);
    }

    // -------------------------------------------------------------------------
    // 6. TRUE 3D VOLUMETRIC PATHOLOGY GEOMETRY (Integrated into the Muscle!)
    // -------------------------------------------------------------------------
    const targetX = -0.2;
    const targetZ = 0.88;

    // A: 3D Spastic Myofascial Trigger Knot (Tightly wound coiled muscular spasm)
    const knot3DGroup = new THREE.Group();
    knot3DGroup.position.set(targetX, -0.42, targetZ);
    scene.add(knot3DGroup);
    knotMeshRef.current = knot3DGroup;

    // Coiled hyper-contracted myofibril knot
    const knotCore = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.14, 0.045, 64, 16, 2, 3),
      new THREE.MeshStandardMaterial({ color: 0xff1e46, emissive: 0x9f1239, emissiveIntensity: 1.8, roughness: 0.25 })
    );
    knot3DGroup.add(knotCore);

    // Radiating Taut Band Fibers
    const tautBandMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.7 });
    for (let a = 0; a < 6; a++) {
      const angle = (a / 6) * Math.PI * 2;
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.35, 8), tautBandMat);
      band.position.set(Math.cos(angle) * 0.16, Math.sin(angle) * 0.16, 0);
      band.rotation.z = angle + Math.PI / 2;
      knot3DGroup.add(band);
    }

    // B: 3D Fascial Adhesion (Tangled fibrotic fascia knot)
    const adhGroup = new THREE.Group();
    adhGroup.position.set(targetX, 0.05, targetZ);
    scene.add(adhGroup);
    adhesionMeshRef.current = adhGroup;
    adhGroup.visible = false;

    const adh3DMesh = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.13, 0.038, 48, 12, 3, 4),
      new THREE.MeshStandardMaterial({ color: 0xc084fc, emissive: 0x7e22ce, emissiveIntensity: 1.5, roughness: 0.35 })
    );
    adhGroup.add(adh3DMesh);

    // C: 3D Cold Stasis (Sub-dermal microvascular stagnation disc)
    const stasisGroup = new THREE.Group();
    stasisGroup.position.set(targetX, 0.68, targetZ);
    scene.add(stasisGroup);
    stasisMeshRef.current = stasisGroup;
    stasisGroup.visible = false;

    const stasis3DMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.03, 24),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.6, roughness: 0.3 })
    );
    stasisGroup.add(stasis3DMesh);

    // -------------------------------------------------------------------------
    // 7. 3D INSTRUMENTS (0.18mm Solid Needle, Glass Cup, Moxa Roll)
    // -------------------------------------------------------------------------
    // A: Authentic 0.18mm Solid Needle with Wound Copper Spiral Handle
    const buildNeedle = () => {
      const g = new THREE.Group();
      
      const spiralCurve = new SpiralHandleCurve(0.024, 0.32, 22);
      const spiralGeo = new THREE.TubeGeometry(spiralCurve, 96, 0.0035, 8, false);
      const copperMat = new THREE.MeshStandardMaterial({ color: 0xc27a3c, metalness: 0.92, roughness: 0.22 });
      const spiralMesh = new THREE.Mesh(spiralGeo, copperMat);
      spiralMesh.position.y = 0.42;
      g.add(spiralMesh);

      const corePin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 0.32, 16),
        copperMat
      );
      corePin.position.y = 0.42;
      g.add(corePin);

      const loopFinial = new THREE.Mesh(
        new THREE.TorusGeometry(0.018, 0.004, 8, 20),
        copperMat
      );
      loopFinial.position.y = 0.58;
      g.add(loopFinial);

      const steelMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.99, roughness: 0.06 });
      const shaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.007, 0.0018, 0.84, 16),
        steelMat
      );
      shaft.position.y = -0.12;
      shaft.castShadow = true;
      g.add(shaft);

      return g;
    };

    const activeNeedle = buildNeedle();
    activeNeedle.position.set(targetX, 1.25, targetZ);
    scene.add(activeNeedle);
    activeNeedleRef.current = activeNeedle;

    // B: Glass Fire Cupping Cup
    const buildGlassCup = () => {
      const g = new THREE.Group();
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.96,
        opacity: 1.0,
        transparent: true,
        roughness: 0.04,
        ior: 1.52,
        thickness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04
      });

      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(0.26, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.68),
        glassMat
      );
      dome.rotation.x = Math.PI;
      g.add(dome);

      const lip = new THREE.Mesh(
        new THREE.TorusGeometry(0.25, 0.026, 16, 32),
        glassMat
      );
      lip.rotation.x = Math.PI / 2;
      lip.position.y = -0.08;
      g.add(lip);

      const flame = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xff6a00, transparent: true, opacity: 0.75 })
      );
      flame.position.y = 0.08;
      g.add(flame);

      return g;
    };

    const activeCup = buildGlassCup();
    activeCup.position.set(targetX, 1.35, targetZ);
    scene.add(activeCup);
    activeCupRef.current = activeCup;
    activeCup.visible = false;

    // C: Moxa Cigar Roll
    const buildMoxa = () => {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 0.58, 24),
        new THREE.MeshStandardMaterial({ color: 0x47382d, roughness: 0.88 })
      );
      g.add(body);

      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(0.067, 0.067, 0.07, 24),
        new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.88, roughness: 0.25 })
      );
      band.position.y = 0.08;
      g.add(band);

      const ember = new THREE.Mesh(
        new THREE.CylinderGeometry(0.064, 0.064, 0.05, 24),
        new THREE.MeshStandardMaterial({ color: 0xff3b00, emissive: 0xff4500, emissiveIntensity: 2.5 })
      );
      ember.position.y = -0.3;
      g.add(ember);

      return g;
    };

    const activeMoxa = buildMoxa();
    activeMoxa.position.set(targetX, 1.35, targetZ);
    scene.add(activeMoxa);
    activeMoxaRef.current = activeMoxa;
    activeMoxa.visible = false;

    // -------------------------------------------------------------------------
    // 8. 3D THANOS ASH & DUST PARTICLES
    // -------------------------------------------------------------------------
    const particleCount = 5000;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -100;
      positions[i * 3 + 2] = 0;

      velocities[i * 3] = (Math.random() - 0.2) * 2.2;
      velocities[i * 3 + 1] = Math.random() * 2.4 + 0.6;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xff3b56,
      size: 0.038,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    particlesRef.current = { mesh: particles, geo: pGeo, mat: pMat, velocities, active: false, timer: 0 };

    // -------------------------------------------------------------------------
    // 9. DIRECT MOUSE DRAG ON CANVAS TO DROP NEEDLE DOWN
    // -------------------------------------------------------------------------
    const handlePointerDown = (e) => {
      if (e.button !== 0) return;
      isDraggingRef.current = true;
      dragStartYRef.current = e.clientY;
      dragStartValRef.current = interactiveDepth;
      controls.enabled = false;
      renderer.domElement.style.cursor = 'ns-resize';
    };

    const handlePointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaY = e.clientY - dragStartYRef.current;
      const targetMax = currentProb.depthTarget;
      const sensitivity = activeTool === 'moxa' ? 0.35 : 0.08;
      const newVal = Math.max(0, Math.min(targetMax + 3, dragStartValRef.current + deltaY * sensitivity));
      handleInteractiveChange(newVal);
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      controls.enabled = true;
      renderer.domElement.style.cursor = 'grab';
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', handlePointerDown);
    domEl.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 10. Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Organic Knot Breathing Pulse
      if (knotMeshRef.current && knotMeshRef.current.visible) {
        const s = 1.0 + Math.sin(time * 4.0) * 0.12;
        knotMeshRef.current.scale.set(s, s, s);
      }
      if (adhesionMeshRef.current && adhesionMeshRef.current.visible) {
        const s = 1.0 + Math.sin(time * 3.5) * 0.1;
        adhesionMeshRef.current.scale.set(s, s, s);
      }
      if (stasisMeshRef.current && stasisMeshRef.current.visible) {
        const s = 1.0 + Math.sin(time * 3.0) * 0.08;
        stasisMeshRef.current.scale.set(s, s, s);
      }

      // 3D Thanos Particle Physics
      const pData = particlesRef.current;
      if (pData && pData.active) {
        pData.timer += delta;
        pData.mat.opacity = Math.max(0, 1.0 - pData.timer / 1.7);

        const posAttr = pData.geo.attributes.position;
        const posArr = posAttr.array;
        const velArr = pData.velocities;

        for (let i = 0; i < particleCount; i++) {
          posArr[i * 3] += velArr[i * 3] * delta;
          posArr[i * 3 + 1] += velArr[i * 3 + 1] * delta;
          posArr[i * 3 + 2] += velArr[i * 3 + 2] * delta;
        }
        posAttr.needsUpdate = true;

        if (pData.timer >= 1.7) {
          pData.active = false;
          pData.mat.opacity = 0;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('pointerdown', handlePointerDown);
      domEl.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [handleInteractiveChange, interactiveDepth, currentProb.depthTarget, activeTool]);

  // Update visible pathology inside 3D tissue block
  useEffect(() => {
    if (knotMeshRef.current) knotMeshRef.current.visible = (selectedProblemIdx === 0) && !isDisintegrated;
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = (selectedProblemIdx === 1) && !isDisintegrated;
    if (stasisMeshRef.current) stasisMeshRef.current.visible = (selectedProblemIdx === 2) && !isDisintegrated;
  }, [selectedProblemIdx, isDisintegrated]);

  // Update active tool visibility
  useEffect(() => {
    if (activeNeedleRef.current) activeNeedleRef.current.visible = (activeTool === 'needle');
    if (activeCupRef.current) activeCupRef.current.visible = (activeTool === 'cup');
    if (activeMoxaRef.current) activeMoxaRef.current.visible = (activeTool === 'moxa');
  }, [activeTool]);

  return (
    <div 
      tabIndex={0}
      data-testid="tissue-depth-simulator"
      className={`transition-all duration-300 font-sans focus:outline-none select-none ${
        isFullscreen 
          ? 'fixed inset-0 z-50 w-screen h-screen bg-[#0a0d14] p-4 flex flex-col justify-between overflow-hidden' 
          : 'relative bg-[#0a0d14] text-neutral-100 rounded-3xl border border-neutral-800 p-4 sm:p-6 shadow-2xl space-y-4 overflow-hidden'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-serif font-bold text-lg">
            3D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                3D Volumetric Anatomical Tissue Strata
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                True 3D Geometry
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              500+ 3D spherical fat lobules • Real striated muscle fascicles • Wound copper needle plunge & Thanos snap
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button 
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs font-medium transition"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Full Screen'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Viewport */}
      <div className="relative w-full h-[520px] sm:h-[580px] rounded-2xl border border-neutral-800/90 overflow-hidden bg-black shadow-inner">
        
        {/* Three.js Canvas Container */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* HUD Top-Left: Tissue Pathology Indicator */}
        <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2 pointer-events-auto">
          <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-3 rounded-2xl shadow-xl space-y-2 max-w-xs">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white">
                Active Condition in Strata
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {CLINICAL_PROBLEMS.map((p, idx) => {
                const isSelected = selectedProblemIdx === idx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectTool(p.toolId)}
                    className={`flex items-center justify-between p-2 rounded-xl text-left border transition ${
                      isSelected
                        ? 'bg-emerald-500 text-neutral-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{p.name}</div>
                      <div className="text-[10px] opacity-80">{p.layer}</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30">
                      {p.toolName.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* HUD Bottom-Center: Clinical Tool Switcher */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 pointer-events-auto">
          <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-3 rounded-2xl shadow-2xl flex flex-col space-y-2 max-w-md">
            <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-1.5">
              <span className="font-black text-white flex items-center gap-1.5">
                <span>Clinical Treatment Tool:</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                Click Tool to Switch
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Tool 1: 0.18mm Needle */}
              <button
                type="button"
                data-testid="tool-needle"
                onClick={() => handleSelectTool('needle')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                  activeTool === 'needle'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-xl">📍</span>
                <span className="text-[11px] font-bold">0.18mm Needle</span>
                <span className="text-[9px] text-neutral-400">Deep Knot (12mm)</span>
              </button>

              {/* Tool 2: Glass Cup */}
              <button
                type="button"
                data-testid="tool-cup"
                onClick={() => handleSelectTool('cup')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                  activeTool === 'cup'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/20 scale-105'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-xl">🫧</span>
                <span className="text-[11px] font-bold">Glass Fire Cup</span>
                <span className="text-[9px] text-neutral-400">Fascial Suction</span>
              </button>

              {/* Tool 3: Herbal Moxa */}
              <button
                type="button"
                data-testid="tool-moxa"
                onClick={() => handleSelectTool('moxa')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                  activeTool === 'moxa'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-xl">🔥</span>
                <span className="text-[11px] font-bold">Herbal Moxa</span>
                <span className="text-[9px] text-neutral-400">43°C Heat</span>
              </button>
            </div>
          </div>
        </div>

        {/* TACTILE V2 DROP-DOWN CONTROL HUD (Top-Right) */}
        {!isDisintegrated && (
          <div className="absolute top-4 right-4 z-20 pointer-events-auto max-w-xs w-full">
            <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-white flex items-center gap-1.5">
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeTool === 'needle' ? 'Needle Penetration' : activeTool === 'cup' ? 'Vacuum Suction' : 'Moxa Heat'}</span>
                </span>
                <span className="text-emerald-400 font-mono text-sm">
                  {interactiveDepth.toFixed(1)} {currentProb.depthUnit}
                </span>
              </div>

              {/* Depth / Suction Slider */}
              <input
                type="range"
                data-testid="tool-depth-slider"
                min="0"
                max={currentProb.depthTarget + 3}
                step="0.1"
                value={interactiveDepth}
                onChange={(e) => handleInteractiveChange(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                <span>Surface (0mm)</span>
                <span className="text-amber-400 font-bold">Knot Target: {currentProb.depthTarget} {currentProb.depthUnit}</span>
              </div>

              {/* ONE-CLICK DROP NEEDLE BUTTON */}
              <button
                type="button"
                data-testid="target-acupoint"
                onClick={dropNeedleToTarget}
                disabled={isSnapping}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs shadow-lg shadow-emerald-950/60 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span>{isSnapping ? 'Disintegrating in 3D...' : `Drop Needle to ${currentProb.depthTarget}mm Knot`}</span>
              </button>

              {/* Anatomical Depth Presets */}
              <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px]">
                <button
                  type="button"
                  onClick={() => handleInteractiveChange(0)}
                  className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-center border border-neutral-800"
                >
                  Surface (0mm)
                </button>
                <button
                  type="button"
                  onClick={() => handleInteractiveChange(4.5)}
                  className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-center border border-neutral-800"
                >
                  Adipose (4.5mm)
                </button>
                <button
                  type="button"
                  onClick={() => handleInteractiveChange(12.0)}
                  className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-center border border-emerald-500/40 font-bold"
                >
                  Knot (12mm)
                </button>
              </div>

              <div className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[10px] text-neutral-300 flex items-start gap-1.5">
                <ArrowDown className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>True 3D Geometry:</strong> Real 3D fat spheres & muscle fascicles. Drag down on the block or click the button to drop the needle into the knot!
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3D Strata Depth Indicators */}
        <div className="absolute left-4 bottom-4 z-10 pointer-events-none hidden md:block">
          <div className="bg-neutral-950/70 backdrop-blur-sm border border-neutral-800 p-2.5 rounded-xl text-[10px] space-y-1 text-neutral-400 font-mono">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ebd0c2]" /> Epidermis & Dermis (0–3mm)</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#facc15]" /> Subcutaneous Adipose (4–8mm)</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#881337]" /> Deep Striated Muscle (9–15mm)</div>
          </div>
        </div>

        {/* LIVE IN-SCENE THANOS STATUS BANNER */}
        {isDisintegrated && (
          <div className="absolute top-4 right-4 z-30 pointer-events-auto max-w-sm w-full animate-fadeIn">
            <div className="bg-neutral-950/95 backdrop-blur-md border border-emerald-500/50 p-4 rounded-2xl shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                  <Check className="w-3.5 h-3.5" /> De-Qi Unlocked (得气)
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Thanos Snap ✓</span>
              </div>

              <div>
                <h4 className="text-sm font-black text-white">
                  {currentProb.reliefTitle}
                </h4>
                <p className="text-[11px] text-neutral-300 mt-0.5 leading-relaxed">
                  {currentProb.reliefText}
                </p>
              </div>

              {/* Physiological Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 block">Spasm</span>
                  <span className="text-sm font-black text-emerald-400">0%</span>
                </div>
                <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 block">Micro-Flow</span>
                  <span className="text-sm font-black text-cyan-400">+380%</span>
                </div>
                <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 block">Sensation</span>
                  <span className="text-sm font-black text-emerald-300">Painless</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Treat Another 3D Pathology</span>
                </button>

                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={() => onOpenBooking(currentProb.name)}
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-black shadow-md shadow-emerald-500/25 transition"
                  >
                    <span>Book (₹600)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
