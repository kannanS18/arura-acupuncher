import React from 'react';
import { ShieldCheck, HeartPulse, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';

export default function ClinicalVisualGrid({ onOpenBooking }) {
  const pillars = [
    {
      title: "100% Single-Use Needles",
      subtitle: "Zero Pain • Surgical Grade",
      desc: "Pre-sterilized 0.18mm hair-thin needles opened in your presence and discarded into biohazard sharps containers.",
      img: "authentic_acupuncture_needles.jpg",
      badge: "Aseptic Guarantee"
    },
    {
      title: "Private Acoustic Suites",
      subtitle: "Unhurried Sanctuary Care",
      desc: "Soundproof treatment rooms with gentle infrared warmth, soft linens, and dedicated one-on-one doctor attention.",
      img: "zen_treatment.jpg",
      badge: "Virugambakkam Suite"
    },
    {
      title: "14-Meridian Precision",
      subtitle: "Root-Cause Bio-Energetics",
      desc: "Targeted nerve stimulation along classical meridians to dissolve deep muscle tension and reset autonomic rhythm.",
      img: "acu_treatment1.jpg",
      badge: "Classical Acupuncture"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header: Concise & Punchy */}
        <motion.div 
          className="text-center max-w-xl mx-auto space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold font-mono">
            [ CLINICAL STANDARDS ]
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b] tracking-tight">
            Medicine crafted for real recovery.
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Hospital-grade sterile techniques and peaceful private suites.
          </p>
        </motion.div>

        {/* 3-Column Image-Rich Visual Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#e02868] transition-all flex flex-col justify-between cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Authentic Clinical Photograph */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src={getAssetUrl(item.img)} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-gray-900 border border-gray-200 shadow-xs">
                  {item.badge}
                </span>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-pink-200 block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-display text-lg font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Concise Clinical Text */}
              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {item.desc}
                </p>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#e02868] group-hover:text-black transition-colors">
                  <span>Verified Standard</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
