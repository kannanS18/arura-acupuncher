import React from 'react';
import { Award, GraduationCap, ShieldCheck, ArrowRight, CheckCircle2, Stethoscope, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import DoctorIdCard from '../components/DoctorIdCard';
import DoctorPhilosophySection from '../components/DoctorPhilosophySection';
import DoctorCredentialsSection from '../components/DoctorCredentialsSection';
import DoctorTreatmentAreasSection from '../components/DoctorTreatmentAreasSection';

export default function DoctorPage({ onOpenBooking }) {
  return (
    <div className="bg-white text-ink min-h-screen">
      
      {/* 1. Doctor Profile Hero Banner */}
      <section className="relative bg-ink text-white pt-20 pb-20 lg:pt-28 lg:pb-24 border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Doctor Identity & Narrative */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0.85, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand text-sm font-semibold border border-white/10 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>BEST ACUPUNCTURE DOCTOR IN CHENNAI • VIRUGAMBAKKAM</span>
              </div>

              {/* Doctor Name */}
              <div className="space-y-3">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                  Dr. Nivedha <br />
                  <span className="text-brand">Priyadharshini</span>
                </h1>
                <p className="text-base sm:text-lg font-semibold text-white/90">
                  Acupuncture Specialist • MD (Acu), Cambridge Intl Dip., PG Dip. Counselling Therapy
                </p>
              </div>

              <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-2xl">
                Recognized as one of the best acupuncture doctors and pain management specialists in Chennai. Over 8 years of dedicated clinical practice integrating classical 14-meridian acupuncture with Cambridge evidence-based psychotherapy. Specialized in natural pain relief for chronic back pain, cervical neck stiffness, sciatica, migraines, and autonomic burnout.
              </p>

              {/* Key Verification Badges in Banner with Animated Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs sm:text-sm text-white/60 block font-medium">Practice</span>
                  <span className="text-2xl font-bold text-white block mt-0.5">
                    <AnimatedCounter end={8} suffix="+ Years" />
                  </span>
                  <span className="text-xs sm:text-sm text-white/70">Clinical Experience</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs sm:text-sm text-white/60 block font-medium">Recoveries</span>
                  <span className="text-2xl font-bold text-brand block mt-0.5">
                    <AnimatedCounter end={1100} suffix="+" />
                  </span>
                  <span className="text-xs sm:text-sm text-white/70">Documented Patients</span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs sm:text-sm text-white/60 block font-medium">Protocol</span>
                  <span className="text-2xl font-bold text-white block mt-0.5">
                    <AnimatedCounter end={100} suffix="%" />
                  </span>
                  <span className="text-xs sm:text-sm text-white/70">Single-Use Sterile</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onOpenBooking('Consultation with Dr. Nivedha', 600)}
                  className="px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-brand text-white hover:bg-brand-dark shadow-lg flex items-center justify-center space-x-2 transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 cursor-pointer"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#credentials"
                  className="px-7 py-4 rounded-xl text-sm sm:text-base font-bold text-white/90 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  View Clinical Dossier
                </a>
              </div>

            </motion.div>

            {/* Right Column: Authentic Interactive Doctor ID Card (21st.dev + Hairline UI) */}
            <motion.div 
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0.9, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <DoctorIdCard />
            </motion.div>

          </div>

        </div>
      </section>

      {/* 2. Clinical Philosophy Section (21st.dev + Hairline UI Architecture) */}
      <DoctorPhilosophySection />

      {/* 3. Credentials & Accreditations Section (21st.dev + Hairline UI Architecture) */}
      <DoctorCredentialsSection />

      {/* 4. Clinical Areas of Treatment (21st.dev + Hairline UI Architecture) */}
      <DoctorTreatmentAreasSection onOpenBooking={onOpenBooking} />

      {/* 5. Appointment Invitation Banner */}
      <section className="py-20 lg:py-24 bg-ink text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0.9, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Schedule Your Evaluation with Dr. Nivedha
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed font-normal">
              Private 1-on-1 pulse evaluation, comprehensive medical history, and gentle needle therapy at Arura Acupuncture & Counselling Centre, Virugambakkam, Chennai.
            </p>
            <div className="pt-2">
              <Link
                to="/booking"
                className="px-8 py-4 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark shadow-lg inline-flex items-center space-x-2 transition-colors duration-200 motion-safe:active:scale-[0.98]"
              >
                <span>Book Consultation with Dr. Nivedha (₹600)</span>
                <ArrowRight className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
