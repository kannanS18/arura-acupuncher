import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';

export default function ClinicalVisualGrid({ onOpenBooking }) {
  const pillars = [
    {
      title: "100% Single-Use Needles",
      subtitle: "Zero pain • surgical grade",
      desc: "Pre-sterilized 0.18mm hair-thin needles opened in your presence and discarded into biohazard sharps containers.",
      img: "authentic_acupuncture_needles.jpg",
      badge: "Aseptic guarantee"
    },
    {
      title: "Private Acoustic Suites",
      subtitle: "Unhurried sanctuary care",
      desc: "Soundproof treatment rooms with gentle infrared warmth, soft linens, and dedicated one-on-one doctor attention.",
      img: "zen_treatment.jpg",
      badge: "Virugambakkam suite"
    },
    {
      title: "14-Meridian Precision",
      subtitle: "Root-cause bio-energetics",
      desc: "Targeted nerve stimulation along classical meridians to dissolve deep muscle tension and reset autonomic rhythm.",
      img: "acu_treatment1.jpg",
      badge: "Classical acupuncture"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface-subtle border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Medicine crafted for real recovery
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal">
            Hospital-grade sterile techniques and peaceful private suites in Chennai.
          </p>
        </div>

        {/* 3-Column Image-Rich Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-colors duration-150 flex flex-col justify-between cursor-pointer"
            >
              {/* Authentic Clinical Photograph */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src={getAssetUrl(item.img)} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-5 right-5 text-white">
                  <span className="text-[11px] text-pink-200/90 font-medium block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Concise Clinical Text */}
              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {item.desc}
                </p>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">{item.badge}</span>
                  <span className="font-semibold text-brand group-hover:text-ink inline-flex items-center space-x-1 transition-colors">
                    <span>Clinical protocol</span>
                    <ArrowRight className="w-3.5 h-3.5 motion-safe:group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
