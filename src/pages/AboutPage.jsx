import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Activity, Brain, Zap, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import MeridianPulseWave from '../components/MeridianPulseWave';

export default function AboutPage({ onOpenBooking }) {
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

  const stages = [
    {
      num: "01",
      title: "Pulse & Somatic Diagnostic Intake",
      desc: "We spend 15 to 20 minutes evaluating 14 radial pulse positions, lifestyle stressors, and tongue topography to locate exact meridian blockages."
    },
    {
      num: "02",
      title: "Micro-Needle Biological Stimulation",
      desc: "Using microscopic 0.18mm sterile surgical steel, strategic points are activated. Patients experience immediate nervous system relaxation and endorphin release."
    },
    {
      num: "03",
      title: "Psychological Integration & Home Care",
      desc: "Debriefing emotional and physical sensations, establishing posture and diet corrections, and reinforcing healthy nervous system regulation."
    }
  ];

  return (
    <div className="bg-white text-ink min-h-screen">
      
      {/* 1. Minimalist Editorial Header */}
      <section className="pt-16 pb-20 bg-sanctuary-texture border-b border-neutral-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column (7 cols): Editorial Narrative with Scroll Reveal */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center space-x-2 text-xs text-brand font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span>The Arura Studio Origin and Ethos</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.08]">
                A quiet sanctuary for <br />
                <span className="text-brand">evidence-based healing.</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl">
                Established in Virugambakkam, Chennai by <strong className="text-ink font-semibold">Dr. Nivedha Priyadharshini, MD (Acu)</strong>. Arura was founded on a singular conviction: chronic human suffering cannot be solved in five-minute visits with chemical palliatives.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-700">
                <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl border border-neutral-200 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Single-Use Sterile Needles</span>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl border border-neutral-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-brand" />
                  <span>Cambridge Certified Psychotherapy</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column (5 cols): Calm Clinical Showcase */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-3xl bg-white border border-neutral-200/90 p-8 shadow-sm relative overflow-hidden group motion-safe:animate-pure-float">
                
                <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={getAssetUrl('logo.png')} 
                      alt="Arura Wellness Studio Official Logo" 
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
                    Clinical Standard
                  </span>
                </div>

                <div className="py-6 flex flex-col items-center justify-center relative">
                  <div className="relative w-full max-w-[320px] flex items-center justify-center">
                    <img 
                      src={getAssetUrl('needles_cutout_3d.png')} 
                      alt="0.18mm Hair-Thin Surgical Acupuncture Needles" 
                      className="w-full h-auto max-h-52 object-contain filter drop-shadow-md"
                    />
                  </div>

                  <div className="mt-4 text-xs text-neutral-600 font-medium">
                    <span>0.18mm Hair-Thin Surgical 316L Needles</span>
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-4 flex items-center justify-between text-xs text-neutral-500">
                  <span>Ethylene Oxide Pre-Sterilized</span>
                  <span className="font-semibold text-brand">Zero Reuse Guaranteed</span>
                </div>

              </div>
            </motion.div>

          </div>
        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-8">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* 2. Narrative Manifesto Section */}
      <section className="py-20 lg:py-28 border-b border-neutral-200/80 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Big Editorial Manifesto Typography */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-ink leading-[1.12] tracking-tight">
                “The needle clears what the mind holds.”
              </h2>
              
              <div className="space-y-6 pt-2">
                <p className="text-lg sm:text-xl text-neutral-900 font-normal leading-relaxed tracking-tight border-l-2 border-brand pl-6">
                  Modern medicine excels at acute surgical emergencies, but often fails patients with chronic, recurring health distress. When you struggle with chronic migraines, cervical pain, or IBS, you are often prescribed painkillers, muscle relaxants, and antacids that mask symptoms without resolving the source.
                </p>

                <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed pl-6">
                  At Arura, we observe the human body as an integrated neurological, biological, and psychological organism. By combining classical 14-meridian acupuncture with Cambridge clinical counselling, we address physical nerve inflammation and emotional stress simultaneously.
                </p>
              </div>

              {/* 3 Metric Anchors */}
              <div className="pt-6 flex items-center space-x-6 sm:space-x-8 text-xs border-t border-neutral-100">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-ink font-display block">
                    <AnimatedCounter end={100} suffix="%" />
                  </span>
                  <span className="text-neutral-500 font-medium">Single-Use Needles</span>
                </div>
                <div className="h-10 w-px bg-neutral-200" />
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-brand font-display block">1-on-1</span>
                  <span className="text-neutral-500 font-medium">Unhurried Care</span>
                </div>
                <div className="h-10 w-px bg-neutral-200" />
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-emerald-700 font-display block">
                    <AnimatedCounter end={8} suffix="+ Yrs" />
                  </span>
                  <span className="text-neutral-500 font-medium">Chennai Experience</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Visual 3-Stage Timeline */}
            <motion.div 
              className="lg:col-span-6 space-y-4"
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs text-neutral-500 font-semibold block">
                Three-Stage Clinical Intake
              </p>

              {stages.map((st, i) => (
                <motion.div 
                  key={st.num}
                  className="p-6 sm:p-7 rounded-2xl bg-surface-subtle border border-neutral-200 hover:border-brand hover:bg-white hover:shadow-lg transition-colors duration-200 space-y-2 group"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-200 text-brand font-bold text-xs flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                      {st.num}
                    </span>
                    <h4 className="font-display text-lg font-bold text-ink">
                      {st.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed pl-11">
                    {st.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. BESPOKE EDITORIAL TECHNIQUE DOSSIER (Replaces generic AI cards & green alert boxes) */}
      <section className="py-24 lg:py-32 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Sticky Column: Editorial Overview & Philosophy */}
            <motion.div 
              className="lg:col-span-5 lg:sticky lg:top-28 space-y-6"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-3">
                <span className="text-xs font-semibold text-brand block">
                  Clinical Modalities
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-ink leading-tight">
                  Four Disciplines. <br />
                  <span className="text-neutral-700">Zero Chemical Masking.</span>
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed pt-2">
                  Each session is custom-formulated from Dr. Nivedha’s diagnostic pulse mapping. We activate strategic peripheral nerves to dissipate myofascial tension and calm chronic sympathetic overdrive.
                </p>
              </div>

              {/* Clinical Standard Dossier Box */}
              <div className="p-6 rounded-2xl bg-sanctuary-texture border border-neutral-200 space-y-4">
                <div className="flex items-center space-x-2.5 text-xs text-neutral-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Hospital-Grade Sterile Guarantee</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Pre-sterilized single-use 0.18mm surgical stainless needles opened in your presence and discarded into biohazard containers immediately after use.
                </p>
                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">Standard consultation:</span>
                  <strong className="text-ink font-bold text-sm">₹600</strong>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/booking"
                  className="w-full py-4 rounded-xl text-xs font-semibold bg-ink text-white hover:bg-brand transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm motion-safe:active:scale-[0.98]"
                >
                  <span>Book Private Consultation (₹600)</span>
                  <ArrowRight className="w-3.5 h-3.5 motion-safe:group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Architectural Editorial Ledger Rows */}
            <div className="lg:col-span-7 space-y-6">
              {clinicalTechniques.map((tech, idx) => (
                <motion.div
                  key={tech.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 hover:border-brand/60 hover:shadow-xl transition-colors duration-200 space-y-6 relative overflow-hidden"
                >
                  {/* Subtle top indicator bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Header Row: Number, category, and spec */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-5">
                    <div className="flex items-center space-x-3">
                      <span className="font-display text-xl font-bold text-brand">
                        {tech.num}
                      </span>
                      <span className="h-4 w-px bg-neutral-200" />
                      <span className="text-xs text-neutral-500 font-medium">
                        {tech.category}
                      </span>
                    </div>

                    <span className="text-xs font-medium text-neutral-600 bg-neutral-50 px-2.5 py-0.5 rounded-md border border-neutral-200">
                      {tech.spec}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink group-hover:text-brand transition-colors leading-snug">
                      {tech.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                      {tech.desc}
                    </p>
                  </div>

                  {/* Therapeutic Indication & Benefit (Editorial callout, NO green alert box!) */}
                  <div className="pl-5 border-l-2 border-brand/50 py-1 space-y-1">
                    <span className="text-xs font-semibold text-brand block">
                      Targeted Clinical Outcome:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                      {tech.benefit}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-medium">100% sterile single-use guarantee</span>
                    <Link
                      to="/booking"
                      className="text-xs font-semibold text-ink group-hover:text-brand inline-flex items-center space-x-1.5 transition-colors"
                    >
                      <span>Book this modality</span>
                      <ArrowRight className="w-3.5 h-3.5 motion-safe:group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 4. Sanctuary Location Strip */}
      <section className="py-20 lg:py-28 bg-sanctuary-texture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-ink text-white rounded-3xl p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-3 text-center md:text-left relative z-10">
              <h3 className="font-display text-2xl sm:text-4xl font-bold">
                Chinmaya Nagar, Virugambakkam, Chennai
              </h3>
              <p className="text-sm text-neutral-300 font-normal max-w-lg">
                Daily consultations from 10:00 AM to 8:00 PM. Private acoustic suites to protect patient confidentiality.
              </p>
            </div>

            <Link
              to="/booking"
              className="px-8 py-4 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark whitespace-nowrap shadow-xl relative z-10 transition-colors duration-200 motion-safe:active:scale-[0.98]"
            >
              Book Private Consultation (₹600)
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
