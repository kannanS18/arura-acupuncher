import React from 'react';
import TissueDepthSimulator from './TissueDepthSimulator';
import { Sparkles } from 'lucide-react';

export default function InteractiveAcupunctureLab({ onOpenBooking }) {
  return (
    <section 
      id="interactive-lab" 
      className="w-full relative py-12 lg:py-16 bg-[#f8fafc] text-ink border-y border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e02868]/10 border border-[#e02868]/20 text-[#e02868] text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Clinical Simulation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#09090b] tracking-tight font-display">
            3D Human Body Anatomy & Acupoint Explorer
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
            Click directly on limbs to articulate joints, inspect micro-depth tissue strata, and observe neuromuscular responses.
          </p>
        </div>

        {/* 3D Lab Workstation Container */}
        <div className="w-full h-[620px] sm:h-[680px] lg:h-[740px] rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xl bg-[#f8fafc] relative">
          <TissueDepthSimulator onOpenBooking={onOpenBooking} />
        </div>
      </div>
    </section>
  );
}
