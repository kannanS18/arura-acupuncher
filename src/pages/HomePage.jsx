import React from 'react';
import HeroSection from '../components/HeroSection';
import ClinicalVisualGrid from '../components/ClinicalVisualGrid';
import InteractiveMeridianExplorer from '../components/InteractiveMeridianExplorer';
import { ArrowRight, Sparkles, CheckCircle2, Clock, Award, ShieldCheck, CalendarCheck, PhoneCall } from 'lucide-react';
import { CLINIC_INFO, TESTIMONIALS } from '../data/websiteContent';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';

export default function HomePage({ onOpenBooking }) {
  return (
    <div className="bg-white text-ink">
      
      {/* 1. Hero Section: Few Words, Authentic Acupuncture Photography & Scroll Reveals */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 2. Visual Clinical Pillars: High-Def Images & Concise Captions */}
      <ClinicalVisualGrid onOpenBooking={onOpenBooking} />

      {/* 3. Interactive Clinical Meridian Navigator */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200/80 relative overflow-hidden">
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

      {/* 4. Lead Physician: Authentic Photo & Concise Credentials */}
      <section className="py-20 lg:py-28 bg-surface-subtle border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Authentic Physician Portrait Card with Scroll Reveal */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-7 sm:p-9 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
                
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-24 rounded-2xl overflow-hidden border-2 border-brand flex-shrink-0 shadow-md">
                    <img 
                      src={getAssetUrl('doctor_nivedha_portrait.jpg')} 
                      alt="Dr. Nivedha Priyadharshini"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-brand font-semibold">
                      Lead Practitioner
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                      Dr. Nivedha Priyadharshini
                    </h3>
                    <p className="text-xs text-gray-700 font-medium">
                      MD (Acu), Cambridge Intl Dip.
                    </p>
                    <p className="text-xs text-gray-500">
                      PG Dip. Counselling Therapy
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                    <span>Classical 14-Channel Pulse Diagnostics</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><AnimatedCounter end={8} suffix="+ Years" /> Clinical Practice • <AnimatedCounter end={1100} suffix="+ Recoveries" /></span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span>Unhurried 1-on-1 Sanctuary Consultation</span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to="/doctor"
                    className="w-full py-3.5 rounded-xl text-xs font-semibold bg-ink text-white hover:bg-brand flex items-center justify-center space-x-2 transition-colors shadow-xs"
                  >
                    <span>View Doctor’s Profile & Credentials</span>
                  </Link>
                </div>

              </div>
            </motion.div>

            {/* Right: Concise Philosophy & Transparent Fee Schedule */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight">
                “We treat what the body whispers before it screams.”
              </h2>
              
              <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-xl">
                Every session combines gentle meridian point stimulation with active listening. Chronic pain and emotional tension are resolved at their neuro-biological roots.
              </p>

              {/* 3 Transparent Medical Price Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
                  <span className="text-xl font-bold text-ink block">₹600</span>
                  <span className="text-xs text-gray-500 font-medium">Diagnostic Consultation</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
                  <span className="text-xl font-bold text-brand block">₹600</span>
                  <span className="text-xs text-gray-500 font-medium">Acupuncture Session</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
                  <span className="text-xl font-bold text-emerald-700 block">100% Sterile</span>
                  <span className="text-xs text-gray-500 font-medium">Single-Use Standard</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/clinic"
                  className="text-xs text-brand hover:text-black font-semibold inline-flex items-center space-x-1.5 transition-colors"
                >
                  <span>Explore complete medical tariff & care guidelines</span>
                </Link>
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* 5. Documented Patient Recoveries with Staggered Scroll Reveal */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            className="text-center max-w-xl mx-auto space-y-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              Verified Patient Transformations
            </h2>
            <p className="text-sm text-gray-600">
              Recoveries across chronic pain, migraine, and insomnia in Chennai.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((item, idx) => (
              <motion.div 
                key={idx} 
                className="p-7 rounded-2xl bg-surface-subtle border border-gray-200 shadow-xs hover:shadow-md transition-shadow duration-200 space-y-4 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-pink-50 text-brand text-xs font-medium border border-pink-200">
                    {item.tag}
                  </span>
                  <p className="text-sm text-gray-700 font-normal italic leading-relaxed">
                    “{item.text}”
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-display text-sm font-bold text-ink">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.location} • Verified Recovery</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Sanctuary Booking Invitation (Scroll Reveal) */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="bg-ink text-white rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Begin your journey to root recovery today.
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-normal leading-relaxed">
              Consultations and treatments are conducted privately in acoustic suites at our Virugambakkam sanctuary. Open daily 10:00 AM to 8:00 PM.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/booking"
                className="px-7 py-3.5 rounded-xl text-xs font-semibold shadow-lg bg-brand text-white hover:bg-brand-dark transition-colors"
              >
                Book Priority Consultation (₹600)
              </Link>
              <Link
                to="/clinic"
                className="px-7 py-3.5 rounded-xl text-xs font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
              >
                View Clinic Tariff & Modalities
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}
