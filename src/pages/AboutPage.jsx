import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Activity, Brain, Zap, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import { StatsBand } from '../components/stats-band';
import ClinicalIntakeManifesto from '../components/ClinicalIntakeManifesto';
import ClinicalModalitiesSection from '../components/ClinicalModalitiesSection';
import DoctorIdCard from '../components/DoctorIdCard';

export default function AboutPage({ onOpenBooking }) {
  const clinicalTechniques = [
    {
      num: "01",
      roman: "I",
      title: "Classical 14-Meridian Acupuncture",
      category: "Primary Restorative Discipline",
      spec: "0.18mm Hair-Thin Surgical Needles",
      desc: "Millimeter-accurate needle insertion along traditional pathways, stimulating nerves and releasing natural endorphins for pain relief.",
      benefit: "Sustained relief for chronic migraines, frozen shoulder, lumbar strain, and cervical spondylosis."
    },
    {
      num: "02",
      roman: "II",
      title: "Cambridge Psychotherapy & CBT",
      category: "Autonomic Nervous System Regulation",
      spec: "Evidence-Based Cognitive Restructuring",
      desc: "Structured CBT and REBT frameworks designed to identify psychosomatic triggers, anxiety loops, and insomnia patterns.",
      benefit: "Reprograms chronic fight-or-flight sympathetic overdrive into parasympathetic restorative calm."
    },
    {
      num: "03",
      roman: "III",
      title: "Micro-Current Electro-Acupuncture",
      category: "Neuromuscular Rehabilitation",
      spec: "Calibrated Frequency-Controlled Micro-Current",
      desc: "Calibrated micro-current stimulation across needle pairs to relieve muscle spasms and accelerate nerve tissue recovery.",
      benefit: "Highly effective for severe sciatica, lumbar disc herniation, and chronic nerve compression."
    },
    {
      num: "04",
      roman: "IV",
      title: "Laser Acupuncture & TDP Mineral Heat",
      category: "Photobiomodulation & Thermal Recovery",
      spec: "100% Needle-Free Low-Level Laser Beam",
      desc: "Painless, non-invasive laser acupoint stimulation paired with far-infrared mineral heat for needle-sensitive patients.",
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 text-brand text-sm font-semibold border border-pink-200/70 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>PROFESSIONAL ACUPUNCTURE SPECIALIST • CHENNAI</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.08]">
                Professional Acupuncture Specialist in Chennai
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl">
                Founded by <strong className="text-ink font-semibold">Dr. Nivedha Priyadharshini, MD (Acu)</strong> in Chennai. Bridging classical 14-meridian <strong className="text-ink font-semibold">traditional acupuncture treatment</strong> with Cambridge psychotherapy for lasting natural pain relief.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-sm font-medium text-neutral-600">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>100% Single-Use Sterile Needles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  <span>Licensed MD (Acupuncture Doctor)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span>Cambridge Certified Psychotherapy</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column (5 cols): Verified Doctor Identity Credential Badge */}
            <motion.div 
              className="lg:col-span-5 flex flex-col items-center justify-center"
              initial={{ opacity: 0.9, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <DoctorIdCard />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Narrative Manifesto & Three-Stage Clinical Intake (21st.dev + Hairline UI Architecture) */}
      <ClinicalIntakeManifesto onOpenBooking={onOpenBooking} />

      {/* 2.5 Clinical Acupuncture Therapy Benefits (SEO Priority Section) */}
      <section className="py-20 lg:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-sm font-mono font-bold text-brand uppercase tracking-wider">
              EVIDENCE-BASED RECOVERY
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-[46px] font-bold text-ink tracking-tight">
              Acupuncture Therapy Benefits & Natural Pain Relief
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
              Why thousands in Chennai choose classical 14-meridian <strong className="text-ink font-semibold">acupuncture for pain management</strong>, chronic joint stiffness, and autonomic restoration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-brand/40 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand flex items-center justify-center font-bold text-base">
                01
              </div>
              <h3 className="font-bold text-xl text-ink">
                Acupuncture for Pain Management
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                Relieves chronic back pain, neck stiffness, sciatica, and knee pain by unlocking myofascial nodes and triggering endorphins.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-brand/40 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand flex items-center justify-center font-bold text-base">
                02
              </div>
              <h3 className="font-bold text-xl text-ink">
                Natural Pain Relief Treatment
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                100% drug-free restorative healing that eliminates pharmaceutical dependency and avoids harmful NSAID side effects.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-brand/40 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand flex items-center justify-center font-bold text-base">
                03
              </div>
              <h3 className="font-bold text-xl text-ink">
                Traditional Chinese Acupuncture
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                Rooted in 14-meridian mapping and radial pulse diagnostics to balance blood circulation and resolve the root cause.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-brand/40 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand flex items-center justify-center font-bold text-base">
                04
              </div>
              <h3 className="font-bold text-xl text-ink">
                Acupuncture for Stress Relief & Anxiety
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                Activates the vagus nerve to lower cortisol and reset fight-or-flight tension into deep mental calm.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-brand/40 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand flex items-center justify-center font-bold text-base">
                05
              </div>
              <h3 className="font-bold text-xl text-ink">
                Acupuncture for Muscle & Joint Pain
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                Clears lactic crystallization and tight knots, restoring painless mobility for frozen shoulders and joint stiffness.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-brand/40 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand flex items-center justify-center font-bold text-base">
                06
              </div>
              <h3 className="font-bold text-xl text-ink">
                Acupuncture Treatment Cost (₹600)
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                Transparent fee of ₹600 per session includes 0.18mm pre-sterilized disposable needles and soothing TDP mineral heat.
              </p>
            </div>
          </div>

        </div>
      </section>

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
              className="px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-brand text-white hover:bg-brand-dark whitespace-nowrap shadow-xl relative z-10 transition-colors duration-200 motion-safe:active:scale-[0.98]"
            >
              Book Private Consultation (₹600)
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
