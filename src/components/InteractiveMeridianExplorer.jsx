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

// 6 Signature 14-Meridian Clinical Pathways with Dedicated Images, SEO Search Terms, and Plain-English + Technical Breakdown
const PATHWAYS = [
  {
    id: '01',
    code: 'PATHWAY 01',
    category: 'Cranial & Vagal',
    shortLabel: 'Headaches & Migraines',
    commonTitle: 'Frequent Headaches, Chronic Migraines & Neck Stiffness',
    subtitle: 'Throbbing Temple Pressure, Cluster Headaches & Sleep Disruption',
    relief: 'Noticeable Relief in 1–2 Sessions',
    image: getAssetUrl('hero_acupuncture_sanctuary.jpg'),
    commonSummary: 'Rapidly reduces headache frequency, relieves throbbing temple pressure behind the eyes, and eases neck stiffness for deep, restful sleep.',
    searchKeywords: [
      'Headache Frequency',
      'Migraine Relief',
      'Neck Stiffness',
      'Restful Sleep',
      'Temple Pressure'
    ],
    technicalMechanism: 'Directly downregulates the hyperactive trigeminovascular sensory loop, decreasing neurogenic CGRP release and stopping cranial arterial spasm at the root.',
    spec: '0.18mm hair-thin calming needles · Shallow sensory de-afferentation',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'GV-20', name: 'Baihui', role: 'Calms intracranial cranial tension & nervous Shen' },
      { code: 'GB-20', name: 'Fengchi', role: 'Suboccipital arterial release to stop headache onset' },
      { code: 'Taiyang', name: 'Extra Point', role: 'Decompresses temple muscle clench and eye strain' },
      { code: 'Yintang', name: 'Third Eye', role: 'Vagal parasympathetic trigger for deep restful sleep' }
    ],
    milestones: [
      {
        phase: 'Session 1–2',
        commonOutcome: 'Acute reduction in headache frequency & neck stiffness',
        technicalDetail: 'De-sensitizes cranial peripheral afferents & relieves suboccipital arterial spasm'
      },
      {
        phase: 'Session 3–4',
        commonOutcome: 'Restoration of restful sleep & sustained symptom cessation',
        technicalDetail: 'Stabilizes central autonomic regulation & interrupts chronic pain loops'
      }
    ]
  },
  {
    id: '02',
    code: 'PATHWAY 02',
    category: 'Spine & Nerves',
    shortLabel: 'Neck & Shoulders',
    commonTitle: 'Neck Pain, Stiff Shoulders & Radiating Arm Tingling',
    subtitle: 'Cervical Spondylosis, Tech Neck & Trapezius Muscle Knots',
    relief: 'Mobility Restored in 3–5 Sessions',
    image: getAssetUrl('acupuncture_session.jpg'),
    commonSummary: 'Delivers lasting neck pain relief and loosens stiff shoulders, melting trapezius knots and arm numbness caused by tech neck.',
    searchKeywords: [
      'Neck Pain Relief',
      'Stiff Shoulder',
      'Tech Neck',
      'Trapezius Knots',
      'Arm Numbness'
    ],
    technicalMechanism: 'Decompresses pinched C5–C7 cervical nerve roots, discharges deep myofascial trigger nodes in the trapezius, and relieves radiating arm tingling without surgical intervention.',
    spec: 'Trapezius myofascial release paired with localized TDP mineral infrared warmth',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'GB-21', name: 'Jianjing', role: 'Master release of chronic upper trapezius knotting' },
      { code: 'GV-14', name: 'Dazhui', role: 'Cervico-thoracic junction nerve de-entrapment' },
      { code: 'BL-10', name: 'Tianzhu', role: 'Suboccipital nerve exit decompression for neck ease' },
      { code: 'SI-11', name: 'Tianzong', role: 'Scapular glide & frozen shoulder rotation recovery' }
    ],
    milestones: [
      {
        phase: 'Session 1–2',
        commonOutcome: 'Discharge of deep trapezius knots & relief from arm numbness',
        technicalDetail: 'Inactivates focal motor-endplate myofascial trigger contractures'
      },
      {
        phase: 'Session 3–5',
        commonOutcome: 'Full painless cervical head rotation & long-term posture stability',
        technicalDetail: 'Restores cervical facet joint kinematics and neuromuscular biomechanics'
      }
    ]
  },
  {
    id: '03',
    code: 'PATHWAY 03',
    category: 'Cranial & Vagal',
    shortLabel: 'Anxiety & Stress',
    commonTitle: 'Anxiety, Chronic Stress & Somatic Chest Tightness',
    subtitle: 'Racing Thoughts, Panic Surges & Executive Work Burnout',
    relief: 'Immediate Parasympathetic Calm',
    image: getAssetUrl('zen_treatment.jpg'),
    commonSummary: 'Provides holistic anxiety relief for stress burnout, soothing chest tightness and panic surges through deep vagus nerve calm.',
    searchKeywords: [
      'Anxiety Relief',
      'Stress Burnout',
      'Chest Tightness',
      'Vagus Nerve Calm',
      'Panic Relief'
    ],
    technicalMechanism: 'Stimulates the afferent vagus nerve (CN X) to trigger central acetylcholine release, shifting heart rate variability (HRV) from chronic sympathetic fight-or-flight into parasympathetic calm.',
    spec: 'Gentle non-invasive sternal & median nerve acupuncture paired with integrative psychotherapy',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'PC-6', name: 'Neiguan', role: 'Vagus nerve cardiac soothing & anti-panic stabilization' },
      { code: 'HT-7', name: 'Shenmen', role: 'Downregulates cortisol hyper-arousal & emotional overwhelm' },
      { code: 'CV-17', name: 'Danzhong', role: 'Decompresses diaphragm & expands deep respiratory ease' }
    ],
    milestones: [
      {
        phase: 'Session 1',
        commonOutcome: 'Instant easing of chest tightness, slower pulse & mental calm',
        technicalDetail: 'Central parasympathetic activation via vagal cardiac branch stimulation'
      },
      {
        phase: 'Session 2–4',
        commonOutcome: 'Long-term autonomic resilience against chronic panic spikes',
        technicalDetail: 'Down-regulates hypothalamic-pituitary-adrenal (HPA) axis overdrive'
      }
    ]
  },
  {
    id: '04',
    code: 'PATHWAY 04',
    category: 'Internal Health',
    shortLabel: 'Acidity & Digestion',
    commonTitle: 'Acid Reflux, Epigastric Burning & Abdominal Bloating',
    subtitle: 'GERD, Irritable Bowel (IBS) & Sluggish Gut Motility',
    relief: 'Digestive Rhythm in 3–5 Sessions',
    image: getAssetUrl('clinic_interior.jpg'),
    commonSummary: 'Effective acid reflux relief and IBS treatment that reduces stomach bloating, eases GERD symptoms, and restores gut health.',
    searchKeywords: [
      'Acid Reflux Relief',
      'Stomach Bloating',
      'IBS Treatment',
      'GERD Symptoms',
      'Gut Health'
    ],
    technicalMechanism: 'Harmonizes the gut-brain axis through the dorsal vagal complex, balancing gastric acid secretions, improving mucosal perfusion, and normalizing smooth bowel motility.',
    spec: 'Enteric nervous system harmonization paired with gentle micro-thermal moxibustion',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'ST-36', name: 'Zusanli', role: 'Master gastrointestinal motility & gut mucosal barrier' },
      { code: 'CV-12', name: 'Zhongwan', role: 'Balances gastric acid & relaxes pyloric sphincter spasms' },
      { code: 'ST-25', name: 'Tianshu', role: 'Normalizes colon peristalsis for irritable bowel relief' }
    ],
    milestones: [
      {
        phase: 'Session 1–3',
        commonOutcome: 'Elimination of post-meal acid flare-ups & stomach bloating',
        technicalDetail: 'Normalizes lower esophageal sphincter tone & gastric emptying rate'
      },
      {
        phase: 'Session 4–6',
        commonOutcome: 'Regular, pain-free bowel transit and lasting gut comfort',
        technicalDetail: 'Modulates enteric neuropeptides and reduces visceral hypersensitivity'
      }
    ]
  },
  {
    id: '05',
    code: 'PATHWAY 05',
    category: 'Internal Health',
    shortLabel: 'Period Pain & PCOS',
    commonTitle: 'Severe Period Pain, Menstrual Cramps & PCOS Support',
    subtitle: 'Dysmenorrhea Spasms, Cycle Irregularity & Pelvic Fullness',
    relief: 'Cycle Stabilization across 2 Cycles',
    image: getAssetUrl('wellness_holistic.jpg'),
    commonSummary: 'Natural period pain relief that calms severe menstrual cramps, soothes pelvic pain, and balances hormones to relieve PCOS symptoms.',
    searchKeywords: [
      'Period Pain Relief',
      'Menstrual Cramps',
      'PCOS Symptoms',
      'Hormone Balance',
      'Pelvic Pain'
    ],
    technicalMechanism: 'Modulates the hypothalamic-pituitary-ovarian (HPO) axis while enhancing micro-pelvic perfusion to relieve dysmenorrhea spasms and restore predictable menstrual rhythms.',
    spec: 'Hypogastric neuro-vascular needling with targeted restorative thermal warmth',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'SP-6', name: 'Sanyinjiao', role: 'Master crossing of Spleen, Liver & Kidney meridians' },
      { code: 'CV-4', name: 'Guanyuan', role: 'Enhances micro-pelvic arterial perfusion & uterine tone' },
      { code: 'Zigong', name: 'Extra Point', role: 'Direct alleviation of pelvic floor contracture and cramping' }
    ],
    milestones: [
      {
        phase: 'Month 1',
        commonOutcome: '50–70% drop in acute period cramps & zero emergency painkillers',
        technicalDetail: 'Downregulates pro-inflammatory uterine prostaglandins (PGF2a)'
      },
      {
        phase: 'Month 2–3',
        commonOutcome: 'Predictable menstrual cycle flow, balanced mood & pain-free periods',
        technicalDetail: 'Re-synchronizes pulsatile GnRH and follicular endocrine signaling'
      }
    ]
  },
  {
    id: '06',
    code: 'PATHWAY 06',
    category: 'Spine & Nerves',
    shortLabel: 'Sciatica & Back Pain',
    commonTitle: 'Sciatica Nerve Pain, Lower Back Stiffness & Disc Bulges',
    subtitle: 'L4–S1 Nerve Compression, Buttock Spasms & Leg Numbness',
    relief: 'Deep Decompression in 4–6 Sessions',
    image: getAssetUrl('acu_treatment1.jpg'),
    commonSummary: 'Relieves lower back pain and sciatica nerve pain, un-clamping shooting leg pain and disc bulges to restore spine mobility.',
    searchKeywords: [
      'Sciatica Nerve Pain',
      'Lower Back Pain',
      'Shooting Leg Pain',
      'Disc Bulge Relief',
      'Spine Mobility'
    ],
    technicalMechanism: 'Releases chronic spasm in the piriformis and paraspinal muscles, un-clamping the sciatic nerve sheath and restoring pain-free spinal flexion and gait mechanics.',
    spec: 'Precision deep-fascial needle guidance & non-convulsive micro-current wave therapy',
    duration: '45–60 Mins',
    fee: '₹600 / Session',
    acupoints: [
      { code: 'GB-30', name: 'Huantiao', role: 'Un-pinches sciatic nerve at the piriformis notch' },
      { code: 'BL-23', name: 'Shenshu', role: 'Relaxes deep lumbar stabilizer muscles and disc tension' },
      { code: 'BL-40', name: 'Weizhong', role: 'Distal master release for entire posterior leg pain chain' }
    ],
    milestones: [
      {
        phase: 'Session 1–2',
        commonOutcome: 'Interruption of sharp shooting pain and burning down the leg',
        technicalDetail: 'Reduces perineural edema around the compressed S1 nerve root'
      },
      {
        phase: 'Session 3–6',
        commonOutcome: 'Pain-free sitting, bending, walking, and full lumbar flexibility',
        technicalDetail: 'Eliminates chronic piriformis contracture and spinal shear stress'
      }
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
          Explore our six dedicated clinical pathways targeting chronic pain, migraine syndromes, and autonomic burnout at the root.
        </p>
      </div>

      {/* Main 21st.dev Feature Showcase Stage */}
      <div 
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-[1400px] mx-auto rounded-3xl border border-neutral-200/90 bg-white overflow-hidden shadow-[0_12px_40px_-8px_rgba(0,0,0,0.06)]"
      >
        {/* Subtle Ambient Mouse Spotlight following pointer (21st.dev effect) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(237, 51, 115, 0.08), transparent 80%)`
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Clear Clinical Story & Acupoint Targets */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 relative z-10">
            
            <div className="space-y-6">
              
              {/* Top Pathway Eyebrow + Relief Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-sm font-bold text-[#ed3373] bg-pink-50 px-3.5 py-1.5 rounded-full border border-pink-200/70">
                  {activePathway.code} • {activePathway.category}
                </span>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 bg-neutral-100 px-4 py-1.5 rounded-full font-mono border border-neutral-200/60">
                  <Clock className="w-4 h-4 text-[#ed3373]" />
                  <span>{activePathway.relief}</span>
                </span>
              </div>

              {/* 1. Main Condition Headline — BIG, PROMINENT COMMON WORDS */}
              <div className="space-y-1.5">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold text-neutral-900 tracking-tight leading-snug">
                  {activePathway.commonTitle}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#ed3373]">
                  Common Indications: {activePathway.subtitle}
                </p>
              </div>

              {/* 2. Plain-English Patient Summary — BIGGER, RELATABLE FONT */}
              <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-normal">
                {activePathway.commonSummary}
              </p>

              {/* 3. General Condition Hashtags */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {activePathway.searchKeywords.map((tag, tIdx) => (
                  <span 
                    key={tIdx}
                    className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-pink-50 text-[#ed3373] border border-pink-200/60 hover:bg-pink-100/60 transition-colors"
                  >
                    #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>

              {/* 4 & 5. Responsive 2-Column Clinical Subgrid (Length-Wise Layout) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Mechanism Box */}
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-800 uppercase tracking-wider mb-2">
                      <Activity className="w-4 h-4 text-[#ed3373] shrink-0" />
                      <span>Clinical Mechanism:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {activePathway.technicalMechanism}
                    </p>
                  </div>
                  <div className="text-xs text-neutral-500 pt-2 border-t border-neutral-200/60">
                    ↳ Spec: {activePathway.spec}
                  </div>
                </div>

                {/* Recovery Trajectory */}
                <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-200/60 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#ed3373] tracking-wider uppercase block mb-2">
                      RECOVERY TRAJECTORY:
                    </span>
                    <div className="space-y-2.5">
                      {activePathway.milestones.map((m, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div className="leading-snug">
                            <span className="font-bold text-neutral-900">{m.phase}: </span>
                            <span className="font-medium text-neutral-800">{m.commonOutcome}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-600 pt-2 border-t border-pink-200/50">
                    Private acoustic suite in Virugambakkam
                  </div>
                </div>
              </div>

              {/* 6. Primary Bio-Active Acupoints (4 Horizontal Columns) */}
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-bold text-neutral-500 tracking-wider uppercase flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#ed3373]" />
                  <span>Primary Bio-Active Acupoints:</span>
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {activePathway.acupoints.map((pt, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-neutral-200/80 hover:border-pink-300 hover:bg-pink-50/30 transition-colors shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#ed3373] text-sm">{pt.code}</span>
                        <span className="text-xs sm:text-sm font-semibold text-neutral-800">{pt.name}</span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1 leading-snug line-clamp-2">{pt.role}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Tariff & Action Bar */}
            <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-lg font-bold text-neutral-900 block font-mono">
                  {activePathway.fee}
                </span>
                <span className="text-xs sm:text-sm text-neutral-500 block">
                  {activePathway.duration} • 1-on-1 with Dr. Nivedha, MD (Acu)
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onOpenBooking) {
                    onOpenBooking(`Consultation: ${activePathway.commonTitle}`, 600);
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold bg-[#ed3373] text-white hover:bg-[#d92662] transition-all duration-200 shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                <span>Schedule Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: 21st.dev Visual Experience (Full-Bleed Photography + Glassmorphic Badges) */}
          <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full overflow-hidden bg-neutral-900">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{ backgroundImage: `url(${activePathway.image})` }}
            >
              {/* Subtle vignette gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Bio-Electric Wave Overlay Graphic */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>14-Meridian Resonance</span>
            </div>

            {/* Floating Clinical Credential Pill at Bottom */}
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
              <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-pink-100 shadow-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-900 font-display flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#ed3373]" />
                    <span>Dr. Nivedha Priyadharshini, MD (Acu)</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
                    Verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-snug">
                  {activePathway.spec}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom 6-Pathway Quick-Browse Strip (Hairline UI Card Thumbnails) */}
      <div className="w-full max-w-[1400px] mx-auto mt-8">
        <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-neutral-500 uppercase tracking-wider mb-3 px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ed3373] animate-pulse" />
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
              className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-pink-50/60 border-[#ed3373] shadow-sm ring-1 ring-[#ed3373]/30 scale-[1.02]'
                  : 'bg-white border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50/70'
              }`}
            >
              <span className="font-mono text-xs font-bold text-[#ed3373] block">
                {p.id}
              </span>
              <p className="font-display text-sm font-bold text-neutral-900 mt-1 line-clamp-1">
                {p.shortLabel}
              </p>
              <p className="text-xs text-neutral-600 mt-0.5 line-clamp-1 font-mono">
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
