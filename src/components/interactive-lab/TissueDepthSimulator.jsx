import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, ShieldCheck, Zap, Activity, Volume2, VolumeX } from 'lucide-react';

const CLINICAL_PRESETS = [
  {
    id: 'migraine',
    name: 'Chronic Migraine & Tension Headache',
    location: 'Cervical Splenius & Upper Trapezius',
    targetPoint: 'GB20 / LI4 Pathway',
    targetDepth: 12.0, // mm
    symptom: 'Severe throbbing temporal pain & visual aura',
    triggerDescription: 'Contracted hyper-irritable taut band in deep cervical fascia compressing occipital nerves.',
    deQiDescription: 'Patient feels a radiating warm ache behind the ear followed by immediate sinus decompression.'
  },
  {
    id: 'sciatica',
    name: 'Lumbar Disc Herniation & Sciatica',
    location: 'Deep Piriformis & Gluteal Fascia',
    targetPoint: 'GB30 / BL23 Pathway',
    targetDepth: 14.5, // mm
    symptom: 'Sharp shooting pain radiating down posterior thigh',
    triggerDescription: 'Ischemic spasm of the piriformis muscle entrapping the sciatic nerve bundle.',
    deQiDescription: 'A heavy, pleasant spreading warmth down to the knee; the nerve decompression removes the shooting pain.'
  },
  {
    id: 'insomnia',
    name: 'Autonomic Burnout & Insomnia',
    location: 'Suboccipital Vagus Regulation',
    targetPoint: 'HT7 / PC6 Pathway',
    targetDepth: 8.5, // mm
    symptom: 'Racing nocturnal thoughts & sympathetic nervous overdrive',
    triggerDescription: 'Chronic adrenergic sympathetic tone with elevated cortisol and vagal suppression.',
    deQiDescription: 'A profound tranquil heaviness; respiratory rate slows naturally within 90 seconds.'
  }
];

export default function TissueDepthSimulator({ onOpenBooking }) {
  const [activePreset, setActivePreset] = useState(CLINICAL_PRESETS[0]);
  const [depth, setDepth] = useState(0); // 0mm to 16mm
  const [isTwirling, setIsTwirling] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isKnotReleased, setIsKnotReleased] = useState(false);
  const [twitchTriggered, setTwitchTriggered] = useState(false);

  // Check if target depth is reached
  useEffect(() => {
    const isAtTarget = depth >= activePreset.targetDepth - 1.0 && depth <= activePreset.targetDepth + 2.0;

    if (isAtTarget && !isKnotReleased) {
      // Trigger twitch response
      setTwitchTriggered(true);
      setTimeout(() => {
        setIsKnotReleased(true);
        setTwitchTriggered(false);
      }, 600);
    } else if (depth < 3.0) {
      // Reset if pulled back near surface
      setIsKnotReleased(false);
      setTwitchTriggered(false);
    }
  }, [depth, activePreset, isKnotReleased]);

  // Handle Preset Change
  const handleSelectPreset = (preset) => {
    setActivePreset(preset);
    setDepth(0);
    setIsKnotReleased(false);
    setTwitchTriggered(false);
  };

  // Needle Twirl Technique
  const handleTwirl = () => {
    setIsTwirling(true);
    setRotationAngle((prev) => prev + 360);
    setTimeout(() => setIsTwirling(false), 500);

    // Twirling accelerates knot release if deep enough
    if (depth >= activePreset.targetDepth - 2.5) {
      setTwitchTriggered(true);
      setTimeout(() => {
        setIsKnotReleased(true);
        setTwitchTriggered(false);
      }, 500);
    }
  };

  const handleReset = () => {
    setDepth(0);
    setIsKnotReleased(false);
    setTwitchTriggered(false);
    setRotationAngle(0);
  };

  // Calculated Physiological Telemetry
  const entryResistance = depth === 0 ? '0.00 N' : depth < 2.0 ? '0.02 N (Pain-free)' : depth < 8.0 ? '0.05 N (Glide)' : isKnotReleased ? '0.03 N (Relaxed)' : '0.12 N (Taut knot)';
  const muscleTensionPct = isKnotReleased ? 12 : Math.max(20, Math.min(95, 88 - (depth * 2)));
  const vasodilationPct = isKnotReleased ? 340 : Math.min(100, Math.round(depth * 15));
  const vagusTone = isKnotReleased ? 'Parasympathetic Recovery (96%)' : depth > 5 ? 'Vagal Activation (58%)' : 'Resting Baseline (32%)';

  return (
    <div className="bg-[#fbfbfa] rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs space-y-10">
      
      {/* Header and Clinical Scenario Selection */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200/80 pb-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand">
            <Activity className="w-4 h-4" />
            <span>Interactive Biomechanical Cross-Section</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Under the Skin: Needle Physics & Knot Decompression
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            Plunge the 0.18mm solid surgical needle through skin layers down to the spastic trigger knot. Observe the local twitch response (*fasciculation*) and the biological cascade as the knot unwinds.
          </p>
        </div>

        {/* Clinical Scenario Selector */}
        <div className="flex flex-wrap gap-2">
          {CLINICAL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activePreset.id === preset.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:border-brand'
              }`}
            >
              {preset.name.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Biomechanical Canvas: Cross-Section View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column (8 cols): Tissue Layer Cross-Section Animation */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-inner relative overflow-hidden">
          
          {/* Top Controls Bar */}
          <div className="flex items-center justify-between text-xs pb-4 border-b border-neutral-100 text-neutral-500 font-medium">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Target: <strong>{activePreset.targetPoint}</strong> (Optimal depth: {activePreset.targetDepth} mm)</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleTwirl}
                className="px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-semibold transition-colors flex items-center space-x-1 cursor-pointer"
                title="Twirl needle to stimulate fascia"
              >
                <RotateCcw className={`w-3 h-3 ${isTwirling ? 'animate-spin' : ''}`} />
                <span>Twirl needle</span>
              </button>
              <button
                onClick={handleReset}
                className="text-[11px] text-neutral-500 hover:text-brand transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Graphic Cross-Section Canvas */}
          <div className="relative h-96 w-full mt-4 select-none rounded-xl overflow-hidden border border-neutral-200/60 bg-gradient-to-b from-[#f3e7e0] via-[#f9ded1] to-[#b3403a]">
            
            {/* Layer 1: Stratum Corneum & Epidermis (Top 0 - 15%) */}
            <div className="absolute top-0 left-0 right-0 h-[14%] bg-[#ecd1c4] border-b border-[#ddb5a3] p-2 flex items-center justify-between text-[10px] text-[#865949] font-bold uppercase tracking-wider">
              <span>Epidermis (0.5 mm)</span>
              <span className="text-[9px] font-normal lowercase opacity-80">painless sensory nerve boundary</span>
            </div>

            {/* Layer 2: Dermis & Micro-Vessels (14% - 35%) */}
            <div className="absolute top-[14%] left-0 right-0 h-[22%] bg-[#f7d9cc] border-b border-[#d8aa96] p-2 flex items-center justify-between text-[10px] text-[#935c47] font-bold uppercase tracking-wider">
              <span>Dermis & Capillary Loops (2.5 mm)</span>
              <span className="text-[9px] font-normal lowercase opacity-80">solid needle glides without cutting</span>
            </div>

            {/* Layer 3: Subcutaneous Adipose & Loose Fascia (35% - 60%) */}
            <div className="absolute top-[36%] left-0 right-0 h-[24%] bg-[#fdead3] border-b border-[#e2c19e] p-2 flex items-center justify-between text-[10px] text-[#9a7644] font-bold uppercase tracking-wider">
              <span>Subcutaneous Fascia (6.0 mm)</span>
              <span className="text-[9px] font-normal lowercase opacity-80">collagen matrix & interstitial fluid</span>
            </div>

            {/* Layer 4: Deep Myofascial Layer / Muscle Knot (60% - 100%) */}
            <div className="absolute top-[60%] left-0 right-0 bottom-0 bg-[#bd4540] p-2 flex flex-col justify-between text-[10px] text-[#ffd6d4] font-bold uppercase tracking-wider">
              <div className="flex items-center justify-between">
                <span>Deep Muscle Motor Band (10–16 mm)</span>
                <span className="text-[9px] font-normal lowercase opacity-90">target trigger point zone</span>
              </div>

              {/* The Living Muscle Spasm Knot */}
              <div className="relative flex items-center justify-center my-auto">
                <motion.div 
                  animate={{
                    scale: twitchTriggered ? [1, 1.25, 0.9, 1.1, 1] : isKnotReleased ? 0.75 : 1,
                    backgroundColor: isKnotReleased ? '#99302b' : '#6f1915'
                  }}
                  transition={{ duration: 0.5 }}
                  className={`w-36 h-20 rounded-full border-2 ${
                    isKnotReleased 
                      ? 'border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)]' 
                      : 'border-red-300 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  } flex flex-col items-center justify-center p-2 text-center transition-colors`}
                >
                  <span className="text-[10px] font-bold text-white block">
                    {isKnotReleased ? 'Knot Decompressed' : 'Hyper-Irritable Knot'}
                  </span>
                  <span className="text-[9px] text-white/80 font-normal lowercase">
                    {isKnotReleased ? 'lactic acid flushed' : 'active trigger point'}
                  </span>
                </motion.div>

                {/* Nitric Oxide Vasodilation Flush when released */}
                {isKnotReleased && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 2.2, opacity: [0, 0.6, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
                    className="absolute w-24 h-24 rounded-full bg-emerald-400/20 pointer-events-none filter blur-md"
                  />
                )}
              </div>

              <div className="text-[9px] font-normal lowercase text-right text-white/70">
                Bio-electric meridian pathway
              </div>
            </div>

            {/* THE 0.18mm SURGICAL NEEDLE PLUNGE SHAFT */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-30 flex flex-col items-center transition-all duration-300"
              style={{
                transform: `translateX(-50%) translateY(${(depth / 16) * 220 - 90}px)`
              }}
            >
              {/* Coiled Wire Handle */}
              <div 
                className="w-2 h-20 rounded-t-sm bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 border-x border-amber-400/80 shadow-md flex flex-col justify-between py-1 transition-transform"
                style={{
                  transform: `rotate(${rotationAngle}deg)`
                }}
              >
                <div className="w-full h-0.5 bg-amber-500/50" />
                <div className="w-full h-0.5 bg-amber-500/50" />
                <div className="w-full h-0.5 bg-amber-500/50" />
                <div className="w-full h-0.5 bg-amber-500/50" />
                <div className="w-full h-0.5 bg-amber-500/50" />
              </div>

              {/* Ultra-Fine Surgical Steel Filament (0.18mm) */}
              <div className="w-[1.8px] h-48 bg-gradient-to-r from-neutral-200 via-white to-neutral-300 shadow-sm" />
              
              {/* Microscopic Pine-Needle Rounded Tip */}
              <div className="w-0 h-0 border-x-[1px] border-x-transparent border-t-[3px] border-t-white" />

              {/* Bio-Electric Wave on needle tip when active */}
              {isKnotReleased && (
                <div className="w-3 h-3 rounded-full bg-white/80 animate-ping filter blur-[1px]" />
              )}
            </div>

            {/* Depth Micrometer Scale Overlay (Ruler) */}
            <div className="absolute top-0 right-2 bottom-0 w-8 pointer-events-none flex flex-col justify-between py-2 text-[9px] font-bold text-neutral-500 tabular-nums text-right">
              <span>0mm</span>
              <span>4mm</span>
              <span>8mm</span>
              <span>12mm</span>
              <span>16mm</span>
            </div>

          </div>

          {/* Interactive Depth Slider Controller */}
          <div className="mt-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-neutral-700">Needle Insertion Depth (Manual Control)</span>
              <span className="text-brand font-bold tabular-nums text-sm">{depth.toFixed(1)} mm</span>
            </div>
            <input 
              type="range"
              min="0"
              max="16"
              step="0.1"
              value={depth}
              onChange={(e) => setDepth(parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-medium">
              <span>Surface (0mm)</span>
              <span>Dermis (4mm)</span>
              <span>Trigger Point ({activePreset.targetDepth}mm)</span>
              <span>Deep Fascia (16mm)</span>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Live Biometric Telemetry & De-Qi Log */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Real-Time Bio-Metrics Dashboard */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block border-b border-neutral-100 pb-2">
              Live Neuro-Biological Feedback
            </span>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-neutral-500 block">Dermal Penetration Force</span>
                <span className="font-display font-bold text-ink text-base tabular-nums">{entryResistance}</span>
              </div>

              <div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Myofascial Spasm Level</span>
                  <span className={`font-bold ${isKnotReleased ? 'text-emerald-700' : 'text-red-700'}`}>{muscleTensionPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden mt-1">
                  <div 
                    className={`h-full transition-all duration-300 ${isKnotReleased ? 'bg-emerald-500' : 'bg-red-500'}`} 
                    style={{ width: `${muscleTensionPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Micro-Vascular Blood Flow</span>
                  <span className="font-bold text-brand tabular-nums">+{vasodilationPct}% Perfusion</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-brand transition-all duration-300" 
                    style={{ width: `${Math.min(100, (vasodilationPct / 340) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block">Autonomic Vagus State</span>
                <span className="font-semibold text-neutral-800 text-[11px] block mt-0.5">{vagusTone}</span>
              </div>
            </div>
          </div>

          {/* Clinical Case Description Card */}
          <div className="p-6 rounded-2xl bg-[#fdfcfa] border border-neutral-200/90 space-y-3">
            <h4 className="font-display text-base font-bold text-ink">
              {activePreset.name}
            </h4>
            
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              <strong className="text-ink">Pathophysiology: </strong>
              {activePreset.triggerDescription}
            </p>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950/90 leading-relaxed">
              <strong className="block text-amber-900 font-semibold mb-0.5">The De-Qi Sensation:</strong>
              {activePreset.deQiDescription}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking(`Consultation (${activePreset.name})`, 600)}
                className="w-full py-3 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark transition-colors flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <span>Book Root Consultation (₹600)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
