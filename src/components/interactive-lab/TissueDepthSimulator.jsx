import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Flame, 
  Activity, 
  CircleDot, 
  Info,
  X,
  Heart
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

// Authentic Web Audio Synthesizer (Snap Pop + Ethereal Wind Whoosh + 528Hz Harmonic Tone)
function playAcuSound(type, isMuted) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'snap') {
      // 1. Crisp Finger Snap Pop
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
          toneGain.gain.setValueAtTime(0.18, ctx.currentTime);
          toneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
          toneOsc.connect(toneGain);
          toneGain.connect(ctx.destination);
          toneOsc.start();
          toneOsc.stop(ctx.currentTime + 1.4);
        } catch (_) {}
      }, 250);

    } else if (type === 'tap') {
      // Guide tube tap (light, crisp, painless micro-tap)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);

    } else if (type === 'swab') {
      // Gentle alcohol swab whisper
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.06));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1600;
      noise.connect(filter);
      filter.connect(ctx.destination);
      noise.start();

    } else if (type === 'moxa') {
      // Warm herbal moxa crackle
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);

    } else if (type === 'fork') {
      // 528 Hz tuning fork chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 528;
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.0);
    }
  } catch (_) {}
}

// 3 Authentic Clinical Acupoints on Patient Back
const BACK_ACUPOINTS = [
  {
    id: 'gb21',
    code: 'GB21',
    chinese: '肩井 (Jianjing)',
    name: 'Shoulder Well',
    location: 'Trapezius Ridge (Midpoint C7 to Acromion)',
    depth: '12 - 15 mm',
    painName: 'TRAPEZIUS DESK SPASM',
    subtitle: 'Hyper-contracted trapezius knot compressing accessory nerve',
    initialSpasm: '92% Contraction',
    x: 32, // % on anatomical back
    y: 28,
    relief: 'Trapezius Spasm Vaporized — Shoulders Drop 2 Inches'
  },
  {
    id: 'bl15',
    code: 'BL15',
    chinese: '心俞 (Xinshu)',
    name: 'Heart Shu',
    location: 'Upper Thoracic Spine (T5 Level)',
    depth: '10 - 14 mm',
    painName: 'THORACIC CHEST TIGHTNESS',
    subtitle: 'Paraspinal sympathetic myofascial tension from chronic stress',
    initialSpasm: '87% Contraction',
    x: 50,
    y: 44,
    relief: 'Thoracic Constriction Dissolved — Full Diaphragm Breath Restored'
  },
  {
    id: 'bl23',
    code: 'BL23',
    chinese: '肾俞 (Shenshu)',
    name: 'Kidney Shu',
    location: 'Lower Lumbar Spine (L2 Level)',
    depth: '15 - 20 mm',
    painName: 'LUMBAR SCIATIC STIFFNESS',
    subtitle: 'Quadratus lumborum & erector spinae deep protective spasm',
    initialSpasm: '94% Contraction',
    x: 50,
    y: 72,
    relief: 'Deep Lumbar Compression Cleared — +340% Micro-Vascular Flow'
  }
];

// Tools on the Authentic Clinical Tray
const TRAY_TOOLS = [
  {
    id: 'needle',
    name: '0.18mm Sterile Needle',
    subtitle: 'Solid Surgical 316L Steel in Guide Tube',
    badge: 'Primary Tool',
    icon: '📍',
    actionPrompt: 'Drag to Acupoint on Back',
    isPrimary: true
  },
  {
    id: 'swab',
    name: 'Alcohol Prep Swab',
    subtitle: '70% Isopropyl Skin Antiseptic',
    badge: 'Aseptic',
    icon: '🩹',
    actionPrompt: 'Swipe to Cleanse Skin',
    isPrimary: false
  },
  {
    id: 'moxa',
    name: 'Pure Moxa Cigar',
    subtitle: 'Smoldering Herbal Mugwort (43°C Warmth)',
    badge: 'Thermo-Therapy',
    icon: '🔥',
    actionPrompt: 'Warm Treated Point',
    isPrimary: false
  },
  {
    id: 'cupping',
    name: 'Glass Fire Cup',
    subtitle: 'Borosilicate Myofascial Vacuum',
    badge: 'Decompression',
    icon: '🫧',
    actionPrompt: 'Negative Pressure Suction',
    isPrimary: false
  },
  {
    id: 'fork',
    name: '528Hz Tuning Fork',
    subtitle: 'Acoustic Cellular Resonance',
    badge: 'Bio-Acoustic',
    icon: '🔔',
    actionPrompt: 'Harmonic De-Qi Chime',
    isPrimary: false
  }
];

export default function TissueDepthSimulator({ onOpenBooking }) {
  const [selectedPoint, setSelectedPoint] = useState(BACK_ACUPOINTS[0]);
  const [activeTool, setActiveTool] = useState(TRAY_TOOLS[0]);
  const [isDisintegrated, setIsDisintegrated] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [swabbed, setSwabbed] = useState(false);
  const [moxaApplied, setMoxaApplied] = useState(false);
  const [cuppingApplied, setCuppingApplied] = useState(false);
  
  // Interactive Needle Bend & Hair Scale Inspector Modal
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [needleBendAngle, setNeedleBendAngle] = useState(0);

  // Dragging states
  const [isDraggingNeedle, setIsDraggingNeedle] = useState(false);
  const [needleScreenPos, setNeedleScreenPos] = useState({ x: 50, y: 50 });
  const [isHoveringPoint, setIsHoveringPoint] = useState(false);

  const canvasRef = useRef(null);
  const backStageRef = useRef(null);
  const animReqRef = useRef(null);

  // Thanos Snap Dust Disintegration Particle Physics Engine
  const executeThanosDisintegration = useCallback(() => {
    if (isSnapping || isDisintegrated) return;
    setIsSnapping(true);
    playAcuSound('snap', isMuted);

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsDisintegrated(true);
      setIsSnapping(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.offsetWidth || 800);
    const height = (canvas.height = canvas.offsetHeight || 500);

    // 1. Render glowing pain text and aura onto offscreen buffer
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext('2d');

    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.shadowColor = '#f43f5e';
    octx.shadowBlur = 25;

    octx.font = '900 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    octx.fillStyle = '#ff2b56';
    octx.fillText(selectedPoint.painName, width / 2, height / 2 - 24);

    octx.font = '500 15px sans-serif';
    octx.fillStyle = '#fca5a5';
    octx.shadowBlur = 10;
    octx.fillText(selectedPoint.subtitle, width / 2, height / 2 + 20);

    octx.font = 'bold 13px monospace';
    octx.fillStyle = '#fb7185';
    octx.fillText(`[ ${selectedPoint.initialSpasm} • SPASM LOCKED ]`, width / 2, height / 2 + 56);

    // 2. Extract pixel matrix
    const imgData = octx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // 3. Build Thanos Ash & Dust Particles
    const particles = [];
    const step = 4; // Dense, fine ash granularity

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        const a = data[idx + 3];

        if (a > 30) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Progressive radial ash delay outward from needle contact point
          const distFromCenter = Math.hypot(x - width / 2, y - height / 2);
          const delay = (distFromCenter / (width / 2)) * 0.35 + Math.random() * 0.15;

          particles.push({
            x,
            y,
            size: Math.random() * 2.6 + 1.2,
            color: `rgba(${r},${g},${b},`,
            vx: Math.random() * 6.5 + 2.5, // Wind blowing rightward
            vy: (Math.random() - 0.75) * 5.2 - 1.8, // Ash drifting upward
            rot: Math.random() * Math.PI,
            vRot: (Math.random() - 0.5) * 0.22,
            alpha: 1,
            decay: Math.random() * 0.025 + 0.015,
            delay,
            active: false
          });
        }
      }
    }

    // 4. Run Physics Loop
    const startTime = performance.now();
    const duration = 1600;
    let triggeredRelief = false;

    // Headless browser insurance: ensure relief triggers even if rAF is backgrounded
    const fallbackTimer = setTimeout(() => {
      setIsDisintegrated(true);
      setIsSnapping(false);
    }, 400);

    const animate = (now) => {
      const elapsed = (now - startTime) / duration;
      ctx.clearRect(0, 0, width, height);

      // Trigger DOM relief transformation
      if (elapsed >= 0.25 && !triggeredRelief) {
        triggeredRelief = true;
        setIsDisintegrated(true);
      }

      let activeCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (elapsed >= p.delay) {
          p.active = true;
        }

        if (p.active && p.alpha > 0.01) {
          activeCount++;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
          p.rot += p.vRot;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = `${p.color}${Math.max(0, p.alpha)})`;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        } else if (!p.active) {
          activeCount++;
          ctx.fillStyle = `${p.color}1)`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }

      if (activeCount > 0 && elapsed < 1.3) {
        animReqRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
        setIsDisintegrated(true);
        setIsSnapping(false);
      }
    };

    animReqRef.current = requestAnimationFrame(animate);
  }, [isDisintegrated, isSnapping, isMuted, selectedPoint]);

  // Reset treatment to try another acupoint
  const handleReset = useCallback(() => {
    if (animReqRef.current) cancelAnimationFrame(animReqRef.current);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setIsDisintegrated(false);
    setIsSnapping(false);
    setSwabbed(false);
    setMoxaApplied(false);
    setCuppingApplied(false);
    setIsDraggingNeedle(false);
    setIsHoveringPoint(false);
  }, []);

  // Selecting a point
  const handleSelectPoint = (pt) => {
    handleReset();
    setSelectedPoint(pt);
  };

  // Tool Click Handler
  const handleToolClick = (tool) => {
    setActiveTool(tool);
    if (tool.id === 'needle') {
      // Prompt user or open flex inspector
      setIsInspectorOpen(true);
    } else if (tool.id === 'swab') {
      playAcuSound('swab', isMuted);
      setSwabbed(true);
    } else if (tool.id === 'fork') {
      playAcuSound('fork', isMuted);
    } else if (tool.id === 'moxa') {
      playAcuSound('moxa', isMuted);
      if (isDisintegrated) setMoxaApplied(true);
    } else if (tool.id === 'cupping') {
      playAcuSound('tap', isMuted);
      if (isDisintegrated) setCuppingApplied(true);
    }
  };

  // Drag needle over patient back
  const handlePointerDownNeedle = (e) => {
    if (isDisintegrated) return;
    e.stopPropagation();
    setIsDraggingNeedle(true);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingNeedle || !backStageRef.current || isDisintegrated) return;
    const rect = backStageRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (!clientX || !clientY) return;

    const x = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100));
    setNeedleScreenPos({ x, y });

    // Distance to target point
    const dist = Math.hypot(x - selectedPoint.x, y - selectedPoint.y);
    if (dist < 12) {
      setIsHoveringPoint(true);
    } else {
      setIsHoveringPoint(false);
    }
  };

  const handlePointerUp = () => {
    if (isDraggingNeedle) {
      setIsDraggingNeedle(false);
      if (isHoveringPoint && !isDisintegrated) {
        executeThanosDisintegration();
      }
    }
  };

  // Quick-treat tap on acupoint
  const handleAcupointClick = () => {
    if (!isDisintegrated) {
      playAcuSound('tap', isMuted);
      executeThanosDisintegration();
    }
  };

  return (
    <div 
      tabIndex={0}
      data-testid="tissue-depth-simulator"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`transition-all duration-300 font-sans focus:outline-none select-none ${
        isFullscreen 
          ? 'fixed inset-0 z-50 w-screen h-screen bg-[#07090e] p-4 sm:p-8 flex flex-col justify-between overflow-y-auto' 
          : 'relative bg-[#07090e] text-neutral-100 rounded-3xl border border-neutral-800 p-4 sm:p-8 shadow-2xl space-y-6 overflow-hidden'
      }`}
    >
      {/* Top Bar: Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-serif font-bold text-lg">
            阿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Clinical Acupuncture Sandbox
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Interactive Tray
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Dr. Nivedha's authentic 0.18mm procedure tools • Touch & treat palpable back acupoints
            </p>
          </div>
        </div>

        {/* Utility Controls (Sound, Fullscreen, Reset) */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button 
            type="button"
            onClick={() => setIsInspectorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold transition"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Needle vs Hair Flex Test</span>
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

      {/* Main Workspace: Patient Back (Top) + Clinical Tray (Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Anatomical Back Stage (Col 1-8) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* Acupoint Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mr-1">
              Select Point:
            </span>
            {BACK_ACUPOINTS.map((pt) => {
              const isSelected = selectedPoint.id === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => handleSelectPoint(pt)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    isSelected 
                      ? 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow-lg shadow-emerald-500/20' 
                      : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <span className="font-mono">{pt.code}</span>
                  <span className="hidden sm:inline">• {pt.name}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Anatomical Patient Back Stage */}
          <div 
            ref={backStageRef}
            className="relative w-full h-[460px] sm:h-[500px] rounded-2xl bg-gradient-to-b from-[#141013] via-[#0d0f17] to-[#0a0d14] border border-neutral-800 overflow-hidden shadow-inner flex items-center justify-center"
          >
            {/* Background Medical Visual: Realistic Back Contour */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity filter contrast-125"
              style={{ backgroundImage: `url(${getAssetUrl('back_needles.jpg')})` }}
            />

            {/* Anatomical Silhouette Overlay with Meridian Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current text-emerald-500/20" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Spine Line (Du Meridian) */}
              <line x1="50" y1="15" x2="50" y2="85" strokeWidth="0.4" strokeDasharray="1.5,1.5" className="text-neutral-500/40" />
              {/* Bladder Meridian Line Left & Right */}
              <line x1="44" y1="25" x2="44" y2="85" strokeWidth="0.3" strokeDasharray="1,1" className="text-emerald-500/30" />
              <line x1="56" y1="25" x2="56" y2="85" strokeWidth="0.3" strokeDasharray="1,1" className="text-emerald-500/30" />
              {/* Trapezius Ridge Line */}
              <path d="M 20 35 Q 50 20 80 35" fill="none" strokeWidth="0.3" strokeDasharray="1,1" className="text-neutral-500/30" />
            </svg>

            {/* Particle Canvas for Thanos Disintegration */}
            <canvas 
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-30"
            />

            {/* Swabbed skin effect */}
            {swabbed && (
              <div 
                className="absolute w-24 h-24 rounded-full bg-cyan-400/10 border border-cyan-400/30 pointer-events-none transition-all duration-700 animate-pulse"
                style={{ left: `calc(${selectedPoint.x}% - 48px)`, top: `calc(${selectedPoint.y}% - 48px)` }}
              />
            )}

            {/* Cupping Cup applied on back */}
            {cuppingApplied && isDisintegrated && (
              <div 
                className="absolute z-20 flex flex-col items-center pointer-events-none animate-bounce"
                style={{ left: `calc(${selectedPoint.x}% - 36px)`, top: `calc(${selectedPoint.y}% - 40px)` }}
              >
                <div className="w-18 h-18 rounded-full border-4 border-cyan-300/60 bg-cyan-500/20 backdrop-blur-sm shadow-xl flex items-center justify-center text-cyan-200 text-xs font-bold">
                  🫧 Vacuum Locked
                </div>
              </div>
            )}

            {/* Moxa warming smoke effect */}
            {moxaApplied && isDisintegrated && (
              <div 
                className="absolute z-20 pointer-events-none flex flex-col items-center"
                style={{ left: `calc(${selectedPoint.x}% - 20px)`, top: `calc(${selectedPoint.y}% - 60px)` }}
              >
                <span className="text-2xl animate-pulse">🔥</span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40">
                  43°C Infrared Moxa
                </span>
              </div>
            )}

            {/* Central Acupoint & Spasm Target Area */}
            <button 
              type="button"
              data-testid="target-acupoint"
              onClick={handleAcupointClick}
              className="absolute z-20 cursor-pointer group flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${selectedPoint.x}%`, top: `${selectedPoint.y}%` }}
              title="Click or drag needle here to treat"
            >
              {/* Spasm Aura Pulsing when inflamed */}
              {!isDisintegrated && (
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full bg-rose-600/20" />
                  <div className="absolute w-16 h-16 rounded-full border border-rose-500/50 bg-rose-500/20" />
                  <div className="w-12 h-12 rounded-full border-2 border-rose-400 bg-rose-950/90 flex items-center justify-center shadow-lg shadow-rose-600/50 group-hover:scale-110 transition">
                    <CircleDot className="w-6 h-6 text-rose-300" />
                  </div>
                </div>
              )}

              {/* Acupoint Label Tag */}
              <div className="mt-2 text-center pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 border border-neutral-700 text-[11px] font-bold text-white shadow-md">
                  <span className="text-emerald-400">{selectedPoint.code}</span>
                  <span className="text-neutral-300">{selectedPoint.chinese}</span>
                </div>
                {!isDisintegrated && (
                  <p className="text-[10px] text-rose-300 font-semibold mt-0.5 bg-rose-950/80 px-2 py-0.5 rounded-md border border-rose-800">
                    Depth: {selectedPoint.depth} • Tap or Drop Needle
                  </p>
                )}
              </div>
            </button>

            {/* Pre-Disintegration Pain Headline (Overlaid on center stage) */}
            {!isDisintegrated && !isSnapping && (
              <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none flex flex-col items-center text-center">
                <div className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800 px-6 py-3 rounded-2xl max-w-md shadow-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 block mb-1">
                    Active Condition • {selectedPoint.initialSpasm}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-rose-100 tracking-tight">
                    {selectedPoint.painName}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {selectedPoint.subtitle}
                  </p>
                </div>
              </div>
            )}

            {/* Post-Disintegration Relief State */}
            {isDisintegrated && (
              <div className="absolute inset-0 z-20 bg-emerald-950/30 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-xl shadow-emerald-500/20">
                  <Sparkles className="w-8 h-8 text-emerald-400" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
                    <Check className="w-3.5 h-3.5" /> De-Qi Unlocked (得气) • Spasm Dissolved
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {selectedPoint.relief}
                  </h3>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto mt-1">
                    The spastic motor endplate has reset. Trapped acetylcholine cleared. Endorphin flood active.
                  </p>
                </div>

                {/* Telemetry Metrics */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
                    <span className="text-[10px] font-bold text-neutral-400 block">Muscle Spasm</span>
                    <span className="text-lg font-black text-emerald-400">0%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
                    <span className="text-[10px] font-bold text-neutral-400 block">Micro-Circulation</span>
                    <span className="text-lg font-black text-cyan-400">+340%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
                    <span className="text-[10px] font-bold text-neutral-400 block">Needle Sensation</span>
                    <span className="text-lg font-black text-emerald-300">Painless</span>
                  </div>
                </div>

                {/* Action Buttons: Reset or Book Consultation */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Treat Another Acupoint</span>
                  </button>

                  {onOpenBooking && (
                    <button
                      type="button"
                      onClick={() => onOpenBooking(selectedPoint.name)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-black shadow-lg shadow-emerald-500/25 transition"
                    >
                      <span>Book Consultation (₹600)</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Draggable Needle Floating Follower */}
            {isDraggingNeedle && (
              <div 
                className="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${needleScreenPos.x}%`, top: `${needleScreenPos.y}%` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-14 rounded-full bg-amber-400 border border-amber-600 shadow-md" />
                  <div className="w-0.5 h-16 bg-gradient-to-b from-neutral-200 to-white shadow-lg" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: The Authentic Clinical Procedure Tray (Col 9-12) */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          
          {/* Tray Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white uppercase tracking-wider">
                Procedure Tray
              </span>
              <span className="text-[10px] text-neutral-400">
                (Click or drag tools)
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-300">
              Sterile 316L
            </span>
          </div>

          {/* Procedure Tools List on Tray */}
          <div className="space-y-2.5">
            {TRAY_TOOLS.map((tool) => {
              const isSelected = activeTool.id === tool.id;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  onPointerDown={tool.id === 'needle' ? handlePointerDownNeedle : undefined}
                  className={`group relative p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-neutral-800/90 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                      : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-xl group-hover:scale-105 transition">
                      {tool.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                          {tool.name}
                        </h4>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                          {tool.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {tool.subtitle}
                      </p>
                    </div>
                  </div>

                  {tool.id === 'needle' && (
                    <div 
                      title="Drag needle to back"
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 animate-pulse"
                    >
                      Drag / Tap
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Why Acupuncture Doesn't Hurt (Clinical Gate Control Box) */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Why It Doesn't Hurt</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Arura needles are <strong>0.18 mm</strong> (hair-thin, solid, non-cutting). Unlike hollow hospital syringe needles (1.2 mm), they part tissue without tearing nerves or blood vessels.
            </p>
          </div>
        </div>
      </div>

      {/* Needle Bend & Hair Scale Inspector Modal */}
      {isInspectorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0c0f17] border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              type="button"
              data-testid="close-inspector"
              onClick={() => setIsInspectorOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Acupuncture Physics & Scale
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                The 0.18mm Needle vs. Human Hair
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Drag the slider to test the surgical steel flexibility. Notice how it bends smoothly without snapping.
              </p>
            </div>

            {/* Scale Comparison Visualization */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span className="font-bold">100x Microscopic Cross-Section:</span>
                <span className="text-emerald-400 font-mono">True Scale</span>
              </div>

              {/* Graphical Scale Bars */}
              <div className="space-y-3">
                {/* Syringe Needle */}
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span className="text-rose-400 font-semibold">Hospital Blood Draw Syringe (1.20 mm)</span>
                    <span className="font-mono text-rose-400">1200 µm</span>
                  </div>
                  <div className="w-full h-7 rounded-md bg-rose-500/20 border border-rose-500/40 relative overflow-hidden flex items-center px-3 text-[10px] font-bold text-rose-300">
                    Cutting Bevel Edge (Tears tissue)
                  </div>
                </div>

                {/* Arura Acupuncture Needle */}
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span className="text-emerald-400 font-semibold">Arura Acupuncture Needle (0.18 mm)</span>
                    <span className="font-mono text-emerald-400">180 µm</span>
                  </div>
                  <div className="w-[15%] h-2.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-500/50" />
                </div>

                {/* Human Hair */}
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span className="text-neutral-300 font-semibold">Single Human Hair Strand (0.10 mm)</span>
                    <span className="font-mono text-neutral-400">100 µm</span>
                  </div>
                  <div className="w-[8%] h-1.5 rounded-full bg-neutral-500" />
                </div>
              </div>
            </div>

            {/* Interactive Bend Tester */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-200">
                <span>Flexibility Bend Test:</span>
                <span className="font-mono text-emerald-400">{needleBendAngle}° Bend</span>
              </div>

              {/* Visual Needle Arc */}
              <div className="h-28 flex items-center justify-center relative">
                <svg className="w-48 h-24 overflow-visible" viewBox="0 0 100 50">
                  <path 
                    d={`M 10 25 Q 50 ${25 + (needleBendAngle / 90) * 22} 90 25`} 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                  {/* Copper coiled handle */}
                  <rect x="5" y="22" width="12" height="6" rx="2" fill="#d97706" />
                </svg>
              </div>

              <input 
                type="range" 
                min="0" 
                max="90" 
                value={needleBendAngle}
                onChange={(e) => setNeedleBendAngle(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-neutral-400 text-center">
                316L medical stainless steel bends like a whisker. It does not cut blood vessels or snap in tissue.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsInspectorOpen(false)}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition"
            >
              Return to Clinical Treatment Tray
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
