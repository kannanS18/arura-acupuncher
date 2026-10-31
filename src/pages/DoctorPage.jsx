import React from 'react';
import { Award, GraduationCap, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Stethoscope, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import MeridianPulseWave from '../components/MeridianPulseWave';

export default function DoctorPage({ onOpenBooking }) {
  const credentials = [
    {
      code: "ACCRED-01",
      degree: "Doctor of Medicine in Classical Acupuncture — MD (Acu)",
      field: "Classical Meridian Medicine",
      institution: "14-Channel Pulse Diagnosis & Sterile Meridian Therapeutics",
      detail: "In-depth clinical mastery of traditional meridian bio-energetics, anatomical point selection, and therapeutic moxibustion."
    },
    {
      code: "ACCRED-02",
      degree: "Cambridge International Diploma in Teaching & Learning",
      field: "Patient Pedagogy",
      institution: "Cambridge University Recognized Framework",
      detail: "Structured clinical communication, transparent patient education, and clear symptom pathophysiology explanation."
    },
    {
      code: "ACCRED-03",
      degree: "Post Graduate Diploma in Counselling Therapy",
      field: "Evidence-Based Psychotherapy",
      institution: "Certified Cognitive Behavioral & REBT Psychotherapy",
      detail: "Trauma-informed counselling, autonomic nervous system down-regulation, and psychological stress resolution."
    }
  ];

  const clinicalSpecialties = [
    {
      code: "SPEC-01",
      category: "PHYSICAL DYSFUNCTION",
      title: "Musculoskeletal & Pain",
      items: [
        "Cervical Spondylosis & Neck Stiffness",
        "Lumbar Disc Compression & Sciatica",
        "Knee Osteoarthritis & Joint Immobility",
        "Frozen Shoulder & Repetitive Strain"
      ]
    },
    {
      code: "SPEC-02",
      category: "AUTONOMIC BALANCE",
      title: "Neurological & Stress",
      items: [
        "Chronic Migraine & Cluster Headaches",
        "Severe Insomnia & Sleep Disruption",
        "Clinical Anxiety, Panic & Executive Burnout",
        "Facial Bell's Palsy Rehabilitation"
      ]
    },
    {
      code: "SPEC-03",
      category: "SYSTEMIC HEALTH",
      title: "Metabolic & Hormonal",
      items: [
        "Irritable Bowel Syndrome & Digestive Issues",
        "PCOS, Dysmenorrhea & Cycle Irregularities",
        "Chronic Sinusitis & Respiratory Stagnation",
        "Chronic Fatigue & Post-Viral Energy Depletion"
      ]
    }
  ];

  return (
    <div className="bg-white text-ink min-h-screen">
      
      {/* 1. Doctor Profile Hero Banner */}
      <section className="relative bg-ink text-white pt-20 pb-20 lg:pt-28 lg:pb-24 border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Doctor Identity & Narrative with Scroll Reveal */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center space-x-2 text-xs text-brand font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span>Lead Clinical Director • Virugambakkam, Chennai</span>
              </div>

              {/* Doctor Name */}
              <div className="space-y-3">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                  Dr. Nivedha <br />
                  <span className="text-brand">Priyadharshini</span>
                </h1>
                <p className="text-sm sm:text-base font-semibold text-white/80">
                  MD (Acu), Cambridge Intl Dip., PG Dip. Counselling Therapy
                </p>
              </div>

              <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-2xl">
                Eight years of dedicated clinical practice integrating classical 14-meridian acupuncture with Cambridge evidence-based psychotherapy. Focused on eliminating chronic musculoskeletal pain and restoring autonomic nervous system equilibrium.
              </p>

              {/* Key Verification Badges in Banner with Animated Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white/50 block font-medium">Practice</span>
                  <span className="text-xl font-bold text-white block mt-0.5">
                    <AnimatedCounter end={8} suffix="+ Years" />
                  </span>
                  <span className="text-xs text-white/60">Clinical Experience</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white/50 block font-medium">Recoveries</span>
                  <span className="text-xl font-bold text-brand block mt-0.5">
                    <AnimatedCounter end={1100} suffix="+" />
                  </span>
                  <span className="text-xs text-white/60">Documented Patients</span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white/50 block font-medium">Protocol</span>
                  <span className="text-xl font-bold text-white block mt-0.5">
                    <AnimatedCounter end={100} suffix="%" />
                  </span>
                  <span className="text-xs text-white/60">Single-Use Sterile</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onOpenBooking('Consultation with Dr. Nivedha', 600)}
                  className="px-8 py-4 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark shadow-lg flex items-center justify-center space-x-2 transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50"
                >
                  <span>Book Consultation (₹600)</span>
                  <ArrowRight className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#credentials"
                  className="px-6 py-4 rounded-xl text-xs font-semibold text-white/80 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  View Clinical Dossier
                </a>
              </div>

            </motion.div>

            {/* Right Column: Authentic Doctor Credentials Card */}
            <motion.div 
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full max-w-md bg-white text-ink rounded-3xl border border-neutral-200 overflow-hidden relative shadow-2xl">
                
                {/* ID Card Top Header */}
                <div className="bg-ink px-6 py-4 text-white flex items-center justify-between border-b border-brand/30">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                    <span className="font-display font-bold text-sm tracking-wide">Clinical Verification</span>
                  </div>
                  <span className="text-xs text-brand font-semibold bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                    Verified Practitioner
                  </span>
                </div>

                {/* ID Card Main Body */}
                <div className="p-6 space-y-5 bg-white">
                  
                  {/* Photo & Key Info Row */}
                  <div className="flex items-start space-x-4">
                    <div className="w-28 h-32 rounded-2xl overflow-hidden border-2 border-brand flex-shrink-0 shadow-md bg-neutral-100 relative">
                      <img 
                        src={getAssetUrl('doctor_nivedha_portrait.jpg')} 
                        alt="Dr. Nivedha Priyadharshini"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <p className="text-xs text-neutral-500 font-medium">
                        Medical Practitioner
                      </p>
                      <h3 className="font-display text-lg font-bold text-ink leading-tight">
                        Dr. Nivedha Priyadharshini
                      </h3>
                      <p className="text-xs text-brand font-semibold">
                        Lead Clinical Acupuncturist
                      </p>
                      <p className="text-xs text-neutral-600 font-medium">
                        MD (Acu) • Reg # TN-ACU-2016
                      </p>
                      <div className="pt-1">
                        <span className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          Active Clinical Practice
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ID Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-neutral-100 bg-surface-subtle -mx-6 px-6">
                    <div>
                      <span className="text-xs text-neutral-500 block font-medium">Experience</span>
                      <span className="font-display text-base font-bold text-ink">8+ Years</span>
                      <span className="text-xs text-neutral-500 block">Classical Acupuncture</span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-500 block font-medium">Patients</span>
                      <span className="font-display text-base font-bold text-brand">1,100+ Recoveries</span>
                      <span className="text-xs text-neutral-500 block">Documented Cases</span>
                    </div>
                  </div>

                  {/* ID Academic Credentials */}
                  <div className="space-y-2 text-xs">
                    <span className="text-xs text-neutral-500 font-semibold block">
                      Accredited Specializations
                    </span>
                    <div className="space-y-1 text-neutral-700">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                        <span>14-Channel Classical Pulse & Meridian Therapy</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                        <span>Cambridge Intl Dip. in Teaching & Learning</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                        <span>PG Diploma in Counselling Therapy (CBT / REBT)</span>
                      </div>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-neutral-500 text-xs">
                    <span className="font-medium text-neutral-600">Arura Studio, Virugambakkam, Chennai</span>
                    <span className="text-emerald-700 font-medium">Consultations Daily</span>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>

        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-6">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* 2. Clinical Philosophy Section with Reveal */}
      <section className="py-20 lg:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: The Clinical Core Philosophy with Scroll Reveal */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="border-l-4 border-brand pl-6 space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink leading-tight">
                  “True physical recovery begins when we address the autonomic nervous system alongside the musculoskeletal injury.”
                </h2>
                <p className="text-xs text-neutral-500 font-medium">
                  — Dr. Nivedha Priyadharshini, MD (Acu)
                </p>
              </div>

              <div className="space-y-4 text-base text-neutral-600 font-normal leading-relaxed pt-2">
                <p>
                  In clinical practice, chronic physical symptoms like recurring cervical headaches, lumbar spasms, or gut hypersensitivity rarely occur in isolation from sympathetic overdrive, mental exhaustion, and unresolved emotional tension.
                </p>
                <p>
                  At Arura, Dr. Nivedha integrates the physical neuro-modulation of classical acupuncture with the emotional grounding of Cambridge-certified counselling. By stimulating precise meridian trigger points, we calm the fight-or-flight response, facilitate natural endorphin release, and guide patients back to restorative balance.
                </p>
              </div>
            </motion.div>

            {/* Right: The Dual-Pillar Integrative Medical Framework with Scroll Reveal */}
            <motion.div 
              className="lg:col-span-6 space-y-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-7 rounded-2xl bg-surface-subtle border border-neutral-200 hover:border-brand transition-colors duration-200 space-y-3">
                <div className="flex items-center space-x-3 text-brand">
                  <Stethoscope className="w-5 h-5 text-brand flex-shrink-0" />
                  <h3 className="font-display text-lg font-bold text-ink">
                    Pillar I: Classical 14-Meridian Acupuncture
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed pl-8">
                  Precise anatomical micro-needles stimulate localized nerve fibers, dilating micro-vasculature, dissipating lactic acid stagnation, and releasing muscle fascia tension across the cervical, lumbar, and joint pathways.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-surface-subtle border border-neutral-200 hover:border-brand transition-colors duration-200 space-y-3">
                <div className="flex items-center space-x-3 text-brand">
                  <HeartPulse className="w-5 h-5 text-brand flex-shrink-0" />
                  <h3 className="font-display text-lg font-bold text-ink">
                    Pillar II: Cambridge Evidence-Based Counselling
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed pl-8">
                  Cognitive and behavioral therapy (CBT/REBT) frameworks that identify and resolve psychosomatic stressors, sleep architecture disruptions, and autonomic sympathetic overdrive without pharmaceutical dependence.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-ink text-white space-y-3 border border-neutral-800">
                <div className="flex items-center space-x-3 text-brand">
                  <ShieldCheck className="w-5 h-5 text-brand flex-shrink-0" />
                  <h3 className="font-display text-lg font-bold text-white">
                    The Result: Restorative Root-Cause Recovery
                  </h3>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed pl-8">
                  Patients experience sustained relief from chronic pain and fatigue because both the physiological nerve pathways and the autonomic stress drivers are treated simultaneously.
                </p>
              </div>

            </motion.div>

          </div>

        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-6">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* 3. Credentials & Accreditations Section with Staggered Scroll Reveal */}
      <section id="credentials" className="py-20 lg:py-24 bg-surface-subtle border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-1">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                Clinical Credentials & Accreditations
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md">
              Authentic degrees, certifications, and clinical qualifications held by Dr. Nivedha Priyadharshini.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credentials.map((cred, idx) => (
              <motion.div 
                key={cred.code}
                className="p-7 rounded-2xl bg-white border border-neutral-200 hover:border-brand shadow-xs hover:shadow-md transition-colors duration-200 space-y-4 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-brand bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-md flex-shrink-0">
                      {cred.code}
                    </span>
                    <span className="text-xs text-neutral-500 text-right">
                      {cred.field}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-ink leading-snug">
                    {cred.degree}
                  </h3>
                  
                  <p className="text-xs font-semibold text-neutral-500">
                    {cred.institution}
                  </p>
                  
                  <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                    {cred.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center space-x-2 text-xs font-semibold text-brand">
                  <CheckCircle2 className="w-4 h-4 text-brand" />
                  <span>Verified Clinical Qualification</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-6">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* 4. Clinical Areas of Treatment with Staggered Scroll Reveal */}
      <section className="py-20 lg:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-1">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                Clinical Areas of Treatment
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md">
              Evidence-based applications of classical acupuncture and therapeutic counselling.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clinicalSpecialties.map((spec, idx) => (
              <motion.div 
                key={spec.code}
                className="p-8 rounded-2xl bg-surface-subtle border border-neutral-200 hover:border-brand hover:bg-white hover:shadow-lg transition-colors duration-200 space-y-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brand font-semibold">
                      {spec.category}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {spec.code}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {spec.title}
                  </h3>
                  
                  <ul className="space-y-3 pt-1">
                    {spec.items.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-neutral-700 flex items-start space-x-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <button
                    onClick={() => onOpenBooking(`Consultation for ${spec.title}`, 600)}
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-white hover:bg-brand text-neutral-800 hover:text-white border border-neutral-200 hover:border-brand transition-colors flex items-center justify-center space-x-2 shadow-xs motion-safe:active:scale-95"
                  >
                    <span>Schedule Evaluation</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-6">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* 5. Appointment Invitation Banner */}
      <section className="py-20 lg:py-24 bg-ink text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
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
