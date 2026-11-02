import React from 'react';
import { motion } from 'framer-motion';
import InteractiveMeridianExplorer from '../components/InteractiveMeridianExplorer';
import PlaceTheNeedleInteractive from '../components/PlaceTheNeedleInteractive';
import { Flame, Disc, Leaf, Zap, Sun, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MODALITIES = [
  {
    id: '01',
    title: 'Classical Meridian Needling',
    icon: <Activity className="w-5 h-5 text-brand" />,
    desc: 'Placement of hair-thin 0.18mm surgical stainless steel needles at designated meridian nerve clusters.',
    sensation: 'Gentle warmth, dull distension, or deep tingling (De Qi). Minimal sensation.',
    mechanism: 'Promotes microvascular dilation, endorphin release, and interrupts central pain perception loops.',
    indications: 'Migraines, sciatica, cervical spondylosis, anxiety, fibromyalgia'
  },
  {
    id: '02',
    title: 'Therapeutic Herbal Moxibustion',
    icon: <Flame className="w-5 h-5 text-amber-600" />,
    desc: 'Indirect thermal application of dried Artemisia argyi (mugwort) held comfortably above acupoints.',
    sensation: 'Deep penetrating soothing warmth radiating into muscles and joints.',
    mechanism: 'Disperses internal cold and damp stagnation, accelerates cellular repair, and tonifies Yang qi.',
    indications: 'Chronic knee arthritis, dysmenorrhea, frozen shoulder, digestive sluggishness'
  },
  {
    id: '03',
    title: 'Decompression Glass Cupping',
    icon: <Disc className="w-5 h-5 text-indigo-600" />,
    desc: 'Creation of localized therapeutic vacuum suction on dorsal and paraspinal muscles.',
    sensation: 'Comfortable stretching and release of tight, constricted muscle fascia.',
    mechanism: 'Mobilizes stagnant blood, draws lactic acid out of deep myofascial layers, and eases spasms.',
    indications: 'Trapezius knots, lower back stiffness, respiratory congestion, athletic fatigue'
  },
  {
    id: '04',
    title: 'Micro-Current Electro-Acupuncture',
    icon: <Zap className="w-5 h-5 text-amber-600" />,
    desc: 'Gentle, frequency-controlled micro-electrical stimulation passed between paired needle points.',
    sensation: 'Rhythmic, gentle rhythmic pulse or tapping sensation. Highly relaxing.',
    mechanism: 'Enhances nerve regeneration, releases motor unit contractures, and surges neuro-peptides.',
    indications: 'Severe sciatica, peripheral neuropathy, Bell’s palsy, muscular paralysis'
  },
  {
    id: '05',
    title: 'Far-Infrared TDP Mineral Heat',
    icon: <Sun className="w-5 h-5 text-orange-600" />,
    desc: 'Radiation from a proprietary 33-trace-mineral heating plate aligned with human bio-frequency.',
    sensation: 'Subtle, continuous nourishing warmth without surface skin burning.',
    mechanism: 'Stimulates micro-circulation at depth, accelerates lymphatic clearance, and soothes inflammation.',
    indications: 'Joint stiffness, menstrual cramps, post-injury healing, general cold sensitivity'
  },
  {
    id: '06',
    title: 'Myofascial Gua Sha Meridian Scraping',
    icon: <Leaf className="w-5 h-5 text-emerald-600" />,
    desc: 'Unidirectional scraping using polished water buffalo horn or jade tools lubricated with herbal balm.',
    sensation: 'Invigorating friction that immediately unglues stubborn fascia and tight bands.',
    mechanism: 'Produces transient petechiae representing extravasated blood, triggering anti-inflammatory enzymes.',
    indications: 'Chronic neck rigidity, upper back tightness, acute tension headaches, fever relief'
  }
];

const STEPS = [
  {
    num: '01',
    title: 'Radial Pulse Intake',
    desc: 'Reviewing sleep patterns, chronic inflammation, and pulse depth across 14 channels to pinpoint root blockages.',
    note: 'Duration: 15 to 20 mins'
  },
  {
    num: '02',
    title: 'Sterile Precision Needling',
    desc: 'Gentle insertion of hair-thin Japanese needles at 5 to 20 selected points. Sensation is mild warmth or light tingling.',
    note: '100% Single-use guarantee'
  },
  {
    num: '03',
    title: 'Qi Circulation Rest',
    desc: 'Rest on acoustic therapy beds under infrared TDP heat for 20 to 40 minutes while your body initiates self-healing.',
    note: 'Immediate autonomic relief'
  }
];

export default function AcupuncturePage({ onOpenBooking }) {
  return (
    <div className="bg-white text-ink">
      
      {/* Header Banner */}
      <section className="pt-16 pb-20 bg-ambient-light border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-3xl space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs text-brand font-semibold tracking-normal">
              Classical Meridian Science
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.12]">
              Precision Acupuncture and Targeted Meridian Medicine
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
              Precision biological stimulation of strategic nerve clusters to rebalance autonomic nervous tone, release natural endorphins, and dissolve chronic myofascial stagnation without pharmaceutical dependence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tactile "Place the Needle" Interactive & "How Thin?" Comparison */}
      <PlaceTheNeedleInteractive onOpenBooking={onOpenBooking} />

      {/* Interactive Clinical Meridian Navigator */}
      <section className="py-20 bg-surface-subtle border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveMeridianExplorer onOpenBooking={onOpenBooking} />
        </div>
      </section>

      {/* Direct Modality Grid (No detached tab selectors) */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            className="max-w-3xl space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
              Six Modalities Deployed at Arura
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
              Tailored dynamically during each treatment based on Dr. Nivedha’s diagnostic pulse evaluation:
            </p>
          </motion.div>

          {/* Architectural Modality Cards (No nested box clutter) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MODALITIES.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group p-8 rounded-3xl bg-white border border-neutral-200 hover:border-brand/60 hover:shadow-xl transition-colors duration-200 flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                {/* Top accent indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-neutral-100 pb-3">
                    <span className="font-display text-base font-bold text-ink/90 tabular-nums">
                      Modality {m.id}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      Safe & non-invasive
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ink group-hover:text-brand transition-colors leading-snug">
                    {m.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {m.desc}
                  </p>

                  <div className="pl-4 border-l-2 border-brand/40 py-1 space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-brand block">Sensation Felt:</span>
                      <p className="text-neutral-700 font-normal leading-relaxed">{m.sensation}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-neutral-500 block">Biological Mechanism:</span>
                      <p className="text-neutral-700 font-normal leading-relaxed">{m.mechanism}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-brand block">Clinical Indications:</span>
                      <p className="text-neutral-900 font-medium leading-relaxed">{m.indications}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-medium">Standard ₹600 session</span>
                  <Link
                    to="/booking"
                    className="text-xs font-semibold text-ink group-hover:text-brand inline-flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Book session</span>
                    <ArrowRight className="w-3.5 h-3.5 motion-safe:group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3-Step Clinical Protocol */}
      <section className="py-20 lg:py-24 bg-surface-subtle border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            className="max-w-2xl space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              What Happens in Your Session
            </h2>
            <p className="text-sm text-gray-600 font-normal">
              Clear, transparent clinical pacing from arrival to post-session recovery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {STEPS.map((st, i) => (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-xs"
              >
                <div className="w-10 h-10 rounded-2xl bg-pink-50 border border-pink-200 text-brand font-bold flex items-center justify-center text-sm">
                  {st.num}
                </div>
                <h3 className="font-display text-xl font-bold text-ink">
                  {st.title}
                </h3>
                <p className="text-sm text-gray-600 font-normal leading-relaxed">
                  {st.desc}
                </p>
                <div className="text-xs text-brand font-medium pt-2 border-t border-gray-100">
                  {st.note}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
