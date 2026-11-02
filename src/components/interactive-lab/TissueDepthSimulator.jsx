import React, { useState, useRef, useEffect } from 'react';
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
  Eye,
  Box,
  Layers,
  Sparkles,
  PackageCheck,
  CheckCircle2,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

// Web Audio API Synthesizer for organic clinical acoustic bio-feedback
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

    if (type === 'peel') {
      // Crisp paper/foil peel tear sound
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'pick') {
      // Light metallic ring as needle is lifted
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'tap') {
      // Crisp painless dermal tap (0.01s flick)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'entry') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.05);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'deqi') {
      // Deep resonant singing-bowl harmonic chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(261.63, now); // C4
      osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.45); // G4
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc.start(now);
      osc.stop(now + 0.9);
    } else if (type === 'twirl') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.16);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'electro') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(130, now);
      gain.gain.setValueAtTime(0.03, now);
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
  
  // Interactive Ritual Workflow: 'tray' (Unpack packet) -> 'active' (Anatomical Plunge)
  const [ritualStage, setRitualStage] = useState('active'); // 'tray' | 'peeling' | 'unpacked' | 'active'
  const [isPacketPeeled, setIsPacketPeeled] = useState(true);

  const [depthMm, setDepthMm] = useState(0); // 0.0 to 15.0 mm
  const [isDragging, setIsDragging] = useState(false);
  
  // Perspective View Mode: '3d_cube' (Grand Volumetric Cube) or 'micro_section' (Frontal Cross-Section)
  const [viewMode, setViewMode] = useState('3d_cube');
  const [showLoupe, setShowLoupe] = useState(true);

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

  // Handle Peel Packet Action
  const handlePeelPacket = () => {
    setRitualStage('peeling');
    playClinicalSound('peel', isMuted);
    setTimeout(() => {
      setIsPacketPeeled(true);
      setRitualStage('unpacked');
    }, 600);
  };

  // Handle Take Needle Action
  const handleExtractNeedle = () => {
    playClinicalSound('pick', isMuted);
    setRitualStage('active');
    setDepthMm(0);
  };

  // Quick-Tap Dermal Entry (The painless flick)
  const handleQuickTap = () => {
    playClinicalSound('tap', isMuted);
    setDepthMm(2.0); // Immediately breaches the epidermis to 2.0 mm effortlessly
  };

  // Monitor Depth against Target Knot
  useEffect(() => {
    const target = activeScenario.targetDepthMm;
    const isAtTargetZone = depthMm >= target - 0.8 && depthMm <= target + 1.2;

    if (depthMm > 0.3 && !lastEntrySoundPlayed.current) {
      playClinicalSound('entry', isMuted);
      lastEntrySoundPlayed.current = true;
    } else if (depthMm === 0) {
      lastEntrySoundPlayed.current = false;
    }

    if (isAtTargetZone && !isKnotReleased) {
      setTwitchAnimation(true);
      playClinicalSound('deqi', isMuted);
      const timer = setTimeout(() => {
        setIsKnotReleased(true);
        setTwitchAnimation(false);
      }, 700);
      return () => clearTimeout(timer);
    } else if (depthMm < 2.5) {
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
    setTwirlAngleY((prev) => prev + 360);
    setTimeout(() => setIsTwirling(false), 600);

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
      setDepthMm(activeScenario.targetDepthMm);
    }
    setIsThrusting(true);
    playClinicalSound('entry', isMuted);

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

  const handleReset = () => {
    setDepthMm(0);
    setIsKnotReleased(false);
    setTwitchAnimation(false);
    setTwirlAngleY(0);
    setIsElectroActive(false);
    setIsMoxaActive(false);
  };

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
  const muscleSpasmPct = isKnotReleased ? 10 : Math.max(16, Math.min(95, Math.round(88 - (depthMm * 1.5))));
  const microBloodFlow = isKnotReleased ? (isMoxaActive ? 420 : 340) : Math.min(100, Math.round(depthMm * 14));
  const vagusTone = isKnotReleased ? 'Parasympathetic Recovery (96%)' : depthMm > 6.0 ? 'Vagal Activation (62%)' : 'Resting Baseline (32%)';

  const getPatientSensation = () => {
    if (depthMm === 0) return 'Sterile skin boundary. Zero sensation.';
    if (depthMm < 2.5) return 'Feather-light dermal entry (0.02 N). 25× lower force than a vaccine needle. Did you feel that? 92% of patients feel practically nothing.';
    if (depthMm < 8.0) return 'Smooth gliding through collagen fascia and interstitial matrix. No sharp cutting receptors engaged.';
    if (depthMm >= activeScenario.targetDepthMm - 1.0 && depthMm <= activeScenario.targetDepthMm + 1.2) {
      if (isKnotReleased) {
        return 'DE-QI (得气)! A deeply soothing, warm heaviness spreading behind the neck and temples. Spastic knot dissolves.';
      }
      return 'Engaging hyper-contracted motor endplate. Gentle radiating pressure felt as needle contacts the active trigger zone.';
    }
    return 'Deep muscular bed. Sensation of profound relaxation and systemic tension release.';
  };

  // GEOMETRIC MAPPING FOR 3D CUBE vs MICROSCOPIC SECTION
  const is3D = viewMode === '3d_cube';
  const needleXPercent = is3D ? 62.5 : 50.0;
  const surfaceYPercent = is3D ? 35.0 : 14.0;
  const knotYPercent = is3D ? 64.5 : 79.0;
  const tipYPercent = surfaceYPercent + (depthMm / 15.0) * (knotYPercent + (is3D ? 7 : 14) - surfaceYPercent);

  // Target Lock state
  const distanceToTarget = depthMm - activeScenario.targetDepthMm;
  const isTargetLocked = Math.abs(distanceToTarget) <= 1.0;
  const isApproaching = depthMm >= 8.0 && !isTargetLocked;

  return (
    <div className="bg-[#0b0f17] text-white rounded-3xl border border-neutral-800 p-6 sm:p-10 shadow-2xl space-y-10 select-none overflow-hidden relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header & Clinical Scenario Selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800/80 pb-6 relative z-10">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand tracking-normal">
            <span className="flex items-center space-x-1.5 text-pink-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sterile Clinical Protocol</span>
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400">Interactive Treatment Journey</span>
          </div>

          <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-[1.14]">
            Unpack, sterilize & plunge: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-pink-400 to-rose-300">
              Experience a real acupuncture session
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            Every needle at Arura is hermetically sealed in front of you. Peel open the sterile blister pack, take your 0.18mm surgical needle, execute a painless dermal tap, and navigate deep into the contracted knot.
          </p>
        </div>

        {/* View Switcher & Scenario Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          
          {/* Ritual Switcher: Tray vs Active */}
          <div className="bg-neutral-900/90 border border-neutral-700/80 p-1 rounded-xl flex items-center space-x-1">
            <button
              onClick={() => {
                setRitualStage('tray');
                setIsPacketPeeled(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                ritualStage === 'tray' || ritualStage === 'unpacked'
                  ? 'bg-amber-500 text-black shadow-md' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>1. Sterile Pack</span>
            </button>
            <button
              onClick={() => setRitualStage('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                ritualStage === 'active' 
                  ? 'bg-brand text-white shadow-md shadow-brand/30' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>2. 3D Anatomy</span>
            </button>
          </div>

          {/* Clinical Cases Selector */}
          <div className="flex flex-wrap gap-1.5">
            {CLINICAL_SCENARIOS.map((scen) => (
              <button
                key={scen.id}
                onClick={() => handleSelectScenario(scen)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeScenario.id === scen.id
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {scen.name.split('&')[0]}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* INTERACTIVE STAGE ROUTER: STERILE TRAY vs 3D ANATOMY */}
      {ritualStage === 'tray' || ritualStage === 'unpacked' || ritualStage === 'peeling' ? (
        
        /* PHASE 1: STERILE BLISTER PACK OPENING STAGE */
        <div className="bg-neutral-900/90 rounded-3xl border border-neutral-800 p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: The Clinical Tray with Interactive Blister Pack */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl bg-neutral-950 aspect-[4/3] flex items-center justify-center">
              <img 
                src={getAssetUrl('sterile_needle_tray.jpg')} 
                alt="Sterile acupuncture needle blister pack on clinical tray"
                className="w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Interactive Peeling Overlay on top of the blister pack */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/20 backdrop-blur-[1px]">
                
                {!isPacketPeeled ? (
                  /* Sealed State - Drag/Click to Peel */
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 rounded-2xl bg-neutral-950/85 border border-brand/60 shadow-2xl text-center space-y-4 max-w-sm backdrop-blur-md"
                  >
                    <div className="flex items-center justify-center space-x-2 text-xs font-bold text-brand uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Hermetically Sealed · EO Gas Sterile</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display text-xl font-bold text-white">
                        Arura 0.18 × 30mm Needle
                      </h4>
                      <p className="text-xs text-neutral-300 font-normal">
                        Lot #2311A04 · Single-Use Surgical 316L Stainless Steel
                      </p>
                    </div>

                    <button
                      onClick={handlePeelPacket}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-brand via-pink-500 to-rose-400 text-white shadow-lg shadow-brand/40 hover:scale-102 active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer group"
                    >
                      <PackageCheck className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>Peel Open Sterile Pack</span>
                    </button>
                    
                    <span className="text-[10px] text-neutral-400 block">
                      Click to peel the paper/foil seal open fresh
                    </span>
                  </motion.div>
                ) : (
                  /* Peeled Open State - Click to Extract Needle */
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 rounded-2xl bg-emerald-950/90 border border-emerald-400 shadow-2xl text-center space-y-4 max-w-sm backdrop-blur-md"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display text-xl font-bold text-white">
                        Pack Opened & Sterilized
                      </h4>
                      <p className="text-xs text-emerald-200 font-normal">
                        Pristine 0.18mm needle ready in its sterile guide tube.
                      </p>
                    </div>

                    <button
                      onClick={handleExtractNeedle}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-xs bg-white text-black shadow-xl hover:bg-neutral-100 hover:scale-102 active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Take Needle & Begin Treatment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

              </div>
            </div>

            {/* Right: Dr. Nivedha's Sterile Protocol Dossier */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand uppercase tracking-wider block">
                  Clinical Safety Guarantee
                </span>
                <h4 className="font-display text-2xl font-bold text-white">
                  Why patients never have to worry
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  In many clinics, patients worry about needle hygiene. At Arura, every single blister pack is inspected and opened fresh in front of your eyes. Once used, each needle is discarded in a biohazard sharps container.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center space-x-3 text-xs text-neutral-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span><strong>100% Single-Use:</strong> Zero reuse, zero re-sterilization.</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-neutral-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span><strong>Ethylene Oxide (EO) Sterilized:</strong> Hospital surgical grade.</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-neutral-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span><strong>Sterile Guide Tube:</strong> Protects the shaft from touching air or hands.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleExtractNeedle}
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Skip to 3D Anatomy Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      ) : (

        /* PHASE 2 & 3: THE GRAND 3D VOLUMETRIC ANATOMICAL STAGE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Column (8 cols): The 3D Viewport & Interactive Tools */}
          <div className="lg:col-span-8 bg-neutral-900/80 rounded-3xl border border-neutral-800 p-6 shadow-2xl space-y-5 backdrop-blur-md">
            
            {/* Top Status & Interactive Action Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 font-medium pb-3 border-b border-neutral-800 gap-3">
              <div className="flex items-center space-x-2.5">
                <span className={`w-3 h-3 rounded-full ${
                  isKnotReleased 
                    ? 'bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse' 
                    : isDragging 
                    ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' 
                    : 'bg-brand'
                }`} />
                <span className="text-white font-bold text-xs sm:text-sm">
                  {isKnotReleased 
                    ? '🎯 DE-QI UNLOCKED — Spastic Endplate Decompressed' 
                    : depthMm === 0
                    ? 'Needle unpacked. Tap to enter skin, or drag to plunge.'
                    : isDragging 
                    ? `Plunging Needle: ${depthMm.toFixed(1)} mm depth` 
                    : `Active Depth: ${depthMm.toFixed(1)} mm`}
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                {/* Quick-Tap Painless Dermal Breach Button */}
                {depthMm === 0 && (
                  <button
                    onClick={handleQuickTap}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-400/80 text-emerald-300 text-xs font-bold transition-all hover:bg-emerald-900 flex items-center space-x-1.5 cursor-pointer shadow-md animate-pulse"
                    title="Execute the fast 0.01s painless dermal tap"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quick-Tap (Painless)</span>
                  </button>
                )}

                {/* Perspective Toggle */}
                <button
                  onClick={() => setViewMode(is3D ? 'micro_section' : '3d_cube')}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-medium hover:text-white transition-colors flex items-center space-x-1 cursor-pointer"
                  title="Switch 3D Cube / Cross Section"
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>{is3D ? '3D Cube' : '2D Slice'}</span>
                </button>

                {/* Loupe Toggle */}
                <button
                  onClick={() => setShowLoupe(!showLoupe)}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs transition-colors flex items-center space-x-1 cursor-pointer ${
                    showLoupe 
                      ? 'bg-brand/20 border-brand/50 text-pink-300' 
                      : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                  }`}
                  title="Toggle 10x Macro Inspection Loupe"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>10×</span>
                </button>

                {/* Mute Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors flex items-center cursor-pointer border border-neutral-700"
                  title={isMuted ? 'Unmute clinical audio' : 'Mute clinical audio'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-brand" />}
                </button>

                {/* Open New Needle */}
                <button
                  onClick={() => {
                    setRitualStage('tray');
                    setIsPacketPeeled(false);
                    handleReset();
                  }}
                  className="text-[11px] text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <PackageCheck className="w-3 h-3" />
                  <span>New Pack</span>
                </button>
              </div>
            </div>

            {/* THE GRAND 3D VOLUMETRIC TISSUE VIEWPORT */}
            <div 
              ref={viewportRef}
              className="relative w-full aspect-[16/9] min-h-[380px] max-h-[520px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-gradient-to-b from-neutral-950 to-neutral-900 cursor-ns-resize select-none"
            >
              {/* 3D Anatomical Render Asset */}
              <img 
                src={getAssetUrl(is3D ? 'tissue_3d_cube_cutaway.jpg' : 'tissue_cross_section_clean.jpg')} 
                alt="Grand 3D anatomical model of human tissue layers" 
                className="w-full h-full object-cover select-none pointer-events-none transition-all duration-700"
                draggable={false}
              />

              {/* Surgical Spotlight Beam Following the Needle */}
              <div 
                className="absolute pointer-events-none mix-blend-screen opacity-35 transition-all duration-300"
                style={{
                  left: `${needleXPercent}%`,
                  top: 0,
                  bottom: 0,
                  width: '180px',
                  transform: 'translateX(-50%)',
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.45) 0%, transparent 70%)'
                }}
              />

              {/* 3D Surface Entrance Marker */}
              <div 
                className="absolute pointer-events-none z-10 flex items-center space-x-2"
                style={{
                  left: `${needleXPercent}%`,
                  top: `${surfaceYPercent}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-8 h-3 rounded-full border border-pink-400/70 bg-pink-500/10 shadow-[0_0_12px_rgba(244,114,182,0.5)] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                </div>
                <span className="text-[9px] font-bold text-pink-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs border border-pink-500/30">
                  Skin Boundary (0.0mm)
                </span>
              </div>

              {/* TARGET MOTOR KNOT & DYNAMIC RETICLE */}
              <div 
                className="absolute pointer-events-none z-20"
                style={{
                  left: `${needleXPercent}%`,
                  top: `${knotYPercent}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className={`relative flex items-center justify-center transition-all duration-300 ${
                  isTargetLocked ? 'w-36 h-24' : isApproaching ? 'w-30 h-20' : 'w-26 h-18'
                }`}>
                  <div className={`absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 transition-colors duration-300 ${
                    isTargetLocked ? 'border-emerald-400' : isApproaching ? 'border-amber-400' : 'border-red-400/90'
                  }`} />
                  <div className={`absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 transition-colors duration-300 ${
                    isTargetLocked ? 'border-emerald-400' : isApproaching ? 'border-amber-400' : 'border-red-400/90'
                  }`} />
                  <div className={`absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 transition-colors duration-300 ${
                    isTargetLocked ? 'border-emerald-400' : isApproaching ? 'border-amber-400' : 'border-red-400/90'
                  }`} />
                  <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 transition-colors duration-300 ${
                    isTargetLocked ? 'border-emerald-400' : isApproaching ? 'border-amber-400' : 'border-red-400/90'
                  }`} />

                  {/* Center Marking Ring */}
                  <motion.div
                    animate={{
                      scale: twitchAnimation ? [1, 1.45, 0.8, 1.2, 1] : isTargetLocked ? [1, 1.08, 1] : 1,
                      filter: isKnotReleased ? 'brightness(1.3)' : 'none'
                    }}
                    transition={{ 
                      duration: twitchAnimation ? 0.5 : 2, 
                      repeat: isTargetLocked && !twitchAnimation ? Infinity : 0 
                    }}
                    className={`w-full h-full rounded-2xl border-2 transition-all duration-300 ${
                      isTargetLocked 
                        ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_40px_rgba(52,211,153,0.8)]' 
                        : isApproaching
                        ? 'border-amber-400 bg-amber-500/15 shadow-[0_0_25px_rgba(251,191,36,0.6)]'
                        : 'border-red-400/80 bg-red-950/30 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                    }`}
                  />

                  {/* Target Marker Label Pill */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className={`text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-lg backdrop-blur-md flex items-center space-x-1.5 ${
                      isTargetLocked
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] animate-pulse'
                        : isApproaching
                        ? 'bg-amber-950 text-amber-300 border-amber-400'
                        : 'bg-neutral-950/90 text-red-300 border-red-500/60'
                    }`}>
                      <Target className="w-3 h-3" />
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
                      animate={{ scale: [1, 2.8], opacity: [0.9, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border-2 border-emerald-300 pointer-events-none"
                    />
                  )}
                </div>
              </div>

              {/* ELECTRO-ACUPUNCTURE BIO-CURRENT RAYS */}
              {isElectroActive && depthMm >= 4.0 && (
                <div 
                  className="absolute inset-0 pointer-events-none z-15"
                  style={{
                    background: 'radial-gradient(ellipse at 63% 65%, rgba(14, 165, 233, 0.35) 0%, transparent 65%)'
                  }}
                >
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.8, 1.2, 0.8] }}
                    transition={{ duration: electroFreq === 2 ? 0.5 : 0.08, repeat: Infinity }}
                    className="absolute left-[40%] right-[10%] h-1.5 top-[65%] bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_20px_#38bdf8]"
                  />
                </div>
              )}

              {/* WARM NEEDLE MOXIBUSTION INFRARED HEAT RADIANCE */}
              {isMoxaActive && depthMm >= 3.0 && (
                <div 
                  className="absolute inset-0 pointer-events-none z-15"
                  style={{
                    background: 'radial-gradient(circle at 63% 55%, rgba(249, 115, 22, 0.35) 0%, transparent 60%)'
                  }}
                >
                  <motion.div
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute left-[45%] right-[15%] h-20 top-[55%] rounded-full bg-amber-500/30 blur-2xl"
                  />
                </div>
              )}

              {/* THE GRAND HIGH-DEFINITION SURGICAL NEEDLE */}
              <div 
                onPointerDown={handleNeedlePointerDown}
                onPointerMove={handleNeedlePointerMove}
                onPointerUp={handleNeedlePointerUp}
                className={`absolute z-30 transition-shadow ${
                  isDragging ? 'cursor-grabbing scale-102' : 'cursor-grab hover:scale-102'
                }`}
                style={{
                  left: `${needleXPercent}%`,
                  top: `${tipYPercent}%`,
                  transform: 'translate(-50%, -100%)',
                  touchAction: 'none'
                }}
              >
                {/* Floating Real-Time Depth Badge with Glowing Readout */}
                <div className="absolute -left-32 top-24 bg-neutral-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-700 shadow-2xl text-[11px] font-bold tabular-nums text-white whitespace-nowrap pointer-events-none z-40 flex items-center space-x-1.5">
                  <span className="text-brand">▼</span>
                  <span className="text-white font-mono">{depthMm.toFixed(1)} mm</span>
                  {isTargetLocked && (
                    <span className="text-emerald-400 font-extrabold ml-1 animate-pulse">✓ Locked</span>
                  )}
                </div>

                {/* Electro Lead Alligator Clip */}
                {isElectroActive && (
                  <div className="absolute top-2 -right-14 bg-cyan-600 text-white text-[9.5px] font-extrabold px-2 py-0.5 rounded-md shadow-lg flex items-center space-x-1 animate-pulse z-40 border border-cyan-300">
                    <Zap className="w-3 h-3 text-cyan-200" />
                    <span>{electroFreq}Hz</span>
                  </div>
                )}

                {/* Moxa Smoldering Cone */}
                {isMoxaActive && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-40">
                    <span className="w-4 h-4 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 animate-pulse shadow-[0_0_18px_#f97316]" />
                    <span className="text-[8.5px] font-extrabold text-amber-300 drop-shadow-md tracking-wider uppercase mt-0.5">Moxa</span>
                  </div>
                )}

                {/* 10× DOCTOR'S MACRO INSPECTION LOUPE */}
                {showLoupe && (
                  <div className="absolute -right-36 top-16 w-28 h-28 rounded-full border-2 border-cyan-400/80 bg-neutral-950/90 shadow-[0_0_25px_rgba(34,211,238,0.4)] backdrop-blur-md pointer-events-none flex flex-col items-center justify-between p-2 z-40 overflow-hidden">
                    <div className="flex items-center justify-between w-full px-1 text-[8.5px] font-bold text-cyan-300">
                      <span>10× LOUPE</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    </div>

                    <div className="relative w-full h-12 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:6px_6px]" />
                      <div className="w-1 h-12 bg-gradient-to-b from-white via-neutral-300 to-amber-200 rounded-b-full shadow-[0_0_8px_#fff]" />
                      <div className="absolute w-full h-[1px] bg-cyan-400/60" />
                    </div>

                    <div className="text-[8px] font-mono text-neutral-300 text-center w-full bg-black/60 rounded py-0.5">
                      0.18mm Solid 316L
                    </div>
                  </div>
                )}

                {/* HIGH-DEFINITION BOLD 3D NEEDLE COMPONENT */}
                <div 
                  className="relative flex flex-col items-center"
                  style={{
                    perspective: '900px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div
                    style={{
                      transform: `rotateY(${twirlAngleY}deg)`,
                      transformOrigin: 'center center',
                      transition: isTwirling ? 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
                    }}
                    className="relative flex flex-col items-center"
                  >
                    
                    {/* Classical Surgical Needle Top Ring Finial */}
                    <div className="w-6 h-6 rounded-full border-[3px] border-amber-300/90 bg-gradient-to-tr from-amber-600 via-amber-200 to-yellow-100 shadow-[0_0_10px_rgba(251,191,36,0.6)] flex items-center justify-center relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-amber-400" />
                    </div>

                    {/* Coiled Wire Handle */}
                    <div className="w-6 h-20 rounded-md relative overflow-hidden bg-gradient-to-r from-amber-700 via-amber-400 to-amber-600 border border-amber-300 shadow-xl flex flex-col justify-between py-1 my-0.5">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="w-full h-[2px] bg-amber-950/60 shadow-[0_1px_0_rgba(255,255,255,0.4)]"
                        />
                      ))}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-60 mix-blend-overlay"
                        style={{
                          background: `linear-gradient(${twirlAngleY % 360}deg, transparent 35%, rgba(255,255,255,0.95) 50%, transparent 65%)`
                        }}
                      />
                    </div>

                    {/* Polished Stainless Steel Needle Shaft */}
                    <div className="relative flex flex-col items-center">
                      <div 
                        className="w-1.5 h-44 bg-gradient-to-r from-neutral-400 via-white to-neutral-400 shadow-[0_0_8px_rgba(255,255,255,0.8)] relative"
                        style={{
                          boxShadow: '0 0 10px rgba(255,255,255,0.7), 0 0 2px rgba(0,0,0,0.8)'
                        }}
                      >
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white" />
                      </div>

                      {/* Sharp Tapered Trocar Tip */}
                      <div 
                        className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[8px] border-t-white shadow-[0_0_8px_#ffffff]"
                      />
                    </div>

                  </div>

                  {/* Dermal Contact Indentation & Shadow at Skin Surface */}
                  <div 
                    className="w-6 h-2 bg-pink-500/50 rounded-full filter blur-[2px] transform -translate-y-1 pointer-events-none"
                    style={{ opacity: depthMm > 0 ? 0.8 : 0.2 }}
                  />
                </div>

              </div>

              {/* Prompt Hint when at Surface */}
              {depthMm === 0 && !isDragging && (
                <div className="absolute top-4 left-4 bg-neutral-900/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-neutral-700 shadow-xl pointer-events-none text-xs text-white font-medium z-10 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Click "Quick-Tap" or drag the coiled golden handle downward to plunge</span>
                </div>
              )}

            </div>

            {/* Precision Micrometer Depth Slider */}
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-neutral-300">Needle Insertion Depth (Precision Dial)</span>
                <span className="text-brand font-bold text-sm tabular-nums font-mono">{depthMm.toFixed(1)} mm</span>
              </div>
              <input 
                type="range"
                min="0"
                max="15"
                step="0.1"
                value={depthMm}
                onChange={(e) => setDepthMm(parseFloat(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-medium">
                <span>Epidermis (0mm)</span>
                <span>Dermis (3mm)</span>
                <span>Fascia (6mm)</span>
                <span className="text-brand font-bold">Target Knot ({activeScenario.targetDepthMm}mm)</span>
                <span>Deep Muscle (15mm)</span>
              </div>
            </div>

            {/* CLINICAL MANIPULATION TECHNIQUES TOOLBAR */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Clinical Manipulation Toolkit (Interactive Actions)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                
                {/* 1. Classical Left-to-Right 3D Twirl */}
                <button
                  onClick={handleTwirl}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isTwirling 
                      ? 'bg-brand text-white border-brand shadow-lg shadow-brand/30' 
                      : 'bg-neutral-900/80 hover:bg-neutral-800 text-white border-neutral-800'
                  }`}
                  title="Roll handle left-to-right between fingers"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <RotateCw className={`w-4 h-4 ${isTwirling ? 'text-white animate-spin' : 'text-neutral-400'}`} />
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/50 text-neutral-300">
                      Nien Chuan
                    </span>
                  </div>
                  <div className="text-xs font-bold">3D Twirl (Roll L→R)</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Winds collagen fascia</div>
                </button>

                {/* 2. Classical Lift & Thrust (Ti Ch'a) */}
                <button
                  onClick={handleThrust}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isThrusting 
                      ? 'bg-brand text-white border-brand shadow-lg shadow-brand/30' 
                      : 'bg-neutral-900/80 hover:bg-neutral-800 text-white border-neutral-800'
                  }`}
                  title="Micro-pecking pecks knot to elicit twitch response"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <MoveVertical className={`w-4 h-4 ${isThrusting ? 'text-white animate-bounce' : 'text-neutral-400'}`} />
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/50 text-neutral-300">
                      Ti Ch’a
                    </span>
                  </div>
                  <div className="text-xs font-bold">Thrust & Lift</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Elicits local twitch</div>
                </button>

                {/* 3. Electro-Acupuncture Mode */}
                <button
                  onClick={() => {
                    if (!isElectroActive && depthMm < 4.0) setDepthMm(activeScenario.targetDepthMm);
                    setIsElectroActive(!isElectroActive);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isElectroActive 
                      ? 'bg-cyan-950 text-cyan-200 border-cyan-400 shadow-lg shadow-cyan-500/20' 
                      : 'bg-neutral-900/80 hover:bg-neutral-800 text-white border-neutral-800'
                  }`}
                  title="Micro-current pulses gate pain and release endorphins"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Zap className={`w-4 h-4 ${isElectroActive ? 'text-cyan-400 animate-pulse' : 'text-neutral-400'}`} />
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isElectroActive ? 'bg-cyan-800 text-cyan-100' : 'bg-black/50 text-neutral-300'
                    }`}>
                      {isElectroActive ? `${electroFreq} Hz` : 'Dian Zhen'}
                    </span>
                  </div>
                  <div className="text-xs font-bold">
                    {isElectroActive ? 'Electro: Active' : 'Electro-Acu'}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Endorphin frequency</div>
                </button>

                {/* 4. Warm Needle Moxibustion */}
                <button
                  onClick={() => {
                    if (!isMoxaActive && depthMm < 3.0) setDepthMm(activeScenario.targetDepthMm);
                    setIsMoxaActive(!isMoxaActive);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isMoxaActive 
                      ? 'bg-amber-950 text-amber-200 border-amber-400 shadow-lg shadow-amber-500/20' 
                      : 'bg-neutral-900/80 hover:bg-neutral-800 text-white border-neutral-800'
                  }`}
                  title="Thermal infrared warmth radiates down the shaft"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Flame className={`w-4 h-4 ${isMoxaActive ? 'text-amber-400 animate-pulse' : 'text-neutral-400'}`} />
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isMoxaActive ? 'bg-amber-800 text-amber-100' : 'bg-black/50 text-neutral-300'
                    }`}>
                      Wen Zhen
                    </span>
                  </div>
                  <div className="text-xs font-bold">
                    {isMoxaActive ? 'Warm Moxa: On' : 'Warm Needle'}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Infrared heat wave</div>
                </button>

              </div>
            </div>

            {/* REAL-TIME PATIENT SENSATION HUD */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-1.5 shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                <span>Patient Sensation Monitor (Real Time)</span>
                <span className="text-brand font-bold font-mono">{depthMm.toFixed(1)} mm</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
                {getPatientSensation()}
              </p>
            </div>

          </div>

          {/* Right Column (4 cols): Live Clinical Bio-Telemetry & Dr. Nivedha's Log */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Bio-Telemetry Dashboard */}
            <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-2xl space-y-5 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Live Biomechanical Telemetry
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Active Sensors
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-neutral-400 block">Dermal Penetration Force</span>
                  <span className="font-display font-bold text-white text-lg tabular-nums mt-0.5 block font-mono">
                    {penetrationForce}
                  </span>
                  <span className="text-[10px] text-neutral-500">Human pain threshold is 0.50 N (acupuncture is 25× lower)</span>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400 font-medium">Myofascial Spasm Level</span>
                    <span className={`font-bold tabular-nums font-mono ${isKnotReleased ? 'text-emerald-400' : 'text-red-400'}`}>
                      {muscleSpasmPct}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mt-1.5">
                    <div 
                      className={`h-full transition-all duration-300 ${isKnotReleased ? 'bg-emerald-400' : 'bg-red-500'}`} 
                      style={{ width: `${muscleSpasmPct}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400 font-medium">Local Micro-Perfusion (Blood Flow)</span>
                    <span className="font-bold text-brand tabular-nums font-mono">+{microBloodFlow}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mt-1.5">
                    <div 
                      className="h-full bg-brand transition-all duration-300" 
                      style={{ width: `${Math.min(100, (microBloodFlow / 420) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-neutral-400 block">Autonomic Vagus Response</span>
                  <span className="font-semibold text-neutral-200 text-xs block mt-0.5">{vagusTone}</span>
                </div>
              </div>
            </div>

            {/* Clinical Finding Dossier Card */}
            <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4 backdrop-blur-md">
              <div>
                <span className="text-xs text-brand font-semibold block">{activeScenario.location}</span>
                <h4 className="font-display text-lg font-bold text-white mt-0.5">
                  {activeScenario.name}
                </h4>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 leading-relaxed space-y-1">
                <strong className="block text-amber-300 font-semibold">The De-Qi Sensation:</strong>
                <p className="font-normal">{activeScenario.deQiResponse}</p>
              </div>

              <p className="text-xs italic text-neutral-400 leading-relaxed border-t border-neutral-800 pt-3">
                {activeScenario.doctorQuote}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking(`Consultation (${activeScenario.name})`, 600)}
                  className="w-full py-3.5 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-brand/30 cursor-pointer"
                >
                  <span>Book Priority Consultation (₹600)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* COMPANION SCALE COMPARISON: "How Thin is 0.18mm?" (Directly below) */}
      <div className="pt-10 border-t border-neutral-800">
        <div className="bg-neutral-900/80 rounded-3xl border border-neutral-800 p-8 sm:p-12 space-y-8 backdrop-blur-md">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs uppercase tracking-wider text-brand font-bold block">
                True Relative Scale
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                How thin is 0.18 millimeters?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                Overlaying three physical objects at exact relative proportion. Notice why an acupuncture needle feels completely different from a standard hospital injection syringe.
              </p>
            </div>

            {/* Magnification Slider Control */}
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 shadow-inner space-y-2 min-w-[240px]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">Microscope Zoom</span>
                <span className="font-bold text-brand tabular-nums font-mono">{zoomLevel}× Scale</span>
              </div>
              <input 
                type="range"
                min="4"
                max="24"
                step="1"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand"
              />
            </div>
          </div>

          {/* 3 True Scale Cross-Section Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-stretch">
            
            {/* 1. Human Hair */}
            <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Reference</span>
                  <span className="text-xs font-bold text-neutral-200 tabular-nums font-mono">~0.08 mm</span>
                </div>
                <h4 className="font-display text-lg font-bold text-white">Human Scalp Hair</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Average human hair shaft diameter (80 microns). Flexible biological keratin fiber.
                </p>
              </div>

              <div className="py-6 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-center relative h-28 overflow-hidden">
                <div 
                  className="bg-amber-600 rounded-full shadow-lg"
                  style={{
                    width: `${0.08 * zoomLevel * 14}px`,
                    height: `${0.08 * zoomLevel * 14}px`,
                    minWidth: '4px',
                    minHeight: '4px'
                  }}
                />
                <span className="absolute bottom-2 text-[10px] text-neutral-500 font-medium">
                  Actual Cross-Section at {zoomLevel}×
                </span>
              </div>

              <div className="text-[11px] text-neutral-400 pt-1 border-t border-neutral-800">
                Solid organic filament
              </div>
            </div>

            {/* 2. Arura Acupuncture Needle (Hero) */}
            <div className="p-6 rounded-2xl bg-neutral-950/90 border-2 border-brand shadow-lg shadow-brand/20 space-y-4 flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-brand text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                Arura Standard
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-brand uppercase tracking-wider">Solid Needle</span>
                  <span className="text-xs font-bold text-brand tabular-nums font-mono">0.18 mm</span>
                </div>
                <h4 className="font-display text-lg font-bold text-white">Arura Acupuncture Needle</h4>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Surgical stainless steel 316L. Just over twice the thickness of a single hair strand.
                </p>
              </div>

              <div className="py-6 bg-neutral-900 rounded-xl flex items-center justify-center relative h-28 overflow-hidden border border-brand/40 shadow-inner">
                <div 
                  className="bg-white rounded-full border border-neutral-400 shadow-[0_0_12px_#fff]"
                  style={{
                    width: `${0.18 * zoomLevel * 14}px`,
                    height: `${0.18 * zoomLevel * 14}px`
                  }}
                />
                <span className="absolute bottom-2 text-[10px] text-pink-300 font-semibold">
                  Solid Pin-Point · Does not cut tissue
                </span>
              </div>

              <div className="text-[11px] text-neutral-300 font-medium pt-1 border-t border-neutral-800">
                Slides between muscle fibers painlessly
              </div>
            </div>

            {/* 3. Hypodermic Injection Syringe Needle */}
            <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Hospital Syringe</span>
                  <span className="text-xs font-bold text-neutral-200 tabular-nums font-mono">0.81 mm (21 Gauge)</span>
                </div>
                <h4 className="font-display text-lg font-bold text-white">Blood Draw / Syringe Needle</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Hollow steel cylinder with beveled razor edge designed to slice tissue to inject fluid.
                </p>
              </div>

              <div className="py-6 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-center relative h-28 overflow-hidden">
                <div 
                  className="rounded-full border-[5px] border-neutral-400 bg-transparent shadow-md flex items-center justify-center"
                  style={{
                    width: `${0.81 * zoomLevel * 14}px`,
                    height: `${0.81 * zoomLevel * 14}px`
                  }}
                >
                  <span className="text-[9px] text-neutral-500 font-mono">Hollow</span>
                </div>
                <span className="absolute bottom-2 text-[10px] text-neutral-500 font-medium">
                  4.5× Thicker + Slices tissue
                </span>
              </div>

              <div className="text-[11px] text-neutral-400 pt-1 border-t border-neutral-800">
                Why hospital shots sting, but acupuncture does not
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}