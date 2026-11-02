import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, ShieldCheck, Activity, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

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
    targetDepthMm: 8.5,
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
  const [isTwirling, setIsTwirling] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isKnotReleased, setIsKnotReleased] = useState(false);
  const [twitchAnimation, setTwitchAnimation] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(12); // for How Thin comparison

  const viewportRef = useRef(null);
  const dragStartY = useRef(0);
  const startDepth = useRef(0);

  // Monitor Depth against Target
  useEffect(() => {
    const target = activeScenario.targetDepthMm;
    const isAtTargetZone = depthMm >= target - 1.2 && depthMm <= target + 1.8;

    if (isAtTargetZone && !isKnotReleased) {
      // Trigger local twitch response (fasciculation)
      setTwitchAnimation(true);
      setTimeout(() => {
        setIsKnotReleased(true);
        setTwitchAnimation(false);
      }, 700);
    } else if (depthMm < 2.5) {
      // Reset if pulled back near surface
      setIsKnotReleased(false);
      setTwitchAnimation(false);
    }
  }, [depthMm, activeScenario, isKnotReleased]);

  // Pointer Down directly on the Needle Handle
  const handleNeedlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    startDepth.current = depthMm;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Pointer Move (Plunge needle into tissue)
  const handleNeedlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartY.current;
    
    // Sensitivity: 15px of vertical drag = 1mm of tissue depth
    const newDepth = Math.max(0, Math.min(15.0, startDepth.current + deltaY / 14));
    setDepthMm(newDepth);
  };

  // Pointer Up
  const handleNeedlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  // Twirl Needle Technique
  const handleTwirl = () => {
    setIsTwirling(true);
    setRotationAngle((prev) => prev + 360);
    setTimeout(() => setIsTwirling(false), 500);

    if (depthMm >= activeScenario.targetDepthMm - 2.5) {
      setTwitchAnimation(true);
      setTimeout(() => {
        setIsKnotReleased(true);
        setTwitchAnimation(false);
      }, 600);
    }
  };

  const handleReset = () => {
    setDepthMm(0);
    setIsKnotReleased(false);
    setTwitchAnimation(false);
    setRotationAngle(0);
  };

  // Change Scenario
  const handleSelectScenario = (scen) => {
    setActiveScenario(scen);
    setDepthMm(0);
    setIsKnotReleased(false);
    setTwitchAnimation(false);
  };

  // Physiological Telemetry Calculations
  const penetrationForce = depthMm === 0 ? '0.00 N' : depthMm < 2.0 ? '0.02 N (Pain-free)' : depthMm < 8.0 ? '0.04 N (Fascial glide)' : isKnotReleased ? '0.03 N (Decompressed)' : '0.14 N (Taut knot)';
  const muscleSpasmPct = isKnotReleased ? 12 : Math.max(18, Math.min(95, Math.round(88 - (depthMm * 1.5))));
  const microBloodFlow = isKnotReleased ? 340 : Math.min(100, Math.round(depthMm * 14));
  const vagusTone = isKnotReleased ? 'Parasympathetic Recovery (96%)' : depthMm > 6.0 ? 'Vagal Activation (58%)' : 'Resting Baseline (32%)';

  // Needle Vertical Translation in Viewport (0% to 75% of tissue height)
  // At depthMm = 0, needle tip is exactly at the skin surface (top of tissue)
  // At depthMm = 12, needle tip reaches the muscle knot in center
  const needleYOffsetPx = (depthMm / 15.0) * 230;

  return (
    <div className="bg-[#fcfbf9] rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-xs space-y-12 select-none">
      
      {/* Top Clinical Case Selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200 pb-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand tracking-normal">
            <span>Living Microscopic Cross-Section</span>
            <span className="text-neutral-300">/</span>
            <span>Direct Tactile Biomechanics</span>
          </div>

          <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink leading-[1.12]">
            What happens inside your body <br />
            <span className="text-brand">when the needle enters?</span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            Grab the authentic 0.18mm surgical needle below with your mouse or finger. Drag downward to plunge through living skin, collagen fascia, and deep muscle. Watch the spastic knot twitch and release in real time.
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

      {/* MAIN INTERACTIVE SIMULATION STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (8 cols): The Realistic Living Tissue Cross-Section Viewport */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4">
          
          {/* Top Status & Technique Toolbar */}
          <div className="flex flex-wrap items-center justify-between text-xs text-neutral-500 font-medium pb-2 border-b border-neutral-100">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${isKnotReleased ? 'bg-emerald-500 animate-pulse' : 'bg-brand'}`} />
              <span className="text-neutral-800 font-semibold">
                {isKnotReleased 
                  ? 'Local Twitch Response Induced — Knot Decompressed' 
                  : isDragging 
                  ? `Plunging: ${depthMm.toFixed(1)} mm depth` 
                  : 'Click & drag needle downward to plunge'}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleTwirl}
                className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer"
                title="Perform classical Chih rotating technique"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isTwirling ? 'animate-spin' : ''}`} />
                <span>Twirl needle</span>
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

            {/* Subsurface Tissue Layer Labels (Subtle, architectural, on the right) */}
            <div className="absolute top-0 right-3 bottom-0 pointer-events-none flex flex-col justify-between py-3 text-right text-[9.5px] font-bold text-white/90 drop-shadow-sm tabular-nums">
              <div className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                <span>Epidermis & Dermis (0–3mm)</span>
              </div>
              <div className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                <span>Subcutaneous Fascia (4–8mm)</span>
              </div>
              <div className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                <span className="text-pink-200 font-bold">Trigger Motor Point ({activeScenario.targetDepthMm}mm)</span>
              </div>
              <div className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                <span>Deep Skeletal Muscle (12–15mm)</span>
              </div>
            </div>

            {/* Depth Guideline / Target Reticle at the Trigger Knot */}
            <div 
              className="absolute left-0 right-0 border-t border-dashed border-white/30 pointer-events-none"
              style={{ top: '70%' }}
            >
              <span className="absolute left-3 -top-4 text-[9px] text-white/70 font-semibold bg-black/50 px-2 py-0.5 rounded">
                Target Motor Knot ({activeScenario.targetDepthMm} mm)
              </span>
            </div>

            {/* THE LIVING MUSCLE KNOT TWITCH & VASODILATION OVERLAY */}
            <div 
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '70%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Twitch Vibration Reaction */}
              <motion.div
                animate={{
                  scale: twitchAnimation ? [1, 1.35, 0.85, 1.15, 1] : 1,
                  filter: isKnotReleased ? 'brightness(1.2)' : 'none'
                }}
                transition={{ duration: 0.5 }}
                className={`w-28 h-16 rounded-full border-2 ${
                  isKnotReleased 
                    ? 'border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.6)]' 
                    : 'border-red-400/80 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                } transition-all duration-500`}
              />

              {/* Bio-Electric Nitric Oxide Flush Wave (When Decompressed) */}
              {isKnotReleased && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-emerald-300"
                />
              )}
            </div>

            {/* THE DIRECTLY DRAGGABLE 0.18mm SURGICAL NEEDLE */}
            <div 
              onPointerDown={handleNeedlePointerDown}
              onPointerMove={handleNeedlePointerMove}
              onPointerUp={handleNeedlePointerUp}
              className={`absolute left-1/2 -translate-x-1/2 z-30 transition-transform ${
                isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-105'
              }`}
              style={{
                top: `${needleYOffsetPx - 80}px`,
                touchAction: 'none'
              }}
            >
              {/* Floating Real-Time Depth Badge right beside the needle */}
              <div className="absolute -left-24 top-24 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-neutral-300 shadow-md text-[11px] font-bold tabular-nums text-ink whitespace-nowrap pointer-events-none">
                <span className="text-brand mr-1">▼</span>
                <span>{depthMm.toFixed(1)} mm</span>
              </div>

              {/* Authentic Photographic Acupuncture Needle Asset */}
              <div className="relative flex flex-col items-center">
                
                {/* Traditional Coiled Wire Handle */}
                <img 
                  src={getAssetUrl('single_needle_authentic.png')} 
                  alt="Authentic 0.18mm acupuncture needle"
                  className="select-none pointer-events-none drop-shadow-xl"
                  style={{
                    height: '240px',
                    width: 'auto',
                    transform: `rotate(${rotationAngle}deg)`,
                    transition: isTwirling ? 'transform 0.5s ease-out' : 'none'
                  }}
                  draggable={false}
                />

                {/* Subtle Contact Tissue Shadow */}
                <div 
                  className="w-5 h-1.5 bg-black/40 rounded-full filter blur-[1px] transform -translate-y-2 pointer-events-none"
                  style={{ opacity: depthMm > 0 ? 0.6 : 0.2 }}
                />
              </div>

            </div>

            {/* Prompt Hint when at Surface */}
            {depthMm === 0 && !isDragging && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200 shadow-xs pointer-events-none text-[11px] text-neutral-700 font-medium">
                Drag the needle handle downward to plunge into tissue
              </div>
            )}

          </div>

          {/* Precision Micrometer Depth Slider (Synchronized with Direct Drag) */}
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
                    style={{ width: `${Math.min(100, (microBloodFlow / 340) * 100)}%` }}
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

      {/* COMPANION SCALE COMPARISON: "How Thin?" (Directly below) */}
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
