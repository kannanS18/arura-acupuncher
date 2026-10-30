import React from 'react';
import { Award, GraduationCap, Clock, ShieldCheck, Heart, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

export default function TherapistPage({ onOpenBooking }) {
  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Hero Strip with Ambient Atmosphere */}
      <section className="relative pt-24 pb-20 border-b border-gray-200/80 bg-ambient-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#581c87] text-xs uppercase tracking-wider font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Lead Clinical Director</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Dr. Nivedha <br />
              <span className="text-gradient-luxury">Priyadharshini</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
              Doctor of Medicine in Classical Acupuncture • Cambridge International Diploma in Psychological Counselling. Integrating bio-electric meridian precision with empathetic psycho-emotional restoration in Chennai.
            </p>
          </div>
        </div>
      </section>

      {/* Main Biography & Clinical Ethos */}
      <section className="py-24 lg:py-32 border-b border-gray-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Card: Doctor Spotlight */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 sm:p-10 rounded-3xl spotlight-card space-y-8 border border-gray-200/80">
                
                <div className="flex items-center space-x-5">
                  <div className="w-24 h-24 rounded-2xl bg-[#09090b] text-white flex items-center justify-center font-display text-3xl font-bold shadow-lg">
                    NP
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#09090b]">Dr. Nivedha Priyadharshini</h3>
                    <p className="text-sm text-[#581c87] font-bold mt-1">MD (Acu) • Cambridge Dip. Psych</p>
                    <p className="text-xs text-gray-500 mt-0.5">Lead Healer • Arura Chennai</p>
                  </div>
                </div>

                {/* Accreditations List */}
                <div className="space-y-5 text-sm text-gray-700 border-t border-gray-100 pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-xl bg-purple-50 text-[#581c87] border border-purple-200 flex-shrink-0 mt-0.5">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-[#09090b] font-medium text-base block">Doctor of Medicine (Acupuncture)</strong>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">Classical 14-meridian mastery, pulse diagnosis, and advanced thermal moxibustion.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0 mt-0.5">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-[#09090b] font-medium text-base block">Cambridge Diploma in Psychology</strong>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">International certification in Cognitive Behavioural Therapy, Gestalt frameworks, and trauma recovery.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-[#09090b] font-medium text-base block">8+ Years Clinical Practice</strong>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">Over 1,100+ patient transformations across chronic pain, migraine syndromes, and clinical stress.</p>
                    </div>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenBooking('Consultation with Dr. Nivedha', 600)}
                    className="w-full btn-luxury-dark py-4 rounded-xl text-sm font-semibold tracking-wider flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Schedule Consultation (₹600)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Personalized 1-on-1 private evaluation
                  </p>
                </div>

              </div>
            </div>

            {/* Right Story & Philosophy */}
            <div className="lg:col-span-7 space-y-10">
              
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#581c87] font-semibold">
                  Healing Philosophy
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#09090b] leading-tight">
                  "The body holds the score. The needles clear the path. The dialogue rewires the spirit."
                </h2>
              </div>

              <div className="space-y-6 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
                <p>
                  "Throughout my clinical journey, I noticed that patients visiting for chronic back pain, fibromyalgia, or recurring migraines often carried unexpressed emotional stress, grief, or systemic sleep deprivation. Conversely, clients seeking counselling for severe anxiety or burnout regularly suffered from persistent gut disorders and chronic muscle constriction."
                </p>
                <p>
                  "Conventional medicine often fractures this relationship — dividing you into isolated symptoms and sending you to five specialists who each prescribe chemical palliatives. At Arura, I created an integrated clinical sanctuary where acupuncture and psychological counselling exist side by side."
                </p>
                <p>
                  "When you lie on our treatment table, we don't just numb the pain. We listen to the rhythm of your pulse, the emotional undercurrents of your nervous system, and use microscopic sterile needles to awaken your body's extraordinary capacity for biological self-repair."
                </p>
              </div>

              {/* Clinical Commitment Card */}
              <div className="p-8 rounded-3xl spotlight-card border border-gray-200/80 space-y-4 bg-[#f8fafc]">
                <div className="flex items-center space-x-3 text-emerald-800">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                  <h4 className="font-display text-xl font-bold text-[#09090b]">The Arura Clinical Commitment</h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                  Every patient receives unhurried, private, one-on-one attention in dedicated clinical suites. No rushed 5-minute visits, no cookie-cutter prescriptions. Only rigorous, empathetic healthcare tailored to your exact nervous system and life circumstances.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">Consultation Time</span>
                    <p className="text-base font-semibold text-[#09090b]">45–60 Minutes</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">Needle Standard</span>
                    <p className="text-base font-semibold text-emerald-700">100% Sterile Single-Use</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">Therapy Setting</span>
                    <p className="text-base font-semibold text-[#09090b]">Strict Confidentiality</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
