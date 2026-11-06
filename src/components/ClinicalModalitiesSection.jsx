import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClinicalModalitiesSection({ onOpenBooking }) {
  const clinicalTechniques = [
    {
      num: "01",
      roman: "I",
      title: "Classical 14-Meridian Acupuncture",
      category: "Primary Restorative Discipline",
      spec: "0.18mm Hair-Thin Surgical Needles",
      desc: "Millimeter-accurate needle insertion along traditional acupuncture pathways. Stimulates sensory nerve fibers, dilates micro-vasculature, dissipates lactic stagnation, and triggers natural endorphin release.",
      benefit: "Sustained relief for chronic migraines, frozen shoulder, lumbar strain, and cervical spondylosis."
    },
    {
      num: "02",
      roman: "II",
      title: "Cambridge Psychotherapy & CBT",
      category: "Autonomic Nervous System Regulation",
      spec: "Evidence-Based Cognitive Restructuring",
      desc: "Structured cognitive behavioural therapy (CBT) and rational emotive behavioural therapy (REBT) frameworks designed to identify psychosomatic triggers, anxiety loops, and insomnia patterns.",
      benefit: "Reprograms chronic fight-or-flight sympathetic overdrive into parasympathetic restorative calm."
    },
    {
      num: "03",
      roman: "III",
      title: "Micro-Current Electro-Acupuncture",
      category: "Neuromuscular Rehabilitation",
      spec: "Calibrated Frequency-Controlled Micro-Current",
      desc: "Safe micro-current electrical stimulation applied across needle pairs to enhance nervous system signaling, relieve deep muscle spasm, and accelerate tissue recovery.",
      benefit: "Highly effective for severe sciatica, lumbar disc herniation, and chronic nerve compression."
    },
    {
      num: "04",
      roman: "IV",
      title: "Laser Acupuncture & TDP Mineral Heat",
      category: "Photobiomodulation & Thermal Recovery",
      spec: "100% Needle-Free Low-Level Laser Beam",
      desc: "Painless, non-invasive low-level laser beam stimulating strategic acupoints without needles, combined with far-infrared 33-trace-mineral heat aligned with human bio-frequency.",
      benefit: "Painless restorative therapy for needle-sensitive patients, pediatric care, and localized joint inflammation."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Sticky Column: Editorial Overview & Philosophy */}
          <motion.div 
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ed3373]" />
                <span>Clinical Modalities</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-neutral-900 leading-[1.12] tracking-tight">
                Four disciplines <br />
                <span className="text-neutral-500 font-bold">zero chemical masking</span>
              </h2>
              <p className="text-base text-neutral-600 font-normal leading-relaxed pt-1">
                Each session is custom-formulated from Dr. Nivedha’s diagnostic pulse mapping. We activate strategic peripheral nerves to dissipate myofascial tension and calm chronic sympathetic overdrive.
              </p>
            </div>

            {/* Hairline Clinical Standard Dossier Box */}
            <div className="p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/90 space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hospital-Grade Sterile Guarantee</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Pre-sterilized single-use 0.18mm surgical stainless needles opened in your presence and discarded into biohazard containers immediately after use.
              </p>
              <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">Standard consultation:</span>
                <span className="text-base font-bold text-neutral-900">₹600</span>
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <button
                type="button"
                onClick={() => {
                  if (onOpenBooking) {
                    onOpenBooking('Clinical Consultation', 600);
                  }
                }}
                className="w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold bg-neutral-900 text-white hover:bg-[#ed3373] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Book Private Consultation (₹600)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Redesigned Hairline UI Modality Cards */}
          <div className="lg:col-span-7 space-y-4">
            {clinicalTechniques.map((tech, idx) => (
              <motion.div
                key={tech.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 hover:border-[#ed3373]/50 hover:shadow-md transition-all duration-200 space-y-4"
              >
                {/* Header Row: Number, Title & Spec Badge */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-[#ed3373]">
                      {tech.num}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-[#ed3373] transition-colors leading-snug">
                      {tech.title}
                    </h3>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-500 bg-neutral-50 border border-neutral-200 px-2.5 py-0.5 rounded-full w-fit">
                    {tech.category}
                  </span>
                </div>

                {/* Technical Specification Pill */}
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-600 bg-neutral-100/70 px-2.5 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ed3373]" />
                  <span>Specification: {tech.spec}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {tech.desc}
                </p>

                {/* Outcome & Booking Action */}
                <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <p className="text-neutral-700 leading-relaxed">
                    <strong className="text-[#ed3373] font-bold">Outcome: </strong>
                    {tech.benefit}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenBooking) {
                        onOpenBooking(tech.title, 600);
                      }
                    }}
                    className="font-bold text-neutral-900 hover:text-[#ed3373] inline-flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                  >
                    <span>Book modality</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
