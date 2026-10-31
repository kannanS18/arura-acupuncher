import React from 'react';
import { Award, GraduationCap, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, UserCheck, Stethoscope, HeartPulse, FileText, QrCode } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
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
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* =========================================================================
          BANNER: DOCTOR NAME ON LEFT & AUTHENTIC CLINICAL ID BADGE ON RIGHT
          (Deep obsidian #09090b, solid #e02868 pink, NO GRADIENT, strictly on-palette)
         ========================================================================= */}
      <section className="relative bg-[#09090b] text-white pt-24 pb-20 lg:pt-28 lg:pb-24 border-b border-white/10 overflow-hidden">
        
        {/* Subtle Brand Ambient Rose Glow (Solid #e02868 tone, no multi-color gradient) */}
        <div className="absolute top-10 right-1/3 w-96 h-96 bg-[#e02868]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Doctor Identity & Clinical Presentation */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-wider text-[#e02868] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#e02868]" />
                <span>Lead Clinical Director • Virugambakkam, Chennai</span>
              </div>

              {/* Doctor Name: Solid White and Solid #e02868 (NO GRADIENTS) */}
              <div className="space-y-3">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                  Dr. Nivedha <br />
                  <span className="text-[#e02868]">
                    Priyadharshini
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base font-semibold text-white/80 tracking-wide">
                  MD (Acu) • Cambridge Intl Dip. • PG Dip. Counselling Therapy
                </p>
              </div>

              <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-2xl">
                Eight years of dedicated clinical practice integrating classical 14-meridian acupuncture with Cambridge evidence-based psychotherapy. Focused on eliminating chronic musculoskeletal pain and restoring autonomic nervous system equilibrium.
              </p>

              {/* Key Verification Badges in Banner with Animated Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-white/50 block font-mono">PRACTICE</span>
                  <span className="text-xl font-bold text-white block mt-0.5">
                    <AnimatedCounter end={8} suffix="+ Years" />
                  </span>
                  <span className="text-xs text-white/60">Clinical Experience</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-white/50 block font-mono">RECOVERIES</span>
                  <span className="text-xl font-bold text-[#e02868] block mt-0.5">
                    <AnimatedCounter end={1100} suffix="+" />
                  </span>
                  <span className="text-xs text-white/60">Documented Patients</span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-white/50 block font-mono">PROTOCOL</span>
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
                  className="btn-luxury-pink px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#e02868] text-white hover:bg-[#c21e54] shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95"
                >
                  <span>Book Consultation with Dr. Nivedha (₹600)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#credentials"
                  className="px-6 py-4 rounded-xl text-xs uppercase tracking-wider font-semibold text-white/80 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-center"
                >
                  View Clinical Dossier ↓
                </a>
              </div>

            </div>

            {/* Right Column: Authentic Doctor ID Card Badge with Calm Levitation (ZERO Tilt) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white text-[#09090b] rounded-3xl shadow-2xl border-2 border-white/20 overflow-hidden relative animate-pure-float">
                
                {/* Lanyard Slot Hole at Top */}
                <div className="bg-[#09090b] pt-3 pb-2 flex justify-center border-b border-gray-800">
                  <div className="w-16 h-2 rounded-full bg-gray-700 border border-gray-600" />
                </div>

                {/* ID Card Top Header */}
                <div className="bg-[#09090b] px-6 py-4 text-white flex items-center justify-between border-b border-[#e02868]/30">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e02868]" />
                    <span className="font-display font-bold text-sm tracking-wider uppercase">ARURA CLINICAL ID</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#e02868] font-bold uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    VERIFIED
                  </span>
                </div>

                {/* ID Card Main Body */}
                <div className="p-6 space-y-5 bg-[#ffffff]">
                  
                  {/* Photo & Key Info Row */}
                  <div className="flex items-start space-x-4">
                    {/* Doctor Portrait Photo */}
                    <div className="w-28 h-32 rounded-2xl overflow-hidden border-2 border-[#e02868] flex-shrink-0 shadow-md bg-gray-100 relative">
                      <img 
                        src={getAssetUrl('doctor_nivedha_portrait.jpg')} 
                        alt="Dr. Nivedha Priyadharshini"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* ID Details */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold block">
                        MEDICAL PRACTITIONER
                      </span>
                      <h3 className="font-display text-lg font-bold text-[#09090b] leading-tight">
                        Dr. Nivedha Priyadharshini
                      </h3>
                      <p className="text-xs text-[#e02868] font-bold">
                        Lead Clinical Acupuncturist
                      </p>
                      <p className="text-[11px] text-gray-600 font-medium">
                        MD (Acu) • Reg # TN-ACU-2016
                      </p>
                      <div className="pt-1">
                        <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          ● Active Clinical Practice
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ID Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 bg-[#f8fafc] -mx-6 px-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">EXPERIENCE</span>
                      <span className="font-display text-base font-bold text-[#09090b]">8+ Years</span>
                      <span className="text-[10px] text-gray-500 block">Classical Acupuncture</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">PATIENTS</span>
                      <span className="font-display text-base font-bold text-[#e02868]">1,100+ Recoveries</span>
                      <span className="text-[10px] text-gray-500 block">Documented Cases</span>
                    </div>
                  </div>

                  {/* ID Academic Credentials */}
                  <div className="space-y-1.5 text-xs">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-bold block">
                      ACCREDITED SPECIALIZATIONS
                    </span>
                    <div className="space-y-1 text-gray-700 text-[11px]">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e02868] flex-shrink-0" />
                        <span>14-Channel Classical Pulse & Meridian Therapy</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e02868] flex-shrink-0" />
                        <span>Cambridge Intl Dip. in Teaching & Learning</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e02868] flex-shrink-0" />
                        <span>PG Diploma in Counselling Therapy (CBT / REBT)</span>
                      </div>
                    </div>
                  </div>

                  {/* ID Card Footer with Security Barcode Strip */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-gray-500">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono tracking-wider uppercase block text-gray-400">CLINICAL LOCATION</span>
                      <span className="text-[10px] font-bold text-gray-700">Virugambakkam, Chennai</span>
                    </div>
                    {/* Simulated Clean Medical Barcode */}
                    <div className="flex items-center space-x-1 font-mono text-[9px] tracking-widest text-gray-400">
                      <span>||||||| | ||||| || ||||||</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-6">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 01: CLINICAL PHILOSOPHY (BALANCED 2-COLUMN ARRANGED LAYOUT)
         ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: The Clinical Core Philosophy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#e02868] font-bold font-mono">
                <span>[ 01 / CLINICAL PHILOSOPHY ]</span>
              </div>
              
              <div className="border-l-4 border-[#e02868] pl-6 space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#09090b] leading-tight">
                  "True physical recovery begins when we address the autonomic nervous system alongside the musculoskeletal injury."
                </h2>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block font-semibold">
                  — Dr. Nivedha Priyadharshini, MD (Acu)
                </span>
              </div>

              <div className="space-y-4 text-base text-gray-600 font-normal leading-relaxed pt-2">
                <p>
                  In clinical practice, chronic physical symptoms like recurring cervical headaches, lumbar spasms, or gut hypersensitivity rarely occur in isolation from sympathetic overdrive, mental exhaustion, and unresolved emotional tension.
                </p>
                <p>
                  At Arura, Dr. Nivedha integrates the physical neuro-modulation of classical acupuncture with the emotional grounding of Cambridge-certified counselling. By stimulating precise meridian trigger points, we calm the fight-or-flight response, facilitate natural endorphin release, and guide patients back to restorative balance.
                </p>
              </div>
            </div>

            {/* Right: The Dual-Pillar Integrative Medical Framework */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="p-7 rounded-2xl bg-[#f8fafc] border border-gray-200 hover:border-[#e02868] transition-all space-y-3">
                <div className="flex items-center space-x-3 text-[#e02868]">
                  <Stethoscope className="w-5 h-5 text-[#e02868] flex-shrink-0" />
                  <h3 className="font-display text-lg font-bold text-[#09090b]">
                    Pillar I: Classical 14-Meridian Acupuncture
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed pl-8">
                  Precise anatomical micro-needles stimulate localized nerve fibers, dilating micro-vasculature, dissipating lactic acid stagnation, and releasing muscle fascia tension across the cervical, lumbar, and joint pathways.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#f8fafc] border border-gray-200 hover:border-[#e02868] transition-all space-y-3">
                <div className="flex items-center space-x-3 text-[#e02868]">
                  <HeartPulse className="w-5 h-5 text-[#e02868] flex-shrink-0" />
                  <h3 className="font-display text-lg font-bold text-[#09090b]">
                    Pillar II: Cambridge Evidence-Based Counselling
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed pl-8">
                  Cognitive and behavioral therapy (CBT/REBT) frameworks that identify and resolve psychosomatic stressors, sleep architecture disruptions, and autonomic sympathetic overdrive without pharmaceutical dependence.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#09090b] text-white space-y-3 border border-gray-800">
                <div className="flex items-center space-x-3 text-[#e02868]">
                  <ShieldCheck className="w-5 h-5 text-[#e02868] flex-shrink-0" />
                  <h3 className="font-display text-lg font-bold text-white">
                    The Result: Restorative Root-Cause Recovery
                  </h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed pl-8">
                  Patients experience sustained relief from chronic pain and fatigue because both the physiological nerve pathways and the autonomic stress drivers are treated simultaneously.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-6">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: CLINICAL CREDENTIALS & ACCREDITATIONS (ARRANGED GRID DOSSIER)
         ========================================================================= */}
      <section id="credentials" className="py-20 lg:py-24 bg-[#f8fafc] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold font-mono">
                [ 02 / ACADEMIC & MEDICAL RECORD ]
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b]">
                Clinical Credentials & Accreditations
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              Authentic degrees, certifications, and clinical qualifications held by Dr. Nivedha Priyadharshini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credentials.map((cred) => (
              <div 
                key={cred.code}
                className="p-7 rounded-2xl bg-white border border-gray-200 hover:border-[#e02868] shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#e02868] bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-md flex-shrink-0">
                      {cred.code}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider text-right">
                      {cred.field}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-[#09090b] leading-snug">
                    {cred.degree}
                  </h3>
                  
                  <p className="text-xs font-semibold text-gray-500">
                    {cred.institution}
                  </p>
                  
                  <p className="text-xs text-gray-600 leading-relaxed pt-1">
                    {cred.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center space-x-2 text-xs font-semibold text-[#e02868]">
                  <CheckCircle2 className="w-4 h-4 text-[#e02868]" />
                  <span>Verified Clinical Qualification</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-6">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: CLINICAL AREAS OF TREATMENT (ARRANGED MEDICAL MODALITIES)
         ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold font-mono">
                [ 03 / PRIMARY MODALITIES ]
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b]">
                Clinical Areas of Treatment
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              Evidence-based applications of classical acupuncture and therapeutic counselling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clinicalSpecialties.map((spec) => (
              <div 
                key={spec.code}
                className="p-8 rounded-2xl bg-[#f8fafc] border border-gray-200 hover:border-[#e02868] hover:bg-white hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-[#e02868] uppercase font-bold">
                      {spec.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {spec.code}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-[#09090b]">
                    {spec.title}
                  </h3>
                  
                  <ul className="space-y-3 pt-1">
                    {spec.items.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-gray-700 flex items-start space-x-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e02868] mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => onOpenBooking(`Consultation for ${spec.title}`, 600)}
                    className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-white hover:bg-[#e02868] text-gray-800 hover:text-white border border-gray-200 hover:border-[#e02868] transition-all flex items-center justify-center space-x-2 shadow-xs"
                  >
                    <span>Schedule Evaluation →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-6">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: APPOINTMENT INVITATION (CLEAN & DIGNIFIED)
         ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#09090b] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-wider text-[#e02868] font-mono font-bold">
            [ UNHURRIED PRIVATE CLINICAL CONSULTATION ]
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Schedule Your Evaluation with Dr. Nivedha
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Private 1-on-1 pulse evaluation, comprehensive medical history, and gentle needle therapy at Arura Acupuncture & Counselling Centre, Virugambakkam, Chennai.
          </p>
          <div className="pt-4">
            <Link
              to="/booking"
              className="px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#e02868] text-white hover:bg-[#c21e54] shadow-lg inline-flex items-center space-x-2 transition-all"
            >
              <span>Book Consultation with Dr. Nivedha (₹600)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
