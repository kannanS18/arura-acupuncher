import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Flame, 
  CircleDot,
  Eye
} from 'lucide-react';

export default function HowAcupunctureWorksTeaser({ onOpenBooking }) {
  return (
    <section 
      aria-label="Interactive 3D Acupuncture Science Lab Teaser"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-neutral-50/70 to-white overflow-hidden border-t border-b border-neutral-200/80"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#e02868]/8 via-amber-500/5 to-cyan-500/6 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e02868]/10 border border-[#e02868]/20 text-[#e02868] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Clinical Anatomy Lab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#09090b] tracking-tight leading-[1.15]">
            Do You Know How Acupuncture <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e02868] via-rose-500 to-amber-600">
              Really Works Beneath Your Skin?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
            Move beyond ancient mysticism. Step inside our interactive 3D laboratory to articulate human body landmarks, trace neuro-fascial pathways, and dive beneath the epidermal strata into living muscle fibers.
          </p>
        </div>

        {/* Cinematic 3-Stage Preview Bento Grid */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Macro Whole Body */}
          <div className="relative group p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e02868]/5 rounded-bl-full pointer-events-none transition group-hover:scale-110" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e02868]/10 border border-[#e02868]/20 flex items-center justify-center text-[#e02868]">
                <Activity className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-600 uppercase tracking-wide">
                Stage 01 • Macro Body
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#e02868] transition">
                3D Whole Human Anatomy
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Articulate joints with natural 2-joint human kinematics. Inspect 39 clinical acupoints across head, spine, chest, arms, and legs in true anatomical coordinates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <Eye className="w-3.5 h-3.5 text-[#e02868]" />
              <span>Full 360° Spherical Orbit</span>
            </div>
          </div>

          {/* Card 2: Neural Science Mechanics */}
          <div className="relative group p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none transition group-hover:scale-110" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
                <Zap className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-600 uppercase tracking-wide">
                Stage 02 • Science Mechanics
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-amber-600 transition">
                The Neurological Bridge
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Witness how mechanical stimulus excites A-beta fibers, intercepts nociceptive pain in the spinal dorsal horn, and activates parasympathetic vagal anti-inflammatory tone.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Evidence-Based Neuro-Endocrine Loop</span>
            </div>
          </div>

          {/* Card 3: Micro 3D Tissue Strata */}
          <div className="relative group p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none transition group-hover:scale-110" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                <Layers className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-600 uppercase tracking-wide">
                Stage 03 • Micro Strata
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-600 transition">
                3D Living Tissue Surgery
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Dive beneath the epidermis into striated muscle and fascia. Operate filiform needles, flush fire cupping jars, and moxa heat to discharge spastic trigger knots.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
              <span>Histological Release & De-Qi Reset</span>
            </div>
          </div>

        </div>

        {/* Central Launch CTA Banner */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#e02868]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 text-center sm:text-left relative z-10">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#e02868]">
              <CircleDot className="w-3.5 h-3.5 animate-ping text-[#e02868]" />
              <span>Full-Screen Interactive Simulator Ready</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Experience the 3D Acupuncture Simulator
            </h3>
            <p className="text-sm text-neutral-300 max-w-xl">
              No installation required. Runs directly in your browser with hardware-accelerated 60 FPS graphics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <Link
              to="/how-acupuncture-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#e02868] hover:bg-[#c91f58] text-white text-sm font-bold shadow-lg shadow-[#e02868]/30 hover:shadow-xl hover:shadow-[#e02868]/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Launch 3D Anatomy Lab</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {onOpenBooking && (
              <button
                type="button"
                onClick={() => onOpenBooking('Acupuncture Assessment')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition"
              >
                <span>Book Clinical Visit</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
