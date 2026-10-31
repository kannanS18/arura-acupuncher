import React from 'react';
import { CalendarCheck, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function HeroSection({ onOpenBooking }) {
  return (
    <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 bg-white text-[#09090b] overflow-hidden border-b border-gray-100">
      
      {/* Subtle Parasympathetic Breathing Aura (8s Gentle Cycle) */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#e02868]/10 rounded-full blur-[140px] pointer-events-none animate-breathe" />
      <div className="absolute -bottom-20 left-10 w-[350px] h-[350px] bg-slate-900/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Gentle Meridian Pulse Wave (Medical Frequency Flow) */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-20 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1200 120" className="w-full h-20 text-[#e02868]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path 
            className="animate-meridian-wave" 
            d="M0,60 L300,60 L330,60 L345,20 L360,100 L375,45 L390,75 L405,60 L700,60 L730,60 L745,20 L760,100 L775,45 L790,75 L805,60 L1200,60" 
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (6 cols): Concise Text with Staggered Scroll Reveal */}
          <motion.div 
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            
            {/* Status Pill */}
            <motion.div 
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs text-[#e02868] font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#e02868] animate-pulse" />
              <span>Classical Acupuncture & Psychotherapy • Chennai</span>
            </motion.div>

            {/* Punchy Headline (Few Words) */}
            <motion.h1 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Heal the root cause, <br />
              <span className="text-[#e02868]">not just the symptom.</span>
            </motion.h1>

            {/* Concise Medical Summary (2 Short Sentences Only) */}
            <motion.p 
              className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Classical 14-meridian acupuncture and certified psychotherapy by <strong className="text-gray-900 font-semibold">Dr. Nivedha Priyadharshini, MD (Acu)</strong>. Restoring chronic nerve pain, severe migraines, and stress in Virugambakkam.
            </motion.p>

            {/* Primary Actions */}
            <motion.div 
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <Link
                to="/booking"
                className="px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#e02868] text-white hover:bg-[#c21e54] shadow-lg shadow-pink-500/20 flex items-center justify-center space-x-2 transition-all active:scale-95 group"
              >
                <CalendarCheck className="w-4 h-4 text-white" />
                <span>Book Evaluation (₹600)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={CLINIC_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold bg-white text-gray-800 border border-gray-200 hover:border-emerald-600 hover:text-emerald-700 shadow-xs flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Desk</span>
              </a>
            </motion.div>

            {/* 3 Crisp Trust Points */}
            <motion.div 
              className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><AnimatedCounter end={100} suffix="%" /> Single-Use Needles</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#e02868] flex-shrink-0" />
                <span><AnimatedCounter end={8} suffix="+ Yrs" /> • <AnimatedCounter end={1100} suffix="+ Recoveries" /></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Private Acoustic Suites</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column (6 cols): Visual Reveal with Floating Frame */}
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-white group animate-serene-float">
              
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                <img 
                  src={getAssetUrl('hero_acupuncture_sanctuary.jpg')} 
                  alt="Authentic Gentle Acupuncture Treatment Session at Arura Wellness Sanctuary" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Hospital-Grade Aseptic Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 text-xs font-semibold text-gray-900 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Aseptic Surgical Protocol</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono tracking-widest text-pink-200 uppercase font-bold block">
                      CLINICAL PROCEDURE
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white">
                      Gentle 14-Meridian Needling
                    </h3>
                    <p className="text-[11px] text-white/80">0.18mm Hair-Thin Needles • Painless Insertion</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/50 text-emerald-300 text-[11px] font-bold">
                    ● Daily 10 AM – 8 PM
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
