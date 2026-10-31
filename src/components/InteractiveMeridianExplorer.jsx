import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const ZONES = [
  {
    id: 'cranial',
    label: 'Cranial & Facial',
    fullName: 'Cranial & Facial Nervous System',
    points: 'GV20 (Baihui) • Taiyang • Yintang',
    clears: 'Chronic Migraines, Tension Headaches & Severe Insomnia',
    relief: '92% Relief in 4 Sessions',
    method: '0.18mm Hair-Thin Calming Needles',
    acupoints: ['GV20 Crown', 'GB20 Wind Pool', 'Yintang Third Eye']
  },
  {
    id: 'cervical',
    label: 'Neck & Shoulders',
    fullName: 'Cervical Spine, Neck & Shoulders',
    points: 'GB21 (Jianjing) • BL10 • GV14 (Dazhui)',
    clears: 'Cervical Spondylosis, Frozen Shoulder & Tech Neck Spasms',
    relief: '88% Mobility Restored in 3 Sessions',
    method: 'Acupuncture + Infrared TDP Heat Therapy',
    acupoints: ['GB21 Shoulder Well', 'GV14 Great Vertebra', 'SI11 Upper Back']
  },
  {
    id: 'thoracic',
    label: 'Heart & Stress',
    fullName: 'Thoracic, Heart & Stress Regulation',
    points: 'CV17 (Danzhong) • PC6 (Neiguan) • HT7',
    clears: 'Panic Attacks, Somatic Chest Tightness & Autonomic Burnout',
    relief: 'Immediate Vagus Nerve Relaxation',
    method: 'Vagal Regulation + Cambridge Counselling',
    acupoints: ['CV17 Chest Center', 'PC6 Inner Gate', 'HT7 Spirit Gate']
  },
  {
    id: 'digestive',
    label: 'Gut & Digestion',
    fullName: 'Gastrointestinal & Epigastric Health',
    points: 'CV12 (Zhongwan) • ST36 (Zusanli) • ST25',
    clears: 'Acid Reflux, IBS, Gastritis & Chronic Abdominal Bloating',
    relief: 'Noticeable Ease Within 3–5 Sessions',
    method: 'Meridian Needling + Warming Herb Moxa',
    acupoints: ['CV12 Middle Cavity', 'ST36 Leg Three Miles', 'ST25 Pivot']
  },
  {
    id: 'pelvic',
    label: 'Hormonal Axis',
    fullName: 'Pelvic, Reproductive & Hormonal Axis',
    points: 'CV4 (Guanyuan) • SP6 (Sanyinjiao) • Zigong',
    clears: 'PCOS/PCOD, Severe Menstrual Cramps & Hormonal Fatigue',
    relief: 'Clinically Stabilizes Cycles & Relieves Cramps',
    method: 'Gentle Pelvic Needling + Thermal Moxibustion',
    acupoints: ['CV4 Origin Gate', 'SP6 Three Yin', 'KI3 Great Ravine']
  },
  {
    id: 'lumbar',
    label: 'Sciatica & Spine',
    fullName: 'Lumbar Spine, Sciatic Nerve & Limbs',
    points: 'BL23 (Shenshu) • GB30 (Huantiao) • BL40',
    clears: 'Sciatica, Lumbar Disc Herniation & Radiating Nerve Pain',
    relief: 'Rapid Pain Decompression (Avoids Surgery)',
    method: 'Precision Needling + Micro-Current Electro-Stim',
    acupoints: ['BL23 Kidney Shu', 'GB30 Jumping Circle', 'BL40 Crook']
  }
];

export default function InteractiveMeridianExplorer({ onOpenBooking }) {
  const [activeZone, setActiveZone] = useState(ZONES[0]);

  return (
    <div id="meridian-explorer" className="w-full bg-white text-[#09090b] rounded-3xl border border-gray-200 p-5 sm:p-8 shadow-lg">
      
      {/* Header — Short, Punchy */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-gray-200 pb-5 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#e02868] font-bold">
            <HeartPulse className="w-4 h-4 text-[#e02868] animate-pulse" />
            <span>Targeted Clinical Pathways</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b] tracking-tight mt-1">
            Tap a Zone to Inspect Treatment
          </h2>
        </div>
        <span className="text-xs text-gray-500 font-medium">
          Select area below • Updates instantly
        </span>
      </div>

      {/* 1. Touch & Hover Interactive Zone Pills (Always in View, Zero Page Shift) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-6">
        {ZONES.map((zone) => {
          const isSelected = activeZone.id === zone.id;
          return (
            <motion.button
              key={zone.id}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.94, transition: { duration: 0.1 } }}
              onClick={() => setActiveZone(zone)}
              className={`p-3 rounded-2xl text-left border transition-colors flex flex-col justify-between select-none relative overflow-hidden ${
                isSelected
                  ? 'bg-[#e02868] text-white border-[#e02868] shadow-md shadow-pink-500/20'
                  : 'bg-[#f8fafc] text-gray-800 border-gray-200 hover:border-gray-300 hover:bg-gray-100/70'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                  isSelected ? 'text-pink-100' : 'text-gray-600'
                }`}>
                  {zone.id.slice(0, 3)}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                )}
              </div>
              <span className="font-display text-xs sm:text-sm font-bold leading-tight line-clamp-1">
                {zone.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* 2. Unified In-Place Treatment Card (Never Leaves Viewport, Minimal Text) */}
      <div className="bg-[#f8fafc] rounded-2xl border border-gray-200/90 p-5 sm:p-7 relative overflow-hidden">
        
        {/* Soft Accent Aura */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#e02868]/10 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeZone.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="space-y-4 relative z-10"
          >
            {/* Top Bar of Active Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/80 pb-3">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#e02868] uppercase font-bold block">
                  SELECTED PATHWAY
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#09090b]">
                  {activeZone.fullName}
                </h3>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold self-start sm:self-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeZone.relief}</span>
              </div>
            </div>

            {/* Concise Symptoms & Clinical Method */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-gray-200 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">
                  Conditions Cleared:
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                  {activeZone.clears}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gray-200 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#e02868] font-bold block">
                  Clinical Protocol:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
                  {activeZone.method}
                </p>
              </div>
            </div>

            {/* Targeted Meridian Points Pill Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-gray-500 font-medium mr-1">Points:</span>
                {activeZone.acupoints.map((pt, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-[11px] font-semibold text-gray-700">
                    {pt}
                  </span>
                ))}
              </div>

              {/* Instant Book Action with Touch & Hover Micro-Animation */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenBooking ? onOpenBooking(`Treatment for ${activeZone.fullName}`, 600) : window.location.href = '#/booking'}
                className="btn-luxury-dark hover:bg-[#e02868] hover:border-[#e02868] px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center space-x-2 transition-all shadow-xs"
              >
                <span>Book This Zone (₹600)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

    </div>
  );
}
