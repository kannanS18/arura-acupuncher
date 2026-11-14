import React from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  HeartPulse, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  ArrowUpRight,
  Zap,
  BrainCircuit,
  Compass
} from 'lucide-react';
import { FeatureTabs } from './ui/feature-tabs';

export default function DoctorPhilosophySection() {
  const tabs = [
    {
      id: 'pillar-1',
      label: '01 · Acupuncture',
      badge: 'Somatic',
      content: (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#ed3373] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ed3373]" />
                Physical Neuro-Modulation
              </span>
              <h3 className="font-display text-2xl font-bold text-neutral-900">
                Classical 14-Meridian Acupuncture
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-pink-50 border border-pink-200/80 flex items-center justify-center text-[#ed3373] shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Precise micro-needles stimulate nerve fibers, dilating micro-vasculature and dissipating muscle fascia tension across cervical and lumbar pathways.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                Instrument Protocol
              </span>
              <p className="text-xs font-semibold text-neutral-800">
                0.18mm Single-Use Japanese Surgical Steel
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                Primary Physiological Mechanism
              </span>
              <p className="text-xs font-semibold text-neutral-800">
                Micro-Vasodilation & Endorphin Cascade
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span className="font-mono">Target: Cervical, Lumbar & Fascial Spasms</span>
            <span className="font-semibold text-[#ed3373] flex items-center gap-1">
              100% Sterile · Non-Surgical
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'pillar-2',
      label: '02 · Counselling',
      badge: 'Autonomic',
      content: (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#ed3373] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ed3373]" />
                Autonomic Nervous System Regulation
              </span>
              <h3 className="font-display text-2xl font-bold text-neutral-900">
                Cambridge Evidence-Based Counselling
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-pink-50 border border-pink-200/80 flex items-center justify-center text-[#ed3373] shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            CBT and REBT frameworks resolving psychosomatic stressors, sleep disruptions, and sympathetic overdrive without pharmaceutical dependence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                Clinical Framework
              </span>
              <p className="text-xs font-semibold text-neutral-800">
                Cambridge Certified CBT & REBT Protocols
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                Neurological Target
              </span>
              <p className="text-xs font-semibold text-neutral-800">
                Down-Regulate Sympathetic "Fight-or-Flight"
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span className="font-mono">Target: Psychosomatic Triggers & Sleep Disruption</span>
            <span className="font-semibold text-[#ed3373] flex items-center gap-1">
              Drug-Free · Cognitive Grounding
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'synthesis',
      label: '03 · Synthesis',
      badge: 'Root-Cause',
      content: (
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 text-white border border-neutral-800 shadow-xl space-y-6 relative overflow-hidden">
          {/* Subtle 21st.dev luxury glow accent */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#ed3373]/20 blur-3xl"
          />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ed3373] animate-pulse" />
                Integrated Clinical Resolution
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                Restorative Root-Cause Recovery
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-pink-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal relative z-10">
            Sustained relief from chronic pain and fatigue by treating physiological nerve pathways and autonomic stress drivers simultaneously.
          </p>

          <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2 relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
              The Dual-Engine Clinical Synthesis
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-1 rounded-md bg-[#ed3373]/20 text-pink-300 border border-[#ed3373]/30">
                Neuro-Modulation (Body)
              </span>
              <span className="text-neutral-500">+</span>
              <span className="px-2 py-1 rounded-md bg-[#ed3373]/20 text-pink-300 border border-[#ed3373]/30">
                Autonomic Grounding (Mind)
              </span>
              <span className="text-neutral-500">=</span>
              <span className="px-2 py-1 rounded-md bg-white text-neutral-950 font-bold">
                Lasting Remission
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 relative z-10">
            <span className="font-mono">Documented Outcomes: 1,100+ Recoveries</span>
            <span className="font-semibold text-pink-400 flex items-center gap-1">
              Zero Chemical Masking
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#fafafa] border-b border-neutral-200/80 relative overflow-hidden">
      {/* 21st.dev ambient subtle grid overlay */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#18181b 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 21st.dev editorial badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#ed3373]" />
              <span>Clinical Philosophy & Framework</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              The Dual-Engine Healing System
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-mono">
            Bridging ancient meridian neurology with contemporary autonomic psychotherapy.
          </p>
        </div>

        {/* 21st.dev Bento Grid: Left Master Credo Card + Right Hairline UI FeatureTabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (5 Cols): The Clinical Credo Bento Card */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm hover:border-pink-200 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
            
            {/* Subtle corner light */}
            <div 
              aria-hidden="true" 
              className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#ed3373]/10 blur-3xl group-hover:bg-[#ed3373]/15 transition-all duration-500"
            />

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                  DOCTOR'S CREDO
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  TN/ACU/2016
                </span>
              </div>

              {/* Big Quote */}
              <blockquote className="font-display text-xl sm:text-2xl font-bold text-neutral-900 leading-snug tracking-tight">
                “True physical recovery begins when we address the{' '}
                <span className="text-[#ed3373] underline decoration-[#ed3373]/30 decoration-2 underline-offset-4">
                  autonomic nervous system
                </span>{' '}
                alongside the musculoskeletal injury.”
              </blockquote>

              <p className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-wider">
                — Dr. Nivedha Priyadharshini, MD (Acu)
              </p>

              {/* Succinct, high-impact clinical copy preserving 100% meaning */}
              <div className="pt-3 space-y-2.5 text-sm text-neutral-600 leading-relaxed font-normal border-t border-neutral-100">
                <p>
                  Chronic cervical pain, lumbar spasms, and gut distress rarely occur in isolation from sympathetic overdrive and unresolved mental tension.
                </p>
                <p className="text-xs text-neutral-500">
                  Dr. Nivedha combines classical meridian neuro-modulation with Cambridge clinical counselling to eliminate physical inflammation and autonomic stress simultaneously.
                </p>
              </div>
            </div>

            {/* Credo Card Footer Specs */}
            <div className="pt-5 mt-5 border-t border-neutral-100 grid grid-cols-2 gap-3 relative z-10">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block font-semibold">
                  Acupuncture
                </span>
                <span className="text-xs font-bold text-neutral-900">
                  14 Classical Meridians
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block font-semibold">
                  Psychotherapy
                </span>
                <span className="text-xs font-bold text-neutral-900">
                  Cambridge CBT/REBT
                </span>
              </div>
            </div>

          </div>

          {/* Right Column (7 Cols): Hairline UI Interactive FeatureTabs */}
          <div className="lg:col-span-7 p-7 sm:p-8 rounded-3xl bg-neutral-100/60 border border-neutral-200/80 shadow-xs flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  Interactive Modality Explorer
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  Click tabs to switch
                </span>
              </div>

              {/* Hairline UI FeatureTabs Component */}
              <FeatureTabs 
                tabs={tabs} 
                defaultValue="pillar-1" 
                className="w-full"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
