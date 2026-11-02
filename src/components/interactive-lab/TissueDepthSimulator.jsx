import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCw, 
  ArrowRight, 
  Activity, 
  Zap, 
  Flame, 
  MoveVertical, 
  Volume2, 
  VolumeX, 
  Target, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

// Web Audio API Synthesizer for organic, low-frequency clinical acoustic bio-feedback
function playClinicalSound(type, isMuted) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'entry') {
      // Very soft, high-frequency feather contact (0.02N)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'deqi') {
      // Warm, resonant singing-bowl harmonic chime (De-Qi achieved)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(261.63, now); // C4
      osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.4); // G4
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.start(now);
      osc.stop(now + 0.8);
    } else if (type === 'twirl') {
      // Subtle sliding friction tone (collagen winding)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.15);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'electro') {
      // Gentle micro-current tick
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    }
  } catch (_) {}
}

const CLINICAL_SCENARIOS = [
  {
    id: 'migraine',
    name: 'Chronic Migraine & Tension Headache',
    location: 'Cervical Splenius & Upper Trapezius',
    targetPoint: 'GB20 (Fengchi) / LI4 Pathway',
    targetDepthMm: 12.0,
    symptom: 'Severe throbbing temporal pressure, eye strain, and neck stiffness',
    pathology: 'Hyper-contracted taut band in deep cervical fascia compressing greater occipital nerves.',
    deQiResponse: 'A momentary feather-light entry, followed by a warm, radiating dull heaviness behind the ears. The muscle knot visibly twitches and releases, restoring blood flow to the cranial base.',
    doctorQuote: '“When the needle reaches the motor endplate at 12mm, the knot twitches and unlocks. Patients feel the vice-like grip on their temples dissolve immediately.” — Dr. Nivedha'
  },
  {
    id: 'sciatica',
    name: 'Lumbar Disc Herniation & Sciatica',
    location: 'Deep Piriformis & Lumbar Paraspinal',
    targetPoint: 'GB30 (Huantiao) / BL23 Pathway',
    targetDepthMm: 13.5,
    symptom: 'Sharp, burning nerve pain radiating down the posterior leg and glute',
    pathology: 'Ischemic spasm of the deep piriformis muscle mechanically pinching the sciatic nerve bundle.',
    deQiResponse: 'A deep, pleasant spreading ache down through the hip. The mechanical decompression interrupts the radiating electrical nerve signals, restoring pain-free walking.',
    doctorQuote: '“By releasing the deep piriformis spasm with needle precision, we relieve the sciatic compression at its physical root without surgery or oral analgesics.” — Dr. Nivedha'
  },
  {
    id: 'burnout',
    name: 'Executive Burnout & Severe Insomnia',
    location: 'Vagal Regulation & Heart Axis',
    targetPoint: 'HT7 (Shenmen) / PC6 Pathway',
    targetDepthMm: 9.0,
    symptom: 'Racing nocturnal thoughts, tight chest, chronic sympathetic fight-or-flight overdrive',
    pathology: 'Elevated central adrenergic tone with vagal nerve suppression and sleep architecture disruption.',
    deQiResponse: 'A tranquil, weighted-blanket sensation settling over the entire chest. Respiration drops naturally from 18 to 11 breaths per minute within two minutes of placement.',
    doctorQuote: '“Classical points calm the sympathetic overdrive at the neuro-chemical level, allowing natural melatonin and parasympathetic recovery to resume.” — Dr. Nivedha'
  }
];

export default function TissueDepthSimulator({ onOpenBooking }) {
  const [activeScenario, setActiveScenario] = useState(CLINICAL_SCENARIOS[0]);
  const [depthMm, setDepthMm] = useState(0); // 0.0 to 15.0 mm
  const [isDragging, setIsDragging] = useState(false);
  
  // Needle Manipulation States
  const [twirlAngleY, setTwirlAngleY] = useState(0); // 3D Y-axis rotation (left-to-right)
  const [isTwirling, setIsTwirling] = useState(false);
  const [isThrusting, setIsThrusting] = useState(false);
  const [isElectroActive, setIsElectroActive] = useState(false);
  const [electroFreq, setElectroFreq] = useState(2); // 2Hz or 100Hz
  const [isMoxaActive, setIsMoxaActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Biological Reaction States
  const [isKnotReleased, setIsKnotReleased] = useState(false);
  const [twitchAnimation, setTwitchAnimation] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(12);

  const viewportRef = useRef(null);
  const dragStartY = useRef(0);
  const dragStartX = useRef(0);
  const startDepth = useRef(0);
  const lastEntrySoundPlayed = useRef(false);

  // Monitor Depth against Target Knot
  useEffect(() => {
    const target = activeScenario.targetDepthMm;
    const isAtTargetZone = depthMm >= target - 0.8 && depthMm <= target + 1.2;

    // Sound cue on skin entry
    if (depthMm > 0.3 && !lastEntrySoundPlayed.current) {
      playClinicalSound('entry', isMuted);
      lastEntrySoundPlayed.current = true;
    } else if (depthMm === 0) {
      lastEntrySoundPlayed.current = false;
    }

    if (isAtTargetZone && !isKnotReleased) {
      // Trigger local twitch response (fasciculation)
      setTwitchAnimation(true);
      playClinicalSound('deqi', isMuted);
      const timer = setTimeout(() => {
        setIsKnotReleased(true);
        setTwitchAnimation(false);
      }, 700);
      return () => clearTimeout(timer);
    } else if (depthMm < 2.5) {
      // Reset if pulled back near surface
      setIsKnotReleased(false);
      setTwitchAnimation(false);
    }
  }, [depthMm, activeScenario, isKnotReleased, isMuted]);

  // Periodic Electro sound & pulse when active
  useEffect(() => {
    if (!isElectroActive || depthMm < 4.0) return;
    const interval = setInterval(() => {
      playClinicalSound('electro', isMuted);
    }, electroFreq === 2 ? 500 : 80);
    return () => clearInterval(interval);
  }, [isElectroActive, electroFreq, depthMm, isMuted]);

  // Pointer Down directly on the Needle Handle
  const handleNeedlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartX.current = e.clientX;
    startDepth.current = depthMm;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Pointer Move (Vertical Plunge + Horizontal Twirl Roll)
  const handleNeedlePointerMove = (e) => {
    if (!isDragging) return;
    
    // Vertical Drag -> Plunge into tissue
    const deltaY = e.clientY - dragStartY.current;
    const newDepth = Math.max(0, Math.min(15.0, startDepth.current + deltaY / 14));
    setDepthMm(newDepth);

    // Horizontal Drag on Handle -> Roll needle along Y-axis (Left to Right)
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 4) {
      setTwirlAngleY((prev) => prev + deltaX * 1.5);
      dragStartX.current = e.clientX;
    }
  };

  // Pointer Up
  const handleNeedlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  // Classical Twirling Technique (Nien Chuan - Left to Right 3D Rolling)
  const handleTwirl = () => {
    setIsTwirling(true);
    playClinicalSound('twirl', isMuted);
    // Smooth 360-degree axial spin left-to-right
    setTwirlAngleY((prev) => prev + 360);
    setTimeout(() => setIsTwirling(false), 600);

    // If near target, twirling triggers immediate fascial grasp and release
    if (depthMm >= activeScenario.targetDepthMm - 2.0) {
      setTwitchAnimation(true);
      playClinicalSound('deqi', isMuted);
      setTimeout(() => {
        setIsKnotReleased(true);
        setTwitchAnimation(false);
      }, 600);
    }
  };

  // Classical Lifting & Thrusting Technique (Ti Ch'a - Micro-pecking)
  const handleThrust = () => {
    if (depthMm < 4.0) {
      // Auto-advance to knot first
      setDepthMm(activeScenario.targetDepthMm);
    }
    setIsThrusting(true);
    playClinicalSound('entry', isMuted);

    // Micro-peck oscillation
    setTimeout(() => {
      setDepthMm((prev) => Math.max(0, prev - 1.2));
      setTimeout(() => {
        setDepthMm(activeScenario.targetDepthMm);
        setIsThrusting(false);
        setTwitchAnimation(true);
        playClinicalSound('deqi', isMuted);
        setTimeout(() => {
          setIsKnotReleased(true);
          setTwitchAnimation(false);
        }, 500);
      }, 150);
    }, 150);
  };

  // Reset to Surface
  const handleReset = () => {
    setDepthMm(0);
    setIsKnotReleased(false);
    setTwitchAnimation(false);
    setTwirlAngleY(0);
    setIsElectroActive(false);
    setIsMoxaActive(false);
  };

  // Change Scenario
  const handleSelectScenario = (scen) => {
    setActiveScenario(scen);
    setDepthMm(0);
    setIsKnotReleased(false);
    setTwitchAnimation(false);
    setTwirlAngleY(0);
    setIsElectroActive(false);
    setIsMoxaActive(false);
  };

  // Physiological Telemetry Calculations
  const penetrationForce = depthMm === 0 ? '0.00 N' : depthMm < 2.0 ? '0.02 N (Pain-free)' : depthMm < 8.0 ? '0.04 N (Fascial glide)' : isKnotReleased ? '0.03 N (Decompressed)' : '0.14 N (Taut knot)';
  const muscleSpasmPct = isKnotReleased ? 12 : Math.max(18, Math.min(95, Math.round(88 - (depthMm * 1.5))));
  const microBloodFlow = isKnotReleased ? (isMoxaActive ? 420 : 340) : Math.min(100, Math.round(depthMm * 14));
  const vagusTone = isKnotReleased ? 'Parasympathetic Recovery (96%)' : depthMm > 6.0 ? 'Vagal Activation (62%)' : 'Resting Baseline (32%)';

  // Real-time Patient Sensation Description
  const getPatientSensation = () => {
    if (depthMm === 0) return 'Sterile skin boundary. Zero sensation.';
    if (depthMm < 2.5) return 'Feather-light dermal entry (0.02 N). 25× lower force than a vaccine shot. 92% of patients feel nothing.';
    if (depthMm < 8.0) return 'Smooth gliding through collagen fascia and interstitial fluid. No pain receptors engaged.';
    if (depthMm >= activeScenario.targetDepthMm - 1.0 && depthMm <= activeScenario.targetDepthMm + 1.2) {
      if (isKnotReleased) {
        return 'DE-QI (得气)! A warm, soothing dull heaviness. The vice-like tension dissolves and micro-circulation surges.';
      }
      return 'Engaging taut myofascial knot. Gentle pressure felt as needle contacts the active trigger endplate.';
    }
    return 'Deep muscular bed. Sensation of gentle relaxation and localized release.';
  };

  // Mathematical Mapping: Needle tip anchored exactly to tissue layers
  // At depthMm = 0 -> Tip is at 14% top (skin surface)
  // At depthMm = 12 -> Tip is at 79% top (bullseye in dark purple knot)
  // At depthMm = 15 -> Tip is at 93% top (deep muscle floor)
  const tipPercent = 14 + (depthMm / 15.0) * 79;
  
  // Distance to target knot
  const distanceToTarget = depthMm - activeScenario.targetDepthMm;
  const isTargetLocked = Math.abs(distanceToTarget) <= 1.0;
  const isApproaching = depthMm >= 8.0 && !isTargetLocked;

  return (
    <div className="bg-[#fcfbf9] rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-xs space-y-10 select-none">
      
      {/* Top Clinical Case Selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200 pb-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand tracking-normal">
            <span>Living Microscopic Cross-Section</span>
            <span className="text-neutral-300">/</span>
            <span>Interactive Clinical Session</span>
          </div>

          <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink leading-[1.12]">
            What happens inside your body <br />
            <span className="text-brand">when the needle enters?</span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            Take the doctor’s seat. Drag the 0.18mm surgical needle downward to navigate living skin, collagen fascia, and deep muscle. Roll it left-to-right, activate electro-acupuncture, and unlock the contracted knot.
          </p>
        </div>

        {/* Clinical Scenario Selector */}
        <div className="flex flex-wrap gap-2">
          {CLINICAL_SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              onClick={() => handleSelectScenario(scen)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeScenario.id === scen.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:border-brand'
              }`}
            >
              {scen.name.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN INTERACTIVE CLINICAL SIMULATION STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): The Realistic Living Tissue Cross-Section Viewport & Session Tools */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-5">
          
          {/* Top Status & Audio Bar */}
          <div className="flex flex-wrap items-center justify-between text-xs text-neutral-600 font-medium pb-3 border-b border-neutral-100 gap-3">
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isKnotReleased ? 'bg-emerald-500 animate-pulse' : 'bg-brand'}`} />
              <span className="text-neutral-800 font-semibold text-xs sm:text-sm">
                {isKnotReleased 
                  ? '🎯 De-Qi Achieved — Trigger Knot Decompressed' 
                  : isDragging 
                  ? `Plunging: ${depthMm.toFixed(1)} mm depth` 
                  : 'Drag needle handle downward to plunge'}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Mute/Unmute Audio Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs transition-colors flex items-center space-x-1 cursor-pointer"
                title={isMuted ? 'Unmute clinical audio' : 'Mute clinical audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-brand" />}
                <span className="text-[11px] font-medium">{isMuted ? 'Muted' : 'Sound On'}</span>
              </button>

              <button
                onClick={handleReset}
                className="text-[11px] text-neutral-500 hover:text-brand transition-colors cursor-pointer"
              >
                Reset to surface
              </button>
            </div>
          </div>

          {/* THE MICROSCOPIC TISSUE VIEWPORT */}
          <div 
            ref={viewportRef}
            className="relative w-full aspect-[16/9] max-h-[460px] rounded-xl overflow-hidden border border-neutral-200 shadow-inner bg-neutral-900 cursor-ns-resize select-none"
          >
            {/* High-Resolution Scientific Living Tissue Micro-Cross Section */}
            <img 
              src={getAssetUrl('tissue_cross_section_clean.jpg')} 
              alt="Scientific cross-section of living skin, fascia, and muscle tissue" 
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />

            {/* Subsurface Tissue Layer Labels (Right side) */}
            <div className="absolute top-0 right-3 bottom-0 pointer-events-none flex flex-col justify-between py-3 text-right text-[9.5px] font-bold text-white/90 drop-shadow-sm tabular-nums z-10">
              <div className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                <span>Epidermis & Dermis (0–3mm)</span>
              </div>
              <div className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                <span>Subcutaneous Fascia (4–8mm)</span>
              </div>
              <div className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-brand/50">
                <span className="text-pink-200 font-bold">Motor Endplate ({activeScenario.targetDepthMm}mm)</span>
              </div>
              <div className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                <span>Deep Skeletal Muscle (12–15mm)</span>
              </div>
            </div>

            {/* SKIN SURFACE BOUNDARY LINE (14% from top) */}
            <div 
              className="absolute left-0 right-0 border-t border-dashed border-white/40 pointer-events-none z-10"
              style={{ top: '14%' }}
            >
              <span className="absolute left-3 -top-3 text-[9px] text-white/80 font-semibold bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                Skin Surface (0.0 mm)
              </span>
            </div>

            {/* TARGET MOTOR KNOT & DYNAMIC MARKING RETICLE */}
            {/* Positioned accurately over the real anatomical dark nodule at top: 79%, left: 50% */}
            <div 
              className="absolute pointer-events-none z-20"
              style={{
                left: '50%',
                top: '79%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Outer Dynamic Target Lock Brackets */}
              <div className={`relative flex items-center justify-center transition-all duration-300 ${
                isTargetLocked ? 'w-32 h-20' : isApproaching ? 'w-28 h-18' : 'w-24 h-16'
              }`}>
                {/* 4 Precision Corner Crosshair Brackets */}
                <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300 ${
                  isTargetLocked ? 'border-emerald-400' : isApproaching ? 'border-amber-400' : 'border-red-400/90'
                }`} />
                <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300 ${
                  isTargetLocked ? 'border-emerald-400' : isApproaching ? 'border-amber-400' : 'border-red-400/90'
                }`} />
                <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300 ${
                  isTargetLocked ? 'border-emerald-400' : isApproaching ? 'border-amber-400' : 'border-red-400/90'
                }`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 ${
                  isTargetLocked ? 'border-emerald-400' : isApproaching ? 'border-amber-400' : 'border-red-400/90'
                }`} />

                {/* Center Marking Ring */}
                <motion.div
                  animate={{
                    scale: twitchAnimation ? [1, 1.4, 0.85, 1.15, 1] : isTargetLocked ? [1, 1.06, 1] : 1,
                    filter: isKnotReleased ? 'brightness(1.25)' : 'none'
                  }}
                  transition={{ 
                    duration: twitchAnimation ? 0.5 : 2, 
                    repeat: isTargetLocked && !twitchAnimation ? Infinity : 0 
                  }}
                  className={`w-full h-full rounded-2xl border-2 transition-all duration-300 ${
                    isTargetLocked 
                      ? 'border-emerald-400 bg-emerald-500/15 shadow-[0_0_35px_rgba(52,211,153,0.7)]' 
                      : isApproaching
                      ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_20px_rgba(251,191,36,0.5)]'
                      : 'border-red-400/80 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                  }`}
                />

                {/* Target Marker Label Pill */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-sm backdrop-blur-md flex items-center space-x-1 ${
                    isTargetLocked
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400/80 animate-pulse'
                      : isApproaching
                      ? 'bg-amber-950/90 text-amber-300 border-amber-400/80'
                      : 'bg-black/80 text-red-300 border-red-500/50'
                  }`}>
                    <Target className="w-2.5 h-2.5" />
                    <span>
                      {isTargetLocked 
                        ? 'TARGET LOCKED: DE-QI ACTIVE' 
                        : isApproaching 
                        ? `ENGAGING KNOT (${activeScenario.targetDepthMm}mm)` 
                        : `TARGET KNOT: ${activeScenario.targetDepthMm} mm`}
                    </span>
                  </span>
                </div>

                {/* Bio-Electric Nitric Oxide Flush Wave (When Decompressed) */}
                {isKnotReleased && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 2.6], opacity: [0.8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl border-2 border-emerald-300"
                  />
                )}
              </div>
            </div>

            {/* ELECTRO-ACUPUNCTURE BIO-CURRENT RAYS (When active) */}
            {isElectroActive && depthMm >= 4.0 && (
              <div 
                className="absolute inset-0 pointer-events-none z-15"
                style={{
                  background: 'radial-gradient(ellipse at 50% 79%, rgba(14, 165, 233, 0.25) 0%, transparent 60%)'
                }}
              >
                {/* Horizontal Electrical Micro-Pulses along muscle striations */}
                <motion.div
                  animate={{ opacity: [0.2, 0.9, 0.2], scaleX: [0.8, 1.1, 0.8] }}
                  transition={{ duration: electroFreq === 2 ? 0.5 : 0.08, repeat: Infinity }}
                  className="absolute left-1/4 right-1/4 h-1 top-[79%] bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_15px_#38bdf8]"
                />
              </div>
            )}

            {/* WARM NEEDLE MOXIBUSTION INFRARED HEAT RADIANCE (When active) */}
            {isMoxaActive && depthMm >= 3.0 && (
              <div 
                className="absolute inset-0 pointer-events-none z-15"
                style={{
                  background: 'radial-gradient(circle at 50% 60%, rgba(249, 115, 22, 0.28) 0%, transparent 55%)'
                }}
              >
                <motion.div
                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute left-1/3 right-1/3 h-16 top-[65%] rounded-full bg-amber-500/30 blur-xl"
                />
              </div>
            )}

            {/* THE DIRECTLY DRAGGABLE 0.18mm SURGICAL NEEDLE */}
            {/* Positioned with bottom tip anchored at tipPercent */}
            <div 
              onPointerDown={handleNeedlePointerDown}
              onPointerMove={handleNeedlePointerMove}
              onPointerUp={handleNeedlePointerUp}
              className={`absolute left-1/2 z-30 transition-shadow ${
                isDragging ? 'cursor-grabbing scale-102' : 'cursor-grab hover:scale-102'
              }`}
              style={{
                top: `${tipPercent}%`,
                transform: 'translate(-50%, -100%)', // Anchor bottom tip
                touchAction: 'none'
              }}
            >
              {/* Floating Real-Time Depth Badge with distance arrow */}
              <div className="absolute -left-28 top-28 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-neutral-300 shadow-md text-[11px] font-bold tabular-nums text-ink whitespace-nowrap pointer-events-none z-40">
                <span className="text-brand mr-1">▼</span>
                <span>{depthMm.toFixed(1)} mm</span>
                {isTargetLocked && (
                  <span className="ml-1 text-emerald-600 font-extrabold">✓ Locked</span>
                )}
              </div>

              {/* Electro Lead Alligator Clip Overlay (When Electro active) */}
              {isElectroActive && (
                <div className="absolute top-2 -right-12 bg-cyan-600/95 text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-md flex items-center space-x-1 animate-pulse z-40 border border-cyan-400">
                  <Zap className="w-2.5 h-2.5" />
                  <span>{electroFreq}Hz</span>
                </div>
              )}

              {/* Moxa Smoldering Cone Overlay (When Moxa active) */}
              {isMoxaActive && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-40">
                  <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-t from-orange-600 to-amber-300 animate-pulse shadow-[0_0_14px_#f97316]" />
                  <span className="text-[8.5px] font-extrabold text-amber-300 drop-shadow-md tracking-wider uppercase mt-0.5">Moxa</span>
                </div>
              )}

              {/* Authentic Photographic Acupuncture Needle with 3D Y-Axis Rolling */}
              <div 
                className="relative flex flex-col items-center"
                style={{
                  perspective: '800px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 3D Axial Roll along Y-axis (Left-to-Right Spin, NOT a fan blade!) */}
                <div
                  style={{
                    transform: `rotateY(${twirlAngleY}deg)`,
                    transformOrigin: 'center center',
                    transition: isTwirling ? 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
                  }}
                  className="relative"
                >
                  <img 
                    src={getAssetUrl('single_needle_authentic.png')} 
                    alt="Authentic 0.18mm acupuncture needle"
                    className="select-none pointer-events-none drop-shadow-xl"
                    style={{
                      height: '240px',
                      width: 'auto'
                    }}
                    draggable={false}
                  />

                  {/* Dynamic Specular Sheen during Twirl */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity"
                    style={{
                      background: `linear-gradient(${twirlAngleY % 360}deg, transparent 40%, rgba(255,255,255,0.9) 50%, transparent 60%)`
                    }}
                  />
                </div>

                {/* Subtle Dermal Contact Indentation & Shadow at Skin Surface */}
                <div 
                  className="w-5 h-1.5 bg-black/50 rounded-full filter blur-[1px] transform -translate-y-1 pointer-events-none"
                  style={{ opacity: depthMm > 0 ? 0.7 : 0.2 }}
                />
              </div>

            </div>

            {/* Prompt Hint when at Surface */}
            {depthMm === 0 && !isDragging && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200 shadow-xs pointer-events-none text-[11px] text-neutral-700 font-medium z-10 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
                <span>Drag the coiled needle handle downward to plunge</span>
              </div>
            )}

          </div>

          {/* Precision Micrometer Depth Slider */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-neutral-700">Needle Insertion Depth (Precision Dial)</span>
              <span className="text-brand font-bold text-sm tabular-nums">{depthMm.toFixed(1)} mm</span>
            </div>
            <input 
              type="range"
              min="0"
              max="15"
              step="0.1"
              value={depthMm}
              onChange={(e) => setDepthMm(parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-medium">
              <span>Epidermis (0mm)</span>
              <span>Dermis (3mm)</span>
              <span>Fascia (6mm)</span>
              <span className="text-brand font-bold">Target Knot ({activeScenario.targetDepthMm}mm)</span>
              <span>Deep Muscle (15mm)</span>
            </div>
          </div>

          {/* INTERACTIVE CLINICAL TECHNIQUE TOOLBAR (The Hands-On Session Controls) */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
              Clinical Manipulation Techniques (Try Each in Real Time)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              
              {/* 1. Classical Left-to-Right 3D Twirl */}
              <button
                onClick={handleTwirl}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isTwirling 
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm' 
                    : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200'
                }`}
                title="Roll handle left-to-right between thumb and index finger"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <RotateCw className={`w-4 h-4 ${isTwirling ? 'text-brand animate-spin' : 'text-neutral-600'}`} />
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">
                    Nien Chuan
                  </span>
                </div>
                <div className="text-xs font-bold">3D Twirl (Roll L→R)</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">Winds collagen fascia</div>
              </button>

              {/* 2. Classical Lift & Thrust (Ti Ch'a) */}
              <button
                onClick={handleThrust}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isThrusting 
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm' 
                    : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200'
                }`}
                title="Micro-pecking pecks knot to elicit twitch response"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <MoveVertical className={`w-4 h-4 ${isThrusting ? 'text-brand animate-bounce' : 'text-neutral-600'}`} />
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">
                    Ti Ch’a
                  </span>
                </div>
                <div className="text-xs font-bold">Thrust & Lift</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">Elicits local twitch</div>
              </button>

              {/* 3. Electro-Acupuncture Mode */}
              <button
                onClick={() => {
                  if (!isElectroActive && depthMm < 4.0) setDepthMm(activeScenario.targetDepthMm);
                  setIsElectroActive(!isElectroActive);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isElectroActive 
                    ? 'bg-cyan-950 text-cyan-200 border-cyan-500 shadow-sm' 
                    : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200'
                }`}
                title="Micro-current pulses gate pain and release endorphins"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Zap className={`w-4 h-4 ${isElectroActive ? 'text-cyan-400 animate-pulse' : 'text-neutral-600'}`} />
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                    isElectroActive ? 'bg-cyan-800 text-cyan-100' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {isElectroActive ? `${electroFreq} Hz` : 'Dian Zhen'}
                  </span>
                </div>
                <div className="text-xs font-bold">
                  {isElectroActive ? 'Electro: Active' : 'Electro-Acu'}
                </div>
                <div className="text-[10px] text-neutral-500 mt-0.5">Endorphin frequency</div>
              </button>

              {/* 4. Warm Needle Moxibustion */}
              <button
                onClick={() => {
                  if (!isMoxaActive && depthMm < 3.0) setDepthMm(activeScenario.targetDepthMm);
                  setIsMoxaActive(!isMoxaActive);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isMoxaActive 
                    ? 'bg-amber-950 text-amber-200 border-amber-500 shadow-sm' 
                    : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200'
                }`}
                title="Thermal infrared warmth radiates down the shaft"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Flame className={`w-4 h-4 ${isMoxaActive ? 'text-amber-400 animate-pulse' : 'text-neutral-600'}`} />
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                    isMoxaActive ? 'bg-amber-800 text-amber-100' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    Wen Zhen
                  </span>
                </div>
                <div className="text-xs font-bold">
                  {isMoxaActive ? 'Warm Moxa: On' : 'Warm Needle'}
                </div>
                <div className="text-[10px] text-neutral-500 mt-0.5">Infrared heat wave</div>
              </button>

            </div>
          </div>

          {/* REAL-TIME PATIENT SENSATION CARD */}
          <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-1.5 border border-neutral-800">
            <div className="flex items-center justify-between text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
              <span>Patient Sensation Monitor (Real Time)</span>
              <span className="text-brand font-bold">{depthMm.toFixed(1)} mm</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
              {getPatientSensation()}
            </p>
          </div>

        </div>

        {/* Right Column (4 cols): Live Clinical Bio-Telemetry & Dr. Nivedha's Log */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Bio-Telemetry Dashboard */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Live Biomechanical Telemetry
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Active Sensors
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-neutral-500 block">Dermal Penetration Force</span>
                <span className="font-display font-bold text-ink text-lg tabular-nums mt-0.5 block">
                  {penetrationForce}
                </span>
                <span className="text-[10px] text-neutral-400">Human pain threshold is 0.50 N (acupuncture is 25× lower)</span>
              </div>

              <div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-medium">Myofascial Spasm Level</span>
                  <span className={`font-bold tabular-nums ${isKnotReleased ? 'text-emerald-700' : 'text-red-700'}`}>
                    {muscleSpasmPct}%
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mt-1.5">
                  <div 
                    className={`h-full transition-all duration-300 ${isKnotReleased ? 'bg-emerald-500' : 'bg-red-500'}`} 
                    style={{ width: `${muscleSpasmPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-medium">Local Micro-Perfusion (Blood Flow)</span>
                  <span className="font-bold text-brand tabular-nums">+{microBloodFlow}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mt-1.5">
                  <div 
                    className="h-full bg-brand transition-all duration-300" 
                    style={{ width: `${Math.min(100, (microBloodFlow / 420) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block">Autonomic Vagus Response</span>
                <span className="font-semibold text-neutral-900 text-xs block mt-0.5">{vagusTone}</span>
              </div>
            </div>
          </div>

          {/* Clinical Finding Dossier Card */}
          <div className="p-6 rounded-2xl bg-[#fdfcfa] border border-neutral-200 space-y-4">
            <div>
              <span className="text-xs text-brand font-semibold block">{activeScenario.location}</span>
              <h4 className="font-display text-lg font-bold text-ink mt-0.5">
                {activeScenario.name}
              </h4>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950/90 leading-relaxed space-y-1">
              <strong className="block text-amber-900 font-semibold">The De-Qi Sensation:</strong>
              <p className="font-normal">{activeScenario.deQiResponse}</p>
            </div>

            <p className="text-xs italic text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
              {activeScenario.doctorQuote}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking(`Consultation (${activeScenario.name})`, 600)}
                className="w-full py-3.5 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark transition-colors flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <span>Book Priority Consultation (₹600)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* COMPANION SCALE COMPARISON: "How Thin is 0.18mm?" (Directly below) */}
      <div className="pt-10 border-t border-neutral-200">
        <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs uppercase tracking-wider text-brand font-bold block">
                True Relative Scale
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                How thin is 0.18 millimeters?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Overlaying three physical objects at exact relative proportion. Notice why an acupuncture needle feels completely different from a standard hospital injection syringe.
              </p>
            </div>

            {/* Magnification Slider Control */}
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2 min-w-[240px]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-700">Microscope Zoom</span>
                <span className="font-bold text-brand tabular-nums">{zoomLevel}× Scale</span>
              </div>
              <input 
                type="range"
                min="4"
                max="24"
                step="1"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand"
              />
            </div>
          </div>

          {/* 3 True Scale Cross-Section Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-stretch">
            
            {/* 1. Human Hair */}
            <div className="p-6 rounded-2xl bg-neutral-50/50 border border-neutral-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Reference</span>
                  <span className="text-xs font-bold text-neutral-800 tabular-nums">~0.08 mm</span>
                </div>
                <h4 className="font-display text-lg font-bold text-ink">Human Scalp Hair</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Average human hair shaft diameter (80 microns). Flexible biological keratin fiber.
                </p>
              </div>

              <div className="py-6 bg-white rounded-xl border border-neutral-200/80 flex items-center justify-center relative h-28 overflow-hidden">
                <div 
                  className="bg-amber-900/80 rounded-full shadow-xs"
                  style={{
                    width: `${0.08 * zoomLevel * 14}px`,
                    height: `${0.08 * zoomLevel * 14}px`,
                    minWidth: '4px',
                    minHeight: '4px'
                  }}
                />
                <span className="absolute bottom-2 text-[10px] text-neutral-400 font-medium">
                  Actual Cross-Section at {zoomLevel}×
                </span>
              </div>

              <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-200/60">
                Solid organic filament
              </div>
            </div>

            {/* 2. Arura Acupuncture Needle (Hero) */}
            <div className="p-6 rounded-2xl bg-white border-2 border-brand shadow-sm space-y-4 flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-brand text-white text-[10px] font-bold uppercase tracking-wider">
                Arura Standard
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-brand uppercase tracking-wider">Solid Needle</span>
                  <span className="text-xs font-bold text-brand tabular-nums">0.18 mm</span>
                </div>
                <h4 className="font-display text-lg font-bold text-ink">Arura Acupuncture Needle</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Surgical stainless steel 316L. Just over twice the thickness of a single hair strand.
                </p>
              </div>

              <div className="py-6 bg-neutral-50 rounded-xl flex items-center justify-center relative h-28 overflow-hidden border border-brand/20">
                <div 
                  className="bg-neutral-800 rounded-full border border-neutral-400 shadow-sm"
                  style={{
                    width: `${0.18 * zoomLevel * 14}px`,
                    height: `${0.18 * zoomLevel * 14}px`
                  }}
                />
                <span className="absolute bottom-2 text-[10px] text-brand font-semibold">
                  Solid Pin-Point · Does not cut tissue
                </span>
              </div>

              <div className="text-[11px] text-neutral-700 font-medium pt-1 border-t border-neutral-100">
                Slides between muscle fibers painlessly
              </div>
            </div>

            {/* 3. Hypodermic Injection Syringe Needle */}
            <div className="p-6 rounded-2xl bg-neutral-50/50 border border-neutral-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Hospital Syringe</span>
                  <span className="text-xs font-bold text-neutral-800 tabular-nums">0.81 mm (21 Gauge)</span>
                </div>
                <h4 className="font-display text-lg font-bold text-ink">Blood Draw / Syringe Needle</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Hollow steel cylinder with beveled razor edge designed to slice tissue to inject fluid.
                </p>
              </div>

              <div className="py-6 bg-white rounded-xl border border-neutral-200/80 flex items-center justify-center relative h-28 overflow-hidden">
                <div 
                  className="rounded-full border-[5px] border-neutral-600 bg-transparent shadow-sm flex items-center justify-center"
                  style={{
                    width: `${0.81 * zoomLevel * 14}px`,
                    height: `${0.81 * zoomLevel * 14}px`
                  }}
                >
                  <span className="text-[9px] text-neutral-400">Hollow</span>
                </div>
                <span className="absolute bottom-2 text-[10px] text-neutral-400 font-medium">
                  4.5× Thicker + Slices tissue
                </span>
              </div>

              <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-200/60">
                Why hospital shots sting, but acupuncture does not
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}