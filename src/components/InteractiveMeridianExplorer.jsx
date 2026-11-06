import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Activity, 
  ArrowUpRight,
  Stethoscope,
  Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetUrl } from '../utils/assetUrl';

// 6 Signature 14-Meridian Clinical Pathways with Dedicated Images and Visual Specs
const PATHWAYS = [
  {
    id: '01',
    code: 'PATHWAY 01',
    category: 'Cranial & Vagal',
    title: 'Cranial & Facial Nervous System',
    subtitle: 'Chronic Migraines, Cluster Headaches & Insomnia',
    relief: '3–4 Sessions to Long-Term Relief',
    image: getAssetUrl('hero_acupuncture_sanctuary.jpg'),
    description: 'Directly downregulates the hyperactive trigeminovascular sensory loop, decreasing neurogenic CGRP release and stopping cranial arterial spasm at the root.',
    spec: '0.18mm hair-thin calming needles · Shallow sensory de-afferentation',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'GV-20', name: 'Baihui', role: 'Intracranial pressure regulation & Shen calm' },
      { code: 'GB-20', name: 'Fengchi', role: 'Suboccipital arterial release for migraine arrest' },
      { code: 'Taiyang', name: 'Extra Point', role: 'Immediate temporal muscle clench decompression' },
      { code: 'Yintang', name: 'Third Eye', role: 'Vagal parasympathetic trigger for deep REM sleep' }
    ],
    milestones: [
      'Session 1–2: Acute reduction in headache frequency & neck stiffness',
      'Session 3–4: Restoration of restful sleep & sustained symptom cessation'
    ]
  },
  {
    id: '02',
    code: 'PATHWAY 02',
    category: 'Spine & Nerves',
    title: 'Cervical Spine, Neck & Trapezius',
    subtitle: 'Cervical Spondylosis, Tech Neck & Arm Numbness',
    relief: 'Mobility Restored in 3–5 Sessions',
    image: getAssetUrl('acupuncture_session.jpg'),
    description: 'Decompresses pinched C5–C7 cervical nerve roots, discharges deep myofascial trigger nodes in the trapezius, and relieves radiating arm tingling without surgery.',
    spec: 'Trapezius myofascial release paired with localized TDP mineral infrared warmth',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'GB-21', name: 'Jianjing', role: 'Master release of chronic upper trapezius knotting' },
      { code: 'GV-14', name: 'Dazhui', role: 'Cervico-thoracic junction nerve de-entrapment' },
      { code: 'BL-10', name: 'Tianzhu', role: 'Suboccipital nerve exit decompression' },
      { code: 'SI-11', name: 'Tianzong', role: 'Scapular glide & frozen shoulder rotation' }
    ],
    milestones: [
      'Session 1–2: Discharge of deep trapezius knots & numbness cessation',
      'Session 3–5: Full painless cervical rotation & posture stabilization'
    ]
  },
  {
    id: '03',
    code: 'PATHWAY 03',
    category: 'Cranial & Vagal',
    title: 'Thoracic, Heart & Autonomic Vagal Calm',
    subtitle: 'Panic Episodes, Somatic Chest Tightness & Burnout',
    relief: 'Immediate Parasympathetic Shift',
    image: getAssetUrl('zen_treatment.jpg'),
    description: 'Stimulates the afferent vagus nerve (CN X) to trigger central acetylcholine release, shifting heart rate variability (HRV) from chronic fight-or-flight into restorative calm.',
    spec: 'Gentle non-invasive sternal & median nerve acupuncture paired with integrative psychotherapy',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'PC-6', name: 'Neiguan', role: 'Vagus nerve cardiac soothing & anti-panic trigger' },
      { code: 'HT-7', name: 'Shenmen', role: 'Downregulates cortisol hyper-arousal & racing thoughts' },
      { code: 'CV-17', name: 'Danzhong', role: 'Decompresses diaphragm & expands respiratory ease' }
    ],
    milestones: [
      'Session 1: Instant drop in resting heart rate and somatic chest easing',
      'Session 2–4: Long-term autonomic resilience against chronic panic spikes'
    ]
  },
  {
    id: '04',
    code: 'PATHWAY 04',
    category: 'Internal Health',
    title: 'Gastrointestinal & Epigastric Health',
    subtitle: 'Acid Reflux (GERD), IBS & Chronic Bloating',
    relief: 'Digestive Rhythm in 4–6 Sessions',
    image: getAssetUrl('clinic_interior.jpg'),
    description: 'Harmonizes the gut-brain axis through the dorsal vagal complex, balancing gastric acid secretions, improving mucosal perfusion, and normalizing smooth bowel motility.',
    spec: 'Enteric nervous system harmonization paired with gentle micro-thermal moxibustion',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'ST-36', name: 'Zusanli', role: 'Master gastrointestinal motility & mucosal immunity' },
      { code: 'CV-12', name: 'Zhongwan', role: 'Balances gastric acid & relaxes pyloric sphincter' },
      { code: 'ST-25', name: 'Tianshu', role: 'Normalizes colon peristalsis for irritable bowel relief' }
    ],
    milestones: [
      'Session 1–3: Elimination of post-meal acid flare-ups & epigastric burning',
      'Session 4–6: Regular, pain-free bowel transit and gut barrier recovery'
    ]
  },
  {
    id: '05',
    code: 'PATHWAY 05',
    category: 'Internal Health',
    title: 'Pelvic, Reproductive & Hormonal Axis',
    subtitle: 'PCOS/PCOD Symptoms & Debilitating Period Pain',
    relief: 'Hormonal Stabilization across 2 Cycles',
    image: getAssetUrl('wellness_holistic.jpg'),
    description: 'Modulates the hypothalamic-pituitary-ovarian (HPO) axis while enhancing micro-pelvic perfusion to relieve dysmenorrhea cramps and restore predictable menstrual rhythms.',
    spec: 'Hypogastric neuro-vascular needling with targeted restorative thermal warmth',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'SP-6', name: 'Sanyinjiao', role: 'Master crossing of Spleen, Liver & Kidney meridians' },
      { code: 'CV-4', name: 'Guanyuan', role: 'Increases ovarian arterial flow & uterine tone' },
      { code: 'Zigong', name: 'Extra Point', role: 'Direct relief of pelvic floor spasms and cramping' }
    ],
    milestones: [
      'Month 1: 50–70% drop in acute period pain and NSAID dependence',
      'Month 2–3: Predictable ovulatory timing and regulated cycle flow'
    ]
  },
  {
    id: '06',
    code: 'PATHWAY 06',
    category: 'Spine & Nerves',
    title: 'Lumbar Spine, Sciatic Nerve & Lower Limbs',
    subtitle: 'Sciatica, L4–S1 Nerve Pain & Disc Bulge Stiffness',
    relief: 'Deep Decompression in 4–6 Sessions',
    image: getAssetUrl('acu_treatment1.jpg'),
    description: 'Releases chronic spasm in the piriformis and paraspinal muscles, un-clamping the sciatic nerve sheath and restoring pain-free standing, walking, and spinal flexion.',
    spec: 'Precision deep-fascial needle guidance & non-convulsive micro-current wave therapy',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'GB-30', name: 'Huantiao', role: 'Un-pinches sciatic nerve at the piriformis notch' },
      { code: 'BL-23', name: 'Shenshu', role: 'Relaxes deep lumbar stabilizer muscle bands' },
      { code: 'BL-40', name: 'Weizhong', role: 'Distal master release for entire posterior leg chain' }
    ],
    milestones: [
      'Session 1–2: Interruption of radiating burning shock down the leg',
      'Session 3–6: Pain-free sitting, bending, and unassisted walking'
    ]
  }
];

export default function InteractiveMeridianExplorer({ onOpenBooking }) {
  const [activePathway, setActivePathway] = useState(PATHWAYS[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div id="meridian-explorer" className="w-full bg-white text-neutral-900 py-6">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-xs font-semibold text-[#ed3373] tracking-wider uppercase font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#ed3373]" />
          <span>CLINICAL 14-MERIDIAN DIRECTORY</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          Anatomical Treatment Ledger
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto">
          Explore our six dedicated clinical pathways targeting chronic neuro-myofascial pain, migraine syndromes, and autonomic burnout at the root.
        </p>
      </div>

      {/* Main 21st.dev Feature Showcase Stage */}
      <div 
        onMouseMove={handleMouseMove}
        className="relative max-w-6xl mx-auto rounded-3xl border border-neutral-200/90 bg-white overflow-hidden shadow-[0_12px_40px_-8px_rgba(0,0,0,0.06)]"
      >
        {/* Subtle Ambient Mouse Spotlight following pointer (21st.dev effect) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(237, 51, 115, 0.08), transparent 80%)`
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activePathway.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            {/* Left Column: Clear Clinical Story & Acupoint Targets */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 relative z-10">
              
              <div className="space-y-6">
                
                {/* Top Pathway Eyebrow + Relief Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold text-[#ed3373] bg-pink-50 px-3 py-1 rounded-full border border-pink-200/70">
                    {activePathway.code} • {activePathway.category}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 bg-neutral-100 px-3.5 py-1 rounded-full font-mono border border-neutral-200/60">
                    <Clock className="w-3.5 h-3.5 text-[#ed3373]" />
                    <span>{activePathway.relief}</span>
                  </span>
                </div>

                {/* Main Condition Headline */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                    {activePathway.title}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-[#ed3373] mt-1 font-display">
                    {activePathway.subtitle}
                  </p>
                </div>

                {/* Plain-English Medical Explanation */}
                <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                  {activePathway.description}
                </p>

                {/* Primary Acupoint Focus Chips */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-neutral-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#ed3373]" />
                    <span>Primary Acupoint Targets:</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePathway.acupoints.map((pt, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 hover:border-pink-200 hover:bg-pink-50/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#ed3373] text-xs">{pt.code}</span>
                          <span className="text-[11px] font-semibold text-neutral-800">{pt.name}</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1 leading-snug">{pt.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expected Healing Milestones */}
                <div className="space-y-2 pt-1 border-t border-neutral-100">
                  <span className="text-xs font-bold text-neutral-400 font-mono tracking-wider uppercase">
                    Recovery Trajectory:
                  </span>
                  <div className="space-y-1.5">
                    {activePathway.milestones.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2.5 text-xs text-neutral-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Tariff & Action Bar */}
              <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-bold text-neutral-900 block font-mono">
                    {activePathway.fee}
                  </span>
                  <span className="text-xs text-neutral-400 block">
                    {activePathway.duration} • 1-on-1 with Dr. Nivedha, MD (Acu)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenBooking) {
                      onOpenBooking(`Consultation: ${activePathway.title}`, 600);
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#ed3373] text-white hover:bg-[#d92662] transition-all duration-200 shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                >
                  <span>Book Consultation for this Pathway</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Column: 21st.dev Visual Experience (Full-Bleed Photography + Glassmorphic Badges) */}
            <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full overflow-hidden bg-neutral-900">
              <motion.div
                key={activePathway.image}
                initial={{ scale: 1.05, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${activePathway.image})` }}
              >
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </motion.div>

              {/* Bio-Electric Wave Overlay Graphic */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>14-Meridian Resonance</span>
              </div>

              {/* Floating Clinical Credential Pill at Bottom */}
              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-pink-100 shadow-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 font-display flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-[#ed3373]" />
                      <span>Dr. Nivedha Priyadharshini, MD (Acu)</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                      Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-snug">
                    {activePathway.spec}
                  </p>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom 6-Pathway Quick-Browse Strip (Hairline UI Card Thumbnails) */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-3 px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ed3373] animate-pulse" />
            <span>Select Clinical Pathway:</span>
          </span>
          <span className="text-[#ed3373] font-semibold">{activePathway.code} Active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {PATHWAYS.map((p) => {
          const isSelected = activePathway.id === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePathway(p)}
              className={`text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-pink-50/60 border-[#ed3373] shadow-sm ring-1 ring-[#ed3373]/30 scale-[1.02]'
                  : 'bg-white border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50/70'
              }`}
            >
              <span className="font-mono text-[10px] font-bold text-[#ed3373] block">
                {p.id}
              </span>
              <p className="font-display text-xs font-bold text-neutral-900 mt-1 line-clamp-1">
                {p.title.split('&')[0].trim()}
              </p>
              <p className="text-[10px] text-neutral-500 mt-0.5 line-clamp-1 font-mono">
                {p.relief}
              </p>
            </button>
          );
        })}
        </div>
      </div>

    </div>
  );
}
