import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Hand, 
  Sliders, 
  Activity,
  Zap,
  Flame,
  ShieldCheck,
  Target,
  HelpCircle,
  Eye,
  Info,
  Check
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

// Audio Synthesizer for Authentic Clinical Acoustic Feedback
function playSound(type, isMuted) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'peel') {
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
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'twirl') {
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
    anatomicalSite: 'Cervical Sub-Occipital Fascia & Hand Web Space',
    targetDepth: 12.0,
    knotDesc: 'Hyper-contracted motor band compressing the greater occipital nerve.',
    reliefDesc: 'Vice-like grip around temples dissolves as sub-occipital fibers decompress.',
    doctorQuote: '“Releasing the motor endplate knot at 12mm halts the trigeminocervical pain loop at its mechanical source.” — Dr. Nivedha'
  },
  {
    id: 'sciatica',
    name: 'Piriformis Spasm & Sciatic Radiation',
    point: 'GB30 (Huantiao) & BL40 (Weizhong)',
    anatomicalSite: 'Deep Pelvic Myofascial Sheath',
    targetDepth: 14.0,
    knotDesc: 'Spastic piriformis muscle band compressing the sciatic nerve trunk.',
    reliefDesc: 'Burning, radiating leg ache subsides into a wave of warm comfort.',
    doctorQuote: '“Precision fascial glide reaches the deep sheath without tearing surrounding tissue.” — Dr. Nivedha'
  },
  {
    id: 'neck',
    name: 'Trapezius Desk-Spasm & Cervical Strain',
    point: 'GB21 (Jianjing)',
    anatomicalSite: 'Upper Trapezius Trigger Zone',
    targetDepth: 10.5,
    knotDesc: 'Taut myofascial knot from prolonged laptop and phone posture.',
    reliefDesc: 'Heavy stone-weight lifts off the shoulders; neck rotation is instantly restored.',
    doctorQuote: '“Patients feel their shoulders physically drop the moment the twitch response occurs.” — Dr. Nivedha'
  }
];

export default function TissueDepthSimulator({ onOpenBooking }) {
  // Navigation State (1: Pack, 2: Palpate, 3: Tap, 4: Strata & De-Qi)
  const [activeStep, setActiveStep] = useState(1);
  const [activeCase, setActiveCase] = useState(CLINICAL_CASES[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeKnowledgeTab, setActiveKnowledgeTab] = useState('scale'); // 'scale' | 'gate' | 'deqi' | 'sterile'

  // Step 1: Blister Pack Unseal State
  const [foilPeelProgress, setFoilPeelProgress] = useState(0); // 0 to 100%
  const [isPackUnsealed, setIsPackUnsealed] = useState(false);
  const isDraggingFoilRef = useRef(false);
  const foilStartYRef = useRef(0);

  // Step 2: Acupoint Palpation State
  const [palpatePos, setPalpatePos] = useState({ x: 50, y: 50 });
  const [knotDistance, setKnotDistance] = useState(100);
  const [isKnotLocked, setIsKnotLocked] = useState(false);
  const knotTarget = { x: 54, y: 46 };

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

  // Clinical Reset
  const handleResetAll = useCallback(() => {
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
  }, []);

  // Action Handlers
  const handleQuickTap = useCallback(() => {
    playSound('tap', isMuted);
    setIsTapped(true);
    setDepthMm(2.0);
    setTimeout(() => setActiveStep(4), 500);
  }, [isMuted]);

  const handleTwirl = useCallback(() => {
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
  }, [depthMm, activeCase.targetDepth, isMuted]);

  const handleThrustLift = useCallback(() => {
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
  }, [depthMm, activeCase.targetDepth, isMuted]);

  // FULL KEYBOARD SHORTCUTS INTEGRATION ("Keys are working!")
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();

      // Fullscreen shortcuts
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        return;
      }
      if (key === 'f') {
        setIsFullscreen((prev) => !prev);
        return;
      }

      // Step Navigation via numbers [1, 2, 3, 4]
      if (key === '1') { setActiveStep(1); return; }
      if (key === '2') { setActiveStep(2); return; }
      if (key === '3') { setActiveStep(3); return; }
      if (key === '4') { setActiveStep(4); return; }

      // Step Navigation via Arrow Left / Right
      if (e.key === 'ArrowRight') {
        setActiveStep((prev) => Math.min(4, prev + 1));
        return;
      }
      if (e.key === 'ArrowLeft') {
        setActiveStep((prev) => Math.max(1, prev - 1));
        return;
      }

      // Primary Action [Space] or [Enter]
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (activeStep === 1) {
          setFoilPeelProgress(100);
          setIsPackUnsealed(true);
          playSound('peel', isMuted);
          setTimeout(() => setActiveStep(2), 500);
        } else if (activeStep === 2) {
          setIsKnotLocked(true);
          playSound('tap', isMuted);
          setTimeout(() => setActiveStep(3), 500);
        } else if (activeStep === 3) {
          handleQuickTap();
        } else if (activeStep === 4) {
          handleTwirl();
        }
        return;
      }

      // Needle Plunge via Arrow Up / Down
      if (activeStep === 4) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setDepthMm((prev) => {
            const next = Math.min(15, +(prev + 0.5).toFixed(1));
            if (next >= activeCase.targetDepth - 0.5 && next <= activeCase.targetDepth + 0.8 && !isKnotReleased) {
              playSound('palpate', isMuted);
            }
            return next;
          });
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setDepthMm((prev) => Math.max(0, +(prev - 0.5).toFixed(1)));
        }
      }

      // Toolkit Shortcuts
      if (key === 't') { handleTwirl(); return; }
      if (key === 'l') { handleThrustLift(); return; }
      if (key === 'e') { setIsElectro((prev) => !prev); playSound('tap', isMuted); return; }
      if (key === 'm') { setIsMoxa((prev) => !prev); playSound('twirl', isMuted); return; }
      if (key === 'r') { handleResetAll(); return; }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, activeStep, activeCase, isMuted, isKnotReleased, handleQuickTap, handleTwirl, handleThrustLift, handleResetAll]);

  // Electro-Acupuncture Vibration Loop
  useEffect(() => {
    if (!isElectro || !isKnotReleased) return;
    const interval = setInterval(() => {
      playSound('tap', isMuted);
    }, 500);
    return () => clearInterval(interval);
  }, [isElectro, isKnotReleased, isMuted]);

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

    const dx = x - knotTarget.x;
    const dy = y - knotTarget.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    setKnotDistance(dist);

    if (dist < 12 && Math.random() > 0.6) {
      playSound('palpate', isMuted);
    }
  };

  const handleLockAcupoint = () => {
    setIsKnotLocked(true);
    playSound('tap', isMuted);
    setTimeout(() => setActiveStep(3), 500);
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

    if (newDepth >= activeCase.targetDepth - 0.5 && newDepth <= activeCase.targetDepth + 0.8 && !isKnotReleased) {
      playSound('palpate', isMuted);
    }
  };

  const handleNeedleDragEnd = () => {
    isDraggingNeedleRef.current = false;
  };

  // Computed Real-Time Telemetry
  const spasmPct = isKnotReleased ? 8 : Math.max(14, Math.round(88 - (depthMm * 4.5)));
  const perfusionPct = isKnotReleased ? (isMoxa ? 480 : 340) : Math.round(depthMm * 18);
  const penetrationForce = depthMm === 0 ? '0.00 N' : depthMm <= 2.5 ? '0.02 N (Pain-free)' : isKnotReleased ? '0.03 N (Decompressed)' : '0.14 N (Contracted band)';

  return (
    <div 
      tabIndex={0}
      data-testid="tissue-depth-simulator"
      className={`transition-all duration-300 font-sans focus:outline-none ${
        isFullscreen 
          ? 'fixed inset-0 z-50 w-screen h-screen bg-[#07090e] p-4 sm:p-8 flex flex-col justify-between overflow-y-auto select-none' 
          : 'relative bg-[#07090e] text-neutral-100 rounded-3xl border border-neutral-800 p-6 sm:p-10 shadow-2xl space-y-8 select-none overflow-hidden'
      }`}
    >

      {/* HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-xs font-normal text-neutral-400">
            <span className="text-emerald-400 font-medium">Demystifying Acupuncture</span>
            <span>/</span>
            <span>Why Hair-Thin Needles Do Not Hurt</span>
          </div>

          <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            The complete interactive experience: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              From sterile blister unseal to De-Qi release
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            Step into Dr. Nivedha&apos;s shoes. Discover why 0.18mm solid micro-needles enter painlessly, how guide tubes switch off your brain&apos;s pain gate, and experience the physical decompression of deep trigger knots.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 cursor-pointer ${
              isFullscreen 
                ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-lg' 
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
            }`}
            title="Toggle fullscreen clinic mode [F / Esc]"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Exit Full Screen' : 'Full Screen Mode'}</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-black/40 rounded border border-white/20 text-white/80 font-mono">
              F
            </kbd>
          </button>

          {/* Clinical Case Selector */}
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

          {/* Audio Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors flex items-center cursor-pointer border border-neutral-700"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Reset Flow */}
          <button
            onClick={handleResetAll}
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-800"
            title="Reset procedure [R]"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KEYBOARD SHORTCUTS BAR (Quick reference for keys) */}
      <div className="flex flex-wrap items-center gap-3 px-3 py-2 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-400 font-mono">
        <span className="text-emerald-400 font-semibold flex items-center space-x-1 font-sans">
          <Info className="w-3.5 h-3.5" />
          <span>Active Keyboard Controls:</span>
        </span>
        <span className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-white">Space</kbd>
          <span>Act / Advance</span>
        </span>
        <span className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-white">1–4</kbd>
          <span>Steps</span>
        </span>
        <span className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-white">↑ / ↓</kbd>
          <span>Depth</span>
        </span>
        <span className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-white">T</kbd>
          <span>Twirl</span>
        </span>
        <span className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-white">F</kbd>
          <span>Full Screen</span>
        </span>
        <span className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-white">R</kbd>
          <span>Reset</span>
        </span>
      </div>

      {/* STEP-BY-STEP PROGRESS BAR WITH KEY BADGES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
        {[
          { step: 1, key: '1', title: '1. Sterile Unseal', subtitle: 'Peel blister pack' },
          { step: 2, key: '2', title: '2. Palpate Point', subtitle: 'Locate trigger knot' },
          { step: 3, key: '3', title: '3. Painless Tap', subtitle: 'Guide tube dermal breach' },
          { step: 4, key: '4', title: '4. Strata & De-Qi', subtitle: 'Plunge & decompress' },
        ].map((item) => {
          const isDone = activeStep > item.step;
          const isCurrent = activeStep === item.step;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
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
                <div className="flex items-center space-x-1.5">
                  <kbd className="px-1 py-0.2 text-[9px] bg-neutral-800 rounded text-neutral-400 border border-neutral-700 font-mono">
                    [{item.key}]
                  </kbd>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
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
        
        {/* Left Column (8 cols): The Main Viewport */}
        <div className="lg:col-span-8 bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 shadow-xl space-y-6">

          {/* ------------------------------------------------------------- */}
          {/* STEP 1: PEEL THE STERILE BLISTER PACK                         */}
          {/* ------------------------------------------------------------- */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                <span className="text-white font-medium flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Myth Buster #1: 100% Single-Use Sterile Guarantee</span>
                </span>
                <span className="text-neutral-400 font-mono">Press [Space] to quick-unseal</span>
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

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

                {/* The Interactive Medical Blister Pack Unit */}
                <div className="relative w-72 sm:w-80 h-[440px] sm:h-[480px] bg-neutral-900/95 backdrop-blur-md rounded-2xl border-2 border-neutral-700/80 shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
                  
                  <div className="space-y-1 text-center border-b border-neutral-800 pb-3">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">
                      Sterile EO • Single Patient Use Only
                    </span>
                    <h4 className="font-display text-base font-bold text-white">
                      Arura Clinical Acupuncture Needle
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      Lot #2026-ARU-09 • Vacuum Sealed
                    </p>
                  </div>

                  {/* Needle Visible Through Medical Clear Thermoform Blister */}
                  <div className="relative flex-1 flex flex-col items-center justify-center my-3 bg-neutral-950/70 rounded-xl border border-neutral-800/80 p-4 overflow-hidden">
                    <div className="w-4 h-72 border-2 border-cyan-400/40 rounded-full bg-cyan-950/20 backdrop-blur-sm flex items-center justify-center relative shadow-inner">
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

                  {/* Peelable Foil Seal Flap */}
                  {!isPackUnsealed ? (
                    <div 
                      onMouseDown={(e) => handleFoilStart(e.clientY)}
                      onTouchStart={(e) => handleFoilStart(e.touches[0].clientY)}
                      className="cursor-grab active:cursor-grabbing p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 border border-emerald-400/50 text-center hover:bg-emerald-950/40 transition-all shadow-lg select-none"
                    >
                      <div className="w-12 h-1.5 bg-emerald-400 rounded-full mx-auto mb-2 opacity-80 animate-pulse" />
                      <span className="text-xs font-semibold text-white block">
                        Drag Down to Peel Open Foil ({Math.round(foilPeelProgress)}%)
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        Hold & drag, or press <kbd className="px-1 py-0.5 bg-black/60 rounded text-emerald-300 font-mono text-[9px]">[Space]</kbd>
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveStep(2)}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                    >
                      <span>Proceed to Palpation [Space]</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Quick-Unseal Button */}
                {!isPackUnsealed && (
                  <button
                    onClick={() => {
                      setFoilPeelProgress(100);
                      setIsPackUnsealed(true);
                      playSound('peel', isMuted);
                      setTimeout(() => setActiveStep(2), 500);
                    }}
                    className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-700 text-xs text-neutral-300 hover:text-white hover:border-neutral-500 transition-all cursor-pointer shadow-md flex items-center space-x-1.5"
                  >
                    <span>Quick-Unseal [Space]</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                  {knotDistance < 12 ? '● TARGET LOCKED (Tender Nodule Found) — Press [Space]' : 'Move finger/mouse over skin to locate knot'}
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
                <img 
                  src={getAssetUrl('anatomical_hand_resting.jpg')} 
                  alt="Anatomical hand and forearm for LI4 palpation" 
                  className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-105"
                />

                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <path 
                    d="M 120 400 Q 240 280, 360 270 T 580 180" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                  />
                </svg>

                {/* Target Knot Node */}
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

                {/* Doctor's Loupe */}
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

                {/* HUD */}
                <div className="absolute top-4 left-4 p-3.5 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800 space-y-1 text-xs max-w-xs shadow-xl">
                  <span className="text-[10px] uppercase text-neutral-400 block font-semibold">
                    Digital Palpation Telemetry
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
                      ? '✓ Target locked! Click button or press [Space] to place guide tube.' 
                      : 'Move cursor or finger until reticle turns green over the knot.'}
                  </span>

                  <button
                    onClick={handleLockAcupoint}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center space-x-2 shadow-lg cursor-pointer ${
                      knotDistance < 12 
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black animate-pulse' 
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                    }`}
                  >
                    <span>Place Guide Tube Here [Space]</span>
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
                  <span>Myth Buster #2: The 0.01s Painless Dermal Breach</span>
                </span>
                <span className="text-amber-300 font-mono">0.02 N Force • Press [Space] to Tap</span>
              </div>

              {/* Guide-Tube Tap Interactive Stage */}
              <div className="relative w-full h-[540px] sm:h-[620px] rounded-xl overflow-hidden border border-neutral-800 bg-[#07090e] flex flex-col items-center justify-center select-none p-6">
                
                {/* Clinical Explanation Pill */}
                <div className="absolute top-6 text-center space-y-1.5 z-20 max-w-lg bg-neutral-950/80 backdrop-blur-md p-4 rounded-2xl border border-neutral-800">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold block">
                    Melzack-Wall Gate Control Principle
                  </span>
                  <h4 className="font-display text-base font-bold text-white">
                    The Guide Tube Closes the Pain Gate
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    The plastic tube presses the skin first, stimulating fast A-beta touch fibers that flood your spinal cord, completely blocking pain signals. When the index finger taps, the needle enters in 0.01s (0.02 N) — totally unnoticed.
                  </p>
                </div>

                {/* Visual Guide Tube & Needle */}
                <div className="relative flex flex-col items-center justify-center my-auto pt-16">
                  
                  {/* Copper Needle Handle */}
                  <button
                    onClick={handleQuickTap}
                    className={`group relative z-30 flex flex-col items-center cursor-pointer transition-transform duration-200 ${
                      isTapped ? 'translate-y-8 scale-95' : 'hover:scale-105 animate-bounce'
                    }`}
                    title="Tap needle handle [Space]"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-amber-400 bg-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                    <div className="w-3.5 h-20 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-sm shadow-md border border-amber-500/50" />
                    
                    {!isTapped && (
                      <span className="absolute -top-9 px-3 py-1 rounded-full bg-emerald-500 text-black font-bold text-[10px] shadow-lg whitespace-nowrap flex items-center space-x-1">
                        <span>Tap Handle [Space]</span>
                      </span>
                    )}
                  </button>

                  {/* Clear Sterile Guide Tube */}
                  <div className={`w-8 h-48 border-2 border-cyan-400/60 rounded-t-lg bg-cyan-950/20 backdrop-blur-sm flex flex-col items-center justify-end relative shadow-inner transition-opacity duration-500 ${
                    isTapped ? 'opacity-30' : 'opacity-100'
                  }`}>
                    <div className="w-1 h-36 bg-white shadow-[0_0_6px_#fff]" />
                  </div>

                  {/* Skin Surface */}
                  <div className="w-72 h-14 bg-gradient-to-b from-[#bd7d65] to-[#9c5943] border-t-2 border-amber-300/60 rounded-b-xl flex items-center justify-center shadow-lg">
                    <span className="text-[11px] font-mono text-white/90">
                      Epidermal Surface (0.0 mm) — Gate Closed
                    </span>
                  </div>
                </div>

                {/* Bottom Trigger Action */}
                <div className="absolute bottom-6 inset-x-6 flex justify-between items-center">
                  <span className="text-xs text-neutral-400">
                    {isTapped 
                      ? '✓ Painless breach completed! Dermal depth 2.0 mm.' 
                      : 'Click handle or press [Space] to execute 0.01s tap.'}
                  </span>

                  <button
                    onClick={handleQuickTap}
                    className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all flex items-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isTapped ? 'Proceed to Deep Navigation [Space] ➔' : 'Execute Quick-Tap [Space]'}</span>
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
                  <span>Fascial Navigation & De-Qi Unlock</span>
                </span>
                <span className="text-emerald-400 font-mono text-sm font-bold">
                  Depth: {depthMm.toFixed(1)} mm • [↑ / ↓ Keys to Plunge]
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
                <img 
                  src={getAssetUrl('tissue_cross_section_clean.jpg')} 
                  alt="Microscopic anatomical tissue cross-section" 
                  className="absolute inset-0 w-full h-full object-cover filter contrast-105"
                />

                {/* Layer Annotations */}
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

                {/* Trigger Knot */}
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

                {/* Needle */}
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
                  <div className="w-4 h-4 rounded-full border-2 border-amber-400 bg-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                  <div className="w-3 h-24 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-sm shadow-md border border-amber-400" />
                  <div className="w-1 h-44 bg-white shadow-[0_0_8px_#fff]" />
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
                  <div className="flex items-center space-x-2">
                    <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-neutral-400 font-mono text-[10px]">
                      Use [↑] / [↓] Keys
                    </kbd>
                    <span className="text-emerald-400 font-bold text-sm tabular-nums font-mono">
                      {depthMm.toFixed(1)} mm
                    </span>
                  </div>
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
                  Doctor&apos;s Clinical Toolkit (Execute Action or Press Hotkey)
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* 1. 3D Twirl [T] */}
                  <button
                    onClick={handleTwirl}
                    className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-left transition-all cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white group-hover:text-emerald-300">
                        Twirl (Roll L→R)
                      </span>
                      <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-neutral-400 font-mono text-[9px]">
                        T
                      </kbd>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">
                      Winds collagen fibers
                    </span>
                  </button>

                  {/* 2. Thrust & Lift [L] */}
                  <button
                    onClick={handleThrustLift}
                    className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-left transition-all cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white group-hover:text-emerald-300">
                        Thrust & Lift
                      </span>
                      <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-neutral-400 font-mono text-[9px]">
                        L
                      </kbd>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">
                      Ti Ch&apos;a micro-peck
                    </span>
                  </button>

                  {/* 3. Electro-Acu [E] */}
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
                      <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-neutral-400 font-mono text-[9px]">
                        E
                      </kbd>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">
                      Endorphin wave
                    </span>
                  </button>

                  {/* 4. Warm Needle Moxa [M] */}
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
                      <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-neutral-400 font-mono text-[9px]">
                        M
                      </kbd>
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

      {/* EDUCATIONAL KNOWLEDGE STRIP ("NOTHING TO FEAR") */}
      <div className="border-t border-neutral-800/80 pt-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-semibold text-white">
              Scientific Fear-Busting Knowledge: Why Acupuncture Does Not Hurt
            </h4>
          </div>

          {/* Knowledge Selector Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'scale', label: '0.18mm Scale vs Syringe' },
              { id: 'gate', label: 'Gate Control Theory' },
              { id: 'deqi', label: 'De-Qi Physiology' },
              { id: 'sterile', label: 'Aseptic Safety' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveKnowledgeTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  activeKnowledgeTab === tab.id
                    ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/50 font-medium'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 text-xs leading-relaxed text-neutral-300">
          {activeKnowledgeTab === 'scale' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="space-y-1">
                <span className="text-neutral-400 font-mono text-[10px]">HUMAN HAIR</span>
                <p className="font-semibold text-white text-sm">~0.08 mm</p>
                <p className="text-[11px] text-neutral-400">Naturally flexible keratin organic filament.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-mono text-[10px] font-bold">ARURA ACUPUNCTURE NEEDLE</span>
                <p className="font-semibold text-emerald-300 text-sm">0.18 mm Solid Surgical Steel</p>
                <p className="text-[11px] text-neutral-300">
                  Just over 2× human hair thickness. Solid, round-trocar pine-needle tip that parts muscle fibers cleanly without cutting capillaries.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-rose-400 font-mono text-[10px]">HOSPITAL INJECTION SYRINGE</span>
                <p className="font-semibold text-rose-300 text-sm">0.81 mm (21 Gauge Hollow)</p>
                <p className="text-[11px] text-neutral-400">
                  4.5× thicker than acupuncture needles. Hollow tube with a beveled razor edge designed to slice tissue to inject fluid.
                </p>
              </div>
            </div>
          )}

          {activeKnowledgeTab === 'gate' && (
            <div className="space-y-2">
              <h5 className="font-semibold text-white">How the Guide-Tube Blocks Pain Reception</h5>
              <p>
                Proposed by Ronald Melzack and Patrick Wall in 1965, the Gate Control Theory explains why acupuncture guide tubes produce virtually zero sensation. The plastic tube applies firm pressure to large-diameter myelinated A-beta tactile nerve fibers. These fast-conducting fibers stimulate inhibitory interneurons in the substantia gelatinosa of the spinal cord, closing the neural gate before the fine needle can trigger slow unmyelinated C-fibers.
              </p>
            </div>
          )}

          {activeKnowledgeTab === 'deqi' && (
            <div className="space-y-2">
              <h5 className="font-semibold text-white">What is That Warm, Radiating Sensation (De-Qi)?</h5>
              <p>
                Patients often fear what they will feel. Clinical acupuncture elicits &ldquo;De-Qi&rdquo; (得气), characterized not by sharp pain, but by a warm, heavy, soothing distension. Mechanistically, needle rotation winds collagen and elastin fibers around the needle shaft, causing mechanical deformation of fibroblasts. This triggers a localized surge in extracellular adenosine (a potent natural painkiller and vasodilator) and stimulates the pituitary gland to release endogenous endorphins.
              </p>
            </div>
          )}

          {activeKnowledgeTab === 'sterile' && (
            <div className="space-y-2">
              <h5 className="font-semibold text-white">Hospital-Grade Aseptic Standards</h5>
              <p>
                Every single needle at Arura Wellness Studio is single-use, gamma-ray or ethylene-oxide (EO) sterilized, and sealed individually in medical blister packaging. Once removed, needles are never re-inserted or reused; they are disposed of immediately in sharps biosafety containers. The risk of cross-contamination is mathematically zero.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
