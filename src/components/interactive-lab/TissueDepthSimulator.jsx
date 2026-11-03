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
  Hand,
  Layers,
  Activity,
  MoveDown,
  Flame,
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

    } else if (type === 'pickup') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);

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

// Procedural Multi-Layer Biological Strata Texture (Skin -> Adipose Pearls -> Striated Muscle)
function createSideStrataTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // 1. Epidermis & Dermis (Top 0 to 240px)
  const dermisGrad = ctx.createLinearGradient(0, 0, 0, 240);
  dermisGrad.addColorStop(0, '#f1c1b0');
  dermisGrad.addColorStop(0.5, '#e4a592');
  dermisGrad.addColorStop(1, '#c97964');
  ctx.fillStyle = dermisGrad;
  ctx.fillRect(0, 0, 1024, 240);

  // Micro-capillary vascular loops
  ctx.strokeStyle = 'rgba(225, 29, 72, 0.45)';
  ctx.lineWidth = 1.8;
  for (let i = 0; i < 45; i++) {
    ctx.beginPath();
    const x = Math.random() * 1024;
    ctx.moveTo(x, 235);
    ctx.bezierCurveTo(x + (Math.random() - 0.5) * 60, 180, x + (Math.random() - 0.5) * 60, 110, x, 70);
    ctx.stroke();
  }

  // 2. Subcutaneous Adipose Lipid Lobules (240 to 560px)
  const fatGrad = ctx.createLinearGradient(0, 240, 0, 560);
  fatGrad.addColorStop(0, '#fef08a');
  fatGrad.addColorStop(1, '#eab308');
  ctx.fillStyle = fatGrad;
  ctx.fillRect(0, 240, 1024, 320);

  // Clustered 3D spherical adipose pearls with specular highlights
  for (let i = 0; i < 600; i++) {
    const cx = Math.random() * 1024;
    const cy = 250 + Math.random() * 300;
    const r = 8 + Math.random() * 14;

    const pearlGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
    pearlGrad.addColorStop(0, '#fef9c3');
    pearlGrad.addColorStop(0.6, '#facc15');
    pearlGrad.addColorStop(1, '#ca8a04');

    ctx.fillStyle = pearlGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(161, 98, 7, 0.35)';
    ctx.lineWidth = 1.0;
    ctx.stroke();
  }

  // Glistening fibrous fascial collagen sheets
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 3.0;
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 255 + i * 36);
    ctx.bezierCurveTo(300, 275 + i * 36, 700, 240 + i * 36, 1024, 265 + i * 36);
    ctx.stroke();
  }

  // 3. Deep Striated Skeletal Muscle (560 to 1024px)
  const muscleGrad = ctx.createLinearGradient(0, 560, 0, 1024);
  muscleGrad.addColorStop(0, '#881337');
  muscleGrad.addColorStop(0.4, '#700c2a');
  muscleGrad.addColorStop(1, '#4c0519');
  ctx.fillStyle = muscleGrad;
  ctx.fillRect(0, 560, 1024, 464);

  // Longitudinal muscle fascicle striations with myofibril texture
  for (let y = 565; y < 1024; y += 4.5) {
    ctx.strokeStyle = Math.random() > 0.4 ? 'rgba(251, 113, 133, 0.55)' : 'rgba(76, 5, 25, 0.75)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(0, y + (Math.sin(y * 0.05) * 3));
    ctx.bezierCurveTo(340, y + 4, 680, y - 4, 1024, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural Canvas Texture for Top Epidermis Skin with Micro-Pores and Natural Tone
function createTopSkinTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Subtle radial gradient simulating natural skin subsurface scattering
  const grad = ctx.createRadialGradient(512, 512, 100, 512, 512, 700);
  grad.addColorStop(0, '#ebd0c2');
  grad.addColorStop(0.6, '#e2bba8');
  grad.addColorStop(1, '#d8a691');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Natural micro-pores
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(190, 120, 100, 0.3)' : 'rgba(255, 235, 225, 0.35)';
    ctx.beginPath();
    ctx.arc(x, y, 0.7 + Math.random() * 1.4, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
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
    actionHint: 'Pick up needle from tray, then drag mouse down on skin to pierce 12mm knot',
    skinPhysicsText: 'Skin dimples downward on contact, then pops through painless dermal barrier',
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
    actionHint: 'Pick up cup from tray, place on skin, then drag mouse up to draw vacuum suction',
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
    actionHint: 'Pick up moxa from tray, hover smoldering roll above skin to radiate 43°C heat',
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
  const [trayHoveredTool, setTrayHoveredTool] = useState(null);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);

  // 3D Meshes
  const skinMeshRef = useRef(null);
  const originalSkinPositionsRef = useRef(null);
  const knotGlowRef = useRef(null);
  const adhesionGlowRef = useRef(null);
  const stasisGlowRef = useRef(null);
  const thermalRingRef = useRef(null);

  // Active in-hand 3D tools
  const activeNeedleRef = useRef(null);
  const activeCupRef = useRef(null);
  const activeMoxaRef = useRef(null);

  // Tray 3D Tool Groups
  const trayNeedleRef = useRef(null);
  const trayCupRef = useRef(null);
  const trayMoxaRef = useRef(null);

  // Mouse Drag Tracking
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartValRef = useRef(0);

  // 3D Thanos Particles
  const particlesRef = useRef(null);

  const currentProb = CLINICAL_PROBLEMS[selectedProblemIdx];

  // Apply skin vertex deformation and tool displacement
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
        activeNeedleRef.current.position.y = 1.25 - fraction * 1.29;
      }

      // Skin Elastic Dimpling (presses down elastically before popping through)
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

    // Hide organic pathology glows
    if (knotGlowRef.current) knotGlowRef.current.visible = false;
    if (adhesionGlowRef.current) adhesionGlowRef.current.visible = false;
    if (stasisGlowRef.current) stasisGlowRef.current.visible = false;

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
        posArr[i * 3] = -0.65 + (Math.random() - 0.5) * 0.35;
        posArr[i * 3 + 1] = originY + (Math.random() - 0.5) * 0.35;
        posArr[i * 3 + 2] = 0.91 + (Math.random() - 0.5) * 0.35;
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

    if (knotGlowRef.current) knotGlowRef.current.visible = (selectedProblemIdx === 0);
    if (adhesionGlowRef.current) adhesionGlowRef.current.visible = (selectedProblemIdx === 1);
    if (stasisGlowRef.current) stasisGlowRef.current.visible = (selectedProblemIdx === 2);

    if (thermalRingRef.current) thermalRingRef.current.material.opacity = 0;
  }, [selectedProblemIdx, applySkinPhysicsAndToolHeight]);

  // Select tool (from 3D tray or HUD)
  const handleSelectTool = useCallback((toolId) => {
    setActiveTool(toolId);
    const probIdx = toolId === 'needle' ? 0 : toolId === 'cup' ? 1 : 2;
    setSelectedProblemIdx(probIdx);
    handleReset();
    playAcuSound('pickup', isMuted);
  }, [handleReset, isMuted]);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    // 1. Scene with Warm Clinical Sanctuary Atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0f17); // Refined clinical deep slate
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(2.4, 2.6, 3.8);
    cameraRef.current = camera;

    // 2. High-Performance WebGL Renderer with Filmic Tone Mapping
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
    controls.maxDistance = 6.8;
    controls.minDistance = 1.8;
    controls.target.set(-0.2, 0.05, 0.2);
    controlsRef.current = controls;

    // 4. Clinical Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 7, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const softFillLight = new THREE.DirectionalLight(0xfef08a, 0.8);
    softFillLight.position.set(-3, 4, 3);
    scene.add(softFillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.3);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Clinical Table / Ground Plane with Soft Contact Shadows
    const tableGeo = new THREE.PlaneGeometry(12, 12);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x090c13,
      roughness: 0.85,
      metalness: 0.1
    });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.85;
    table.receiveShadow = true;
    scene.add(table);

    // 5. PHOTOREALISTIC 3D ANATOMICAL TISSUE BLOCK
    const tissueGroup = new THREE.Group();
    tissueGroup.position.set(-0.65, 0, 0);
    scene.add(tissueGroup);

    const blockWidth = 2.6;
    const blockHeight = 1.5;
    const blockDepth = 1.8;

    const textureLoader = new THREE.TextureLoader();
    const crossSectionTex = textureLoader.load(getAssetUrl('tissue_cross_section_clean.jpg'));
    crossSectionTex.colorSpace = THREE.SRGBColorSpace;

    const sideStrataTex = createSideStrataTexture();
    sideStrataTex.colorSpace = THREE.SRGBColorSpace;

    const topSkinTex = createTopSkinTexture();
    topSkinTex.colorSpace = THREE.SRGBColorSpace;

    const frontCutawayMat = new THREE.MeshStandardMaterial({
      map: crossSectionTex,
      roughness: 0.38,
      metalness: 0.04
    });

    const sideStrataMat = new THREE.MeshStandardMaterial({
      map: sideStrataTex,
      roughness: 0.42,
      metalness: 0.02
    });

    const topSkinBoxMat = new THREE.MeshStandardMaterial({
      map: topSkinTex,
      roughness: 0.48,
      metalness: 0.02
    });

    const blockMaterials = [
      sideStrataMat,   // +X (Right side - shows layered cells, fat pearls, muscle)
      sideStrataMat,   // -X (Left side - shows layered cells, fat pearls, muscle)
      topSkinBoxMat,   // +Y (Top epidermis)
      sideStrataMat,   // -Y (Bottom)
      frontCutawayMat, // +Z (Front cutaway showing photographic cellular strata & knot)
      sideStrataMat    // -Z (Back side)
    ];

    const tissueBlockGeo = new THREE.BoxGeometry(blockWidth, blockHeight, blockDepth);
    const tissueBlockMesh = new THREE.Mesh(tissueBlockGeo, blockMaterials);
    tissueBlockMesh.castShadow = true;
    tissueBlockMesh.receiveShadow = true;
    tissueGroup.add(tissueBlockMesh);

    // High-subdivision Top Skin Surface for REAL DYNAMIC INDENTATION / BULGING
    const topSkinGeo = new THREE.PlaneGeometry(blockWidth, blockDepth, 32, 32);
    topSkinGeo.rotateX(-Math.PI / 2);
    const topSkinMat = new THREE.MeshStandardMaterial({
      map: topSkinTex,
      roughness: 0.44,
      metalness: 0.02,
      side: THREE.DoubleSide
    });
    const topSkin = new THREE.Mesh(topSkinGeo, topSkinMat);
    topSkin.position.y = blockHeight / 2 + 0.005;
    topSkin.receiveShadow = true;
    tissueGroup.add(topSkin);
    skinMeshRef.current = topSkin;

    const skinPosAttr = topSkinGeo.attributes.position;
    originalSkinPositionsRef.current = new Float32Array(skinPosAttr.array);

    // Anatomical Meridian Point Ring on Skin Surface (BL-54 / GB-34 Trigger Point)
    const beacon = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.12, 28),
      new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
    );
    beacon.rotation.x = -Math.PI / 2;
    beacon.position.set(0, blockHeight / 2 + 0.01, blockDepth / 2 - 0.05);
    tissueGroup.add(beacon);

    // Thermal Heat Bloom Ring (When Moxa is active)
    const thermalRing = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.42, 32),
      new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.0, side: THREE.DoubleSide })
    );
    thermalRing.rotation.x = -Math.PI / 2;
    thermalRing.position.set(0, blockHeight / 2 + 0.012, blockDepth / 2 - 0.05);
    tissueGroup.add(thermalRing);
    thermalRingRef.current = thermalRing;

    // 6. ORGANIC PATHOLOGY INTEGRATED INTO ANATOMY (No plastic toys!)
    const targetX = -0.65;
    const targetZ = 0.91;

    // A: Spastic Motor Knot Glow Zone (Pulsating biological vascular flush on the actual muscle knot in the texture)
    const knotGlowGroup = new THREE.Group();
    knotGlowGroup.position.set(targetX, -0.42, targetZ + 0.01);
    scene.add(knotGlowGroup);
    knotGlowRef.current = knotGlowGroup;

    const knotGlowMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.02, 0.22, 32),
      new THREE.MeshBasicMaterial({ color: 0xff1e46, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
    );
    knotGlowGroup.add(knotGlowMesh);

    // B: Fascial Adhesion Zone (Subcutaneous Fascia, 6mm deep, y = 0.05)
    const adhesionGroup = new THREE.Group();
    adhesionGroup.position.set(targetX, 0.05, targetZ + 0.01);
    scene.add(adhesionGroup);
    adhesionGlowRef.current = adhesionGroup;
    adhesionGroup.visible = false;

    const adhMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.24, 32),
      new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.75, side: THREE.DoubleSide })
    );
    adhesionGroup.add(adhMesh);

    // C: Cold Damp Microvascular Stasis Zone (Superficial Dermis, 2mm deep, y = 0.68)
    const stasisGroup = new THREE.Group();
    stasisGroup.position.set(targetX, 0.68, targetZ + 0.01);
    scene.add(stasisGroup);
    stasisGlowRef.current = stasisGroup;
    stasisGroup.visible = false;

    const stasisMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.03, 0.28, 32),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75, side: THREE.DoubleSide })
    );
    stasisGroup.add(stasisMesh);

    // 7. REALISTIC 3D STAINLESS STEEL PROCEDURE TRAY WITH CLINICAL TOOLS
    const trayGroup = new THREE.Group();
    trayGroup.position.set(1.4, -0.22, 0.15);
    scene.add(trayGroup);

    // Polished Surgical Stainless Steel Tray
    const trayBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.08, 0.06, 1.88),
      new THREE.MeshStandardMaterial({ color: 0xccd6e6, roughness: 0.14, metalness: 0.95 })
    );
    trayBase.castShadow = true;
    trayBase.receiveShadow = true;
    trayGroup.add(trayBase);

    // Tray Rim
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xb9c6db, roughness: 0.12, metalness: 0.98 });
    const rimTop = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.04), rimMat);
    rimTop.position.set(0, 0.04, -0.94);
    trayGroup.add(rimTop);
    const rimBottom = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.04), rimMat);
    rimBottom.position.set(0, 0.04, 0.94);
    trayGroup.add(rimBottom);
    const rimLeft = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 1.88), rimMat);
    rimLeft.position.set(-0.54, 0.04, 0);
    trayGroup.add(rimLeft);
    const rimRight = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 1.88), rimMat);
    rimRight.position.set(0.54, 0.04, 0);
    trayGroup.add(rimRight);

    // Sterile Procedure Drape Paper Liner
    const liner = new THREE.Mesh(
      new THREE.BoxGeometry(0.98, 0.01, 1.78),
      new THREE.MeshStandardMaterial({ color: 0xf0fdf4, roughness: 0.88 })
    );
    liner.position.y = 0.035;
    trayGroup.add(liner);

    // BUILD AUTHENTIC 3D NEEDLE FUNCTION
    const buildAuthenticNeedle = (scale = 1.0) => {
      const g = new THREE.Group();
      
      // 1. Wound Copper Spiral Handle (Tube along spiral curve)
      const spiralCurve = new SpiralHandleCurve(0.022 * scale, 0.28 * scale, 22);
      const spiralGeo = new THREE.TubeGeometry(spiralCurve, 96, 0.0035 * scale, 8, false);
      const copperMat = new THREE.MeshStandardMaterial({
        color: 0xc27a3c,
        metalness: 0.92,
        roughness: 0.22
      });
      const spiralMesh = new THREE.Mesh(spiralGeo, copperMat);
      spiralMesh.position.y = 0.38 * scale;
      g.add(spiralMesh);

      // Handle Core Pin
      const corePin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.017 * scale, 0.017 * scale, 0.29 * scale, 16),
        copperMat
      );
      corePin.position.y = 0.38 * scale;
      g.add(corePin);

      // Top Loop Finial (Authentic traditional loop)
      const loopFinial = new THREE.Mesh(
        new THREE.TorusGeometry(0.016 * scale, 0.0035 * scale, 8, 20),
        copperMat
      );
      loopFinial.position.y = 0.53 * scale;
      g.add(loopFinial);

      // 2. Surgical Stainless Steel Needle Shaft (0.18mm fine gauge)
      const steelMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.99,
        roughness: 0.06
      });
      const shaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.006 * scale, 0.0015 * scale, 0.76 * scale, 16),
        steelMat
      );
      shaft.position.y = -0.08 * scale;
      g.add(shaft);

      return g;
    };

    // 3D TOOL 1 ON TRAY: Authentic Needle in Guide Tube
    const tNeedleGroup = new THREE.Group();
    tNeedleGroup.position.set(-0.25, 0.08, -0.45);
    tNeedleGroup.userData = { toolId: 'needle', name: '0.18mm Needle' };

    // Transparent guide tube
    const tTube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.65, 16),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.92, opacity: 0.4, transparent: true, roughness: 0.08 })
    );
    tTube.rotation.x = Math.PI / 2;
    tNeedleGroup.add(tTube);

    const trayNeedleModel = buildAuthenticNeedle(0.7);
    trayNeedleModel.rotation.x = Math.PI / 2;
    tNeedleGroup.add(trayNeedleModel);

    const tNeedleHit = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.16, 0.75),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 })
    );
    tNeedleGroup.add(tNeedleHit);

    trayGroup.add(tNeedleGroup);
    trayNeedleRef.current = tNeedleGroup;

    // BUILD AUTHENTIC GLASS FIRE CUP FUNCTION
    const buildGlassCup = (scale = 1.0) => {
      const g = new THREE.Group();
      
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.96,
        opacity: 1.0,
        transparent: true,
        roughness: 0.04,
        ior: 1.52,
        thickness: 0.12 * scale,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04
      });

      // Bell Dome
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(0.26 * scale, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.68),
        glassMat
      );
      dome.rotation.x = Math.PI;
      g.add(dome);

      // Thick Rolled Glass Lip
      const lip = new THREE.Mesh(
        new THREE.TorusGeometry(0.25 * scale, 0.026 * scale, 16, 32),
        glassMat
      );
      lip.rotation.x = Math.PI / 2;
      lip.position.y = -0.08 * scale;
      g.add(lip);

      // Flickering Suction Fire Ember Inside
      const flameMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.06 * scale, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xff6a00, transparent: true, opacity: 0.75 })
      );
      flameMesh.position.y = 0.08 * scale;
      g.add(flameMesh);

      return g;
    };

    // 3D TOOL 2 ON TRAY: Thick Blown Glass Fire Cup
    const tCupGroup = new THREE.Group();
    tCupGroup.position.set(-0.1, 0.16, 0.35);
    tCupGroup.userData = { toolId: 'cup', name: 'Glass Fire Cup' };

    const trayCupModel = buildGlassCup(0.7);
    tCupGroup.add(trayCupModel);

    const tCupHit = new THREE.Mesh(
      new THREE.CylinderGeometry(0.26, 0.26, 0.35, 16),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 })
    );
    tCupGroup.add(tCupHit);

    trayGroup.add(tCupGroup);
    trayCupRef.current = tCupGroup;

    // BUILD AUTHENTIC MOXA ROLL FUNCTION
    const buildMoxaRoll = (scale = 1.0) => {
      const g = new THREE.Group();

      // Washi Mulberry Paper Wrap
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065 * scale, 0.065 * scale, 0.58 * scale, 24),
        new THREE.MeshStandardMaterial({ color: 0x47382d, roughness: 0.88 })
      );
      g.add(body);

      // Imperial Gold Seal Band
      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(0.067 * scale, 0.067 * scale, 0.07 * scale, 24),
        new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.88, roughness: 0.25 })
      );
      band.position.y = 0.08 * scale;
      g.add(band);

      // Glowing Ember Ash Tip
      const emberTip = new THREE.Mesh(
        new THREE.CylinderGeometry(0.064 * scale, 0.064 * scale, 0.05 * scale, 24),
        new THREE.MeshStandardMaterial({ color: 0xff3b00, emissive: 0xff4500, emissiveIntensity: 2.5 })
      );
      emberTip.position.y = -0.3 * scale;
      g.add(emberTip);

      return g;
    };

    // 3D TOOL 3 ON TRAY: Smoldering Moxa Roll
    const tMoxaGroup = new THREE.Group();
    tMoxaGroup.position.set(0.18, 0.09, -0.3);
    tMoxaGroup.userData = { toolId: 'moxa', name: 'Herbal Moxa' };

    const trayMoxaModel = buildMoxaRoll(0.7);
    trayMoxaModel.rotation.x = Math.PI / 2;
    tMoxaGroup.add(trayMoxaModel);

    const tMoxaHit = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.16, 0.65),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 })
    );
    tMoxaGroup.add(tMoxaHit);

    trayGroup.add(tMoxaGroup);
    trayMoxaRef.current = tMoxaGroup;

    // 8. ACTIVE IN-HAND 3D TOOLS (Over tissue target beacon)
    // Active Needle
    const activeNeedle = buildAuthenticNeedle(1.0);
    activeNeedle.position.set(targetX, 1.25, targetZ);
    scene.add(activeNeedle);
    activeNeedleRef.current = activeNeedle;

    // Active Glass Fire Cup
    const activeCup = buildGlassCup(1.0);
    activeCup.position.set(targetX, 1.35, targetZ);
    scene.add(activeCup);
    activeCupRef.current = activeCup;
    activeCup.visible = false;

    // Active Moxa Cigar
    const activeMoxa = buildMoxaRoll(1.0);
    activeMoxa.position.set(targetX, 1.35, targetZ);
    scene.add(activeMoxa);
    activeMoxaRef.current = activeMoxa;
    activeMoxa.visible = false;

    // 9. 3D THANOS ASH & DUST PARTICLES
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

    // 10. MOUSE RAYCASTER FOR 3D TRAY INTERACTION & TISSUE DRAG
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check tray tool hover
      const trayTargets = [
        trayNeedleRef.current,
        trayCupRef.current,
        trayMoxaRef.current
      ].filter(Boolean);

      const intersects = raycaster.intersectObjects(trayTargets, true);
      if (intersects.length > 0) {
        let parentGroup = intersects[0].object;
        while (parentGroup && !parentGroup.userData.toolId && parentGroup.parent) {
          parentGroup = parentGroup.parent;
        }
        if (parentGroup && parentGroup.userData.toolId) {
          setTrayHoveredTool(parentGroup.userData.name);
          renderer.domElement.style.cursor = 'pointer';
        }
      } else {
        setTrayHoveredTool(null);
        if (!isDraggingRef.current) {
          renderer.domElement.style.cursor = 'grab';
        }
      }

      // If user is dragging mouse on canvas to plunge/suction tool
      if (isDraggingRef.current) {
        const deltaY = e.clientY - dragStartYRef.current;
        const targetMax = currentProb.depthTarget;
        const sensitivity = activeTool === 'moxa' ? 0.35 : 0.08;
        const newVal = Math.max(0, Math.min(targetMax + 3, dragStartValRef.current + deltaY * sensitivity));
        handleInteractiveChange(newVal);
      }
    };

    const handlePointerDown = (e) => {
      if (e.button !== 0) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Did user click a tool directly on the 3D tray?
      const trayTargets = [
        trayNeedleRef.current,
        trayCupRef.current,
        trayMoxaRef.current
      ].filter(Boolean);

      const trayIntersects = raycaster.intersectObjects(trayTargets, true);
      if (trayIntersects.length > 0) {
        let parentGroup = trayIntersects[0].object;
        while (parentGroup && !parentGroup.userData.toolId && parentGroup.parent) {
          parentGroup = parentGroup.parent;
        }
        if (parentGroup && parentGroup.userData.toolId) {
          handleSelectTool(parentGroup.userData.toolId);
          controls.enabled = false;
          return;
        }
      }

      // Did user click on the tissue block / beacon to drag tool?
      const tissueTargets = [tissueBlockMesh, topSkin];
      const tissueIntersects = raycaster.intersectObjects(tissueTargets, true);
      if (tissueIntersects.length > 0) {
        isDraggingRef.current = true;
        dragStartYRef.current = e.clientY;
        dragStartValRef.current = interactiveDepth;
        controls.enabled = false;
        renderer.domElement.style.cursor = 'ns-resize';
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      controls.enabled = true;
      renderer.domElement.style.cursor = 'grab';
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointermove', handlePointerMove);
    domEl.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    // 11. Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Organic Pathology Breathing Glow (soft natural vascular pulse)
      if (knotGlowRef.current && knotGlowRef.current.visible) {
        const s = 1.0 + Math.sin(time * 4.0) * 0.12;
        knotGlowRef.current.scale.set(s, s, s);
      }
      if (adhesionGlowRef.current && adhesionGlowRef.current.visible) {
        const s = 1.0 + Math.sin(time * 3.5) * 0.1;
        adhesionGlowRef.current.scale.set(s, s, s);
      }
      if (stasisGlowRef.current && stasisGlowRef.current.visible) {
        const s = 1.0 + Math.sin(time * 3.0) * 0.08;
        stasisGlowRef.current.scale.set(s, s, s);
      }

      // Tray Tool Subtle Hover Animation
      if (trayNeedleRef.current) {
        trayNeedleRef.current.position.y = 0.08 + Math.sin(time * 2.0) * 0.005;
      }
      if (trayCupRef.current) {
        trayCupRef.current.position.y = 0.16 + Math.sin(time * 2.0 + 1) * 0.005;
      }
      if (trayMoxaRef.current) {
        trayMoxaRef.current.position.y = 0.09 + Math.sin(time * 2.0 + 2) * 0.005;
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
      domEl.removeEventListener('pointermove', handlePointerMove);
      domEl.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [handleInteractiveChange, handleSelectTool, interactiveDepth, currentProb.depthTarget]);

  // Update visible pathology inside 3D tissue block
  useEffect(() => {
    if (knotGlowRef.current) knotGlowRef.current.visible = (selectedProblemIdx === 0) && !isDisintegrated;
    if (adhesionGlowRef.current) adhesionGlowRef.current.visible = (selectedProblemIdx === 1) && !isDisintegrated;
    if (stasisGlowRef.current) stasisGlowRef.current.visible = (selectedProblemIdx === 2) && !isDisintegrated;
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
          ? 'fixed inset-0 z-50 w-screen h-screen bg-[#0c0f17] p-4 flex flex-col justify-between overflow-hidden' 
          : 'relative bg-[#0c0f17] text-neutral-100 rounded-3xl border border-neutral-800 p-4 sm:p-6 shadow-2xl space-y-4 overflow-hidden'
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
                3D Anatomical Strata & Procedure Tray
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                100% Mouse Controlled
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Photorealistic copper spiral needle • Blown glass cup • Smoldering moxa • Thanos snap ash dispersion
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
        
        {/* Three.js Canvas Container */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Tray Tool Hover Indicator Tooltip */}
        {trayHoveredTool && (
          <div className="absolute top-1/2 right-12 z-20 pointer-events-none transform -translate-y-1/2 bg-neutral-950/90 border border-emerald-500/50 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
            <Hand className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Click to take {trayHoveredTool}</span>
          </div>
        )}

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

        {/* HUD Bottom-Center: 3D Steel Tray Tool Selector */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 pointer-events-auto">
          <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-3 rounded-2xl shadow-2xl flex flex-col space-y-2 max-w-md">
            <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-1.5">
              <span className="font-black text-white flex items-center gap-1.5">
                <Hand className="w-3.5 h-3.5 text-emerald-400" />
                <span>3D Equipment Tray:</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                Click Tool on Tray or Below
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

        {/* TACTILE INTERACTIVE MOUSE CONTROL HUD */}
        {!isDisintegrated && (
          <div className="absolute top-4 right-4 z-20 pointer-events-auto max-w-xs w-full">
            <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-white flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeTool === 'needle' ? 'Needle Penetration' : activeTool === 'cup' ? 'Vacuum Suction' : 'Moxa Heat'}</span>
                </span>
                <span className="text-emerald-400 font-mono text-sm">
                  {interactiveDepth.toFixed(1)} {currentProb.depthUnit}
                </span>
              </div>

              {/* Mouse Drag / Depth Slider */}
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
                <span>Surface (0)</span>
                <span className="text-amber-400 font-bold">Target: {currentProb.depthTarget} {currentProb.depthUnit}</span>
              </div>

              {/* Direct Plunge Action Button */}
              <button
                type="button"
                data-testid="target-acupoint"
                onClick={() => handleInteractiveChange(currentProb.depthTarget)}
                disabled={isSnapping}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs shadow-lg shadow-rose-950/60 active:scale-95 transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>{isSnapping ? 'Disintegrating in 3D...' : `Apply ${currentProb.toolName}`}</span>
              </button>

              <div className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[10px] text-neutral-300 flex items-start gap-1.5">
                <MoveDown className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Direct Drag:</strong> Click & drag down on the 3D skin to plunge needle into the knot!
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

        {/* LIVE IN-SCENE STATUS BANNER (No full-screen covering modal!) */}
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
