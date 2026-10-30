import React from 'react';
import { COUNSELLING_SERVICES, CLINICAL_METHODS } from '../data/websiteContent';
import { ShieldCheck, Heart, Users, Sparkles, CheckCircle2, ArrowRight, Brain, Lock } from 'lucide-react';

export default function CounsellingPage({ onOpenBooking }) {
  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Header Banner */}
      <section className="relative pt-24 pb-20 border-b border-gray-200/80 bg-ambient-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#581c87] text-xs uppercase tracking-wider font-bold">
              <Brain className="w-3.5 h-3.5" />
              <span>Cambridge-Certified Sanctuary</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Psychological <br />
              <span className="text-gradient-luxury">Counselling & Therapy</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
              Led by Dr. Nivedha Priyadharshini (Cambridge Dip. Psych). A private, non-judgmental clinical sanctuary to process emotional distress, trauma, relationship friction, anxiety syndromes, and executive burnout.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Specialized Formats */}
      <section className="py-24 lg:py-32 border-b border-gray-200/80 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#581c87] font-semibold">
              Areas of Care
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#09090b]">
              6 Specialized Counselling Modalities
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Tailored psychotherapeutic pathways designed to support individuals, couples, adolescents, and families through life's most challenging transitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COUNSELLING_SERVICES.map((serv) => (
              <div 
                key={serv.id} 
                className="p-8 sm:p-10 rounded-3xl spotlight-card space-y-6 flex flex-col justify-between group border border-gray-200/80"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-[#581c87] flex items-center justify-center font-display text-xl font-bold group-hover:scale-110 transition-transform">
                    {serv.title.charAt(0)}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#09090b]">{serv.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">{serv.description}</p>
                </div>

                <div className="border-t border-gray-100 pt-5 mt-6">
                  <span className="text-xs uppercase tracking-wider text-gray-400">Target Outcomes:</span>
                  <p className="text-sm text-[#581c87] font-semibold mt-1 leading-relaxed">{serv.target}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7 Clinical Methods */}
      <section className="py-24 lg:py-32 border-b border-gray-200/80 bg-[#f8fafc] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#581c87] font-semibold">
              Evidence-Based Methodologies
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#09090b]">
              7 Psychotherapeutic Frameworks Deployed
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Harmonizing rigorous Western psychological frameworks with deep somatic nervous-system regulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINICAL_METHODS.map((method, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-3xl spotlight-card space-y-4 group hover:-translate-y-1 transition-all border border-gray-200/80"
              >
                <span className="text-xs text-[#581c87] font-bold tracking-wider">
                  PHASE 0{idx + 1}
                </span>
                <h4 className="font-display text-xl font-bold text-[#09090b]">{method.name}</h4>
                <p className="text-sm text-gray-600 font-light leading-relaxed">{method.summary}</p>
              </div>
            ))}
          </div>

          {/* Ethics & Confidentiality Pledge */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl spotlight-card border border-emerald-200 bg-emerald-50/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex items-start space-x-5">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex-shrink-0 mt-1">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-display text-2xl font-bold text-[#09090b]">100% Ethical Confidentiality Guaranteed</h4>
                <p className="text-sm sm:text-base text-gray-600 font-light max-w-2xl leading-relaxed">
                  Everything shared within Arura's therapy room is protected by strict international psychological codes of ethics. No records are shared without explicit consent. A safe, non-judgmental space for your healing journey.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('Psychological Counselling', 600)}
              className="btn-luxury-dark px-8 py-4 rounded-xl text-sm font-semibold tracking-wider flex items-center space-x-2 whitespace-nowrap shadow-lg"
            >
              <span>Schedule Counselling (₹600)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
