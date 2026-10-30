import React, { useState } from 'react';
import { ShieldCheck, Compass, CheckCircle2, ArrowRight, Sparkles, HeartPulse, Brain, Award, Clock, Activity, Zap, Sun, Disc, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINIC_INFO, ACUPUNCTURE_TECHNIQUES, COUNSELLING_METHODS } from '../data/websiteContent';

export default function AboutPage({ onOpenBooking }) {
  const [selectedTech, setSelectedTech] = useState(0);

  const clinicalTechniques = [
    {
      title: "Sterile Hair-Thin Needle Insertion",
      category: "Core Meridian Stimulation",
      spec: "0.18mm Surgical Steel",
      desc: "Hair-thin, single-use surgical needles placed at strategic meridian points to stimulate sensory nerves, boost micro-circulation, and trigger the release of the body's natural endorphins.",
      benefit: "Painless relief for chronic spondylosis, migraines, and nerve entrapments.",
      icon: <Activity className="w-5 h-5 text-[#581c87]" />
    },
    {
      title: "Moxibustion ('Moxa') Therapy",
      category: "Thermal Meridian Warming",
      spec: "Dried Natural Herb Sticks",
      desc: "Gentle thermal stimulation using dried mugwort herb held safely near needle points to warm meridians, dispel internal cold, and accelerate micro-vascular blood supply.",
      benefit: "Exceptional for joint stiffness, chronic fatigue, and abdominal digestion.",
      icon: <Flame className="w-5 h-5 text-amber-600" />
    },
    {
      title: "Glass Cupping Therapy",
      category: "Myofascial Decompression",
      spec: "Sterile Vacuum Glass Cups",
      desc: "Localized therapeutic suction created using smooth glass cups along back and neck meridians. Releases deep myofascial tension knots and relieves stubborn blood stagnation.",
      benefit: "Restores range of motion in trapezius spasms, sciatica, and back pain.",
      icon: <Disc className="w-5 h-5 text-indigo-600" />
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

  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Studio Origin Header with 3D Cut-Out Showcase */}
      <section className="pt-20 pb-20 bg-ambient-light border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (7 cols): Editorial Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs uppercase tracking-wider text-[#e02868] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Arura Studio Origin & Ethos</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
                A quiet sanctuary for <br />
                <span className="text-[#e02868]">evidence-based holistic healing.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
                Established in Virugambakkam, Chennai by Dr. Nivedha Priyadharshini, MD (Acu). Arura was founded on a singular conviction: chronic human suffering cannot be solved in five-minute visits with chemical palliatives.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
                <div className="flex items-center space-x-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Single-Use Sterile Needles</span>
                </div>
                <div className="flex items-center space-x-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#e02868]" />
                  <span>Cambridge Certified Psychotherapy</span>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): 3D Cut-Out Object & Floating Brand Showcase (No Empty Space) */}
            <div className="lg:col-span-5 perspective-container">
              <div className="card-3d-cutout rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-200/90 p-8 shadow-2xl relative overflow-hidden group">
                
                {/* Subtle Rose Glow Backdrop */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#e02868]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Badge: Recreated High-Res Brand Logo */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/logo.png" 
                      alt="Arura Wellness Studio Official Logo" 
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Clinical Standard</span>
                  </span>
                </div>

                {/* Center 3D Cut-Out: Isolated Acupuncture Needles */}
                <div className="py-6 flex flex-col items-center justify-center relative">
                  <div className="relative w-full max-w-[340px] flex items-center justify-center">
                    <img 
                      src="/needles_cutout_3d.png" 
                      alt="0.18mm Hair-Thin Surgical Acupuncture Needles 3D Cutout" 
                      className="w-full h-auto max-h-56 object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Floating Micro-Badge */}
                  <div className="mt-4 inline-flex items-center space-x-2 text-xs text-gray-800 font-semibold bg-gray-50/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#e02868]" />
                    <span>0.18mm Hair-Thin Surgical 316L Needles</span>
                  </div>
                </div>

                {/* Bottom Meta */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Ethylene Oxide Pre-Sterilized</span>
                  <span className="font-semibold text-[#e02868]">Zero Reuse Guaranteed</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Narrative Section: The Clinical Philosophy */}
      <section className="py-20 lg:py-28 border-b border-gray-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
                Why Arura Exists
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b] leading-tight">
                "The needle clears what the mind holds."
              </h2>
              <div className="space-y-4 text-base text-gray-700 font-normal leading-relaxed">
                <p>
                  Modern medicine excels at acute surgical emergencies, but often fails patients with chronic, recurring health distress. When you struggle with chronic migraines, cervical pain, or IBS, you are often prescribed painkillers, muscle relaxants, and antacids that mask symptoms without resolving the source.
                </p>
                <p>
                  At Arura, we observe the human body as an integrated neurological, biological, and psychological organism. By combining classical 14-meridian acupuncture with Cambridge clinical counselling, we address physical nerve inflammation and emotional stress simultaneously.
                </p>
              </div>

              <div className="pt-2 flex items-center space-x-6 text-xs">
                <div>
                  <span className="text-2xl font-bold text-[#09090b] font-display block">100%</span>
                  <span className="text-gray-600 font-medium">Single-Use Needles</span>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <span className="text-2xl font-bold text-[#e02868] font-display block">1-on-1</span>
                  <span className="text-gray-600 font-medium">Unhurried Private Care</span>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <span className="text-2xl font-bold text-emerald-700 font-display block">8+ Yrs</span>
                  <span className="text-gray-600 font-medium">Chennai Clinical Experience</span>
                </div>
              </div>
            </div>

            {/* Visual Timeline: The 3 Clinical Stages from Dr. Nivedha's Protocol */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs text-gray-500 uppercase tracking-wider block font-bold">
                The 3 Stages of Every Patient Session:
              </span>

              <div className="p-6 rounded-2xl bg-[#f8fafc] border border-gray-200/80 space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-pink-100 text-[#e02868] font-bold text-xs flex items-center justify-center">01</span>
                  <h4 className="font-display text-lg font-bold text-[#09090b]">Pulse & Somatic Diagnostic Intake</h4>
                </div>
                <p className="text-sm text-gray-600 font-normal leading-relaxed pl-11">
                  We spend 15–20 minutes evaluating 14 radial pulse positions, lifestyle stressors, and tongue topography to locate exact meridian blockages.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#f8fafc] border border-gray-200/80 space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-pink-100 text-[#e02868] font-bold text-xs flex items-center justify-center">02</span>
                  <h4 className="font-display text-lg font-bold text-[#09090b]">Micro-Needle Biological Stimulation</h4>
                </div>
                <p className="text-sm text-gray-600 font-normal leading-relaxed pl-11">
                  Using microscopic 0.18mm sterile surgical steel, strategic points are activated. Patients experience immediate nervous system relaxation and endorphin release.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#f8fafc] border border-gray-200/80 space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">03</span>
                  <h4 className="font-display text-lg font-bold text-[#09090b]">Psychological Integration & Home Care</h4>
                </div>
                <p className="text-sm text-gray-600 font-normal leading-relaxed pl-11">
                  Debriefing emotional and physical sensations, establishing posture and diet corrections, and reinforcing healthy nervous system regulation.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clinical Modalities Showcase directly from 17-Page PDF */}
      <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
              Evidence-Based Modalities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b]">
              Techniques Deployed at Arura Studio
            </h2>
            <p className="text-base text-gray-600 font-normal leading-relaxed">
              Every technique is practiced strictly under hospital-grade aseptic standards as documented in our clinical framework:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Modality Selector Tabs */}
            <div className="lg:col-span-5 space-y-2.5">
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
            </div>

            {/* Active Modality Clinical Dossier */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-10 shadow-sm space-y-6">
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
                  className="btn-luxury-dark hover:bg-[#e02868] hover:border-[#e02868] px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center space-x-2 transition-all"
                >
                  <span>Book Consultation (₹600)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Sanctuary Location Strip */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#09090b] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-pink-300 font-bold block">
                Visit Arura Studio
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                Chinmaya Nagar, Virugambakkam, Chennai
              </h3>
              <p className="text-sm text-gray-300 font-normal max-w-lg">
                Daily consultations from 10:00 AM to 8:00 PM. Private appointments only to protect patient confidentiality.
              </p>
            </div>

            <Link
              to="/booking"
              className="btn-shimmer px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#e02868] text-white hover:bg-[#c21e54] whitespace-nowrap shadow-xl"
            >
              Book Private Consultation (₹600)
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
