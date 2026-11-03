import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Flame, 
  Hand,
  Activity,
  Layers,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

// Authentic Web Audio Synthesizer (Snap Pop + Ethereal Wind Whoosh + 528Hz Harmonic Chime)
function playAcuSound(type, isMuted) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'snap') {
      // 1. Crisp Thanos Finger Snap Pop
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(1450, ctx.currentTime);
      snapOsc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08);

      snapGain.gain.setValueAtTime(0.7, ctx.currentTime);
      snapGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start();
      snapOsc.stop(ctx.currentTime + 0.09);

      // 2. Wind / Ash Dissolve Ethereal Whoosh
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
      noiseGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.12);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(ctx.currentTime + 0.04);
      whiteNoise.stop(ctx.currentTime + 1.5);

      // 3. Harmonic 528 Hz Healing Tone
      setTimeout(() => {
        try {
          const toneOsc = ctx.createOscillator();
          const toneGain = ctx.createGain();
          toneOsc.type = 'sine';
          toneOsc.frequency.value = 528;
          toneGain.gain.setValueAtTime(0.2, ctx.currentTime);
          toneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
          toneOsc.connect(toneGain);
          toneGain.connect(ctx.destination);
          toneOsc.start();
          toneOsc.stop(ctx.currentTime + 1.4);
        } catch (_) {}
      }, 250);

    } else if (type === 'suction') {
      // Cupping vacuum draw sound
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
      // Warm herbal moxa crackle
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
      // Instant painless dermal breach click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    }
  } catch (_) {}
}

const PATHOLOGIES = [
  {
    id: 'knot',
    name: 'Spastic Motor Knot',
    layer: 'Deep Striated Muscle',
    targetDepth: 12.0, // mm
    maxDepth: 15.0,
    requiredTool: 'needle',
    toolTitle: '0.18mm Solid Needle',
    skinEffectDesc: 'Painless dermal breach -> glides into deep muscle -> depolarizes knot',
    colorHex: 0xff1e46,
    reliefTitle: 'Motor Endplate Decompressed',
    reliefText: 'Spastic knot vaporized into ash. Muscle fibers uncoil into relaxed parallel flow.'
  },
  {
    id: 'adhesion',
    name: 'Fascial Adhesion',
    layer: 'Subcutaneous Fascia',
    targetDepth: 6.0, // mm suction bulge
    maxDepth: 10.0,
    requiredTool: 'cup',
    toolTitle: 'Glass Fire Cupping',
    skinEffectDesc: 'Vacuum negative pressure -> skin bulges upward -> de-glues stuck fascia',
    colorHex: 0xa855f7,
    reliefTitle: 'Myofascial Adhesion Unlocked',
    reliefText: 'Negative pressure separates restricted fascia. Micro-circulation surges +380%.'
  },
  {
    id: 'stasis',
    name: 'Cold Damp Stagnation',
    layer: 'Epidermis & Dermis',
    targetDepth: 43.0, // °C thermal heat
    maxDepth: 45.0,
    requiredTool: 'moxa',
    toolTitle: 'Pure Herbal Moxa',
    skinEffectDesc: 'Smoldering mugwort roll -> 43°C infrared heat bloom dilates micro-capillaries',
    colorHex: 0x38bdf8,
    reliefTitle: 'Cold Stagnation Vaporized',
    reliefText: 'Infrared heat clears cold constriction. Soothing therapeutic warmth active.'
  }
];

export default function TissueDepthSimulator({ onOpenBooking }) {
  const mountRef = useRef(null);
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [activeTool, setActiveTool] = useState('needle'); // 'needle', 'cup', 'moxa'
  const [interactiveValue, setInteractiveValue] = useState(0); // 0 to 15 (depth mm or suction mm or temp)
  const [isDisintegrated, setIsDisintegrated] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);

  // Dynamic 3D Meshes & Deformers
  const skinSurfaceMeshRef = useRef(null);
  const originalSkinPositionsRef = useRef(null);
  const knotMeshRef = useRef(null);
  const adhesionMeshRef = useRef(null);
  const stasisMeshRef = useRef(null);
  const thermalBloomMeshRef = useRef(null);

  // Active 3D Tools
  const activeNeedleRef = useRef(null);
  const activeCupRef = useRef(null);
  const activeMoxaRef = useRef(null);

  // 3D Thanos Particles
  const particlesRef = useRef(null);

  const currentProb = PATHOLOGIES[selectedProblemIndex];

  // Initialize Three.js 3D Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06080d);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(2.6, 3.0, 3.6);
    cameraRef.current = camera;

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. OrbitControls (Mouse drag to orbit 360, scroll to zoom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 7.0;
    controls.minDistance = 1.8;
    controls.target.set(0, 0.2, 0);
    controlsRef.current = controls;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ee, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const softFloorLight = new THREE.PointLight(0x10b981, 0.9, 8);
    softFloorLight.position.set(0, -0.6, 0);
    scene.add(softFloorLight);

    // 5. Build 3D Stratified Anatomical Human Tissue Block (Cutaway View)
    const tissueGroup = new THREE.Group();
    tissueGroup.position.set(-0.55, 0, 0);
    scene.add(tissueGroup);

    const blockWidth = 2.2;
    const blockDepth = 2.2;

    // Texture Loader for biological cross-section
    const textureLoader = new THREE.TextureLoader();
    const cutawayTexture = textureLoader.load(getAssetUrl('tissue_cross_section_clean.jpg'));
    cutawayTexture.wrapS = THREE.RepeatWrapping;
    cutawayTexture.wrapT = THREE.RepeatWrapping;

    // Layer 1: Deep Striated Skeletal Muscle (Bottom Layer, 9–15mm)
    const muscleGeo = new THREE.BoxGeometry(blockWidth, 0.6, blockDepth);
    const muscleMat = new THREE.MeshStandardMaterial({
      color: 0x881337,
      map: cutawayTexture,
      roughness: 0.55,
      metalness: 0.05
    });
    const muscleMesh = new THREE.Mesh(muscleGeo, muscleMat);
    muscleMesh.position.y = -0.3;
    muscleMesh.castShadow = true;
    muscleMesh.receiveShadow = true;
    tissueGroup.add(muscleMesh);

    // Muscle fiber striated ridges
    for (let i = -4; i <= 4; i++) {
      const fiberGeo = new THREE.BoxGeometry(blockWidth + 0.01, 0.02, 0.08);
      const fiberMat = new THREE.MeshBasicMaterial({ color: 0x9f1239 });
      const fiber = new THREE.Mesh(fiberGeo, fiberMat);
      fiber.position.set(0, -0.15 - Math.abs(i) * 0.03, i * 0.22);
      tissueGroup.add(fiber);
    }

    // Layer 2: Subcutaneous Fascia & Adipose (Middle Layer, 4–8mm)
    const fasciaGeo = new THREE.BoxGeometry(blockWidth, 0.45, blockDepth);
    const fasciaMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.8,
      metalness: 0.02
    });
    const fasciaMesh = new THREE.Mesh(fasciaGeo, fasciaMat);
    fasciaMesh.position.y = 0.225;
    fasciaMesh.castShadow = true;
    fasciaMesh.receiveShadow = true;
    tissueGroup.add(fasciaMesh);

    // 3D Adipose / Fat globules (Yellow clusters)
    for (let i = 0; i < 26; i++) {
      const fatGeo = new THREE.SphereGeometry(0.065 + Math.random() * 0.03, 12, 10);
      const fatMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 });
      const fat = new THREE.Mesh(fatGeo, fatMat);
      const fx = (Math.random() - 0.5) * 1.8;
      const fz = (Math.random() - 0.5) * 1.8;
      const fy = 0.12 + Math.random() * 0.22;
      fat.position.set(fx, fy, fz);
      tissueGroup.add(fat);
    }

    // Layer 3: Epidermis & Dermis (Top Skin Surface with Real Dynamic Deformable Vertex Grid)
    // High-subdivision plane for real skin indentation (needle) & skin bulging (cupping suction)
    const skinGeo = new THREE.PlaneGeometry(blockWidth, blockDepth, 32, 32);
    skinGeo.rotateX(-Math.PI / 2);
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xe0a98f, // Natural healthy human skin tone
      roughness: 0.45,
      metalness: 0.02,
      side: THREE.DoubleSide
    });
    const skinSurface = new THREE.Mesh(skinGeo, skinMat);
    skinSurface.position.y = 0.7; // Top surface level
    skinSurface.receiveShadow = true;
    tissueGroup.add(skinSurface);
    skinSurfaceMeshRef.current = skinSurface;

    // Save initial vertex positions for deformation physics
    const posAttr = skinGeo.attributes.position;
    originalSkinPositionsRef.current = new Float32Array(posAttr.array);

    // Dermal block support sides
    const dermisSideGeo = new THREE.BoxGeometry(blockWidth, 0.25, blockDepth);
    const dermisSideMat = new THREE.MeshStandardMaterial({ color: 0xd9957a, roughness: 0.5 });
    const dermisSide = new THREE.Mesh(dermisSideGeo, dermisSideMat);
    dermisSide.position.y = 0.575;
    tissueGroup.add(dermisSide);

    // Thermal Bloom Circle (Appears on skin when Moxa is applied)
    const bloomGeo = new THREE.RingGeometry(0.02, 0.42, 32);
    const bloomMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    });
    const thermalBloom = new THREE.Mesh(bloomGeo, bloomMat);
    thermalBloom.rotation.x = -Math.PI / 2;
    thermalBloom.position.set(-0.65, 0.705, 0.72);
    scene.add(thermalBloom);
    thermalBloomMeshRef.current = thermalBloom;

    // 6. PATHOLOGIES INSIDE 3D TISSUE (Visible at front cutaway edge)
    const cutawayX = -0.65;
    const cutawayZ = 0.72;

    // A: Spastic Motor Knot (Deep muscle layer, 12mm deep)
    const knotGroup = new THREE.Group();
    knotGroup.position.set(cutawayX, -0.22, cutawayZ);
    scene.add(knotGroup);
    knotMeshRef.current = knotGroup;

    const knotCore = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.18, 2),
      new THREE.MeshStandardMaterial({ color: 0xff1e46, emissive: 0xcc0033, emissiveIntensity: 1.5, roughness: 0.35 })
    );
    knotGroup.add(knotCore);

    const knotRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.018, 12, 32),
      new THREE.MeshBasicMaterial({ color: 0xff2b56, transparent: true, opacity: 0.85 })
    );
    knotRing.rotation.x = Math.PI / 2;
    knotGroup.add(knotRing);

    // Target Aiming Reticle on skin surface
    const beacon = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.12, 24),
      new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
    );
    beacon.rotation.x = -Math.PI / 2;
    beacon.position.set(cutawayX, 0.71, cutawayZ);
    scene.add(beacon);

    // B: Fascial Adhesion (Subcutaneous fascia, 5mm deep)
    const adhesionGroup = new THREE.Group();
    adhesionGroup.position.set(cutawayX, 0.24, cutawayZ);
    scene.add(adhesionGroup);
    adhesionMeshRef.current = adhesionGroup;
    adhesionGroup.visible = false;

    const adhMesh = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.14, 0.04, 48, 8),
      new THREE.MeshStandardMaterial({ color: 0xc084fc, emissive: 0x7e22ce, emissiveIntensity: 1.3, roughness: 0.4 })
    );
    adhesionGroup.add(adhMesh);

    // C: Cold Stasis (Near skin surface, 2mm deep)
    const stasisGroup = new THREE.Group();
    stasisGroup.position.set(cutawayX, 0.69, cutawayZ);
    scene.add(stasisGroup);
    stasisMeshRef.current = stasisGroup;
    stasisGroup.visible = false;

    const stasisMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.02, 24),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.4, roughness: 0.3 })
    );
    stasisGroup.add(stasisMesh);

    // 7. 3D INSTRUMENT TRAY NEXT TO TISSUE BLOCK
    const trayGroup = new THREE.Group();
    trayGroup.position.set(1.45, -0.2, 0);
    scene.add(trayGroup);

    // Stainless steel procedure tray
    const trayBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.05, 1.8),
      new THREE.MeshStandardMaterial({ color: 0xdde3ed, roughness: 0.2, metalness: 0.92 })
    );
    trayBase.castShadow = true;
    trayBase.receiveShadow = true;
    trayGroup.add(trayBase);

    // Sterile cloth liner
    const liner = new THREE.Mesh(
      new THREE.BoxGeometry(0.92, 0.01, 1.72),
      new THREE.MeshStandardMaterial({ color: 0xecfdf5, roughness: 0.85 })
    );
    liner.position.y = 0.03;
    trayGroup.add(liner);

    // 3D Needle on Tray
    const trayNeedle = new THREE.Group();
    trayNeedle.position.set(-0.25, 0.08, -0.45);
    trayNeedle.rotation.z = Math.PI / 2;
    const tHandle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.2, 16),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.2 })
    );
    tHandle.position.y = 0.15;
    trayNeedle.add(tHandle);
    const tShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.002, 0.45, 12),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.98, roughness: 0.05 })
    );
    tShaft.position.y = -0.12;
    trayNeedle.add(tShaft);
    trayGroup.add(trayNeedle);

    // 3D Moxa Cigar on Tray
    const trayMoxa = new THREE.Group();
    trayMoxa.position.set(0.15, 0.08, -0.35);
    trayMoxa.rotation.x = Math.PI / 2;
    const mBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.45, 16),
      new THREE.MeshStandardMaterial({ color: 0x44352a, roughness: 0.9 })
    );
    trayMoxa.add(mBody);
    const mTip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.048, 0.048, 0.04, 16),
      new THREE.MeshStandardMaterial({ color: 0xff4500, emissive: 0xff3b10, emissiveIntensity: 1.4 })
    );
    mTip.position.y = 0.23;
    trayMoxa.add(mTip);
    trayGroup.add(trayMoxa);

    // 3D Glass Fire Cup on Tray
    const trayCup = new THREE.Group();
    trayCup.position.set(-0.1, 0.14, 0.4);
    const cDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.65),
      new THREE.MeshPhysicalMaterial({ color: 0x67e8f9, transmission: 0.95, opacity: 0.5, transparent: true, roughness: 0.05 })
    );
    cDome.rotation.x = Math.PI;
    trayCup.add(cDome);
    trayGroup.add(trayCup);

    // 8. ACTIVE IN-ACTION 3D TOOLS (HOVERING ABOVE TISSUE CUTAWAY)
    // Active Needle
    const activeNeedle = new THREE.Group();
    activeNeedle.position.set(cutawayX, 1.15, cutawayZ);
    scene.add(activeNeedle);
    activeNeedleRef.current = activeNeedle;

    const aHandle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.28, 16),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.2 })
    );
    aHandle.position.y = 0.38;
    activeNeedle.add(aHandle);

    const aShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.002, 0.62, 12),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.98, roughness: 0.05 })
    );
    aShaft.position.y = 0.02;
    activeNeedle.add(aShaft);

    const aTube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.028, 0.5, 16),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, opacity: 0.45, transparent: true, roughness: 0.1 })
    );
    aTube.position.y = 0.15;
    activeNeedle.add(aTube);

    // Active Glass Cup
    const activeCup = new THREE.Group();
    activeCup.position.set(cutawayX, 1.25, cutawayZ);
    scene.add(activeCup);
    activeCupRef.current = activeCup;
    activeCup.visible = false;

    const actDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.65),
      new THREE.MeshPhysicalMaterial({ color: 0x67e8f9, transmission: 0.95, opacity: 0.55, transparent: true, roughness: 0.05, thickness: 0.05 })
    );
    actDome.rotation.x = Math.PI;
    activeCup.add(actDome);

    // Active Moxa Cigar
    const activeMoxa = new THREE.Group();
    activeMoxa.position.set(cutawayX, 1.25, cutawayZ);
    scene.add(activeMoxa);
    activeMoxaRef.current = activeMoxa;
    activeMoxa.visible = false;

    const actMoxaBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.55, 20),
      new THREE.MeshStandardMaterial({ color: 0x3d2e24, roughness: 0.9 })
    );
    activeMoxa.add(actMoxaBody);
    const actMoxaTip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.068, 0.068, 0.05, 20),
      new THREE.MeshStandardMaterial({ color: 0xff3b10, emissive: 0xff4500, emissiveIntensity: 1.8 })
    );
    actMoxaTip.position.y = -0.28;
    activeMoxa.add(actMoxaTip);

    // 9. 3D THANOS ASH & DUST DISINTEGRATION PARTICLES
    const particleCount = 5000;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -100;
      positions[i * 3 + 2] = 0;

      velocities[i * 3] = (Math.random() - 0.2) * 2.0; // Blow rightward
      velocities[i * 3 + 1] = Math.random() * 2.2 + 0.5; // Rise upward
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xff3b56,
      size: 0.035,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    particlesRef.current = { mesh: particles, geo: pGeo, mat: pMat, velocities, active: false, timer: 0 };

    // 10. Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Knot breathing pulsation
      if (knotMeshRef.current && knotMeshRef.current.visible) {
        const s = 1.0 + Math.sin(time * 5.0) * 0.08;
        knotMeshRef.current.scale.set(s, s, s);
      }
      if (adhesionMeshRef.current && adhesionMeshRef.current.visible) {
        adhesionMeshRef.current.rotation.y += 0.015;
      }

      // 3D Thanos Particle Drift Physics
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
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update visible pathology inside 3D tissue block
  useEffect(() => {
    if (knotMeshRef.current) knotMeshRef.current.visible = (selectedProblemIndex === 0) && !isDisintegrated;
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = (selectedProblemIndex === 1) && !isDisintegrated;
    if (stasisMeshRef.current) stasisMeshRef.current.visible = (selectedProblemIndex === 2) && !isDisintegrated;
  }, [selectedProblemIndex, isDisintegrated]);

  // Update active tool visibility above tissue block
  useEffect(() => {
    if (activeNeedleRef.current) activeNeedleRef.current.visible = (activeTool === 'needle');
    if (activeCupRef.current) activeCupRef.current.visible = (activeTool === 'cup');
    if (activeMoxaRef.current) activeMoxaRef.current.visible = (activeTool === 'moxa');
  }, [activeTool]);

  // REAL DYNAMIC SKIN DEFORMATION & TOOL DISPLACEMENT WITH MOUSE VALUE
  const applySkinPhysicsAndToolHeight = useCallback((val) => {
    const skinMesh = skinSurfaceMeshRef.current;
    const origPos = originalSkinPositionsRef.current;
    if (!skinMesh || !origPos) return;

    const posAttr = skinMesh.geometry.attributes.position;
    const posArr = posAttr.array;

    // Contact center in skin local coordinates
    const targetLocalX = -0.65 - (-0.55); // -0.1
    const targetLocalZ = 0.72 - 0; // 0.72

    if (activeTool === 'needle') {
      // NEEDLE INTERACTION:
      // Depth val: 0mm (resting above) to 15mm (plunged deep into muscle)
      // Tool height: from 1.15 (resting) down to 0.38 (plunged)
      const depthFraction = Math.min(1.0, val / 15.0);
      if (activeNeedleRef.current) {
        activeNeedleRef.current.position.y = 1.15 - depthFraction * 0.77;
      }

      // Skin Elastic Dimpling:
      // As needle presses 0 to 1.5mm, skin indents downward locally, then pops through!
      const dimpleAmount = val < 2.0 ? (val / 2.0) * 0.06 : Math.max(0, 0.06 - (val - 2.0) * 0.02);

      for (let i = 0; i < posArr.length; i += 3) {
        const vx = origPos[i];
        const vz = origPos[i + 2];
        const dist = Math.hypot(vx - targetLocalX, vz - targetLocalZ);

        if (dist < 0.28) {
          const falloff = Math.cos((dist / 0.28) * (Math.PI / 2));
          posArr[i + 1] = origPos[i + 1] - dimpleAmount * falloff; // Indent downward
        } else {
          posArr[i + 1] = origPos[i + 1];
        }
      }
      posAttr.needsUpdate = true;

    } else if (activeTool === 'cup') {
      // CUPPING INTERACTION:
      // Vacuum suction val: 0mm to 10mm
      // Cup descends onto skin, then skin BULGES UPWARD inside the dome
      const suctionFraction = Math.min(1.0, val / 10.0);
      if (activeCupRef.current) {
        activeCupRef.current.position.y = 1.25 - suctionFraction * 0.45;
      }

      const bulgeHeight = suctionFraction * 0.14; // Bulges upward inside glass dome
      for (let i = 0; i < posArr.length; i += 3) {
        const vx = origPos[i];
        const vz = origPos[i + 2];
        const dist = Math.hypot(vx - targetLocalX, vz - targetLocalZ);

        if (dist < 0.26) {
          const falloff = Math.cos((dist / 0.26) * (Math.PI / 2));
          posArr[i + 1] = origPos[i + 1] + bulgeHeight * falloff; // Bulge upward
        } else {
          posArr[i + 1] = origPos[i + 1];
        }
      }
      posAttr.needsUpdate = true;

    } else if (activeTool === 'moxa') {
      // MOXA INTERACTION:
      // Temperature val: 0°C to 45°C
      const heatFraction = Math.min(1.0, val / 45.0);
      if (activeMoxaRef.current) {
        activeMoxaRef.current.position.y = 1.25 - heatFraction * 0.35;
      }

      // Radiate thermal bloom on skin
      if (thermalBloomMeshRef.current) {
        thermalBloomMeshRef.current.material.opacity = heatFraction * 0.85;
      }
    }
  }, [activeTool]);

  // Handle Mouse Slider/Drag to Control Tool in Real-Time
  const handleInteractiveChange = (val) => {
    setInteractiveValue(val);
    applySkinPhysicsAndToolHeight(val);

    // Audio cue on initial breach or suction
    if (activeTool === 'needle' && val >= 1.5 && val < 2.5) {
      playAcuSound('breach', isMuted);
    } else if (activeTool === 'cup' && val >= 3.0 && val < 4.0) {
      playAcuSound('suction', isMuted);
    } else if (activeTool === 'moxa' && val >= 25.0 && val < 28.0) {
      playAcuSound('moxa', isMuted);
    }

    // Target threshold reached -> Trigger 3D Thanos Disintegration!
    if (val >= currentProb.targetDepth && !isDisintegrated && !isSnapping) {
      triggerThanosDisintegration();
    }
  };

  // 3D Thanos Snap Disintegration Engine
  const triggerThanosDisintegration = useCallback(() => {
    if (isSnapping || isDisintegrated) return;
    setIsSnapping(true);
    playAcuSound('snap', isMuted);

    // Hide active pathology mesh
    if (knotMeshRef.current) knotMeshRef.current.visible = false;
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = false;
    if (stasisMeshRef.current) stasisMeshRef.current.visible = false;

    // Spawn 5,000 Thanos 3D Particles
    const pData = particlesRef.current;
    if (pData) {
      pData.active = true;
      pData.timer = 0;
      pData.mat.opacity = 1.0;
      pData.mat.color = new THREE.Color(currentProb.colorHex);

      const posAttr = pData.geo.attributes.position;
      const posArr = posAttr.array;
      const originY = activeTool === 'needle' ? -0.22 : activeTool === 'cup' ? 0.24 : 0.69;

      for (let i = 0; i < 5000; i++) {
        posArr[i * 3] = -0.65 + (Math.random() - 0.5) * 0.35;
        posArr[i * 3 + 1] = originY + (Math.random() - 0.5) * 0.35;
        posArr[i * 3 + 2] = 0.72 + (Math.random() - 0.5) * 0.35;
      }
      posAttr.needsUpdate = true;
    }

    // Trigger UI relief state
    setTimeout(() => {
      setIsDisintegrated(true);
      setIsSnapping(false);
    }, 400);
  }, [isSnapping, isDisintegrated, activeTool, isMuted, currentProb]);

  // Reset treatment
  const handleReset = useCallback(() => {
    setIsDisintegrated(false);
    setIsSnapping(false);
    setInteractiveValue(0);

    applySkinPhysicsAndToolHeight(0);

    if (knotMeshRef.current) knotMeshRef.current.visible = (selectedProblemIndex === 0);
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = (selectedProblemIndex === 1);
    if (stasisMeshRef.current) stasisMeshRef.current.visible = (selectedProblemIndex === 2);

    if (thermalBloomMeshRef.current) thermalBloomMeshRef.current.material.opacity = 0;
  }, [selectedProblemIndex, applySkinPhysicsAndToolHeight]);

  // Switch pathology
  const handleSelectPathology = (idx) => {
    setSelectedProblemIndex(idx);
    setActiveTool(PATHOLOGIES[idx].requiredTool);
    handleReset();
  };

  // Switch tool from 3D Tray
  const handleSelectTool = (toolId) => {
    setActiveTool(toolId);
    handleReset();
  };

  return (
    <div 
      tabIndex={0}
      data-testid="tissue-depth-simulator"
      className={`transition-all duration-300 font-sans focus:outline-none select-none ${
        isFullscreen 
          ? 'fixed inset-0 z-50 w-screen h-screen bg-[#06080d] p-4 flex flex-col justify-between overflow-hidden' 
          : 'relative bg-[#06080d] text-neutral-100 rounded-3xl border border-neutral-800 p-4 sm:p-6 shadow-2xl space-y-4 overflow-hidden'
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
                3D Tissue Strata & Equipment Tray
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Mouse Physics
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Drag mouse to apply 3D equipment • Real skin dimple & suction bulge physics • 3D Thanos ash disintegration
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

      {/* Main 3D Viewport & Interactive Layer Controls */}
      <div className="relative w-full h-[520px] sm:h-[580px] rounded-2xl border border-neutral-800/90 overflow-hidden bg-black shadow-inner">
        
        {/* Three.js Canvas Container (Mouse: Left Drag to Orbit, Wheel to Zoom) */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* HUD Top-Left: Tissue Strata & Pathology Selector */}
        <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2 pointer-events-auto">
          <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-3 rounded-2xl shadow-xl space-y-2 max-w-xs">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white">
                Tissue Strata Pathologies
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {PATHOLOGIES.map((p, idx) => {
                const isSelected = selectedProblemIndex === idx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPathology(idx)}
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
                      {p.requiredTool}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* HUD Bottom-Center: 3D Steel Tray Tool Selector */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 pointer-events-auto">
          <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-3 rounded-2xl shadow-2xl flex flex-col space-y-2 max-w-md">
            <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-1.5">
              <span className="font-black text-white flex items-center gap-1.5">
                <Hand className="w-3.5 h-3.5 text-emerald-400" />
                <span>Select Tool from 3D Tray:</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                Click Tool to Equip
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
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/20'
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
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/20'
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
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-xl">🔥</span>
                <span className="text-[11px] font-bold">Herbal Moxa</span>
                <span className="text-[9px] text-neutral-400">43°C Infrared Heat</span>
              </button>
            </div>
          </div>
        </div>

        {/* TACTILE INTERACTIVE MOUSE CONTROL SLIDER: Real-time Skin Physics & Plunge */}
        {!isDisintegrated && (
          <div className="absolute top-4 right-4 z-20 pointer-events-auto max-w-xs w-full">
            <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-white flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeTool === 'needle' ? 'Plunge Depth' : activeTool === 'cup' ? 'Suction Vacuum' : 'Moxa Heat'}</span>
                </span>
                <span className="text-emerald-400 font-mono text-sm">
                  {activeTool === 'needle' ? `${interactiveValue.toFixed(1)} mm` : activeTool === 'cup' ? `${interactiveValue.toFixed(1)} mm bulge` : `${interactiveValue.toFixed(0)} °C`}
                </span>
              </div>

              {/* Interactive Mouse Drag Slider */}
              <input
                type="range"
                data-testid="tool-depth-slider"
                min="0"
                max={currentProb.maxDepth}
                step="0.1"
                value={interactiveValue}
                onChange={(e) => handleInteractiveChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                <span>0</span>
                <span className="text-amber-400 font-bold">Target: {currentProb.targetDepth} {activeTool === 'moxa' ? '°C' : 'mm'}</span>
                <span>{currentProb.maxDepth}</span>
              </div>

              {/* 1-Click Action Alternative (Also available) */}
              <button
                type="button"
                data-testid="target-acupoint"
                onClick={() => handleInteractiveChange(currentProb.targetDepth)}
                disabled={isSnapping}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs shadow-lg shadow-rose-950/60 active:scale-95 transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>{isSnapping ? 'Disintegrating in 3D...' : `Apply ${currentProb.toolTitle}`}</span>
              </button>

              <p className="text-[10px] text-neutral-400 italic text-center">
                {currentProb.skinEffectDesc}
              </p>
            </div>
          </div>
        )}

        {/* 3D Strata Depth Indicators */}
        <div className="absolute left-4 bottom-4 z-10 pointer-events-none hidden md:block">
          <div className="bg-neutral-950/70 backdrop-blur-sm border border-neutral-800 p-2.5 rounded-xl text-[10px] space-y-1 text-neutral-400 font-mono">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#e0a98f]" /> Epidermis & Dermis (0–3mm)</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#fef08a]" /> Subcutaneous Adipose (4–8mm)</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#881337]" /> Deep Striated Muscle (9–15mm)</div>
          </div>
        </div>

        {/* Post-Disintegration 3D Relief Overlay */}
        {isDisintegrated && (
          <div className="absolute inset-0 z-30 bg-emerald-950/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn pointer-events-auto">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-xl shadow-emerald-500/30">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
                <Check className="w-3.5 h-3.5" /> De-Qi Unlocked (得气) • 3D Thanos Disintegration Complete
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {currentProb.reliefTitle}
              </h3>
              <p className="text-xs text-neutral-300 max-w-md mx-auto mt-1">
                {currentProb.reliefText}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
                <span className="text-[10px] font-bold text-neutral-400 block">Pathology Spasm</span>
                <span className="text-lg font-black text-emerald-400">0%</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
                <span className="text-[10px] font-bold text-neutral-400 block">Micro-Flow</span>
                <span className="text-lg font-black text-cyan-400">+380%</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
                <span className="text-[10px] font-bold text-neutral-400 block">Needle Sensation</span>
                <span className="text-lg font-black text-emerald-300">Painless</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Treat Another 3D Pathology</span>
              </button>

              {onOpenBooking && (
                <button
                  type="button"
                  onClick={() => onOpenBooking(currentProb.name)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-black shadow-lg shadow-emerald-500/25 transition"
                >
                  <span>Book Consultation (₹600)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
