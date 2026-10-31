import React from 'react';

/**
 * MeridianPulseWave — Medical Frequency & Biological ECG Flow
 * Smooth animated heartbeat & nervous system pulse line with glowing laser node.
 */
export default function MeridianPulseWave({ className = "", color = "#e02868", withTelemetry = false }) {
  const gradId = React.useId().replace(/:/g, '');
  
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {withTelemetry && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between text-xs text-neutral-500 font-medium border-b border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
            <span className="text-ink font-semibold">Classical 14-Meridian Pulse Diagnostic Stream</span>
          </div>
          <div className="flex items-center space-x-6 text-[11px] tabular-nums">
            <span>Radial frequency: <strong className="text-ink font-semibold">72 bpm</strong></span>
            <span className="hidden sm:inline">Vagal tone: <strong className="text-emerald-700 font-semibold">Parasympathetic</strong></span>
            <span className="hidden md:inline">Resonance: <strong className="text-neutral-700 font-semibold">1.2 Hz harmonic</strong></span>
          </div>
        </div>
      )}

      <div className="relative w-full h-14 overflow-hidden pointer-events-none">
        <svg 
          viewBox="0 0 1000 80" 
          className="w-full h-full" 
          fill="none" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`pulseGlow-${gradId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.1" />
              <stop offset="50%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
            
            <filter id={`glow-${gradId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background baseline faint wire */}
          <path
            d="M0,40 L180,40 L200,40 L215,15 L230,65 L245,30 L260,50 L275,40 L500,40 L520,40 L535,15 L550,65 L565,30 L580,50 L595,40 L800,40 L820,40 L835,15 L850,65 L865,30 L880,50 L895,40 L1000,40"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.25"
          />

          {/* Active Animated Traveling Pulse Wave */}
          <path
            d="M0,40 L180,40 L200,40 L215,15 L230,65 L245,30 L260,50 L275,40 L500,40 L520,40 L535,15 L550,65 L565,30 L580,50 L595,40 L800,40 L820,40 L835,15 L850,65 L865,30 L880,50 L895,40 L1000,40"
            stroke={`url(#pulseGlow-${gradId})`}
            strokeWidth="2.5"
            filter={`url(#glow-${gradId})`}
            className="animate-meridian-wave"
            strokeDasharray="160 300"
          />

          {/* Rhythmic Pulsating Biological Nodes on Heartbeat Spikes */}
          <circle cx="215" cy="15" r="4" fill={color} className="animate-ping opacity-80" />
          <circle cx="215" cy="15" r="2.5" fill="#ffffff" />

          <circle cx="535" cy="15" r="4" fill={color} className="animate-ping opacity-80" />
          <circle cx="535" cy="15" r="2.5" fill="#ffffff" />

          <circle cx="835" cy="15" r="4" fill={color} className="animate-ping opacity-80" />
          <circle cx="835" cy="15" r="2.5" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}
