import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, MapPin, PhoneCall, HeartPulse, Stethoscope, Droplets, Smile } from 'lucide-react';
import { CLINIC_INFO, DOS_DONTS } from '../data/websiteContent';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';

export default function ClinicPage({ onOpenBooking }) {
  const clinicalTreatments = [
    {
      code: "MED-01",
      title: "Initial Diagnostic Consultation & Pulse Mapping",
      subtitle: "First Visit Clinical Assessment",
      duration: "30 – 45 mins",
      fee: "₹600",
      feeNum: 600,
      image: "doctor_nivedha_portrait.jpg",
      badge: "Clinical Intake & Diagnostics",
      summary: "Comprehensive 14-radial pulse assessment and tongue diagnosis by Dr. Nivedha to pinpoint your original root imbalance before any needling begins.",
      features: [
        "14-Channel Radial Pulse Mapping",
        "Tongue Topography Analysis",
        "Autonomic Stress & Sleep Evaluation",
        "Personalized Treatment Roadmap"
      ]
    },
    {
      code: "MED-02",
      title: "Targeted Acupuncture Therapy",
      subtitle: "Meridian Pain & Autonomic Regulation",
      duration: "25 mins (Daily Cap: 50 Patients)",
      fee: "₹600",
      feeNum: 600,
      image: "authentic_acupuncture_needles.jpg",
      badge: "0.18mm Sterile Single-Use",
      summary: "Gentle insertion of hair-thin, 100% pre-sterilized disposable needles along designated meridian points, paired with soothing localized infrared TDP mineral heat.",
      features: [
        "Ethylene-Oxide Pre-Sterilized Needles",
        "Single-Use Only (Opened at Bedside)",
        "TDP Mineral Infrared Heat Therapy",
        "Complimentary Glass Cupping / Moxa"
      ]
    },
    {
      code: "MED-03",
      title: "Clinical Psychotherapy Session",
      subtitle: "Cognitive & Emotional Equilibrium",
      duration: "50 mins",
      fee: "₹1,800",
      feeNum: 1800,
      image: "zen_treatment.jpg",
      badge: "Private Acoustic Suite",
      summary: "Unhurried, strictly confidential psychotherapy in our sound-dampened acoustic room, integrating Cambridge-aligned CBT, REBT, and nervous system regulation.",
      features: [
        "Evidence-Based CBT & REBT Protocols",
        "Private Sound-Dampened Acoustic Suite",
        "Somatic Autonomic De-escalation",
        "100% Strict Confidential Medical Ethics"
      ]
    },
    {
      code: "MED-04",
      title: "Integrated Mind-Body Dual Session",
      subtitle: "Psychotherapy + Full Precision Needling",
      duration: "75 – 90 mins",
      fee: "₹2,400",
      feeNum: 2400,
      image: "acu_treatment1.jpg",
      badge: "Dual Multi-System Synergy",
      summary: "Our complete holistic treatment combining 40 minutes of cognitive dialogue with immediate full-body meridian acupuncture to dismantle chronic pain-spasm cycles.",
      features: [
        "40 Min Focused Psychotherapy Dialogue",
        "Full-Body Classical Meridian Needling",
        "Vagus Nerve & Parasympathetic Reset",
        "Personalized At-Home Posture & Diet Guide"
      ]
    }
  ];

  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* 1. Dignified Medical Header Banner */}
      <section className="pt-20 pb-16 bg-[#f8fafc] border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs uppercase tracking-wider text-[#e02868] font-bold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Arura Wellness Sanctuary • Virugambakkam, Chennai</span>
          </motion.div>

          <div className="max-w-3xl space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.15]"
            >
              Clinical Modalities <br />
              <span className="text-[#e02868]">& Consultation Tariff</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl"
            >
              Every treatment is conducted in private acoustic suites using 100% single-use sterile needles and unhurried clinical attention. Transparent tariffs with zero hidden charges.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. Clinical Treatments with Authentic Photography & Scroll Reveal */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
                Transparent Fee Schedule
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b]">
                Treatment Modalities & Procedures
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              Hospital-grade sterile single-use needles, infrared heat, and pulse diagnostics are unconditionally included.
            </p>
          </div>

          {/* Treatment Cards Grid with Relevant Medical Photos */}
          <div className="space-y-12">
            {clinicalTreatments.map((treatment, idx) => (
              <motion.div
                key={treatment.code}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#f8fafc] rounded-3xl border border-gray-200 hover:border-[#e02868]/40 hover:shadow-xl transition-all overflow-hidden flex flex-col lg:flex-row group"
              >
                {/* Treatment Authentic Photo */}
                <div className="lg:w-5/12 relative min-h-[260px] sm:min-h-[300px] overflow-hidden bg-gray-100">
                  <img
                    src={getAssetUrl(treatment.image)}
                    alt={treatment.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:hidden" />
                  
                  {/* Visual Status Tag on Image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#09090b]/80 backdrop-blur-md text-white border border-white/20 shadow-md">
                      {treatment.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 lg:hidden text-white">
                    <span className="text-xs font-bold text-pink-300 uppercase tracking-wider block">{treatment.code}</span>
                    <span className="text-sm font-semibold">{treatment.duration}</span>
                  </div>
                </div>

                {/* Treatment Details & Fee */}
                <div className="lg:w-7/12 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#e02868] bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-md">
                          {treatment.code}
                        </span>
                        <span className="hidden lg:inline-flex items-center space-x-1 text-xs text-gray-500 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{treatment.duration}</span>
                        </span>
                      </div>

                      {/* Fee Highlight */}
                      <div className="text-right">
                        <span className="font-display text-3xl font-bold text-[#09090b] group-hover:text-[#e02868] transition-colors">
                          {treatment.fee}
                        </span>
                        <span className="text-[11px] text-gray-500 block">per session</span>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b] group-hover:text-[#e02868] transition-colors">
                      {treatment.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                      {treatment.summary}
                    </p>

                    {/* Features checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {treatment.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-medium truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-gray-500">
                      Standard consultation fee. No hidden medicine markups.
                    </div>

                    <button
                      onClick={() => onOpenBooking ? onOpenBooking(treatment.title, treatment.feeNum) : window.location.href = '#/booking'}
                      className="btn-luxury-dark group-hover:bg-[#e02868] group-hover:border-[#e02868] px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center space-x-2 transition-all shadow-xs"
                    >
                      <span>Book This Modality</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Patient Guidelines: DOs and DON'Ts (Clean, Spacious, Uncluttered) */}
      <section className="py-20 lg:py-24 bg-[#f8fafc] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-2"
          >
            <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
              Treatment Protocol
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b]">
              Preparation & Home Care Guidelines
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal">
              Clear clinical guidelines from Dr. Nivedha to ensure maximum therapeutic benefit from your session.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DOs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-white border border-emerald-200 shadow-xs space-y-6"
            >
              <div className="flex items-center space-x-3 text-emerald-800 border-b border-emerald-100 pb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h3 className="font-display text-xl sm:text-2xl font-bold">Clinical DOs</h3>
              </div>
              <div className="space-y-4">
                {DOS_DONTS.dos.map((d, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">{d.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DON'Ts */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl bg-white border border-amber-200 shadow-xs space-y-6"
            >
              <div className="flex items-center space-x-3 text-amber-900 border-b border-amber-100 pb-4">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <h3 className="font-display text-xl sm:text-2xl font-bold">Clinical DON'Ts</h3>
              </div>
              <div className="space-y-4">
                {DOS_DONTS.donts.map((d, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">{d.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. Clinic Sanctuary Location & Immediate Booking Card */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#09090b] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
          >
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-pink-300 font-bold block">
                Sanctuary Address
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                {CLINIC_INFO.address}
              </h3>
              <p className="text-sm text-gray-300 font-normal max-w-lg">
                Daily clinical consultations from 10:00 AM to 8:00 PM. Prior appointment booking required to preserve private acoustic suite confidentiality.
              </p>
            </div>

            <Link
              to="/booking"
              className="btn-shimmer px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#e02868] text-white hover:bg-[#c21e54] whitespace-nowrap shadow-xl"
            >
              Book In-Clinic Session (₹600)
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
