import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  ArrowRight, 
  Hand, 
  Sliders, 
  Activity,
  Zap,
  Flame,
  ShieldCheck,
  Target
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

// Audio Synthesizer for Authentic Clinical Feedback
function playSound(type, isMuted) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'peel') {
      // Crisp medical paper/foil unseal friction
      const node = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.35, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1));
      }
      node.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      node.connect(filter);
      filter.connect(ctx.destination);
      node.start();
    } else if (type === 'tap') {
      // 0.01s spring-loaded guide-tube breach click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === 'palpate') {
      // Soft rhythmic vascular thrum
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(75, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'twirl') {
      // Soft metallic winding tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(820, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'deqi') {
      // Resonant 528 Hz healing chime with harmonic overtone
      [528, 1056, 1584].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.25 / (idx + 1), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      });
    }
  } catch (_) {}
}

const CLINICAL_CASES = [
  {
    id: 'migraine',
    name: 'Chronic Migraine & Occipital Tension',
    point: 'GB20 (Fengchi) & LI4 (Hegu)',
    anatomicalSite: 'Cervical Sub-Occipital Fascia & Web Space',
    targetDepth: 12.0,
    knotDesc: 'Hyper-contracted taut motor band trapping the greater occipital nerve.',
    reliefDesc: 'Vice-like band around temples dissolves as sub-occipital fibers release.',
    doctorQuote: '“Releasing the motor endplate knot at 12mm halts the trigeminocervical pain loop at its mechanical source.” — Dr. Nivedha'
  },
  {
    id: 'sciatica',
    name: 'Piriformis Spasm & Sciatic Radiation',
    point: 'GB30 (Huantiao) & BL40 (Weizhong)',
    anatomicalSite: 'Deep Pelvic Myofascial Sheath',
    targetDepth: 14.0,
    knotDesc: 'Taut spastic piriformis motor endplate compressing the sciatic trunk.',
    reliefDesc: 'Radiating burning leg ache subsides into a wave of warm comfort.',
    doctorQuote: '“Precision fascial glide reaches the deep sheath without tearing surrounding tissue.” — Dr. Nivedha'
  },
  {
    id: 'neck',
    name: 'Trapezius Desk-Spasm & Cervical Strain',
    point: 'GB21 (Jianjing)',
    anatomicalSite: 'Upper Trapezius Trigger Zone',
    targetDepth: 10.5,
    knotDesc: 'Fibrotic trigger nodule from prolonged screen posture.',
    reliefDesc: 'Heavy stone-weight off the shoulders; instant restoration of rotation.',
    doctorQuote: '“Patients feel their shoulders drop 2 inches the moment the twitch response occurs.” — Dr. Nivedha'
  }
];

export default function TissueDepthSimulator({ onOpenBooking }) {
  // Navigation / Step state (1: Pack, 2: Palpate, 3: Tap, 4: Plunge & De-Qi)
  const [activeStep, setActiveStep] = useState(1);
  const [activeCase, setActiveCase] = useState(CLINICAL_CASES[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Step 1: Blister Pack Unseal State
  const [foilPeelProgress, setFoilPeelProgress] = useState(0); // 0 to 100%
  const [isPackUnsealed, setIsPackUnsealed] = useState(false);
  const isDraggingFoilRef = useRef(false);
  const foilStartYRef = useRef(0);

  // Step 2: Acupoint Palpation State
  const [palpatePos, setPalpatePos] = useState({ x: 50, y: 50 }); // % coordinates
  const [knotDistance, setKnotDistance] = useState(100);
  const [isKnotLocked, setIsKnotLocked] = useState(false);
  const knotTarget = { x: 54, y: 46 }; // Target location of LI4 / trigger point

  // Step 3: Dermal Breach (Quick-Tap)
  const [isTapped, setIsTapped] = useState(false);

  // Step 4: Strata Plunge & De-Qi Manipulation State
  const [depthMm, setDepthMm] = useState(0.0);
  const [isKnotReleased, setIsKnotReleased] = useState(false);
  const [isTwirling, setIsTwirling] = useState(false);
  const [isThrusting, setIsThrusting] = useState(false);
  const [isElectro, setIsElectro] = useState(false);
  const [isMoxa, setIsMoxa] = useState(false);
  const [twirlAngle, setTwirlAngle] = useState(0);

  const isDraggingNeedleRef = useRef(false);
  const needleStartYRef = useRef(0);
  const needleStartDepthRef = useRef(0);

  // Keyboard shortcut: Esc exits fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Electro-Acupuncture Vibration Loop
  useEffect(() => {
    if (!isElectro || !isKnotReleased) return;
    const interval = setInterval(() => {
      playSound('tap', isMuted);
    }, 500);
    return () => clearInterval(interval);
  }, [isElectro, isKnotReleased, isMuted]);

  // Reset entire clinical flow
  const handleResetAll = () => {
    setActiveStep(1);
    setFoilPeelProgress(0);
    setIsPackUnsealed(false);
    setIsKnotLocked(false);
    setIsTapped(false);
    setDepthMm(0);
    setIsKnotReleased(false);
    setIsTwirling(false);
    setIsThrusting(false);
    setIsElectro(false);
    setIsMoxa(false);
    setTwirlAngle(0);
  };

  // Step 1: Foil Peel Handlers
  const handleFoilStart = (clientY) => {
    if (isPackUnsealed) return;
    isDraggingFoilRef.current = true;
    foilStartYRef.current = clientY;
  };

  const handleFoilMove = (clientY) => {
    if (!isDraggingFoilRef.current || isPackUnsealed) return;
    const delta = clientY - foilStartYRef.current;
    const progress = Math.min(100, Math.max(0, (delta / 180) * 100));
    setFoilPeelProgress(progress);
    if (progress > 15 && progress < 85 && Math.random() > 0.7) {
      playSound('peel', isMuted);
    }
    if (progress >= 95 && !isPackUnsealed) {
      setIsPackUnsealed(true);
      playSound('peel', isMuted);
      playSound('tap', isMuted);
      setTimeout(() => setActiveStep(2), 600);
    }
  };

  const handleFoilEnd = () => {
    isDraggingFoilRef.current = false;
    if (foilPeelProgress < 95 && !isPackUnsealed) {
      setFoilPeelProgress(0);
    }
  };

  // Step 2: Palpation Handlers
  const handlePalpateMove = (e, rect) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (!clientX || !clientY || !rect) return;

    const x = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100));
    setPalpatePos({ x, y });

    // Distance to knot
    const dx = x - knotTarget.x;
    const dy = y - knotTarget.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    setKnotDistance(dist);

    if (dist < 12) {
      if (Math.random() > 0.6) playSound('palpate', isMuted);
    }
  };

  const handleLockAcupoint = () => {
    setIsKnotLocked(true);
    playSound('tap', isMuted);
    setTimeout(() => setActiveStep(3), 500);
  };

  // Step 3: Quick-Tap Handler
  const handleQuickTap = () => {
    playSound('tap', isMuted);
    setIsTapped(true);
    setDepthMm(2.0); // painless dermal penetration (2mm)
    setTimeout(() => setActiveStep(4), 600);
  };

  // Step 4: Needle Plunge Handlers
  const handleNeedleDragStart = (clientY) => {
    isDraggingNeedleRef.current = true;
    needleStartYRef.current = clientY;
    needleStartDepthRef.current = depthMm;
  };

  const handleNeedleDragMove = (clientY) => {
    if (!isDraggingNeedleRef.current) return;
    const delta = clientY - needleStartYRef.current;
    const newDepth = Math.max(0, Math.min(15, needleStartDepthRef.current + (delta / 22)));
    setDepthMm(newDepth);

    // Knot engagement check
    if (newDepth >= activeCase.targetDepth - 0.5 && newDepth <= activeCase.targetDepth + 0.8) {
      if (!isKnotReleased) {
        playSound('palpate', isMuted);
      }
    }
  };

  const handleNeedleDragEnd = () => {
    isDraggingNeedleRef.current = false;
  };

  // Step 5: Clinical Manipulation Handlers
  const handleTwirl = () => {
    setIsTwirling(true);
    playSound('twirl', isMuted);
    setTwirlAngle((prev) => prev + 360);
    setTimeout(() => {
      setIsTwirling(false);
      if (depthMm >= activeCase.targetDepth - 1.5) {
        setIsKnotReleased(true);
        playSound('deqi', isMuted);
      }
    }, 450);
  };

  const handleThrustLift = () => {
    setIsThrusting(true);
    playSound('tap', isMuted);
    const orig = depthMm;
    setDepthMm(Math.max(0, orig - 2.0));
    setTimeout(() => {
      setDepthMm(orig);
      setIsThrusting(false);
      if (orig >= activeCase.targetDepth - 1.5) {
        setIsKnotReleased(true);
        playSound('deqi', isMuted);
      }
    }, 200);
  };

  // Computed Real-Time Telemetry
  const spasmPct = isKnotReleased ? 8 : Math.max(14, Math.round(88 - (depthMm * 4.5)));
  const perfusionPct = isKnotReleased ? (isMoxa ? 480 : 340) : Math.round(depthMm * 18);
  const penetrationForce = depthMm === 0 ? '0.00 N' : depthMm <= 2.5 ? '0.02 N (Pain-free)' : isKnotReleased ? '0.03 N (Decompressed)' : '0.14 N (Contracted band)';

  return (
    <div className={`transition-all duration-300 font-sans ${
      isFullscreen 
        ? 'fixed inset-0 z-50 w-screen h-screen bg-[#090b10] p-4 sm:p-8 flex flex-col justify-between overflow-y-auto select-none' 
        : 'relative bg-[#090b10] text-neutral-100 rounded-3xl border border-neutral-800 p-6 sm:p-10 shadow-2xl space-y-8 select-none overflow-hidden'
    }`}>

      {/* HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-xs font-normal text-neutral-400">
            <span className="text-emerald-400 font-medium">Doctor-Supervised Interaction</span>
            <span>/</span>
            <span>Real Clinical Protocol</span>
          </div>

          <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            The complete acupuncture experience: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              From sterile blister unseal to De-Qi release
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            Step into Dr. Nivedha&apos;s shoes. Peel open a single-use sterile 0.18mm needle, palpate the hyper-irritable knot on real human anatomy, execute the 0.01-second painless dermal tap, navigate living fascial strata, and twirl the needle to decompress the spastic endplate.
          </p>
        </div>

        {/* Global Toolbar: Fullscreen, Audio, Scenario Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
              isFullscreen 
                ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-lg' 
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
            }`}
            title="Toggle fullscreen interactive clinic"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Exit Full Screen' : 'Full Screen Mode'}</span>
          </button>

          {/* Clinical Cases Selector */}
          <div className="flex flex-wrap gap-1.5">
            {CLINICAL_CASES.map((scen) => (
              <button
                key={scen.id}
                onClick={() => {
                  setActiveCase(scen);
                  handleResetAll();
                }}
                className={`px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                  activeCase.id === scen.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {scen.name.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors flex items-center cursor-pointer border border-neutral-700"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Reset Flow Button */}
          <button
            onClick={handleResetAll}
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-800"
            title="Restart clinical procedure"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* STEP-BY-STEP PROGRESS BARS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
        {[
          { step: 1, title: '1. Sterile Unseal', subtitle: 'Peel blister pack' },
          { step: 2, title: '2. Palpate Point', subtitle: 'Locate trigger knot' },
          { step: 3, title: '3. Painless Tap', subtitle: 'Guide tube dermal breach' },
          { step: 4, title: '4. Strata & De-Qi', subtitle: 'Plunge & decompress' },
        ].map((item) => {
          const isDone = activeStep > item.step;
          const isCurrent = activeStep === item.step;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isCurrent 
                  ? 'bg-emerald-950/60 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/30' 
                  : isDone
                  ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  : 'bg-neutral-950/40 border-neutral-900 text-neutral-600 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold ${isCurrent ? 'text-emerald-400' : isDone ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {item.title}
                </span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <span className="text-[11px] text-neutral-400 block font-normal mt-0.5">
                {item.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* MAIN INTERACTIVE CLINICAL STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column (8 cols): The Main Interactive Viewport */}
        <div className="lg:col-span-8 bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 shadow-xl space-y-6">

          {/* ------------------------------------------------------------- */}
          {/* STEP 1: PEEL THE STERILE BLISTER PACK                         */}
          {/* ------------------------------------------------------------- */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                <span className="text-white font-medium flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Single-Use Sterile Packaging Verification</span>
                </span>
                <span className="text-neutral-400 font-mono">0.18mm × 40mm Solid Surgical 316L</span>
              </div>

              {/* Peelable Blister Pack Canvas Container */}
              <div 
                className="relative w-full h-[540px] sm:h-[620px] rounded-xl overflow-hidden border border-neutral-800 bg-[#07090e] flex flex-col items-center justify-center select-none"
                onMouseMove={(e) => handleFoilMove(e.clientY)}
                onMouseUp={handleFoilEnd}
                onTouchMove={(e) => handleFoilMove(e.touches[0].clientY)}
                onTouchEnd={handleFoilEnd}
              >
                {/* Background: Authentic Sterile Medical Tray Photo */}
                <img 
                  src={getAssetUrl('sterile_needle_tray.jpg')} 
                  alt="Sterile medical tray with blister packs" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 filter saturate-90"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

                {/* The Interactive Medical Blister Pack Unit */}
                <div className="relative w-72 sm:w-80 h-[440px] sm:h-[480px] bg-neutral-900/95 backdrop-blur-md rounded-2xl border-2 border-neutral-700/80 shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
                  
                  {/* Blister Top Header */}
                  <div className="space-y-1 text-center border-b border-neutral-800 pb-3">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">
                      Sterile EO • Single Use Only
                    </span>
                    <h4 className="font-display text-base font-bold text-white">
                      Arura Clinical Acupuncture Needle
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      Lot #2026-ARU-09 • Sterile Barrier Intact
                    </p>
                  </div>

                  {/* Needle Visible Through Medical Clear Thermoform Blister */}
                  <div className="relative flex-1 flex flex-col items-center justify-center my-3 bg-neutral-950/70 rounded-xl border border-neutral-800/80 p-4 overflow-hidden">
                    
                    {/* Clear Guide Tube */}
                    <div className="w-4 h-72 border-2 border-cyan-400/40 rounded-full bg-cyan-950/20 backdrop-blur-sm flex items-center justify-center relative shadow-inner">
                      {/* Authentic Single Needle Cutout inside tube */}
                      <img 
                        src={getAssetUrl('single_needle_authentic.png')} 
                        alt="Authentic acupuncture needle" 
                        className={`h-64 object-contain filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-transform duration-500 ${
                          isPackUnsealed ? 'translate-y-[-16px] scale-105' : ''
                        }`}
                      />
                    </div>

                    {isPackUnsealed && (
                      <span className="text-xs text-emerald-400 font-semibold mt-2 animate-bounce">
                        ✓ Unsealed & Ready for Palpation
                      </span>
                    )}
                  </div>

                  {/* Peelable Foil Seal Flap at Bottom / Top */}
                  {!isPackUnsealed ? (
                    <div 
                      onMouseDown={(e) => handleFoilStart(e.clientY)}
                      onTouchStart={(e) => handleFoilStart(e.touches[0].clientY)}
                      className="cursor-grab active:cursor-grabbing p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 border border-emerald-400/50 text-center hover:bg-emerald-950/40 transition-all shadow-lg select-none"
                    >
                      <div className="w-12 h-1.5 bg-emerald-400 rounded-full mx-auto mb-2 opacity-80 animate-pulse" />
                      <span className="text-xs font-semibold text-white block">
                        Drag Down to Peel Open Foil Seal ({Math.round(foilPeelProgress)}%)
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        Hold and drag down with finger or mouse
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveStep(2)}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                    >
                      <span>Proceed to Acupoint Palpation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Instant Shortcut Button for Fast Access */}
                {!isPackUnsealed && (
                  <button
                    onClick={() => {
                      setFoilPeelProgress(100);
                      setIsPackUnsealed(true);
                      playSound('peel', isMuted);
                      setTimeout(() => setActiveStep(2), 500);
                    }}
                    className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-700 text-xs text-neutral-300 hover:text-white hover:border-neutral-500 transition-all cursor-pointer shadow-md"
                  >
                    Quick-Unseal & Skip ➔
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 2: PALPATE & LOCATE THE ACUPOINT                         */}
          {/* ------------------------------------------------------------- */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                <span className="text-white font-medium flex items-center space-x-2">
                  <Hand className="w-4 h-4 text-emerald-400" />
                  <span>Acupoint Palpation & Knot Localization</span>
                </span>
                <span className="text-emerald-400 font-mono">
                  {knotDistance < 12 ? '● TARGET LOCKED (Tender Nodule Found)' : 'Move finger over skin to locate nodule'}
                </span>
              </div>

              {/* Anatomical Palpation Interactive Pad */}
              <div 
                className="relative w-full h-[540px] sm:h-[620px] rounded-xl overflow-hidden border border-neutral-800 bg-[#07090e] cursor-crosshair select-none"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handlePalpateMove(e, rect);
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handlePalpateMove(e, rect);
                }}
              >
                {/* Authentic Clinical Anatomical Image */}
                <img 
                  src={getAssetUrl('anatomical_hand_resting.jpg')} 
                  alt="Anatomical hand and forearm for LI4 palpation" 
                  className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-105"
                />

                {/* Meridian Energy Overlay Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <path 
                    d="M 120 400 Q 240 280, 360 270 T 580 180" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                  />
                </svg>

                {/* Hidden / Pulsing Target Knot Node */}
                <div 
                  style={{ left: `${knotTarget.x}%`, top: `${knotTarget.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center"
                >
                  <div className={`w-12 h-12 rounded-full border-2 border-dashed ${
                    knotDistance < 12 ? 'border-emerald-400 bg-emerald-500/30 animate-ping' : 'border-amber-400/40 bg-amber-500/10'
                  }`} />
                  <span className="text-[10px] text-amber-200 bg-black/80 px-2 py-0.5 rounded-full mt-1 font-mono">
                    {activeCase.point.split('&')[0]}
                  </span>
                </div>

                {/* Doctor's Palpation Loupe / Finger Reticle */}
                <div 
                  style={{ left: `${palpatePos.x}%`, top: `${palpatePos.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div className={`w-16 h-16 rounded-full border-2 transition-all flex items-center justify-center ${
                    knotDistance < 12 
                      ? 'border-emerald-400 bg-emerald-500/20 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.8)]' 
                      : 'border-white/70 bg-white/10'
                  }`}>
                    <Target className={`w-6 h-6 ${knotDistance < 12 ? 'text-emerald-400 animate-spin' : 'text-white/80'}`} />
                  </div>
                </div>

                {/* Real-Time Palpation HUD */}
                <div className="absolute top-4 left-4 p-3.5 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800 space-y-1 text-xs max-w-xs shadow-xl">
                  <span className="text-[10px] uppercase text-neutral-400 block font-semibold">
                    Digital Palpation Feedback
                  </span>
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-white">Tissue Turgor:</span>
                    <span className={knotDistance < 12 ? 'text-emerald-400 font-bold' : 'text-neutral-400'}>
                      {knotDistance < 12 ? 'Hyper-Taut Nodule (88%)' : 'Pliable (18%)'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-150 ${knotDistance < 12 ? 'bg-emerald-400' : 'bg-neutral-600'}`}
                      style={{ width: `${Math.max(10, Math.min(100, 100 - knotDistance * 2))}%` }}
                    />
                  </div>
                </div>

                {/* Bottom Action Prompt */}
                <div className="absolute bottom-6 inset-x-6 flex justify-between items-center">
                  <span className="text-xs text-neutral-300 bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-neutral-800">
                    {knotDistance < 12 
                      ? '✓ Target locked! Click button to place guide tube.' 
                      : 'Move cursor or finger until the reticle turns green over the knot.'}
                  </span>

                  <button
                    onClick={handleLockAcupoint}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center space-x-2 shadow-lg cursor-pointer ${
                      knotDistance < 12 
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black animate-pulse' 
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                    }`}
                  >
                    <span>Place Guide Tube Here</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 3: THE PAINLESS DERMAL TAP (Quick-Tap)                   */}
          {/* ------------------------------------------------------------- */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                <span className="text-white font-medium flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>The Painless Dermal Breach (Guide-Tube Quick-Tap)</span>
                </span>
                <span className="text-amber-300 font-mono">0.01 sec • 0.02 N Force</span>
              </div>

              {/* Guide-Tube Tap Interactive Stage */}
              <div className="relative w-full h-[540px] sm:h-[620px] rounded-xl overflow-hidden border border-neutral-800 bg-[#07090e] flex flex-col items-center justify-center select-none p-6">
                
                {/* Clinical Context & Instruction */}
                <div className="absolute top-6 text-center space-y-1 z-20 max-w-md">
                  <h4 className="font-display text-lg font-bold text-white">
                    Tap the Copper Needle Head
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    By tapping the handle against the skin-stabilizing guide tube, the needle enters the epidermis in 0.01s — well beneath human pain receptor recognition (0.50 N threshold).
                  </p>
                </div>

                {/* Visual Guide Tube & Needle Placement */}
                <div className="relative flex flex-col items-center justify-center my-auto">
                  
                  {/* Copper Needle Handle Waiting to be Tapped */}
                  <button
                    onClick={handleQuickTap}
                    className={`group relative z-30 flex flex-col items-center cursor-pointer transition-transform duration-200 ${
                      isTapped ? 'translate-y-8 scale-95' : 'hover:scale-105 animate-bounce'
                    }`}
                    title="Tap to breach dermis painlessly"
                  >
                    {/* Ring Finial */}
                    <div className="w-5 h-5 rounded-full border-2 border-amber-400 bg-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                    {/* Coiled Copper Handle */}
                    <div className="w-3.5 h-20 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-sm shadow-md border border-amber-500/50" />
                    
                    {!isTapped && (
                      <span className="absolute -top-8 px-3 py-1 rounded-full bg-emerald-500 text-black font-bold text-[10px] shadow-lg whitespace-nowrap">
                        Tap Here (Index Finger)
                      </span>
                    )}
                  </button>

                  {/* Clear Sterile Guide Tube Resting on Skin */}
                  <div className={`w-8 h-48 border-2 border-cyan-400/60 rounded-t-lg bg-cyan-950/20 backdrop-blur-sm flex flex-col items-center justify-end relative shadow-inner transition-opacity duration-500 ${
                    isTapped ? 'opacity-30' : 'opacity-100'
                  }`}>
                    {/* Stainless 316L Needle Shaft inside tube */}
                    <div className="w-1 h-36 bg-white shadow-[0_0_6px_#fff]" />
                  </div>

                  {/* Living Skin Surface Boundary Line */}
                  <div className="w-72 h-14 bg-gradient-to-b from-[#bd7d65] to-[#9c5943] border-t-2 border-amber-300/60 rounded-b-xl flex items-center justify-center shadow-lg">
                    <span className="text-[11px] font-mono text-white/90">
                      Epidermal Surface (0.0 mm)
                    </span>
                  </div>
                </div>

                {/* Bottom Tap Trigger Action */}
                <div className="absolute bottom-6 inset-x-6 flex justify-between items-center">
                  <span className="text-xs text-neutral-400">
                    {isTapped 
                      ? '✓ Painless breach completed! 2.0mm dermal depth achieved.' 
                      : 'Click the copper handle or use button to execute tap.'}
                  </span>

                  <button
                    onClick={handleQuickTap}
                    className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all flex items-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isTapped ? 'Proceed to Deep Navigation ➔' : 'Execute Quick-Tap (0.01s)'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 4: PLUNGE THROUGH STRATA & DE-QI MANIPULATION            */}
          {/* ------------------------------------------------------------- */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                <span className="text-white font-medium flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Fascial Navigation & De-Qi Unlock</span>
                </span>
                <span className="text-emerald-400 font-mono text-sm font-bold">
                  Current Depth: {depthMm.toFixed(1)} mm
                </span>
              </div>

              {/* The Living Anatomical Strata Cutaway Canvas */}
              <div 
                className="relative w-full h-[540px] sm:h-[620px] rounded-xl overflow-hidden border border-neutral-800 bg-[#07090e] select-none"
                onMouseMove={(e) => handleNeedleDragMove(e.clientY)}
                onMouseUp={handleNeedleDragEnd}
                onTouchMove={(e) => handleNeedleDragMove(e.touches[0].clientY)}
                onTouchEnd={handleNeedleDragEnd}
              >
                {/* Microscopic Living Cross-Section Image */}
                <img 
                  src={getAssetUrl('tissue_cross_section_clean.jpg')} 
                  alt="Microscopic anatomical tissue cross-section" 
                  className="absolute inset-0 w-full h-full object-cover filter contrast-105"
                />

                {/* Subtle Anatomical Depth Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 text-[10px] text-white/70 font-mono">
                  <div className="border-b border-white/20 pb-1">
                    <span>EPIDERMIS & SENSORY NERVES (0.0 - 0.5 mm)</span>
                  </div>
                  <div className="border-b border-white/20 pb-1">
                    <span>DERMIS & CAPILLARY PLEXUS (0.5 - 3.0 mm)</span>
                  </div>
                  <div className="border-b border-white/20 pb-1">
                    <span>SUBCUTANEOUS ADIPOSE & COLLAGEN FASCIA (3.0 - 8.0 mm)</span>
                  </div>
                  <div className="border-b border-emerald-400/40 pb-1 text-emerald-300 font-bold">
                    <span>DEEP SKELETAL MUSCLE MOTOR BAND ({activeCase.targetDepth} mm TARGET)</span>
                  </div>
                </div>

                {/* The Target Trigger Point Knot */}
                <div 
                  style={{ top: '78%', left: '50%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
                >
                  <div className={`w-16 h-16 rounded-full transition-all duration-500 border-2 ${
                    isKnotReleased 
                      ? 'bg-emerald-500/40 border-emerald-400 scale-125 shadow-[0_0_30px_#10b981]' 
                      : depthMm >= activeCase.targetDepth - 1.5 
                      ? 'bg-rose-600/60 border-rose-400 scale-110 animate-pulse shadow-[0_0_20px_#f43f5e]' 
                      : 'bg-rose-950/80 border-rose-700/60'
                  }`} />
                  <span className="text-[10px] text-white font-mono bg-black/80 px-2 py-0.5 rounded-full mt-1 border border-neutral-700">
                    {isKnotReleased ? '✓ SPASM UNLOCKED (DE-QI)' : `ACTIVE TRIGGER KNOT (${activeCase.targetDepth}mm)`}
                  </span>
                </div>

                {/* THE MOVING SURGICAL ACUPUNCTURE NEEDLE */}
                <div 
                  style={{ 
                    left: '50%',
                    top: `${Math.min(78, 20 + (depthMm / 15) * 58)}%`,
                    transform: `translate(-50%, -100%) rotate(${twirlAngle}deg)`
                  }}
                  onMouseDown={(e) => handleNeedleDragStart(e.clientY)}
                  onTouchStart={(e) => handleNeedleDragStart(e.touches[0].clientY)}
                  className={`absolute z-30 flex flex-col items-center cursor-ns-resize transition-transform ${
                    isTwirling ? 'scale-105' : ''
                  }`}
                >
                  {/* Ring Finial */}
                  <div className="w-4 h-4 rounded-full border-2 border-amber-400 bg-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                  {/* Coiled Copper Handle */}
                  <div className="w-3 h-24 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-sm shadow-md border border-amber-400" />
                  {/* Stainless 316L Shaft */}
                  <div className="w-1 h-44 bg-white shadow-[0_0_8px_#fff]" />
                  {/* Trocar Tip */}
                  <div className="w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-t-[8px] border-t-white" />
                </div>

                {/* De-Qi Healing Meridian Radiance Effect */}
                {isKnotReleased && (
                  <div className="absolute inset-0 pointer-events-none bg-emerald-500/10 animate-pulse flex items-center justify-center">
                    <div className="w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl" />
                  </div>
                )}

                {/* Floating Depth Marker Bubble */}
                <div 
                  style={{ 
                    left: '56%',
                    top: `${Math.min(78, 20 + (depthMm / 15) * 58)}%`,
                    transform: 'translateY(-50%)'
                  }}
                  className="absolute pointer-events-none bg-neutral-950/90 text-white border border-neutral-700 px-2.5 py-1 rounded-lg text-xs font-mono shadow-xl flex items-center space-x-1.5"
                >
                  <span className="text-emerald-400 font-bold">{depthMm.toFixed(1)} mm</span>
                  <span className="text-neutral-400 text-[10px]">
                    {depthMm < 0.5 ? 'Epidermis' : depthMm < 3 ? 'Dermis' : depthMm < 8 ? 'Fascia' : 'Muscle Knot'}
                  </span>
                </div>
              </div>

              {/* PRECISION MICROMETER DEPTH SLIDER */}
              <div className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300 flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Needle Insertion Depth (Precision Dial)</span>
                  </span>
                  <span className="text-emerald-400 font-bold text-sm tabular-nums font-mono">
                    {depthMm.toFixed(1)} mm
                  </span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="15"
                  step="0.1"
                  value={depthMm}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setDepthMm(val);
                    if (val >= activeCase.targetDepth - 0.5 && val <= activeCase.targetDepth + 0.8 && !isKnotReleased) {
                      playSound('palpate', isMuted);
                    }
                  }}
                  className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 font-normal">
                  <span>Epidermis (0mm)</span>
                  <span>Dermis (3mm)</span>
                  <span>Fascia (6mm)</span>
                  <span className="text-emerald-400 font-semibold">Target Knot ({activeCase.targetDepth}mm)</span>
                  <span>Deep Muscle (15mm)</span>
                </div>
              </div>

              {/* CLINICAL MANIPULATION TECHNIQUES TOOLBAR */}
              <div className="space-y-2">
                <span className="text-[11px] font-normal text-neutral-400 block">
                  Doctor&apos;s Clinical Toolkit (Execute Action to Unlock Knot)
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* 1. 3D Twirl */}
                  <button
                    onClick={handleTwirl}
                    className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-left transition-all cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white group-hover:text-emerald-300">
                        Twirl (Roll L→R)
                      </span>
                      <RotateCcw className={`w-3.5 h-3.5 text-neutral-400 ${isTwirling ? 'animate-spin text-emerald-400' : ''}`} />
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">
                      Winds collagen fibers
                    </span>
                  </button>

                  {/* 2. Thrust & Lift */}
                  <button
                    onClick={handleThrustLift}
                    className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-left transition-all cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white group-hover:text-emerald-300">
                        Thrust & Lift
                      </span>
                      <Activity className={`w-3.5 h-3.5 text-neutral-400 ${isThrusting ? 'animate-bounce text-emerald-400' : ''}`} />
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">
                      Ti Ch&apos;a micro-peck
                    </span>
                  </button>

                  {/* 3. Electro-Acu */}
                  <button
                    onClick={() => {
                      setIsElectro(!isElectro);
                      playSound('tap', isMuted);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isElectro 
                        ? 'bg-amber-950/60 border-amber-400/80 text-amber-200' 
                        : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">Electro (2 Hz)</span>
                      <Zap className={`w-3.5 h-3.5 ${isElectro ? 'text-amber-400 animate-pulse' : 'text-neutral-400'}`} />
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">
                      Endorphin wave
                    </span>
                  </button>

                  {/* 4. Warm Needle Moxa */}
                  <button
                    onClick={() => {
                      setIsMoxa(!isMoxa);
                      playSound('twirl', isMuted);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isMoxa 
                        ? 'bg-rose-950/60 border-rose-400/80 text-rose-200' 
                        : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">Warm Moxa</span>
                      <Flame className={`w-3.5 h-3.5 ${isMoxa ? 'text-rose-400 animate-pulse' : 'text-neutral-400'}`} />
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">
                      Infrared heat flow
                    </span>
                  </button>
                </div>
              </div>

              {/* Patient Sensation Bar */}
              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs flex items-center justify-between">
                <span className="text-neutral-400">Patient Sensation:</span>
                <span className={`font-medium ${isKnotReleased ? 'text-emerald-300' : 'text-white'}`}>
                  {isKnotReleased 
                    ? 'DE-QI (得气)! A warm, soothing dull heaviness radiating through the pathway. The knot unlocks and tension dissolves.'
                    : depthMm < 0.5
                    ? 'Sterile skin boundary. Zero sensation.'
                    : depthMm < 3
                    ? 'Feather-light dermal entry (0.02 N). 25× lower force than a vaccine needle.'
                    : depthMm < 8
                    ? 'Smooth gliding through collagen fascia. No sharp pain receptors engaged.'
                    : 'Engaging spastic trigger endplate. Gentle pressure felt as needle contacts the band.'}
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Live Clinical Bio-Telemetry & Patient Resolution */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Real-Time Bio-Mechanical Telemetry HUD */}
          <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                Live Bio-Telemetry
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                isKnotReleased ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-neutral-800 text-neutral-300'
              }`}>
                {isKnotReleased ? 'KNOT DECOMPRESSED' : 'MONITORING SENSORS'}
              </span>
            </div>

            {/* Dermal Penetration Force */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Dermal Force</span>
                <span className="font-mono text-white font-semibold">{penetrationForce}</span>
              </div>
              <p className="text-[10px] text-neutral-400">
                Human pain threshold is 0.50 N (acupuncture is 25× lower)
              </p>
            </div>

            {/* Myofascial Spasm Level */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-800">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400">Spasm Contraction</span>
                <span className={isKnotReleased ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                  {spasmPct}%
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${isKnotReleased ? 'bg-emerald-400' : 'bg-rose-500'}`}
                  style={{ width: `${spasmPct}%` }}
                />
              </div>
            </div>

            {/* Micro-Perfusion Blood Flow */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-800">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400">Micro-Vascular Blood Flow</span>
                <span className="text-emerald-400 font-semibold">+{perfusionPct}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, perfusionPct / 4)}%` }}
                />
              </div>
            </div>

            {/* Autonomic Vagus Nerve State */}
            <div className="pt-2 border-t border-neutral-800 space-y-1">
              <span className="text-[11px] text-neutral-400 block">Autonomic State</span>
              <span className="text-xs text-white font-medium block">
                {isKnotReleased ? 'Parasympathetic Recovery (96%)' : depthMm > 6 ? 'Vagal Modulation Initiated (62%)' : 'Resting Baseline (32%)'}
              </span>
            </div>
          </div>

          {/* Clinical Case Context Card */}
          <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 shadow-xl space-y-4">
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block">
              {activeCase.anatomicalSite}
            </span>

            <h4 className="font-display text-lg font-bold text-white">
              {activeCase.name}
            </h4>

            <div className="space-y-2 text-xs text-neutral-300 leading-relaxed font-normal">
              <p>
                <strong className="text-white">Pathology: </strong>
                {activeCase.knotDesc}
              </p>
              <p>
                <strong className="text-white">Clinical Sensation: </strong>
                {activeCase.reliefDesc}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-xs italic text-neutral-400 leading-relaxed">
              {activeCase.doctorQuote}
            </div>

            {/* Booking Action */}
            <button
              onClick={() => onOpenBooking && onOpenBooking(activeCase.id)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold text-xs tracking-wide transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
            >
              <span>Book Priority Consultation (₹600)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
