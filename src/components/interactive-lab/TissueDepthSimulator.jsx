import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Target 
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

// Authentic Thanos Finger Snap Pop & Ethereal Wind Whoosh (Web Audio API)
function playSnapAudio(isMuted) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // 1. Crisp Finger Snap Pop Transient
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
    noiseGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.12);
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
    }, 280);

  } catch (_) {}
}

const PAIN_CONDITIONS = [
  {
    id: 'migraine',
    name: 'Chronic Migraine',
    tag: 'GB20 • Occipital Spasm',
    painTitle: 'THROBBING OCCIPITAL MIGRAINE',
    painSubtitle: 'Hyper-Contracted Cervical Nodule Trapping C2 Greater Occipital Nerve',
    initialSpasm: '88% Spasm Contraction',
    reliefHeadline: 'Vice-Like Temple Grip Dissolved',
    reliefDetail: 'Cervical endplate unlocked. Trapped acetylcholine cleared. Endorphin flood active.',
    point: 'GB20 (Fengchi)'
  },
  {
    id: 'sciatica',
    name: 'Sciatic Nerve Pain',
    tag: 'GB30 • Deep Piriformis',
    painTitle: 'BURNING SCIATIC NERVE AGONY',
    painSubtitle: 'Taut Myofascial Sheath Compressing Sciatic Nerve Trunk',
    initialSpasm: '94% Spasm Contraction',
    reliefHeadline: 'Radiating Sciatic Compression Cleared',
    reliefDetail: 'Deep sheath decompressed. Micro-vascular blood flow surges +340%.',
    point: 'GB30 (Huantiao)'
  },
  {
    id: 'techneck',
    name: 'Trapezius Desk Spasm',
    tag: 'GB21 • Upper Trapezius',
    painTitle: 'FROZEN TRAPEZIUS TECH-NECK',
    painSubtitle: 'Hard Fibrotic Trigger Nodule from Prolonged Laptop Posture',
    initialSpasm: '86% Spasm Contraction',
    reliefHeadline: 'Stone-Weight Shoulders Melted',
    reliefDetail: 'Shoulders drop 2 inches. Cervical rotation restored. Pain-free mobility.',
    point: 'GB21 (Jianjing)'
  }
];

export default function TissueDepthSimulator({ onOpenBooking }) {
  const [selectedCondition, setSelectedCondition] = useState(PAIN_CONDITIONS[0]);
  const [isDisintegrated, setIsDisintegrated] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isNeedleHovered, setIsNeedleHovered] = useState(false);
  const [needlePos, setNeedlePos] = useState({ x: 50, y: 22 }); // Percentage coordinates
  const [isDraggingNeedle, setIsDraggingNeedle] = useState(false);

  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const animReqRef = useRef(null);

  // Trigger Thanos Snap Disintegration Engine
  const executeThanosDisintegration = useCallback(() => {
    if (isDisintegrated || isSnapping) return;
    setIsSnapping(true);
    playSnapAudio(isMuted);

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsDisintegrated(true);
      setIsSnapping(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.offsetWidth || 800);
    const height = (canvas.height = canvas.offsetHeight || 500);

    // 1. Render the Pain Text and Aura onto offscreen buffer
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext('2d');

    // Draw glowing pain text onto buffer
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';

    // Outer glow
    octx.shadowColor = '#f43f5e';
    octx.shadowBlur = 24;

    octx.font = 'bold 32px sans-serif';
    octx.fillStyle = '#ff2b56';
    octx.fillText(selectedCondition.painTitle, width / 2, height / 2 - 20);

    octx.font = '14px sans-serif';
    octx.fillStyle = '#fca5a5';
    octx.shadowBlur = 10;
    octx.fillText(selectedCondition.painSubtitle, width / 2, height / 2 + 25);

    octx.font = 'bold 12px monospace';
    octx.fillStyle = '#fb7185';
    octx.fillText(`[ ${selectedCondition.initialSpasm} ]`, width / 2, height / 2 + 60);

    // 2. Extract pixel data
    const imgData = octx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // 3. Generate Thanos Dust Particles
    const particles = [];
    const step = 4; // High density for fine ash dissolution

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        const a = data[idx + 3];

        if (a > 30) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Progressive line-by-line dissolution delay (starts from needle touch point)
          const distFromCenter = Math.hypot(x - width / 2, y - height / 2);
          const delay = (distFromCenter / (width / 2)) * 0.35 + Math.random() * 0.15;

          particles.push({
            x,
            y,
            size: Math.random() * 2.5 + 1.2,
            color: `rgba(${r},${g},${b},`,
            vx: Math.random() * 6 + 2.5, // Wind blowing to the right
            vy: (Math.random() - 0.75) * 5 - 1.5, // Dust drifting upward
            rot: Math.random() * Math.PI,
            vRot: (Math.random() - 0.5) * 0.2,
            alpha: 1,
            decay: Math.random() * 0.025 + 0.015,
            delay,
            active: false
          });
        }
      }
    }

    // 4. Run Physics Particle Animation Loop
    const startTime = performance.now();
    const duration = 1600; // ms
    let triggeredRelief = false;

    const animate = (now) => {
      const elapsed = (now - startTime) / duration;
      ctx.clearRect(0, 0, width, height);

      // Midpoint: trigger DOM state transition into peaceful relief
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
  }, [isDisintegrated, isSnapping, isMuted, selectedCondition]);

  // Reset to restore pain and try another condition
  const handleReset = useCallback(() => {
    if (animReqRef.current) cancelAnimationFrame(animReqRef.current);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setIsDisintegrated(false);
    setIsSnapping(false);
    setNeedlePos({ x: 50, y: 22 });
  }, []);

  // Keyboard Shortcuts (Space, 1-3, F, Esc, R)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      const key = e.key.toLowerCase();

      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (key === 'f') {
        setIsFullscreen((prev) => !prev);
      } else if (key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isDisintegrated) {
          executeThanosDisintegration();
        } else {
          handleReset();
        }
      } else if (key === '1') {
        setSelectedCondition(PAIN_CONDITIONS[0]);
        handleReset();
      } else if (key === '2') {
        setSelectedCondition(PAIN_CONDITIONS[1]);
        handleReset();
      } else if (key === '3') {
        setSelectedCondition(PAIN_CONDITIONS[2]);
        handleReset();
      } else if (key === 'r') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, isDisintegrated, executeThanosDisintegration, handleReset]);

  // Handle Dragging Needle toward Target Knot
  const handlePointerMove = (e) => {
    if (!isDraggingNeedle || !stageRef.current || isDisintegrated) return;
    const rect = stageRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (!clientX || !clientY) return;

    const x = Math.max(10, Math.min(90, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(10, Math.min(85, ((clientY - rect.top) / rect.height) * 100));
    setNeedlePos({ x, y });

    // Distance to center target (50%, 50%)
    const dist = Math.hypot(x - 50, y - 50);
    if (dist < 14) {
      setIsDraggingNeedle(false);
      executeThanosDisintegration();
    }
  };

  return (
    <div 
      tabIndex={0}
      data-testid="tissue-depth-simulator"
      className={`transition-all duration-300 font-sans focus:outline-none ${
        isFullscreen 
          ? 'fixed inset-0 z-50 w-screen h-screen bg-[#06080d] p-4 sm:p-8 flex flex-col justify-between overflow-y-auto select-none' 
          : 'relative bg-[#06080d] text-neutral-100 rounded-3xl border border-neutral-800 p-6 sm:p-10 shadow-2xl space-y-6 select-none overflow-hidden'
      }`}
    >
      {/* MINIMAL TOP BAR: Only What Is Necessary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-5">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
            Acupuncture Decompression Studio
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
            Insert the needle to disintegrate the pain.
          </h3>
        </div>

        {/* Minimal Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Pain Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {PAIN_CONDITIONS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCondition(c);
                  handleReset();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer flex items-center space-x-1.5 ${
                  selectedCondition.id === c.id
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <span>{c.name}</span>
                <kbd className="text-[9px] opacity-60 font-mono">[{i + 1}]</kbd>
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Full Screen Mode */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1 text-xs border ${
              isFullscreen 
                ? 'bg-amber-400 text-black border-amber-300 font-semibold' 
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
            }`}
            title="Toggle Full Screen [F]"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Full Screen'}</span>
          </button>
        </div>
      </div>

      {/* THE MAIN INTERACTIVE STAGE */}
      <div 
        ref={stageRef}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onMouseUp={() => setIsDraggingNeedle(false)}
        onTouchEnd={() => setIsDraggingNeedle(false)}
        className="relative w-full h-[520px] sm:h-[620px] rounded-2xl overflow-hidden border border-neutral-800 bg-[#05060a] flex flex-col items-center justify-center select-none shadow-inner"
      >
        {/* Subtle Background Radial Aura */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          isDisintegrated ? 'bg-gradient-to-b from-emerald-950/20 via-transparent to-neutral-950' : 'bg-gradient-to-b from-rose-950/20 via-transparent to-neutral-950'
        }`} />

        {/* Ambient Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        {/* THANOS PARTICLE DUST CANVAS: Renders 10,000+ ash particles blowing away */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-40"
        />

        {/* ------------------------------------------------------------- */}
        {/* STATE A: THE ACTIVE PAIN KNOT (BEFORE DISINTEGRATION)         */}
        {/* ------------------------------------------------------------- */}
        {!isDisintegrated && !isSnapping && (
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-xl space-y-4">
            
            {/* Spastic Myofascial Knot Target Ring */}
            <div 
              onClick={executeThanosDisintegration}
              className="group relative cursor-pointer flex flex-col items-center justify-center p-8 rounded-full border border-rose-500/40 bg-rose-950/30 backdrop-blur-sm hover:border-rose-400 hover:scale-105 transition-all shadow-[0_0_50px_rgba(244,63,94,0.25)]"
            >
              {/* Pulsing Spasm Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-500/60 animate-[spin_12s_linear_infinite]" />
              <div className="absolute -inset-3 rounded-full border border-rose-400/30 animate-ping opacity-60" />

              <span className="text-[10px] font-mono tracking-widest uppercase text-rose-400 font-bold bg-black/60 px-3 py-1 rounded-full border border-rose-800 mb-2">
                {selectedCondition.tag}
              </span>

              {/* Bold Pain Title */}
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-rose-400 tracking-tight leading-tight">
                {selectedCondition.painTitle}
              </h2>

              <p className="text-xs sm:text-sm text-rose-200/80 font-normal mt-2 max-w-md leading-relaxed">
                {selectedCondition.painSubtitle}
              </p>

              <div className="mt-4 px-3.5 py-1.5 rounded-full bg-rose-900/60 border border-rose-500/60 text-rose-200 font-mono text-xs flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span>{selectedCondition.initialSpasm}</span>
              </div>
            </div>

            {/* Instruction Prompt */}
            <div className="flex items-center space-x-2 text-xs text-neutral-400 pt-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Drag needle or tap center knot • Press <kbd className="px-1.5 py-0.5 bg-neutral-800 text-white rounded font-mono text-[10px]">Space</kbd> to strike</span>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* DRAGGABLE / TACTILE ACUPUNCTURE NEEDLE                        */}
        {/* ------------------------------------------------------------- */}
        {!isDisintegrated && (
          <div 
            style={{ 
              left: `${needlePos.x}%`, 
              top: `${needlePos.y}%`,
              transform: 'translate(-50%, -100%)'
            }}
            onMouseDown={() => setIsDraggingNeedle(true)}
            onTouchStart={() => setIsDraggingNeedle(true)}
            onClick={executeThanosDisintegration}
            onMouseEnter={() => setIsNeedleHovered(true)}
            onMouseLeave={() => setIsNeedleHovered(false)}
            className={`absolute z-30 flex flex-col items-center cursor-grab active:cursor-grabbing transition-transform select-none ${
              isDraggingNeedle ? 'scale-110' : 'hover:scale-105'
            }`}
            title="Drag needle to center knot or tap [Space]"
          >
            {/* Ring Finial */}
            <div className="w-5 h-5 rounded-full border-2 border-amber-400 bg-amber-500/40 shadow-[0_0_14px_rgba(245,158,11,0.8)]" />
            
            {/* Coiled Copper Handle (0.18mm Needle specs) */}
            <div className="w-3 h-20 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-sm shadow-lg border border-amber-400" />
            
            {/* Surgical Stainless 316L Mirror Shaft */}
            <div className="w-1 h-36 bg-white shadow-[0_0_10px_#fff]" />
            
            {/* Sharp Trocar Tip */}
            <div className="w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-t-[8px] border-t-white" />

            {/* Micro Badge */}
            <div className="mt-2 px-2.5 py-0.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-[10px] text-amber-300 font-mono whitespace-nowrap shadow-md">
              0.18mm Solid Steel
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STATE B: DISINTEGRATED / RELIEF ACHIEVED (DE-QI MOMENT)       */}
        {/* ------------------------------------------------------------- */}
        {isDisintegrated && (
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-xl space-y-6 animate-fadeIn">
            
            {/* Radiant Emerald De-Qi Healing Ripple */}
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.5)]">
              <Check className="w-10 h-10 text-emerald-400 animate-scaleIn" />
              <div className="absolute -inset-4 rounded-full border border-emerald-400/40 animate-ping" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block">
                De-Qi Achieved (得气) • Nerve Pathway Restored
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {selectedCondition.reliefHeadline}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal max-w-md mx-auto">
                {selectedCondition.reliefDetail}
              </p>
            </div>

            {/* Telemetry Payoff */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md text-center py-3 px-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-mono">Spasm Level</span>
                <span className="text-base font-bold text-emerald-400 font-mono">0%</span>
              </div>
              <div className="border-x border-neutral-800">
                <span className="text-[10px] uppercase text-neutral-400 block font-mono">Perfusion</span>
                <span className="text-base font-bold text-emerald-400 font-mono">+340%</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-mono">Pain Gate</span>
                <span className="text-base font-bold text-emerald-400 font-mono">Closed</span>
              </div>
            </div>

            {/* Direct Booking CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => onOpenBooking && onOpenBooking(selectedCondition.id)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold text-xs tracking-wide transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
              >
                <span>Experience This Relief with Dr. Nivedha (₹600)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Test Another Pain [R]</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* EDUCATIONAL FEAR-DEMISTIFYING FOOTNOTE: Clean, Single Line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-xs text-neutral-400">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white font-medium">Why it didn&apos;t hurt: </strong>
            Arura needles are 0.18mm solid surgical steel (2× hair thickness). They slide gently between muscle fibers with just 0.02 N force — 25× lower than hospital injection syringes.
          </span>
        </div>

        <div className="flex items-center space-x-2 shrink-0 text-[11px] font-mono text-neutral-400">
          <span>Keyboard:</span>
          <kbd className="px-1.5 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-white">Space</kbd>
          <kbd className="px-1.5 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-white">1–3</kbd>
          <kbd className="px-1.5 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-white">F</kbd>
          <kbd className="px-1.5 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-white">R</kbd>
        </div>
      </div>

    </div>
  );
}
