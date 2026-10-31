import React from 'react';

/**
 * MeridianPulseWave — Medical Frequency & Biological ECG Flow
 * Smooth animated heartbeat & nervous system pulse line with glowing laser node.
 */
export default function MeridianPulseWave({ className = "", color = "#e02868" }) {
  return (
    <div className={`relative w-full h-12 overflow-hidden pointer-events-none ${className}`}>
      <svg 
        viewBox="0 0 1000 80" 
        className="w-full h-full" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pulseGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.05" />
            <stop offset="50%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
          
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background baseline faint wire */}
        <path
          d="M0,40 L240,40 L260,40 L275,15 L290,65 L305,30 L320,50 L335,40 L600,40 L620,40 L635,15 L650,65 L665,30 L680,50 L695,40 L1000,40"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.2"
        />

        {/* Active Animated Traveling Pulse Wave */}
        <path
          d="M0,40 L240,40 L260,40 L275,15 L290,65 L305,30 L320,50 L335,40 L600,40 L620,40 L635,15 L650,65 L665,30 L680,50 L695,40 L1000,40"
          stroke="url(#pulseGlowGrad)"
          strokeWidth="2.5"
          filter="url(#glowEffect)"
          className="animate-meridian-wave"
          strokeDasharray="180 320"
        />

        {/* Rhythmic Pulsating Biological Node on Heartbeat Spike */}
        <circle cx="275" cy="15" r="3.5" fill={color} className="animate-ping opacity-75" />
        <circle cx="275" cy="15" r="2.5" fill="#ffffff" />

        <circle cx="635" cy="15" r="3.5" fill={color} className="animate-ping opacity-75" />
        <circle cx="635" cy="15" r="2.5" fill="#ffffff" />
      </svg>
    </div>
  );
}
