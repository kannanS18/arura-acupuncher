import React from 'react';
import TissueDepthSimulator from './TissueDepthSimulator';

export default function InteractiveAcupunctureLab({ onOpenBooking }) {
  return (
    <section 
      id="interactive-lab" 
      className="w-full relative bg-neutral-950 text-white p-0 m-0 border-y border-neutral-800 scroll-mt-[114px]"
    >
      <div className="w-full h-[calc(100vh-114px)] min-h-[580px] p-0 m-0 overflow-hidden">
        <TissueDepthSimulator onOpenBooking={onOpenBooking} />
      </div>
    </section>
  );
}
