import React from 'react';
import TissueDepthSimulator from './TissueDepthSimulator';

export default function InteractiveAcupunctureLab({ onOpenBooking }) {
  return (
    <section id="interactive-lab" className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-neutral-950 text-white p-0 m-0">
      <div className="w-full h-full p-0 m-0 overflow-hidden">
        <TissueDepthSimulator onOpenBooking={onOpenBooking} />
      </div>
    </section>
  );
}
