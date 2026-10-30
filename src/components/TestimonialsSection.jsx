import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/websiteContent';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-[#faf8fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#581c87]">Patient Stories</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#161820] font-display">
            Words From Those <br />
            <span className="italic text-[#66478d]">We Have Had the Privilege to Heal.</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-2">
            Real testimonies from Chennai residents whose lives were transformed by compassionate acupuncture and counseling.
          </p>
        </div>

        {/* Large Editorial Quotation Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#ede7f3] hover:border-[#581c87] transition-all shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <Quote className="w-16 h-16 text-[#66478d]/10 absolute -top-2 -right-2 pointer-events-none group-hover:text-[#581c87]/15 transition-colors" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center space-x-2">
                  <span className="text-amber-400 text-sm font-bold tracking-wider">★★★★★</span>
                  <span className="text-[11px] text-[#581c87] font-bold px-2 py-0.5 rounded-full bg-pink-50">
                    {t.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-display italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center space-x-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#66478d] to-[#581c87] text-white font-display font-bold text-sm flex items-center justify-center shadow-md">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900">{t.name}</h4>
                  <p className="text-[11px] text-gray-400">{t.location} • Verified Patient</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
