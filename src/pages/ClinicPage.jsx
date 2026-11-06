import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, MapPin, PhoneCall, HeartPulse, Stethoscope, Droplets, Smile } from 'lucide-react';
import { CLINIC_INFO, DOS_DONTS } from '../data/websiteContent';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import StackedCards from '../components/ui/glass-cards';
import { CardDeck } from '../components/card-deck';
import FaqSection from '../components/FaqSection';

export default function ClinicPage({ onOpenBooking }) {
  const clinicalTreatments = [
    {
      id: "1",
      code: "01 / 04",
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
      id: "2",
      code: "02 / 04",
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
      id: "3",
      code: "03 / 04",
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
      id: "4",
      code: "04 / 04",
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
      </section>

      {/* 2. Clinical Treatments */}
      {/* Desktop Version: Stacking Electric Glass Cards (GSAP) */}
      <div className="hidden md:block">
        <StackedCards items={clinicalTreatments} onOpenBooking={onOpenBooking} />
      </div>

      {/* Mobile Version: Tactile Hairline UI CardDeck */}
      <section className="block md:hidden py-12 bg-surface-subtle border-b border-gray-200/80 overflow-hidden">
        <div className="max-w-md mx-auto px-4 space-y-6">
          <div className="text-center space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 px-3 py-1 rounded-full shadow-2xs">
              Interactive clinical modalities
            </span>
            <h2 className="font-display text-2xl font-bold text-ink">
              Clinical Treatments
            </h2>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Swipe or flick cards to explore Dr. Nivedha's clinical therapies in sequence.
            </p>
          </div>

          <CardDeck
            items={clinicalTreatments}
            height={490}
            label="Clinical treatments deck"
            renderCard={(treatment) => (
              <div className="h-full flex flex-col justify-between bg-white text-ink select-none relative overflow-hidden">
                {/* Top Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={getAssetUrl(treatment.image)}
                    alt={treatment.title}
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Code Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {treatment.code}
                  </span>

                  {/* Fee Badge */}
                  <span className="absolute top-3 right-3 px-3 py-0.5 rounded-full text-xs font-bold bg-brand text-white shadow-sm">
                    {treatment.fee}
                  </span>

                  {/* Subtitle & Duration on Image */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-white/95 text-[11px] truncate">
                      {treatment.badge}
                    </span>
                    <span className="text-[11px] text-white/80 shrink-0 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-white/70" />
                      {treatment.duration}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-ink leading-snug line-clamp-2">
                      {treatment.title}
                    </h3>
                    <p className="text-[11.5px] text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                      {treatment.summary}
                    </p>
                  </div>

                  {/* Key Clinical Features */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    {treatment.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Booking Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      data-deck-no-drag
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenBooking) {
                          onOpenBooking(treatment.title, treatment.feeNum);
                        } else {
                          window.location.hash = '#/booking';
                        }
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-ink text-white hover:bg-brand text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer active:scale-95"
                    >
                      <span>Reserve Session ({treatment.fee})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          />
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
              className="p-8 rounded-2xl bg-white border border-neutral-200 space-y-6"
            >
              <div className="flex items-center space-x-3 text-ink border-b border-neutral-100 pb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display text-xl font-bold">Clinical DOs</h3>
              </div>
              <div className="space-y-4">
                {DOS_DONTS.dos.map((d, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-semibold text-neutral-900">{d.title}</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{d.desc}</p>
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
              className="p-8 rounded-2xl bg-white border border-neutral-200 space-y-6"
            >
              <div className="flex items-center space-x-3 text-ink border-b border-neutral-100 pb-4">
                <AlertCircle className="w-5 h-5 text-neutral-400" />
                <h3 className="font-display text-xl font-bold">Clinical DON’Ts</h3>
              </div>
              <div className="space-y-4">
                {DOS_DONTS.donts.map((d, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-semibold text-neutral-900">{d.title}</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. Hairline UI FAQ Knowledge Section */}
      <FaqSection />

      {/* 5. Clinic Sanctuary Location & Immediate Booking Card */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-ink text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800"
          >
            <div className="space-y-3 text-center md:text-left">
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                {CLINIC_INFO.address}
              </h3>
              <p className="text-sm text-neutral-300 font-normal max-w-lg">
                Daily clinical consultations from 10:00 AM to 8:00 PM. Prior appointment booking required to preserve private acoustic suite confidentiality.
              </p>
            </div>

            <Link
              to="/booking"
              className="px-6 py-3 rounded-full text-xs font-medium bg-brand text-white hover:bg-brand-dark whitespace-nowrap transition-colors"
            >
              Book In-Clinic Session (₹600)
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
