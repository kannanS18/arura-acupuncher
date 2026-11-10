import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, CheckCircle2, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { preloadAnatomyModels, isAnatomyModelsLoaded } from './modelCache';

export default function AnatomyLabPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing 3D Anatomical Engine...');
  const [detail, setDetail] = useState('Allocating RAM & WebGL buffers');
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const isAlreadyWarm = isAnatomyModelsLoaded();

    // Start preloading models into RAM
    preloadAnatomyModels(({ percent, status: s, detail: d }) => {
      if (!isMounted) return;
      setProgress((prev) => Math.max(prev, percent));
      if (s) setStatus(s);
      if (d) setDetail(d);
    }).then(() => {
      if (!isMounted) return;
      setProgress(100);
      setStatus('3D clinical anatomical engine active');
      setDetail('Resident in RAM · Seamless 60 FPS');

      // Short delay for visual polish so user sees 100% confirmation
      const delay = isAlreadyWarm ? 120 : 450;
      setTimeout(() => {
        if (!isMounted) return;
        setIsDone(true);

        // Smooth fade-out before unmounting
        setTimeout(() => {
          if (!isMounted) return;
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 500);
      }, delay);
    });

    return () => {
      isMounted = false;
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#070b14] text-white select-none transition-opacity duration-500 ease-out ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(224,40,104,0.35) 0%, rgba(14,165,233,0.15) 50%, transparent 70%)'
        }}
      />

      {/* Grid Pattern Ambient Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-md w-full mx-4 flex flex-col items-center text-center space-y-6 sm:space-y-8">
        
        {/* Holographic Radar / Concentric Rings Scanning Icon */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer Pulsing Ring */}
          <div className="absolute inset-0 rounded-full border border-[#e02868]/30 animate-ping" />
          
          {/* Middle Rotating Dashed Ring */}
          <div className="absolute inset-1 rounded-full border border-dashed border-[#e02868]/40 animate-spin [animation-duration:12s]" />
          
          {/* Inner Glowing Aura Ring */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-[#e02868]/20 to-sky-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg shadow-[#e02868]/20">
            {progress >= 100 ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-in zoom-in-75 duration-300" />
            ) : (
              <Activity className="w-8 h-8 text-[#e02868] animate-pulse" />
            )}
          </div>
        </div>

        {/* Brand & Title Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e02868] animate-pulse" />
            <span className="tracking-wider uppercase text-[11px] font-bold text-[#e02868]">
              Arura 3D Science Lab
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
            Downloading 3D Anatomy into RAM
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
            Pre-caching skeletal mannequin & living tissue strata for stutter-free 60 FPS exploration.
          </p>
        </div>

        {/* Progress Bar & Numerical Counter */}
        <div className="w-full space-y-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#e02868]" />
              <span>Memory Buffer</span>
            </span>
            <span className="text-lg font-bold font-mono text-white">
              {progress}%
            </span>
          </div>

          {/* Glowing Gradient Track */}
          <div className="relative w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#e02868] via-rose-400 to-sky-400 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(224,40,104,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Technical Readout */}
          <div className="flex flex-col items-center gap-1 pt-1 text-center">
            <span className="text-xs font-semibold text-neutral-200 tracking-tight transition-all">
              {status}
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              {detail}
            </span>
          </div>
        </div>

        {/* Engine Specification Badges */}
        <div className="grid grid-cols-2 gap-2 w-full text-[11px] font-mono text-neutral-400">
          <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate">19,226 Vertices</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">15mm Tissue Depth</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#e02868] shrink-0" />
            <span className="truncate">47 Bio-Acupoints</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">60 FPS Hardware VRAM</span>
          </div>
        </div>

      </div>
    </div>
  );
}
