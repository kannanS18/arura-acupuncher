import React from 'react';
import TissueDepthSimulator from './TissueDepthSimulator';

export default function InteractiveAcupunctureLab({ onOpenBooking }) {
  return (
    <section 
      id="interactive-lab" 
      className="w-full relative bg-[#09090b] text-white p-0 m-0 border-y border-neutral-800 scroll-mt-[114px]"
    >
      <div className="w-full h-[calc(100vh-114px)] min-h-[520px] max-h-[860px] p-0 m-0 overflow-hidden">
        <TissueDepthSimulator onOpenBooking={onOpenBooking} />
      </div>
    </section>
  );
}
