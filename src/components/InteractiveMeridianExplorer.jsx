import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, CheckCircle2 } from 'lucide-react';

const CLINICAL_ZONES = [
  {
    id: '01',
    name: 'Cranial & Facial Nervous System',
    points: 'GV20 (Baihui) • Taiyang • Yintang',
    clears: 'Chronic Migraines, Tension Headaches & Severe Insomnia',
    relief: '92% Relief in 4 Sessions',
    protocol: '0.18mm Hair-Thin Calming Needles',
    acupoints: ['GV20 Crown', 'GB20 Wind Pool', 'Yintang Third Eye']
  },
  {
    id: '02',
    name: 'Cervical Spine, Neck & Shoulders',
    points: 'GB21 (Jianjing) • BL10 • GV14 (Dazhui)',
    clears: 'Cervical Spondylosis, Frozen Shoulder & Tech Neck Spasms',
    relief: '88% Mobility Restored in 3 Sessions',
    protocol: 'Acupuncture + Localized TDP Mineral Heat',
    acupoints: ['GB21 Shoulder Well', 'GV14 Great Vertebra', 'SI11 Upper Back']
  },
  {
    id: '03',
    name: 'Thoracic, Heart & Stress Regulation',
    points: 'CV17 (Danzhong) • PC6 (Neiguan) • HT7',
    clears: 'Panic Attacks, Somatic Chest Tightness & Autonomic Burnout',
    relief: 'Immediate Vagus Nerve Relaxation',
    protocol: 'Vagal Regulation + Cambridge Counselling',
    acupoints: ['CV17 Chest Center', 'PC6 Inner Gate', 'HT7 Spirit Gate']
  },
  {
    id: '04',
    name: 'Gastrointestinal & Epigastric Health',
    points: 'CV12 (Zhongwan) • ST36 (Zusanli) • ST25',
    clears: 'Acid Reflux, IBS, Gastritis & Chronic Abdominal Bloating',
    relief: 'Noticeable Ease Within 3 to 5 Sessions',
    protocol: 'Meridian Needling + Warming Herb Moxa',
    acupoints: ['CV12 Middle Cavity', 'ST36 Leg Three Miles', 'ST25 Pivot']
  },
  {
    id: '05',
    name: 'Pelvic, Reproductive & Hormonal Axis',
    points: 'CV4 (Guanyuan) • SP6 (Sanyinjiao) • Zigong',
    clears: 'PCOS/PCOD, Severe Menstrual Cramps & Hormonal Fatigue',
    relief: 'Clinically Stabilizes Cycles & Relieves Cramps',
    protocol: 'Gentle Pelvic Needling + Thermal Moxibustion',
    acupoints: ['CV4 Origin Gate', 'SP6 Three Yin', 'KI3 Great Ravine']
  },
  {
    id: '06',
    name: 'Lumbar Spine, Sciatic Nerve & Limbs',
    points: 'BL23 (Shenshu) • GB30 (Huantiao) • BL40',
    clears: 'Sciatica, Lumbar Disc Herniation & Radiating Nerve Pain',
    relief: 'Rapid Pain Decompression (Avoids Surgery)',
    protocol: 'Precision Needling + Micro-Current Electro-Stim',
    acupoints: ['BL23 Kidney Shu', 'GB30 Jumping Circle', 'BL40 Crook']
  }
];

export default function InteractiveMeridianExplorer({ onOpenBooking }) {
  return (
    <div id="meridian-explorer" className="w-full bg-white text-ink">
      
      {/* Section Header with Reveal Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8 mb-12"
      >
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs text-brand font-semibold">
            <HeartPulse className="w-4 h-4 text-brand animate-pulse" />
            <span>Targeted clinical pathways</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Anatomical Treatment Zones
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal max-w-2xl leading-relaxed">
            Every zone is addressed with micro-precision needle placement to release trapped nerve fibers and restore systemic equilibrium.
          </p>
        </div>

        <div className="text-left md:text-right text-xs text-neutral-500 font-medium">
          <span className="text-ink font-bold text-sm block">6 Dedicated Pathways</span>
          <span>Curated by Dr. Nivedha (MD Acu)</span>
        </div>
      </motion.div>

      {/* Direct, Self-Contained Card Grid with Viewport Scroll Stagger */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {CLINICAL_ZONES.map((zone, idx) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group bg-surface-subtle rounded-3xl border border-neutral-200 hover:border-brand hover:bg-white hover:shadow-xl transition-colors duration-200 p-6 sm:p-7 flex flex-col justify-between space-y-6"
          >
            {/* Top: Header, Number, and Pathway */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
                <span className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-200 text-brand text-xs font-bold flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                  {zone.id}
                </span>
                
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{zone.relief}</span>
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-ink group-hover:text-brand transition-colors leading-snug">
                  {zone.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 font-normal">
                  {zone.points}
                </p>
              </div>

              {/* Conditions Cleared */}
              <div className="p-3.5 rounded-xl bg-white border border-neutral-200 group-hover:border-neutral-300 space-y-1 transition-colors">
                <span className="text-xs text-neutral-500 font-medium block">
                  Conditions cleared:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug">
                  {zone.clears}
                </p>
              </div>

              {/* Clinical Protocol */}
              <div className="space-y-1">
                <span className="text-xs text-brand font-semibold block">
                  Clinical protocol:
                </span>
                <p className="text-xs text-neutral-700 font-medium">
                  {zone.protocol}
                </p>
              </div>

              {/* Acupoints */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {zone.acupoints.map((pt, pIdx) => (
                  <span
                    key={pIdx}
                    className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-medium text-neutral-700"
                  >
                    {pt}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
