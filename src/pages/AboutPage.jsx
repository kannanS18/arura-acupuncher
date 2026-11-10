import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Activity, Brain, Zap, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import { StatsBand } from '../components/stats-band';
import ClinicalIntakeManifesto from '../components/ClinicalIntakeManifesto';
import ClinicalModalitiesSection from '../components/ClinicalModalitiesSection';

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
            
            {/* Left Column (7 cols): Editorial Narrative */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.08]">
                A quiet sanctuary for <br />
                <span className="text-brand">evidence-based healing</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl">
                Established in Virugambakkam, Chennai by <strong className="text-ink font-semibold">Dr. Nivedha Priyadharshini, MD (Acu)</strong>. Arura was founded on a singular conviction: chronic human suffering cannot be solved in five-minute visits with chemical palliatives.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-medium text-neutral-600">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>100% Single-Use Sterile Needles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  <span>Cambridge Certified Psychotherapy</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column (5 cols): Calm Clinical Showcase */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0.9, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
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
      </section>

      {/* 2. Narrative Manifesto & Three-Stage Clinical Intake (21st.dev + Hairline UI Architecture) */}
      <ClinicalIntakeManifesto onOpenBooking={onOpenBooking} />

      {/* 3. Clinical Disciplines & Modalities (21st.dev + Hairline UI Architecture) */}
      <ClinicalModalitiesSection onOpenBooking={onOpenBooking} />

      {/* 4. Sanctuary Location Strip */}
      <section className="py-20 lg:py-28 bg-sanctuary-texture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-ink text-white rounded-3xl p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0.95 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
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
