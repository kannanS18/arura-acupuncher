import React, { useState } from 'react';
import { CalendarCheck, MessageCircle, ArrowRight, ShieldCheck, Sparkles, HeartPulse, Award, Clock, CheckCircle2, Activity, Play } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';

export default function HeroSection({ onOpenBooking }) {
  const [selectedFocus, setSelectedFocus] = useState('Spine & Cervical');

  const clinicalFocuses = [
    { name: 'Spine & Cervical', stat: '88% Mobility Restored', desc: 'Relieves cervical spondylosis & trapezius spasm' },
    { name: 'Vascular Migraines', stat: '92% Relief in 4 Sessions', desc: 'Calms cranial blood flow & trigeminal nerves' },
    { name: 'Stress & Insomnia', stat: 'Immediate Nervous Calm', desc: 'Vagus regulation & endogenous endorphin surge' }
  ];

  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 bg-white text-[#09090b] overflow-hidden border-b border-gray-200/80 bg-ambient-light">
      
      {/* Delicate Ambient Atmosphere */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Editorial Headline & Clinical Credibility */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Capsule */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs text-[#e02868] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e02868] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e02868]"></span>
              </span>
              <span>Classical Acupuncture & Psychotherapy • Chennai</span>
            </div>

            {/* Editorial Luxury Headline (Outfit Display) */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.15]">
              Heal the original root cause, <br />
              <span className="text-[#e02868]">not just the symptom.</span>
            </h1>

            {/* Body Copy (Plus Jakarta Sans) */}
            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
              Chennai's premier sanctuary where classical meridian physics converges with Cambridge clinical psychotherapy. Led by <strong className="text-black font-semibold">Dr. Nivedha Priyadharshini, MD (Acu)</strong>. Dedicated private care for chronic spine pain, vascular migraines, and emotional burnout.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                to="/booking"
                className="btn-luxury-dark hover:bg-[#e02868] hover:border-[#e02868] px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center space-x-2.5 shadow-md group transition-all"
              >
                <CalendarCheck className="w-4 h-4 text-white" />
                <span>Book Consultation (₹600)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={CLINIC_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury-outline px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center space-x-2 shadow-sm hover:border-emerald-600 hover:text-emerald-700 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Direct WhatsApp Desk</span>
              </a>

              <Link
                to="/clinic"
                className="text-xs uppercase tracking-wider text-[#e02868] hover:text-black font-bold flex items-center space-x-1.5 transition-colors py-2 px-1"
              >
                <span>View Tariff Schedule →</span>
              </Link>
            </div>

            {/* Verified Patient Trust & Clinical Licensing Line (Non-repetitive with Trust Strip) */}
            <div className="pt-5 border-t border-gray-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-600">
              <div className="flex items-center space-x-2 font-medium">
                <span className="flex text-amber-500 text-sm">★★★★★</span>
                <span className="text-gray-900 font-bold">4.9 / 5.0</span>
                <span>(180+ Verified Reviews)</span>
              </div>
              <div className="hidden sm:block text-gray-300">•</div>
              <div className="font-medium text-gray-700">
                Virugambakkam, Chennai • Private Acoustic Suites
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): High-End Clinical Imagery & Interactive Treatment Feature */}
          <div className="lg:col-span-5">
            <div className="spotlight-card rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden bg-white group">
              
              {/* Clinical Photography Showcase */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100">
                <img 
                  src={getAssetUrl('acupuncture_session.jpg')} 
                  alt="Clinical Acupuncture Session at Arura Studio Chennai" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Floating Hospital-Grade Aseptic Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-xs font-semibold text-gray-900 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Aseptic Single-Use Standard</span>
                </div>

                {/* Bottom Overlay Info on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-purple-200 font-semibold">Lead Practitioner</div>
                      <div className="font-display text-lg font-bold">Dr. Nivedha Priyadharshini</div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-[11px] font-semibold">
                        ● Clinic Open Today
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Treatment Focus Selector Below Image */}
              <div className="p-6 space-y-4 bg-white">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold block">
                    Targeted Biological Restoration:
                  </span>
                  
                  {/* Selectors */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {clinicalFocuses.map((f) => (
                      <button
                        key={f.name}
                        onClick={() => setSelectedFocus(f.name)}
                        className={`py-2 px-2.5 rounded-xl text-center text-xs font-semibold transition-all border ${
                          selectedFocus === f.name
                            ? 'bg-[#e02868] text-white border-[#e02868] shadow-xs'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-pink-300'
                        }`}
                      >
                        {f.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Focus Briefing */}
                {clinicalFocuses.map((f) => {
                  if (f.name !== selectedFocus) return null;
                  return (
                    <div key={f.name} className="p-3.5 rounded-2xl bg-[#f8fafc] border border-gray-200/80 space-y-1 animate-fadeIn">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-900">{f.name}</span>
                        <span className="text-emerald-700 font-semibold">{f.stat}</span>
                      </div>
                      <p className="text-xs text-gray-600 font-light leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  );
                })}

                {/* Direct Action Button */}
                <button
                  onClick={() => onOpenBooking(`Consultation for ${selectedFocus}`, 600)}
                  className="w-full btn-luxury-dark hover:bg-[#e02868] hover:border-[#e02868] py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2 shadow-md transition-all"
                >
                  <span>Schedule Consultation (₹600)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
