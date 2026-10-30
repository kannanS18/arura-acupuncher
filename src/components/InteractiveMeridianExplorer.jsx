import React, { useState } from 'react';
import { Sparkles, Activity, ShieldCheck, HeartPulse, CheckCircle2, ArrowRight, Brain, Zap, Compass, Thermometer } from 'lucide-react';

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
  const [selectedRegion, setSelectedRegion] = useState(CLINICAL_MERIDIAN_REGIONS[0]);

  return (
    <div className="w-full bg-white text-[#09090b] rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xl overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-8 mb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#e02868] font-bold">
            <HeartPulse className="w-4 h-4" />
            <span>Interactive Clinical Meridian Navigator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b] tracking-tight">
            Explore Targeted Treatment Pathways
          </h2>
          <p className="text-base text-gray-600 font-normal max-w-2xl leading-relaxed">
            Select an anatomical zone to inspect how classical acupuncture stimulates exact nerve networks and reverses root systemic pathologies.
          </p>
        </div>

        <div className="text-right hidden md:block text-xs text-gray-500">
          <span className="text-[#09090b] font-bold text-sm block">{CLINICAL_MERIDIAN_REGIONS.length} Anatomical Zones</span>
          <p className="text-gray-500 font-medium">Curated by Dr. Nivedha (MD Acu)</p>
        </div>
      </div>

      {/* Main Grid: Region Selector Buttons + Comprehensive Clinical Diagnostic Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Region Navigation Buttons */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs uppercase tracking-wider text-gray-500 block mb-3 font-bold">
            Select Anatomical Area:
          </span>

          {CLINICAL_MERIDIAN_REGIONS.map((region) => {
            const isSelected = selectedRegion.id === region.id;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                  isSelected
                    ? 'bg-[#e02868] text-white border-[#e02868] shadow-lg scale-[1.02]'
                    : 'bg-[#f8fafc] text-gray-800 border-gray-200/80 hover:bg-gray-100 hover:border-[#e02868]/40'
                }`}
              >
                <div>
                  <h4 className="font-display text-lg font-bold">
                    {region.name}
                  </h4>
                  <p className={`text-xs mt-0.5 font-normal ${isSelected ? 'text-pink-100' : 'text-gray-500'}`}>
                    {region.subname}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3 transition-colors ${
                  isSelected ? 'bg-white text-[#e02868]' : 'bg-gray-200 text-gray-600'
                }`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Clinical Briefing Card */}
        <div className="lg:col-span-8 bg-[#f8fafc] rounded-3xl border border-gray-200/80 p-6 sm:p-10 space-y-6 shadow-sm">
          
          {/* Card Title & Meridian Channel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
            <div>
              <span className="text-xs text-[#e02868] uppercase tracking-wider font-bold">
                {selectedRegion.clinicalSystem}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#09090b] font-bold mt-1">
                {selectedRegion.name}
              </h3>
              <p className="text-sm text-gray-700 mt-1 font-semibold">
                Anatomical Scope: {selectedRegion.meridian}
              </p>
            </div>

            <div className="p-3 bg-white border border-gray-200 rounded-2xl text-center flex-shrink-0 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-gray-600 block font-bold">Clinical Care</span>
              <span className="text-sm font-bold text-[#e02868]">Evidence-Based Needling</span>
            </div>
          </div>

          {/* Primary Conditions Treated */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-gray-700 block font-bold">
              Primary Disorders & Symptoms Cleared:
            </span>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 text-base font-medium text-[#09090b] shadow-sm leading-relaxed">
              {selectedRegion.primarySymptom}
            </div>
          </div>

          {/* Physiological Mechanism */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-gray-700 block font-bold">
              Neuro-Biological & Meridian Mechanism:
            </span>
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
              {selectedRegion.mechanism}
            </p>
          </div>

          {/* Clinical Outcome & Recommended Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-xs text-emerald-800 font-bold block uppercase tracking-wider">
                Documented Recovery Rate:
              </span>
              <p className="text-xs text-emerald-950 leading-relaxed font-semibold">
                {selectedRegion.reliefStats}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 space-y-1">
              <span className="text-xs text-[#e02868] font-bold block uppercase tracking-wider">
                Recommended Modality:
              </span>
              <p className="text-xs text-gray-900 leading-relaxed font-semibold">
                {selectedRegion.recommendedTechnique}
              </p>
            </div>
          </div>

          {/* Key Acupoints */}
          <div className="space-y-2 pt-2 border-t border-gray-200/80">
            <span className="text-xs uppercase tracking-wider text-gray-700 block font-bold">
              Primary Acupoint Formulations:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedRegion.accompanyingPoints.map((pt, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-300 text-xs text-gray-800 font-semibold shadow-sm"
                >
                  {pt}
                </span>
              ))}
            </div>
          </div>

          {/* Direct Consultation Trigger */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200/80">
            <div className="text-xs text-gray-500 font-normal">
              Consultation includes comprehensive pulse diagnosis with Dr. Nivedha.
            </div>

            <button
              onClick={() => onOpenBooking(`Treatment for ${selectedRegion.name}`, 600)}
              className="w-full sm:w-auto btn-luxury-dark hover:bg-[#e02868] hover:border-[#e02868] px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2 transition-all"
            >
              <span>Consult on {selectedRegion.name.split(' ')[0]} (₹600)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
