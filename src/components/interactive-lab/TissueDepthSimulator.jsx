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
    code: 'GB-20 (Fengchi)',
    hanzi: '风池',
    translation: 'Wind Pool',
    region: 'Occipital Skull Base',
    meridian: 'Gallbladder Meridian (Foot Shaoyang)',
    depthTarget: 12.0,
    depthCun: '0.8–1.2 cun',
    bodyPosition: [-0.06, 0.68, -0.07],
    nerves: 'Greater Occipital Nerve (C2) & Suboccipital Nerve Plexus',
    nerveDetails: 'Neuromodulates the trigeminocervical complex; suppresses hyper-excited migraine nociception in the brainstem.',
    vessels: 'Occipital Artery & Suboccipital Venous Plexus',
    vesselDetails: 'Relieves vascular spasm and surges cerebral micro-perfusion by +380%.',
    structures: 'Skin -> Subdermal Fat -> Trapezius Aponeurosis -> Splenius Capitis -> Semispinalis Capitis -> Suboccipital Knot',
    relief: 'Chronic Migraines, Severe Cervical Stiffness, Occipital Neuralgia, Vagal Tone Activation, Eye Strain',
    deqi: 'Deep spreading distention traveling upward over parietal scalp and radiating toward retro-orbital space.',
    colorHex: 0xff1e46
  },
  {
    id: 'gv20',
    code: 'GV-20 (Baihui)',
    hanzi: '百会',
    translation: 'Hundred Convergences',
    region: 'Vertex / Crown of Cranium',
    meridian: 'Governing Vessel (Du Mai)',
    depthTarget: 6.0,
    depthCun: '0.3–0.5 cun (Subgaleal glide)',
    bodyPosition: [0.0, 0.83, 0.0],
    nerves: 'Supraorbital Nerve & Greater Occipital Nerve Anastomosis (Galea Aponeurotica)',
    nerveDetails: 'Stimulates cranial aponeurotic mechanoreceptors, triggering central parasympathetic reset and serotonin release.',
    vessels: 'Superficial Temporal Artery & Occipital Artery Network',
    vesselDetails: 'Equalizes intracranial micro-vascular tension and relieves cranial fullness.',
    structures: 'Epidermis -> Galea Aponeurotica -> Subaponeurotic Loose Connective Layer -> Epicranial Periosteum',
    relief: 'Autonomic Burnout, Severe Insomnia, Brain Fog, Anxiety Reset, Tension Headaches, Vertigo',
    deqi: 'Gentle buoyant pulsation, waves of calming coolness descending from crown through spine.',
    colorHex: 0x38bdf8
  },
  {
    id: 'bl10',
    code: 'BL-10 (Tianzhu)',
    hanzi: '天柱',
    translation: 'Celestial Pillar',
    region: 'Upper Posterior Cervical Spine',
    meridian: 'Bladder Meridian (Foot Taiyang)',
    depthTarget: 10.0,
    depthCun: '0.5–0.8 cun',
    bodyPosition: [-0.035, 0.63, -0.075],
    nerves: 'Lesser Occipital Nerve (C2–C3) & Dorsal Cervical Rami',
    nerveDetails: 'Releases chronic motor spasm in the lateral trapezius border, relieving referred frontal-orbital tension.',
    vessels: 'Deep Cervical Artery & Vertebral Venous Branches',
    vesselDetails: 'Restores oxygenated blood flow to the cervical-spinal junction.',
    structures: 'Skin -> Subdermal Fat -> Trapezius Lateral Tendon -> Splenius Capitis Myofibrils',
    relief: 'Whiplash Syndrome, Forward-Head Posture Strain, Mental Exhaustion, Stiff Neck, Blurred Vision',
    deqi: 'Warm electric tingling radiating down paraspinal muscles into mid-back.',
    colorHex: 0xf59e0b
  },
  {
    id: 'li4',
    code: 'LI-4 (Hegu)',
    hanzi: '合谷',
    translation: 'Joining Valley',
    region: 'First Dorsal Interosseous (Hand)',
    meridian: 'Large Intestine Meridian (Hand Yangming)',
    depthTarget: 12.0,
    depthCun: '0.5–1.0 cun',
    bodyPosition: [-0.34, 0.04, 0.04],
    nerves: 'Superficial Radial Nerve & First Dorsal Interosseous Motor Branch',
    nerveDetails: 'The primary systemic analgesic point in medicine; triggers massive central endorphin and encephalin cascades.',
    vessels: 'Dorsal Venous Rete & First Dorsal Metacarpal Artery',
    vesselDetails: 'Modulates systemic peripheral micro-vascular resistance.',
    structures: 'Dorsal Skin -> Loose Subdermal Fascia -> First Dorsal Interosseous Muscle Belly -> Adductor Pollicis',
    relief: 'Frontal Migraines, Facial Pain, Jaw Clenching (TMJ), Toothache, General Systemic Pain Relief',
    deqi: 'Pronounced heavy warm ache spreading through the palm and traveling up forearm.',
    colorHex: 0x10b981
  },
  {
    id: 'pc6',
    code: 'PC-6 (Neiguan)',
    hanzi: '内关',
    translation: 'Inner Pass',
    region: 'Ventral Forearm (2 cun above wrist)',
    meridian: 'Pericardium Meridian (Hand Jueyin)',
    depthTarget: 10.0,
    depthCun: '0.5–0.8 cun',
    bodyPosition: [-0.28, 0.14, 0.04],
    nerves: 'Median Nerve Trunk & Palmar Cutaneous Branch',
    nerveDetails: 'Direct neuro-vagal modulation; stabilizes cardiac vagal tone, lowering resting heart rate and sympathetic arousal.',
    vessels: 'Median Antebrachial Vein & Radial Artery Branches',
    vesselDetails: 'Improves coronary micro-perfusion and diaphragmatic blood flow.',
    structures: 'Ventral Skin -> Subcutaneous Fascia -> Flexor Carpi Radialis -> Flexor Digitorum Superficialis -> Median Nerve Sheath',
    relief: 'Nausea, Palpitations, Panic & Anxiety, Chest Tightness, Motion Sickness, Sleep Disruption',
    deqi: 'Subtle electric sensation gliding smoothly along the midline of inner forearm to chest.',
    colorHex: 0xc084fc
  },
  {
    id: 'st36',
    code: 'ST-36 (Zusanli)',
    hanzi: '足三里',
    translation: 'Leg Three Miles',
    region: 'Anterolateral Lower Leg (Below Knee)',
    meridian: 'Stomach Meridian (Foot Yangming)',
    depthTarget: 15.0,
    depthCun: '1.0–1.5 cun',
    bodyPosition: [-0.08, -0.32, 0.06],
    nerves: 'Deep Peroneal (Fibular) Nerve & Lateral Sural Cutaneous Nerve',
    nerveDetails: 'Clinically proven to upregulate vagus nerve anti-inflammatory axis (splenic nerve reflex) and macrophage suppression.',
    vessels: 'Anterior Tibial Artery & Recurrent Tibial Vessels',
    vesselDetails: 'Surges systemic circulation and physical stamina.',
    structures: 'Skin -> Subcutaneous Adipose -> Tibialis Anterior Muscle Belly -> Interosseous Membrane',
    relief: 'Immune System Depletion, Chronic Fatigue, Gastric Acid Reflux, Leg Weakness, Systemic Inflammation',
    deqi: 'Rich traveling warmth and rhythmic muscular pulsing extending downward into foot dorsum.',
    colorHex: 0xec4899
  },
  {
    id: 'bl23',
    code: 'BL-23 (Shenshu)',
    hanzi: '肾俞',
    translation: 'Kidney Shu',
    region: 'Lower Lumbar Spine (L2 Paraspinal)',
    meridian: 'Bladder Meridian (Foot Taiyang)',
    depthTarget: 14.0,
    depthCun: '0.8–1.2 cun',
    bodyPosition: [-0.05, 0.14, -0.07],
    nerves: 'Lumbar Spinal Nerve Dorsal Ramus (L2-L3) & Iliohypogastric Nerve',
    nerveDetails: 'Directly neuromodulates lumbar facet joint nociceptors and deep erector spinae hypertonicity.',
    vessels: 'Lumbar Arteries & Paraspinal Venous Plexus',
    vesselDetails: 'Clears venous pooling in lower back and pelvic fascia.',
    structures: 'Lumbar Cutis -> Thoracolumbar Fascia -> Longissimus Thoracis -> Quadratus Lumborum Border',
    relief: 'Chronic Lower Back Pain, Sciatica, Adrenal Fatigue, Core Instability, Lumbar Disc Compression',
    deqi: 'Deep, profoundly comforting heat diffusing through the entire sacrum and lumbar spine.',
    colorHex: 0x8b5cf6
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
    actionHint: 'Click "Drop Needle" or drag slider to plunge needle through strata into 12mm knot',
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
    actionHint: 'Drag slider to create vacuum suction and lift restricted fascia',
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
    actionHint: 'Drag slider to radiate 43°C thermal infrared warmth',
    skinPhysicsText: 'Expanding thermal heat ring radiates across skin, dilating micro-capillaries',
    colorHex: 0x38bdf8,
    reliefTitle: 'Cold Stagnation Vaporized',
    reliefText: 'Infrared heat clears cold constriction. Soothing therapeutic warmth active.'
  }
];

// Curve for Authentic Spiral Copper Needle Handle
class SpiralHandleCurve extends THREE.Curve {
  constructor(radius = 0.026, height = 0.34, turns = 24) {
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
  grad.addColorStop(0, '#f5cbb6');
  grad.addColorStop(0.35, '#ebb59f');
  grad.addColorStop(0.75, '#e0a088');
  grad.addColorStop(1.0, '#d28a70');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 14;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.9));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.8));
  }
  ctx.putImageData(imgData, 0, 0);

  ctx.fillStyle = 'rgba(140, 70, 50, 0.08)';
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 1.5 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const blush = ctx.createRadialGradient(256, 300, 10, 256, 300, 140);
  blush.addColorStop(0, 'rgba(239, 68, 68, 0.22)');
  blush.addColorStop(0.5, 'rgba(239, 68, 68, 0.08)');
  blush.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = blush;
  ctx.fillRect(0, 0, 512, 512);

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

  ctx.fillStyle = 'rgba(255, 255, 255, 0.09)';
  for (let i = 0; i < 90; i++) {
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

      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.8, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * (i / buffer.length));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.8);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

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

  // 3D Tools
  const activeNeedleRef = useRef(null);
  const activeCupRef = useRef(null);
  const activeMoxaRef = useRef(null);
  const guideTubeRef = useRef(null);

  // 3D Thanos Particles
  const particlesRef = useRef(null);

  // Target coordinates for Strata Block (Right side)
  const targetX = 1.35;
  const targetZ = 0.45;

  // Apply Needle Depth & Skin Physics
  const applySkinPhysicsAndToolHeight = useCallback((val) => {
    const skinMesh = skinMeshRef.current;
    const origPos = originalSkinPositionsRef.current;
    if (!skinMesh || !origPos) return;

    const posAttr = skinMesh.geometry.attributes.position;
    const posArr = posAttr.array;

    if (activeTool === 'needle') {
      const fraction = Math.min(1.0, val / 15.0);
      if (activeNeedleRef.current) {
        activeNeedleRef.current.position.y = 1.05 - fraction * 1.0;
      }
      if (guideTubeRef.current) {
        guideTubeRef.current.position.y = 0.77;
      }

      // Skin Elastic Dimpling on contact
      const dimpleAmount = val < 2.5 ? (val / 2.5) * 0.08 : Math.max(0, 0.08 - (val - 2.5) * 0.03);

      for (let i = 0; i < posArr.length; i += 3) {
        const vx = origPos[i];
        const vz = origPos[i + 2];
        const dist = Math.hypot(vx - 0, vz - 0.45);

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
        const dist = Math.hypot(vx - 0, vz - 0.45);

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

    // Light up 3D Nerve Fibers with Bio-Electric De-Qi Pulse
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
      const originY = activeTool === 'needle' ? -0.42 : activeTool === 'cup' ? 0.05 : 0.68;

      for (let i = 0; i < 5000; i++) {
        posArr[i * 3] = targetX + (Math.random() - 0.5) * 0.45;
        posArr[i * 3 + 1] = originY + (Math.random() - 0.5) * 0.35;
        posArr[i * 3 + 2] = targetZ + (Math.random() - 0.5) * 0.4;
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

    if (viewKey === 'body') {
      // Focus on Whole Human Body Model
      targetCamPos = new THREE.Vector3(-1.75, 0.2, 2.4);
      targetLookAt = new THREE.Vector3(-1.75, 0.1, 0.0);
    } else if (viewKey === 'strata') {
      // Focus on Neuro-Tissue Depth Strata Block
      targetCamPos = new THREE.Vector3(1.35, 0.25, 2.7);
      targetLookAt = new THREE.Vector3(1.35, 0.0, 0.45);
    } else if (viewKey === 'nerves') {
      // Close-up on 3D Nerve Network and Spastic Knot
      targetCamPos = new THREE.Vector3(1.9, -0.2, 1.8);
      targetLookAt = new THREE.Vector3(1.35, -0.38, 0.45);
    } else {
      // Dual Medical Suite (Frames both Full Body and Strata Block side by side!)
      targetCamPos = new THREE.Vector3(-0.15, 1.15, 4.8);
      targetLookAt = new THREE.Vector3(-0.15, 0.05, 0.2);
    }

    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const duration = 600;
    const startTime = performance.now();

    const animateCam = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(startPos, targetCamPos, ease);
      controls.target.lerpVectors(startTarget, targetLookAt, ease);
      controls.update();

      if (progress < 1.0) {
        requestAnimationFrame(animateCam);
      }
    };
    requestAnimationFrame(animateCam);
  }, []);

  // Initialize Three.js Scene: Whole Human Body + Synchronized Neuro-Strata Block
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 620;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0d14);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0.0, 1.4, 4.4);
    cameraRef.current = camera;

    // 2. High-Performance WebGL Renderer
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

    // 3. FULL FREE 360-DEGREE ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.maxDistance = 8.5;
    controls.minDistance = 1.4;
    controls.target.set(0.0, 0.1, 0.2);
    controlsRef.current = controls;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xffffff, 3.5, 25, Math.PI / 4, 0.35, 1);
    keySpot.position.set(2.0, 7.0, 4.5);
    keySpot.castShadow = true;
    scene.add(keySpot);

    const softFill = new THREE.DirectionalLight(0xfed7aa, 1.2);
    softFill.position.set(-4.0, 3.5, 3.0);
    scene.add(softFill);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    rimLight.position.set(-3.0, 4.0, -3.5);
    scene.add(rimLight);

    // Floor Platform with soft shadow catching
    const table = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.MeshStandardMaterial({ color: 0x05070c, roughness: 0.9, metalness: 0.1 })
    );
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.92;
    table.receiveShadow = true;
    scene.add(table);

    // =========================================================================
    // 5. 3D WHOLE HUMAN BODY MODEL (Left Side at x: -1.75)
    // =========================================================================
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(-1.75, 0.0, 0.0);
    scene.add(bodyGroup);

    // Circular Diagnostic Pedestal
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.90, 0.06, 36),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3, metalness: 0.7 })
    );
    pedestal.position.y = -0.89;
    pedestal.receiveShadow = true;
    bodyGroup.add(pedestal);

    // Glowing Emerald LED Trim Ring on Pedestal
    const ringLed = new THREE.Mesh(
      new THREE.RingGeometry(0.82, 0.88, 36),
      new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
    );
    ringLed.rotation.x = -Math.PI / 2;
    ringLed.position.y = -0.855;
    bodyGroup.add(ringLed);

    // Load Whole Human Body GLB Model
    const gltfLoader = new GLTFLoader();
    const modelUrl = `${import.meta.env.BASE_URL}models/human_body.glb`;
    gltfLoader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Center and scale to human standing height (1.75 units tall)
        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;

        const targetHeight = 1.72;
        const scale = targetHeight / (size.y || 1);
        model.scale.set(scale, scale, scale);
        model.position.y = 0.0;
        model.rotation.y = Math.PI / 2; // Face forward (+Z toward camera)

        // Apply authentic anatomical skin shader
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
        // Procedural Anatomical Mannequin Fallback
        const skinMat = new THREE.MeshStandardMaterial({ color: 0xdeb89e, roughness: 0.38, metalness: 0.06 });
        const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), skinMat);
        cranium.position.y = 0.52;
        bodyGroup.add(cranium);

        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.65, 20), skinMat);
        torso.position.y = 0.08;
        bodyGroup.add(torso);

        const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.75, 20), skinMat);
        legs.position.y = -0.52;
        bodyGroup.add(legs);
      }
    );

    // Glowing Acupuncture Meridian Pathways on Body (Du Mai, Bladder, Gallbladder)
    const meridianMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.65 });
    const spineMeridian = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.58, 0),
      new THREE.Vector3(0, 0.44, -0.06),
      new THREE.Vector3(0, 0.28, -0.08),
      new THREE.Vector3(0, 0.05, -0.08),
      new THREE.Vector3(0, -0.22, -0.07)
    ]);
    const meridianLine = new THREE.Line(spineMeridian, meridianMat);
    bodyGroup.add(meridianLine);

    // Interactive 3D Acupoint Beacons on Body
    const acupointMeshes = [];
    CLINICAL_ACUPOINTS.forEach((pt, idx) => {
      const pinGroup = new THREE.Group();
      // Positioned directly on the 3D human body surface
      pinGroup.position.set(pt.bodyPosition[0], pt.bodyPosition[1], pt.bodyPosition[2]);

      const pinSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.024, 16, 16),
        new THREE.MeshStandardMaterial({
          color: pt.colorHex,
          emissive: pt.colorHex,
          emissiveIntensity: 1.6,
          roughness: 0.2
        })
      );
      pinGroup.add(pinSphere);

      const pinRing = new THREE.Mesh(
        new THREE.RingGeometry(0.03, 0.046, 20),
        new THREE.MeshBasicMaterial({ color: pt.colorHex, side: THREE.DoubleSide })
      );
      pinGroup.add(pinRing);

      pinGroup.userData = { acupointIdx: idx };
      bodyGroup.add(pinGroup);
      acupointMeshes.push(pinSphere);
    });

    // =========================================================================
    // 6. SYNCHRONIZED 3D NEURO-TISSUE STRATA BLOCK (Right Side at x: +1.35)
    // =========================================================================
    const strataGroup = new THREE.Group();
    strataGroup.position.set(1.35, 0.0, 0.0);
    scene.add(strataGroup);

    const blockWidth = 2.4;
    const blockDepth = 1.7;

    const skinTex = createSkinTexture();
    const muscleTex = createMuscleStriationTexture();

    // Layer 1: Epidermis & Dermis
    const dermisMat = new THREE.MeshStandardMaterial({ map: skinTex, roughness: 0.42, metalness: 0.04 });
    const dermisMesh = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, 0.35, blockDepth), dermisMat);
    dermisMesh.position.y = 0.575;
    dermisMesh.castShadow = true;
    dermisMesh.receiveShadow = true;
    strataGroup.add(dermisMesh);

    // Top Skin Plane for Dimpling
    const topSkinGeo = new THREE.PlaneGeometry(blockWidth, blockDepth, 36, 36);
    topSkinGeo.rotateX(-Math.PI / 2);
    const topSkinMat = new THREE.MeshStandardMaterial({ map: skinTex, roughness: 0.38, metalness: 0.04, side: THREE.DoubleSide });
    const topSkin = new THREE.Mesh(topSkinGeo, topSkinMat);
    topSkin.position.y = 0.755;
    topSkin.receiveShadow = true;
    strataGroup.add(topSkin);
    skinMeshRef.current = topSkin;

    originalSkinPositionsRef.current = new Float32Array(topSkinGeo.attributes.position.array);

    // Dermal Capillaries
    const vesselMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.25 });
    for (let i = 0; i < 24; i++) {
      const vCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3((Math.random() - 0.5) * 2.2, 0.42, 0.84),
        new THREE.Vector3((Math.random() - 0.5) * 2.2, 0.56 + Math.random() * 0.1, 0.85),
        new THREE.Vector3((Math.random() - 0.5) * 2.2, 0.69, 0.84)
      ]);
      const vMesh = new THREE.Mesh(new THREE.TubeGeometry(vCurve, 10, 0.008, 6, false), vesselMat);
      strataGroup.add(vMesh);
    }

    // Target Acupoint Ring on Strata Skin
    const beacon = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.13, 32),
      new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
    );
    beacon.rotation.x = -Math.PI / 2;
    beacon.position.set(0, 0.76, 0.45);
    strataGroup.add(beacon);

    // Thermal Bloom Ring (When Moxa is active)
    const thermalRing = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.45, 32),
      new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.0, side: THREE.DoubleSide })
    );
    thermalRing.rotation.x = -Math.PI / 2;
    thermalRing.position.set(0, 0.762, 0.45);
    strataGroup.add(thermalRing);
    thermalRingRef.current = thermalRing;

    // Layer 2: 740+ 3D Spherical Adipose Fat Globules
    const fatBaseMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.35, metalness: 0.08 });
    const fatBase = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, 0.4, blockDepth), fatBaseMat);
    fatBase.position.y = 0.2;
    strataGroup.add(fatBase);

    const fatSphereGeo = new THREE.SphereGeometry(0.058, 14, 14);
    const fatSphereMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.18,
      metalness: 0.12,
      emissive: 0x78350f,
      emissiveIntensity: 0.12
    });
    const fatInstances = new THREE.InstancedMesh(fatSphereGeo, fatSphereMat, 740);
    const dummy = new THREE.Object3D();
    let fatCount = 0;

    for (let x = -1.1; x <= 1.1; x += 0.12) {
      for (let y = 0.03; y <= 0.37; y += 0.10) {
        dummy.position.set(x + (Math.random() - 0.5) * 0.05, y, 0.86 + Math.random() * 0.05);
        const s = 0.75 + Math.random() * 0.55;
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        fatInstances.setMatrixAt(fatCount++, dummy.matrix);
      }
    }
    for (let z = -0.8; z <= 0.8; z += 0.14) {
      for (let y = 0.03; y <= 0.37; y += 0.11) {
        if (fatCount < 740) {
          dummy.position.set(1.18, y, z);
          const s = 0.75 + Math.random() * 0.55;
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          fatInstances.setMatrixAt(fatCount++, dummy.matrix);
        }
      }
    }
    fatInstances.instanceMatrix.needsUpdate = true;
    strataGroup.add(fatInstances);

    // Layer 3: Deep Fascia
    const fasciaSheath = new THREE.Mesh(
      new THREE.BoxGeometry(blockWidth, 0.024, blockDepth),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.22, metalness: 0.18, transparent: true, opacity: 0.88 })
    );
    fasciaSheath.position.y = 0.0;
    strataGroup.add(fasciaSheath);

    // Layer 4: Striated Muscle Fascicles
    const muscleBase = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, 0.74, blockDepth), new THREE.MeshStandardMaterial({ map: muscleTex, roughness: 0.45 }));
    muscleBase.position.y = -0.37;
    strataGroup.add(muscleBase);

    const fascicleMat = new THREE.MeshStandardMaterial({ map: muscleTex, roughness: 0.32, metalness: 0.14 });
    for (let y = -0.7; y <= -0.05; y += 0.065) {
      const fascicle = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, blockWidth, 14), fascicleMat);
      fascicle.rotation.z = Math.PI / 2;
      fascicle.position.set(0, y, 0.88);
      strataGroup.add(fascicle);
    }

    // =========================================================================
    // 7. 3D NERVE FIBERS & ARTERIAL VESSELS (Directly contacted by the needle!)
    // =========================================================================
    const nerveNetworkGroup = new THREE.Group();
    strataGroup.add(nerveNetworkGroup);

    // Main Nerve Trunk (Glowing Golden-Yellow Neural Pathway)
    const nerveCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.4, 0.42, 0.88),
      new THREE.Vector3(0.2, 0.18, 0.86),
      new THREE.Vector3(0.08, 0.0, 0.87),
      new THREE.Vector3(-0.02, -0.22, 0.86),
      new THREE.Vector3(0.0, -0.42, 0.45) // Connects directly into the spastic motor knot!
    ]);
    const nerveGeo = new THREE.TubeGeometry(nerveCurve, 40, 0.016, 10, false);
    const nerveMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xeab308,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.1
    });
    const nerveMesh = new THREE.Mesh(nerveGeo, nerveMat);
    nerveNetworkGroup.add(nerveMesh);
    nerveMatRef.current = nerveMat;

    // Lateral Axonal Branches
    const branchCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.08, 0.0, 0.87),
      new THREE.Vector3(-0.24, -0.16, 0.87),
      new THREE.Vector3(-0.46, -0.34, 0.86)
    ]);
    const branch1 = new THREE.Mesh(new THREE.TubeGeometry(branchCurve1, 20, 0.009, 8, false), nerveMat);
    nerveNetworkGroup.add(branch1);

    // Arterial Blood Vessel Cord
    const arteryCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.45, 0.42, 0.87),
      new THREE.Vector3(0.25, 0.18, 0.85),
      new THREE.Vector3(0.12, -0.05, 0.86),
      new THREE.Vector3(0.05, -0.30, 0.85),
      new THREE.Vector3(0.08, -0.42, 0.45)
    ]);
    const arteryMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0x991b1b, emissiveIntensity: 0.8, roughness: 0.3 });
    const arteryMesh = new THREE.Mesh(new THREE.TubeGeometry(arteryCurve, 40, 0.018, 10, false), arteryMat);
    nerveNetworkGroup.add(arteryMesh);

    // 8. 3D Pathology: Hyper-Contracted Spastic Trigger Knot
    const knot3DGroup = new THREE.Group();
    knot3DGroup.position.set(0.0, -0.42, 0.45);
    strataGroup.add(knot3DGroup);
    knotMeshRef.current = knot3DGroup;

    const knotCore = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.14, 0.045, 64, 16, 2, 3),
      new THREE.MeshStandardMaterial({ color: 0xff1e46, emissive: 0x9f1239, emissiveIntensity: 1.8, roughness: 0.25 })
    );
    knot3DGroup.add(knotCore);

    const tautBandMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.75 });
    for (let a = 0; a < 6; a++) {
      const angle = (a / 6) * Math.PI * 2;
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.38, 8), tautBandMat);
      band.position.set(Math.cos(angle) * 0.16, Math.sin(angle) * 0.16, 0);
      band.rotation.z = angle + Math.PI / 2;
      knot3DGroup.add(band);
    }

    // Fascial Adhesion (Problem 2)
    const adhGroup = new THREE.Group();
    adhGroup.position.set(0.0, 0.05, 0.45);
    strataGroup.add(adhGroup);
    adhesionMeshRef.current = adhGroup;
    adhGroup.visible = false;
    adhGroup.add(new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.13, 0.038, 48, 12, 3, 4),
      new THREE.MeshStandardMaterial({ color: 0xc084fc, emissive: 0x7e22ce, emissiveIntensity: 1.5, roughness: 0.35 })
    ));

    // Cold Stasis (Problem 3)
    const stasisGroup = new THREE.Group();
    stasisGroup.position.set(0.0, 0.68, 0.45);
    strataGroup.add(stasisGroup);
    stasisMeshRef.current = stasisGroup;
    stasisGroup.visible = false;
    stasisGroup.add(new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.03, 24),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.6, roughness: 0.3 })
    ));

    // 9. Surgical Acupuncture Needle & Acrylic Guide Tube
    const buildAcupunctureNeedle = () => {
      const g = new THREE.Group();
      const steelMat = new THREE.MeshPhysicalMaterial({ color: 0xf8fafc, metalness: 0.99, roughness: 0.04, clearcoat: 1.0 });
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.003, 0.85, 20), steelMat);
      shaft.position.y = -0.15;
      shaft.castShadow = true;
      g.add(shaft);

      const copperMat = new THREE.MeshStandardMaterial({ color: 0xcd7f32, metalness: 0.94, roughness: 0.20, emissive: 0x3d1c06, emissiveIntensity: 0.12 });
      const spiralCurve = new SpiralHandleCurve(0.026, 0.34, 24);
      const spiralMesh = new THREE.Mesh(new THREE.TubeGeometry(spiralCurve, 100, 0.0055, 10, false), copperMat);
      spiralMesh.position.y = 0.44;
      g.add(spiralMesh);

      const corePin = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.020, 0.34, 20), copperMat);
      corePin.position.y = 0.44;
      g.add(corePin);

      const loopFinial = new THREE.Mesh(new THREE.TorusGeometry(0.020, 0.005, 12, 24), copperMat);
      loopFinial.position.y = 0.62;
      g.add(loopFinial);

      const gleam = new THREE.PointLight(0xfff5ea, 1.2, 2.5);
      gleam.position.set(0.1, 0.5, 0.15);
      g.add(gleam);

      return g;
    };

    const activeNeedle = buildAcupunctureNeedle();
    activeNeedle.position.set(0.0, 1.05, 0.45);
    strataGroup.add(activeNeedle);
    activeNeedleRef.current = activeNeedle;

    const guideTubeMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transmission: 0.92,
      opacity: 0.82,
      transparent: true,
      roughness: 0.08,
      thickness: 0.06
    });
    const guideTube = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.65, 24, 1, true), guideTubeMat);
    guideTube.position.set(0.0, 0.77, 0.45);
    strataGroup.add(guideTube);
    guideTubeRef.current = guideTube;

    // 10. 3D Thanos Ash Particles
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

    // 11. Raycasting Click Interaction (Click on Body Acupoint or Needle)
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    const handleCanvasClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVec, camera);

      // Check Acupoint clicks on body
      const bodyIntersects = raycaster.intersectObjects(acupointMeshes, true);
      if (bodyIntersects.length > 0) {
        const hit = bodyIntersects[0].object.parent;
        if (hit && hit.userData && hit.userData.acupointIdx !== undefined) {
          handleSelectAcupoint(hit.userData.acupointIdx);
          return;
        }
      }

      // Check Needle or Beacon clicks on strata block
      const strataIntersects = raycaster.intersectObjects([activeNeedle, beacon, topSkin], true);
      if (strataIntersects.length > 0 && strataIntersects[0].distance < 7.0) {
        dropNeedleToTarget();
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('click', handleCanvasClick);

    // 12. Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Organic Pulse for Active Pathology & Acupoints
      if (knotMeshRef.current && knotMeshRef.current.visible) {
        const s = 1.0 + Math.sin(time * 4.0) * 0.12;
        knotMeshRef.current.scale.set(s, s, s);
      }

      // Subtle rotation on body model pedestal ring
      ringLed.rotation.z = time * 0.4;

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
      domEl.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [dropNeedleToTarget, handleSelectAcupoint]);

  // Update visible pathology inside 3D tissue block
  useEffect(() => {
    if (knotMeshRef.current) knotMeshRef.current.visible = (selectedProblemIdx === 0) && !isDisintegrated;
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = (selectedProblemIdx === 1) && !isDisintegrated;
    if (stasisMeshRef.current) stasisMeshRef.current.visible = (selectedProblemIdx === 2) && !isDisintegrated;
  }, [selectedProblemIdx, isDisintegrated]);

  // Update active tool visibility
  useEffect(() => {
    if (activeNeedleRef.current) activeNeedleRef.current.visible = (activeTool === 'needle');
    if (guideTubeRef.current) guideTubeRef.current.visible = (activeTool === 'needle');
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
                Whole Human Body 3D Acupoint & Neuro-Anatomy Suite
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                True 3D Volumetric
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Interactive 3D Body Model • Nerves & Arterial Vessels Contacted • Microscopic Strata Depth & Thanos Snap
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
      <div className="relative w-full h-[540px] sm:h-[620px] rounded-2xl border border-neutral-800/90 overflow-hidden bg-black shadow-inner">
        
        {/* Three.js Canvas Container */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* TOP FLOATING ANGLE / MODE SELECTOR */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-1.5 rounded-2xl shadow-2xl flex items-center gap-1">
            <span className="text-[10px] text-neutral-400 font-mono px-2 hidden sm:inline">
              3D View:
            </span>
            <button
              type="button"
              onClick={() => switchCameraView('dual')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeCameraView === 'dual'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md font-black'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>⚡ Dual Suite (Body + Strata)</span>
            </button>
            <button
              type="button"
              onClick={() => switchCameraView('body')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeCameraView === 'body'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md font-black'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>👤 Whole Body Focus</span>
            </button>
            <button
              type="button"
              onClick={() => switchCameraView('strata')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeCameraView === 'strata'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md font-black'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>🔬 Strata & Nerves</span>
            </button>
            <button
              type="button"
              onClick={() => switchCameraView('nerves')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeCameraView === 'nerves'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md font-black'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>⚡ Nerve Close-Up</span>
            </button>
          </div>
        </div>

        {/* HUD Top-Left: Whole Body Acupoints & Strata Pathologies */}
        <div className="absolute top-16 left-4 z-20 flex flex-col space-y-2 pointer-events-auto max-w-[215px]">
          {/* 3D Body Acupoints */}
          <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-2 rounded-2xl shadow-xl space-y-1">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-white flex items-center gap-1">
                <User className="w-3 h-3 text-emerald-400" />
                <span>3D Body Acupoints</span>
              </span>
              <span className="text-[8px] text-emerald-400 font-mono">
                Click Point
              </span>
            </div>

            <div className="flex flex-col gap-1 max-h-[110px] overflow-y-auto pr-0.5">
              {CLINICAL_ACUPOINTS.map((pt, idx) => {
                const isSelected = selectedAcupointIdx === idx;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => handleSelectAcupoint(idx)}
                    className={`flex items-center justify-between p-1.5 rounded-xl text-left border transition ${
                      isSelected
                        ? 'bg-emerald-500 text-neutral-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>{pt.code}</span>
                        <span className="text-[10px] opacity-75">{pt.hanzi}</span>
                      </div>
                      <div className="text-[9px] opacity-80 truncate">{pt.region}</div>
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1 rounded bg-black/30">
                      {pt.depthCun.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Strata Condition / Pathologies */}
          <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-2 rounded-2xl shadow-xl space-y-1">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-white flex items-center gap-1">
                <Layers className="w-3 h-3 text-amber-400" />
                <span>Tissue Pathology</span>
              </span>
              <span className="text-[8px] text-amber-400 font-mono">
                Strata Target
              </span>
            </div>

            <div className="flex flex-col gap-1">
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
                    className={`flex items-center justify-between p-1.5 rounded-xl text-left border transition ${
                      isSelected
                        ? 'bg-emerald-500 text-neutral-950 border-emerald-400 font-bold shadow-sm'
                        : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{prob.name}</div>
                      <div className="text-[9px] opacity-75">{prob.layer}</div>
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1 rounded bg-black/30">
                      {prob.toolName.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* HUD Bottom-Left: Educational Anatomy Intel Card */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-auto max-w-md hidden sm:block">
          <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-3.5 rounded-2xl shadow-2xl space-y-2">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeAcupoint.colorHex || '#10b981' }} />
                <h4 className="text-xs font-black text-white">
                  {activeAcupoint.code} • {activeAcupoint.translation} ({activeAcupoint.hanzi})
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                Target: {activeAcupoint.depthTarget}mm ({activeAcupoint.depthCun})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
                <div className="font-bold text-amber-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>Nerves Contacted:</span>
                </div>
                <div className="text-neutral-200 font-medium leading-tight mt-0.5">
                  {activeAcupoint.nerves}
                </div>
                <div className="text-[9px] text-neutral-400 leading-tight mt-1">
                  {activeAcupoint.nerveDetails}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
                <div className="font-bold text-rose-400 flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  <span>Vessels & Relief:</span>
                </div>
                <div className="text-neutral-200 font-medium leading-tight mt-0.5">
                  {activeAcupoint.vessels}
                </div>
                <div className="text-[9px] text-neutral-400 leading-tight mt-1">
                  {activeAcupoint.relief}
                </div>
              </div>
            </div>

            <div className="text-[9px] text-neutral-400 font-mono flex items-center gap-1.5 pt-0.5">
              <span className="text-emerald-400 font-bold">Tissue Penetration:</span>
              <span className="truncate">{activeAcupoint.structures}</span>
            </div>
          </div>
        </div>

        {/* HUD Bottom-Center: Clinical Tool Switcher */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 pointer-events-auto">
          <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-2.5 rounded-2xl shadow-2xl flex flex-col space-y-1.5 max-w-sm ml-auto">
            <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-1">
              <span className="font-black text-white flex items-center gap-1.5 text-[11px]">
                <span>Clinical Treatment Tool:</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                Click to Switch
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {/* Tool 1: 0.18mm Needle */}
              <button
                type="button"
                data-testid="tool-needle"
                onClick={() => handleSelectTool('needle')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-0.5 transition ${
                  activeTool === 'needle'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-base">📍</span>
                <span className="text-[10px] font-bold">0.18mm Needle</span>
                <span className="text-[8px] text-neutral-400">Target: {activeAcupoint.depthTarget}mm</span>
              </button>

              {/* Tool 2: Glass Cup */}
              <button
                type="button"
                data-testid="tool-cup"
                onClick={() => handleSelectTool('cup')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-0.5 transition ${
                  activeTool === 'cup'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/20 scale-105'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-base">🫧</span>
                <span className="text-[10px] font-bold">Glass Fire Cup</span>
                <span className="text-[8px] text-neutral-400">Fascial Suction</span>
              </button>

              {/* Tool 3: Herbal Moxa */}
              <button
                type="button"
                data-testid="tool-moxa"
                onClick={() => handleSelectTool('moxa')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-0.5 transition ${
                  activeTool === 'moxa'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-base">🔥</span>
                <span className="text-[10px] font-bold">Herbal Moxa</span>
                <span className="text-[8px] text-neutral-400">43°C Heat</span>
              </button>
            </div>
          </div>
        </div>

        {/* TACTILE V2 DROP-DOWN CONTROL HUD (Top-Right) */}
        {!isDisintegrated && (
          <div className="absolute top-16 right-4 z-20 pointer-events-auto max-w-xs w-full">
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
                <span className="text-amber-400 font-bold">Target: {currentProb.depthTarget} {currentProb.depthUnit}</span>
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
                <span>{isSnapping ? 'Disintegrating in 3D...' : activeTool === 'needle' ? `Drop Needle to ${currentProb.depthTarget}mm Knot` : activeTool === 'cup' ? `Decompress Fascia (${currentProb.depthTarget}mm)` : `Radiate Heat (${currentProb.depthTarget}°C)`}</span>
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
                <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Full 360° Orbit:</strong> Left-click and drag anywhere to explore body & strata. Click acupoints on body to switch!
                </span>
              </div>
            </div>
          </div>
        )}

        {/* POST-TREATMENT SUCCESS CARD (Thanos Disintegration Complete) */}
        {isDisintegrated && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-neutral-950 border border-emerald-500/50 p-6 rounded-3xl shadow-2xl max-w-md w-full space-y-4 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  De-Qi Unlocked (得气)
                </span>
                <h3 className="text-xl font-bold text-white">
                  {currentProb.reliefTitle}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {currentProb.reliefText}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-around text-xs">
                <div>
                  <div className="text-neutral-400 text-[10px] uppercase font-mono">Tissue Tension</div>
                  <div className="font-bold text-emerald-400">0% (Vaporized)</div>
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

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Treat Another 3D Pathology</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold shadow-lg shadow-emerald-500/30 transition flex items-center justify-center gap-1.5"
                >
                  <span>Experience in Person</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clinical Reference Footer */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-neutral-400 gap-2 px-1">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Full 3D Human Body Model • 3D Neural Pathways & Arterial Vessels • 740+ Glistening Adipose Lobules</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Surgical 304 Steel • Wound Spiral Copper Coil • 360° Free Dual Orbit</span>
        </div>
      </div>
    </div>
  );
}
