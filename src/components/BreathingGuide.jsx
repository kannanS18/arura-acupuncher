import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Play, Pause, Sparkles, Heart } from 'lucide-react';

/**
 * BreathingGuide — Clinical Parasympathetic Respiration Widget
 * Authentic 4-4-6 vagus nerve regulation used at Arura Wellness Sanctuary
 */
export default function BreathingGuide() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (!isActive) {
      setPhase('Inhale');
      setCountdown(4);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases
        if (phase === 'Inhale') {
          setPhase('Hold');
          return 4;
        } else if (phase === 'Hold') {
          setPhase('Exhale');
          return 6;
        } else {
          setPhase('Inhale');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  return (
    <div className="rounded-3xl bg-[#f8fafc] border border-gray-200/90 p-6 sm:p-8 shadow-xs relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#e02868]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Explanation */}
        <div className="space-y-2 text-center md:text-left max-w-md">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs font-bold text-[#e02868]">
            <Wind className="w-3.5 h-3.5" />
            <span>Vagus Nerve Reset • Somatic Calming</span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#09090b]">
            Parasympathetic Breathing Rhythm
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
            Used prior to acupuncture needle placement to lower heart rate variability (HRV) and prepare the nervous system for neuro-meridian reception.
          </p>

          <div className="pt-2 flex items-center justify-center md:justify-start space-x-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#09090b] text-white hover:bg-[#e02868] transition-all inline-flex items-center space-x-2 shadow-xs active:scale-95"
            >
              {isActive ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Breathing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Begin Guided Respiration</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-gray-500 font-medium">
              {isActive ? 'Follow the circle rhythm' : 'Click to begin 60-sec reset'}
            </span>
          </div>
        </div>

        {/* Right: Respiration Circle Animation */}
        <div className="relative flex flex-col items-center justify-center w-44 h-44">
          
          {/* Animated Respiration Wave Ring */}
          <motion.div
            animate={{
              scale: isActive ? (phase === 'Inhale' ? 1.35 : phase === 'Hold' ? 1.35 : 0.9) : 1,
              opacity: isActive ? (phase === 'Inhale' ? 0.35 : phase === 'Hold' ? 0.45 : 0.15) : 0.2
            }}
            transition={{
              duration: isActive ? (phase === 'Inhale' ? 4 : phase === 'Hold' ? 0.3 : 6) : 2,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-[#e02868]/30 blur-md pointer-events-none"
          />

          {/* Solid Breathing Orb */}
          <motion.div
            animate={{
              scale: isActive ? (phase === 'Inhale' ? 1.25 : phase === 'Hold' ? 1.25 : 0.85) : 1,
              backgroundColor: isActive 
                ? (phase === 'Inhale' ? '#fdf2f8' : phase === 'Hold' ? '#ecfdf5' : '#f8fafc')
                : '#ffffff',
              borderColor: isActive 
                ? (phase === 'Inhale' ? '#e02868' : phase === 'Hold' ? '#10b981' : '#cbd5e1')
                : '#e2e8f0'
            }}
            transition={{
              duration: isActive ? (phase === 'Inhale' ? 4 : phase === 'Hold' ? 0.3 : 6) : 2,
              ease: "easeInOut"
            }}
            className="w-32 h-32 rounded-full border-2 shadow-inner flex flex-col items-center justify-center z-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={phase + countdown}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-center"
              >
                <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                  phase === 'Hold' ? 'text-emerald-700' : 'text-[#e02868]'
                }`}>
                  {isActive ? phase : 'Ready'}
                </span>
                <span className="font-display text-2xl font-bold text-[#09090b]">
                  {isActive ? `${countdown}s` : '4-4-6'}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

      </div>

    </div>
  );
}
