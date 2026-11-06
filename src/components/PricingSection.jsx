import React from 'react';
import { Check, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRICING_DATA } from '../data/websiteContent';

export default function PricingSection({ onOpenBooking }) {
  return (
    <section id="pricing" className="py-24 bg-neutral-50/60 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-medium text-brand">Transparent investment</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-ink font-display tracking-tight">
            Honest clinical pricing <br />
            <span className="text-neutral-500 font-normal">Zero hidden surprises</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed pt-2">
            Every confirmed appointment guarantees focused, uninterrupted care with Dr. Nivedha Priyadharshini in a serene, private clinical setting.
          </p>
        </div>

        {/* Full-Bleed Editorial Pricing Rows */}
        <div className="space-y-6">
          {PRICING_DATA.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl p-8 sm:p-10 border border-neutral-200 hover:border-neutral-300 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-8 group"
            >
              {/* Left Column: Details & Philosophy */}
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-medium text-brand px-2.5 py-0.5 rounded-full bg-pink-50/70 border border-pink-200/60">
                    {plan.tagline}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">{plan.limitNotice}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-ink font-display">{plan.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{plan.description}</p>

                {/* Features inline list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-neutral-600">
                  {plan.features.slice(0, 4).map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Pricing Figure & Direct Trigger */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
                <div className="text-left lg:text-right">
                  <div className="text-4xl sm:text-5xl font-bold text-ink font-display tracking-tight">
                    {plan.priceFormatted}
                  </div>
                  <div className="text-xs font-medium text-neutral-500 mt-1">Per {plan.duration} session</div>
                </div>

                <button
                  onClick={() => onOpenBooking(plan.title, plan.price)}
                  className="px-6 py-3 rounded-full bg-ink text-white font-medium text-xs hover:bg-neutral-800 transition-colors flex items-center space-x-2 whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve {plan.title.split(' ')[0]} slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Standards Note */}
        <div className="mt-12 p-6 rounded-xl bg-white border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Advance reservation via UPI/GPay guarantees your dedicated doctor time slot without waiting queue.</span>
          </div>
          <span className="text-xs text-neutral-500 font-medium">100% Patient privacy guaranteed</span>
        </div>

      </div>
    </section>
  );
}
