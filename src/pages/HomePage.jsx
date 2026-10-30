import React from 'react';
import HeroSection from '../components/HeroSection';
import BentoGridSection from '../components/BentoGridSection';
import InteractiveMeridianExplorer from '../components/InteractiveMeridianExplorer';
import { ArrowRight, Sparkles, Shield, Heart, Activity, CheckCircle2, MapPin, GraduationCap, Clock, Award, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO, TESTIMONIALS } from '../data/websiteContent';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';

export default function HomePage({ onOpenBooking }) {
  return (
    <div className="bg-white text-[#09090b]">
      
      {/* 1. Monumental Medical Sanctuary Hero (With Pulse Wave & Breathing Aura) */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 2. Clinical Integrity & Safety Showcases */}
      <BentoGridSection onOpenBooking={onOpenBooking} />

      {/* 3. Interactive Clinical Meridian Navigator */}
      <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <InteractiveMeridianExplorer onOpenBooking={onOpenBooking} />
        </div>
      </section>

      {/* 4. Lead Physician Spotlight (Authentic Photo & Clinical Focus) */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Authentic Physician Portrait Card */}
            <div className="lg:col-span-5">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#f8fafc] border border-gray-200 shadow-sm space-y-6">
                
                <div className="flex items-center space-x-5">
                  <div className="w-20 h-24 rounded-2xl overflow-hidden border-2 border-[#e02868] flex-shrink-0 shadow-md">
                    <img 
                      src={getAssetUrl('doctor_nivedha_portrait.jpg')} 
                      alt="Dr. Nivedha Priyadharshini"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-[#e02868] uppercase font-bold">
                      LEAD PRACTITIONER
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#09090b]">
                      Dr. Nivedha Priyadharshini
                    </h3>
                    <p className="text-xs text-gray-600 font-semibold">
                      MD (Acu) • Cambridge Intl Dip.
                    </p>
                    <p className="text-[11px] text-gray-500">
                      PG Dip. Counselling Therapy
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-sm text-gray-600 border-t border-gray-200 pt-5">
                  <div className="flex items-start space-x-3">
                    <Award className="w-4 h-4 text-[#e02868] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-semibold text-xs uppercase tracking-wide block">
                        Doctor of Medicine in Classical Acupuncture
                      </strong>
                      <p className="text-xs text-gray-500 mt-0.5">
                        14-Channel Pulse Diagnosis & Sterile Meridian Therapeutics.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-semibold text-xs uppercase tracking-wide block">
                        8+ Years • 1,100+ Recoveries
                      </strong>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Specialized clinical practice in Chinmaya Nagar, Virugambakkam.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/doctor"
                    className="w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#09090b] text-white hover:bg-[#e02868] flex items-center justify-center space-x-2 transition-all shadow-sm"
                  >
                    <span>View Doctor's Full Clinical Profile →</span>
                  </Link>
                </div>

              </div>
            </div>

            {/* Right: Clinical Philosophy & Approach */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold font-mono">
                [ CLINICAL PHILOSOPHY ]
              </span>
              
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b] leading-tight tracking-tight">
                "Healing happens when we listen to what the body whispers before it screams."
              </h2>
              
              <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
                Whether you are struggling with debilitating cervical spondylosis, recurrent migraines, or deep psychological burnout, our sanctuary provides unhurried, personalized care. Every session begins with radial pulse diagnostics and an attentive, private clinical conversation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#f8fafc] border border-gray-200">
                  <span className="text-xl font-bold text-[#09090b] block">₹600</span>
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Consultation & Pulse Evaluation</span>
                </div>
                <div className="p-4 rounded-xl bg-[#f8fafc] border border-gray-200">
                  <span className="text-xl font-bold text-[#e02868] block">₹600</span>
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Acupuncture Therapy Session</span>
                </div>
                <div className="p-4 rounded-xl bg-[#f8fafc] border border-gray-200">
                  <span className="text-xl font-bold text-emerald-700 block">100% Sterile</span>
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Single-Use Aseptic Standard</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/clinic"
                  className="text-xs uppercase tracking-wider text-[#e02868] hover:text-black font-bold inline-flex items-center space-x-2"
                >
                  <span>Explore Complete Medical Tariff & Care Guidelines →</span>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. Documented Patient Recoveries */}
      <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold font-mono">
              [ VERIFIED CASE HISTORIES ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b] tracking-tight">
              Real Patient Transformations
            </h2>
            <p className="text-base text-gray-600 font-normal">
              Patients from Chennai who reclaimed mobility, pain-free sleep, and autonomic resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-pink-50 text-[#e02868] text-xs uppercase tracking-wider font-bold border border-pink-200">
                    {item.tag}
                  </span>
                  <p className="text-sm sm:text-base text-gray-700 font-normal italic leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-display text-base font-bold text-[#09090b]">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.location} • Verified Recovery</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Sanctuary Booking Invitation (Clean, Minimalist Closing Frame) */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-[#09090b] text-white rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#e02868]/15 rounded-full blur-[100px] pointer-events-none" />

            <span className="text-xs uppercase tracking-wider text-[#e02868] font-mono font-bold block">
              [ UNHURRIED PRIVATE CARE • VIRUGAMBAKKAM, CHENNAI ]
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
              Begin your journey to root recovery today.
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-normal leading-relaxed">
              Consultations and treatments are conducted privately in acoustic suites at our Virugambakkam sanctuary. Open daily from 10:00 AM to 8:00 PM.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/booking"
                className="px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold shadow-lg bg-[#e02868] text-white hover:bg-[#c21e54] transition-all"
              >
                Book Priority Consultation (₹600)
              </Link>
              <Link
                to="/clinic"
                className="px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
              >
                View Clinic Tariff & Modalities
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
