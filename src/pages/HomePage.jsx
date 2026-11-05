import React from 'react';
import HeroSection from '../components/HeroSection';
import HowAcupunctureWorksTeaser from '../components/interactive-lab/HowAcupunctureWorksTeaser';
import ClinicalVisualGrid from '../components/ClinicalVisualGrid';
import InteractiveMeridianExplorer from '../components/InteractiveMeridianExplorer';
import MeridianPulseWave from '../components/MeridianPulseWave';
import { ArrowRight, CheckCircle2, Activity } from 'lucide-react';
import { TESTIMONIALS } from '../data/websiteContent';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';

export default function HomePage({ onOpenBooking }) {
  return (
    <div className="bg-white text-ink">
      
      {/* 1. Aesthetic Minimalist Hero */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 2. Living 14-Meridian Medical Pulse Diagnostic Ribbon */}
      <MeridianPulseWave withTelemetry={true} color="#e02868" className="border-b border-neutral-200/80 bg-white" />

      {/* 3. Interactive Acupuncture Lab Teaser (Fast ~90 kB homepage load) */}
      <HowAcupunctureWorksTeaser onOpenBooking={onOpenBooking} />

      {/* 4. Visual Clinical Pillars with Staggered Scroll Reveal */}
      <ClinicalVisualGrid onOpenBooking={onOpenBooking} />

      {/* 3. Direct Anatomical Meridian Pathways */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractiveMeridianExplorer onOpenBooking={onOpenBooking} />
          </motion.div>
        </div>
      </section>

      {/* 4. Lead Practitioner Spotlight: Editorial Layout */}
      <section className="py-20 lg:py-28 bg-surface-subtle border-b border-neutral-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Authentic Physician Portrait with Scroll Reveal */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
                
                <div className="flex items-center space-x-5">
                  <div className="w-24 h-28 rounded-2xl overflow-hidden border-2 border-brand flex-shrink-0 shadow-md">
                    <img 
                      src={getAssetUrl('doctor_nivedha_portrait.jpg')} 
                      alt="Dr. Nivedha Priyadharshini"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-brand font-semibold">
                      Lead practitioner
                    </p>
                    <h3 className="font-display text-2xl font-bold text-ink">
                      Dr. Nivedha Priyadharshini
                    </h3>
                    <p className="text-xs text-neutral-700 font-medium">
                      MD (Acu), Cambridge Intl Dip.
                    </p>
                    <p className="text-xs text-neutral-500">
                      PG Dip. Counselling Therapy
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-neutral-600 border-t border-neutral-100 pt-5">
                  <div className="flex items-center space-x-2.5">
                    <Activity className="w-4 h-4 text-brand flex-shrink-0 animate-pulse" />
                    <span className="font-semibold text-ink">Classical 14-Channel Pulse Diagnostics</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><AnimatedCounter end={8} suffix="+ Years" /> Clinical Practice, <AnimatedCounter end={1100} suffix="+ Recoveries" /></span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-neutral-700 flex-shrink-0" />
                    <span>Unhurried 1-on-1 Sanctuary Consultation</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/doctor"
                    className="w-full py-4 rounded-xl text-xs font-semibold bg-ink text-white hover:bg-brand flex items-center justify-center space-x-2 transition-colors duration-200 shadow-sm motion-safe:active:scale-[0.99]"
                  >
                    <span>View doctor’s profile and credentials</span>
                    <ArrowRight className="w-3.5 h-3.5 motion-safe:group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </motion.div>

            {/* Right: Editorial Philosophy & Transparent Tariff */}
            <motion.div 
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-ink leading-tight tracking-tight">
                “We treat what the body whispers before it screams.”
              </h2>
              
              <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-xl">
                Every session combines gentle meridian point stimulation with active listening. Chronic pain and emotional tension are resolved at their neuro-biological roots.
              </p>

              {/* Architectural Clinical Tariff Ledger (Replaces generic 3-card stack) */}
              <div className="border-t border-b border-neutral-200 divide-y divide-neutral-100 my-4">
                <div className="py-3.5 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-sm font-semibold text-ink block">Diagnostic Evaluation</span>
                    <span className="text-xs text-neutral-500 font-normal">Unhurried 14-meridian pulse diagnosis & medical history</span>
                  </div>
                  <span className="font-display text-lg font-bold text-ink tabular-nums">₹600</span>
                </div>
                <div className="py-3.5 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-sm font-semibold text-ink block">Classical Acupuncture Session</span>
                    <span className="text-xs text-neutral-500 font-normal">Precision nerve stimulation & localized thermal moxibustion</span>
                  </div>
                  <span className="font-display text-lg font-bold text-brand tabular-nums">₹600</span>
                </div>
                <div className="py-3.5 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-sm font-semibold text-ink block">Aseptic Sterility Guarantee</span>
                    <span className="text-xs text-neutral-500 font-normal">0.18mm surgical steel opened fresh in your presence</span>
                  </div>
                  <span className="text-xs font-semibold text-neutral-800 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200">
                    100% Single-use
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  to="/clinic"
                  className="text-xs text-ink hover:text-brand font-semibold inline-flex items-center space-x-2 transition-colors group"
                >
                  <span>View comprehensive clinic tariff and sanctuary guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* 5. Documented Patient Recoveries with Staggered Scroll Reveal */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <motion.div 
            className="text-center max-w-xl mx-auto space-y-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-ink tracking-tight">
              Verified Patient Transformations
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-normal">
              Clinical recoveries across chronic pain, migraine, and insomnia in Chennai.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((item, idx) => (
              <motion.div 
                key={idx} 
                className="p-8 rounded-3xl bg-sanctuary-texture border border-neutral-200 hover:border-neutral-300 transition-colors duration-200 space-y-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-brand tracking-normal">
                    {item.tag}
                  </div>
                  <p className="font-sans text-base sm:text-lg text-neutral-800 italic leading-relaxed">
                    “{item.text}”
                  </p>
                </div>
                <div className="border-t border-neutral-200/80 pt-4">
                  <div className="font-display text-sm font-bold text-ink">{item.name}</div>
                  <div className="text-xs text-neutral-500">{item.location}, Verified Patient Recovery</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Sanctuary Booking Invitation (Scroll Reveal) */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="bg-ink text-white rounded-3xl p-10 sm:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Begin your journey to root recovery today.
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-normal leading-relaxed">
              Consultations and treatments are conducted privately in acoustic suites at our Virugambakkam sanctuary. Open daily 10:00 AM to 8:00 PM.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/booking"
                className="px-8 py-4 rounded-xl text-xs font-semibold shadow-lg bg-brand text-white hover:bg-brand-dark transition-colors duration-200 motion-safe:active:scale-[0.98]"
              >
                Book priority consultation (₹600)
              </Link>
              <Link
                to="/clinic"
                className="px-8 py-4 rounded-xl text-xs font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors duration-200 motion-safe:active:scale-[0.98]"
              >
                View clinic tariff and modalities
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}
