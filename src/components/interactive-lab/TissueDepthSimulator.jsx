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
  Eye, 
  Crosshair, 
  Activity, 
  User, 
  Zap, 
  ShieldCheck, 
  Check,
  ChevronRight
} from 'lucide-react';

// ============================================================================
// CLINICAL ACUPOINTS CATALOG WITH DEEP NEUROLOGICAL & ANATOMICAL METRICS
// ============================================================================
export const CLINICAL_ACUPOINTS = [
  {
    id: 'gb20',
    code: 'GB-20',
    fullName: 'GB-20 (Fengchi)',
    hanzi: '风池',
    translation: 'Wind Pool',
    region: 'Occipital Skull Base',
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
    region: 'Vertex / Crown of Cranium',
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
    region: 'Upper Cervical Spine',
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
    region: 'First Dorsal Interosseous (Hand)',
    meridian: 'Large Intestine Meridian',
    depthTarget: 12.0,
    depthCun: '0.5–1.0 cun',
    bodyPosition: [-0.34, 0.04, 0.04],
    nerves: 'Superficial Radial Nerve',
    vessels: 'First Dorsal Metacarpal Artery',
    relief: 'Frontal Migraines, TMJ Jaw Clenching, Toothache, Systemic Analgesia',
    deqi: 'Pronounced heavy warm ache spreading through palm into forearm.',
    colorHex: 0x10b981
  },
  {
    id: 'pc6',
    code: 'PC-6',
    fullName: 'PC-6 (Neiguan)',
    hanzi: '内关',
    translation: 'Inner Pass',
    region: 'Ventral Forearm',
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
    region: 'Anterolateral Lower Leg',
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
    region: 'Lower Lumbar Spine (L2)',
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
    region: 'Occipital Depression',
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
    region: 'Behind Earlobe',
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
    region: 'Forehead Above Eyebrow',
    meridian: 'Gallbladder Meridian',
    depthTarget: 8.0,
    depthCun: '0.3–0.5 cun',
    bodyPosition: [-0.04, 0.73, 0.072],
    nerves: 'Supraorbital Nerve Branch',
    vessels: 'Frontal Arteriole Plexus',
    relief: 'Frontal Sinus Pressure, Forehead Tension, Orbital Fatigue',
    deqi: 'Light clearing vibration releasing ocular strain.',
    colorHex: 0x10b981
  },
  {
    id: 'sp6',
    code: 'SP-6',
    fullName: 'SP-6 (Sanyinjiao)',
    hanzi: '三阴交',
    translation: 'Three Yin Intersection',
    region: 'Medial Lower Leg',
    meridian: 'Spleen Meridian',
    depthTarget: 14.0,
    depthCun: '1.0–1.5 cun',
    bodyPosition: [-0.04, -0.52, 0.02],
    nerves: 'Tibial Nerve & Saphenous Nerve',
    vessels: 'Posterior Tibial Artery',
    relief: 'Pelvic Circulation, Insomnia, Leg Cramping, Hormonal Balance',
    deqi: 'Steady rhythmic warmth coursing up the inner calf.',
    colorHex: 0xec4899
  },
  {
    id: 'cv12',
    code: 'CV-12',
    fullName: 'CV-12 (Zhongwan)',
    hanzi: '中脘',
    translation: 'Middle Cavity',
    region: 'Epigastrium Midline',
    meridian: 'Conception Vessel (Ren Mai)',
    depthTarget: 12.0,
    depthCun: '0.8–1.2 cun',
    bodyPosition: [0.0, 0.18, 0.076],
    nerves: '7th Intercostal Nerve Anterior Ramus',
    vessels: 'Superior Epigastric Artery',
    relief: 'Gastric Motility, Acid Reflux, Digestive Bloating, Epigastric Calm',
    deqi: 'Soothing circular warmth relaxing the celiac solar plexus.',
    colorHex: 0xfacc15
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

// Curve for Authentic Spiral Copper Needle Handle
class SpiralHandleCurve extends THREE.Curve {
  constructor(radius = 0.016, height = 0.22, turns = 18) {
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

// Procedural High-Definition Living Human Skin Texture
function createSkinTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#f2cebe');
  grad.addColorStop(0.4, '#e5bba8');
  grad.addColorStop(0.8, '#dca894');
  grad.addColorStop(1.0, '#cf957f');
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

  ctx.fillStyle = 'rgba(140, 70, 50, 0.06)';
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 1.2 + 0.4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1.5, 1.5);
  return tex;
}

// Procedural Adipose Fat Texture with Cellular Micro-Lobules & Collagen Septa
function createAdiposeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#f59e0b');
  grad.addColorStop(0.5, '#d97706');
  grad.addColorStop(1.0, '#b45309');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Micro-lobular clusters
  for (let i = 0; i < 350; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 10 + 5;
    const cellGrad = ctx.createRadialGradient(x - r * 0.25, y - r * 0.25, 1, x, y, r);
    cellGrad.addColorStop(0, '#fef08a');
    cellGrad.addColorStop(0.7, '#f59e0b');
    cellGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = cellGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Interlobular fibrous collagen septa
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.0;
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

// Procedural Striated Muscle Fascicle Texture
function createMuscleStriationTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#580c1f');
  grad.addColorStop(0.5, '#7f1d1d');
  grad.addColorStop(1, '#450a0a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  for (let y = 0; y < 512; y += 4) {
    const alpha = Math.sin(y * 0.8) * 0.16 + 0.16;
    ctx.fillStyle = `rgba(254, 202, 202, ${alpha})`;
    ctx.fillRect(0, y, 512, 2);
  }

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  for (let i = 0; i < 80; i++) {
    const y = Math.random() * 512;
    ctx.fillRect(0, y, 512, 1);
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

export default function TissueDepthSimulator({ onOpenBooking }) {
  const mountRef = useRef(null);
  const [selectedAcupointIdx, setSelectedAcupointIdx] = useState(0);
  const [selectedProblemIdx, setSelectedProblemIdx] = useState(0);
  const [activeTool, setActiveTool] = useState('needle'); // 'needle', 'cup', 'moxa'
  const [interactiveDepth, setInteractiveDepth] = useState(0);
  const [isDisintegrated, setIsDisintegrated] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeCameraView, setActiveCameraView] = useState('dual');

  const activeAcupoint = CLINICAL_ACUPOINTS[selectedAcupointIdx] || CLINICAL_ACUPOINTS[0];
  const currentProb = CLINICAL_PROBLEMS[selectedProblemIdx];

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
  const nerveMatRef = useRef(null);
  const dotHalosRef = useRef([]);

  // 3D Tools
  const activeNeedleRef = useRef(null);
  const activeCupRef = useRef(null);
  const activeMoxaRef = useRef(null);
  const guideTubeRef = useRef(null);

  // 3D Thanos Particles
  const particlesRef = useRef(null);

  // Target coordinates for Strata Block (Right side)
  const targetX = 1.15;
  const targetZ = 0.20;

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
        // Needle tip at surface y=0.41, reaches knot y=-0.22 at val=12
        activeNeedleRef.current.position.y = 0.85 - fraction * 0.63;
      }
      if (guideTubeRef.current) {
        guideTubeRef.current.position.y = 0.52;
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
        activeCupRef.current.position.y = 0.52 + suctionFraction * 0.04;
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
        activeMoxaRef.current.position.y = 0.65;
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
      const originY = activeTool === 'needle' ? -0.10 : activeTool === 'cup' ? 0.25 : 0.45;

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

  // Select tool
  const handleSelectTool = useCallback((toolId) => {
    setActiveTool(toolId);
    const probIdx = toolId === 'needle' ? 0 : toolId === 'cup' ? 1 : 2;
    setSelectedProblemIdx(probIdx);
    handleReset();
    playAcuSound('pickup', isMuted);
  }, [handleReset, isMuted]);

  // Select Acupoint from Catalog
  const handleSelectAcupoint = useCallback((idx) => {
    setSelectedAcupointIdx(idx);
    handleReset();
    playAcuSound('pickup', isMuted);

    // Update active highlight on 3D dots
    if (dotHalosRef.current) {
      dotHalosRef.current.forEach((halo, i) => {
        if (halo) halo.visible = (i === idx);
      });
    }
  }, [handleReset, isMuted]);

  // Animate Needle Drop Down to Target (Instant & smooth drop)
  const dropNeedleToTarget = useCallback(() => {
    if (isSnapping || isDisintegrated) return;
    const target = currentProb.depthTarget;
    handleInteractiveChange(target);
  }, [currentProb.depthTarget, isSnapping, isDisintegrated, handleInteractiveChange]);

  // Smooth Camera Tween to any Perspective Angle
  const switchCameraView = useCallback((viewKey) => {
    setActiveCameraView(viewKey);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    let targetCamPos;
    let targetLookAt;

    switch (viewKey) {
      case 'body':
        // Zoom in to Big Standing Human Body
        targetCamPos = new THREE.Vector3(-0.75, 0.45, 2.1);
        targetLookAt = new THREE.Vector3(-0.75, 0.40, 0.0);
        break;
      case 'strata':
        // Zoom in to Compact Tissue Strata Block
        targetCamPos = new THREE.Vector3(1.15, 0.50, 1.6);
        targetLookAt = new THREE.Vector3(1.15, 0.15, 0.0);
        break;
      case 'nerves':
        // Extreme Close-up of Nerves & Motor Endplate Knot
        targetCamPos = new THREE.Vector3(1.15, 0.08, 0.95);
        targetLookAt = new THREE.Vector3(1.15, -0.05, 0.20);
        break;
      case 'dual':
      default:
        // Dual Suite (Big Body on Left + Compact Strata on Right)
        targetCamPos = new THREE.Vector3(-0.10, 0.40, 3.2);
        targetLookAt = new THREE.Vector3(-0.15, 0.25, 0.0);
        break;
    }

    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    let progress = 0;

    const animateCamera = () => {
      progress += 0.06;
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

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 580;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080b11);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(-0.10, 0.40, 3.2);
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
    controls.maxDistance = 7.5;
    controls.minDistance = 1.1;
    controls.target.set(-0.15, 0.25, 0.0);
    controlsRef.current = controls;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xffffff, 3.2, 25, Math.PI / 4, 0.35, 1);
    keySpot.position.set(1.5, 6.0, 4.0);
    keySpot.castShadow = true;
    scene.add(keySpot);

    const softFill = new THREE.DirectionalLight(0xfed7aa, 1.2);
    softFill.position.set(-3.5, 3.0, 2.5);
    scene.add(softFill);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
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
    // 5. 3D WHOLE HUMAN BODY MODEL (Hero Position: Left/Center, Large Scale)
    // =========================================================================
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(-0.85, -0.22, 0.0);
    scene.add(bodyGroup);

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
      new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
    );
    ringLed.rotation.x = -Math.PI / 2;
    ringLed.position.y = -0.665;
    bodyGroup.add(ringLed);

    // Load Whole Human Body GLB Model
    const gltfLoader = new GLTFLoader();
    const modelUrl = `${import.meta.env.BASE_URL}models/human_body.glb`;
    const targetHeight = 2.45; // Big human model!
    const scaleFactor = targetHeight / 1.72; // Scaling multiplier for acupoints

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
        model.rotation.y = Math.PI / 2; // Face forward (+Z toward camera)

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
    const meridianMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.65 });
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
    // 3D ANATOMICAL DOTS (Small, Crisp Pinpoint Dots - NOT Large Spheres!)
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

      // 1. Crisp Pinpoint Dot (0.007 radius - sharp and small)
      const dotMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.007, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      pinGroup.add(dotMesh);

      // 2. Subtle Luminous Halo Ring flush against skin
      const haloMesh = new THREE.Mesh(
        new THREE.RingGeometry(0.009, 0.014, 16),
        new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide
        })
      );
      haloMesh.lookAt(new THREE.Vector3(pt.bodyPosition[0] * 3, pt.bodyPosition[1] * 3, pt.bodyPosition[2] * 3));
      pinGroup.add(haloMesh);

      // 3. Active Selection Ring
      const selRing = new THREE.Mesh(
        new THREE.RingGeometry(0.015, 0.021, 16),
        new THREE.MeshBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.95,
          side: THREE.DoubleSide
        })
      );
      selRing.lookAt(new THREE.Vector3(pt.bodyPosition[0] * 3, pt.bodyPosition[1] * 3, pt.bodyPosition[2] * 3));
      selRing.visible = (idx === selectedAcupointIdx);
      pinGroup.add(selRing);
      dotHalos.push(selRing);

      // Clickable Raycasting Hitbox
      const hitBox = new THREE.Mesh(
        new THREE.SphereGeometry(0.022, 8, 8),
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
    // 6. COMPACT REALISTIC 3D TISSUE STRATA BLOCK (Right Side at x: +1.15)
    // =========================================================================
    const strataGroup = new THREE.Group();
    strataGroup.position.set(1.15, 0.12, 0.0);
    scene.add(strataGroup);

    const blockWidth = 1.25;
    const blockDepth = 0.90;

    const skinTex = createSkinTexture();
    const fatTex = createAdiposeTexture();
    const muscleTex = createMuscleStriationTexture();

    // --- LAYER 1: Epidermis & Dermis (Skin Layer) ---
    const dermisMat = new THREE.MeshStandardMaterial({ map: skinTex, roughness: 0.42, metalness: 0.04 });
    const dermisMesh = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, 0.18, blockDepth), dermisMat);
    dermisMesh.position.y = 0.32;
    dermisMesh.castShadow = true;
    dermisMesh.receiveShadow = true;
    strataGroup.add(dermisMesh);

    // Dynamic Skin Plane for Realistic Elastic Dimpling
    const topSkinGeo = new THREE.PlaneGeometry(blockWidth, blockDepth, 32, 32);
    topSkinGeo.rotateX(-Math.PI / 2);
    const topSkinMat = new THREE.MeshStandardMaterial({ map: skinTex, roughness: 0.38, metalness: 0.04, side: THREE.DoubleSide });
    const topSkin = new THREE.Mesh(topSkinGeo, topSkinMat);
    topSkin.position.y = 0.411;
    topSkin.receiveShadow = true;
    strataGroup.add(topSkin);
    skinMeshRef.current = topSkin;
    originalSkinPositionsRef.current = new Float32Array(topSkinGeo.attributes.position.array);

    // Target Acupoint Marker Ring on Strata Skin
    const beacon = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.07, 32),
      new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
    );
    beacon.rotation.x = -Math.PI / 2;
    beacon.position.set(0, 0.413, 0.20);
    strataGroup.add(beacon);

    // Thermal Bloom Ring (When Moxa is active)
    const thermalRing = new THREE.Mesh(
      new THREE.RingGeometry(0.02, 0.28, 32),
      new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.0, side: THREE.DoubleSide })
    );
    thermalRing.rotation.x = -Math.PI / 2;
    thermalRing.position.set(0, 0.414, 0.20);
    strataGroup.add(thermalRing);
    thermalRingRef.current = thermalRing;

    // --- LAYER 2: Subcutaneous Adipose (Continuous Realistic Cellular Fat Block) ---
    const fatBaseMat = new THREE.MeshStandardMaterial({
      map: fatTex,
      roughness: 0.30,
      metalness: 0.05,
      color: 0xf59e0b
    });
    const fatBase = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, 0.24, blockDepth), fatBaseMat);
    fatBase.position.y = 0.11;
    strataGroup.add(fatBase);

    // Front edge delicate micro-lobules
    const lobuleGeo = new THREE.SphereGeometry(0.024, 10, 10);
    const lobuleMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.22,
      metalness: 0.08,
      emissive: 0x78350f,
      emissiveIntensity: 0.15
    });
    for (let x = -0.55; x <= 0.55; x += 0.08) {
      for (let y = 0.02; y <= 0.20; y += 0.07) {
        const lobule = new THREE.Mesh(lobuleGeo, lobuleMat);
        lobule.position.set(x + (Math.random() - 0.5) * 0.03, y, 0.46);
        strataGroup.add(lobule);
      }
    }

    // --- LAYER 3: Deep Fascia Sheath (Glistening Silvery Aponeurosis) ---
    const fasciaSheath = new THREE.Mesh(
      new THREE.BoxGeometry(blockWidth, 0.014, blockDepth),
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.20,
        metalness: 0.15,
        transparent: true,
        opacity: 0.90
      })
    );
    fasciaSheath.position.y = -0.01;
    strataGroup.add(fasciaSheath);

    // --- LAYER 4: Striated Skeletal Muscle Layer ---
    const muscleBase = new THREE.Mesh(
      new THREE.BoxGeometry(blockWidth, 0.38, blockDepth),
      new THREE.MeshStandardMaterial({ map: muscleTex, roughness: 0.42 })
    );
    muscleBase.position.y = -0.21;
    strataGroup.add(muscleBase);

    // Muscle Fascicle Cylinders running horizontally
    const fascicleMat = new THREE.MeshStandardMaterial({ map: muscleTex, roughness: 0.30, metalness: 0.12 });
    for (let y = -0.36; y <= -0.04; y += 0.045) {
      const fascicle = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, blockWidth, 12), fascicleMat);
      fascicle.rotation.z = Math.PI / 2;
      fascicle.position.set(0, y, 0.46);
      strataGroup.add(fascicle);
    }

    // --- LAYER 5: 3D BRANCHING NERVES & BLOOD VESSELS ---
    const neuroVascularGroup = new THREE.Group();
    strataGroup.add(neuroVascularGroup);

    // Main Nerve Trunk (Glowing Golden Yellow)
    const nerveCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.25, 0.22, 0.46),
      new THREE.Vector3(0.12, 0.08, 0.45),
      new THREE.Vector3(0.04, -0.04, 0.44),
      new THREE.Vector3(0.0, -0.22, 0.20) // Terminating at the deep knot
    ]);
    const nerveMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xeab308,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.1
    });
    const nerveMesh = new THREE.Mesh(new THREE.TubeGeometry(nerveCurve, 30, 0.009, 8, false), nerveMat);
    neuroVascularGroup.add(nerveMesh);
    nerveMatRef.current = nerveMat;

    // Secondary Terminal Axon Branches
    const branchCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.04, -0.04, 0.44),
      new THREE.Vector3(-0.16, -0.14, 0.45),
      new THREE.Vector3(-0.32, -0.26, 0.44)
    ]);
    const branch1 = new THREE.Mesh(new THREE.TubeGeometry(branchCurve1, 16, 0.005, 6, false), nerveMat);
    neuroVascularGroup.add(branch1);

    // Arterial Blood Vessel (Crimson)
    const arteryCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.30, 0.22, 0.45),
      new THREE.Vector3(0.18, 0.06, 0.44),
      new THREE.Vector3(0.08, -0.08, 0.45),
      new THREE.Vector3(0.04, -0.22, 0.20)
    ]);
    const arteryMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0x991b1b, emissiveIntensity: 0.7, roughness: 0.3 });
    const arteryMesh = new THREE.Mesh(new THREE.TubeGeometry(arteryCurve, 30, 0.010, 8, false), arteryMat);
    neuroVascularGroup.add(arteryMesh);

    // Accompanying Venule (Deep Blue)
    const veinCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.32, 0.22, 0.44),
      new THREE.Vector3(0.20, 0.07, 0.43),
      new THREE.Vector3(0.10, -0.07, 0.43)
    ]);
    const veinMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.35 });
    const veinMesh = new THREE.Mesh(new THREE.TubeGeometry(veinCurve, 20, 0.008, 8, false), veinMat);
    neuroVascularGroup.add(veinMesh);

    // 8. 3D Pathology: Hyper-Contracted Spastic Trigger Knot
    const knot3DGroup = new THREE.Group();
    knot3DGroup.position.set(0.0, -0.22, 0.20);
    strataGroup.add(knot3DGroup);
    knotMeshRef.current = knot3DGroup;

    const knotCore = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.08, 0.026, 48, 14, 2, 3),
      new THREE.MeshStandardMaterial({ color: 0xff1e46, emissive: 0x9f1239, emissiveIntensity: 1.8, roughness: 0.25 })
    );
    knot3DGroup.add(knotCore);

    // Fascial Adhesion (Problem 2)
    const adhesion3DGroup = new THREE.Group();
    adhesion3DGroup.position.set(0.0, 0.02, 0.20);
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
    stasis3DGroup.position.set(0.0, 0.32, 0.20);
    stasis3DGroup.visible = false;
    strataGroup.add(stasis3DGroup);
    stasisMeshRef.current = stasis3DGroup;

    const stasisCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.04, 24),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, transparent: true, opacity: 0.75 })
    );
    stasis3DGroup.add(stasisCore);

    // =========================================================================
    // 9. 3D SURGICAL TOOLS (Needle, Glass Cup, Moxa Roll)
    // =========================================================================
    // A. 0.18mm Guide-Tube Needle
    const needleAssembly = new THREE.Group();
    needleAssembly.position.set(0.0, 0.85, 0.20);
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
    guideTube.position.set(0.0, 0.52, 0.20);
    strataGroup.add(guideTube);
    guideTubeRef.current = guideTube;

    // B. Glass Fire Cup
    const cupGroup = new THREE.Group();
    cupGroup.position.set(0.0, 0.52, 0.20);
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
    moxaGroup.position.set(0.0, 0.65, 0.20);
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

    // 10. 5,000 3D Thanos Particles
    const pCount = 5000;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    const pVelocities = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3] = targetX;
      pPositions[i * 3 + 1] = -0.10;
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

      // Slow gentle rotation of diagnostic pedestal
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
          vel[i * 3 + 1] += 0.0004; // Gentle upward ash drift
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

  return (
    <div 
      data-testid="tissue-depth-simulator"
      className={`relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 transition-all select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[620px]'
      }`}
    >
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* ===================================================================== */}
      {/* HUD OVERLAY INTERFACE (EVEN MULTIPLES OF 4 SPACING THROUGHOUT)       */}
      {/* ===================================================================== */}

      {/* Top Header Bar (p-4 gap-4, z-40 so fullscreen/audio controls are always accessible) */}
      <div className="absolute top-4 inset-x-4 z-40 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-2 px-4 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-xs font-bold text-white shadow-xl pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="tracking-wide">ARURA 3D CLINICAL ANATOMY SUITE</span>
          </div>

          {/* Perspective View Modes (gap-2) */}
          <div className="hidden md:flex items-center gap-2 p-1 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-2xl pointer-events-auto shadow-xl">
            <button
              type="button"
              onClick={() => switchCameraView('dual')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeCameraView === 'dual'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Dual Suite</span>
            </button>
            <button
              type="button"
              onClick={() => switchCameraView('body')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeCameraView === 'body'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Whole Body Focus</span>
            </button>
            <button
              type="button"
              onClick={() => switchCameraView('strata')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeCameraView === 'strata'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Strata & Nerves</span>
            </button>
          </div>
        </div>

        {/* Top Right Actions (gap-2) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-neutral-300 hover:text-white transition shadow-xl"
            title={isMuted ? 'Unmute' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2 p-2.5 px-4 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white transition shadow-xl"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Exit' : 'Full Screen'}</span>
          </button>
        </div>
      </div>

      {/* Left Panel: Acupoint & Pathology Selector (top-16 left-4 space-y-4 w-64) */}
      <div className="absolute top-16 left-4 z-20 flex flex-col space-y-4 pointer-events-auto w-64">
        {/* Acupoint Pins Grid (p-4 space-y-2) */}
        <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl shadow-xl space-y-2">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <User className="w-3 h-3 text-emerald-400" />
              <span>3D Body Acupoints</span>
            </span>
            <span className="text-[9px] text-emerald-400 font-mono">
              Click Dot
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
            {CLINICAL_ACUPOINTS.map((pt, idx) => {
              const isSelected = selectedAcupointIdx === idx;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => handleSelectAcupoint(idx)}
                  className={`p-2 rounded-xl text-left border transition ${
                    isSelected
                      ? 'bg-emerald-500 text-neutral-950 border-emerald-400 font-black shadow-md'
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

        {/* Pathology Selector (p-4 space-y-2) */}
        <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl shadow-xl space-y-2">
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
                  }}
                  className={`flex items-center justify-between p-2 rounded-xl text-left border transition ${
                    isSelected
                      ? 'bg-emerald-500 text-neutral-950 border-emerald-400 font-black shadow-md'
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

      {/* Bottom Card: Essential Clinical Anatomy Intelligence (p-4 gap-4 max-w-xl) */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto max-w-xl hidden sm:block">
        <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl shadow-2xl space-y-2">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeAcupoint.colorHex || '#10b981' }} />
              <h4 className="text-xs font-black text-white">
                {activeAcupoint.fullName} • {activeAcupoint.translation} ({activeAcupoint.hanzi})
              </h4>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
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
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate"><strong>Clinical Relief:</strong> {activeAcupoint.relief}</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Penetration Control & Tool Selection (top-16 right-4 space-y-4 w-72) */}
      <div className="absolute top-16 right-4 z-20 flex flex-col space-y-4 pointer-events-auto w-72">
        {/* Needle Penetration Card (p-4 space-y-4) */}
        <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>Needle Penetration</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {interactiveDepth.toFixed(1)} mm
            </span>
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
              onChange={(e) => handleInteractiveChange(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg bg-neutral-800 accent-emerald-400 cursor-pointer disabled:opacity-50"
            />
            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <span>Surface (0mm)</span>
              <span className="text-amber-400 font-bold">Knot Target: {currentProb.depthTarget} {currentProb.depthUnit}</span>
            </div>
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

          {/* Depth Presets (gap-2) */}
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => handleInteractiveChange(0)}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-center border border-neutral-800 transition"
            >
              Surface (0mm)
            </button>
            <button
              type="button"
              onClick={() => handleInteractiveChange(4.5)}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-center border border-neutral-800 transition"
            >
              Adipose (4.5mm)
            </button>
            <button
              type="button"
              onClick={() => handleInteractiveChange(12.0)}
              className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-center border border-emerald-500/40 font-bold transition"
            >
              Knot (12mm)
            </button>
          </div>

          {/* Clinical Treatment Tools (gap-2) */}
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
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-md'
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
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-md'
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
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-md'
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
          <div className="max-w-md w-full bg-neutral-950/95 border border-emerald-500/40 p-6 rounded-2xl shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-400">
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
                <div className="font-bold text-emerald-400">0% Dissolved</div>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div>
                <div className="text-neutral-400 text-[10px] uppercase font-mono">Nerve De-Qi Pulse</div>
                <div className="font-bold text-emerald-400">+380% Active</div>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div>
                <div className="text-neutral-400 text-[10px] uppercase font-mono">Endorphins</div>
                <div className="font-bold text-emerald-400">Vagal Harmonic</div>
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
                  className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-black transition shadow-lg shadow-emerald-500/20"
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
