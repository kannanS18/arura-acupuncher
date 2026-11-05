import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SkinLayersPip from './SkinLayersPip';
import { CLINICAL_ACUPOINTS, ACUPOINT_CLOSEUPS } from './acupointsData';
export { CLINICAL_ACUPOINTS, ACUPOINT_CLOSEUPS };
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
  Boxes,
  RefreshCw,
  Flame,
  X
} from 'lucide-react';

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

// Procedural Razor-Sharp 2D Pinpoint Skin Dot Texture (Compact, High-Precision, No Oversized Halos)
function createSkinDotTexture(color = '#e02868', isSelected = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const cx = 32;
  const cy = 32;

  if (isSelected) {
    // Clean, crisp selection pulse aura
    const aura = ctx.createRadialGradient(cx, cy, 14, cx, cy, 30);
    aura.addColorStop(0, 'rgba(224, 40, 104, 0.75)');
    aura.addColorStop(1, 'rgba(224, 40, 104, 0.0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  // 1. Solid Outer Shadow Border for contrast against porcelain mannequin
  ctx.beginPath();
  ctx.arc(cx, cy, 22, 0, Math.PI * 2);
  ctx.fillStyle = '#881337';
  ctx.fill();

  // 2. Vibrant Solid Arura Rose Disc Foundation
  ctx.beginPath();
  ctx.arc(cx, cy, 19, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  // 3. Thin Crisp White Contrast Ring
  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 4. Center Micro-Glint Highlight (Pinpoint center)
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

const REGION_DISPLAY_NAMES = {
  arm_right: 'RIGHT ARM',
  arm_left: 'LEFT ARM',
  arm: 'ARM',
  neck: 'NECK',
  face: 'FACE',
  crown: 'HEAD',
  back: 'BACK',
  leg_right: 'RIGHT LEG',
  leg_left: 'LEFT LEG',
  leg: 'LEG',
  hand: 'HAND',
  full: 'BODY'
};

// Helper: Create 3D Canvas Badge for Anatomical Acupoint Callouts with Region Tag (100% English)
function createCalloutBadgeCanvas(code, englishName, subInfo, isSelected, regionLabel) {
  const canvas = document.createElement('canvas');
  canvas.width = 260;
  canvas.height = 76;
  const ctx = canvas.getContext('2d');

  // Pill card background
  ctx.fillStyle = isSelected ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.94)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(4, 4, 252, 68, 14);
  } else {
    ctx.rect(4, 4, 252, 68);
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
    ctx.roundRect(12, 12, 62, 52, 10);
  } else {
    ctx.rect(12, 12, 62, 52);
  }
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(code, 43, 38);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  if (regionLabel) {
    // 1. Bold Uppercase Region Name Tag
    ctx.fillStyle = isSelected ? '#e02868' : '#be123c';
    ctx.font = '800 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`• ${regionLabel.toUpperCase()}`, 82, 22);

    // 2. Primary English Name in bold
    ctx.fillStyle = '#09090b';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(englishName || code, 82, 41);

    // 3. Subtitle: Pinyin + Target Needle Depth in English
    ctx.fillStyle = '#64748b';
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(subInfo ? `Target: ${subInfo}` : 'Clinical Target', 82, 58);
  } else {
    // Primary English Name in bold
    ctx.fillStyle = '#09090b';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(englishName || code, 82, 34);

    // Subtitle: Pinyin + Target Needle Depth in English
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(subInfo ? `Target: ${subInfo}` : 'Clinical Target', 82, 53);
  }

  return canvas;
}

// ============================================================================
// HOLOGRAPHIC NEEDLE DEPTH GAUGE & PHYSICAL SURGICAL INSTRUMENT TRAY HELPERS
// ============================================================================

// 3D In-Scene Holographic Gauge Mounted Directly on Tool Handle (Needle, Cup, Moxa)
function createToolDepthBadgeCanvas(toolId, value, targetValue, isCured, painName) {
  const canvas = document.createElement('canvas');
  canvas.width = 280;
  canvas.height = 76;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = isCured ? 'rgba(6, 78, 59, 0.95)' : 'rgba(15, 23, 42, 0.93)';
  ctx.strokeStyle = isCured ? '#10b981' : '#e02868';
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(4, 4, 272, 68, 16);
  } else {
    ctx.rect(4, 4, 272, 68);
  }
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (isCured) {
    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('✓ PAIN DISSOLVED', 140, 24);
    ctx.font = '600 12px monospace';
    ctx.fillStyle = '#a7f3d0';
    ctx.fillText(painName ? `${painName.slice(0, 32)}` : 'Spasm Vanished • De-Qi', 140, 50);
  } else if (toolId === 'cup') {
    if (value <= 0.1) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('↕ DRAG TO SUCTION', 140, 24);
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`Target: 6.0mm Lift • Vacuum`, 140, 50);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px monospace';
      ctx.fillText(`${value.toFixed(1)} mm lift`, 140, 26);
      ctx.font = '600 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#7dd3fc';
      ctx.fillText(`Fascial Decompression`, 140, 50);
    }
  } else if (toolId === 'moxa') {
    if (value <= 22) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('↕ DRAG TO WARM', 140, 24);
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#fb923c';
      ctx.fillText(`Target: 43°C • Herbal Moxa`, 140, 50);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px monospace';
      ctx.fillText(`${value.toFixed(0)} °C`, 140, 26);
      ctx.font = '600 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#fdba74';
      ctx.fillText(`Infrared Thermogenesis`, 140, 50);
    }
  } else {
    // Needle
    if (value <= 0.1) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('↕ DRAG TO STAB', 140, 24);
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#fb7185';
      ctx.fillText(`Target: ${targetValue}mm • Needle`, 140, 50);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px monospace';
      ctx.fillText(`${value.toFixed(1)} mm`, 140, 26);
      ctx.font = '600 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#fda4af';
      ctx.fillText(`Target: ${targetValue}mm • Motor Endplate`, 140, 50);
    }
  }

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
  const [viewMode, setViewMode] = useState('body'); // 'body' | 'tissue'

  // Guarantee document scrolling is completely untampered and clean
  useEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);
  const [isMuted, setIsMuted] = useState(false);
  const [activeRegion, setActiveRegion] = useState('full'); // Start centered on Whole Body!
  const filteredAcupoints = activeRegion === 'full' 
    ? CLINICAL_ACUPOINTS 
    : CLINICAL_ACUPOINTS.filter(p => p.region === activeRegion); // Start centered on Whole Body!
  const activeRegionRef = useRef('full');
  useEffect(() => {
    activeRegionRef.current = activeRegion;
  }, [activeRegion]);

  const activeToolRef = useRef('needle');
  activeToolRef.current = activeTool;
  const triggerAcupointCloseUpRef = useRef(null);
  const handleSelectToolRef = useRef(null);
  const navigateCameraToRegionRef = useRef(null);

  const [isExploded, setIsExploded] = useState(false); // Toggle between Zero Gap & Exploded View
  const [bodyFacing, setBodyFacing] = useState('back'); // 'front' or 'back'
  const [showStrataPip, setShowStrataPip] = useState(true);

  const isHoldingRef = useRef(false);
  const holdTimerRef = useRef(null);

  const activeAcupoint = CLINICAL_ACUPOINTS[selectedAcupointIdx] || CLINICAL_ACUPOINTS[0];
  const currentProb = CLINICAL_PROBLEMS[selectedProblemIdx];

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const isCameraAnimatingRef = useRef(false);
  const camStartPosRef = useRef(new THREE.Vector3(0.0, 0.34, 4.2));
  const camStartLookAtRef = useRef(new THREE.Vector3(0.0, 0.34, 0.0));
  const camAnimProgressRef = useRef(1.0);
  const targetCamPosRef = useRef(new THREE.Vector3(0.0, 0.34, 4.2));
  const targetLookAtRef = useRef(new THREE.Vector3(0.0, 0.34, 0.0));

  // 3D Groups
  const bodyGroupRef = useRef(null);
  const bodyModelMeshRef = useRef(null);
  const bonesRef = useRef(null);
  const targetLimbAnglesRef = useRef({ armL: 0.0, armR: 0.0, legL: 0.0, legR: 0.0 });
  const currentLimbAnglesRef = useRef({ armL: 0.0, armR: 0.0, legL: 0.0, legR: 0.0 });
  const leftShoulderPivotRef = useRef(new THREE.Vector3(0.196, 0.376, -0.097));
  const rightShoulderPivotRef = useRef(new THREE.Vector3(-0.218, 0.378, -0.009));
  const leftHipPivotRef = useRef(new THREE.Vector3(0.100, -0.250, 0.000));
  const rightHipPivotRef = useRef(new THREE.Vector3(-0.100, -0.250, 0.000));
  const limbUniformsRef = useRef({
    uArmLAngle: { value: 0.0 },
    uArmRAngle: { value: 0.0 },
    uLegLAngle: { value: 0.0 },
    uLegRAngle: { value: 0.0 },
    uLeftShoulderPivot: { value: new THREE.Vector3(0.196, 0.376, -0.097) },
    uRightShoulderPivot: { value: new THREE.Vector3(-0.218, 0.378, -0.009) },
    uLeftHipPivot: { value: new THREE.Vector3(0.100, -0.250, 0.000) },
    uRightHipPivot: { value: new THREE.Vector3(-0.100, -0.250, 0.000) }
  });
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

  // Physical 3D Tool Assembly on Human Body Refs
  const bodyToolAssemblyRef = useRef(null);
  const needleBodyToolRef = useRef(null);
  const needleShaftGroupRef = useRef(null);
  const needleHoloBadgeRef = useRef(null);
  const needleHandleHitboxesRef = useRef([]);
  const cupBodyToolRef = useRef(null);
  const cupFleshBulgeRef = useRef(null);
  const cupErythemaRingRef = useRef(null);
  const cupHoloSpriteRef = useRef(null);
  const moxaBodyToolRef = useRef(null);
  const moxaThermalRingRef = useRef(null);
  const moxaHoloSpriteRef = useRef(null);
  const moxaThermalLightRef = useRef(null);
  const deqiWaveRingRef = useRef(null);
  const bodyThanosParticlesRef = useRef(null);
  const [filterRegion, setFilterRegion] = useState('all');

  // Physical 3D Surgical Tray Refs
  const physicalTrayGroupRef = useRef(null);
  const trayToolHitboxesRef = useRef([]);
  const trayHaloMeshesRef = useRef({});
  const trayLabelSpritesRef = useRef({});

  // Direct Stabbing Pointer State
  const isStabbingRef = useRef(false);
  const stabStartYRef = useRef(0);
  const stabStartDepthRef = useRef(0);
  const interactiveDepthRef = useRef(0);
  useEffect(() => {
    interactiveDepthRef.current = interactiveDepth;
  }, [interactiveDepth]);

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

  // Update Body Tool Placement & Physical Tray Selection
  const updateBodyToolPlacement = useCallback((acupointIdx, toolId) => {
    const pt = CLINICAL_ACUPOINTS[acupointIdx];
    if (!pt || !bodyToolAssemblyRef.current) return;

    const assembly = bodyToolAssemblyRef.current;
    assembly.visible = false; // Zero tools on the 3D man model!
    assembly.position.set(pt.modelPos[0], pt.modelPos[1], pt.modelPos[2]);

    const normalVec = new THREE.Vector3(pt.surfaceNormal[0], pt.surfaceNormal[1], pt.surfaceNormal[2]).normalize();
    const defaultUp = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(defaultUp, normalVec);
    assembly.setRotationFromQuaternion(quat);

    if (needleBodyToolRef.current) {
      needleBodyToolRef.current.visible = (toolId === 'needle');
    }
    if (cupBodyToolRef.current) {
      cupBodyToolRef.current.visible = (toolId === 'cup');
    }
    if (moxaBodyToolRef.current) {
      moxaBodyToolRef.current.visible = (toolId === 'moxa');
    }

    // Refresh gauges with this acupoint's authentic pain name
    if (needleHoloBadgeRef.current && needleHoloBadgeRef.current.material) {
      needleHoloBadgeRef.current.material.map = new THREE.CanvasTexture(
        createToolDepthBadgeCanvas('needle', 0, pt.depthTarget, false, pt.painName)
      );
    }
    if (cupHoloSpriteRef.current && cupHoloSpriteRef.current.material) {
      cupHoloSpriteRef.current.material.map = new THREE.CanvasTexture(
        createToolDepthBadgeCanvas('cup', 0, 6.0, false, pt.painName)
      );
    }
    if (moxaHoloSpriteRef.current && moxaHoloSpriteRef.current.material) {
      moxaHoloSpriteRef.current.material.map = new THREE.CanvasTexture(
        createToolDepthBadgeCanvas('moxa', 20, 43.0, false, pt.painName)
      );
    }

    // Update highlights on Physical 3D Tray
    const halos = trayHaloMeshesRef.current;
    if (halos.needle) halos.needle.material.opacity = (toolId === 'needle' ? 0.85 : 0.0);
    if (halos.cup) halos.cup.material.opacity = (toolId === 'cup' ? 0.85 : 0.0);
    if (halos.moxa) halos.moxa.material.opacity = (toolId === 'moxa' ? 0.85 : 0.0);

    const labels = trayLabelSpritesRef.current;
    if (labels.needle) {
      labels.needle.material.map.image = createTrayToolLabelCanvas('0.18mm Needle', 'Solid Seirin', toolId === 'needle');
      labels.needle.material.map.needsUpdate = true;
    }
    if (labels.cup) {
      labels.cup.material.map.image = createTrayToolLabelCanvas('Glass Cup', 'Vacuum Fire', toolId === 'cup');
      labels.cup.material.map.needsUpdate = true;
    }
    if (labels.moxa) {
      labels.moxa.material.map.image = createTrayToolLabelCanvas('Herbal Moxa', 'Warm Artemisia', toolId === 'moxa');
      labels.moxa.material.map.needsUpdate = true;
    }
  }, []);

  // Apply Needle Depth & Skin Physics across all tools
  const applySkinPhysicsAndToolHeight = useCallback((val) => {
    const curPt = CLINICAL_ACUPOINTS[selectedAcupointIdx] || CLINICAL_ACUPOINTS[0];
    const curTool = activeToolRef.current;

    // 1. Synchronize 3D Tools on Human Body Mesh with distinct visual effects
    if (curTool === 'needle') {
      if (needleShaftGroupRef.current) {
        const pen = (val / 15.0) * 0.024;
        needleShaftGroupRef.current.position.y = -pen;
      }
      if (needleHoloBadgeRef.current && needleHoloBadgeRef.current.material) {
        needleHoloBadgeRef.current.material.map.image = createToolDepthBadgeCanvas('needle', val, curPt.depthTarget, isDisintegrated, curPt.painName);
        needleHoloBadgeRef.current.material.map.needsUpdate = true;
      }
      if (deqiWaveRingRef.current) {
        deqiWaveRingRef.current.visible = (val >= (curPt.depthTarget - 0.5));
        deqiWaveRingRef.current.material.opacity = 0.85;
      }
    } else if (curTool === 'cup') {
      const suctionRatio = Math.min(1.0, val / 6.0);
      if (cupFleshBulgeRef.current) {
        cupFleshBulgeRef.current.scale.y = 0.2 + suctionRatio * 1.8;
      }
      if (cupErythemaRingRef.current) {
        cupErythemaRingRef.current.material.opacity = suctionRatio * 0.85;
      }
      if (cupHoloSpriteRef.current && cupHoloSpriteRef.current.material) {
        cupHoloSpriteRef.current.material.map.image = createToolDepthBadgeCanvas('cup', val, 6.0, isDisintegrated, curPt.painName);
        cupHoloSpriteRef.current.material.map.needsUpdate = true;
      }
    } else if (curTool === 'moxa') {
      const heatRatio = Math.min(1.0, Math.max(0, (val - 20.0) / 23.0));
      if (moxaThermalLightRef.current) {
        moxaThermalLightRef.current.intensity = heatRatio * 2.5;
      }
      if (moxaThermalRingRef.current) {
        moxaThermalRingRef.current.material.opacity = heatRatio * 0.80;
      }
      if (moxaHoloSpriteRef.current && moxaHoloSpriteRef.current.material) {
        moxaHoloSpriteRef.current.material.map.image = createToolDepthBadgeCanvas('moxa', val, 43.0, isDisintegrated, curPt.painName);
        moxaHoloSpriteRef.current.material.map.needsUpdate = true;
      }
    }

    // 2. Strata Block meshes (if visible)
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
  }, [activeTool, currentProb.depthTarget, isDisintegrated]);

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

    // Spawn 5,000 Thanos 3D Particles at target location in strata
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

    // Spawn 2,000 Thanos 3D Ash Particles directly on the Human Body Mesh!
    const bPData = bodyThanosParticlesRef.current;
    if (bPData) {
      bPData.active = true;
      bPData.timer = 0;
      bPData.mat.opacity = 1.0;
    }

    // Update in-scene gauges to display CURED / DISSOLVED state
    const curPt = CLINICAL_ACUPOINTS[selectedAcupointIdx] || CLINICAL_ACUPOINTS[0];
    if (needleHoloBadgeRef.current && needleHoloBadgeRef.current.material) {
      needleHoloBadgeRef.current.material.map.image = createToolDepthBadgeCanvas('needle', 15.0, curPt.depthTarget, true, curPt.painName);
      needleHoloBadgeRef.current.material.map.needsUpdate = true;
    }
    if (cupHoloSpriteRef.current && cupHoloSpriteRef.current.material) {
      cupHoloSpriteRef.current.material.map.image = createToolDepthBadgeCanvas('cup', 6.0, 6.0, true, curPt.painName);
      cupHoloSpriteRef.current.material.map.needsUpdate = true;
    }
    if (moxaHoloSpriteRef.current && moxaHoloSpriteRef.current.material) {
      moxaHoloSpriteRef.current.material.map.image = createToolDepthBadgeCanvas('moxa', 43.0, 43.0, true, curPt.painName);
      moxaHoloSpriteRef.current.material.map.needsUpdate = true;
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

    const curPt = CLINICAL_ACUPOINTS[selectedAcupointIdx] || CLINICAL_ACUPOINTS[0];
    const targetThreshold = activeTool === 'needle'
      ? (curPt.depthTarget || 12.0) - 0.2
      : activeTool === 'cup' ? 5.8 : 42.0;

    if (val >= targetThreshold && !isDisintegrated && !isSnapping) {
      triggerThanosDisintegration();
    }
  }, [activeTool, selectedAcupointIdx, isDisintegrated, isSnapping, isMuted, applySkinPhysicsAndToolHeight, triggerThanosDisintegration]);

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
    activeRegionRef.current = regionKey;
    setFilterRegion(regionKey === 'full' ? 'all' : regionKey);
    isCameraAnimatingRef.current = true;

    if (regionKey === 'full') {
      // Return all limbs to resting standing anatomical pose
      targetLimbAnglesRef.current.armL = 0.0;
      targetLimbAnglesRef.current.armR = 0.0;
      targetLimbAnglesRef.current.legL = 0.0;
      targetLimbAnglesRef.current.legR = 0.0;

      targetCamPosRef.current.set(0.0, 0.32, 3.8);
      targetLookAtRef.current.set(0.0, 0.32, 0.0);
      if (bodyModelMeshRef.current) {
        bodyModelMeshRef.current.rotation.y = 0;
        setBodyFacing('front');
      }
      if (cameraRef.current && controlsRef.current) {
        camStartPosRef.current.copy(cameraRef.current.position);
        camStartLookAtRef.current.copy(controlsRef.current.target);
        camAnimProgressRef.current = 0.0;
        isCameraAnimatingRef.current = true;
      }
      // Reveal all pins across whole body (unclickable until a limb is clicked)
      setTimeout(() => {
        if (allPinObjectsRef.current) {
          allPinObjectsRef.current.forEach(pin => {
            pin.userData.targetScale = 1.0;
            if (pin.userData.badge) pin.userData.badge.visible = false;
            if (pin.userData.leaderLine) pin.userData.leaderLine.visible = false;
          });
        }
      }, 200);
      return;
    }

    // First fold down all pins
    if (allPinObjectsRef.current) {
      allPinObjectsRef.current.forEach(pin => {
        pin.userData.targetScale = 0.0;
        if (pin.userData.badge) pin.userData.badge.visible = false;
        if (pin.userData.leaderLine) pin.userData.leaderLine.visible = false;
      });
    }

    let targetFacing = 'front';
    if (regionKey === 'face' || regionKey === 'crown') {
      targetLimbAnglesRef.current.armL = 0.0;
      targetLimbAnglesRef.current.armR = 0.0;
      targetLimbAnglesRef.current.legL = 0.0;
      targetLimbAnglesRef.current.legR = 0.0;
      targetCamPosRef.current.set(0.0, 1.00, 0.48);
      targetLookAtRef.current.set(0.0, 0.96, 0.06);
      targetFacing = 'front';
    } else if (regionKey === 'neck') {
      targetLimbAnglesRef.current.armL = 0.0;
      targetLimbAnglesRef.current.armR = 0.0;
      targetLimbAnglesRef.current.legL = 0.0;
      targetLimbAnglesRef.current.legR = 0.0;
      targetCamPosRef.current.set(0.0, 0.88, -0.46);
      targetLookAtRef.current.set(0.0, 0.84, -0.06);
      targetFacing = 'back';
    } else if (regionKey === 'arm_left' || regionKey === 'hand' || regionKey === 'arm') {
      // Articulate Left Arm FORWARD by ~84 deg (almost 90 deg!), extending toward viewer!
      targetLimbAnglesRef.current.armL = 1.46;
      targetLimbAnglesRef.current.armR = 0.0;
      targetLimbAnglesRef.current.legL = 0.0;
      targetLimbAnglesRef.current.legR = 0.0;
      // Frame the horizontally extended arm and hand right in front of the viewer
      targetCamPosRef.current.set(0.38, 0.74, 0.62);
      targetLookAtRef.current.set(0.20, 0.70, 0.14);
      targetFacing = 'front';
    } else if (regionKey === 'arm_right') {
      // Articulate Right Arm FORWARD by ~84 deg!
      targetLimbAnglesRef.current.armR = 1.46;
      targetLimbAnglesRef.current.armL = 0.0;
      targetLimbAnglesRef.current.legL = 0.0;
      targetLimbAnglesRef.current.legR = 0.0;
      targetCamPosRef.current.set(-0.38, 0.74, 0.62);
      targetLookAtRef.current.set(-0.20, 0.70, 0.14);
      targetFacing = 'front';
    } else if (regionKey === 'back') {
      targetLimbAnglesRef.current.armL = 0.0;
      targetLimbAnglesRef.current.armR = 0.0;
      targetLimbAnglesRef.current.legL = 0.0;
      targetLimbAnglesRef.current.legR = 0.0;
      targetCamPosRef.current.set(0.0, 0.56, -0.62);
      targetLookAtRef.current.set(0.0, 0.50, -0.08);
      targetFacing = 'back';
    } else if (regionKey === 'leg_left' || regionKey === 'leg') {
      // Articulate Left Leg forward by ~35 deg!
      targetLimbAnglesRef.current.legL = 0.62;
      targetLimbAnglesRef.current.legR = 0.0;
      targetLimbAnglesRef.current.armL = 0.0;
      targetLimbAnglesRef.current.armR = 0.0;
      targetCamPosRef.current.set(0.16, -0.10, 0.68);
      targetLookAtRef.current.set(0.10, -0.18, 0.16);
      targetFacing = 'front';
    } else if (regionKey === 'leg_right') {
      targetLimbAnglesRef.current.legR = 0.62;
      targetLimbAnglesRef.current.legL = 0.0;
      targetLimbAnglesRef.current.armL = 0.0;
      targetLimbAnglesRef.current.armR = 0.0;
      targetCamPosRef.current.set(-0.16, -0.10, 0.68);
      targetLookAtRef.current.set(-0.10, -0.18, 0.16);
      targetFacing = 'front';
    }

    // Set initial look target
    if (bodyModelMeshRef.current) {
      bodyModelMeshRef.current.rotation.y = targetFacing === 'front' ? 0 : Math.PI;
      setBodyFacing(targetFacing);
    }

    if (cameraRef.current && controlsRef.current) {
      camStartPosRef.current.copy(cameraRef.current.position);
      camStartLookAtRef.current.copy(controlsRef.current.target);
      camAnimProgressRef.current = 0.0;
      isCameraAnimatingRef.current = true;
    }

    // Sequentially pop up the acupoint pins for THIS region one-by-one WITH NAMES and crystalline chimes
    if (allPinObjectsRef.current) {
      const regionPins = allPinObjectsRef.current
        .filter(p => p.userData.region === regionKey)
        .sort((a, b) => (a.userData.orderIndex ?? 0) - (b.userData.orderIndex ?? 0));

      regionPins.forEach((pin, i) => {
        setTimeout(() => {
          pin.userData.targetScale = 1.0;
          if (pin.userData.badge) pin.userData.badge.visible = true;
          if (pin.userData.leaderLine) pin.userData.leaderLine.visible = true;
          playAcuSound('popup', isMuted);
        }, 180 + i * 220);
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
  navigateCameraToRegionRef.current = navigateCameraToRegion;

  // Dedicated Point Close-Up Presentation (As requested: "proper close up", physical tray on Mayo stand, skin blob on top right)
  const triggerAcupointCloseUp = useCallback((idx) => {
    const pt = CLINICAL_ACUPOINTS[idx];
    if (!pt) return;

    setSelectedAcupointIdx(idx);
    setActiveRegion(pt.region || 'close');
    setFilterRegion(pt.region || 'all');
    setShowStrataPip(true);
    setViewMode('tissue');
    isCameraAnimatingRef.current = true;

    const mScale = 1.55 / 1.90;
    const worldPt = new THREE.Vector3(
      pt.modelPos[0] * mScale,
      0.32 + pt.modelPos[1] * mScale,
      pt.modelPos[2] * mScale
    );

    targetLookAtRef.current.copy(worldPt);
    const norm = new THREE.Vector3(pt.surfaceNormal[0], pt.surfaceNormal[1], pt.surfaceNormal[2]).normalize();
    targetCamPosRef.current.copy(worldPt).addScaledVector(norm, 0.32);
    targetCamPosRef.current.y += 0.04;

    const targetFacing = pt.facing || 'front';
    if (bodyModelMeshRef.current) {
      bodyModelMeshRef.current.rotation.y = targetFacing === 'front' ? 0 : Math.PI;
      setBodyFacing(targetFacing);
    }

    if (cameraRef.current && controlsRef.current) {
      camStartPosRef.current.copy(cameraRef.current.position);
      camStartLookAtRef.current.copy(controlsRef.current.target);
      camAnimProgressRef.current = 0.0;
      isCameraAnimatingRef.current = true;
    }

    // Highlight and scale up this active pin, fold down other distant pins
    if (allPinObjectsRef.current) {
      allPinObjectsRef.current.forEach((pin, i) => {
        pin.userData.targetScale = (i === idx) ? 1.0 : 0.0;
      });
      playAcuSound('popup', isMuted);
    }

    const toolToKeep = activeToolRef.current || 'needle';
    updateBodyToolPlacement(idx, toolToKeep);
  }, [isMuted, updateBodyToolPlacement]);
  triggerAcupointCloseUpRef.current = triggerAcupointCloseUp;

  // Select Acupoint from Catalog and fly into close-up with 3D Strata & Tray
  const handleSelectAcupoint = useCallback((idx) => {
    handleReset();
    playAcuSound('pickup', isMuted);
    triggerAcupointCloseUp(idx);
  }, [handleReset, isMuted, triggerAcupointCloseUp]);

  // Update active 3D badges when selected acupoint or activeRegion changes (100% English with Region Name)
  useEffect(() => {
    if (badgesRef.current) {
      badgesRef.current.forEach(({ idx, pt, sprite, leaderLine, selRing }) => {
        const isSel = (idx === selectedAcupointIdx);
        const isInActiveRegion = (activeRegion !== 'full' && pt.region === activeRegion);
        const shouldShowBadge = isSel || isInActiveRegion;

        if (selRing) selRing.visible = isSel;
        if (leaderLine) leaderLine.visible = shouldShowBadge;
        if (sprite) {
          sprite.visible = shouldShowBadge;
          if (sprite.material) {
            const regLabel = REGION_DISPLAY_NAMES[pt.region] || pt.region.toUpperCase();
            sprite.material.map = new THREE.CanvasTexture(
              createCalloutBadgeCanvas(pt.code, pt.translation, `${pt.pinyin} • ${pt.depthTarget}mm`, isSel, regLabel)
            );
            sprite.material.needsUpdate = true;
          }
        }
      });
    }
  }, [selectedAcupointIdx, activeRegion]);

  // Select tool on Floating Tray without forcing camera away
  const handleSelectTool = useCallback((toolId) => {
    setActiveTool(toolId);
    const probIdx = toolId === 'needle' ? 0 : toolId === 'cup' ? 1 : 2;
    setSelectedProblemIdx(probIdx);
    handleReset();
    playAcuSound('pickup', isMuted);
    updateBodyToolPlacement(selectedAcupointIdx, toolId);
  }, [handleReset, isMuted, selectedAcupointIdx, updateBodyToolPlacement]);
  handleSelectToolRef.current = handleSelectTool;

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

        // Compute exact anatomical limb vertex weights (Zero risk of torso/pelvis distortion)
        const geo = bodyMesh.geometry;
        const pos = geo.attributes.position.array;
        const vCount = geo.attributes.position.count;
        const idxArr = geo.index ? geo.index.array : null;

        const armLWeights = new Float32Array(vCount);
        const armRWeights = new Float32Array(vCount);
        const legLWeights = new Float32Array(vCount);
        const legRWeights = new Float32Array(vCount);

        if (idxArr) {
          const adj = Array.from({ length: vCount }, () => []);
          for (let i = 0; i < idxArr.length; i += 3) {
            const a = idxArr[i], b = idxArr[i + 1], c = idxArr[i + 2];
            adj[a].push(b, c);
            adj[b].push(a, c);
            adj[c].push(a, b);
          }

          // Left Arm flood fill (0 seam triangles below shoulder - zero trails!)
          let lHandSeed = -1;
          for (let i = 0; i < vCount; i++) {
            if (pos[i * 3] > 0.22 && pos[i * 3 + 1] < -0.05) { lHandSeed = i; break; }
          }
          if (lHandSeed !== -1) {
            const isLA = new Uint8Array(vCount);
            const q = [lHandSeed];
            isLA[lHandSeed] = 1;
            while (q.length > 0) {
              const u = q.shift();
              for (const v of adj[u]) {
                if (!isLA[v]) {
                  const vx = pos[v * 3], vy = pos[v * 3 + 1], vz = pos[v * 3 + 2];
                  let isArm = (vy <= 0.42 && vy >= -0.12) && ((vy >= 0.35 && vx > 0.145) || (vy >= 0.10 && vx > 0.150) || (vy < 0.10 && (vx > 0.170 || (vx > 0.135 && vz > 0.04))));
                  if (isArm) { isLA[v] = 1; q.push(v); }
                }
              }
            }
            for (let i = 0; i < vCount; i++) {
              if (isLA[i]) {
                const vy = pos[i * 3 + 1];
                armLWeights[i] = vy < 0.34 ? 1.0 : Math.max(0.0, Math.min(1.0, (0.42 - vy) / 0.08));
              }
            }
          }

          // Right Arm flood fill (0 seam triangles below shoulder - zero trails!)
          const rHandSeed = 538;
          if (rHandSeed !== -1) {
            const isRA = new Uint8Array(vCount);
            const q = [rHandSeed];
            isRA[rHandSeed] = 1;
            while (q.length > 0) {
              const u = q.shift();
              for (const v of adj[u]) {
                if (!isRA[v]) {
                  const vx = pos[v * 3], vy = pos[v * 3 + 1], vz = pos[v * 3 + 2];
                  let isArm = (vy <= 0.42 && vy >= -0.12) && ((vy >= 0.35 && vx < -0.145) || (vy >= 0.10 && vx < -0.150) || (vy < 0.10 && (vx < -0.170 || (vx < -0.135 && vz > 0.04))));
                  if (isArm) { isRA[v] = 1; q.push(v); }
                }
              }
            }
            for (let i = 0; i < vCount; i++) {
              if (isRA[i]) {
                const vy = pos[i * 3 + 1];
                armRWeights[i] = vy < 0.34 ? 1.0 : Math.max(0.0, Math.min(1.0, (0.42 - vy) / 0.08));
              }
            }
          }

          // Left Leg (strictly below pelvis y < -0.25, x > 0.02)
          for (let i = 0; i < vCount; i++) {
            const x = pos[i * 3], y = pos[i * 3 + 1];
            if (x > 0.02 && y < -0.25) {
              legLWeights[i] = y < -0.29 ? 1.0 : ((-0.25 - y) / 0.04);
            }
            if (x < -0.02 && y < -0.25) {
              legRWeights[i] = y < -0.29 ? 1.0 : ((-0.25 - y) / 0.04);
            }
          }
        }

        geo.setAttribute('aArmLWeight', new THREE.BufferAttribute(armLWeights, 1));
        geo.setAttribute('aArmRWeight', new THREE.BufferAttribute(armRWeights, 1));
        geo.setAttribute('aLegLWeight', new THREE.BufferAttribute(legLWeights, 1));
        geo.setAttribute('aLegRWeight', new THREE.BufferAttribute(legRWeights, 1));

        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0xfdfdfd,
          roughness: 0.22,
          metalness: 0.04,
          flatShading: false
        });

        const uniforms = limbUniformsRef.current;
        bodyMat.customProgramCacheKey = () => 'limb-kinematics-90deg-v4';
        bodyMat.onBeforeCompile = (shader) => {
          bodyMat.userData.compiledShader = shader;
          shader.uniforms.uArmLAngle = uniforms.uArmLAngle;
          shader.uniforms.uArmRAngle = uniforms.uArmRAngle;
          shader.uniforms.uLegLAngle = uniforms.uLegLAngle;
          shader.uniforms.uLegRAngle = uniforms.uLegRAngle;
          shader.uniforms.uLeftShoulderPivot = uniforms.uLeftShoulderPivot;
          shader.uniforms.uRightShoulderPivot = uniforms.uRightShoulderPivot;
          shader.uniforms.uLeftHipPivot = uniforms.uLeftHipPivot;
          shader.uniforms.uRightHipPivot = uniforms.uRightHipPivot;

          shader.vertexShader = shader.vertexShader.replace(
            '#include <common>',
            `#include <common>
            attribute float aArmLWeight;
            attribute float aArmRWeight;
            attribute float aLegLWeight;
            attribute float aLegRWeight;
            uniform float uArmLAngle;
            uniform float uArmRAngle;
            uniform float uLegLAngle;
            uniform float uLegRAngle;
            uniform vec3 uLeftShoulderPivot;
            uniform vec3 uRightShoulderPivot;
            uniform vec3 uLeftHipPivot;
            uniform vec3 uRightHipPivot;

            mat3 rotateX(float angle) {
              float s = sin(angle);
              float c = cos(angle);
              return mat3(
                1.0, 0.0, 0.0,
                0.0, c,   s,
                0.0, -s,  c
              );
            }
            `
          );

          shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `
            #include <begin_vertex>

            // LEFT ARM: rotates almost 90 deg forward (shoulder flexion ~85 deg)
            if (aArmLWeight > 0.0 && uArmLAngle > 0.0001) {
              float ang = -uArmLAngle * aArmLWeight;
              mat3 rot = rotateX(ang);
              transformed = rot * (transformed - uLeftShoulderPivot) + uLeftShoulderPivot;
              #ifdef USE_NORMAL
              objectNormal = rot * objectNormal;
              #endif
            }

            // RIGHT ARM: rotates almost 90 deg forward
            if (aArmRWeight > 0.0 && uArmRAngle > 0.0001) {
              float ang = -uArmRAngle * aArmRWeight;
              mat3 rot = rotateX(ang);
              transformed = rot * (transformed - uRightShoulderPivot) + uRightShoulderPivot;
              #ifdef USE_NORMAL
              objectNormal = rot * objectNormal;
              #endif
            }

            // LEFT LEG: steps forward ~35 deg
            if (aLegLWeight > 0.0 && uLegLAngle > 0.0001) {
              float ang = -uLegLAngle * aLegLWeight;
              mat3 rot = rotateX(ang);
              transformed = rot * (transformed - uLeftHipPivot) + uLeftHipPivot;
              #ifdef USE_NORMAL
              objectNormal = rot * objectNormal;
              #endif
            }

            // RIGHT LEG: steps forward ~35 deg
            if (aLegRWeight > 0.0 && uLegRAngle > 0.0001) {
              float ang = -uLegRAngle * aLegRWeight;
              mat3 rot = rotateX(ang);
              transformed = rot * (transformed - uRightHipPivot) + uRightHipPivot;
              #ifdef USE_NORMAL
              objectNormal = rot * objectNormal;
              #endif
            }
            `
          );
        };

        bodyMesh.material = bodyMat;
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

        // Directly attach all 11 Acupoint Pin Groups to bodyMesh with outward surface-normal offset!
        // Guarantees zero sinking/occlusion into mannequin polygons and 100% lockstep tracking
        CLINICAL_ACUPOINTS.forEach((pt, idx) => {
          const pinGroup = new THREE.Group();
          const pos = pt.modelPos || [0, 0, 0];
          const norm = pt.surfaceNormal || [0, 0, 1];
          const nLen = Math.hypot(norm[0], norm[1], norm[2]) || 1;
          const offX = (norm[0] / nLen) * 0.012;
          const offY = (norm[1] / nLen) * 0.012;
          const offZ = (norm[2] / nLen) * 0.012;
          pinGroup.position.set(pos[0] + offX, pos[1] + offY, pos[2] + offZ);
          pinGroup.scale.set(1, 1, 1); // Visible in normal state!
          pinGroup.userData = {
            targetScale: 1.0,
            currentScale: 1.0,
            acupointIdx: idx,
            region: pt.region,
            orderIndex: pt.orderIndex ?? 0,
            baseLocalPos: pinGroup.position.clone()
          };

          // Crisp 2D Pinpoint Dot flush on skin (Camera-facing high-visibility sprite, depthTest: false so it never clips)
          const dotMat = new THREE.SpriteMaterial({ map: skinDotTex, depthTest: false, depthWrite: false });
          const dotSprite = new THREE.Sprite(dotMat);
          dotSprite.scale.set(0.024, 0.024, 1.0);
          dotSprite.renderOrder = 9999;
          pinGroup.add(dotSprite);

          // Active Selection Aura Ring
          const selRingMat = new THREE.SpriteMaterial({ map: skinDotSelTex, depthTest: false, depthWrite: false });
          const selRing = new THREE.Sprite(selRingMat);
          selRing.scale.set(0.036, 0.036, 1.0);
          selRing.visible = (idx === selectedAcupointIdx);
          selRing.renderOrder = 9998;
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

          // 3D Canvas Callout Badge in 100% English with Region Tag
          const regLabel = REGION_DISPLAY_NAMES[pt.region] || pt.region.toUpperCase();
          const badgeTex = new THREE.CanvasTexture(
            createCalloutBadgeCanvas(pt.code, pt.translation, `${pt.pinyin} • ${pt.depthTarget}mm`, idx === selectedAcupointIdx, regLabel)
          );
          const badgeMat = new THREE.SpriteMaterial({ map: badgeTex });
          const badgeSprite = new THREE.Sprite(badgeMat);
          badgeSprite.position.set(bo[0], bo[1], bo[2] + 0.02);
          badgeSprite.scale.set(0.098, 0.028, 1.0);
          badgeSprite.visible = (idx === selectedAcupointIdx);
          pinGroup.add(badgeSprite);

          // Clickable HitBox for Raycaster (generous radius 0.045 for natural, effortless clicking)
          const hitBox = new THREE.Mesh(
            new THREE.SphereGeometry(0.045, 12, 12),
            new THREE.MeshBasicMaterial({ visible: false })
          );
          hitBox.userData = { acupointIdx: idx };
          pinGroup.add(hitBox);
          interactiveAcupointMeshes.push(hitBox);

          pinGroup.userData.badge = badgeSprite;
          pinGroup.userData.leaderLine = leaderLine;

          bodyMesh.add(pinGroup);
          allPinObjectsRef.current.push(pinGroup);
          badgesRef.current.push({ idx, pt, sprite: badgeSprite, leaderLine, selRing });
        });

        // Human Body Model Added to Scene (Pure anatomy: zero tools on man model)
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

    // Raycaster for Direct Acupoint Dot Clicking, Tool Tray Picking, & Needle Stabbing
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Track pointerdown to distinguish turning/orbiting drags from genuine clicks
    let pointerDownPos = { x: 0, y: 0, hasDown: false };
    const handlePointerDown = (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY, hasDown: true };
    };

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      // Check surgical tray tools
      const trayHover = raycaster.intersectObjects(trayToolHitboxesRef.current, true);
      if (trayHover.length > 0) {
        renderer.domElement.style.cursor = 'pointer';
        return;
      }

      if (activeRegionRef.current !== 'full') {
        // When a limb is articulated and in focus, only its acupoints show pointer cursor
        const activeRegionHitboxes = interactiveAcupointMeshes.filter(m => {
          const ptIdx = m.userData.acupointIdx;
          const pt = CLINICAL_ACUPOINTS[ptIdx];
          return pt && (pt.region === activeRegionRef.current);
        });
        const acuHover = raycaster.intersectObjects(activeRegionHitboxes, true);
        if (acuHover.length > 0) {
          renderer.domElement.style.cursor = 'pointer';
          return;
        }
      } else {
        // In whole-body overview, hovering over the body mesh shows pointer cursor to invite clicking limbs
        if (bodyModelMeshRef.current) {
          const bodyHover = raycaster.intersectObject(bodyModelMeshRef.current, false);
          if (bodyHover.length > 0) {
            renderer.domElement.style.cursor = 'pointer';
            return;
          }
        }
      }
      renderer.domElement.style.cursor = 'default';
    };

    const handlePointerUp = () => {
      if (isStabbingRef.current) {
        isStabbingRef.current = false;
        controls.enabled = true; // Re-enable OrbitControls!
        renderer.domElement.style.cursor = 'default';
      }
    };

    const handleCanvasClick = (e) => {
      if (isStabbingRef.current) return;
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

      // Check physical tray tools
      const trayHits = raycaster.intersectObjects(trayToolHitboxesRef.current, true);
      if (trayHits.length > 0) {
        const toolId = trayHits[0].object.userData.toolId;
        if (toolId) {
          handleSelectTool(toolId);
          return;
        }
      }

      // 1. Acupoint Clicking is STRICTLY GATED to the active focused limb/region!
      // In whole-body overview (activeRegion === 'full'), clicking hands/limbs articulates the limb forward first!
      const isRegionFocused = (activeRegionRef.current !== 'full');

      if (isRegionFocused) {
        // Only consider hitboxes that belong to the currently articulated & focused region!
        const activeRegionHitboxes = interactiveAcupointMeshes.filter(m => {
          const ptIdx = m.userData.acupointIdx;
          const pt = CLINICAL_ACUPOINTS[ptIdx];
          let parent = m.parent;
          while (parent) {
            if (parent.scale && parent.scale.x < 0.2) return false;
            parent = parent.parent;
          }
          return pt && (pt.region === activeRegionRef.current);
        });

        const intersects = raycaster.intersectObjects(activeRegionHitboxes, true);
        if (intersects.length > 0) {
          const hitIdx = intersects[0].object.userData.acupointIdx;
          console.log('[AcuClick] Hit pin hitbox on active limb idx:', hitIdx, CLINICAL_ACUPOINTS[hitIdx]?.code);
          if (typeof hitIdx === 'number') {
            triggerAcupointCloseUp(hitIdx);
            return;
          }
        }
      }

      // 2. Direct click on the 3D Human Body Anatomy (limbs, neck, face, back)
      // Articulates that limb forward towards the camera and reveals its points!
      if (bodyModelMeshRef.current) {
        const bodyHits = raycaster.intersectObject(bodyModelMeshRef.current, false);
        if (bodyHits.length > 0) {
          const worldPt = bodyHits[0].point;
          const localHit = bodyModelMeshRef.current.worldToLocal(worldPt.clone());
          const lx = localHit.x;
          const ly = localHit.y;
          const lz = localHit.z;
          console.log('[AcuClick] Body Hit Local:', { lx: Number(lx.toFixed(3)), ly: Number(ly.toFixed(3)), lz: Number(lz.toFixed(3)) });

          let targetRegion = 'face';
          if (ly > 0.72) {
            targetRegion = 'face';
          } else if (ly >= 0.55 && ly <= 0.72) {
            targetRegion = 'neck';
          } else if (lz < -0.03 && ly > -0.20 && ly < 0.55 && Math.abs(lx) < 0.14) {
            targetRegion = 'back';
          } else if (lx > 0.12 && ly < 0.55) {
            targetRegion = 'arm_left';
          } else if (lx < -0.12 && ly < 0.55) {
            targetRegion = 'arm_right';
          } else if (lx > 0.015 && ly < -0.20) {
            targetRegion = 'leg_left';
          } else if (lx < -0.015 && ly < -0.20) {
            targetRegion = 'leg_right';
          } else {
            targetRegion = 'face';
          }

          console.log('[AcuClick] Articulating Limb & Presenting Region:', targetRegion);
          triggerRegionPresentation(targetRegion);
        }
      }
    };

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

      // Thanos Particles Physics (Tissue Block)
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

      // Body Model In-Scene Thanos Particle Ash Physics (On Man Mesh)
      const bPData = bodyThanosParticlesRef.current;
      if (bPData && bPData.active) {
        bPData.timer += 0.016;
        const bPos = bPData.geo.attributes.position.array;
        const bVel = bPData.vel;

        for (let i = 0; i < 2000; i++) {
          bPos[i * 3] += bVel[i * 3];
          bPos[i * 3 + 1] += bVel[i * 3 + 1];
          bPos[i * 3 + 2] += bVel[i * 3 + 2];
          bVel[i * 3 + 1] += 0.0001;
        }
        bPData.geo.attributes.position.needsUpdate = true;
        bPData.mat.opacity = Math.max(0, 1.0 - bPData.timer / 1.8);

        if (bPData.timer >= 1.8) {
          bPData.active = false;
        }
      }

      // Bio-pulse pulsation on contacted nerve
      if (nerveMatRef.current && interactiveDepth >= 11.5) {
        nerveMatRef.current.emissiveIntensity = 1.6 + Math.sin(elapsedTime * 8) * 0.6;
      }

      // Kinematic Limb Interpolation (Moving limbs almost 90 deg forward to show viewer)
      const kdt = 0.085;
      const curL = currentLimbAnglesRef.current;
      const tgtL = targetLimbAnglesRef.current;
      curL.armL += (tgtL.armL - curL.armL) * kdt;
      curL.armR += (tgtL.armR - curL.armR) * kdt;
      curL.legL += (tgtL.legL - curL.legL) * kdt;
      curL.legR += (tgtL.legR - curL.legR) * kdt;

      limbUniformsRef.current.uArmLAngle.value = curL.armL;
      limbUniformsRef.current.uArmRAngle.value = curL.armR;
      limbUniformsRef.current.uLegLAngle.value = curL.legL;
      limbUniformsRef.current.uLegRAngle.value = curL.legR;

      const pLeftShoulder = leftShoulderPivotRef.current;
      const pRightShoulder = rightShoulderPivotRef.current;
      const pLeftHip = leftHipPivotRef.current;
      const pRightHip = rightHipPivotRef.current;

      // Smooth Spring Scale & Distance-Scaled Acupoints locked to articulated limbs
      const pinWorldPos = new THREE.Vector3();
      if (allPinObjectsRef.current) {
        allPinObjectsRef.current.forEach(pin => {
          const ts = pin.userData.targetScale ?? 0.0;
          pin.userData.currentScale = (pin.userData.currentScale ?? 0.0) + (ts - (pin.userData.currentScale ?? 0.0)) * 0.14;
          const s = Math.max(0, pin.userData.currentScale);
          pin.scale.set(s, s, s);

          // Rotate pin position in exact lockstep around shoulder/hip pivot
          const basePos = pin.userData.baseLocalPos;
          if (basePos) {
            const reg = pin.userData.region;
            if (reg === 'arm_left' && curL.armL > 0.0001) {
              const ang = -curL.armL;
              const sn = Math.sin(ang), cs = Math.cos(ang);
              const dy = basePos.y - pLeftShoulder.y;
              const dz = basePos.z - pLeftShoulder.z;
              pin.position.y = pLeftShoulder.y + (dy * cs - dz * sn);
              pin.position.z = pLeftShoulder.z + (dy * sn + dz * cs);
            } else if (reg === 'arm_right' && curL.armR > 0.0001) {
              const ang = -curL.armR;
              const sn = Math.sin(ang), cs = Math.cos(ang);
              const dy = basePos.y - pRightShoulder.y;
              const dz = basePos.z - pRightShoulder.z;
              pin.position.y = pRightShoulder.y + (dy * cs - dz * sn);
              pin.position.z = pRightShoulder.z + (dy * sn + dz * cs);
            } else if (reg === 'leg_left' && curL.legL > 0.0001) {
              const ang = -curL.legL;
              const sn = Math.sin(ang), cs = Math.cos(ang);
              const dy = basePos.y - pLeftHip.y;
              const dz = basePos.z - pLeftHip.z;
              pin.position.y = pLeftHip.y + (dy * cs - dz * sn);
              pin.position.z = pLeftHip.z + (dy * sn + dz * cs);
            } else if (reg === 'leg_right' && curL.legR > 0.0001) {
              const ang = -curL.legR;
              const sn = Math.sin(ang), cs = Math.cos(ang);
              const dy = basePos.y - pRightHip.y;
              const dz = basePos.z - pRightHip.z;
              pin.position.y = pRightHip.y + (dy * cs - dz * sn);
              pin.position.z = pRightHip.z + (dy * sn + dz * cs);
            } else {
              pin.position.copy(basePos);
            }
          }

          // Dynamic scale based on distance to camera so dots NEVER get too big on close up!
          pin.getWorldPosition(pinWorldPos);
          const dist = camera.position.distanceTo(pinWorldPos);
          const dynamicScale = Math.max(0.009, Math.min(0.025, dist * 0.0092));

          const dot = pin.children[0];
          if (dot && dot.isSprite) {
            dot.scale.set(dynamicScale, dynamicScale, 1.0);
          }
          const ring = pin.children[1];
          if (ring && ring.isSprite) {
            ring.scale.set(dynamicScale * 1.5, dynamicScale * 1.5, 1.0);
          }
        });
      }

      // Smooth Camera & Controls Interpolation towards Target Framing (Cubic Ease-Out)
      if (isCameraAnimatingRef.current) {
        camAnimProgressRef.current += 0.045; // ~22 frames (0.36s smooth flight)
        const progress = Math.min(1.0, camAnimProgressRef.current);
        const t = 1 - Math.pow(1 - progress, 3);
        camera.position.lerpVectors(camStartPosRef.current, targetCamPosRef.current, t);
        controls.target.lerpVectors(camStartLookAtRef.current, targetLookAtRef.current, t);
        if (progress >= 1.0) {
          camera.position.copy(targetCamPosRef.current);
          controls.target.copy(targetLookAtRef.current);
          isCameraAnimatingRef.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Event Listeners for Direct Needle Stabbing, Tool Tray, & Freely Orbiting
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('click', handleCanvasClick);

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
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []); // Run once on mount

  // Tool & Acupoint Switching Sync on Human Body
  useEffect(() => {
    updateBodyToolPlacement(selectedAcupointIdx, activeTool);
    if (activeNeedleRef.current) activeNeedleRef.current.visible = (activeTool === 'needle');
    if (guideTubeRef.current) guideTubeRef.current.visible = (activeTool === 'needle');
    if (activeCupRef.current) activeCupRef.current.visible = (activeTool === 'cup');
    if (activeMoxaRef.current) activeMoxaRef.current.visible = (activeTool === 'moxa');

    if (knotMeshRef.current) knotMeshRef.current.visible = (selectedProblemIdx === 0 && !isDisintegrated);
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = (selectedProblemIdx === 1 && !isDisintegrated);
    if (stasisMeshRef.current) stasisMeshRef.current.visible = (selectedProblemIdx === 2 && !isDisintegrated);
  }, [activeTool, selectedAcupointIdx, selectedProblemIdx, isDisintegrated, updateBodyToolPlacement]);

  // Determine current active anatomical layer for live feedback
  const getActiveLayerName = (depth) => {
    if (depth <= 1.2) return 'Epidermis (Keratinized Surface)';
    if (depth <= 4.5) return 'Dermis (Capillaries & Sweat Gland)';
    if (depth <= 9.0) return 'Hypodermis (Adipose Lobules)';
    if (depth <= 10.5) return 'Subcutaneous Fascia Sheath';
    return 'Deep Striated Muscle (Knot Target)';
  };

  const handleBackToBody = useCallback(() => {
    setViewMode('body');
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);
  }, []);

  return (
    <div 
      data-testid="tissue-depth-simulator"
      className="relative w-full h-full overflow-hidden bg-[#f8fafc] font-sans select-none"
    >
      {/* 1. FULL-STAGE 3D TISSUE STRATA & PHYSICAL SURGICAL TRAY VIEW (Rendered as absolute full overlay) */}
      {viewMode === 'tissue' && (
        <div className="absolute inset-0 z-30 w-full h-full bg-[#f8fafc] overflow-hidden">
          <SkinLayersPip
            fullStage={true}
            activeTool={activeTool}
            depth={interactiveDepth}
            maxDepth={activeTool === 'needle' ? 15.0 : activeTool === 'cup' ? 6.0 : 43.0}
            targetDepth={activeAcupoint.depthTarget || 12.0}
            pointCode={activeAcupoint.code}
            pointName={activeAcupoint.translation}
            painName={activeAcupoint.painName}
            isDisintegrated={isDisintegrated}
            isSnapping={isSnapping}
            onDepthChange={handleInteractiveChange}
            onReset={handleReset}
            onBackToBody={handleBackToBody}
            onSelectTool={handleSelectTool}
            isMuted={isMuted}
            playAcuSound={playAcuSound}
          />
        </div>
      )}

      {/* 2. WHOLE BODY 3D CLINICAL ANATOMY VIEW */}
      <div className="relative w-full h-full flex flex-col lg:flex-row">
      {/* ===================================================================== */}
      {/* 1. LEFT COLUMN (65% width): MAIN 3D ANATOMY VIEWPORT                  */}
      {/* ===================================================================== */}
      <div className="relative flex-1 h-[55vh] lg:h-full overflow-hidden bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
        {/* 3D WebGL Canvas */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top Header Bar: Clean & Minimalist inside Viewport */}
        <div className="absolute top-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-xs font-bold text-[#09090b] shadow-sm font-display">
              <span className="w-2 h-2 rounded-full bg-[#e02868] animate-pulse" />
              <span className="tracking-wide">ARURA 3D CLINICAL ANATOMY</span>
            </div>
            <button
              type="button"
              onClick={() => navigateCameraToRegion('full')}
              className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white border border-neutral-200/90 text-neutral-700 hover:text-[#09090b] text-xs font-semibold transition shadow-sm flex items-center gap-1.5"
              title="Reset Camera to Whole Body"
            >
              <User className="w-3.5 h-3.5 text-[#e02868]" />
              <span>Reset View</span>
            </button>
          </div>

          {/* Quick Region Pills Bar */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-sm pointer-events-auto overflow-x-auto max-w-[50vw]">
            {[
              { id: 'full', label: 'All Limbs' },
              { id: 'face', label: 'Face' },
              { id: 'neck', label: 'Neck' },
              { id: 'arm_right', label: 'R-Arm' },
              { id: 'arm_left', label: 'L-Arm' },
              { id: 'back', label: 'Back' },
              { id: 'leg_right', label: 'R-Leg' },
              { id: 'leg_left', label: 'L-Leg' }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => navigateCameraToRegion(r.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                  activeRegion === r.id
                    ? 'bg-[#e02868] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Viewport Toggles (3D Strata & Facing Flip) */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                setViewMode('tissue');
                window.dispatchEvent(new Event('resize'));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition shadow-sm bg-white/95 text-neutral-700 border-neutral-200/90 hover:bg-white hover:text-neutral-900"
              title="Open 3D Tissue Strata & Surgical Instrument Tray"
            >
              <Layers className="w-3.5 h-3.5 text-[#e02868]" />
              <span className="hidden sm:inline">3D Strata</span>
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

        {/* Bottom Anatomy Inspection Guide */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-auto hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-lg text-xs font-medium text-neutral-700">
          <Sparkles className="w-4 h-4 text-[#e02868] animate-pulse shrink-0" />
          <span>Click any limb to inspect points • Click an acupoint to open 3D Tissue Strata & Surgical Tray</span>
        </div>

        {/* Thanos Disintegration Ash Floating Toast */}
        {isDisintegrated && viewMode === 'body' && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 max-w-lg w-[92%] sm:w-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-neutral-900/95 text-white border border-emerald-500/50 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-2 pointer-events-auto">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 animate-spin" />
              <div className="text-xs">
                <span className="font-bold text-emerald-400">{activeAcupoint.code} ({activeAcupoint.translation}):</span>{' '}
                <span className="text-neutral-200">{activeAcupoint.painName}</span>{' '}
                <span className="text-emerald-300 font-semibold">• Vanished into Ash</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1 text-[11px] font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition shrink-0 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 2. RIGHT COLUMN: DEDICATED STUDIO INTELLIGENCE SIDEBAR (380px)        */}
      {/* ===================================================================== */}
      <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 h-[45vh] lg:h-full border-t lg:border-t-0 lg:border-l border-neutral-200/90 bg-white/95 backdrop-blur-md flex flex-col overflow-y-auto z-20 shadow-xl [scrollbar-width:thin]">
        {/* Clinical Overview Header in Sidebar */}
        <div className="p-3.5 border-b border-neutral-200/80 bg-neutral-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e02868] animate-pulse" />
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Clinical Point Directory
            </h4>
          </div>
          <span className="text-[10px] font-bold text-[#e02868] bg-[#e02868]/10 px-2 py-0.5 rounded-full">
            {filteredAcupoints.length} Points Available
          </span>
        </div>

        {/* 2. Target Acupoint Clinical Intelligence */}
        <div className="p-4 border-b border-neutral-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeAcupoint.colorHex || '#e02868' }} />
              <h3 className="text-sm font-bold text-[#09090b]">
                {activeAcupoint.code} • {activeAcupoint.translation}
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#e02868] bg-[#e02868]/10 px-2 py-0.5 rounded-full">
              Target: {activeAcupoint.depthTarget}mm
            </span>
          </div>

          <div className="text-xs text-neutral-600 font-medium">
            <span className="font-semibold text-neutral-800">{activeAcupoint.fullName}</span> ({activeAcupoint.meridian})
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs">
            <div className="font-bold text-amber-800 flex items-center gap-1.5 mb-0.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Target Pathology & Knot</span>
            </div>
            <div className="text-neutral-700 font-medium">{activeAcupoint.painName}</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
              <div className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Nerve Innervation:</span>
              </div>
              <div className="text-neutral-700 text-[10px] font-medium leading-tight truncate" title={activeAcupoint.nerves}>
                {activeAcupoint.nerves}
              </div>
            </div>

            <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
              <div className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                <span>Vascular Supply:</span>
              </div>
              <div className="text-neutral-700 text-[10px] font-medium leading-tight truncate" title={activeAcupoint.vessels}>
                {activeAcupoint.vessels}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-neutral-600 flex items-start gap-1.5 pt-2 border-t border-neutral-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e02868] shrink-0 mt-0.5" />
            <span><strong>Clinical Relief:</strong> {activeAcupoint.relief}</span>
          </div>
        </div>

        {/* 3. Acupoints Directory for Active Region */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2 [scrollbar-width:thin]">
          <div className="flex items-center justify-between pb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
              {activeRegion === 'full' ? 'All Acupoints (39)' : `${activeRegion.toUpperCase()} Acupoints`}
            </span>
            <span className="text-[10px] font-bold text-[#e02868]">
              {filteredAcupoints.length} Points
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {filteredAcupoints.map((pt) => {
              const isSelected = pt.code === activeAcupoint.code;
              const originalIdx = CLINICAL_ACUPOINTS.findIndex(p => p.id === pt.id);
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => triggerAcupointCloseUp(originalIdx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                    isSelected
                      ? 'bg-[#e02868] text-white border-[#e02868] shadow-sm font-bold'
                      : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200/80'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{pt.code} • {pt.translation}</div>
                    <div className={`text-[10px] truncate max-w-[200px] ${isSelected ? 'text-white/80' : 'text-neutral-500'}`}>
                      {pt.painName}
                    </div>
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {pt.depthTarget}mm
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
