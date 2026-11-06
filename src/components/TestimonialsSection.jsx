import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/websiteContent';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-neutral-50/60 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-medium text-brand">Patient stories</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-ink font-display tracking-tight">
            Words from those <br />
            <span className="text-neutral-500 font-normal">we have had the privilege to heal</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed pt-2">
            Real testimonies from Chennai residents whose lives were transformed by compassionate acupuncture and counseling.
          </p>
        </div>

        {/* Large Editorial Quotation Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 sm:p-10 border border-neutral-200 hover:border-neutral-300 transition-colors flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <Quote className="w-16 h-16 text-neutral-200/50 absolute -top-2 -right-2 pointer-events-none group-hover:text-neutral-200 transition-colors" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center space-x-2">
                  <span className="text-amber-500 text-sm font-medium tracking-wide">★★★★★</span>
                  <span className="text-xs text-brand font-medium px-2 py-0.5 rounded-full bg-pink-50/70 border border-pink-200/50">
                    {t.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center space-x-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-ink text-white font-medium text-sm flex items-center justify-center">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-neutral-900">{t.name}</h4>
                  <p className="text-[11px] text-neutral-500">{t.location} • Verified patient</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
