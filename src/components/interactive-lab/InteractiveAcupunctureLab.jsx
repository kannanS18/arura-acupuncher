import React from 'react';
import TissueDepthSimulator from './TissueDepthSimulator';

export default function InteractiveAcupunctureLab({ onOpenBooking }) {
  return (
    <section id="interactive-lab" className="w-full bg-neutral-950 border-y border-neutral-800 text-white relative p-0 m-0">
      <div className="w-full h-full p-0 m-0">
        <TissueDepthSimulator onOpenBooking={onOpenBooking} />
      </div>
    </section>
  );
}
