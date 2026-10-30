import React from 'react';
import { PRICING_TIERS, CLINIC_INFO, DOS_DONTS } from '../data/websiteContent';
import { CheckCircle2, ShieldCheck, ArrowRight, PhoneCall, MessageCircle, Clock, Sparkles, HeartPulse, Award, AlertCircle } from 'lucide-react';

export default function PricingPage({ onOpenBooking }) {
  const sessionTiers = [
    {
      id: 'consultation',
      name: 'Initial Clinical Consultation',
      category: 'First Visit Diagnostic',
      price: '₹600',
      duration: '30 to 45 mins',
      popular: false,
      tagline: 'Deep root diagnosis before any needle touches your skin.',
      description: 'Comprehensive evaluation of your medical records, pain chronicity, sleep architecture, and stress load paired with classical radial pulse and tongue diagnostics.',
      deliverables: [
        '14-channel radial pulse assessment',
        'Tongue topography & internal organ evaluation',
        'Physical range of motion & pain mapping',
        'Customized multimodality treatment roadmap',
        'Direct consultation with Dr. Nivedha, MD (Acu)'
      ],
      ctaText: 'Book Consultation (₹600)',
      fee: 600
    },
    {
      id: 'acupuncture',
      name: 'Acupuncture Therapy Session',
      category: 'Targeted Needling & Pain Relief',
      price: '₹1,800',
      duration: '45 to 60 mins',
      popular: true,
      tagline: 'Precision needle therapy for joint, nerve, and visceral healing.',
      description: 'Sterile single-use hair-thin needle insertion along precise anatomical pathways to calm nerve spasms, down-regulate inflammation, and release endogenous endorphins.',
      deliverables: [
        '5 to 20 sterile single-use 0.18mm surgical needles',
        'Needles opened strictly in your personal presence',
        'Therapeutic TDP mineral heat lamp therapy included',
        'Complimentary glass cupping or moxa as indicated',
        'Post-treatment meridian balance verification'
      ],
      ctaText: 'Book Acupuncture (₹1,800)',
      fee: 1800
    },
    {
      id: 'counselling',
      name: 'Clinical Psychotherapy',
      category: 'Evidence-Based Mind Wellness',
      price: '₹1,800',
      duration: '50 minutes',
      popular: false,
      tagline: 'Confidential psychological care for stress, grief, and burnout.',
      description: 'One-on-one psychotherapy in our sound-dampened private acoustic suite. Integrates CBT, REBT, and Gestalt therapy to unburden subconscious trauma.',
      deliverables: [
        '50-minute unhurried, private dialogue',
        'Evidence-based CBT & cognitive reframing',
        'Emotional coping strategies & somatic regulation',
        '100% strictly confidential acoustic environment',
        'Available in-clinic or via secure online video'
      ],
      ctaText: 'Book Counselling (₹1,800)',
      fee: 1800
    },
    {
      id: 'dual',
      name: 'Mind-Body Dual Therapy',
      category: 'Integrated Complete Restoration',
      price: '₹2,400',
      duration: '75 to 90 mins',
      popular: false,
      tagline: 'Acupuncture + Psychotherapy conducted back-to-back.',
      description: 'The definitive Arura sanctuary protocol. Psychological dialogue unburdens emotional tension, followed immediately by full meridian needling to rewire pain pathways.',
      deliverables: [
        'Full 40-min Cambridge psychotherapy session',
        'Complete precision acupuncture treatment',
        'Infrared TDP lamp & somatic vagus calming',
        'Maximum neuro-biological and emotional synergy',
        'Most comprehensive transformative outcome'
      ],
      ctaText: 'Book Dual Session (₹2,400)',
      fee: 2400
    }
  ];

  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Editorial Header */}
      <section className="relative pt-24 pb-20 border-b border-gray-200/80 bg-ambient-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#581c87] text-xs uppercase tracking-wider font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Clinical Pricing</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Transparent Session Fees <br />
              <span className="text-[#581c87]">& Treatment Investments</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl">
              Honest healthcare pricing with zero hidden surcharges. Hospital-grade sterile single-use needles, TDP infrared heat, and pulse diagnostics are always unconditionally included.
            </p>
          </div>
        </div>
      </section>

      {/* Main Transparent Fee Cards — 4 Clear Columns, Full Legibility */}
      <section className="py-20 lg:py-28 border-b border-gray-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#581c87] font-bold">
                Direct Clinic Tariff
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b] mt-1">
                Clinical Service Options
              </h2>
            </div>
            <p className="text-sm text-gray-500 max-w-md">
              All sessions conducted privately 1-on-1 by Dr. Nivedha Priyadharshini, MD (Acu).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {sessionTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`p-6 sm:p-8 rounded-3xl spotlight-card flex flex-col justify-between space-y-6 relative transition-all ${
                  tier.popular 
                    ? 'border-2 border-[#581c87] shadow-xl bg-purple-50/20' 
                    : 'border border-gray-200/90 bg-white'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#581c87] text-white text-xs uppercase tracking-wider font-bold shadow-md">
                    Most Requested
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#581c87] font-bold block mb-1">
                      {tier.category}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#09090b]">
                      {tier.name}
                    </h3>
                    <div className="inline-flex items-center space-x-1.5 text-xs text-gray-600 mt-2 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#581c87]" />
                      <span>{tier.duration}</span>
                    </div>
                  </div>

                  <div className="font-display text-4xl sm:text-5xl text-[#09090b] font-bold tracking-tight border-b border-gray-100 pb-4">
                    {tier.price}
                    <span className="text-xs text-gray-500 font-sans font-normal ml-2">/ session</span>
                  </div>

                  <p className="text-sm text-gray-700 font-normal leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block">
                      What is Included:
                    </span>
                    {tier.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-gray-800 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => onOpenBooking(tier.name, tier.fee)}
                    className={`w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2 transition-all ${
                      tier.popular
                        ? 'btn-luxury-dark shadow-md'
                        : 'btn-luxury-outline hover:bg-gray-100'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Clinical Preparation: DOs and DON'Ts from Official Documentation */}
      <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#581c87] font-bold">
              Patient Guidelines
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b]">
              Preparing for Your Treatment Session
            </h2>
            <p className="text-base text-gray-600 font-normal">
              Follow these simple clinical instructions from Dr. Nivedha to ensure maximum therapeutic benefit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* DOs */}
            <div className="p-8 rounded-3xl bg-white border border-emerald-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 text-emerald-800 border-b border-emerald-100 pb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h3 className="font-display text-2xl font-bold">Recommended Clinical DOs</h3>
              </div>

              <div className="space-y-4">
                {DOS_DONTS.dos.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DONTs */}
            <div className="p-8 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 text-amber-900 border-b border-amber-100 pb-4">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <h3 className="font-display text-2xl font-bold">Important Precautions (DON'Ts)</h3>
              </div>

              <div className="space-y-4">
                {DOS_DONTS.donts.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Trust & FAQ Bottom Strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="font-display text-2xl font-bold text-[#09090b]">
            Need help choosing the right treatment?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto font-normal">
            Speak directly with Dr. Nivedha's clinic desk at Virugambakkam to discuss your medical condition.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="btn-luxury-outline px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-[#581c87]" />
              <span>Call {CLINIC_INFO.phone}</span>
            </a>
            <a
              href={CLINIC_INFO.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn-luxury-dark px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
