import React, { useState } from 'react';
import InteractiveMeridianExplorer from '../components/InteractiveMeridianExplorer';
import { ACUPUNCTURE_TECHNIQUES } from '../data/websiteContent';
import { Flame, Disc, Leaf, Zap, Sun, Activity, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Thermometer, Compass, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AcupuncturePage({ onOpenBooking }) {
  const [selectedModality, setSelectedModality] = useState(0);

  const modalities = [
    {
      title: 'Classical Meridian Needling',
      icon: <Activity className="w-5 h-5 text-[#581c87]" />,
      desc: 'Placement of hair-thin 0.18mm surgical stainless steel needles at designated meridian nerve clusters.',
      sensation: 'Gentle warmth, dull distension, or deep tingling (known as De Qi). Almost zero pain.',
      mechanism: 'Promotes microvascular dilation, endorphin release, and interrupts central pain perception loops.',
      indications: 'Migraines, sciatica, cervical spondylosis, anxiety, fibromyalgia'
    },
    {
      title: 'Therapeutic Herbal Moxibustion',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      desc: 'Indirect thermal application of dried Artemisia argyi (mugwort) held comfortably above acupoints.',
      sensation: 'Deep penetrating soothing warmth radiating into muscles and joints.',
      mechanism: 'Disperses internal cold and damp stagnation, accelerates cellular repair, and tonifies Yang qi.',
      indications: 'Chronic knee arthritis, dysmenorrhea, frozen shoulder, digestive sluggishness'
    },
    {
      title: 'Decompression Glass Cupping',
      icon: <Disc className="w-5 h-5 text-indigo-600" />,
      desc: 'Creation of localized therapeutic vacuum suction on dorsal and paraspinal muscles.',
      sensation: 'Comfortable stretching and release of tight, constricted muscle fascia.',
      mechanism: 'Mobilizes stagnant blood, draws lactic acid out of deep myofascial layers, and eases spasms.',
      indications: 'Trapezius knots, lower back stiffness, respiratory congestion, athletic fatigue'
    },
    {
      title: 'Micro-Current Electro-Acupuncture',
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      desc: 'Gentle, frequency-controlled micro-electrical stimulation passed between paired needle points.',
      sensation: 'Rhythmic, gentle rhythmic pulse or tapping sensation. Highly relaxing.',
      mechanism: 'Enhances nerve regeneration, releases motor unit contractures, and surges neuro-peptides.',
      indications: 'Severe sciatica, peripheral neuropathy, Bell\'s palsy, muscular paralysis'
    },
    {
      title: 'Far-Infrared TDP Mineral Heat',
      icon: <Sun className="w-5 h-5 text-orange-600" />,
      desc: 'Radiation from a proprietary 33-trace-mineral heating plate aligned with human bio-frequency.',
      sensation: 'Subtle, continuous nourishing warmth without surface skin burning.',
      mechanism: 'Stimulates micro-circulation at depth, accelerates lymphatic clearance, and soothes inflammation.',
      indications: 'Joint stiffness, menstrual cramps, post-injury healing, general cold sensitivity'
    },
    {
      title: 'Myofascial Gua Sha Meridian Scraping',
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      desc: 'Unidirectional scraping using polished water buffalo horn or jade tools lubricated with herbal balm.',
      sensation: 'Invigorating friction that immediately unglues stubborn fascia and tight bands.',
      mechanism: 'Produces transient petechiae (sha) representing extravasated blood, triggering anti-inflammatory enzymes.',
      indications: 'Chronic neck rigidity, upper back tightness, acute tension headaches, fever relief'
    }
  ];

  return (
    <div className="bg-white text-[#09090b]">
      
      {/* Header Banner — Balanced & Proportional */}
      <section className="pt-16 pb-20 bg-ambient-light border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs uppercase tracking-wider text-[#581c87] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Classical Meridian Science</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Precision Acupuncture & <br />
              <span className="text-gradient-luxury">Targeted Meridian Medicine</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-2xl">
              Precision biological stimulation of strategic nerve clusters. Rebalancing autonomic nervous tone, releasing natural endorphins, and dissolving chronic myofascial stagnation without drug dependence.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Clinical Meridian Navigator */}
      <section className="py-20 bg-[#f8fafc] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveMeridianExplorer onOpenBooking={onOpenBooking} />
        </div>
      </section>

      {/* Interactive Clinical Modality Explorer (Replaces the generic 6-box grid) */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#581c87] font-bold">
              Integrated Therapies
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090b]">
              6 Specialized Modalities Deployed at Arura
            </h2>
            <p className="text-base text-gray-600 font-light">
              Tailored dynamically during each treatment based on Dr. Nivedha's diagnostic pulse evaluation:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Tabs (5 cols) */}
            <div className="lg:col-span-5 space-y-2">
              {modalities.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedModality(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between ${
                    selectedModality === idx
                      ? 'bg-[#09090b] text-white border-black shadow-md'
                      : 'bg-[#f8fafc] text-gray-800 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${selectedModality === idx ? 'bg-white/10' : 'bg-white shadow-xs'}`}>
                      {m.icon}
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold">{m.title}</div>
                      <div className={`text-[11px] ${selectedModality === idx ? 'text-gray-300' : 'text-gray-500'}`}>
                        Modality 0{idx + 1}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${selectedModality === idx ? 'text-white' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>

            {/* Right Detailed Showcase (7 cols) */}
            <div className="lg:col-span-7 bg-[#f8fafc] p-8 sm:p-10 rounded-3xl border border-gray-200/90 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-white border border-gray-200 shadow-xs">
                    {modalities[selectedModality].icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">Active Modality</span>
                    <h3 className="font-display text-2xl font-bold text-[#09090b]">{modalities[selectedModality].title}</h3>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    Safe & Non-Invasive
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">Procedure Summary:</span>
                  <p className="text-sm sm:text-base text-gray-800 font-light leading-relaxed">
                    {modalities[selectedModality].desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-1">
                    <span className="text-xs text-[#581c87] uppercase tracking-wider font-semibold block">Sensation Felt:</span>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      {modalities[selectedModality].sensation}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-1">
                    <span className="text-xs text-indigo-700 uppercase tracking-wider font-semibold block">Biological Mechanism:</span>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      {modalities[selectedModality].mechanism}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200/80 space-y-1">
                  <span className="text-xs text-[#581c87] uppercase tracking-wider font-bold block">Primary Clinical Indications:</span>
                  <p className="text-xs sm:text-sm text-purple-950 font-medium">
                    {modalities[selectedModality].indications}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  Included in standard session: <strong className="text-black">₹1,800</strong>
                </div>

                <button
                  onClick={() => onOpenBooking(modalities[selectedModality].title, 1800)}
                  className="w-full sm:w-auto btn-luxury-dark px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2"
                >
                  <span>Book This Modality (₹1,800)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3-Step Clinical Protocol (Horizontal Flow, NOT 3 box grid) */}
      <section className="py-20 lg:py-24 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#581c87] font-bold">
              The Treatment Journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b]">
              What Happens in Your Session
            </h2>
            <p className="text-sm text-gray-500 font-light">
              Clear, transparent clinical pacing from arrival to post-session recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-[#f8fafc] border border-gray-200 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#581c87] font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h3 className="font-display text-xl font-bold text-[#09090b]">In-Depth Radial Pulse Intake</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Reviewing sleep patterns, chronic inflammation, and pulse depth across 14 channels to pinpoint root blockages.
              </p>
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                Time: ~15 to 20 mins
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#f8fafc] border border-gray-200 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h3 className="font-display text-xl font-bold text-[#09090b]">Sterile Precision Needling</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Gentle insertion of hair-thin Japanese needles at 5–20 selected points. Sensation is mild warmth or light tingling.
              </p>
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                Needles: 100% Single-Use
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#f8fafc] border border-gray-200 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h3 className="font-display text-xl font-bold text-[#09090b]">Qi Circulation & Endorphin Surge</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Rest on acoustic therapy beds under infrared TDP heat for 20–40 minutes while your body initiates self-healing.
              </p>
              <div className="text-xs text-emerald-700 font-semibold pt-2 border-t border-gray-200">
                Outcome: Immediate Relief
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
