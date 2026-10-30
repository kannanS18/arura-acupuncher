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
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs uppercase tracking-wider text-[#e02868] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Integrity & Safety Standards</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#09090b] leading-tight">
            Medicine Designed for <span className="text-[#e02868]">Lasting Recovery</span>.
          </h2>

          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            We abandon the hurried commercial clinic model. Every treatment session is an unhurried, private synthesis of classical acupuncture physics and modern clinical psychotherapy.
          </p>
        </div>

        {/* Clean, Clutter-Free Alternating Feature Showcases (No Cramped Bento Grids) */}
        <div className="space-y-16">
          
          {/* Foundation 01: 100% Single-Use Sterile Surgical Needles */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#f8fafc] border border-gray-200/90 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Authentic Needles Imagery */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center justify-center shadow-xs">
              <img 
                src={getAssetUrl('authentic_acupuncture_needles.jpg')} 
                alt="Authentic 0.18mm Hair-Thin Sterile Surgical Acupuncture Needles" 
                className="w-full h-auto max-h-64 object-contain rounded-xl"
              />
              <div className="mt-4 inline-flex items-center space-x-2 text-xs text-gray-700 font-semibold bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>0.18mm Hair-Thin Stainless Steel Needles</span>
              </div>
            </div>

            {/* Right: Spacious Clinical Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-emerald-800 font-bold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pillar 01 • Absolute Clinical Safety</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b] tracking-tight">
                100% Single-Use Sterile Surgical Needles
              </h3>

              <p className="text-base text-gray-600 font-normal leading-relaxed">
                Hospital-grade aseptic protocols without compromise. Every ultra-fine needle is pre-sterilized with ethylene oxide gas, blister-sealed at the manufacturer, opened exclusively in your personal presence, and immediately discarded into biohazard sharps containers. Zero needle reuse, unconditionally.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/80">
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block">Material</span>
                  <span className="text-sm font-bold text-[#09090b]">Surgical 316L</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block">Needle Gauge</span>
                  <span className="text-sm font-bold text-[#09090b]">0.18mm Hair-Thin</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold block">Infection Risk</span>
                  <span className="text-sm font-bold text-emerald-800">0.00% Guaranteed</span>
                </div>
              </div>
            </div>

          </div>

          {/* Foundation 02: Deep Radial Pulse & Clinical Intake */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#f8fafc] border border-gray-200/90 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Spacious Clinical Text */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#e02868] font-bold px-3 py-1 rounded-full bg-pink-50 border border-pink-200">
                <HeartPulse className="w-4 h-4 text-[#e02868]" />
                <span>Pillar 02 • Root Assessment</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b] tracking-tight">
                Deep Radial Pulse & Meridian Diagnostics
              </h3>

              <p className="text-base text-gray-600 font-normal leading-relaxed">
                We assess subtle variations across 14 classical radial pulse positions and tongue topography to locate the exact meridian blockage causing your physical inflammation. Every patient receives dedicated 1-on-1 time with Dr. Nivedha.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200/80">
                <div className="space-y-1">
                  <span className="text-sm font-bold text-gray-900 block">Radial Pulse Reading</span>
                  <p className="text-xs text-gray-600">14 anatomical arterial pulse depths to assess systemic vitality</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-bold text-gray-900 block">Tongue Topography</span>
                  <p className="text-xs text-gray-600">Coating, color, and mucosal micro-circulation evaluation</p>
                </div>
              </div>
            </div>

            {/* Right: Peaceful Acoustic Suite Photo */}
            <div className="lg:col-span-5 order-1 lg:order-2 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-xs h-64">
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
