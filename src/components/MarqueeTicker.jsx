import React, { useState } from 'react';
import { ShieldCheck, Award, HeartPulse, Clock, CheckCircle2, Stethoscope, Flame } from 'lucide-react';

export default function MarqueeTicker() {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const trustPillars = [
    {
      id: 'needles',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
      title: "100% Single-Use Needles",
      desc: "EO pre-sterilized, opened in your presence",
      detail: "0.18mm surgical stainless steel. Zero reuse unconditionally."
    },
    {
      id: 'cambridge',
      icon: <Award className="w-5 h-5 text-brand flex-shrink-0" />,
      title: "Cambridge Certified",
      desc: "Evidence-based clinical psychotherapy",
      detail: "Led by Dr. Nivedha Priyadharshini, MD (Acu), PG Dip."
    },
    {
      id: 'experience',
      icon: <HeartPulse className="w-5 h-5 text-brand flex-shrink-0" />,
      title: "8+ Years in Chennai",
      desc: "1,100+ documented patient recoveries",
      detail: "Established clinic located in Chinmaya Nagar, Virugambakkam."
    },
    {
      id: 'unhurried',
      icon: <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />,
      title: "Unhurried 1-on-1 Care",
      desc: "45–60 min private acoustic suites",
      detail: "No conveyor-belt treatments. Dedicated sound-dampened room."
    },
    {
      id: 'diagnostics',
      icon: <Stethoscope className="w-5 h-5 text-indigo-600 flex-shrink-0" />,
      title: "Radial Pulse Diagnosis",
      desc: "14-channel classical arterial intake",
      detail: "Comprehensive pulse & tongue analysis included in every session."
    },
    {
      id: 'moxa',
      icon: <Flame className="w-5 h-5 text-red-500 flex-shrink-0" />,
      title: "Infrared TDP Mineral Heat",
      desc: "Complementary deep tissue therapy",
      detail: "Thermal mineral lamp included for spinal & joint stiffness."
    }
  ];

  // Repeat for seamless continuous infinite motion
  const items = [...trustPillars, ...trustPillars];

  return (
    <div className="w-full bg-[#f8fafc] border-y border-gray-200/80 py-3.5 select-none relative z-20 overflow-hidden group">
      
      {/* Edge gradient masks for luxury fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

      {/* Infinite Continuous Moving Marquee Track */}
      <div className="animate-marquee-continuous flex items-center space-x-4 sm:space-x-6">
        {items.map((pillar, idx) => (
          <div 
            key={`${pillar.id}-${idx}`}
            onMouseEnter={() => setActiveTooltip(pillar.id)}
            onMouseLeave={() => setActiveTooltip(null)}
            className="flex items-center space-x-3.5 px-4 py-3 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors cursor-pointer flex-shrink-0 group/card"
          >
            <div className="p-2 rounded-lg bg-neutral-50 group-hover/card:bg-pink-50/60 transition-colors flex-shrink-0">
              {pillar.icon}
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-sm font-bold text-[#09090b] font-display whitespace-nowrap group-hover/card:text-[#e02868] transition-colors">
                {pillar.title}
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500 font-normal whitespace-nowrap">
                {pillar.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
