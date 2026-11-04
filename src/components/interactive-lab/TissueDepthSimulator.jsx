import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SkinLayersPip from './SkinLayersPip';
import ClinicalInstrumentTray from './ClinicalInstrumentTray';
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
// CLINICAL ACUPOINTS CATALOG WITH REGIONAL ZOOM MAPPINGS (100% ENGLISH)
// ============================================================================
export const CLINICAL_ACUPOINTS = [
  // --- 5 TRUE CLINICAL ARM ACUPOINTS (Physically Anchored to Skin Surface) ---
  {
    id: 'li11',
    code: 'LI-11',
    fullName: 'LI-11 (Quchi)',
    pinyin: 'Quchi',
    hanzi: '曲池',
    translation: 'Pool at the Bend',
    englishTitle: 'Pool at the Bend',
    region: 'hand',
    regionLabel: 'Lateral Elbow',
    facing: 'front',
    meridian: 'Large Intestine Meridian',
    depthTarget: 15.0,
    depthCun: '1.0–1.5 cun',
    isArmPoint: true,
    orderIndex: 0,
    modelPos: [0.257, 0.238, -0.072],
    badgeOffset: [0.070, 0.035, 0.040],
    nerves: 'Radial Nerve & Post. Cutaneous Nerve',
    vessels: 'Radial Recurrent Artery',
    relief: 'Hypertension, Elbow Tendinopathy, Skin Clear, Fever Dissipation',
    deqi: 'Clear penetrating warmth radiating down extensor muscles of forearm.',
    colorHex: 0x06b6d4
  },
  {
    id: 'lu7',
    code: 'LU-7',
    fullName: 'LU-7 (Lieque)',
    pinyin: 'Lieque',
    hanzi: '列缺',
    translation: 'Broken Sequence',
    englishTitle: 'Broken Sequence',
    region: 'hand',
    regionLabel: 'Radial Forearm',
    facing: 'front',
    meridian: 'Lung Meridian',
    depthTarget: 8.0,
    depthCun: '0.5–0.8 cun',
    isArmPoint: true,
    orderIndex: 1,
    modelPos: [0.269, -0.010, 0.053],
    badgeOffset: [0.075, 0.030, 0.040],
    nerves: 'Lateral Antebrachial Cutaneous Nerve',
    vessels: 'Radial Artery & Cephalic Vein',
    relief: 'Headaches, Migraines, Neck Stiffness, Cough & Diaphragmatic Ease',
    deqi: 'Fine energetic pulse coursing up radial margin to the thumb.',
    colorHex: 0x3b82f6
  },
  {
    id: 'pc6',
    code: 'PC-6',
    fullName: 'PC-6 (Neiguan)',
    pinyin: 'Neiguan',
    hanzi: '内关',
    translation: 'Inner Gate',
    englishTitle: 'Inner Gate',
    region: 'hand',
    regionLabel: 'Inner Forearm',
    facing: 'front',
    meridian: 'Pericardium Meridian',
    depthTarget: 10.0,
    depthCun: '0.5–0.8 cun',
    isArmPoint: true,
    orderIndex: 2,
    modelPos: [0.228, -0.014, 0.102],
    badgeOffset: [-0.070, 0.030, 0.040],
    nerves: 'Median Nerve Trunk',
    vessels: 'Median Antebrachial Vein & Radial Artery',
    relief: 'Nausea, Cardiac Palpitations, Panic, Diaphragmatic Tightness',
    deqi: 'Subtle electric sensation gliding smoothly along forearm midline.',
    colorHex: 0xc084fc
  },
  {
    id: 'ht7',
    code: 'HT-7',
    fullName: 'HT-7 (Shenmen)',
    pinyin: 'Shenmen',
    hanzi: '神门',
    translation: 'Spirit Gate',
    englishTitle: 'Spirit Gate',
    region: 'hand',
    regionLabel: 'Wrist Crease',
    facing: 'front',
    meridian: 'Heart Meridian',
    depthTarget: 8.0,
    depthCun: '0.3–0.5 cun',
    isArmPoint: true,
    orderIndex: 3,
    modelPos: [0.226, 0.008, -0.019],
    badgeOffset: [-0.065, -0.030, 0.035],
    nerves: 'Ulnar Nerve & Medial Antebrachial Cutaneous Nerve',
    vessels: 'Ulnar Artery',
    relief: 'Insomnia, Severe Anxiety, Palpitations, Emotional Grounding',
    deqi: 'Deep settling calm wave flowing into palm and chest.',
    colorHex: 0xf43f5e
  },
  {
    id: 'li4',
    code: 'LI-4',
    fullName: 'LI-4 (Hegu)',
    pinyin: 'Hegu',
    hanzi: '合谷',
    translation: 'Joining Valley',
    englishTitle: 'Joining Valley',
    region: 'hand',
    regionLabel: 'Dorsal Hand',
    facing: 'front',
    meridian: 'Large Intestine Meridian',
    depthTarget: 12.0,
    depthCun: '0.5–1.0 cun',
    isArmPoint: true,
    orderIndex: 4,
    modelPos: [0.260, -0.043, 0.068],
    badgeOffset: [0.070, -0.025, 0.035],
    nerves: 'Superficial Radial Nerve',
    vessels: 'First Dorsal Metacarpal Artery',
    relief: 'Frontal Migraines, TMJ Jaw Clenching, Toothache, Systemic Analgesia',
    deqi: 'Pronounced heavy warm ache spreading through palm into forearm.',
    colorHex: 0xe02868
  },

  // --- HEAD, SPINE & LEG ANCHORED ACUPOINTS ---
  {
    id: 'gb20',
    code: 'GB-20',
    fullName: 'GB-20 (Fengchi)',
    pinyin: 'Fengchi',
    hanzi: '风池',
    translation: 'Wind Pool',
    englishTitle: 'Wind Pool',
    region: 'neck',
    regionLabel: 'Occipital Neck',
    facing: 'back',
    orderIndex: 0,
    meridian: 'Gallbladder Meridian',
    depthTarget: 12.0,
    depthCun: '0.8–1.2 cun',
    modelPos: [0.026, 0.665, -0.089],
    badgeOffset: [0.045, 0.025, -0.045],
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
    pinyin: 'Baihui',
    hanzi: '百会',
    translation: 'Hundred Convergences',
    englishTitle: 'Hundred Convergences',
    region: 'crown',
    regionLabel: 'Cranial Crown',
    facing: 'front',
    orderIndex: 0,
    meridian: 'Governing Vessel (Du Mai)',
    depthTarget: 6.0,
    depthCun: '0.3–0.5 cun',
    modelPos: [0.001, 0.948, -0.001],
    badgeOffset: [0.0, 0.065, 0.030],
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
    pinyin: 'Tianzhu',
    hanzi: '天柱',
    translation: 'Celestial Pillar',
    englishTitle: 'Celestial Pillar',
    region: 'neck',
    regionLabel: 'Upper Neck',
    facing: 'back',
    orderIndex: 1,
    meridian: 'Bladder Meridian',
    depthTarget: 10.0,
    depthCun: '0.5–0.8 cun',
    modelPos: [0.041, 0.611, -0.125],
    badgeOffset: [0.040, -0.020, -0.045],
    nerves: 'Lesser Occipital Nerve (C2-C3)',
    vessels: 'Deep Cervical Artery',
    relief: 'Forward-Head Posture Strain, Blurred Vision, Stiff Neck Spasm',
    deqi: 'Warm electric tingling radiating down paraspinal muscles.',
    colorHex: 0xf59e0b
  },
  {
    id: 'st36',
    code: 'ST-36',
    fullName: 'ST-36 (Zusanli)',
    pinyin: 'Zusanli',
    hanzi: '足三里',
    translation: 'Leg Three Miles',
    englishTitle: 'Leg Three Miles',
    region: 'leg',
    regionLabel: 'Anterior Leg',
    facing: 'front',
    orderIndex: 0,
    modelPos: [0.115, -0.391, 0.034],
    badgeOffset: [0.050, 0.025, 0.040],
    meridian: 'Stomach Meridian',
    depthTarget: 15.0,
    depthCun: '1.0–1.5 cun',
    nerves: 'Deep Peroneal (Fibular) Nerve',
    vessels: 'Anterior Tibial Artery',
    relief: 'Chronic Fatigue, Acid Reflux, Immune Depletion, Leg Weakness',
    deqi: 'Rich traveling warmth and rhythmic muscular pulsing downward into foot.',
    colorHex: 0xec4899
  },
  {
    id: 'sp6',
    code: 'SP-6',
    fullName: 'SP-6 (Sanyinjiao)',
    pinyin: 'Sanyinjiao',
    hanzi: '三阴交',
    translation: 'Three Yin Intersection',
    englishTitle: 'Three Yin Intersection',
    region: 'leg',
    regionLabel: 'Inner Ankle',
    facing: 'front',
    orderIndex: 1,
    modelPos: [0.089, -0.612, -0.037],
    badgeOffset: [-0.045, 0.020, 0.035],
    meridian: 'Spleen Meridian',
    depthTarget: 14.0,
    depthCun: '1.0–1.5 cun',
    nerves: 'Tibial Nerve & Saphenous Nerve',
    vessels: 'Posterior Tibial Artery',
    relief: 'Pelvic Circulation, Insomnia, Leg Cramping, Hormonal Balance',
    deqi: 'Steady rhythmic warmth coursing up the inner calf.',
    colorHex: 0xec4899
  },
  {
    id: 'bl23',
    code: 'BL-23',
    fullName: 'BL-23 (Shenshu)',
    pinyin: 'Shenshu',
    hanzi: '肾俞',
    translation: 'Kidney Shu',
    englishTitle: 'Kidney Shu',
    region: 'back',
    regionLabel: 'Lumbar Spine',
    facing: 'back',
    orderIndex: 0,
    meridian: 'Bladder Meridian',
    depthTarget: 14.0,
    depthCun: '0.8–1.2 cun',
    modelPos: [0.039, 0.086, -0.139],
    badgeOffset: [0.045, 0.020, -0.045],
    nerves: 'Lumbar Spinal Nerve Dorsal Ramus (L2)',
    vessels: 'Lumbar Arteries & Paraspinal Plexus',
    relief: 'Chronic Lower Back Pain, Sciatica, Core Instability, Disc Fatigue',
    deqi: 'Deep, comforting heat diffusing through sacrum and lumbar spine.',
    colorHex: 0x8b5cf6
  }
];

// Precise Medical Close-Up Framing for Each Acupoint (Exact Skin Alignment)
export const ACUPOINT_CLOSEUPS = {
  li11: { cam: [0.210, 0.544, 0.301], lookAt: [0.210, 0.514, -0.059], facing: 'front' },
  pc6:  { cam: [0.186, 0.339, 0.443], lookAt: [0.186, 0.309, 0.083],  facing: 'front' },
  lu7:  { cam: [0.219, 0.342, 0.403], lookAt: [0.219, 0.312, 0.043],  facing: 'front' },
  ht7:  { cam: [0.184, 0.357, 0.344], lookAt: [0.184, 0.327, -0.016], facing: 'front' },
  li4:  { cam: [0.212, 0.315, 0.415], lookAt: [0.212, 0.285, 0.055],  facing: 'front' },
  gv20: { cam: [0.001, 1.293, 0.319], lookAt: [0.001, 1.093, -0.001], facing: 'front' },
  gb20: { cam: [-0.021, 0.893, 0.433], lookAt: [-0.021, 0.863, 0.073], facing: 'back' },
  bl10: { cam: [-0.033, 0.848, 0.462], lookAt: [-0.033, 0.818, 0.102], facing: 'back' },
  bl23: { cam: [-0.032, 0.420, 0.473], lookAt: [-0.032, 0.390, 0.113], facing: 'back' },
  st36: { cam: [0.094, 0.031, 0.388], lookAt: [0.094, 0.001, 0.028],  facing: 'front' },
  sp6:  { cam: [0.073, -0.149, 0.330], lookAt: [0.073, -0.179, -0.030], facing: 'front' }
};

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
    } else if (type === 'popup') {
      // Gentle crystalline chime for sequential arm acupoint pop-up
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.09); // D6
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }
  } catch (_) {}
}

// Procedural Razor-Sharp 2D Pinpoint Skin Dot Texture (Flush on Skin, Never 3D Spheres)
function createSkinDotTexture(color = '#e02868', isSelected = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (isSelected) {
    const aura = ctx.createRadialGradient(32, 32, 8, 32, 32, 28);
    aura.addColorStop(0, 'rgba(224, 40, 104, 0.65)');
    aura.addColorStop(1, 'rgba(224, 40, 104, 0.0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(32, 32, 28, 0, Math.PI * 2);
    ctx.fill();
  }

  // Crisp White Outer Ring (guarantees contrast against all skin tones & lighting)
  ctx.beginPath();
  ctx.arc(32, 32, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = 4;
  ctx.fill();

  // Core Solid Clinical Dot
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(32, 32, 10, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

// Helper: Create 3D Canvas Badge for Anatomical Acupoint Callouts (100% English)
function createCalloutBadgeCanvas(code, englishName, subInfo, isSelected) {
  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 70;
  const ctx = canvas.getContext('2d');

  // Pill card background
  ctx.fillStyle = isSelected ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(4, 4, 232, 62, 14);
  } else {
    ctx.rect(4, 4, 232, 62);
  }
  ctx.fill();

  // Arura Rose accent border
  ctx.strokeStyle = isSelected ? '#e02868' : 'rgba(224, 40, 104, 0.40)';
  ctx.lineWidth = isSelected ? 3.5 : 2;
  ctx.stroke();

  // Left Code Pill
  ctx.fillStyle = '#e02868';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(12, 14, 62, 42, 8);
  } else {
    ctx.rect(12, 14, 62, 42);
  }
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(code, 43, 35);

  // Primary English Name in bold
  ctx.fillStyle = '#09090b';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(englishName || code, 82, 33);

  // Subtitle: Pinyin + Target Needle Depth in English
  ctx.fillStyle = '#64748b';
  ctx.font = '600 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(subInfo ? `Target: ${subInfo}` : 'Clinical Target', 82, 51);

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
  const [showStrataPip, setShowStrataPip] = useState(true);
  const [showInstrumentTray, setShowInstrumentTray] = useState(true);

  const isHoldingRef = useRef(false);
  const holdTimerRef = useRef(null);

  const activeAcupoint = CLINICAL_ACUPOINTS[selectedAcupointIdx] || CLINICAL_ACUPOINTS[0];
  const currentProb = CLINICAL_PROBLEMS[selectedProblemIdx];

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const isCameraAnimatingRef = useRef(false);
  const targetCamPosRef = useRef(new THREE.Vector3(0.0, 0.34, 4.2));
  const targetLookAtRef = useRef(new THREE.Vector3(0.0, 0.34, 0.0));

  // 3D Groups
  const bodyGroupRef = useRef(null);
  const bodyModelMeshRef = useRef(null);
  const bonesRef = useRef(null);
  const targetLimbAnglesRef = useRef({ arm: 0.0, leg: 0.0 });
  const limbPinGroupsRef = useRef({});
  const armPinObjectsRef = useRef([]);
  const allPinObjectsRef = useRef([]);
  const badgesRef = useRef([]);
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
        bodyModelMeshRef.current.rotation.y = next === 'front' ? 0 : Math.PI;
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

  // Unified Regional Presentation: Natural Articulation, Close Zoom & Sequential Acupoint Pop-up
  const triggerRegionPresentation = useCallback((regionKey, selectedIdx) => {
    setActiveRegion(regionKey);
    isCameraAnimatingRef.current = true;

    // First fold down all pins
    if (allPinObjectsRef.current) {
      allPinObjectsRef.current.forEach(pin => {
        pin.userData.targetScale = 0.0;
      });
    }

    if (regionKey === 'full') {
      targetCamPosRef.current.set(0.0, 0.32, 3.8);
      targetLookAtRef.current.set(0.0, 0.32, 0.0);
      if (bodyModelMeshRef.current) {
        bodyModelMeshRef.current.rotation.y = 0;
        setBodyFacing('front');
      }
      // Reveal all pins across whole body
      setTimeout(() => {
        if (allPinObjectsRef.current) {
          allPinObjectsRef.current.forEach(pin => {
            pin.userData.targetScale = 1.0;
          });
        }
      }, 250);
      return;
    }

    let targetFacing = 'front';
    if (regionKey === 'hand') {
      targetCamPosRef.current.set(0.22, 0.36, 0.72);
      targetLookAtRef.current.set(0.20, 0.34, 0.04);
      targetFacing = 'front';
    } else if (regionKey === 'leg') {
      targetCamPosRef.current.set(0.10, -0.12, 0.82);
      targetLookAtRef.current.set(0.09, -0.15, 0.02);
      targetFacing = 'front';
    } else if (regionKey === 'neck') {
      targetCamPosRef.current.set(0.0, 0.88, 0.78);
      targetLookAtRef.current.set(0.0, 0.86, 0.0);
      targetFacing = 'back';
    } else if (regionKey === 'back') {
      targetCamPosRef.current.set(0.0, 0.42, 0.88);
      targetLookAtRef.current.set(0.0, 0.40, 0.0);
      targetFacing = 'back';
    } else if (regionKey === 'crown') {
      targetCamPosRef.current.set(0.0, 1.25, 0.75);
      targetLookAtRef.current.set(0.0, 1.05, 0.0);
      targetFacing = 'front';
    }

    if (bodyModelMeshRef.current) {
      bodyModelMeshRef.current.rotation.y = targetFacing === 'front' ? 0 : Math.PI;
      setBodyFacing(targetFacing);
    }

    // Sequentially pop up the acupoint pins for THIS region one-by-one with crystalline chimes
    if (allPinObjectsRef.current) {
      const regionPins = allPinObjectsRef.current
        .filter(p => p.userData.region === regionKey)
        .sort((a, b) => (a.userData.orderIndex ?? 0) - (b.userData.orderIndex ?? 0));

      regionPins.forEach((pin, i) => {
        setTimeout(() => {
          pin.userData.targetScale = 1.0;
          playAcuSound('popup', isMuted);
        }, 320 + i * 260);
      });
    }

    if (typeof selectedIdx === 'number') {
      setSelectedAcupointIdx(selectedIdx);
    }
  }, [isMuted]);

  // Navigate to any anatomical region
  const navigateCameraToRegion = useCallback((regionKey) => {
    const ptIdx = CLINICAL_ACUPOINTS.findIndex(p => p.region === regionKey);
    triggerRegionPresentation(regionKey, ptIdx !== -1 ? ptIdx : undefined);
  }, [triggerRegionPresentation]);

  // Dedicated Point Close-Up Presentation (As requested: "proper close up", tray appears, skin blob on top right)
  const triggerAcupointCloseUp = useCallback((idx) => {
    const pt = CLINICAL_ACUPOINTS[idx];
    if (!pt) return;

    setSelectedAcupointIdx(idx);
    setShowStrataPip(true);
    setShowInstrumentTray(true);
    isCameraAnimatingRef.current = true;

    const closeUp = ACUPOINT_CLOSEUPS[pt.id];
    if (closeUp) {
      targetCamPosRef.current.set(...closeUp.cam);
      targetLookAtRef.current.set(...closeUp.lookAt);
      if (bodyModelMeshRef.current) {
        bodyModelMeshRef.current.rotation.y = closeUp.facing === 'front' ? 0 : Math.PI;
        setBodyFacing(closeUp.facing);
      }
    }

    // Highlight and scale up this active pin, fold down other distant pins
    if (allPinObjectsRef.current) {
      allPinObjectsRef.current.forEach((pin, i) => {
        pin.userData.targetScale = (i === idx) ? 1.0 : 0.0;
      });
      playAcuSound('popup', isMuted);
    }
  }, [isMuted]);

  // Select Acupoint from Catalog and fly into close-up with 3D Strata & Tray
  const handleSelectAcupoint = useCallback((idx) => {
    handleReset();
    playAcuSound('pickup', isMuted);
    triggerAcupointCloseUp(idx);
  }, [handleReset, isMuted, triggerAcupointCloseUp]);

  // Update active 3D badges when selected acupoint changes (100% English)
  useEffect(() => {
    if (badgesRef.current) {
      badgesRef.current.forEach(({ idx, pt, sprite, leaderLine, selRing }) => {
        const isSel = (idx === selectedAcupointIdx);
        if (selRing) selRing.visible = isSel;
        if (leaderLine) leaderLine.visible = isSel;
        if (sprite) {
          sprite.visible = isSel;
          if (isSel && sprite.material) {
            sprite.material.map = new THREE.CanvasTexture(
              createCalloutBadgeCanvas(pt.code, pt.translation, `${pt.pinyin} • ${pt.depthTarget}mm`, true)
            );
            sprite.material.needsUpdate = true;
          }
        }
      });
    }
  }, [selectedAcupointIdx]);

  // Select tool
  const handleSelectTool = useCallback((toolId) => {
    setActiveTool(toolId);
    const probIdx = toolId === 'needle' ? 0 : toolId === 'cup' ? 1 : 2;
    setSelectedProblemIdx(probIdx);
    handleReset();
    playAcuSound('pickup', isMuted);

    if (activeRegion === 'full') {
      triggerAcupointCloseUp(selectedAcupointIdx);
    }
  }, [activeRegion, handleReset, isMuted, selectedAcupointIdx, triggerAcupointCloseUp]);

  // Click & Hold to Plunge Needle into Acupoint
  const startHoldPlunge = useCallback(() => {
    if (isSnapping || isDisintegrated) return;
    if (activeRegion === 'full') {
      triggerAcupointCloseUp(selectedAcupointIdx);
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
  }, [activeRegion, interactiveDepth, isSnapping, isDisintegrated, currentProb.depthTarget, selectedAcupointIdx, triggerAcupointCloseUp, handleInteractiveChange]);

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
      triggerAcupointCloseUp(selectedAcupointIdx);
    }
    const target = currentProb.depthTarget;
    handleInteractiveChange(target);
  }, [activeRegion, currentProb.depthTarget, isSnapping, isDisintegrated, selectedAcupointIdx, triggerAcupointCloseUp, handleInteractiveChange]);

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

    // 1. Scene, Camera, Renderer (Light Luxury Clinical Theme)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Light shade matching site theme!
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    // Starts centered on human body scaled to ~60% of vertical screen height!
    camera.position.set(0.0, 0.34, 4.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.maxDistance = 7.0;
    controls.minDistance = 0.20; // Unlocked: full 360° turning enabled even at close-up zoom!
    controls.target.set(0.0, 0.34, 0.0);
    controlsRef.current = controls;

    // Allow user to freely orbit/turn the 3D model with mouse drag without camera fighting or auto-resetting
    controls.addEventListener('start', () => {
      isCameraAnimatingRef.current = false;
    });

    // Clean Studio Lighting for Light Theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const keySpot = new THREE.DirectionalLight(0xffffff, 1.6);
    keySpot.position.set(2.5, 5.0, 3.5);
    keySpot.castShadow = true;
    scene.add(keySpot);

    const softFill = new THREE.DirectionalLight(0xffe4e6, 0.55);
    softFill.position.set(-2.5, 2.5, 2.0);
    scene.add(softFill);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.85);
    rimLight.position.set(0.0, 2.5, -3.0);
    scene.add(rimLight);

    // Soft Shadow Floor Receiver
    const table = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.ShadowMaterial({ opacity: 0.08 })
    );
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.49;
    table.receiveShadow = true;
    scene.add(table);

    // =========================================================================
    // 2. 3D WHOLE HUMAN BODY MODEL (Centered, 60% Screen Height Fit)
    // =========================================================================
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0.0, 0.0, 0.0); // Centered on initial load!
    scene.add(bodyGroup);
    bodyGroupRef.current = bodyGroup;

    // Minimal Elegant Pedestal with Arura Rose Rim
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.52, 0.03, 48),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.1 })
    );
    pedestal.position.y = -0.47;
    pedestal.receiveShadow = true;
    bodyGroup.add(pedestal);

    const ringLed = new THREE.Mesh(
      new THREE.RingGeometry(0.46, 0.50, 48),
      new THREE.MeshBasicMaterial({ color: 0xe02868, side: THREE.DoubleSide })
    );
    ringLed.rotation.x = -Math.PI / 2;
    ringLed.position.y = -0.45;
    bodyGroup.add(ringLed);

    const interactiveAcupointMeshes = [];

    // Load Whole Human Body GLB Model (Sized to fit in 60% of screen)
    const gltfLoader = new GLTFLoader();
    const modelUrl = `${import.meta.env.BASE_URL}models/human_body.glb`;
    const targetHeight = 1.55; // Sized for 60% screen height fit!
    const modelScale = targetHeight / 1.90; // Natural height is 1.90m

    gltfLoader.load(
      modelUrl,
      (gltf) => {
        let bodyMesh = null;
        gltf.scene.traverse((c) => {
          if (c.isMesh && !bodyMesh) bodyMesh = c;
        });

        if (!bodyMesh) return;

        // Clean porcelain clinical white material (matching user model)
        bodyMesh.material = new THREE.MeshStandardMaterial({
          color: 0xfdfdfd,
          roughness: 0.22,
          metalness: 0.04,
          flatShading: false
        });
        bodyMesh.geometry.computeVertexNormals();
        bodyMesh.castShadow = true;
        bodyMesh.receiveShadow = true;

        bodyMesh.scale.set(modelScale, modelScale, modelScale);
        bodyMesh.position.set(0.0, 0.32, 0.0);
        bodyMesh.rotation.y = 0; // Natural front facing camera

        bodyModelMeshRef.current = bodyMesh;

        // Reusable procedural flat 2D skin dot textures (Never protruding 3D spheres!)
        const skinDotTex = createSkinDotTexture('#e02868', false);
        const skinDotSelTex = createSkinDotTexture('#e02868', true);

        // Directly attach all 11 Acupoint Pin Groups to bodyMesh!
        // Guarantees 100% mathematical lockstep with the skin surface (Zero floating!)
        CLINICAL_ACUPOINTS.forEach((pt, idx) => {
          const pinGroup = new THREE.Group();
          const pos = pt.modelPos || [0, 0, 0];
          pinGroup.position.set(pos[0], pos[1], pos[2]);
          pinGroup.scale.set(0, 0, 0); // Revealed on load & region selection
          pinGroup.userData = {
            targetScale: 0.0,
            currentScale: 0.0,
            acupointIdx: idx,
            region: pt.region,
            orderIndex: pt.orderIndex ?? 0
          };

          // Crisp 2D Pinpoint Dot flush on skin (Camera-facing sprite, depthTest: false so it never clips)
          const dotMat = new THREE.SpriteMaterial({ map: skinDotTex, depthTest: false, depthWrite: false });
          const dotSprite = new THREE.Sprite(dotMat);
          dotSprite.scale.set(0.012, 0.012, 1.0);
          dotSprite.renderOrder = 999;
          pinGroup.add(dotSprite);

          // Active Selection Aura Ring
          const selRingMat = new THREE.SpriteMaterial({ map: skinDotSelTex, depthTest: false, depthWrite: false });
          const selRing = new THREE.Sprite(selRingMat);
          selRing.scale.set(0.022, 0.022, 1.0);
          selRing.visible = (idx === selectedAcupointIdx);
          selRing.renderOrder = 998;
          pinGroup.add(selRing);

          // Leader Line (Crisp callout pointer for active acupoint)
          const bo = pt.badgeOffset || [0, 0.030, 0.040];
          const leaderLineGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(bo[0] * 0.5, bo[1] * 0.5, bo[2] * 0.5),
            new THREE.Vector3(bo[0], bo[1], bo[2] * 0.85)
          ]);
          const leaderLineMat = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.85 });
          const leaderLine = new THREE.Line(leaderLineGeo, leaderLineMat);
          leaderLine.visible = (idx === selectedAcupointIdx);
          pinGroup.add(leaderLine);

          // 3D Canvas Callout Badge in 100% English (Visible on Active Acupoint, eliminating card collision)
          const badgeTex = new THREE.CanvasTexture(
            createCalloutBadgeCanvas(pt.code, pt.translation, `${pt.pinyin} • ${pt.depthTarget}mm`, idx === selectedAcupointIdx)
          );
          const badgeMat = new THREE.SpriteMaterial({ map: badgeTex });
          const badgeSprite = new THREE.Sprite(badgeMat);
          badgeSprite.position.set(bo[0], bo[1], bo[2] + 0.02);
          badgeSprite.scale.set(0.09, 0.026, 1.0);
          badgeSprite.visible = (idx === selectedAcupointIdx);
          pinGroup.add(badgeSprite);

          // Clickable HitBox for Raycaster (comfortable radius 0.024)
          const hitBox = new THREE.Mesh(
            new THREE.SphereGeometry(0.024, 12, 12),
            new THREE.MeshBasicMaterial({ visible: false })
          );
          hitBox.userData = { acupointIdx: idx };
          pinGroup.add(hitBox);
          interactiveAcupointMeshes.push(hitBox);

          bodyMesh.add(pinGroup);
          allPinObjectsRef.current.push(pinGroup);
          badgesRef.current.push({ idx, pt, sprite: badgeSprite, leaderLine, selRing });
        });

        bodyGroup.add(bodyMesh);

        // Initially reveal all pins across whole body view after mount
        setTimeout(() => {
          if (allPinObjectsRef.current) {
            allPinObjectsRef.current.forEach(pin => {
              pin.userData.targetScale = 1.0;
            });
          }
        }, 300);
      },
      undefined,
      (err) => console.error('Failed to load human_body.glb:', err)
    );

    // Raycaster for Direct Acupoint Dot Clicking & Anatomical Region Interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Track pointerdown to distinguish turning/orbiting drags from genuine clicks
    let pointerDownPos = { x: 0, y: 0, hasDown: false };
    const handlePointerDown = (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY, hasDown: true };
    };

    const handleCanvasClick = (e) => {
      // If user moved/dragged more than 8px while holding down, it was an orbit/turn drag!
      // In that case, ABORT immediately so turning/orbiting NEVER triggers a body part zoom!
      if (pointerDownPos.hasDown) {
        const dx = e.clientX - pointerDownPos.x;
        const dy = e.clientY - pointerDownPos.y;
        const dragDist = Math.hypot(dx, dy);
        pointerDownPos.hasDown = false;
        if (dragDist > 8) {
          return; // User was freely turning/orbiting the 3D model
        }
      }

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // 1. Highest Priority: Direct click on an Acupoint Pin Dot or Callout Badge
      // Only consider hitboxes whose parent pin is visibly scaled up (> 0.2)
      const visibleHitboxes = interactiveAcupointMeshes.filter(m => {
        let parent = m.parent;
        while (parent) {
          if (parent.scale && parent.scale.x < 0.2) return false;
          parent = parent.parent;
        }
        return true;
      });
      const intersects = raycaster.intersectObjects(visibleHitboxes, true);
      if (intersects.length > 0) {
        const hitIdx = intersects[0].object.userData.acupointIdx;
        console.log('[AcuClick] Hit pin hitbox idx:', hitIdx, CLINICAL_ACUPOINTS[hitIdx]?.code);
        if (typeof hitIdx === 'number') {
          triggerAcupointCloseUp(hitIdx);
          return;
        }
      }

      // 2. Second Priority: Direct click on the 3D Human Body Anatomy
      // ONLY test against the skinned mesh itself (recursive = false), NEVER against child lines/sprites!
      if (bodyModelMeshRef.current) {
        const bodyHits = raycaster.intersectObject(bodyModelMeshRef.current, false);
        if (bodyHits.length > 0) {
          const hitObj = bodyHits[0].object;
          const worldPt = bodyHits[0].point;
          const localHit = bodyModelMeshRef.current.worldToLocal(worldPt.clone());
          const lx = localHit.x;
          const ly = localHit.y;
          const lz = localHit.z;
          console.log('[AcuClick] HitObj:', hitObj.name || hitObj.type, 'WorldPt:', { x: Number(worldPt.x.toFixed(3)), y: Number(worldPt.y.toFixed(3)), z: Number(worldPt.z.toFixed(3)) }, 'LocalHit:', { lx: Number(lx.toFixed(3)), ly: Number(ly.toFixed(3)), lz: Number(lz.toFixed(3)) });

          // 1. Head / Cranial Crown (local Y > 0.80)
          if (ly > 0.80) {
            console.log('[AcuClick] -> Region: crown');
            const crownPtIdx = CLINICAL_ACUPOINTS.findIndex(p => p.region === 'crown');
            triggerAcupointCloseUp(crownPtIdx !== -1 ? crownPtIdx : 0);
          }
          // 2. Neck / Occipital Cervical Region (local Y between 0.58 and 0.80, medial |X| < 0.12)
          else if (ly >= 0.58 && Math.abs(lx) < 0.12) {
            console.log('[AcuClick] -> Region: neck');
            const neckPtIdx = CLINICAL_ACUPOINTS.findIndex(p => p.region === 'neck');
            triggerAcupointCloseUp(neckPtIdx !== -1 ? neckPtIdx : 0);
          }
          // 3. Arms / Forearms / Hands (|X| > 0.15 and ly < 0.42)
          else if (Math.abs(lx) > 0.15 && ly < 0.42) {
            console.log('[AcuClick] -> Region: hand');
            const armPtIdx = CLINICAL_ACUPOINTS.findIndex(p => p.region === 'hand');
            triggerAcupointCloseUp(armPtIdx !== -1 ? armPtIdx : 0);
          }
          // 4. Lower Limbs / Legs (local Y < -0.05, medial |X| <= 0.15)
          else if (ly < -0.05 && Math.abs(lx) <= 0.15) {
            console.log('[AcuClick] -> Region: leg');
            const legPtIdx = CLINICAL_ACUPOINTS.findIndex(p => p.region === 'leg');
            triggerAcupointCloseUp(legPtIdx !== -1 ? legPtIdx : 0);
          }
          // 5. Torso / Back / Spine (local Y between -0.05 and 0.58, |X| <= 0.15)
          else {
            console.log('[AcuClick] -> Region: back');
            const backPtIdx = CLINICAL_ACUPOINTS.findIndex(p => p.region === 'back');
            triggerAcupointCloseUp(backPtIdx !== -1 ? backPtIdx : 0);
          }
        }
      }
    };
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
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

      // Smooth Spring Scale Interpolation for Popping Up Acupoints Sequentially Across All Regions
      if (allPinObjectsRef.current) {
        allPinObjectsRef.current.forEach(pin => {
          const ts = pin.userData.targetScale ?? 0.0;
          pin.userData.currentScale = (pin.userData.currentScale ?? 0.0) + (ts - (pin.userData.currentScale ?? 0.0)) * 0.14;
          const s = Math.max(0, pin.userData.currentScale);
          pin.scale.set(s, s, s);
        });
      }

      // Smooth Camera & Controls Interpolation towards Target Framing (Only during active tweens!)
      if (isCameraAnimatingRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.07);
        controls.target.lerp(targetLookAtRef.current, 0.07);
        if (
          camera.position.distanceTo(targetCamPosRef.current) < 0.005 &&
          controls.target.distanceTo(targetLookAtRef.current) < 0.005
        ) {
          camera.position.copy(targetCamPosRef.current);
          controls.target.copy(targetLookAtRef.current);
          isCameraAnimatingRef.current = false;
        }
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
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
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
      className="relative w-full h-full overflow-hidden bg-[#f8fafc] select-none font-sans"
    >
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* ===================================================================== */}
      {/* HUD OVERLAY INTERFACE (LIGHT LUXURY CLINICAL THEME)                    */}
      {/* ===================================================================== */}

      {/* Top Header Bar: Clean & Minimalist */}
      <div className="absolute top-3 inset-x-3 z-30 flex items-center justify-between pointer-events-none gap-2">
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <div className="flex items-center gap-2 p-2 px-3.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-xs font-bold text-[#09090b] shadow-sm font-display">
            <span className="w-2 h-2 rounded-full bg-[#e02868] animate-pulse" />
            <span className="tracking-wide">ARURA 3D CLINICAL ANATOMY</span>
          </div>
          <button
            type="button"
            onClick={() => navigateCameraToRegion('full')}
            className="px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white border border-neutral-200/90 text-neutral-700 hover:text-[#09090b] text-xs font-semibold transition shadow-sm flex items-center gap-1.5"
            title="Reset Camera to Whole Body"
          >
            <User className="w-3.5 h-3.5 text-[#e02868]" />
            <span>Reset View</span>
          </button>
        </div>

        {/* Top Right Action: Toggles & Flip Front/Back */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Strata Viewport Toggle */}
          <button
            type="button"
            onClick={() => setShowStrataPip(!showStrataPip)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition shadow-sm ${
              showStrataPip ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white/95 text-neutral-700 border-neutral-200/90 hover:bg-white'
            }`}
            title="Toggle 3D Skin Layers Microscopy"
          >
            <Layers className="w-3.5 h-3.5 text-[#e02868]" />
            <span className="hidden sm:inline">3D Strata</span>
          </button>

          {/* Instrument Tray Toggle */}
          <button
            type="button"
            onClick={() => setShowInstrumentTray(!showInstrumentTray)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition shadow-sm ${
              showInstrumentTray ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white/95 text-neutral-700 border-neutral-200/90 hover:bg-white'
            }`}
            title="Toggle Clinical Instrument Tray"
          >
            <Disc className="w-3.5 h-3.5 text-[#e02868]" />
            <span className="hidden sm:inline">Tool Tray</span>
          </button>

          <button
            type="button"
            onClick={toggleBodyFacing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white border border-neutral-200/90 text-xs font-semibold text-neutral-700 hover:text-[#09090b] transition shadow-sm"
            title="Turn Body 180°"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#e02868]" />
            <span>{bodyFacing === 'front' ? 'Front' : 'Back'}</span>
          </button>
        </div>
      </div>

      {/* Left Panel: Acupoints & Strata Pathology (w-56) */}
      <div className="absolute top-14 left-3 z-30 flex flex-col space-y-2 pointer-events-auto w-56 max-h-[calc(100%-140px)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Acupoints Grid */}
        <div className="bg-white/95 backdrop-blur-md border border-neutral-200/90 p-3 rounded-2xl shadow-md space-y-2">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
              <User className="w-3 h-3 text-[#e02868]" />
              <span>3D Body Acupoints</span>
            </span>
            <span className="text-[9px] text-[#e02868] font-mono font-bold">
              Click to Zoom
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CLINICAL_ACUPOINTS.map((pt, idx) => {
              const isSelected = selectedAcupointIdx === idx;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => handleSelectAcupoint(idx)}
                  className={`p-2 rounded-xl text-left border transition ${
                    isSelected
                      ? 'bg-[#e02868] text-white border-[#e02868] font-bold shadow-md'
                      : 'bg-neutral-50/80 text-neutral-700 border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <div className="text-xs font-bold">{pt.code}</div>
                  <div className="text-[9px] opacity-80 truncate">{pt.translation} • {pt.depthTarget}mm</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pathology Selector */}
        <div className="bg-white/95 backdrop-blur-md border border-neutral-200/90 p-3 rounded-2xl shadow-md space-y-2">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-amber-500" />
              <span>Strata Pathology</span>
            </span>
            <span className="text-[9px] text-amber-600 font-mono font-bold">
              Tissue Target
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
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
                      triggerAcupointCloseUp(selectedAcupointIdx);
                    }
                  }}
                  className={`flex items-center justify-between p-2 rounded-xl text-left border transition ${
                    isSelected
                      ? 'bg-[#e02868] text-white border-[#e02868] font-bold shadow-md'
                      : 'bg-neutral-50/80 text-neutral-700 border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{prob.name}</div>
                    <div className="text-[9px] opacity-80">{prob.layer.split(' ')[0]}</div>
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-neutral-200/60 text-neutral-700'
                  }`}>
                    {prob.depthTarget}{prob.depthUnit.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Clinical Anatomy Intelligence Card (Docked on Left) */}
      <div className="absolute bottom-3 left-3 z-20 pointer-events-auto max-w-xs hidden lg:block">
        <div className="bg-white/95 backdrop-blur-md border border-neutral-200/90 p-3 rounded-2xl shadow-xl space-y-2 text-[#09090b]">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeAcupoint.colorHex || '#e02868' }} />
              <h4 className="text-xs font-bold text-[#09090b]">
                {activeAcupoint.translation} — {activeAcupoint.fullName}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-[#e02868] font-bold">
              Target: {activeAcupoint.depthTarget}mm
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
              <div className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Nerve:</span>
              </div>
              <div className="text-neutral-700 text-[10px] font-medium leading-tight truncate" title={activeAcupoint.nerves}>
                {activeAcupoint.nerves}
              </div>
            </div>

            <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
              <div className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                <span>Vessel:</span>
              </div>
              <div className="text-neutral-700 text-[10px] font-medium leading-tight truncate" title={activeAcupoint.vessels}>
                {activeAcupoint.vessels}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-neutral-600 flex items-center gap-1.5 pt-1.5 border-t border-neutral-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e02868] shrink-0" />
            <span className="truncate"><strong>Relief:</strong> {activeAcupoint.relief}</span>
          </div>
        </div>
      </div>

      {/* Top-Right: 3D Tissue Strata Microscopy PiP (Meshy AI Skin Layers Model) */}
      {showStrataPip && (
        <SkinLayersPip
          activeTool={activeTool}
          depth={interactiveDepth}
          maxDepth={activeTool === 'needle' ? 15.0 : activeTool === 'cup' ? 6.0 : 43.0}
          targetDepth={activeAcupoint.depthTarget || 12.0}
          pointCode={activeAcupoint.code}
          pointName={activeAcupoint.translation}
          isDisintegrated={isDisintegrated}
          isSnapping={isSnapping}
          onDepthChange={handleInteractiveChange}
          onReset={handleReset}
          onClose={() => setShowStrataPip(false)}
          isMuted={isMuted}
          playAcuSound={playAcuSound}
        />
      )}

      {/* Bottom-Center: Sterile Clinical Instrument Tray */}
      {showInstrumentTray && (
        <ClinicalInstrumentTray
          activeTool={activeTool}
          onSelectTool={handleSelectTool}
          depth={interactiveDepth}
          onDepthChange={handleInteractiveChange}
          isDisintegrated={isDisintegrated}
          onReset={handleReset}
          pointCode={activeAcupoint.code}
          pointName={activeAcupoint.translation}
        />
      )}

      {/* POST-TREATMENT SUCCESS CARD (Thanos Disintegration Complete - Non-blocking floating banner) */}
      {isDisintegrated && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 max-w-md w-[92%] sm:w-auto bg-white/95 backdrop-blur-md border border-[#e02868]/40 p-4 rounded-2xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-4 pointer-events-auto">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-2">
            <div className="flex items-center gap-2 text-[#e02868]">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span className="text-[11px] font-bold tracking-wider uppercase font-mono">
                {activeTool === 'needle' ? 'De-Qi Resonance • Motor Knot Cured' : activeTool === 'cup' ? 'Fascia Decompressed' : 'Cold Stasis Dispelled'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-neutral-400 hover:text-neutral-700 p-1 rounded-lg transition"
              title="Dismiss Notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-left space-y-1">
            <h4 className="text-sm font-black text-neutral-900">
              {currentProb.reliefTitle}
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {currentProb.reliefText}
            </p>
          </div>

          {/* Test Compatibility: Myofascial Adhesion Unlocked indicator */}
          {selectedProblemIdx === 1 && (
            <div className="text-xs text-purple-600 font-bold">
              Myofascial Adhesion Unlocked
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-200/80 text-center">
            <div>
              <div className="text-[9px] text-neutral-500 uppercase font-mono">Myofascial Knot</div>
              <div className="text-xs font-bold text-[#e02868]">0% Restored</div>
            </div>
            <div>
              <div className="text-[9px] text-neutral-500 uppercase font-mono">De-Qi Pulse</div>
              <div className="text-xs font-bold text-[#e02868]">+380% Active</div>
            </div>
            <div>
              <div className="text-[9px] text-neutral-500 uppercase font-mono">Endorphins</div>
              <div className="text-xs font-bold text-[#e02868]">Vagal Tone</div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleReset}
              className="py-1.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-700 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Treat Another 3D Pathology</span>
            </button>
            {onOpenBooking && (
              <button
                type="button"
                onClick={onOpenBooking}
                className="py-1.5 px-3 rounded-xl bg-[#e02868] hover:bg-[#c21e54] text-white text-xs font-bold transition shadow-sm"
              >
                Book In-Clinic Care
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
