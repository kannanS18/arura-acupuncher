import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

const specialties = [
  {
    id: "pain",
    number: "01",
    domain: "Physical Dysfunction",
    title: "Musculoskeletal & Pain",
    focus: "Targeting deep myofascial tension, spinal nerve compression & chronic joint inflammation.",
    protocol: "Classical Acupuncture · Local Vasodilation",
    items: [
      { name: "Cervical Spondylosis & Neck Stiffness", tag: "Cervical Spine" },
      { name: "Lumbar Disc Compression & Sciatica", tag: "Lumbar & Sacral" },
      { name: "Knee Osteoarthritis & Joint Immobility", tag: "Joint Cartilage" },
      { name: "Frozen Shoulder & Repetitive Strain", tag: "Shoulder Capsule" }
    ]
  },
  {
    id: "neuro",
    number: "02",
    domain: "Autonomic Balance",
    title: "Neurological & Stress",
    focus: "Down-regulating sympathetic overdrive, panic loops & restoring restorative sleep architecture.",
    protocol: "Neuro-Acupuncture + Cambridge CBT",
    items: [
      { name: "Chronic Migraine & Cluster Headaches", tag: "Cranial Tension" },
      { name: "Severe Insomnia & Sleep Disruption", tag: "Circadian Rhythm" },
      { name: "Clinical Anxiety & Executive Burnout", tag: "Autonomic Calm" },
      { name: "Facial Bell's Palsy Rehabilitation", tag: "Facial Nerve (CN VII)" }
    ]
  },
  {
    id: "systemic",
    number: "03",
    domain: "Systemic Health",
    title: "Metabolic & Hormonal",
    focus: "Balancing internal visceral organ meridians and restoring micro-circulation homeostasis.",
    protocol: "Meridian Balancing + Mineral Heat",
    items: [
      { name: "Irritable Bowel Syndrome & Digestive Issues", tag: "Gut-Brain Axis" },
      { name: "PCOS, Dysmenorrhea & Cycle Irregularities", tag: "Hormonal Balance" },
      { name: "Chronic Sinusitis & Respiratory Stagnation", tag: "Immune / Lung" },
      { name: "Chronic Fatigue & Post-Viral Depletion", tag: "Cellular Energy" }
    ]
  }
];

export default function DoctorTreatmentAreasSection({ onOpenBooking }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleBooking = (title) => {
    if (typeof onOpenBooking === 'function') {
      onOpenBooking(`Consultation for ${title}`, 600);
    } else {
      window.location.hash = '#/booking';
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ed3373] block">
              Clinical Specializations
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Clinical Areas of Treatment
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-mono">
            Evidence-based protocols combining 14-meridian acupuncture with Cambridge psychotherapy.
          </p>
        </div>

        {/* 3 High-End Clinical Cards (Hairline UI Precision + 21st.dev Symmetry) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {specialties.map((spec) => {
            const isHovered = hoveredCard === spec.id;

            return (
              <motion.div
                key={spec.id}
                onMouseEnter={() => setHoveredCard(spec.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border bg-white ${
                  isHovered 
                    ? 'border-[#ed3373] shadow-xl shadow-pink-500/5 -translate-y-1' 
                    : 'border-neutral-200/90 shadow-2xs hover:border-neutral-300'
                }`}
              >
                {/* Top Subtle Hairline Indicator */}
                <div 
                  aria-hidden="true" 
                  className={`absolute top-0 inset-x-8 h-[2px] transition-colors duration-300 rounded-t-3xl ${
                    isHovered ? 'bg-[#ed3373]' : 'bg-transparent'
                  }`}
                />

                <div className="space-y-6">
                  
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-neutral-400">
                        {spec.number}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-neutral-300" />
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#ed3373]">
                        {spec.domain}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200/60">
                      Standard · ₹600
                    </span>
                  </div>

                  {/* Title & Core Focus */}
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
                      {spec.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                      {spec.focus}
                    </p>
                  </div>

                  {/* Condition List as Tactile Hairline Rows */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold mb-2">
                      Documented Clinical Indications:
                    </span>
                    {spec.items.map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/60 hover:bg-white hover:border-pink-200/80 transition-colors flex items-center justify-between gap-3 group/item"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ed3373] shrink-0" />
                          <span className="text-xs font-semibold text-neutral-800 leading-snug">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 shrink-0 bg-white px-2 py-0.5 rounded-md border border-neutral-200/50">
                          {item.tag}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="pt-6 mt-6 border-t border-neutral-100 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>Protocol:</span>
                    <span className="font-semibold text-neutral-800">{spec.protocol}</span>
                  </div>

                  <button
                    onClick={() => handleBooking(spec.title)}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 border bg-neutral-900 text-white hover:bg-[#ed3373] hover:border-[#ed3373] shadow-xs active:scale-[0.98]"
                  >
                    <span>Schedule Clinical Evaluation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
