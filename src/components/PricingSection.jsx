import React from 'react';
import { Check, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRICING_DATA } from '../data/websiteContent';

export default function PricingSection({ onOpenBooking }) {
  return (
    <section id="pricing" className="py-24 bg-[#faf8fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#581c87]">Transparent Investment</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#161820] font-display">
            Honest Clinical Pricing. <br />
            <span className="italic text-[#66478d]">Zero Hidden Surprises.</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-2">
            Every confirmed appointment guarantees focused, uninterrupted care with Dr. Nivedha Priyadharshini in a serene, private clinical setting.
          </p>
        </div>

        {/* Full-Bleed Editorial Pricing Rows (Not cheap generic boxes) */}
        <div className="space-y-6">
          {PRICING_DATA.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#ede7f3] hover:border-[#581c87] transition-all shadow-sm hover:shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 group"
            >
              {/* Left Column: Details & Philosophy */}
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold tracking-wider text-[#66478d] uppercase px-3 py-1 rounded-full bg-[#66478d]/10">
                    {plan.tagline}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{plan.limitNotice}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#161820] font-display">{plan.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{plan.description}</p>

                {/* Features inline list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-gray-500">
                  {plan.features.slice(0, 4).map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#581c87] flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Pricing Figure & Direct Trigger */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 border-[#ede7f3]">
                <div className="text-left lg:text-right">
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#161820] font-display tracking-tight">
                    {plan.priceFormatted}
                  </div>
                  <div className="text-xs font-semibold text-gray-500 mt-1">Per {plan.duration} session</div>
                </div>

                <button
                  onClick={() => onOpenBooking(plan.title, plan.price)}
                  className="btn-magnetic px-8 py-4 rounded-full bg-gradient-to-r from-[#66478d] to-[#581c87] text-white font-bold text-xs shadow-lg hover:shadow-xl flex items-center space-x-2 whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve {plan.title.split(' ')[0]} Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Standards Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#ede7f3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-[#581c87] flex-shrink-0" />
            <span>Advance reservation via UPI/GPay guarantees your dedicated doctor time slot without waiting queue.</span>
          </div>
          <span className="text-[11px] text-[#66478d] font-bold">100% Patient Privacy Guaranteed</span>
        </div>

      </div>
    </section>
  );
}
