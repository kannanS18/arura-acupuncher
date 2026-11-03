import React from 'react';
import TissueDepthSimulator from './TissueDepthSimulator';

export default function InteractiveAcupunctureLab({ onOpenBooking }) {
  return (
    <section 
      id="interactive-lab" 
      className="w-full relative h-screen min-h-screen bg-[#09090b] text-white p-0 m-0 border-y border-neutral-800"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="w-full h-full p-0 m-0 overflow-hidden">
        <TissueDepthSimulator onOpenBooking={onOpenBooking} />
      </div>
    </section>
  );
}
