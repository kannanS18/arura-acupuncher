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
            
            {/* Authentic Clinical Subtitle (No AI pill badge) */}
            <motion.div 
              className="flex items-center space-x-3 text-xs text-neutral-500 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="text-brand font-semibold">Arura Studio</span>
              <span className="text-neutral-300">/</span>
              <span>Virugambakkam, Chennai</span>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-700">Classical 14-Meridian Medicine</span>
            </motion.div>

            {/* Confident Modern Human-Crafted Headline */}
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
              </div>

              {/* Architectural Caption Strip (Human-crafted museum/clinical layout) */}
              <div className="p-5 bg-white border-t border-neutral-200/80 flex items-center justify-between text-xs">
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">
                    Classical 14-Meridian Needle Insertion
                  </h3>
                  <p className="text-neutral-500 text-[11px] mt-0.5 font-normal">
                    0.18mm hair-thin needles · Aseptic single-use guarantee
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-brand font-semibold text-[11px] block">
                    Virugambakkam Suite
                  </span>
                  <span className="text-neutral-500 text-[11px] tabular-nums font-medium">
                    Daily 10:00 AM to 8:00 PM
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
