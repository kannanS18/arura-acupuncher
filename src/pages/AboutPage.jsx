import React, { useState } from 'react';
import { ShieldCheck, Compass, CheckCircle2, ArrowRight, Sparkles, HeartPulse, Brain, Award, Clock, Activity, Zap, Sun, Disc, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINIC_INFO, ACUPUNCTURE_TECHNIQUES, COUNSELLING_METHODS } from '../data/websiteContent';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';

export default function AboutPage({ onOpenBooking }) {
  const [selectedTech, setSelectedTech] = useState(0);

  const clinicalTechniques = [
    {
      title: "Classical 14-Meridian Acupuncture",
      category: "Primary Restorative Discipline",
      spec: "Millimeter Pulse Accuracy",
      desc: "Millimeter-accurate needle insertion along traditional acupuncture pathways. Stimulates sensory nerve fibers, dilates micro-vasculature, dissipates lactic stagnation, and triggers natural endorphin release.",
      benefit: "Sustained relief for chronic migraines, frozen shoulder, lumbar strain, and cervical spondylosis.",
      icon: <Activity className="w-5 h-5 text-[#e02868]" />
    },
    {
      title: "Cambridge Psychotherapy & CBT",
      category: "Autonomic Nervous System Regulation",
      spec: "Evidence-Based Cognitive Restructuring",
      desc: "Structured cognitive behavioural therapy (CBT) and rational emotive behavioural therapy (REBT) frameworks designed to identify psychosomatic triggers, anxiety loops, and insomnia patterns.",
      benefit: "Reprograms chronic fight-or-flight sympathetic overdrive into parasympathetic restorative calm.",
      icon: <Brain className="w-5 h-5 text-indigo-600" />
    },
    {
      title: "Electro-Acupuncture",
      category: "Neuromuscular Stimulation",
      spec: "Calibrated Micro-Current",
      desc: "Safe micro-current electrical stimulation applied across needle pairs to enhance nervous system signaling, relieve deep muscle spasm, and accelerate tissue recovery.",
      benefit: "Highly effective for severe sciatica, disc herniation, and nerve rehabilitation.",
      icon: <Zap className="w-5 h-5 text-emerald-600" />
    },
    {
      title: "Laser Acupuncture (Needle-Free)",
      category: "Photobiomodulation",
      spec: "Painless Low-Level Laser",
      desc: "Painless, non-invasive low-level laser beam stimulating strategic acupoints without needles. Designed specifically for needle-sensitive individuals, children, and facial points.",
      benefit: "100% needle-free treatment with zero skin puncture sensation.",
      icon: <Sun className="w-5 h-5 text-amber-500" />
    }
  ];

  const stages = [
    {
      num: "01",
      title: "Pulse & Somatic Diagnostic Intake",
      desc: "We spend 15–20 minutes evaluating 14 radial pulse positions, lifestyle stressors, and tongue topography to locate exact meridian blockages."
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
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* =========================================================================
          HERO BANNER (SCROLL REVEALS & 3D NEEDLE SHOWCASE)
         ========================================================================= */}
      <section className="pt-20 pb-20 bg-ambient-light border-b border-gray-200/80 relative overflow-hidden">
        
        {/* Soft breathing aura in background */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#e02868]/10 rounded-full blur-[120px] pointer-events-none animate-breathe" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (7 cols): Editorial Narrative with Scroll Reveal */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs uppercase tracking-wider text-[#e02868] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#e02868]" />
                <span>The Arura Studio Origin & Ethos</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
                A quiet sanctuary for <br />
                <span className="text-[#e02868]">evidence-based holistic healing.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
                Established in Virugambakkam, Chennai by <strong className="text-gray-900 font-semibold">Dr. Nivedha Priyadharshini, MD (Acu)</strong>. Arura was founded on a singular conviction: chronic human suffering cannot be solved in five-minute visits with chemical palliatives.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
                <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Single-Use Sterile Needles</span>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#e02868]" />
                  <span>Cambridge Certified Psychotherapy</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column (5 cols): 3D Needle Object Showcase with Float Animation */}
            <motion.div 
              className="lg:col-span-5 perspective-container"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-3d-cutout rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-200/90 p-8 shadow-2xl relative overflow-hidden group animate-serene-float">
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#e02868]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={getAssetUrl('logo.png')} 
                      alt="Arura Wellness Studio Official Logo" 
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Clinical Standard</span>
                  </span>
                </div>

                <div className="py-6 flex flex-col items-center justify-center relative">
                  <div className="relative w-full max-w-[340px] flex items-center justify-center">
                    <img 
                      src={getAssetUrl('needles_cutout_3d.png')} 
                      alt="0.18mm Hair-Thin Surgical Acupuncture Needles 3D Cutout" 
                      className="w-full h-auto max-h-56 object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  <div className="mt-4 inline-flex items-center space-x-2 text-xs text-gray-800 font-semibold bg-gray-50/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#e02868]" />
                    <span>0.18mm Hair-Thin Surgical 316L Needles</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>Ethylene Oxide Pre-Sterilized</span>
                  <span className="font-semibold text-[#e02868]">Zero Reuse Guaranteed</span>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          NARRATIVE MANIFESTO SECTION (BIGGER PARAGRAPHS & SCROLL REVEAL ANIMATIONS)
         ========================================================================= */}
      <section className="py-20 lg:py-28 border-b border-gray-200/80 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Big Editorial Manifesto Typography with Scroll Reveal */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#e02868] font-bold font-mono">
                <span>[ WHY ARURA EXISTS ]</span>
              </div>
              
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b] leading-[1.15] tracking-tight">
                "The needle clears what the mind holds."
              </h2>
              
              {/* BIGGER, COMMANDING MANIFESTO PARAGRAPH (Per User Request) */}
              <div className="space-y-6 pt-2">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 font-medium leading-relaxed tracking-tight border-l-4 border-[#e02868] pl-5">
                  Modern medicine excels at acute surgical emergencies, but often fails patients with chronic, recurring health distress. When you struggle with chronic migraines, cervical pain, or IBS, you are often prescribed painkillers, muscle relaxants, and antacids that mask symptoms without resolving the source.
                </p>

                <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed pl-5">
                  At Arura, we observe the human body as an integrated neurological, biological, and psychological organism. By combining classical 14–meridian acupuncture with Cambridge clinical counselling, we address physical nerve inflammation and emotional stress simultaneously.
                </p>
              </div>

              {/* 3 Metric Anchors */}
              <div className="pt-4 flex items-center space-x-6 sm:space-x-8 text-xs border-t border-gray-100">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-[#09090b] font-display block">100%</span>
                  <span className="text-gray-500 font-medium">Single-Use Needles</span>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-[#e02868] font-display block">1-on-1</span>
                  <span className="text-gray-500 font-medium">Unhurried Care</span>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-emerald-700 font-display block">8+ Yrs</span>
                  <span className="text-gray-500 font-medium">Chennai Experience</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Visual 3-Stage Timeline with Staggered Scroll Reveal */}
            <motion.div 
              className="lg:col-span-6 space-y-4"
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs text-gray-500 uppercase tracking-wider block font-bold font-mono">
                [ THE 3 STAGES OF EVERY PATIENT SESSION ]
              </span>

              {stages.map((st, i) => (
                <motion.div 
                  key={st.num}
                  className="p-6 sm:p-7 rounded-2xl bg-[#f8fafc] border border-gray-200 hover:border-[#e02868] hover:bg-white hover:shadow-lg transition-all space-y-2 group"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-200 text-[#e02868] font-bold text-xs flex items-center justify-center font-mono group-hover:bg-[#e02868] group-hover:text-white transition-colors">
                      {st.num}
                    </span>
                    <h4 className="font-display text-lg font-bold text-[#09090b]">
                      {st.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed pl-11">
                    {st.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          CLINICAL MODALITIES (INTERACTIVE TABS WITH SCROLL REVEAL)
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            className="max-w-3xl space-y-3"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold font-mono">
              [ EVIDENCE-BASED MODALITIES ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b]">
              Techniques Deployed at Arura Studio
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
              Every technique is practiced strictly under hospital-grade aseptic standards as documented in our clinical framework:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Modality Selector Tabs */}
            <motion.div 
              className="lg:col-span-5 space-y-2.5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              {clinicalTechniques.map((tech, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTech(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between ${
                    selectedTech === idx
                      ? 'bg-[#e02868] text-white border-[#e02868] shadow-lg scale-[1.01]'
                      : 'bg-white text-gray-800 border-gray-200/80 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${selectedTech === idx ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {tech.icon}
                    </div>
                    <div>
                      <div className="font-display text-base font-bold">{tech.title}</div>
                      <div className={`text-xs ${selectedTech === idx ? 'text-pink-100' : 'text-gray-500'}`}>
                        {tech.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </button>
              ))}
            </motion.div>

            {/* Active Modality Clinical Dossier with Animate Presence */}
            <motion.div 
              className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-10 shadow-sm space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="border-b border-gray-100 pb-6 flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold block mb-1">
                    {clinicalTechniques[selectedTech].category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b]">
                    {clinicalTechniques[selectedTech].title}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-pink-50 text-[#e02868] text-xs font-bold border border-pink-200">
                  {clinicalTechniques[selectedTech].spec}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block">
                  Clinical Method & Mechanism:
                </span>
                <p className="text-base text-gray-700 leading-relaxed font-normal">
                  {clinicalTechniques[selectedTech].desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold block">
                  Documented Therapeutic Benefit:
                </span>
                <p className="text-sm text-emerald-950 font-semibold leading-relaxed">
                  {clinicalTechniques[selectedTech].benefit}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Strict single-use aseptic guarantee.</span>
                <Link
                  to="/booking"
                  className="px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#e02868] text-white hover:bg-[#c21e54] shadow-md flex items-center space-x-2 transition-all"
                >
                  <span>Book Consultation (₹600)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SANCTUARY LOCATION STRIP (SCROLL REVEAL)
         ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-[#09090b] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#e02868]/15 rounded-full blur-[90px] pointer-events-none" />

            <div className="space-y-3 text-center md:text-left relative z-10">
              <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold font-mono block">
                [ CLINICAL SANCTUARY ]
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                Chinmaya Nagar, Virugambakkam, Chennai
              </h3>
              <p className="text-sm text-gray-300 font-normal max-w-lg">
                Daily consultations from 10:00 AM to 8:00 PM. Private acoustic suites to protect patient confidentiality.
              </p>
            </div>

            <Link
              to="/booking"
              className="px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#e02868] text-white hover:bg-[#c21e54] whitespace-nowrap shadow-xl relative z-10 transition-all"
            >
              Book Private Consultation (₹600)
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
