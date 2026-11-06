import React, { useState } from 'react';
import { 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  Clock, 
  Award,
  CalendarCheck,
  Stethoscope,
  Waves
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAssetUrl } from '../utils/assetUrl';
import AnimatedCounter from './AnimatedCounter';

const TARIFF_ITEMS = [
  {
    id: 'pulse',
    title: 'Diagnostic Pulse Evaluation',
    subtitle: 'Unhurried 14-meridian radial pulse reading & comprehensive medical history',
    fee: '₹600',
    duration: '15–20 Mins',
    icon: Activity,
    highlight: false
  },
  {
    id: 'acu',
    title: 'Classical Acupuncture Session',
    subtitle: 'Millimeter-precise point stimulation & localized TDP mineral infrared warmth',
    fee: '₹600',
    duration: '45 Mins',
    icon: Sparkles,
    highlight: true
  },
  {
    id: 'counsel',
    title: 'Psychological Counselling Session',
    subtitle: 'Cambridge-certified CBT, REBT & trauma-informed active listening in soundproof suites',
    fee: '₹600',
    duration: '45–60 Mins',
    icon: Heart,
    highlight: false
  },
  {
    id: 'sterility',
    title: 'Aseptic Sterility Guarantee',
    subtitle: '0.18mm pre-sterilized surgical steel opened fresh in your presence · Zero needle reuse',
    fee: 'Included',
    duration: '100% Single-Use',
    icon: ShieldCheck,
    isGuarantee: true
  }
];

export default function PhysicianPhilosophySection({ onOpenBooking }) {
  const [hoveredTariff, setHoveredTariff] = useState(null);

  return (
    <section className="py-20 lg:py-28 bg-[#fafafa] border-b border-neutral-200/80 relative overflow-hidden">
      
      {/* Subtle Ambient Glow */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] opacity-35 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(237, 51, 115, 0.12) 0%, rgba(237, 51, 115, 0.02) 60%, transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 lg:space-y-16">
        
        {/* Section Header: Philosophy Quote */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/70 text-xs font-semibold text-[#ed3373] tracking-wider uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ed3373] animate-pulse" />
            <span>INTEGRATIVE ROOT-CAUSE PHILOSOPHY</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
            “We treat what the body whispers before it screams.”
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            Every clinical session combines gentle 14-meridian point stimulation with unhurried therapeutic listening. Chronic pain and autonomic tension are resolved at their neuro-biological source.
          </p>
        </div>

        {/* 2-Column Luxury Bento Grid (21st.dev Physician Sanctuary Card + Hairline UI Tariff Ledger) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: 21st.dev Physician Profile Sanctuary Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-neutral-200/90 bg-white p-7 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(237,51,115,0.08)] hover:border-[#ed3373]/50 transition-all duration-300">
            
            <div className="space-y-6">
              
              {/* Doctor Header: Portrait + Badges */}
              <div className="flex items-start gap-5">
                <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-pink-100 flex-shrink-0 shadow-sm bg-neutral-100">
                  <img 
                    src={getAssetUrl('doctor_nivedha_portrait.jpg')} 
                    alt="Dr. Nivedha Priyadharshini, MD (Acu)"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Active Clinical Practice" />
                </div>

                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#ed3373] bg-pink-50 px-2.5 py-0.5 rounded-md border border-pink-200/60 uppercase">
                    <Award className="w-3 h-3 text-[#ed3373]" />
                    <span>Lead Physician</span>
                  </span>

                  <h3 className="font-display text-2xl font-extrabold text-neutral-900 leading-snug">
                    Dr. Nivedha Priyadharshini
                  </h3>

                  <p className="text-xs font-bold text-neutral-800">
                    MD (Acu) • Cambridge Intl Dip.
                  </p>
                  
                  <p className="text-xs text-neutral-500 font-medium">
                    PG Dip. Psychological Counselling
                  </p>
                </div>
              </div>

              {/* Bio-Pulse Live Indicator */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#ed3373] animate-pulse" />
                  <span className="font-semibold text-neutral-800">14-Channel Pulse Diagnostic</span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full font-bold">
                  Active Sanctuary
                </span>
              </div>

              {/* Key Clinical Stats (Hairline UI Counter Band) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-1">
                  <span className="font-display text-2xl font-extrabold text-neutral-900 block tracking-tight">
                    <AnimatedCounter end={8} suffix="+ Years" />
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium block">
                    Classical Acupuncture
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-1">
                  <span className="font-display text-2xl font-extrabold text-[#ed3373] block tracking-tight">
                    <AnimatedCounter end={1100} suffix="+" />
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium block">
                    Documented Recoveries
                  </span>
                </div>
              </div>

              {/* Clinical Tenets Checklist */}
              <div className="space-y-2.5 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-neutral-800 font-medium">Unhurried 1-on-1 private consultations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-neutral-800 font-medium">Integrative mind-body neuro-regulation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#ed3373] flex-shrink-0" />
                  <span className="text-neutral-800 font-medium">Acoustic soundproof clinical suites</span>
                </div>
              </div>

            </div>

            {/* Doctor Card Footer Link */}
            <div className="pt-6 mt-6 border-t border-neutral-100">
              <Link
                to="/doctor"
                className="w-full py-3.5 rounded-full text-xs font-bold bg-neutral-900 text-white hover:bg-[#ed3373] flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>View Doctor's Credentials & Clinical Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Right Column: Hairline UI Interactive Tariff & Sanctuary Ledger */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            
            <div className="space-y-6">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-neutral-900">
                    Transparent Clinical Tariff
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium mt-0.5">
                    No hidden costs · All consultation & procedure fees fixed
                  </p>
                </div>

                <span className="font-mono text-xs font-bold text-[#ed3373] bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
                  ₹600 Flat
                </span>
              </div>

              {/* Interactive Hairline Tariff Cards */}
              <div className="space-y-3">
                {TARIFF_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isHovered = hoveredTariff === item.id;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredTariff(item.id)}
                      onMouseLeave={() => setHoveredTariff(null)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        item.isGuarantee
                          ? 'bg-emerald-50/40 border-emerald-200/80'
                          : isHovered
                          ? 'bg-pink-50/40 border-[#ed3373]/60 shadow-xs'
                          : 'bg-neutral-50/60 border-neutral-200/80 hover:bg-neutral-50'
                      }`}
                    >
                      {/* Left: Icon + Title + Description */}
                      <div className="flex items-start gap-3.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                          item.isGuarantee
                            ? 'bg-emerald-100/70 text-emerald-700 border-emerald-200'
                            : 'bg-white text-[#ed3373] border-neutral-200/80'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="space-y-0.5">
                          <h4 className="font-display text-sm sm:text-base font-bold text-neutral-900">
                            {item.title}
                          </h4>
                          <p className="text-xs text-neutral-500 font-normal leading-relaxed max-w-md">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right: Fee & Duration Chip */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 pl-12 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-100">
                        {item.isGuarantee ? (
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300/80 px-2.5 py-1 rounded-full font-mono">
                            {item.duration}
                          </span>
                        ) : (
                          <>
                            <span className="font-display text-base sm:text-lg font-extrabold text-neutral-900 tabular-nums">
                              {item.fee}
                            </span>
                            <span className="text-[11px] text-neutral-400 font-mono">
                              {item.duration}
                            </span>
                          </>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/clinic"
                className="text-xs text-neutral-500 hover:text-neutral-900 font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Full sanctuary guidelines & clinic facilities</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#ed3373]" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  if (onOpenBooking) {
                    onOpenBooking('Clinical Consultation & Evaluation', 600);
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#ed3373] text-white hover:bg-[#d92662] transition-all duration-200 shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Priority Consultation (₹600)</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
