import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, 
  Activity, 
  Brain, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Clock,
  Sparkles,
  MapPin,
  Stethoscope
} from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

export default function ClinicalIntakeManifesto({ onOpenBooking }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "01",
      number: "01",
      title: "Pulse & Somatic Diagnostic Intake",
      duration: "15–20 Mins",
      eyebrow: "STAGE 01 · RADIAL EXAMINATION",
      summary: "Before any needle is placed, Dr. Nivedha palpates 14 radial pulse positions across both wrists at three distinct depths to map exact internal meridian blockages.",
      details: [
        "Bilateral palpation of Cun (寸), Guan (关), and Chi (尺) positions",
        "Tongue topography and sublingual vein micro-circulation check",
        "Assessment of somatic pain triggers and physical posture tension"
      ],
      quote: "“We listen before we touch. The pulse reveals tensions long before physical symptoms appear.”",
      icon: HeartPulse,
      image: getAssetUrl('clinic_interior.jpg'),
      imageCaption: "Private Sanctuary Consultation Suite · Chinmaya Nagar, Chennai",
      authenticClinicalData: {
        title: "Classical Radial Artery Diagnostics",
        positions: [
          { name: "Cun (寸 / Distal)", left: "Heart Meridian", right: "Lung Meridian" },
          { name: "Guan (关 / Middle)", left: "Liver & Gallbladder", right: "Spleen & Stomach" },
          { name: "Chi (尺 / Proximal)", left: "Kidney Yin", right: "Kidney Yang" }
        ],
        protocolNotes: "Palpated across 3 tactile depths: Superficial (Fú), Middle (Zhōng), and Deep (Chén) to assess acute distress versus chronic constitutional depletion."
      }
    },
    {
      id: "02",
      number: "02",
      title: "Micro-Needle Biological Stimulation",
      duration: "20–30 Mins",
      eyebrow: "STAGE 02 · MERIDIAN ACTIVATION",
      summary: "Using microscopic 0.18mm sterile surgical steel (4.5× finer than medical syringes), targeted meridian points are gently stimulated without sharp pain.",
      details: [
        "0.18mm × 30mm Japanese surgical-grade 316L stainless steel needles",
        "Individual sterile blister packs opened fresh in your presence",
        "TDP far-infrared mineral heat to dissipate muscular lactic stagnation"
      ],
      quote: "“Micro-needles part muscle fibers rather than cutting tissue, triggering natural endorphins within minutes.”",
      icon: Activity,
      image: getAssetUrl('sterile_needle_tray.jpg'),
      imageCaption: "Sterile Procedure Tray · Ethylene Oxide Gas Sealed Single-Use Needles",
      authenticClinicalData: {
        title: "Microscopic Caliber & Sterility Protocol",
        specs: [
          { label: "Needle Caliber", value: "0.18mm (Hair-Thin 38 Gauge)" },
          { label: "Standard Syringe", value: "0.80mm (4.5× Thicker · Cutting Tip)" },
          { label: "Insertion Guide", value: "Japanese Micro-Guide Tube (Pain-Free Tap)" },
          { label: "Thermal Therapy", value: "TDP Far-Infrared 33-Mineral Plate" }
        ],
        protocolNotes: "100% single-use EO gas pre-sterilized. Every needle is unsealed in front of you and disposed immediately into biomedical sharps containers."
      }
    },
    {
      id: "03",
      number: "03",
      title: "Psychological Integration & Home Care",
      duration: "15 Mins",
      eyebrow: "STAGE 03 · AUTONOMIC RECOVERY",
      summary: "Acupuncture calms the nervous system into a restorative parasympathetic state. Dr. Nivedha debriefs physical releases with Cambridge cognitive frameworks.",
      details: [
        "Cambridge-certified CBT/REBT psychosomatic debrief",
        "Postural realignment and ergonomic workplace guidance",
        "Personalized circadian sleep and meridian nutrition plan"
      ],
      quote: "“True resolution happens when physical release meets conscious emotional awareness.”",
      icon: Brain,
      image: getAssetUrl('zen_treatment.jpg'),
      imageCaption: "Quiet Recovery Sanctuary · Parasympathetic Stabilization",
      authenticClinicalData: {
        title: "Cambridge Cognitive & Somatic Blueprint",
        carePillars: [
          { label: "Autonomic Recovery", desc: "15-minute resting phase consolidating central endorphin and vagus nerve decompression." },
          { label: "CBT Debrief", desc: "Connecting mental stress triggers with somatic neck, jaw, or lumbar tightness." },
          { label: "Circadian Care", desc: "Customized home-care protocols for restorative sleep rhythms and posture habits." }
        ],
        protocolNotes: "Provides lasting behavioral adjustments so chronic pain patterns do not re-establish after leaving the clinic."
      }
    }
  ];

  const current = steps[activeStep];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ed3373]" />
            <span>CLINICAL PROTOCOL & METHODOLOGY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.12]">
            The Three-Stage Clinical Intake
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-normal mt-3 leading-relaxed">
            An unhurried 60-minute continuous sanctuary consultation. Each stage builds systematically from diagnostic mapping to cellular bio-stimulation and cognitive home-care integration.
          </p>
        </div>

        {/* 21st.dev + Hairline UI Interactive Showcase Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column (5 cols): Interactive Step Selector Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
            <div className="space-y-3.5">
              {steps.map((st, idx) => {
                const isSelected = activeStep === idx;
                const IconComponent = st.icon;

                return (
                  <div
                    key={st.id}
                    onClick={() => setActiveStep(idx)}
                    className={`relative p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-pointer border text-left ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-xl shadow-neutral-900/10'
                        : 'bg-white text-neutral-900 border-neutral-200 hover:border-pink-200 hover:bg-neutral-50/70'
                    }`}
                  >
                    {/* Active Indicator Strip */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeCardStrip"
                        className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#ed3373] rounded-r-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'bg-[#ed3373] text-white' 
                            : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {st.number}
                        </span>
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                          isSelected ? 'text-pink-300' : 'text-neutral-400'
                        }`}>
                          {st.duration}
                        </span>
                      </div>

                      <IconComponent className={`w-4 h-4 ${
                        isSelected ? 'text-[#ed3373]' : 'text-neutral-400'
                      }`} />
                    </div>

                    <h3 className={`font-display text-lg sm:text-xl font-bold leading-snug mb-1.5 transition-colors ${
                      isSelected ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {st.title}
                    </h3>

                    <p className={`text-xs sm:text-sm font-normal leading-relaxed ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-500 line-clamp-2'
                    }`}>
                      {st.summary}
                    </p>

                    {/* Expanded detail items when active */}
                    {isSelected && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 mt-3 border-t border-neutral-800 space-y-2"
                      >
                        {st.details.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                            <Check className="w-3.5 h-3.5 text-[#ed3373] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                        <p className="text-[11px] font-serif italic text-pink-200/90 pt-2 border-l border-pink-400/40 pl-2 mt-2 leading-relaxed">
                          {st.quote}
                        </p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Quick Tariff Card */}
            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-200/80 flex items-center justify-between gap-4 mt-3.5">
              <div>
                <span className="text-xs font-mono font-bold text-[#ed3373] block uppercase tracking-wider">
                  Transparent Tariff
                </span>
                <span className="text-sm font-bold text-neutral-900">
                  ₹600 All-Inclusive / Session
                </span>
              </div>
              <button
                type="button"
                onClick={() => onOpenBooking && onOpenBooking('Three-Stage Clinical Intake', 600)}
                className="px-4 py-2 rounded-full text-xs font-bold bg-[#ed3373] hover:bg-[#d62564] text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column (7 cols): Authentic Clinical Photography & Medical Protocol Canvas */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-xl shadow-neutral-100/70 relative overflow-hidden flex-1 flex flex-col justify-between">
              
              {/* Header of Clinical Canvas */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ed3373]" />
                  <span className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider">
                    {current.eyebrow}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full border border-neutral-200">
                  Clinical Evidence Protocol
                </span>
              </div>

              {/* Dynamic Content Based on Active Step */}
              <div className="py-5 flex-1 flex flex-col justify-start space-y-5">
                <AnimatePresence mode="wait">
                  
                  {/* STAGE 01: Authentic Radial Pulse Examination & Sanctuary Environment */}
                  {activeStep === 0 && (
                    <motion.div
                      key="stage-01"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      {/* Authentic Clinical Photography Card */}
                      <div className="relative rounded-2xl overflow-hidden border border-neutral-200 group">
                        <img 
                          src={current.image} 
                          alt="Clinical Sanctuary" 
                          className="w-full h-48 sm:h-56 object-cover object-center brightness-95" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-4">
                          <p className="text-xs font-mono text-white/90">
                            {current.imageCaption}
                          </p>
                        </div>
                      </div>

                      {/* Genuine Classical Pulse Diagnostic Protocol */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-sm font-bold text-neutral-900">
                            {current.authenticClinicalData.title}
                          </h4>
                          <span className="text-[11px] font-mono text-[#ed3373] font-semibold">
                            Both Wrists Palpated
                          </span>
                        </div>

                        {/* Pulse Positions Table */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {current.authenticClinicalData.positions.map((pos, pIdx) => (
                            <div key={pIdx} className="p-2.5 rounded-xl bg-white border border-neutral-200/80 space-y-1">
                              <span className="text-[11px] font-mono font-bold text-neutral-900 block">
                                {pos.name}
                              </span>
                              <div className="text-[10px] text-neutral-500 font-mono space-y-0.5">
                                <div><strong className="text-neutral-700">L:</strong> {pos.left}</div>
                                <div><strong className="text-neutral-700">R:</strong> {pos.right}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <p className="text-xs text-neutral-600 leading-relaxed font-normal pt-1 border-t border-neutral-200/60">
                          {current.authenticClinicalData.protocolNotes}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 02: Sterile Needle Gauge & Japanese Steel Specifications */}
                  {activeStep === 1 && (
                    <motion.div
                      key="stage-02"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      {/* Authentic Sterile Needles Photo */}
                      <div className="relative rounded-2xl overflow-hidden border border-neutral-200 group">
                        <img 
                          src={current.image} 
                          alt="Sterile Acupuncture Needles" 
                          className="w-full h-48 sm:h-56 object-cover object-center brightness-95" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-4">
                          <p className="text-xs font-mono text-white/90">
                            {current.imageCaption}
                          </p>
                        </div>
                      </div>

                      {/* Genuine Surgical Caliber Fact Sheet */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-sm font-bold text-neutral-900">
                            {current.authenticClinicalData.title}
                          </h4>
                          <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Zero Reuse Guaranteed
                          </span>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {current.authenticClinicalData.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="p-2.5 rounded-xl bg-white border border-neutral-200/80">
                              <span className="text-[10px] font-mono text-neutral-500 block uppercase">
                                {spec.label}
                              </span>
                              <span className="font-bold text-neutral-900 text-xs block mt-0.5">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <p className="text-xs text-neutral-600 leading-relaxed font-normal pt-1 border-t border-neutral-200/60">
                          {current.authenticClinicalData.protocolNotes}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 03: Cambridge Psychological Integration & Somatic Home Care */}
                  {activeStep === 2 && (
                    <motion.div
                      key="stage-03"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      {/* Authentic Sanctuary Recovery Photo */}
                      <div className="relative rounded-2xl overflow-hidden border border-neutral-200 group">
                        <img 
                          src={current.image} 
                          alt="Sanctuary Room" 
                          className="w-full h-48 sm:h-56 object-cover object-center brightness-95" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-4">
                          <p className="text-xs font-mono text-white/90">
                            {current.imageCaption}
                          </p>
                        </div>
                      </div>

                      {/* Genuine Cambridge Protocol Pillars */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                        <h4 className="font-display text-sm font-bold text-neutral-900">
                          {current.authenticClinicalData.title}
                        </h4>

                        <div className="space-y-2">
                          {current.authenticClinicalData.carePillars.map((pillar, cIdx) => (
                            <div key={cIdx} className="p-2.5 rounded-xl bg-white border border-neutral-200/80 text-xs">
                              <span className="font-bold text-neutral-900 font-mono text-[11px] block">
                                {pillar.label}
                              </span>
                              <span className="text-neutral-600 text-[11px] leading-relaxed block mt-0.5">
                                {pillar.desc}
                              </span>
                            </div>
                          ))}
                        </div>

                        <p className="text-xs text-neutral-600 leading-relaxed font-normal pt-1 border-t border-neutral-200/60">
                          {current.authenticClinicalData.protocolNotes}
                        </p>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Bottom Clinical Guarantee Badge */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#ed3373]" />
                  <span>100% Single-Use Sterile EO Gas Protocol</span>
                </span>
                <span className="font-mono text-neutral-400">
                  Chinmaya Nagar, Chennai · Dr. Nivedha Priyadharshini, MD (Acu)
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
