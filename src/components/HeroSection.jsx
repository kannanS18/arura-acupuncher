import React from 'react';
import { CalendarCheck, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function HeroSection({ onOpenBooking }) {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-white text-ink overflow-hidden border-b border-neutral-200/80">
      
      {/* Minimalist Medical Pulse Line Divider */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-15 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1200 120" className="w-full h-20 text-brand" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path 
            className="animate-meridian-wave" 
            d="M0,60 L300,60 L330,60 L345,20 L360,100 L375,45 L390,75 L405,60 L700,60 L730,60 L745,20 L760,100 L775,45 L790,75 L805,60 L1200,60" 
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Aesthetic Minimalist Narrative */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            
            {/* Live Status Badge */}
            <motion.div 
              className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-surface-subtle border border-neutral-200 text-xs text-ink font-medium"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span>Acupuncture and clinical psychotherapy in Chennai</span>
            </motion.div>

            {/* Confident Minimalist Headline */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.08]">
                Heal the root cause, <br />
                <span className="text-brand">not just the symptom.</span>
              </h1>
              <p className="text-base sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-xl">
                Classical 14-meridian acupuncture and certified psychotherapy by <strong className="text-ink font-semibold">Dr. Nivedha Priyadharshini, MD (Acu)</strong>. Restoring chronic nerve pain, severe migraines, and autonomic burnout in Virugambakkam.
              </p>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div 
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              <Link
                to="/booking"
                className="px-8 py-4 rounded-2xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark flex items-center justify-center space-x-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-safe:active:scale-[0.98] shadow-sm"
              >
                <CalendarCheck className="w-4 h-4 text-white" />
                <span>Book evaluation (₹600)</span>
                <ArrowRight className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={CLINIC_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-4 rounded-2xl text-xs font-semibold bg-white text-neutral-800 border border-neutral-200 hover:border-emerald-600 hover:text-emerald-700 flex items-center justify-center space-x-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-safe:active:scale-[0.98] shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp concierge</span>
              </a>
            </motion.div>

            {/* 3 Minimalist Trust Anchors */}
            <motion.div 
              className="pt-6 border-t border-neutral-200/80 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-neutral-500 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><AnimatedCounter end={100} suffix="%" /> Single-use sterile needles</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span><AnimatedCounter end={8} suffix="+ Yrs" /> clinical experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-700 flex-shrink-0" />
                <span>Private acoustic suites</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column (5 cols): Framed Visual Artistry with Reveal */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm bg-surface-subtle group">
              
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-neutral-100">
                <img 
                  src={getAssetUrl('hero_acupuncture_sanctuary.jpg')} 
                  alt="Authentic Gentle Acupuncture Treatment Session at Arura Wellness Sanctuary" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Aseptic Protocol Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 text-xs font-semibold text-neutral-900 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Aseptic surgical protocol</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-display text-base sm:text-lg font-bold text-white">
                      Gentle 14-Meridian Needling
                    </h3>
                    <p className="text-xs text-white/80">0.18mm Hair-Thin Needles • Painless Insertion</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-white text-xs font-medium">
                    Daily 10 AM to 8 PM
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
