import React from 'react';
import TissueDepthSimulator from './TissueDepthSimulator';

export default function InteractiveAcupunctureLab({ onOpenBooking }) {
  return (
    <section 
      id="interactive-lab" 
      className="w-full relative bg-neutral-950 text-white p-0 m-0 border-y border-neutral-800"
    >
      <div className="w-full h-[95vh] min-h-[640px] max-h-[1000px] p-0 m-0 overflow-hidden">
        <TissueDepthSimulator onOpenBooking={onOpenBooking} />
      </div>
    </section>
  );
}
