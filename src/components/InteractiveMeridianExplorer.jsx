import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, ChevronDown, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Activity } from 'lucide-react';

const CLINICAL_MERIDIAN_REGIONS = [
  {
    id: 'cranial',
    name: 'Cranial & Facial Nervous System',
    subname: 'Baihui (GV20) • Taiyang • Yintang',
    meridian: 'Governing Vessel & Cranial Channels',
    clinicalSystem: 'Neurological & Cranial System',
    primarySymptom: 'Chronic Migraines, Tension Headaches, Insomnia, Trigeminal Neuralgia',
    mechanism: 'Stimulates cranial parasympathetic nerve bundles, reduces cerebral vascular spasms, and elevates serotonin and endorphin levels.',
    reliefStats: '92% of patients report reduction in headache frequency within 4 sessions.',
    recommendedTechnique: 'Ultra-fine hair needling with optional gentle scalp electro-stimulation.',
    accompanyingPoints: ['GV20 (Crown Baihui)', 'GB20 (Wind Pool Fengchi)', 'Ex-HN3 (Third Eye Yintang)']
  },
  {
    id: 'cervical',
    name: 'Cervical Spine, Neck & Shoulders',
    subname: 'Jianjing (GB21) • Tianzhu (BL10) • Dazhui (GV14)',
    meridian: 'Cervical & Upper Spinal Pathways',
    clinicalSystem: 'Cervical & Musculoskeletal System',
    primarySymptom: 'Cervical Spondylosis, Frozen Shoulder, Upper Back Spasms, Tech Neck',
    mechanism: 'Dissolves deep myofascial trigger knots, restores arterial vertebral microcirculation, and interrupts pain-spasm neuromuscular loops.',
    reliefStats: 'Rapid mobility restoration; 88% reported pain reduction after 2–3 treatments.',
    recommendedTechnique: 'Acupuncture combined with localized TDP Mineral Heat therapy.',
    accompanyingPoints: ['GB21 (Shoulder Well)', 'GV14 (Great Vertebra)', 'SI11 (Celestial Gathering)']
  },
  {
    id: 'thoracic',
    name: 'Thoracic, Heart & Stress Regulation',
    subname: 'Danzhong (CV17) • Neiguan (PC6) • Shenmen (HT7)',
    meridian: 'Autonomic & Pericardium Pathways',
    clinicalSystem: 'Cardiovascular & Autonomic Nervous System',
    primarySymptom: 'Panic Attacks, Somatic Chest Tightness, Palpitations, Deep Emotional Burnout',
    mechanism: 'Regulates the vagus nerve, down-regulates sympathetic adrenal overdrive, and normalizes heart rate variability (HRV).',
    reliefStats: 'Immediate somatic relaxation and respiratory ease felt during needle retention.',
    recommendedTechnique: 'Gentle Conception Vessel needling paired with Somatic Breathwork and Counselling.',
    accompanyingPoints: ['CV17 (Chest Center)', 'PC6 (Inner Gate)', 'HT7 (Spirit Gate)']
  },
  {
    id: 'digestive',
    name: 'Gastrointestinal & Epigastric Health',
    subname: 'Zhongwan (CV12) • Zusanli (ST36) • Tianshu (ST25)',
    meridian: 'Enteric & Stomach Pathways',
    clinicalSystem: 'Gastrointestinal & Digestive System',
    primarySymptom: 'GERD, Acid Reflux, Gastritis, Irritable Bowel Syndrome (IBS), Chronic Bloating',
    mechanism: 'Modulates enteric nervous system motility, regulates stomach acid secretions, and reduces gut mucosal inflammation.',
    reliefStats: 'Noticeable digestive ease and appetite normalization within 3–5 sessions.',
    recommendedTechnique: 'Classical needling with warming herb moxibustion over abdominal points.',
    accompanyingPoints: ['CV12 (Middle Cavity)', 'ST36 (Leg Three Miles)', 'ST25 (Celestial Pivot)']
  },
  {
    id: 'pelvic',
    name: 'Pelvic, Reproductive & Hormonal Axis',
    subname: 'Guanyuan (CV4) • Sanyinjiao (SP6) • Zigong (EX-CA1)',
    meridian: 'Pelvic & Endocrine Pathways',
    clinicalSystem: 'Gynecological & Endocrine Axis',
    primarySymptom: 'PCOS/PCOD, Dysmenorrhea (Menstrual Cramps), Fertility Support, Menopause',
    mechanism: 'Improves ovarian and uterine arterial blood flow, down-regulates pelvic prostaglandins, and stabilizes hypothalamic-pituitary-ovarian axis.',
    reliefStats: 'Proven clinical support in regularizing cycles and relieving debilitating cramps.',
    recommendedTechnique: 'Targeted pelvic meridian needle placement with gentle warming moxa.',
    accompanyingPoints: ['CV4 (Gate of Origin)', 'SP6 (Three Yin Intersection)', 'KI3 (Great Ravine)']
  },
  {
    id: 'lumbar',
    name: 'Lumbar Spine, Sciatic Nerve & Limbs',
    subname: 'Shenshu (BL23) • Huantiao (GB30) • Weizhong (BL40)',
    meridian: 'Sciatic & Spinal Nerve Pathways',
    clinicalSystem: 'Spinal & Neuromuscular System',
    primarySymptom: 'Sciatica, Lumbar Disc Herniation, Sacroiliac Joint Pain, Piriformis Syndrome',
    mechanism: 'Relieves sciatic nerve root compression, accelerates intervertebral disc microvascular perfusion, and releases piriformis spasms.',
    reliefStats: 'Significant reduction in radiating leg pain; avoids unnecessary spinal surgeries.',
    recommendedTechnique: 'Deep needle acupuncture paired with micro-current electro-stimulation.',
    accompanyingPoints: ['BL23 (Kidney Shu)', 'GB30 (Jumping Circle)', 'BL40 (Middle of the Crook)']
  }
];

export default function InteractiveMeridianExplorer({ onOpenBooking }) {
  // First item open by default
  const [openRegionId, setOpenRegionId] = useState(CLINICAL_MERIDIAN_REGIONS[0].id);

  const toggleRegion = (id) => {
    setOpenRegionId(openRegionId === id ? null : id);
  };

  return (
    <div id="meridian-explorer" className="w-full bg-white text-[#09090b] rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg overflow-hidden">
      
      {/* Top Header — Clean, Minimalist, Direct */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6 mb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#e02868] font-bold">
            <HeartPulse className="w-4 h-4 text-[#e02868]" />
            <span>Interactive Clinical Meridian Navigator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b] tracking-tight">
            Explore Targeted Treatment Pathways
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal max-w-2xl leading-relaxed">
            Tap any anatomical zone to inspect the exact nerve pathways, primary symptoms cleared, and documented recovery outcomes directly inline.
          </p>
        </div>

        <div className="text-left md:text-right text-xs text-gray-500">
          <span className="text-[#09090b] font-bold text-sm block">6 Anatomical Zones</span>
          <p className="text-gray-500 font-medium">Curated by Dr. Nivedha (MD Acu)</p>
        </div>
      </div>

      {/* Accordion List: Direct Inline Expansion — Zero Disjointed Scrolling */}
      <div className="space-y-3.5">
        {CLINICAL_MERIDIAN_REGIONS.map((region, idx) => {
          const isOpen = openRegionId === region.id;

          return (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'border-[#e02868] bg-[#f8fafc] shadow-md ring-1 ring-[#e02868]/20' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleRegion(region.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center space-x-3.5 sm:space-x-4 pr-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold transition-all ${
                    isOpen 
                      ? 'bg-[#e02868] text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    0{idx + 1}
                  </div>

                  <div>
                    <h3 className={`font-display text-base sm:text-lg font-bold transition-colors ${
                      isOpen ? 'text-[#e02868]' : 'text-[#09090b]'
                    }`}>
                      {region.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 font-normal">
                      {region.subname}
                    </p>
                  </div>
                </div>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? 'bg-[#e02868]/10 text-[#e02868] rotate-180' : 'bg-gray-100 text-gray-500'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Body: Unfolds Smoothly Inline Right Below the Header */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 pt-0 border-t border-gray-200/80 space-y-5 bg-white">
                      
                      {/* System & Meridian Scope Pill */}
                      <div className="pt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-[#e02868] font-bold">
                          {region.clinicalSystem}
                        </span>
                        <span className="text-gray-500 font-medium">
                          Channel: <strong className="text-gray-800">{region.meridian}</strong>
                        </span>
                      </div>

                      {/* Primary Symptoms */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold block">
                          Primary Symptoms Cleared:
                        </span>
                        <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-gray-200 text-sm font-semibold text-[#09090b] leading-relaxed">
                          {region.primarySymptom}
                        </div>
                      </div>

                      {/* Mechanism */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold block">
                          Biological & Nerve Mechanism:
                        </span>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                          {region.mechanism}
                        </p>
                      </div>

                      {/* Recovery Rate & Recommended Modality */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                          <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold block">
                            Documented Recovery Rate:
                          </span>
                          <p className="text-xs text-emerald-950 font-semibold leading-relaxed">
                            {region.reliefStats}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-pink-50 border border-pink-200 space-y-1">
                          <span className="text-[10px] uppercase tracking-wider text-[#e02868] font-bold block">
                            Recommended Modality:
                          </span>
                          <p className="text-xs text-gray-900 font-semibold leading-relaxed">
                            {region.recommendedTechnique}
                          </p>
                        </div>
                      </div>

                      {/* Key Acupoint Formulations */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold block">
                          Targeted Acupoints:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {region.accompanyingPoints.map((pt, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-3 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800"
                            >
                              {pt}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* One-Tap Action */}
                      <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-xs text-gray-500">
                          Unhurried 1-on-1 pulse evaluation included.
                        </span>
                        <button
                          onClick={() => onOpenBooking ? onOpenBooking(`Treatment for ${region.name}`, 600) : window.location.href = '#/booking'}
                          className="btn-luxury-dark hover:bg-[#e02868] hover:border-[#e02868] px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center space-x-2 transition-all active:scale-95"
                        >
                          <span>Consult on {region.name.split(' ')[0]} (₹600)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
