import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const PULSE_PATTERNS = [
  {
    id: 'wiry',
    name: 'Wiry / String-Taut (弦脉 - Xian Mai)',
    frequency: '78 bpm',
    tension: 'Taut like a tuned violin string',
    associated: 'Chronic Migraine, Tension Headaches, Cervical Spasm, Executive Stress',
    organ: 'Liver Meridian & Autonomic Sympathetic Overdrive',
    clinicalSignificance: 'The arterial wall is stiffened by elevated sympathetic nervous tone. Dr. Nivedha uses LR3 (Taichong) and GB20 to relax the vascular tone.',
    waveParams: { speed: 3.5, amplitude: 38, sharpness: 4.5, noise: 0.1 }
  },
  {
    id: 'slippery',
    name: 'Slippery / Rolling (滑脉 - Hua Mai)',
    frequency: '84 bpm',
    tension: 'Like pearls sliding in a porcelain basin',
    associated: 'Acid Reflux (GERD), IBS Bloating, Food Stagnation, Phlegm',
    organ: 'Spleen & Stomach Digestive Axis',
    clinicalSignificance: 'High fluid volume and sluggish lymphatic clearance. Dr. Nivedha applies ST36 and CV12 to drain gastrointestinal dampness.',
    waveParams: { speed: 4.2, amplitude: 42, sharpness: 1.5, noise: 0.05 }
  },
  {
    id: 'thready',
    name: 'Thready / Deficient (细脉 - Xi Mai)',
    frequency: '62 bpm',
    tension: 'Faint and fine like a silken thread',
    associated: 'Severe Insomnia, Post-Viral Fatigue, Exhaustion, Chronic Blood Deficiency',
    organ: 'Heart & Kidney Essence Depletion',
    clinicalSignificance: 'The pulse feels thin and easily obliterated under moderate pressure. Dr. Nivedha prescribes HT7, SP6, and thermal moxa to tonify vital Qi.',
    waveParams: { speed: 2.8, amplitude: 18, sharpness: 2.0, noise: 0.02 }
  },
  {
    id: 'balanced',
    name: 'Harmonious / Balanced (平脉 - Ping Mai)',
    frequency: '72 bpm',
    tension: 'Unhurried, rhythmic, gentle wave with clear rebound',
    associated: 'Post-Acupuncture Restorative Equilibrium',
    organ: 'Autonomic Vagal Parasympathetic Balance',
    clinicalSignificance: 'The clinical target after every session at Arura. The nervous system transitions from fight-or-flight into restorative tissue repair.',
    waveParams: { speed: 3.2, amplitude: 32, sharpness: 2.2, noise: 0.0 }
  }
];

export default function RadialPulseDiagnosticSimulator({ onOpenBooking }) {
  const [selectedPattern, setSelectedPattern] = useState(PULSE_PATTERNS[0]);
  const [selectedFinger, setSelectedFinger] = useState('guan'); // 'cun', 'guan', 'chi'
  const [palpationDepth, setPalpationDepth] = useState('middle'); // 'superficial', 'middle', 'deep'
  const canvasRef = useRef(null);

  // Live Arterial Pulse Waveform Animation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let t = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Dark acoustic ECG canvas
      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, width, height);

      // Fine Medical Grid Lines
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Arterial Pulse Waveform
      const { speed, amplitude, sharpness } = selectedPattern.waveParams;
      const depthMultiplier = palpationDepth === 'superficial' ? 0.7 : palpationDepth === 'deep' ? 1.25 : 1.0;

      ctx.beginPath();
      ctx.strokeStyle = selectedPattern.id === 'balanced' ? '#10b981' : '#e02868';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = selectedPattern.id === 'balanced' ? '#10b981' : '#e02868';
      ctx.shadowBlur = 8;

      for (let x = 0; x < width; x++) {
        // Multi-harmonic arterial pressure wave formula:
        // Percussion wave + Dicrotic wave + Dicrotic notch
        const waveX = (x + t * speed) * 0.035;
        const cycle = waveX % (Math.PI * 2);

        let yOffset = 0;
        if (cycle < 0.6) {
          // Sharp systolic percussion peak
          yOffset = -Math.sin(cycle * (Math.PI / 0.6)) * amplitude * sharpness * 0.6 * depthMultiplier;
        } else if (cycle < 1.4) {
          // Dicrotic notch and secondary tidal wave
          yOffset = -Math.sin((cycle - 0.6) * (Math.PI / 0.8)) * (amplitude * 0.4) * depthMultiplier;
        } else {
          // Diastolic decay
          yOffset = Math.sin((cycle - 1.4) * (Math.PI / (Math.PI * 2 - 1.4))) * 4;
        }

        const y = centerY + yOffset;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Traveling Lead Sensor Node
      const currentX = (width * 0.6);
      ctx.beginPath();
      ctx.arc(currentX, centerY - (amplitude * 0.8 * depthMultiplier), 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      t += 1;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [selectedPattern, palpationDepth]);

  return (
    <div className="bg-[#fbfbfa] rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs space-y-10">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200/80 pb-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand">
            <Heart className="w-4 h-4 text-brand animate-pulse" />
            <span>Classical 14-Channel Pulse Diagnostic Lab</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Dr. Nivedha’s Arterial Pulse Palpation
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            Before any needle touches your skin, Dr. Nivedha palpates the radial artery at 3 finger positions across 3 depths. Experience how internal stress, migraines, and fatigue physically manifest in arterial wave dynamics.
          </p>
        </div>

        {/* Pulse Condition Presets */}
        <div className="flex flex-wrap gap-2">
          {PULSE_PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPattern(p)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedPattern.id === p.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:border-brand'
              }`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Real-Time Arterial Waveform Monitor */}
        <div className="lg:col-span-8 bg-neutral-950 rounded-2xl border border-neutral-800 p-6 shadow-2xl space-y-5">
          
          {/* Monitor Status Top Bar */}
          <div className="flex flex-wrap items-center justify-between text-xs text-white/70 border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-white font-display text-sm tracking-wide">
                Radial Artery Telemetry: {selectedPattern.frequency}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-[11px] text-white/60">
              <span>Palpation Depth: <strong className="text-white capitalize">{palpationDepth}</strong></span>
              <span>Position: <strong className="text-white uppercase">{selectedFinger}</strong></span>
            </div>
          </div>

          {/* Animated Canvas */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black">
            <canvas 
              ref={canvasRef} 
              width={720} 
              height={260} 
              className="w-full h-56 sm:h-64 object-cover"
            />

            <div className="absolute bottom-2 left-4 text-[10px] text-white/40 tracking-wider font-mono">
              HARMONIC SPECTRUM: 1.2 Hz · RADIAL STYLOID TRANSDUCER
            </div>
          </div>

          {/* Palpation Controls: 3 Fingers & 3 Depths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* 3 Finger Anatomical Positions */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
                Palpating Finger Position:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cun', name: 'Cun (寸)', organ: 'Heart / Lung' },
                  { id: 'guan', name: 'Guan (关)', organ: 'Liver / Spleen' },
                  { id: 'chi', name: 'Chi (尺)', organ: 'Kidney Yin/Yang' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinger(f.id)}
                    className={`p-2 rounded-lg text-xs font-semibold text-center transition-colors cursor-pointer ${
                      selectedFinger === f.id
                        ? 'bg-brand text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span className="block">{f.name}</span>
                    <span className="text-[9px] font-normal opacity-70 block">{f.organ}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Clinical Pressure Depths */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
                Palpation Pressure Depth:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'superficial', name: 'Superficial', note: 'Qi / Skin' },
                  { id: 'middle', name: 'Middle', note: 'Blood / Vessel' },
                  { id: 'deep', name: 'Deep', note: 'Essence / Bone' }
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setPalpationDepth(d.id)}
                    className={`p-2 rounded-lg text-xs font-semibold text-center transition-colors cursor-pointer ${
                      palpationDepth === d.id
                        ? 'bg-brand text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span className="block">{d.name}</span>
                    <span className="text-[9px] font-normal opacity-70 block">{d.note}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (4 cols): Dr. Nivedha's Pulse Interpretation */}
        <div className="lg:col-span-4 space-y-5">
          
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4">
            <div className="border-b border-neutral-100 pb-3">
              <span className="text-xs text-brand font-semibold block">Diagnostic Finding</span>
              <h4 className="font-display text-xl font-bold text-ink mt-0.5">
                {selectedPattern.name}
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-neutral-500 font-bold block uppercase tracking-wider">
                  Arterial Sensation
                </span>
                <p className="text-sm text-neutral-800 font-normal leading-relaxed mt-0.5">
                  {selectedPattern.tension}
                </p>
              </div>

              <div>
                <span className="text-neutral-500 font-bold block uppercase tracking-wider">
                  Associated Manifestations
                </span>
                <p className="text-sm text-neutral-800 font-normal leading-relaxed mt-0.5">
                  {selectedPattern.associated}
                </p>
              </div>

              <div>
                <span className="text-neutral-500 font-bold block uppercase tracking-wider">
                  Imbalanced Meridian Axis
                </span>
                <p className="text-sm text-neutral-800 font-normal leading-relaxed mt-0.5">
                  {selectedPattern.organ}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950/90 leading-relaxed">
              <strong className="block text-amber-900 font-semibold mb-0.5">Dr. Nivedha's Clinical Directive:</strong>
              {selectedPattern.clinicalSignificance}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking(`14-Pulse Consultation (${selectedPattern.name})`, 600)}
                className="w-full py-3.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-brand transition-colors flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <span>Book Pulse Diagnostic Session (₹600)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
