import React from 'react';
import TissueDepthSimulator from './TissueDepthSimulator';

export default function InteractiveAcupunctureLab({ onOpenBooking }) {
  return (
    <section 
      id="interactive-lab" 
      className="w-full relative py-12 lg:py-16 bg-neutral-50/70 text-ink border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Architectural Header (No floating badge pills) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-brand tracking-normal block mb-1">
              Clinical 3D Simulation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight font-display">
              Anatomical landmarks and needle depth simulator
            </h2>
          </div>
          <p className="text-xs text-neutral-500 max-w-md sm:text-right">
            Click limbs to articulate joints, select classical meridian acupoints, and explore micro-depth tissue strata in real time.
          </p>
        </div>

        {/* 3D Lab Workstation Container (3D functions completely untouched) */}
        <div className="w-full h-[620px] sm:h-[680px] lg:h-[740px] rounded-2xl overflow-hidden border border-neutral-200 bg-white relative">
          <TissueDepthSimulator onOpenBooking={onOpenBooking} />
        </div>
      </div>
    </section>
  );
}
