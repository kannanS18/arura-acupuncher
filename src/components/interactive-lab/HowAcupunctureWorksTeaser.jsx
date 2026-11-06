import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Layers, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Eye
} from 'lucide-react';

export default function HowAcupunctureWorksTeaser({ onOpenBooking }) {
  return (
    <section 
      aria-label="Interactive 3D Acupuncture Science Lab Teaser"
      className="relative py-20 lg:py-24 bg-surface-subtle border-b border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-brand" />
            <span>Interactive 3D Anatomy Lab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-[1.15]">
            How acupuncture works <br className="hidden sm:inline" />
            <span className="text-brand">beneath the skin</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Move beyond ancient mysticism. Explore our interactive 3D laboratory to articulate human body landmarks, trace neuro-fascial pathways, and observe needle interaction with living tissue strata.
          </p>
        </div>

        {/* 3-Stage Preview Architecture */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Macro Whole Body */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">
                  Stage 01 · Macro body
                </span>
                <span className="text-xs text-neutral-400 font-mono">360° orbit</span>
              </div>
              <h3 className="text-lg font-bold text-ink">
                3D Human Anatomy
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Articulate joints with natural 2-joint human kinematics. Inspect 39 clinical acupoints across head, spine, chest, arms, and legs in true anatomical coordinates.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-medium text-neutral-500">
              <Eye className="w-3.5 h-3.5 text-brand" />
              <span>Spherical camera orbit</span>
            </div>
          </div>

          {/* Card 2: Neural Science Mechanics */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">
                  Stage 02 · Neural science
                </span>
                <span className="text-xs text-neutral-400 font-mono">Fascial bridge</span>
              </div>
              <h3 className="text-lg font-bold text-ink">
                The Neurological Bridge
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Observe how mechanical stimulus excites A-beta sensory fibers, interrupts nociceptive pain in the spinal dorsal horn, and activates parasympathetic vagal regulation.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-medium text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Evidence-based neuro-endocrine pathway</span>
            </div>
          </div>

          {/* Card 3: Micro 3D Tissue Strata */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">
                  Stage 03 · Micro strata
                </span>
                <span className="text-xs text-neutral-400 font-mono">Tissue depth</span>
              </div>
              <h3 className="text-lg font-bold text-ink">
                Living Tissue Strata
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Inspect epidermal, dermal, and subcutaneous muscle layers. Simulate filiform needle depth, vacuum glass cupping, and localized mineral heat therapy.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-medium text-neutral-500">
              <Layers className="w-3.5 h-3.5 text-brand" />
              <span>Histological depth simulator</span>
            </div>
          </div>

        </div>

        {/* Central Launch Strip */}
        <div className="mt-10 p-7 sm:p-8 rounded-2xl bg-ink text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-neutral-400">
              <span className="size-2 rounded-full bg-emerald-500 inline-block" />
              <span>Hardware-accelerated 60 FPS 3D canvas</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Launch the 3D Acupuncture Anatomy Lab
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg font-normal">
              Explore bone landmarks, nerve conduits, and tissue depth directly in your browser.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/how-acupuncture-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand hover:bg-brand-dark text-white text-xs font-semibold transition-colors duration-200 shadow-xs cursor-pointer"
            >
              <span>Open 3D Science Lab</span>
              <ArrowRight className="size-3.5" />
            </Link>

            {onOpenBooking && (
              <button
                type="button"
                onClick={() => onOpenBooking('Acupuncture Assessment')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-colors duration-200 cursor-pointer"
              >
                <span>Book clinical visit</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
