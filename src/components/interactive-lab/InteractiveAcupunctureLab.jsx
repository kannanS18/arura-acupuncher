import React, { useState } from 'react';
import TissueDepthSimulator from './TissueDepthSimulator';
import ThreeAcupunctureViewer from './ThreeAcupunctureViewer';
import RadialPulseDiagnosticSimulator from './RadialPulseDiagnosticSimulator';
import { Layers, Box, Activity } from 'lucide-react';

const LAB_OPTIONS = [
  {
    id: 'tissue',
    name: 'Option 1: Under-the-Skin Depth Simulator',
    shortName: '1. Tissue Depth & Knot Release',
    icon: <Layers className="w-4 h-4" />,
    badge: 'Biomechanical Physics',
    tagline: 'Plunge the needle into tissue layers and watch the muscle knot release in real time.'
  },
  {
    id: 'three3d',
    name: 'Option 2: 360° Real-Time 3D WebGL Lab',
    shortName: '2. 3D WebGL Spatial Lab',
    icon: <Box className="w-4 h-4" />,
    badge: 'Three.js 3D Engine',
    tagline: 'Orbit, pan, and inspect the anatomical hand and 3D needle in true 3D space.'
  },
  {
    id: 'pulse',
    name: 'Option 3: 14-Radial Pulse Diagnostic Lab',
    shortName: '3. Radial Pulse Diagnostic',
    icon: <Activity className="w-4 h-4" />,
    badge: 'Clinical Telemetry',
    tagline: 'Palpate the radial artery across 3 depths and analyze live waveform dynamics.'
  }
];

export default function InteractiveAcupunctureLab({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('tissue');

  return (
    <section id="interactive-lab" className="py-20 lg:py-28 bg-white border-b border-neutral-200/80 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Lab Switcher Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-semibold text-brand">
              <span>Arura Interactive Clinical Suite</span>
              <span className="text-neutral-300">/</span>
              <span>Test All 3 Physical Simulations</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.12]">
              Experience classical medicine <br />
              <span className="text-brand">before you book.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
              We built three bespoke interactive simulators to replace static imagery with true physical feedback. Toggle between them below to test each physical feature.
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-neutral-500 font-medium">
            <span className="text-ink font-bold text-sm block">3 Interactive Prototypes</span>
            <span>Choose your favorite for the final site</span>
          </div>
        </div>

        {/* 3-Tab Master Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LAB_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveTab(opt.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                activeTab === opt.id
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg scale-[1.01]'
                  : 'bg-[#fbfbfa] text-neutral-800 border-neutral-200 hover:border-brand hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl flex items-center justify-center ${
                  activeTab === opt.id ? 'bg-white/10 text-brand' : 'bg-white border border-neutral-200 text-neutral-700'
                }`}>
                  {opt.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  activeTab === opt.id ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {opt.badge}
                </span>
              </div>

              <div>
                <h3 className={`font-display font-bold text-base ${activeTab === opt.id ? 'text-white' : 'text-ink'}`}>
                  {opt.shortName}
                </h3>
                <p className={`text-xs mt-1 leading-snug line-clamp-2 ${activeTab === opt.id ? 'text-white/70' : 'text-neutral-500'}`}>
                  {opt.tagline}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Active Simulation Viewport */}
        <div>
          {activeTab === 'tissue' && (
            <TissueDepthSimulator onOpenBooking={onOpenBooking} />
          )}

          {activeTab === 'three3d' && (
            <ThreeAcupunctureViewer onOpenBooking={onOpenBooking} />
          )}

          {activeTab === 'pulse' && (
            <RadialPulseDiagnosticSimulator onOpenBooking={onOpenBooking} />
          )}
        </div>

      </div>
    </section>
  );
}
