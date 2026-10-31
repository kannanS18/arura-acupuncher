import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, MapPin, PhoneCall, HeartPulse, Stethoscope, Droplets, Smile } from 'lucide-react';
import { CLINIC_INFO, DOS_DONTS } from '../data/websiteContent';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import MeridianPulseWave from '../components/MeridianPulseWave';
import StackedCards from '../components/ui/glass-cards';

export default function ClinicPage({ onOpenBooking }) {
  const clinicalTreatments = [
    {
      id: 1,
      code: "MED-01",
      title: "Initial Diagnostic Consultation & Pulse Mapping",
      subtitle: "First Visit Clinical Assessment",
      duration: "30 – 45 mins",
      fee: "₹600",
      feeNum: 600,
      image: "doctor_nivedha_portrait.jpg",
      badge: "Clinical Intake & Diagnostics",
      summary: "Comprehensive 14-radial pulse assessment and tongue diagnosis by Dr. Nivedha to pinpoint your original root imbalance before any needling begins.",
      description: "Comprehensive 14-radial pulse assessment and tongue diagnosis by Dr. Nivedha to pinpoint your original root imbalance before any needling begins.",
      features: [
        "14-Channel Radial Pulse Mapping",
        "Tongue Topography Analysis",
        "Autonomic Stress & Sleep Evaluation",
        "Personalized Treatment Roadmap"
      ],
      color: "rgba(224, 40, 104, 0.8)"
    },
    {
      id: 2,
      code: "MED-02",
      title: "Targeted Acupuncture Therapy",
      subtitle: "Meridian Pain & Autonomic Regulation",
      duration: "25 mins (Daily Cap: 50 Patients)",
      fee: "₹600",
      feeNum: 600,
      image: "authentic_acupuncture_needles.jpg",
      badge: "0.18mm Sterile Single-Use",
      summary: "Gentle insertion of hair-thin, 100% pre-sterilized disposable needles along designated meridian points, paired with soothing localized infrared TDP mineral heat.",
      description: "Gentle insertion of hair-thin, 100% pre-sterilized disposable needles along designated meridian points, paired with soothing localized infrared TDP mineral heat.",
      features: [
        "Ethylene-Oxide Pre-Sterilized Needles",
        "Single-Use Only (Opened at Bedside)",
        "TDP Mineral Infrared Heat Therapy",
        "Complimentary Glass Cupping / Moxa"
      ],
      color: "rgba(5, 150, 105, 0.8)"
    },
    {
      id: 3,
      code: "MED-03",
      title: "Clinical Psychotherapy Session",
      subtitle: "Cognitive & Emotional Equilibrium",
      duration: "50 mins",
      fee: "₹1,800",
      feeNum: 1800,
      image: "zen_treatment.jpg",
      badge: "Private Acoustic Suite",
      summary: "Unhurried, strictly confidential psychotherapy in our sound-dampened acoustic room, integrating Cambridge-aligned CBT, REBT, and nervous system regulation.",
      description: "Unhurried, strictly confidential psychotherapy in our sound-dampened acoustic room, integrating Cambridge-aligned CBT, REBT, and nervous system regulation.",
      features: [
        "Evidence-Based CBT & REBT Protocols",
        "Private Sound-Dampened Acoustic Suite",
        "Somatic Autonomic De-escalation",
        "100% Strict Confidential Medical Ethics"
      ],
      color: "rgba(88, 28, 135, 0.8)"
    },
    {
      id: 4,
      code: "MED-04",
      title: "Integrated Mind-Body Dual Session",
      subtitle: "Psychotherapy + Full Precision Needling",
      duration: "75 – 90 mins",
      fee: "₹2,400",
      feeNum: 2400,
      image: "acu_treatment1.jpg",
      badge: "Dual Multi-System Synergy",
      summary: "Our complete holistic treatment combining 40 minutes of cognitive dialogue with immediate full-body meridian acupuncture to dismantle chronic pain-spasm cycles.",
      description: "Our complete holistic treatment combining 40 minutes of cognitive dialogue with immediate full-body meridian acupuncture to dismantle chronic pain-spasm cycles.",
      features: [
        "40 Min Focused Psychotherapy Dialogue",
        "Full-Body Classical Meridian Needling",
        "Vagus Nerve & Parasympathetic Reset",
        "Personalized At-Home Posture & Diet Guide"
      ],
      color: "rgba(67, 56, 202, 0.8)"
    }
  ];

  return (
    <div className="bg-white text-ink min-h-screen">
      
      {/* 1. Dignified Medical Header Banner */}
      <section className="pt-20 pb-16 bg-surface-subtle border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs text-brand font-semibold tracking-normal"
          >
            Arura Wellness Sanctuary, Virugambakkam
          </motion.p>

          <div className="max-w-3xl space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.15]"
            >
              Clinical Modalities <br />
              <span className="text-brand">& Consultation Tariff</span>
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

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-6">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* 2. Clinical Treatments: Stacking Electric Glass Cards (GSAP) */}
      <section className="py-20 lg:py-28 bg-white text-ink border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <p className="text-xs text-brand font-semibold tracking-normal">
                Transparent Sanctuary Tariff
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mt-2">
                Treatment Modalities & Procedures
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md font-medium">
              Hospital-grade sterile single-use needles, infrared heat, and pulse diagnostics are unconditionally included.
            </p>
          </div>

          {/* Stacking Electric Glass Cards with GSAP ScrollTrigger (White Background) */}
          <StackedCards items={clinicalTreatments} onOpenBooking={onOpenBooking} />

        </div>
      </section>

      {/* 3. Patient Guidelines: DOs and DON'Ts */}
      <section className="py-20 lg:py-24 bg-surface-subtle border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-2"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
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
                <h3 className="font-display text-xl sm:text-2xl font-bold">Clinical DON’Ts</h3>
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
            className="bg-ink text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
          >
            <div className="space-y-3 text-center md:text-left">
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                {CLINIC_INFO.address}
              </h3>
              <p className="text-sm text-gray-300 font-normal max-w-lg">
                Daily clinical consultations from 10:00 AM to 8:00 PM. Prior appointment booking required to preserve private acoustic suite confidentiality.
              </p>
            </div>

            <Link
              to="/booking"
              className="btn-shimmer px-8 py-4 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark whitespace-nowrap shadow-xl"
            >
              Book In-Clinic Session (₹600)
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
