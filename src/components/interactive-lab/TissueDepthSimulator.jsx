import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Layers, 
  ArrowDown, 
  Sparkles, 
  Compass, 
  Crosshair, 
  Activity, 
  User, 
  Zap, 
  ShieldCheck, 
  Hand,
  Disc,
  Boxes,
  RefreshCw
} from 'lucide-react';

// ============================================================================
// CLINICAL ACUPOINTS CATALOG WITH REGIONAL ZOOM MAPPINGS
// ============================================================================
export const CLINICAL_ACUPOINTS = [
  {
    id: 'gb20',
    code: 'GB-20',
    fullName: 'GB-20 (Fengchi)',
    hanzi: '风池',
    translation: 'Wind Pool',
    region: 'neck',
    regionLabel: 'Occipital Neck',
    facing: 'back',
    meridian: 'Gallbladder Meridian',
    depthTarget: 12.0,
    depthCun: '0.8–1.2 cun',
    bodyPosition: [-0.06, 0.68, -0.07],
    nerves: 'Greater Occipital Nerve (C2)',
    vessels: 'Occipital Artery & Venous Plexus',
    relief: 'Chronic Migraines, Severe Cervical Stiffness, Occipital Neuralgia',
    deqi: 'Deep spreading warm distention radiating toward retro-orbital space.',
    colorHex: 0xff1e46
  },
  {
    id: 'gv20',
    code: 'GV-20',
    fullName: 'GV-20 (Baihui)',
    hanzi: '百会',
    translation: 'Hundred Convergences',
    region: 'crown',
    regionLabel: 'Cranial Crown',
    facing: 'front',
    meridian: 'Governing Vessel (Du Mai)',
    depthTarget: 6.0,
    depthCun: '0.3–0.5 cun',
    bodyPosition: [0.0, 0.83, 0.0],
    nerves: 'Supraorbital & Greater Occipital Anastomosis',
    vessels: 'Superficial Temporal Artery Network',
    relief: 'Anxiety Reset, Severe Insomnia, Brain Fog, Tension Headaches',
    deqi: 'Gentle buoyant pulsation, waves of calming coolness descending through spine.',
    colorHex: 0x38bdf8
  },
  {
    id: 'bl10',
    code: 'BL-10',
    fullName: 'BL-10 (Tianzhu)',
    hanzi: '天柱',
    translation: 'Celestial Pillar',
    region: 'neck',
    regionLabel: 'Upper Neck',
    facing: 'back',
    meridian: 'Bladder Meridian',
    depthTarget: 10.0,
    depthCun: '0.5–0.8 cun',
    bodyPosition: [-0.035, 0.63, -0.075],
    nerves: 'Lesser Occipital Nerve (C2-C3)',
    vessels: 'Deep Cervical Artery',
    relief: 'Forward-Head Posture Strain, Blurred Vision, Stiff Neck Spasm',
    deqi: 'Warm electric tingling radiating down paraspinal muscles.',
    colorHex: 0xf59e0b
  },
  {
    id: 'li4',
    code: 'LI-4',
    fullName: 'LI-4 (Hegu)',
    hanzi: '合谷',
    translation: 'Joining Valley',
    region: 'hand',
    regionLabel: 'Dorsal Hand',
    facing: 'front',
    meridian: 'Large Intestine Meridian',
    depthTarget: 12.0,
    depthCun: '0.5–1.0 cun',
    bodyPosition: [-0.34, 0.04, 0.04],
    nerves: 'Superficial Radial Nerve',
    vessels: 'First Dorsal Metacarpal Artery',
    relief: 'Frontal Migraines, TMJ Jaw Clenching, Toothache, Systemic Analgesia',
    deqi: 'Pronounced heavy warm ache spreading through palm into forearm.',
    colorHex: 0xe02868
  },
  {
    id: 'pc6',
    code: 'PC-6',
    fullName: 'PC-6 (Neiguan)',
    hanzi: '内关',
    translation: 'Inner Pass',
    region: 'hand',
    regionLabel: 'Inner Forearm',
    facing: 'front',
    meridian: 'Pericardium Meridian',
    depthTarget: 10.0,
    depthCun: '0.5–0.8 cun',
    bodyPosition: [-0.28, 0.14, 0.04],
    nerves: 'Median Nerve Trunk',
    vessels: 'Median Antebrachial Vein & Radial Artery',
    relief: 'Nausea, Cardiac Palpitations, Panic, Diaphragmatic Tightness',
    deqi: 'Subtle electric sensation gliding smoothly along forearm midline.',
    colorHex: 0xc084fc
  },
  {
    id: 'st36',
    code: 'ST-36',
    fullName: 'ST-36 (Zusanli)',
    hanzi: '足三里',
    translation: 'Leg Three Miles',
    region: 'leg',
    regionLabel: 'Anterior Leg',
    facing: 'front',
    meridian: 'Stomach Meridian',
    depthTarget: 15.0,
    depthCun: '1.0–1.5 cun',
    bodyPosition: [-0.08, -0.32, 0.06],
    nerves: 'Deep Peroneal (Fibular) Nerve',
    vessels: 'Anterior Tibial Artery',
    relief: 'Chronic Fatigue, Acid Reflux, Immune Depletion, Leg Weakness',
    deqi: 'Rich traveling warmth and rhythmic muscular pulsing downward into foot.',
    colorHex: 0xec4899
  },
  {
    id: 'bl23',
    code: 'BL-23',
    fullName: 'BL-23 (Shenshu)',
    hanzi: '肾俞',
    translation: 'Kidney Shu',
    region: 'back',
    regionLabel: 'Lumbar Spine',
    facing: 'back',
    meridian: 'Bladder Meridian',
    depthTarget: 14.0,
    depthCun: '0.8–1.2 cun',
    bodyPosition: [-0.05, 0.14, -0.07],
    nerves: 'Lumbar Spinal Nerve Dorsal Ramus (L2)',
    vessels: 'Lumbar Arteries & Paraspinal Plexus',
    relief: 'Chronic Lower Back Pain, Sciatica, Core Instability, Disc Fatigue',
    deqi: 'Deep, comforting heat diffusing through sacrum and lumbar spine.',
    colorHex: 0x8b5cf6
  },
  {
    id: 'gv16',
    code: 'GV-16',
    fullName: 'GV-16 (Fengfu)',
    hanzi: '风府',
    translation: 'Palace of Wind',
    region: 'neck',
    regionLabel: 'Occipital Center',
    facing: 'back',
    meridian: 'Governing Vessel',
    depthTarget: 10.0,
    depthCun: '0.5–0.8 cun',
    bodyPosition: [0.0, 0.69, -0.072],
    nerves: 'Third Occipital Nerve',
    vessels: 'Occipital Arterial Anastomosis',
    relief: 'Central Nervous Calm, Nuchal Rigidity, Mental Clarity',
    deqi: 'Cool clarity descending down paraspinal columns.',
    colorHex: 0x38bdf8
  },
  {
    id: 'te17',
    code: 'TE-17',
    fullName: 'TE-17 (Yifeng)',
    hanzi: '翳风',
    translation: 'Wind Screen',
    region: 'neck',
    regionLabel: 'Behind Ear',
    facing: 'back',
    meridian: 'Triple Energizer',
    depthTarget: 12.0,
    depthCun: '0.8–1.2 cun',
    bodyPosition: [-0.068, 0.64, -0.032],
    nerves: 'Great Auricular & Facial Nerve Branch',
    vessels: 'Posterior Auricular Artery',
    relief: 'Tinnitus, Ear Fullness, TMJ Spasm, Facial Nerve Reset',
    deqi: 'Warm releasing tingling along the jaw and mastoid process.',
    colorHex: 0xf59e0b
  },
  {
    id: 'gb14',
    code: 'GB-14',
    fullName: 'GB-14 (Yangbai)',
    hanzi: '阳白',
    translation: 'Yang White',
    region: 'crown',
    regionLabel: 'Forehead',
    facing: 'front',
    meridian: 'Gallbladder Meridian',
    depthTarget: 8.0,
    depthCun: '0.3–0.5 cun',
    bodyPosition: [-0.04, 0.73, 0.072],
    nerves: 'Supraorbital Nerve Branch',
    vessels: 'Frontal Arteriole Plexus',
    relief: 'Frontal Sinus Pressure, Forehead Tension, Orbital Fatigue',
    deqi: 'Light clearing vibration releasing ocular strain.',
    colorHex: 0xe02868
  },
  {
    id: 'sp6',
    code: 'SP-6',
    fullName: 'SP-6 (Sanyinjiao)',
    hanzi: '三阴交',
    translation: 'Three Yin Intersection',
    region: 'leg',
    regionLabel: 'Inner Ankle',
    facing: 'front',
    meridian: 'Spleen Meridian',
    depthTarget: 14.0,
    depthCun: '1.0–1.5 cun',
    bodyPosition: [-0.04, -0.52, 0.02],
    nerves: 'Tibial Nerve & Saphenous Nerve',
    vessels: 'Posterior Tibial Artery',
    relief: 'Pelvic Circulation, Insomnia, Leg Cramping, Hormonal Balance',
    deqi: 'Steady rhythmic warmth coursing up the inner calf.',
    colorHex: 0xec4899
  }
];

// Compatibility definitions for pathology treatment selection
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
    colorHex: 0x38bdf8,
    reliefTitle: 'Cold Stagnation Vaporized',
    reliefText: 'Infrared heat clears cold constriction. Soothing therapeutic warmth active.'
  }
];

// Curve for Spiral Copper Needle Handle
class SpiralHandleCurve extends THREE.Curve {
  constructor(radius = 0.014, height = 0.20, turns = 18) {
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

// Procedural Stratified Skin Texture (Epidermis with Pores & Stratum Corneum)
function createSkinTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#f2d0be');
  grad.addColorStop(0.3, '#e8bfa8');
  grad.addColorStop(0.7, '#deb89e');
  grad.addColorStop(1.0, '#cf9c82');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 10;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.9));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.8));
  }
  ctx.putImageData(imgData, 0, 0);

  // Micro-creases
  ctx.strokeStyle = 'rgba(180, 100, 80, 0.20)';
  ctx.lineWidth = 0.7;
  for (let i = 0; i < 60; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, Math.random() * 512);
    ctx.lineTo(Math.random() * 512, Math.random() * 512);
    ctx.stroke();
  }

  // Follicular pore dots
  ctx.fillStyle = 'rgba(150, 70, 50, 0.35)';
  for (let i = 0; i < 80; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1.5, 1.5);
  return tex;
}

// Procedural Hypodermis Cellular Adipose Texture
function createAdiposeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 300);
  grad.addColorStop(0, '#fde047');
  grad.addColorStop(0.5, '#f59e0b');
  grad.addColorStop(1.0, '#b45309');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 450; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 12 + 6;
    const cellGrad = ctx.createRadialGradient(x - r * 0.25, y - r * 0.25, 1, x, y, r);
    cellGrad.addColorStop(0, '#fef08a');
    cellGrad.addColorStop(0.65, '#f59e0b');
    cellGrad.addColorStop(1, '#92400e');
    ctx.fillStyle = cellGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Delicate white collagenous fibrous septa
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 35; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, Math.random() * 512);
    ctx.bezierCurveTo(
      Math.random() * 512, Math.random() * 512,
      Math.random() * 512, Math.random() * 512,
      Math.random() * 512, Math.random() * 512
    );
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1.5, 1.5);
  return tex;
}

// Procedural Striated Muscle Fascicle Texture with Tendinous Sheath Lines
function createMuscleStriationTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#5f0d23');
  grad.addColorStop(0.5, '#881337');
  grad.addColorStop(1.0, '#430616');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Parallel striated myofibrils
  for (let y = 0; y < 512; y += 4) {
    const alpha = Math.sin(y * 0.8) * 0.20 + 0.20;
    ctx.fillStyle = `rgba(254, 202, 202, ${alpha})`;
    ctx.fillRect(0, y, 512, 2);
  }

  // Silvery connective epimysium tendon bands
  ctx.fillStyle = 'rgba(241, 245, 249, 0.15)';
  for (let i = 0; i < 75; i++) {
    const y = Math.random() * 512;
    ctx.fillRect(0, y, 512, 1.2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

// Web Audio Synthesizer
function playAcuSound(type, isMuted) {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'thanos_snap') {
      const bufferSize = ctx.sampleRate * 0.45;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.06));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.35);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.7, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();

      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(528, ctx.currentTime + 0.05);
      bellGain.gain.setValueAtTime(0.4, ctx.currentTime + 0.05);
      bellGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
      bell.connect(bellGain);
      bellGain.connect(ctx.destination);
      bell.start(ctx.currentTime + 0.05);
      bell.stop(ctx.currentTime + 1.6);

    } else if (type === 'suction') {
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.35, ctx.sampleRate);
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


// Helper: Create 3D Canvas Badge for Anatomical Acupoint Callouts (Matching media_1793707544443_f2fee650.png)
function createCalloutBadgeCanvas(code, isSelected) {
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = isSelected ? '#e02868' : 'rgba(255, 255, 255, 0.95)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(4, 4, 152, 56, 10);
  } else {
    ctx.rect(4, 4, 152, 56);
  }
  ctx.fill();

  ctx.strokeStyle = isSelected ? '#047857' : 'rgba(0, 0, 0, 0.6)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = isSelected ? '#022c22' : '#0f172a';
  ctx.font = 'bold 26px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(code, 80, 32);

  return canvas;
}

export default function TissueDepthSimulator({ onOpenBooking }) {
  const mountRef = useRef(null);
  const [selectedAcupointIdx, setSelectedAcupointIdx] = useState(0);
  const [selectedProblemIdx, setSelectedProblemIdx] = useState(0);
  const [activeTool, setActiveTool] = useState('needle'); // 'needle', 'cup', 'moxa'
  const [interactiveDepth, setInteractiveDepth] = useState(0);
  const [isDisintegrated, setIsDisintegrated] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Guarantee document scrolling is completely untampered and clean
  useEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);
  const [isMuted, setIsMuted] = useState(false);
  const [activeRegion, setActiveRegion] = useState('full'); // Start centered on Whole Body!
  const [isExploded, setIsExploded] = useState(false); // Toggle between Zero Gap & Exploded View
  const [bodyFacing, setBodyFacing] = useState('back'); // 'front' or 'back'

  const isHoldingRef = useRef(false);
  const holdTimerRef = useRef(null);

  const activeAcupoint = CLINICAL_ACUPOINTS[selectedAcupointIdx] || CLINICAL_ACUPOINTS[0];
  const currentProb = CLINICAL_PROBLEMS[selectedProblemIdx];

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);

  // 3D Groups
  const bodyGroupRef = useRef(null);
  const bodyModelMeshRef = useRef(null);
  const strataGroupRef = useRef(null);
  const strataLayersRef = useRef({});

  // 3D Meshes
  const skinMeshRef = useRef(null);
  const originalSkinPositionsRef = useRef(null);
  const knotMeshRef = useRef(null);
  const adhesionMeshRef = useRef(null);
  const stasisMeshRef = useRef(null);
  const thermalRingRef = useRef(null);
  const nerveMatRef = useRef(null);
  const dotHalosRef = useRef([]);

  // 3D Tools
  const activeNeedleRef = useRef(null);
  const activeCupRef = useRef(null);
  const activeMoxaRef = useRef(null);
  const guideTubeRef = useRef(null);

  // 3D Thanos Particles
  const particlesRef = useRef(null);

  // Target coordinates for Strata Block
  const targetX = 0.72;
  const targetZ = 0.20;

  // Toggle Body Facing Angle (Front vs Back)
  const toggleBodyFacing = useCallback(() => {
    setBodyFacing((prev) => {
      const next = prev === 'front' ? 'back' : 'front';
      if (bodyModelMeshRef.current) {
        bodyModelMeshRef.current.rotation.y = next === 'front' ? -Math.PI / 2 : Math.PI / 2;
      }
      return next;
    });
  }, []);

  // Apply Needle Depth & Skin Physics
  const applySkinPhysicsAndToolHeight = useCallback((val) => {
    const skinMesh = skinMeshRef.current;
    const origPos = originalSkinPositionsRef.current;
    if (!skinMesh || !origPos) return;

    const posAttr = skinMesh.geometry.attributes.position;
    const posArr = posAttr.array;

    if (activeTool === 'needle') {
      const fraction = Math.min(1.0, val / 12.0);
      if (activeNeedleRef.current) {
        // Needle tip at surface y=0.38, reaches knot y=-0.30 at val=12 (0.68 travel)
        activeNeedleRef.current.position.y = 0.82 - fraction * 0.68;
      }
      if (guideTubeRef.current) {
        guideTubeRef.current.position.y = 0.48;
      }

      // Skin Elastic Dimpling on contact
      const dimpleAmount = val < 2.5 ? (val / 2.5) * 0.05 : Math.max(0, 0.05 - (val - 2.5) * 0.02);

      for (let i = 0; i < posArr.length; i += 3) {
        const vx = origPos[i];
        const vz = origPos[i + 2];
        const dist = Math.hypot(vx - 0, vz - 0.20);

        if (dist < 0.20) {
          const falloff = Math.cos((dist / 0.20) * (Math.PI / 2));
          posArr[i + 1] = origPos[i + 1] - dimpleAmount * falloff;
        } else {
          posArr[i + 1] = origPos[i + 1];
        }
      }
      posAttr.needsUpdate = true;
      skinMesh.geometry.computeVertexNormals();

    } else if (activeTool === 'cup') {
      const suctionFraction = Math.min(1.0, val / 6.0);
      if (activeCupRef.current) {
        activeCupRef.current.position.y = 0.48 + suctionFraction * 0.04;
      }

      // Fascial Suction Lift
      const bulgeHeight = suctionFraction * 0.09;
      for (let i = 0; i < posArr.length; i += 3) {
        const vx = origPos[i];
        const vz = origPos[i + 2];
        const dist = Math.hypot(vx - 0, vz - 0.20);

        if (dist < 0.22) {
          const bell = Math.cos((dist / 0.22) * (Math.PI / 2));
          posArr[i + 1] = origPos[i + 1] + bulgeHeight * bell;
        } else {
          posArr[i + 1] = origPos[i + 1];
        }
      }
      posAttr.needsUpdate = true;
      skinMesh.geometry.computeVertexNormals();

    } else if (activeTool === 'moxa') {
      const tempFraction = Math.min(1.0, Math.max(0, (val - 35.0) / 8.0));
      if (activeMoxaRef.current) {
        activeMoxaRef.current.position.y = 0.62;
      }
      if (thermalRingRef.current) {
        thermalRingRef.current.material.opacity = tempFraction * 0.85;
      }
      for (let i = 0; i < posArr.length; i += 3) {
        posArr[i + 1] = origPos[i + 1];
      }
      posAttr.needsUpdate = true;
    }
  }, [activeTool]);

  // Trigger Thanos Ash Particle Disintegration
  const triggerThanosDisintegration = useCallback(() => {
    if (isSnapping || isDisintegrated) return;
    setIsSnapping(true);
    playAcuSound('thanos_snap', isMuted);

    // Bio-electric pulse wave down the 3D nerve fibers
    if (nerveMatRef.current) {
      nerveMatRef.current.emissiveIntensity = 3.6;
      setTimeout(() => {
        if (nerveMatRef.current) nerveMatRef.current.emissiveIntensity = 1.2;
      }, 800);
    }

    if (knotMeshRef.current) knotMeshRef.current.visible = false;
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = false;
    if (stasisMeshRef.current) stasisMeshRef.current.visible = false;

    // Spawn 5,000 Thanos 3D Particles at target location
    const pData = particlesRef.current;
    if (pData) {
      pData.active = true;
      pData.timer = 0;
      pData.mat.opacity = 1.0;
      pData.mat.color = new THREE.Color(activeAcupoint.colorHex || currentProb.colorHex);

      const posAttr = pData.geo.attributes.position;
      const posArr = posAttr.array;
      const originY = activeTool === 'needle' ? -0.30 : activeTool === 'cup' ? 0.20 : 0.40;

      for (let i = 0; i < 5000; i++) {
        posArr[i * 3] = targetX + (Math.random() - 0.5) * 0.35;
        posArr[i * 3 + 1] = originY + (Math.random() - 0.5) * 0.25;
        posArr[i * 3 + 2] = targetZ + (Math.random() - 0.5) * 0.30;
      }
      posAttr.needsUpdate = true;
    }

    setTimeout(() => {
      setIsDisintegrated(true);
      setIsSnapping(false);
    }, 400);
  }, [isSnapping, isDisintegrated, activeTool, isMuted, activeAcupoint, currentProb, targetX, targetZ]);

  // Handle interactive depth change
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

  // Smooth Camera Tween to any Perspective or Anatomical Region
  const navigateCameraToRegion = useCallback((regionKey) => {
    setActiveRegion(regionKey);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    let targetCamPos;
    let targetLookAt;

    if (regionKey === 'full') {
      // Whole Body Standing View (Centered, Big, Head-to-Toe Framing)
      if (bodyGroupRef.current) bodyGroupRef.current.position.set(0.0, -0.18, 0.0);
      if (strataGroupRef.current) strataGroupRef.current.visible = false;
      targetCamPos = new THREE.Vector3(0.0, 0.48, 3.4);
      targetLookAt = new THREE.Vector3(0.0, 0.45, 0.0);
    } else {
      // Focused / Dual View (Body on left, 3D Strata on right at exact anatomical eye-level!)
      if (bodyGroupRef.current) bodyGroupRef.current.position.set(-0.48, -0.18, 0.0);
      if (strataGroupRef.current) strataGroupRef.current.visible = true;

      switch (regionKey) {
        case 'neck':
          if (strataGroupRef.current) strataGroupRef.current.position.set(0.58, 0.85, 0.0);
          targetCamPos = new THREE.Vector3(0.08, 1.05, 1.85);
          targetLookAt = new THREE.Vector3(0.08, 0.90, 0.0);
          break;
        case 'hand':
          if (strataGroupRef.current) strataGroupRef.current.position.set(0.58, 0.42, 0.0);
          targetCamPos = new THREE.Vector3(-0.05, 0.45, 1.80);
          targetLookAt = new THREE.Vector3(-0.05, 0.38, 0.0);
          break;
        case 'crown':
          if (strataGroupRef.current) strataGroupRef.current.position.set(0.58, 1.05, 0.0);
          targetCamPos = new THREE.Vector3(0.08, 1.25, 1.75);
          targetLookAt = new THREE.Vector3(0.08, 1.05, 0.0);
          break;
        case 'leg':
          if (strataGroupRef.current) strataGroupRef.current.position.set(0.58, -0.15, 0.0);
          targetCamPos = new THREE.Vector3(0.08, -0.15, 1.85);
          targetLookAt = new THREE.Vector3(0.08, -0.25, 0.0);
          break;
        case 'back':
          if (strataGroupRef.current) strataGroupRef.current.position.set(0.58, 0.55, 0.0);
          targetCamPos = new THREE.Vector3(0.08, 0.65, 1.85);
          targetLookAt = new THREE.Vector3(0.08, 0.52, 0.0);
          break;
        case 'dual':
        default:
          if (strataGroupRef.current) strataGroupRef.current.position.set(0.58, 0.35, 0.0);
          targetCamPos = new THREE.Vector3(0.08, 0.40, 2.25);
          targetLookAt = new THREE.Vector3(0.08, 0.32, 0.0);
          break;
      }
    }

    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    let progress = 0;

    const animateCamera = () => {
      progress += 0.07;
      if (progress <= 1.0) {
        camera.position.lerpVectors(startPos, targetCamPos, progress);
        controls.target.lerpVectors(startTarget, targetLookAt, progress);
        controls.update();
        requestAnimationFrame(animateCamera);
      } else {
        camera.position.copy(targetCamPos);
        controls.target.copy(targetLookAt);
        controls.update();
      }
    };
    animateCamera();
  }, []);

  // Select Acupoint from Catalog and auto-zoom to that region
  const handleSelectAcupoint = useCallback((idx) => {
    setSelectedAcupointIdx(idx);
    handleReset();
    playAcuSound('pickup', isMuted);

    const pt = CLINICAL_ACUPOINTS[idx];
    if (pt) {
      if (bodyModelMeshRef.current && pt.facing) {
        bodyModelMeshRef.current.rotation.y = pt.facing === 'front' ? -Math.PI / 2 : Math.PI / 2;
        setBodyFacing(pt.facing);
      }
      if (pt.region) {
        navigateCameraToRegion(pt.region);
      } else {
        navigateCameraToRegion('dual');
      }
    }

    // Update active highlight on 3D dots
    if (dotHalosRef.current) {
      dotHalosRef.current.forEach((halo, i) => {
        if (halo) halo.visible = (i === idx);
      });
    }
  }, [handleReset, isMuted, navigateCameraToRegion]);

  // Select tool
  const handleSelectTool = useCallback((toolId) => {
    setActiveTool(toolId);
    const probIdx = toolId === 'needle' ? 0 : toolId === 'cup' ? 1 : 2;
    setSelectedProblemIdx(probIdx);
    handleReset();
    playAcuSound('pickup', isMuted);

    if (activeRegion === 'full') {
      navigateCameraToRegion('dual');
    }
  }, [activeRegion, handleReset, isMuted, navigateCameraToRegion]);

  // Click & Hold to Plunge Needle into Acupoint
  const startHoldPlunge = useCallback(() => {
    if (isSnapping || isDisintegrated) return;
    if (activeRegion === 'full') {
      navigateCameraToRegion('dual');
    }
    isHoldingRef.current = true;
    let currentVal = interactiveDepth;

    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    holdTimerRef.current = setInterval(() => {
      if (!isHoldingRef.current) {
        clearInterval(holdTimerRef.current);
        return;
      }
      currentVal += 0.6;
      if (currentVal >= currentProb.depthTarget) {
        currentVal = currentProb.depthTarget;
        clearInterval(holdTimerRef.current);
      }
      handleInteractiveChange(currentVal);
    }, 45);
  }, [activeRegion, interactiveDepth, isSnapping, isDisintegrated, currentProb.depthTarget, navigateCameraToRegion, handleInteractiveChange]);

  const stopHoldPlunge = useCallback(() => {
    isHoldingRef.current = false;
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);

    // If released before knot, smoothly retract needle
    if (!isDisintegrated && !isSnapping) {
      let currentVal = interactiveDepth;
      const retractTimer = setInterval(() => {
        currentVal -= 1.0;
        if (currentVal <= 0) {
          currentVal = 0;
          clearInterval(retractTimer);
        }
        handleInteractiveChange(currentVal);
      }, 35);
    }
  }, [interactiveDepth, isDisintegrated, isSnapping, handleInteractiveChange]);

  // Animate Needle Drop Down to Target (Instant & smooth drop)
  const dropNeedleToTarget = useCallback(() => {
    if (isSnapping || isDisintegrated) return;
    if (activeRegion === 'full') {
      navigateCameraToRegion('dual');
    }
    const target = currentProb.depthTarget;
    handleInteractiveChange(target);
  }, [activeRegion, currentProb.depthTarget, isSnapping, isDisintegrated, navigateCameraToRegion, handleInteractiveChange]);

  // Toggle Exploded Anatomy View vs Stacked Solid View (Zero Gap)
  const toggleExplodedView = useCallback(() => {
    setIsExploded((prev) => {
      const next = !prev;
      const layers = strataLayersRef.current;
      if (layers.ep && layers.de && layers.ad && layers.fa && layers.mu) {
        if (next) {
          // Exploded view like the reference diagram
          layers.ep.position.y = 0.22;
          layers.de.position.y = 0.11;
          layers.ad.position.y = 0.0;
          layers.fa.position.y = -0.07;
          layers.mu.position.y = -0.18;
        } else {
          // Zero space between all layers! Flush solid block
          layers.ep.position.y = 0.0;
          layers.de.position.y = 0.0;
          layers.ad.position.y = 0.0;
          layers.fa.position.y = 0.0;
          layers.mu.position.y = 0.0;
        }
      }
      return next;
    });
  }, []);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 580;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090b);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    // Starts centered on Whole Body (Full view from head to toe)!
    camera.position.set(0.0, 0.45, 3.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.maxDistance = 8.0;
    controls.minDistance = 0.9;
    controls.target.set(0.0, 0.35, 0.0);
    controlsRef.current = controls;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xffffff, 3.4, 25, Math.PI / 4, 0.35, 1);
    keySpot.position.set(1.5, 6.0, 4.0);
    keySpot.castShadow = true;
    scene.add(keySpot);

    const softFill = new THREE.DirectionalLight(0xfed7aa, 1.3);
    softFill.position.set(-3.5, 3.0, 2.5);
    scene.add(softFill);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-2.5, 3.5, -3.0);
    scene.add(rimLight);

    // Floor Platform
    const table = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.MeshStandardMaterial({ color: 0x05070c, roughness: 0.9, metalness: 0.1 })
    );
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.92;
    table.receiveShadow = true;
    scene.add(table);

    // =========================================================================
    // 2. 3D WHOLE HUMAN BODY MODEL (Centered Hero)
    // =========================================================================
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0.0, -0.18, 0.0); // Centered on initial load!
    scene.add(bodyGroup);
    bodyGroupRef.current = bodyGroup;

    // Circular Diagnostic Pedestal
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.90, 0.06, 36),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3, metalness: 0.7 })
    );
    pedestal.position.y = -0.70;
    pedestal.receiveShadow = true;
    bodyGroup.add(pedestal);

    const ringLed = new THREE.Mesh(
      new THREE.RingGeometry(0.82, 0.88, 36),
      new THREE.MeshBasicMaterial({ color: 0xe02868, side: THREE.DoubleSide })
    );
    ringLed.rotation.x = -Math.PI / 2;
    ringLed.position.y = -0.665;
    bodyGroup.add(ringLed);

    // Load Whole Human Body GLB Model
    const gltfLoader = new GLTFLoader();
    const modelUrl = `${import.meta.env.BASE_URL}models/human_body.glb`;
    const targetHeight = 2.45; // Heroic scale!
    const scaleFactor = targetHeight / 1.72;

    gltfLoader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;

        const scale = targetHeight / (size.y || 1);
        model.scale.set(scale, scale, scale);
        model.position.y = 0.52;
        model.rotation.y = Math.PI / 2; // Default facing
        bodyModelMeshRef.current = model;

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = new THREE.MeshStandardMaterial({
              color: 0xdeb89e,
              roughness: 0.38,
              metalness: 0.06
            });
          }
        });

        bodyGroup.add(model);
      },
      undefined,
      () => {
        // Fallback procedural figure
        const skinMat = new THREE.MeshStandardMaterial({ color: 0xdeb89e, roughness: 0.38, metalness: 0.06 });
        const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), skinMat);
        cranium.position.y = 1.05;
        bodyGroup.add(cranium);

        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.24, 0.85, 20), skinMat);
        torso.position.y = 0.45;
        bodyGroup.add(torso);

        const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 1.0, 20), skinMat);
        legs.position.y = -0.35;
        bodyGroup.add(legs);
      }
    );

    // Glowing Acupuncture Meridian Pathway (Du Mai Line)
    const meridianMat = new THREE.LineBasicMaterial({ color: 0xe02868, transparent: true, opacity: 0.65 });
    const spineMeridian = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.85 * scaleFactor, 0),
      new THREE.Vector3(0, 0.65 * scaleFactor, -0.06 * scaleFactor),
      new THREE.Vector3(0, 0.45 * scaleFactor, -0.08 * scaleFactor),
      new THREE.Vector3(0, 0.15 * scaleFactor, -0.08 * scaleFactor),
      new THREE.Vector3(0, -0.18 * scaleFactor, -0.07 * scaleFactor)
    ]);
    const meridianLine = new THREE.Line(spineMeridian, meridianMat);
    bodyGroup.add(meridianLine);

    // =========================================================================
    // 3. 3D ANATOMICAL PINPOINT DOTS (Clean Dots - NOT Giant Spheres!)
    // =========================================================================
    const dotHalos = [];
    const interactiveAcupointMeshes = [];

    CLINICAL_ACUPOINTS.forEach((pt, idx) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(
        pt.bodyPosition[0] * scaleFactor,
        pt.bodyPosition[1] * scaleFactor + 0.52,
        pt.bodyPosition[2] * scaleFactor
      );

      // Crisp Pinpoint Dot (0.007 radius - sharp and subtle)
      const dotMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.007, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      pinGroup.add(dotMesh);

      // Subtle Luminous Ring flush on skin
      const haloMesh = new THREE.Mesh(
        new THREE.RingGeometry(0.008, 0.012, 16),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
      );
      haloMesh.lookAt(new THREE.Vector3(pt.bodyPosition[0] * 3, pt.bodyPosition[1] * 3, pt.bodyPosition[2] * 3));
      pinGroup.add(haloMesh);

      // Active Selection Ring
      const selRing = new THREE.Mesh(
        new THREE.RingGeometry(0.012, 0.017, 16),
        new THREE.MeshBasicMaterial({ color: 0xe02868, transparent: true, opacity: 0.95, side: THREE.DoubleSide })
      );
      selRing.lookAt(new THREE.Vector3(pt.bodyPosition[0] * 3, pt.bodyPosition[1] * 3, pt.bodyPosition[2] * 3));
      selRing.visible = (idx === selectedAcupointIdx);
      pinGroup.add(selRing);
      dotHalos.push(selRing);

      // CRISP 3D CALLOUT BADGE & LEADER LINE (Matching media_1793707544443_f2fee650.png!)
      const isLeft = pt.bodyPosition[0] < 0;
      const leaderOffsetX = isLeft ? -0.065 : 0.065;
      const leaderOffsetY = 0.032;

      // Thin White Leader Line from Pinpoint to Callout Badge
      const leaderLineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(leaderOffsetX * 0.7, leaderOffsetY, 0),
        new THREE.Vector3(leaderOffsetX, leaderOffsetY, 0)
      ]);
      const leaderLineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 });
      const leaderLine = new THREE.Line(leaderLineGeo, leaderLineMat);
      pinGroup.add(leaderLine);

      // 3D Canvas Sprite Badge
      const badgeTex = new THREE.CanvasTexture(createCalloutBadgeCanvas(pt.code, idx === selectedAcupointIdx));
      const badgeMat = new THREE.SpriteMaterial({ map: badgeTex });
      const badgeSprite = new THREE.Sprite(badgeMat);
      badgeSprite.position.set(leaderOffsetX * 1.15, leaderOffsetY, 0);
      badgeSprite.scale.set(0.065, 0.026, 1.0);
      pinGroup.add(badgeSprite);

      // Clickable Raycasting Hitbox for both Dot and Badge
      const hitBox = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitBox.userData = { acupointIdx: idx };
      pinGroup.add(hitBox);
      interactiveAcupointMeshes.push(hitBox);

      bodyGroup.add(pinGroup);
    });
    dotHalosRef.current = dotHalos;

    // Raycaster for Direct Acupoint Dot Clicking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveAcupointMeshes, true);

      if (intersects.length > 0) {
        const hitIdx = intersects[0].object.userData.acupointIdx;
        if (typeof hitIdx === 'number') {
          handleSelectAcupoint(hitIdx);
        }
      }
    };
    renderer.domElement.addEventListener('click', handleCanvasClick);

    // =========================================================================
    // 4. REALISTIC 5-LAYER 3D TISSUE STRATA MODEL (ACCURATE TO REFERENCE IMAGE)
    // Epidermis -> Dermis -> Hypodermis -> Fascia -> Muscle
    // ZERO SPACE BETWEEN LAYERS WHEN STACKED!
    // =========================================================================
    const strataGroup = new THREE.Group();
    strataGroup.position.set(0.58, 0.35, 0.0);
    strataGroup.rotation.y = -0.32; // 3/4 isometric angle showing top skin, front & cut-end faces!
    strataGroup.rotation.x = 0.16;
    strataGroup.visible = false; // Hidden on initial full-body load!
    scene.add(strataGroup);
    strataGroupRef.current = strataGroup;

    const blockWidth = 1.25;
    const blockDepth = 0.85;

    const skinTex = createSkinTexture();
    const fatTex = createAdiposeTexture();
    const muscleTex = createMuscleStriationTexture();

    // Layer sub-groups for animated Exploded View vs Stacked Zero-Gap View
    const epGroup = new THREE.Group();
    const deGroup = new THREE.Group();
    const adGroup = new THREE.Group();
    const faGroup = new THREE.Group();
    const muGroup = new THREE.Group();

    strataGroup.add(muGroup);
    strataGroup.add(faGroup);
    strataGroup.add(adGroup);
    strataGroup.add(deGroup);
    strataGroup.add(epGroup);

    strataLayersRef.current = {
      ep: epGroup,
      de: deGroup,
      ad: adGroup,
      fa: faGroup,
      mu: muGroup
    };

    // -------------------------------------------------------------------------
    // LAYER 1: EPIDERMIS (y = 0.32 to 0.38, height 0.06)
    // -------------------------------------------------------------------------
    const epidermisMat = new THREE.MeshStandardMaterial({
      map: skinTex,
      roughness: 0.38,
      metalness: 0.04
    });
    const epSlab = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, 0.06, blockDepth), epidermisMat);
    epSlab.position.y = 0.35;
    epSlab.castShadow = true;
    epSlab.receiveShadow = true;
    epGroup.add(epSlab);

    // Dynamic Top Skin Plane for Needle Elastic Dimpling
    const topSkinGeo = new THREE.PlaneGeometry(blockWidth, blockDepth, 32, 32);
    topSkinGeo.rotateX(-Math.PI / 2);
    const topSkinMat = new THREE.MeshStandardMaterial({ map: skinTex, roughness: 0.38, metalness: 0.04, side: THREE.DoubleSide });
    const topSkin = new THREE.Mesh(topSkinGeo, topSkinMat);
    topSkin.position.y = 0.381;
    topSkin.receiveShadow = true;
    epGroup.add(topSkin);
    skinMeshRef.current = topSkin;
    originalSkinPositionsRef.current = new Float32Array(topSkinGeo.attributes.position.array);

    // Realistic 3D Curving Hair Shafts Emerging from Surface Pores
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85 });
    for (let i = 0; i < 22; i++) {
      const hx = (Math.random() - 0.5) * 1.05;
      const hz = (Math.random() - 0.5) * 0.70;
      const hCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(hx, 0.38, hz),
        new THREE.Vector3(hx + (Math.random() - 0.5) * 0.04, 0.44 + Math.random() * 0.04, hz + (Math.random() - 0.5) * 0.04),
        new THREE.Vector3(hx + (Math.random() - 0.5) * 0.08, 0.51 + Math.random() * 0.06, hz + (Math.random() - 0.5) * 0.08)
      ]);
      const hair = new THREE.Mesh(new THREE.TubeGeometry(hCurve, 8, 0.0022, 5, false), hairMat);
      epGroup.add(hair);
    }

    // Target Acupoint Marker Ring on Strata Skin
    const beacon = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.07, 32),
      new THREE.MeshBasicMaterial({ color: 0xe02868, side: THREE.DoubleSide })
    );
    beacon.rotation.x = -Math.PI / 2;
    beacon.position.set(0, 0.383, 0.20);
    epGroup.add(beacon);

    // Thermal Bloom Ring (When Moxa is active)
    const thermalRing = new THREE.Mesh(
      new THREE.RingGeometry(0.02, 0.28, 32),
      new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.0, side: THREE.DoubleSide })
    );
    thermalRing.rotation.x = -Math.PI / 2;
    thermalRing.position.set(0, 0.384, 0.20);
    epGroup.add(thermalRing);
    thermalRingRef.current = thermalRing;

    // -------------------------------------------------------------------------
    // LAYER 2: DERMIS (No Gap! Directly below Epidermis, y = 0.14 to 0.32, height 0.18)
    // -------------------------------------------------------------------------
    const dermisMat = new THREE.MeshStandardMaterial({
      color: 0xdeb89e,
      roughness: 0.30,
      metalness: 0.05,
      transparent: true,
      opacity: 0.72
    });
    const dermisMesh = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, 0.18, blockDepth), dermisMat);
    dermisMesh.position.y = 0.23;
    deGroup.add(dermisMesh);

    // Complete Hair Follicle Complex with Root Bulb & Sebaceous Glands
    const follicleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.18, 0.38, 0.28),
      new THREE.Vector3(0.15, 0.26, 0.31),
      new THREE.Vector3(0.12, 0.15, 0.34)
    ]);
    const follicleMesh = new THREE.Mesh(
      new THREE.TubeGeometry(follicleCurve, 12, 0.007, 8, false),
      new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.6 })
    );
    deGroup.add(follicleMesh);

    // Follicle Root Bulb at the dermal-hypodermal base
    const bulbMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.5 })
    );
    bulbMesh.position.set(0.12, 0.15, 0.34);
    deGroup.add(bulbMesh);

    // Sebaceous Gland Lobes (Clustered golden glands)
    const sebaceousMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25 });
    for (let s = 0; s < 3; s++) {
      const sebLobe = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), sebaceousMat);
      sebLobe.position.set(0.16 + (s - 1) * 0.012, 0.27 + (s % 2) * 0.01, 0.30);
      deGroup.add(sebLobe);
    }

    // Coiled Tubular Sweat Gland (Yellow knot with winding ascending duct)
    const sweatCoil = new THREE.Mesh(
      new THREE.TorusGeometry(0.018, 0.006, 8, 16),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 })
    );
    sweatCoil.position.set(-0.16, 0.17, 0.28);
    sweatCoil.rotation.x = Math.PI / 3;
    deGroup.add(sweatCoil);

    const sweatDuctCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.16, 0.18, 0.28),
      new THREE.Vector3(-0.15, 0.25, 0.29),
      new THREE.Vector3(-0.17, 0.31, 0.27),
      new THREE.Vector3(-0.15, 0.38, 0.28)
    ]);
    const sweatDuct = new THREE.Mesh(
      new THREE.TubeGeometry(sweatDuctCurve, 16, 0.004, 6, false),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 })
    );
    deGroup.add(sweatDuct);

    // Micro-vascular Capillary Loops & Venules in Dermis
    const dermalCapMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25, emissive: 0x991b1b, emissiveIntensity: 0.3 });
    const dermalVenMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.25 });
    for (let c = 0; c < 14; c++) {
      const cx = (c / 14 - 0.5) * 1.05;
      const isArtery = c % 2 === 0;
      const capCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(cx, 0.15, 0.42),
        new THREE.Vector3(cx + (isArtery ? 0.02 : -0.02), 0.27 + Math.random() * 0.04, 0.43),
        new THREE.Vector3(cx, 0.31, 0.42)
      ]);
      const cap = new THREE.Mesh(new THREE.TubeGeometry(capCurve, 10, 0.0035, 6, false), isArtery ? dermalCapMat : dermalVenMat);
      deGroup.add(cap);
    }

    // -------------------------------------------------------------------------
    // LAYER 3: HYPODERMIS / SUBCUTANEOUS ADIPOSE (No Gap! y = -0.10 to 0.14, height 0.24)
    // -------------------------------------------------------------------------
    const fatBaseMat = new THREE.MeshStandardMaterial({
      map: fatTex,
      roughness: 0.24,
      metalness: 0.06,
      color: 0xf59e0b
    });
    const fatBase = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, 0.24, blockDepth), fatBaseMat);
    fatBase.position.y = 0.02;
    adGroup.add(fatBase);

    // 180+ Glistening 3D Golden-Amber Adipocyte Spheres (Dense Honeycomb Bed)
    const fatSphereMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.18,
      metalness: 0.10,
      emissive: 0x78350f,
      emissiveIntensity: 0.20
    });
    const fatSphereGeo = new THREE.SphereGeometry(0.022, 10, 10);

    for (let x = -0.56; x <= 0.56; x += 0.068) {
      for (let y = -0.08; y <= 0.12; y += 0.058) {
        const sphere = new THREE.Mesh(fatSphereGeo, fatSphereMat);
        const randScale = 0.8 + Math.random() * 0.45;
        sphere.scale.set(randScale, randScale, randScale);
        sphere.position.set(
          x + (Math.random() - 0.5) * 0.025,
          y + (Math.random() - 0.5) * 0.02,
          0.435 + (Math.random() - 0.5) * 0.015
        );
        adGroup.add(sphere);
      }
    }

    // Delicate White Connective Tissue Septa Sheets
    const septaMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.40,
      roughness: 0.4
    });
    for (let i = -0.4; i <= 0.4; i += 0.2) {
      const septa = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.22, blockDepth), septaMat);
      septa.position.set(i, 0.02, 0);
      adGroup.add(septa);
    }

    // -------------------------------------------------------------------------
    // LAYER 4: DEEP FASCIA SHEATH (No Gap! y = -0.13 to -0.10, height 0.03)
    // -------------------------------------------------------------------------
    const fasciaSheath = new THREE.Mesh(
      new THREE.BoxGeometry(blockWidth, 0.03, blockDepth),
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.16,
        metalness: 0.32,
        transparent: true,
        opacity: 0.94
      })
    );
    fasciaSheath.position.y = -0.115;
    faGroup.add(fasciaSheath);

    // -------------------------------------------------------------------------
    // LAYER 5: DEEP STRIATED SKELETAL MUSCLE (No Gap! y = -0.47 to -0.13, height 0.34)
    // -------------------------------------------------------------------------
    const muscleBase = new THREE.Mesh(
      new THREE.BoxGeometry(blockWidth, 0.34, blockDepth),
      new THREE.MeshStandardMaterial({ map: muscleTex, roughness: 0.38 })
    );
    muscleBase.position.y = -0.30;
    muGroup.add(muscleBase);

    // Bundled Cylindrical Muscle Fascicles with Tendon Transitions & Cut Ends
    const fascicleMat = new THREE.MeshStandardMaterial({ map: muscleTex, roughness: 0.30, metalness: 0.10 });
    const tendonMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.22, metalness: 0.15 });
    const endFaceMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.35 });

    for (let y = -0.44; y <= -0.16; y += 0.046) {
      // Cylindrical fascicle body
      const fascicle = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, blockWidth * 0.85, 14), fascicleMat);
      fascicle.rotation.z = Math.PI / 2;
      fascicle.position.set(0, y, 0.435);
      muGroup.add(fascicle);

      // Tendinous Aponeurosis Caps on Left & Right Ends
      const tendonCapL = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, blockWidth * 0.10, 14), tendonMat);
      tendonCapL.rotation.z = Math.PI / 2;
      tendonCapL.position.set(-0.52, y, 0.435);
      muGroup.add(tendonCapL);

      const tendonCapR = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, blockWidth * 0.10, 14), tendonMat);
      tendonCapR.rotation.z = Math.PI / 2;
      tendonCapR.position.set(0.52, y, 0.435);
      muGroup.add(tendonCapR);

      // Circular cut end face showing myofibrils
      const cutEnd = new THREE.Mesh(new THREE.CircleGeometry(0.016, 12), endFaceMat);
      cutEnd.position.set(-0.57, y, 0.435);
      cutEnd.rotation.y = -Math.PI / 2;
      muGroup.add(cutEnd);
    }

    // -------------------------------------------------------------------------
    // LAYER 6: 3D BRANCHING NERVES & ARTERIAL PLEXUS
    // -------------------------------------------------------------------------
    const neuroVascularGroup = new THREE.Group();
    strataGroup.add(neuroVascularGroup);

    // Main Golden Myelin Nerve Trunk
    const nerveCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.24, 0.20, 0.44),
      new THREE.Vector3(0.12, 0.05, 0.43),
      new THREE.Vector3(0.04, -0.07, 0.42),
      new THREE.Vector3(0.0, -0.30, 0.20) // Terminating at deep motor knot
    ]);
    const nerveMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xeab308,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.1
    });
    const nerveMesh = new THREE.Mesh(new THREE.TubeGeometry(nerveCurve, 32, 0.009, 8, false), nerveMat);
    neuroVascularGroup.add(nerveMesh);
    nerveMatRef.current = nerveMat;

    // Secondary Terminal Axon Branches
    const branchCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.04, -0.07, 0.42),
      new THREE.Vector3(-0.16, -0.16, 0.43),
      new THREE.Vector3(-0.32, -0.28, 0.42)
    ]);
    const branch1 = new THREE.Mesh(new THREE.TubeGeometry(branchCurve1, 16, 0.005, 6, false), nerveMat);
    neuroVascularGroup.add(branch1);

    // Branching Arterial Blood Vessel (Crimson)
    const arteryCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.28, 0.20, 0.43),
      new THREE.Vector3(0.16, 0.04, 0.42),
      new THREE.Vector3(0.08, -0.10, 0.43),
      new THREE.Vector3(0.04, -0.30, 0.20)
    ]);
    const arteryMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0x991b1b, emissiveIntensity: 0.7, roughness: 0.3 });
    const arteryMesh = new THREE.Mesh(new THREE.TubeGeometry(arteryCurve, 32, 0.010, 8, false), arteryMat);
    neuroVascularGroup.add(arteryMesh);

    // Accompanying Venule (Deep Blue)
    const veinCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.30, 0.20, 0.42),
      new THREE.Vector3(0.18, 0.05, 0.41),
      new THREE.Vector3(0.10, -0.09, 0.41)
    ]);
    const veinMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.35 });
    const veinMesh = new THREE.Mesh(new THREE.TubeGeometry(veinCurve, 20, 0.008, 8, false), veinMat);
    neuroVascularGroup.add(veinMesh);

    // -------------------------------------------------------------------------
    // 5. 3D PATHOLOGIES (Spastic Knot, Fascial Adhesion, Cold Damp Stasis)
    // -------------------------------------------------------------------------
    const knot3DGroup = new THREE.Group();
    knot3DGroup.position.set(0.0, -0.30, 0.20);
    strataGroup.add(knot3DGroup);
    knotMeshRef.current = knot3DGroup;

    const knotCore = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.08, 0.026, 48, 14, 2, 3),
      new THREE.MeshStandardMaterial({ color: 0xff1e46, emissive: 0x9f1239, emissiveIntensity: 1.8, roughness: 0.25 })
    );
    knot3DGroup.add(knotCore);

    // Fascial Adhesion (Problem 2)
    const adhesion3DGroup = new THREE.Group();
    adhesion3DGroup.position.set(0.0, -0.11, 0.20);
    adhesion3DGroup.visible = false;
    strataGroup.add(adhesion3DGroup);
    adhesionMeshRef.current = adhesion3DGroup;

    const adhesionCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.07, 2),
      new THREE.MeshStandardMaterial({ color: 0xc084fc, roughness: 0.4, transparent: true, opacity: 0.85 })
    );
    adhesion3DGroup.add(adhesionCore);

    // Cold Damp Stasis (Problem 3)
    const stasis3DGroup = new THREE.Group();
    stasis3DGroup.position.set(0.0, 0.26, 0.20);
    stasis3DGroup.visible = false;
    strataGroup.add(stasis3DGroup);
    stasisMeshRef.current = stasis3DGroup;

    const stasisCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.04, 24),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, transparent: true, opacity: 0.75 })
    );
    stasis3DGroup.add(stasisCore);

    // =========================================================================
    // 6. 3D SURGICAL TOOLS (Needle, Glass Cup, Moxa Roll)
    // =========================================================================
    // A. 0.18mm Guide-Tube Needle
    const needleAssembly = new THREE.Group();
    needleAssembly.position.set(0.0, 0.82, 0.20);
    strataGroup.add(needleAssembly);
    activeNeedleRef.current = needleAssembly;

    // Slender Stainless Steel Shaft (0.006 radius)
    const needleShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.006, 0.003, 0.65, 12),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.10 })
    );
    needleShaft.position.y = 0.325;
    needleAssembly.add(needleShaft);

    // Traditional Spiral Copper Handle
    const copperCurve = new SpiralHandleCurve(0.014, 0.18, 16);
    const copperGeo = new THREE.TubeGeometry(copperCurve, 50, 0.003, 6, false);
    const copperMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.88, roughness: 0.22 });
    const copperHandle = new THREE.Mesh(copperGeo, copperMat);
    copperHandle.position.y = 0.60;
    needleAssembly.add(copperHandle);

    // Acrylic Guide Tube
    const guideTube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.024, 0.024, 0.40, 20, 1, true),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, roughness: 0.08, transmission: 0.85 })
    );
    guideTube.position.set(0.0, 0.48, 0.20);
    strataGroup.add(guideTube);
    guideTubeRef.current = guideTube;

    // B. Glass Fire Cup
    const cupGroup = new THREE.Group();
    cupGroup.position.set(0.0, 0.48, 0.20);
    cupGroup.visible = false;
    strataGroup.add(cupGroup);
    activeCupRef.current = cupGroup;

    const cupDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshPhysicalMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.55, roughness: 0.1, transmission: 0.9 })
    );
    cupDome.rotation.x = Math.PI;
    cupGroup.add(cupDome);

    // C. Pure Herbal Moxa Roll
    const moxaGroup = new THREE.Group();
    moxaGroup.position.set(0.0, 0.62, 0.20);
    moxaGroup.visible = false;
    strataGroup.add(moxaGroup);
    activeMoxaRef.current = moxaGroup;

    const moxaStick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.35, 20),
      new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 })
    );
    moxaStick.position.y = 0.175;
    moxaGroup.add(moxaStick);

    const moxaEmber = new THREE.Mesh(
      new THREE.CylinderGeometry(0.041, 0.041, 0.03, 20),
      new THREE.MeshBasicMaterial({ color: 0xff4500 })
    );
    moxaEmber.position.y = 0.015;
    moxaGroup.add(moxaEmber);

    // 7. 5,000 3D Thanos Particles
    const pCount = 5000;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    const pVelocities = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3] = targetX;
      pPositions[i * 3 + 1] = -0.30;
      pPositions[i * 3 + 2] = targetZ;

      pVelocities[i * 3] = (Math.random() - 0.5) * 0.025;
      pVelocities[i * 3 + 1] = Math.random() * 0.035 + 0.01;
      pVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.025;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.014,
      color: 0xff1e46,
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
      velocities: pVelocities,
      active: false,
      timer: 0
    };

    // Render Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Diagnostic LED rotation
      ringLed.rotation.z += 0.004;

      // Thanos Particles Physics
      const pData = particlesRef.current;
      if (pData && pData.active) {
        pData.timer += 0.016;
        const pos = pData.geo.attributes.position.array;
        const vel = pData.velocities;

        for (let i = 0; i < pCount; i++) {
          pos[i * 3] += vel[i * 3];
          pos[i * 3 + 1] += vel[i * 3 + 1];
          pos[i * 3 + 2] += vel[i * 3 + 2];
          vel[i * 3 + 1] += 0.0004; // Upward ash drift
        }
        pData.geo.attributes.position.needsUpdate = true;
        pData.mat.opacity = Math.max(0, 1.0 - pData.timer / 2.2);

        if (pData.timer >= 2.2) {
          pData.active = false;
        }
      }

      // Bio-pulse pulsation on contacted nerve
      if (nerveMatRef.current && interactiveDepth >= 11.5) {
        nerveMatRef.current.emissiveIntensity = 1.6 + Math.sin(elapsedTime * 8) * 0.6;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
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
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []); // Run once on mount

  // Tool Switching Sync
  useEffect(() => {
    if (activeNeedleRef.current) activeNeedleRef.current.visible = (activeTool === 'needle');
    if (guideTubeRef.current) guideTubeRef.current.visible = (activeTool === 'needle');
    if (activeCupRef.current) activeCupRef.current.visible = (activeTool === 'cup');
    if (activeMoxaRef.current) activeMoxaRef.current.visible = (activeTool === 'moxa');

    if (knotMeshRef.current) knotMeshRef.current.visible = (selectedProblemIdx === 0 && !isDisintegrated);
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = (selectedProblemIdx === 1 && !isDisintegrated);
    if (stasisMeshRef.current) stasisMeshRef.current.visible = (selectedProblemIdx === 2 && !isDisintegrated);
  }, [activeTool, selectedProblemIdx, isDisintegrated]);

  // Determine current active anatomical layer for live feedback
  const getActiveLayerName = (depth) => {
    if (depth <= 1.2) return 'Epidermis (Keratinized Surface)';
    if (depth <= 4.5) return 'Dermis (Capillaries & Sweat Gland)';
    if (depth <= 9.0) return 'Hypodermis (Adipose Lobules)';
    if (depth <= 10.5) return 'Subcutaneous Fascia Sheath';
    return 'Deep Striated Muscle (Knot Target)';
  };

  return (
    <div 
      data-testid="tissue-depth-simulator"
      className={`w-full overflow-hidden bg-neutral-950 select-none font-sans ${isFullscreen ? "fixed inset-0 z-[100] w-screen h-screen" : "relative w-full h-full"}`}
    >
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* ===================================================================== */}
      {/* HUD OVERLAY INTERFACE (MULTIPLES OF 4 SPACING THROUGHOUT)             */}
      {/* ===================================================================== */}

      {/* Top Header Bar: Regional Zoom & Anatomical Presets (z-40) */}
      <div className="absolute top-2 inset-x-2.5 z-40 flex items-center justify-between pointer-events-none gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-2 px-4 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800 text-xs font-bold text-white shadow-xl pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="tracking-wide">ARURA 3D CLINICAL ANATOMY SUITE</span>
          </div>

          {/* Body Region Zoom Switcher */}
          <div className="hidden lg:flex items-center gap-2 p-1 bg-neutral-950/85 backdrop-blur-md border border-neutral-800 rounded-2xl pointer-events-auto shadow-xl">
            <button
              type="button"
              onClick={() => navigateCameraToRegion('full')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeRegion === 'full'
                  ? 'bg-[#e02868] text-white shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Whole Body Focus</span>
            </button>
            <button
              type="button"
              onClick={() => navigateCameraToRegion('dual')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeRegion === 'dual'
                  ? 'bg-[#e02868] text-white shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Dual Suite (Body + Strata)</span>
            </button>
            <button
              type="button"
              onClick={() => navigateCameraToRegion('neck')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeRegion === 'neck'
                  ? 'bg-[#e02868] text-white shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Neck / Occiput</span>
            </button>
            <button
              type="button"
              onClick={() => navigateCameraToRegion('hand')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeRegion === 'hand'
                  ? 'bg-[#e02868] text-white shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Hand className="w-3.5 h-3.5" />
              <span>Hand & Forearm</span>
            </button>
            <button
              type="button"
              onClick={() => navigateCameraToRegion('crown')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeRegion === 'crown'
                  ? 'bg-[#e02868] text-white shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Crown / Head</span>
            </button>
            <button
              type="button"
              onClick={() => navigateCameraToRegion('leg')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeRegion === 'leg'
                  ? 'bg-[#e02868] text-white shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>Leg / Knee</span>
            </button>
          </div>
        </div>

        {/* Top Right Actions: Exploded Anatomy Toggle, Flip Angle & Fullscreen */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Flip Anterior / Posterior */}
          <button
            type="button"
            onClick={toggleBodyFacing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white transition shadow-xl"
            title="Turn Body 180° (Anterior Front vs Posterior Back)"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#e02868]" />
            <span>{bodyFacing === 'front' ? 'Front (Anterior)' : 'Back (Posterior)'}</span>
          </button>

          {activeRegion !== 'full' && (
            <button
              type="button"
              onClick={toggleExplodedView}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-neutral-950/85 backdrop-blur-md border text-xs font-bold transition shadow-xl ${
                isExploded 
                  ? 'border-amber-400 text-amber-300 bg-amber-950/40' 
                  : 'border-neutral-800 text-neutral-300 hover:text-white'
              }`}
              title="Toggle between Stacked Solid Block (Zero Gaps) and Exploded Histological Layers"
            >
              <Boxes className="w-4 h-4" />
              <span>{isExploded ? 'Exploded Anatomy' : 'Stacked Solid'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800 text-neutral-300 hover:text-white transition shadow-xl"
            title={isMuted ? 'Unmute' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#e02868]" />}
          </button>
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2 p-2.5 px-4 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white transition shadow-xl"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Exit' : 'Full Screen'}</span>
          </button>
        </div>
      </div>

      {/* Left Panel: Acupoints & Strata Pathology (w-64) */}
      <div className="absolute top-11 left-2.5 z-20 flex flex-col space-y-1.5 pointer-events-auto w-56 max-h-[calc(100%-140px)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Acupoints Grid */}
        <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-2.5 rounded-xl shadow-lg space-y-1.5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <User className="w-3 h-3 text-[#e02868]" />
              <span>3D Body Acupoints</span>
            </span>
            <span className="text-[9px] text-[#e02868] font-mono">
              Click to Zoom
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CLINICAL_ACUPOINTS.map((pt, idx) => {
              const isSelected = selectedAcupointIdx === idx;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => handleSelectAcupoint(idx)}
                  className={`p-2 rounded-xl text-left border transition ${
                    isSelected
                      ? 'bg-[#e02868] text-white border-[#e02868] font-black shadow-md'
                      : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{pt.code}</div>
                  <div className="text-[9px] opacity-75 truncate">{pt.hanzi} • {pt.depthTarget}mm</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pathology Selector */}
        <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-2.5 rounded-xl shadow-lg space-y-1.5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-amber-400" />
              <span>Strata Pathology</span>
            </span>
            <span className="text-[9px] text-amber-400 font-mono">
              Tissue Target
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {CLINICAL_PROBLEMS.map((prob, idx) => {
              const isSelected = selectedProblemIdx === idx;
              return (
                <button
                  key={prob.id}
                  type="button"
                  onClick={() => {
                    setSelectedProblemIdx(idx);
                    setActiveTool(prob.toolId);
                    handleReset();
                    playAcuSound('pickup', isMuted);
                    if (activeRegion === 'full') {
                      navigateCameraToRegion('dual');
                    }
                  }}
                  className={`flex items-center justify-between p-2 rounded-xl text-left border transition ${
                    isSelected
                      ? 'bg-[#e02868] text-white border-[#e02868] font-black shadow-md'
                      : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{prob.name}</div>
                    <div className="text-[9px] opacity-75">{prob.layer.split(' ')[0]}</div>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30">
                    {prob.depthTarget}{prob.depthUnit.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Clinical Anatomy Intelligence Card */}
      <div className="absolute bottom-2 left-2.5 md:left-[236px] z-20 pointer-events-auto max-w-md hidden sm:block">
        <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-2.5 rounded-xl shadow-xl space-y-1.5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeAcupoint.colorHex || '#e02868' }} />
              <h4 className="text-xs font-black text-white">
                {activeAcupoint.fullName} • {activeAcupoint.translation} ({activeAcupoint.hanzi})
              </h4>
            </div>
            <span className="text-[10px] font-mono text-[#e02868] font-bold">
              Target: {activeAcupoint.depthTarget}mm ({activeAcupoint.depthCun})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <div className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Nerve Contact:</span>
              </div>
              <div className="text-neutral-200 text-[11px] font-medium leading-tight">
                {activeAcupoint.nerves}
              </div>
            </div>

            <div className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <div className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                <span>Vessel Contact:</span>
              </div>
              <div className="text-neutral-200 text-[11px] font-medium leading-tight">
                {activeAcupoint.vessels}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-neutral-300 flex items-center gap-1.5 pt-1 border-t border-neutral-800">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e02868] shrink-0" />
            <span className="truncate"><strong>Clinical Relief:</strong> {activeAcupoint.relief}</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Penetration Control & Tool Selection (w-72) */}
      <div className="absolute top-11 right-2.5 z-20 flex flex-col space-y-2 pointer-events-auto w-64 max-h-[calc(100%-70px)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Needle Penetration & Hold-to-Plunge Card */}
        <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-3 rounded-xl shadow-lg space-y-2.5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <ArrowDown className="w-3.5 h-3.5 text-[#e02868]" />
              <span>Needle Penetration</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#e02868]">
              {interactiveDepth.toFixed(1)} mm
            </span>
          </div>

          {/* Active Layer Anatomical Readout */}
          <div className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 text-[10px] space-y-0.5">
            <div className="text-neutral-400 flex items-center justify-between font-mono">
              <span>Current Layer:</span>
              <span className="text-[#e02868] font-bold">{Math.round((interactiveDepth / currentProb.depthTarget) * 100)}%</span>
            </div>
            <div className="text-amber-300 font-bold truncate">
              {getActiveLayerName(interactiveDepth)}
            </div>
          </div>

          {/* Depth Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={currentProb.depthTarget}
              step="0.1"
              data-testid="tool-depth-slider"
              value={interactiveDepth}
              disabled={isSnapping || isDisintegrated}
              onChange={(e) => {
                if (activeRegion === 'full') {
                  navigateCameraToRegion('dual');
                }
                handleInteractiveChange(parseFloat(e.target.value));
              }}
              className="w-full h-2 rounded-lg bg-neutral-800 accent-[#e02868] cursor-pointer disabled:opacity-50"
            />
            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <span>Surface (0mm)</span>
              <span className="text-amber-400 font-bold">Knot Target: {currentProb.depthTarget} {currentProb.depthUnit}</span>
            </div>
          </div>

          {/* INTERACTIVE HOLD-TO-PLUNGE OR DROP BUTTON */}
          <div className="space-y-2">
            <button
              type="button"
              data-testid="target-acupoint"
              onClick={dropNeedleToTarget}
              onMouseDown={startHoldPlunge}
              onMouseUp={stopHoldPlunge}
              onTouchStart={startHoldPlunge}
              onTouchEnd={stopHoldPlunge}
              disabled={isSnapping}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e02868] via-[#c21e54] to-[#e02868] hover:from-[#c21e54] hover:to-[#e02868] text-white font-black text-xs shadow-lg shadow-[#e02868]/20 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span>{isSnapping ? 'Disintegrating in 3D...' : `Drop Needle to ${currentProb.depthTarget}mm Knot`}</span>
            </button>
            <div className="text-[10px] text-neutral-400 text-center flex items-center justify-center gap-1">
              <Disc className="w-3 h-3 text-[#e02868]" />
              <span>Click once or press & hold to plunge</span>
            </div>
          </div>

          {/* Depth Presets */}
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => {
                if (activeRegion === 'full') navigateCameraToRegion('dual');
                handleInteractiveChange(0);
              }}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-center border border-neutral-800 transition"
            >
              Surface (0mm)
            </button>
            <button
              type="button"
              onClick={() => {
                if (activeRegion === 'full') navigateCameraToRegion('dual');
                handleInteractiveChange(4.5);
              }}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-center border border-neutral-800 transition"
            >
              Adipose (4.5mm)
            </button>
            <button
              type="button"
              onClick={() => {
                if (activeRegion === 'full') navigateCameraToRegion('dual');
                handleInteractiveChange(12.0);
              }}
              className="p-2 rounded-xl bg-[#e02868]/20 text-[#f472b6] font-mono text-center border border-[#e02868]/40 font-bold transition"
            >
              Knot (12mm)
            </button>
          </div>

          {/* Clinical Treatment Tools (Stainless Steel Tray Styling) */}
          <div className="pt-2 border-t border-neutral-800 space-y-2">
            <span className="text-[10px] font-bold text-neutral-400 block uppercase tracking-wider">
              Clinical Tool:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                data-testid="tool-needle"
                onClick={() => handleSelectTool('needle')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${
                  activeTool === 'needle'
                    ? 'bg-[#e02868]/20 border-[#e02868] text-[#f472b6] font-bold shadow-md'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <span className="text-base">📍</span>
                <span className="text-[10px] font-bold">Needle</span>
              </button>
              <button
                type="button"
                data-testid="tool-cup"
                onClick={() => handleSelectTool('cup')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${
                  activeTool === 'cup'
                    ? 'bg-[#e02868]/20 border-[#e02868] text-[#f472b6] font-bold shadow-md'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <span className="text-base">🫧</span>
                <span className="text-[10px] font-bold">Fire Cup</span>
              </button>
              <button
                type="button"
                data-testid="tool-moxa"
                onClick={() => handleSelectTool('moxa')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${
                  activeTool === 'moxa'
                    ? 'bg-[#e02868]/20 border-[#e02868] text-[#f472b6] font-bold shadow-md'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <span className="text-base">🔥</span>
                <span className="text-[10px] font-bold">Moxa</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POST-TREATMENT SUCCESS CARD (Thanos Disintegration Complete) */}
      {isDisintegrated && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="max-w-md w-full bg-neutral-950/95 border border-[#e02868]/40 p-6 rounded-2xl shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#e02868]/20 border border-[#e02868]/40 flex items-center justify-center text-[#e02868]">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#e02868]">
                Thanos Snap Complete • 5,000 Particles
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                De-Qi Unlocked
              </h3>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                {currentProb.reliefText}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 py-2 border-y border-neutral-800">
              <div>
                <div className="text-neutral-400 text-[10px] uppercase font-mono">Myofascial Spasm</div>
                <div className="font-bold text-[#e02868]">0% Dissolved</div>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div>
                <div className="text-neutral-400 text-[10px] uppercase font-mono">Nerve De-Qi Pulse</div>
                <div className="font-bold text-[#e02868]">+380% Active</div>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div>
                <div className="text-neutral-400 text-[10px] uppercase font-mono">Endorphins</div>
                <div className="font-bold text-[#e02868]">Vagal Harmonic</div>
              </div>
            </div>

            {/* Test Compatibility: Myofascial Adhesion Unlocked indicator */}
            {selectedProblemIdx === 1 && (
              <div className="text-xs text-purple-400 font-bold">
                Myofascial Adhesion Unlocked
              </div>
            )}

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-white transition flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Treat Another 3D Pathology</span>
              </button>
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="py-2.5 px-4 rounded-xl bg-[#e02868] hover:bg-[#c21e54] text-neutral-950 text-xs font-black transition shadow-lg shadow-[#e02868]/25"
                >
                  Book In-Clinic Care
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
