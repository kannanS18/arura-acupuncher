import React from 'react';
import HeroSection from '../components/HeroSection';
import MarqueeTicker from '../components/MarqueeTicker';
import BentoGridSection from '../components/BentoGridSection';
import InteractiveMeridianExplorer from '../components/InteractiveMeridianExplorer';
import { ArrowRight, Sparkles, Shield, Heart, Activity, CheckCircle2, MapPin, GraduationCap, Clock } from 'lucide-react';
import { CLINIC_INFO, TESTIMONIALS } from '../data/websiteContent';
import { Link } from 'react-router-dom';

export default function HomePage({ onOpenBooking }) {
  return (
    <div className="bg-white text-[#09090b] space-y-0">
      
      {/* 1. Monumental White Luxury Hero Section */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 2. Kinetic Infinite Marquee Ticker */}
      <MarqueeTicker />

      {/* 3. High-End Asymmetric Bento Grid (The 4 Pillars) */}
      <BentoGridSection onOpenBooking={onOpenBooking} />

      {/* 4. Interactive Clinical Meridian Navigator */}
      <section className="py-24 bg-[#f8fafc] border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <InteractiveMeridianExplorer onOpenBooking={onOpenBooking} />
        </div>
      </section>

      {/* 5. Lead Healer Spotlight */}
      <section className="py-24 lg:py-32 bg-white border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="spotlight-card p-8 sm:p-10 rounded-3xl space-y-6 border border-gray-200/80">
                <div className="flex items-center space-x-5">
                  <div className="w-20 h-20 rounded-2xl bg-[#09090b] text-white flex items-center justify-center font-display text-3xl font-extrabold shadow-lg">
                    NP
                  </div>
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b]">Dr. Nivedha</h3>
                    <p className="text-xs text-[#581c87] uppercase tracking-wider font-bold mt-1">MD (Acupuncture) • Cambridge Dip.</p>
                    <p className="text-xs text-gray-500 mt-0.5">Founder & Lead Healer, Chennai</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-gray-700 font-light leading-relaxed border-t border-gray-100 pt-6">
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="w-5 h-5 text-[#581c87] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#09090b] font-medium">Doctor of Medicine in Acupuncture</strong>
                      <p className="text-xs text-gray-500 mt-0.5">Mastery of classical 14-meridian systems, radial pulse diagnostics, and moxibustion.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#09090b] font-medium">8+ Years Clinical Practice</strong>
                      <p className="text-xs text-gray-500 mt-0.5">Over 1,100+ patients healed across chronic joint pain, migraine syndromes, and clinical anxiety.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/doctor"
                    className="w-full btn-luxury-dark hover:bg-[#e02868] hover:border-[#e02868] py-4 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>Read Dr. Nivedha's Profile & Credentials →</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
                Clinical Philosophy
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b] leading-tight tracking-tight">
                "Healing happens when we listen to what the body whispers before it screams."
              </h2>
              <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
                Whether you are struggling with debilitating cervical spondylosis, recurrent migraines, or deep psychological burnout, our sanctuary provides unhurried, personalized care. Every session begins with pulse diagnostics and a warm, safe conversation.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs">
                <div className="spotlight-card p-4 rounded-xl border border-gray-200">
                  <div className="font-bold text-lg text-[#09090b]">₹600</div>
                  <div className="text-gray-500 text-[10px] mt-0.5 uppercase tracking-wider font-semibold">In-Depth Consultation</div>
                </div>
                <div className="spotlight-card p-4 rounded-xl border border-gray-200">
                  <div className="font-bold text-lg text-[#09090b]">₹600</div>
                  <div className="text-gray-500 text-[10px] mt-0.5 uppercase tracking-wider font-semibold">Acupuncture Session</div>
                </div>
                <div className="spotlight-card p-4 rounded-xl border border-gray-200 col-span-2 sm:col-span-1">
                  <div className="font-bold text-lg text-emerald-700">100% Sterile</div>
                  <div className="text-gray-500 text-[10px] mt-0.5 uppercase tracking-wider font-semibold">Zero Needle Reuse</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Documented Patient Recoveries */}
      <section className="py-24 lg:py-32 bg-[#f8fafc] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
              Verified Case Histories
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b] tracking-tight">
              Real Patient Transformations
            </h2>
            <p className="text-base text-gray-600 font-normal">
              Real patients from Chennai who reclaimed mobility, pain-free sleep, and psychological resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((item, idx) => (
              <div key={idx} className="spotlight-card p-8 rounded-3xl space-y-4 flex flex-col justify-between border border-gray-200/80">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-pink-50 text-[#e02868] text-xs uppercase tracking-wider font-bold border border-pink-200">
                    {item.tag}
                  </span>
                  <p className="text-sm sm:text-base text-gray-700 font-normal italic leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-display text-lg font-bold text-[#09090b]">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.location} • Verified Recovery</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/clinic"
              className="text-xs uppercase tracking-wider text-[#e02868] hover:text-black font-bold inline-flex items-center space-x-2"
            >
              <span>View Clinical Tariff & Care Guidelines →</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 7. Grand CTA Sanctuary Strip */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-[#09090b] text-white rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Subtle glow orb */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#e02868]/10 rounded-full blur-[100px] pointer-events-none" />

            <span className="text-xs uppercase tracking-wider text-pink-300 font-bold block">
              Sanctuary Hours • Virugambakkam, Chennai
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
              Begin your journey to root recovery today.
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Consultations are held privately at our Chennai sanctuary. Daily hours from 10:00 AM to 8:00 PM.
            </p>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/booking"
                className="btn-shimmer px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold shadow-2xl bg-[#e02868] text-white hover:bg-[#c21e54]"
              >
                Book Priority Consultation (₹600)
              </Link>
              <Link
                to="/clinic"
                className="btn-ghost-glass px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Clinic Tariff & Schedule
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
