import React from 'react';
import { ShieldCheck, HeartPulse, CheckCircle2, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';

export default function BentoGridSection({ onOpenBooking }) {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Section Heading — Generous Minimalist Breathing Room */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-50/60 border border-pink-200/60 text-xs text-brand font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clinical integrity and safety standards</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#09090b] leading-tight">
            Medicine designed for <span className="text-[#e02868]">lasting recovery</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            We abandon the hurried commercial clinic model. Every treatment session is an unhurried, private synthesis of classical acupuncture physics and modern clinical psychotherapy.
          </p>
        </div>

        {/* Clean, Clutter-Free Alternating Feature Showcases (No Cramped Bento Grids) */}
        <div className="space-y-16">
          
          {/* Foundation 01: 100% Single-Use Sterile Surgical Needles */}
          <div className="p-8 sm:p-12 rounded-2xl bg-neutral-50/70 border border-neutral-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Authentic Needles Imagery */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-neutral-200 p-6 flex flex-col items-center justify-center">
              <img 
                src={getAssetUrl('authentic_acupuncture_needles.jpg')} 
                alt="Authentic 0.18mm Hair-Thin Sterile Surgical Acupuncture Needles" 
                className="w-full h-auto max-h-64 object-contain rounded-lg"
              />
              <div className="mt-4 inline-flex items-center space-x-2 text-xs text-neutral-700 font-medium bg-neutral-50 px-3 py-1 rounded-full border border-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>0.18mm hair-thin stainless steel</span>
              </div>
            </div>

            {/* Right: Spacious Clinical Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs text-emerald-700 font-medium px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pillar 01 • Absolute clinical safety</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b] tracking-tight">
                100% Single-use sterile surgical needles
              </h3>

              <p className="text-base text-gray-600 font-normal leading-relaxed">
                Hospital-grade aseptic protocols without compromise. Every ultra-fine needle is pre-sterilized with ethylene oxide gas, blister-sealed at the manufacturer, opened exclusively in your personal presence, and immediately discarded into biohazard sharps containers. Zero needle reuse, unconditionally.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
                <div>
                  <span className="text-xs text-neutral-500 font-medium block">Material</span>
                  <span className="text-sm font-semibold text-[#09090b]">Surgical 316L</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-500 font-medium block">Needle gauge</span>
                  <span className="text-sm font-semibold text-[#09090b]">0.18mm hair-thin</span>
                </div>
                <div>
                  <span className="text-xs text-emerald-700 font-medium block">Infection risk</span>
                  <span className="text-sm font-semibold text-emerald-700">0.00% guaranteed</span>
                </div>
              </div>
            </div>

          </div>

          {/* Foundation 02: Deep Radial Pulse & Clinical Intake */}
          <div className="p-8 sm:p-12 rounded-2xl bg-neutral-50/70 border border-neutral-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Spacious Clinical Text */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 text-xs text-brand font-medium px-3 py-1 rounded-full bg-pink-50/60 border border-pink-200/60">
                <HeartPulse className="w-4 h-4 text-brand" />
                <span>Pillar 02 • Root assessment</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b] tracking-tight">
                Deep radial pulse and meridian diagnostics
              </h3>

              <p className="text-base text-gray-600 font-normal leading-relaxed">
                We assess subtle variations across 14 classical radial pulse positions and tongue topography to locate the exact meridian blockage causing your physical inflammation. Every patient receives dedicated 1-on-1 time with Dr. Nivedha.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-neutral-900 block">Radial pulse reading</span>
                  <p className="text-xs text-neutral-600">14 anatomical arterial pulse depths to assess systemic vitality</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-neutral-900 block">Tongue topography</span>
                  <p className="text-xs text-neutral-600">Coating, color, and mucosal micro-circulation evaluation</p>
                </div>
              </div>
            </div>

            {/* Right: Peaceful Acoustic Suite Photo */}
            <div className="lg:col-span-5 order-1 lg:order-2 rounded-xl overflow-hidden border border-neutral-200 bg-white h-64">
              <img 
                src={getAssetUrl('zen_treatment.jpg')} 
                alt="Arura Private Acoustic Suite" 
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
