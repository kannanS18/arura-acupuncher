import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, ShieldCheck, Info } from 'lucide-react';

// Authentic Clinical Acupoints on Hand & Forearm (Safe, Classic, Recognizable)
const ACUPOINTS = [
  {
    id: 'li4',
    code: 'LI4',
    name: 'Hegu',
    hanzi: '合谷',
    english: 'Joining Valley',
    channel: 'Large Intestine Meridian',
    x: 232, // SVG coordinate on hand
    y: 228,
    angle: -15, // insertion angle in degrees
    depth: '10–15mm',
    location: 'In the fleshy webbing between the thumb and index finger, at the highest point of the muscle when thumb and index are brought together.',
    indications: 'Traditionally indicated for acute headaches, frontal migraines, facial and jaw tension, toothache, sinus congestion, and systemic pain modulation.',
    sensation: 'Most patients feel a momentary feather-light tap as it passes the epidermal layer, followed by a warm, spreading dull ache or heaviness (the authentic “De-Qi” sensation). It is deeply calming, never sharp.',
    doctorTip: '“LI4 is one of the four legendary command points in classical acupuncture. It acts like a neurological circuit breaker for tension stored above the neck.” — Dr. Nivedha'
  },
  {
    id: 'pc6',
    code: 'PC6',
    name: 'Neiguan',
    hanzi: '内关',
    english: 'Inner Pass',
    channel: 'Pericardium Meridian',
    x: 320,
    y: 420,
    angle: 0,
    depth: '12–18mm',
    location: 'On the inner forearm, exactly two thumb-widths (2 cun) above the transverse wrist crease, nestled between the two palpable tendons (palmaris longus and flexor carpi radialis).',
    indications: 'Traditionally indicated for motion sickness, nausea, epigastric tightness, racing heart rate, palpitations, chest constriction, and autonomic anxiety loops.',
    sensation: 'A gentle tingling sensation that frequently travels down toward the middle finger or up into the chest, accompanied by an immediate sensation of deeper, unforced diaphragmatic breathing.',
    doctorTip: '“When executive patients arrive with tight chests and shallow breathing from chronic sympathetic burnout, PC6 is the first point I palpate to stimulate vagal calming.” — Dr. Nivedha'
  },
  {
    id: 'lu9',
    code: 'LU9',
    name: 'Taiyuan',
    hanzi: '太渊',
    english: 'Great Abyss',
    channel: 'Lung Meridian',
    x: 268,
    y: 358,
    angle: -8,
    depth: '8–12mm',
    location: 'At the radial end of the transverse wrist crease, in the anatomical depression just lateral to the radial pulse artery at the base of the thumb.',
    indications: 'Traditionally indicated for chronic cough, asthmatic wheezing, vascular circulation weakness, wrist joint stiffness, and depleted vital energy.',
    sensation: 'A faint, rhythmic throbbing sensation synchronized with the radial arterial pulse, followed by open warmth expanding along the thumb and palm.',
    doctorTip: '“LU9 is the gathering point of all vascular channels in the body. Palpating here gives me immediate diagnostic feedback on vascular tone and systemic circulation.” — Dr. Nivedha'
  },
  {
    id: 'ht7',
    code: 'HT7',
    name: 'Shenmen',
    hanzi: '神门',
    english: 'Spirit Gate',
    channel: 'Heart Meridian',
    x: 372,
    y: 362,
    angle: 12,
    depth: '8–12mm',
    location: 'At the ulnar end of the wrist crease, in the small soft depression on the radial border of the flexor carpi ulnaris tendon, directly aligned with the little finger.',
    indications: 'Traditionally indicated for stubborn insomnia, nocturnal racing thoughts, emotional agitation, grief, exam anxiety, and restless sleep patterns.',
    sensation: 'A soothing, tranquil heaviness that feels like a weighted blanket settling over your nervous system. Many patients drift into a micro-nap within minutes of placement.',
    doctorTip: '“In classical Chinese medical texts, Shenmen is translated as the Gate of the Spirit. It is our primary anchor when restoring disrupted sleep architecture.” — Dr. Nivedha'
  }
];

export default function PlaceTheNeedleInteractive({ onOpenBooking }) {
  // Interactive State
  const [activePoint, setActivePoint] = useState(null); // point where needle is currently placed
  const [hoveredPoint, setHoveredPoint] = useState(null); // point being hovered
  const [isDragging, setIsDragging] = useState(false);
  const [needlePos, setNeedlePos] = useState({ x: 50, y: 180 }); // relative coords in container
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [insertionStage, setInsertionStage] = useState('resting'); // 'resting', 'dragging', 'snapped', 'inserted'
  const [tiltAngle, setTiltAngle] = useState(25); // visual 3D tilt of needle
  const [ripplePoint, setRipplePoint] = useState(null); // coords for CSS skin ripple

  // Companion Slider: "How Thin?" Magnification & Gauge Comparison
  const [zoomLevel, setZoomLevel] = useState(12); // 1x to 25x magnification

  const containerRef = useRef(null);
  const svgRef = useRef(null);

  // Default Resting Tray Position
  const RESTING_POS = { x: 54, y: 160 };

  // Handle Drag Start
  const handlePointerDown = (e) => {
    if (insertionStage === 'inserted') return; // Must click remove first
    e.preventDefault();
    const container = containerRef.current.getBoundingClientRect();
    setIsDragging(true);
    setInsertionStage('dragging');
    setTiltAngle(28);

    setDragOffset({
      x: e.clientX - container.left - needlePos.x,
      y: e.clientY - container.top - needlePos.y
    });

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Handle Pointer Movement (Desktop Mouse & Touch)
  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const container = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - container.left - dragOffset.x;
    const currentY = e.clientY - container.top - dragOffset.y;

    setNeedlePos({ x: currentX, y: currentY });

    // Calculate needle tip in SVG coordinate space
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const svgRect = svgEl.getBoundingClientRect();

    // Map container pixel coords to SVG viewBox (0,0 to 600,600)
    const scaleX = 600 / svgRect.width;
    const scaleY = 600 / svgRect.height;
    const needleTipX = (e.clientX - svgRect.left) * scaleX;
    const needleTipY = (e.clientY - svgRect.top + 30) * scaleY; // tip is at bottom of needle element

    // Check proximity to any acupoint (snap distance threshold: 38 SVG units)
    let matched = null;
    for (const pt of ACUPOINTS) {
      const dist = Math.hypot(pt.x - needleTipX, pt.y - needleTipY);
      if (dist < 38) {
        matched = pt;
        break;
      }
    }
    setHoveredPoint(matched);
  };

  // Handle Pointer Up / Drop
  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    // Check if dropped near a point
    if (hoveredPoint) {
      insertIntoPoint(hoveredPoint);
    } else {
      // Return smoothly to tray
      setNeedlePos(RESTING_POS);
      setTiltAngle(25);
      setInsertionStage('resting');
    }
  };

  // Trigger Insertion Sequence at a Point
  const insertIntoPoint = (point) => {
    setActivePoint(point);
    setHoveredPoint(null);
    setInsertionStage('snapped');
    setTiltAngle(point.angle);

    // Position needle directly on point
    const svgEl = svgRef.current;
    const container = containerRef.current;
    if (svgEl && container) {
      const svgRect = svgEl.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();
      const pixelX = (point.x / 600) * svgRect.width + (svgRect.left - contRect.left);
      const pixelY = (point.y / 600) * svgRect.height + (svgRect.top - contRect.top) - 62;
      setNeedlePos({ x: pixelX, y: pixelY });
    }

    // Trigger physical skin ripple & sink animation
    setTimeout(() => {
      setInsertionStage('inserted');
      setRipplePoint({ x: point.x, y: point.y });

      // Clear ripple after 1.4s
      setTimeout(() => setRipplePoint(null), 1400);
    }, 280);
  };

  // Remove needle and reset
  const handleRemoveNeedle = () => {
    setInsertionStage('snapped');
    setTimeout(() => {
      setNeedlePos(RESTING_POS);
      setTiltAngle(25);
      setActivePoint(null);
      setInsertionStage('resting');
      setRipplePoint(null);
    }, 220);
  };

  // Direct click on a point shortcut for accessibility/quick try
  const handlePointClick = (point) => {
    if (activePoint?.id === point.id) return;
    insertIntoPoint(point);
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80 text-ink overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand tracking-normal">
            <span>Tactile Clinical Demonstration</span>
            <span className="text-neutral-300">/</span>
            <span>Zero-Fear Interactive</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.12]">
            What does classical acupuncture <br />
            <span className="text-brand">actually feel like?</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            First-time patients often carry a natural fear of injection needles. Classical acupuncture uses solid, hair-thin filaments (0.18mm) that slide between tissue fibers rather than cutting them. Pick up the needle below and test an authentic point on the hand.
          </p>
        </div>

        {/* MAIN INTERACTIVE BOARD: "Place the Needle" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (7 cols): The 3D Perspective Hand & Needle Board */}
          <div className="lg:col-span-7 bg-[#fbfbfa] rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs relative overflow-hidden select-none">
            
            {/* Top Bar / Instructions */}
            <div className="flex items-center justify-between border-b border-neutral-200/70 pb-4 mb-6 text-xs text-neutral-500 font-medium">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="font-semibold text-ink">
                  {insertionStage === 'inserted' 
                    ? `Needle Placed at ${activePoint.code} (${activePoint.name})` 
                    : isDragging 
                    ? 'Release near any pulsating point to place' 
                    : 'Drag the needle onto any point on the hand'}
                </span>
              </div>

              {insertionStage === 'inserted' && (
                <button
                  onClick={handleRemoveNeedle}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-brand text-white text-xs font-semibold transition-colors shadow-xs motion-safe:active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Remove needle</span>
                </button>
              )}
            </div>

            {/* Interactive Canvas Stage with 3D Perspective Tilt */}
            <div 
              ref={containerRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-[560px] mx-auto rounded-2xl bg-[#f4f2ee] border border-neutral-200/60 overflow-hidden cursor-crosshair"
              style={{
                perspective: '1200px',
                touchAction: 'none'
              }}
            >
              {/* Subtle Linen/Treatment Table Texture */}
              <div 
                className="absolute inset-0 opacity-40 pointer-events-none" 
                style={{
                  backgroundImage: `radial-gradient(#d1cfc7 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Wooden Rest Tray for Needle */}
              <div className="absolute top-6 left-6 w-20 h-44 rounded-xl bg-[#e5e0d8] border border-[#d6cfc3] shadow-inner p-2 pointer-events-none flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block text-center">
                  Sterile Tray
                </span>
                <div className="w-full h-px bg-neutral-300" />
                <span className="text-[9px] text-neutral-400 block text-center">
                  0.18mm Single-Use
                </span>
              </div>

              {/* Calm Anatomical Vector Illustration of Right Hand & Wrist */}
              <svg 
                ref={svgRef}
                viewBox="0 0 600 600" 
                className="w-full h-full transform transition-transform duration-500"
                style={{
                  transform: 'rotateX(14deg) rotateZ(-3deg) scale(0.96)',
                  transformOrigin: '50% 60%'
                }}
              >
                <defs>
                  {/* Natural Skin Tones with Soft Shading */}
                  <linearGradient id="handSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f3ded0" />
                    <stop offset="60%" stopColor="#ebd2c3" />
                    <stop offset="100%" stopColor="#dfc3b2" />
                  </linearGradient>

                  <linearGradient id="tendonShade" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e2c8b8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#cfaea0" stopOpacity="0.1" />
                  </linearGradient>

                  <filter id="softHandShadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#26211c" floodOpacity="0.12" />
                  </filter>
                </defs>

                {/* Hand Soft Ambient Cast Shadow */}
                <path 
                  d="M 230 540 L 230 380 Q 180 320 160 250 Q 140 190 170 140 Q 200 110 230 160 Q 260 210 270 240 Q 290 120 310 70 Q 330 40 350 70 Q 360 110 350 210 Q 380 90 400 60 Q 420 40 440 70 Q 440 120 420 220 Q 460 110 480 100 Q 500 100 500 130 Q 480 200 470 260 Q 490 280 500 320 Q 490 380 430 410 L 430 540 Z"
                  fill="#000000"
                  opacity="0.08"
                  filter="blur(16px)"
                  transform="translate(8, 18)"
                />

                {/* Hand & Forearm Silhouette */}
                <g filter="url(#softHandShadow)">
                  {/* Main Skin Contour */}
                  <path 
                    d="M 240 550 
                       L 240 380 
                       Q 200 340 175 270 
                       Q 155 210 175 160 
                       Q 195 130 225 165 
                       Q 250 205 265 245 
                       Q 285 140 305 80 
                       Q 325 50 345 80 
                       Q 355 120 348 215 
                       Q 375 100 395 70 
                       Q 415 50 435 80 
                       Q 435 130 418 225 
                       Q 455 120 475 110 
                       Q 495 110 495 140 
                       Q 478 205 465 265 
                       Q 490 290 495 330 
                       Q 485 385 425 415 
                       L 425 550 
                       Z"
                    fill="url(#handSkinGrad)"
                    stroke="#ceb09e"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* Anatomical Contours & Flexor Tendons */}
                  {/* Thumb web curve */}
                  <path d="M 235 245 Q 260 270 280 275" fill="none" stroke="#cfb2a2" strokeWidth="1.5" />
                  
                  {/* Transverse wrist creases */}
                  <path d="M 255 365 Q 330 380 410 365" fill="none" stroke="#c8ab9b" strokeWidth="1.2" strokeDasharray="3 2" />
                  <path d="M 260 378 Q 335 392 415 378" fill="none" stroke="#d5b9aa" strokeWidth="1" />

                  {/* Flexor carpi radialis & Palmaris longus tendons (The channel where PC6 sits) */}
                  <path d="M 310 380 L 310 520" fill="none" stroke="url(#tendonShade)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 335 380 L 335 520" fill="none" stroke="url(#tendonShade)" strokeWidth="6" strokeLinecap="round" />

                  {/* Anatomical Snuffbox / Radial Artery Groove (LU9 area) */}
                  <path d="M 258 350 Q 252 375 250 400" fill="none" stroke="#d1b5a5" strokeWidth="1.5" />

                  {/* Classical Meridian Energy Flow Lines (Subtle, non-glow, faint dotted) */}
                  <path d="M 232 170 Q 235 230 250 370" fill="none" stroke="#e02868" strokeWidth="0.8" strokeDasharray="3 4" strokeOpacity="0.4" />
                  <path d="M 320 220 L 320 540" fill="none" stroke="#e02868" strokeWidth="0.8" strokeDasharray="3 4" strokeOpacity="0.4" />
                  <path d="M 372 260 L 372 540" fill="none" stroke="#e02868" strokeWidth="0.8" strokeDasharray="3 4" strokeOpacity="0.4" />
                </g>

                {/* Faint Physical Skin Ripple when Needle Enters (CSS border wave, zero neon glow) */}
                {ripplePoint && (
                  <g>
                    <circle cx={ripplePoint.x} cy={ripplePoint.y} r="10" fill="none" stroke="#b08b76" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                    <circle cx={ripplePoint.x} cy={ripplePoint.y} r="22" fill="none" stroke="#c9a794" strokeWidth="1" opacity="0.4" />
                    <circle cx={ripplePoint.x} cy={ripplePoint.y} r="4" fill="#a47a66" opacity="0.8" />
                  </g>
                )}

                {/* 4 Clinical Acupoint Markers */}
                {ACUPOINTS.map((pt) => {
                  const isHovered = hoveredPoint?.id === pt.id;
                  const isPlaced = activePoint?.id === pt.id;

                  return (
                    <g 
                      key={pt.id} 
                      className="cursor-pointer"
                      onClick={() => handlePointClick(pt)}
                    >
                      {/* Interaction Target Buffer Zone */}
                      <circle cx={pt.x} cy={pt.y} r="30" fill="transparent" />

                      {/* Calm Organic Marker Dot */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={isHovered ? "9" : isPlaced ? "6" : "5"} 
                        fill={isPlaced ? "#e02868" : isHovered ? "#09090b" : "#ffffff"} 
                        stroke={isPlaced ? "#ffffff" : isHovered ? "#ffffff" : "#e02868"} 
                        strokeWidth={isHovered ? "2.5" : "2"}
                        className="transition-all duration-300"
                      />

                      {/* Gentle Non-Glow Pulse Ring when awaiting placement */}
                      {!activePoint && (
                        <circle 
                          cx={pt.x} 
                          cy={pt.y} 
                          r="12" 
                          fill="none" 
                          stroke="#e02868" 
                          strokeWidth="1" 
                          strokeOpacity="0.4"
                          className="animate-pulse"
                        />
                      )}

                      {/* Acupoint Code Label */}
                      <text 
                        x={pt.x} 
                        y={pt.y - 14} 
                        textAnchor="middle" 
                        fill="#09090b" 
                        fontSize="11" 
                        fontWeight="700" 
                        fontFamily="Outfit, sans-serif"
                        className="select-none pointer-events-none tracking-tight"
                      >
                        {pt.code}
                      </text>
                      
                      <text 
                        x={pt.x} 
                        y={pt.y + 22} 
                        textAnchor="middle" 
                        fill="#52525b" 
                        fontSize="9.5" 
                        fontWeight="600" 
                        fontFamily="Plus Jakarta Sans, sans-serif"
                        className="select-none pointer-events-none"
                      >
                        {pt.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* THE TACTILE NEEDLE (Draggable HTML Element with Physics) */}
              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className={`absolute z-30 transition-transform ${
                  isDragging ? 'cursor-grabbing scale-105' : insertionStage === 'inserted' ? 'cursor-pointer' : 'cursor-grab hover:scale-105'
                }`}
                style={{
                  left: `${needlePos.x}px`,
                  top: `${needlePos.y}px`,
                  transform: `rotate(${tiltAngle}deg) ${insertionStage === 'inserted' ? 'translateY(28px)' : ''}`,
                  transformOrigin: '50% 100%',
                  transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), left 0.35s ease, top 0.35s ease'
                }}
              >
                {/* Needle Visual Structure: Coiled Wire Handle + Micro Steel Shaft */}
                <div className="relative flex flex-col items-center">
                  
                  {/* Coiled Spiral Handle (Traditional Korean/Japanese copper/silver coil) */}
                  <div className="w-[6px] h-14 rounded-t-sm bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 shadow-md border-x border-neutral-400/80 flex flex-col justify-between py-0.5">
                    {/* Ring loops */}
                    <div className="w-full h-1 bg-neutral-400/60 rounded-full" />
                    <div className="w-full h-1 bg-neutral-400/60 rounded-full" />
                    <div className="w-full h-1 bg-neutral-400/60 rounded-full" />
                    <div className="w-full h-1 bg-neutral-400/60 rounded-full" />
                    <div className="w-full h-1 bg-neutral-400/60 rounded-full" />
                  </div>

                  {/* Shaft Ring Collar */}
                  <div className="w-2 h-1 bg-neutral-500 rounded-sm shadow-xs" />

                  {/* 0.18mm Hair-Thin Surgical Stainless Steel Shaft */}
                  <div 
                    className="w-[1.8px] bg-gradient-to-r from-neutral-200 via-white to-neutral-300 shadow-xs transition-all duration-500"
                    style={{
                      height: insertionStage === 'inserted' ? '28px' : '65px' // Shaft shortens as it enters tissue
                    }}
                  />

                  {/* Micro Needle Tip */}
                  <div className="w-0 h-0 border-x-[0.9px] border-x-transparent border-t-[3px] border-t-neutral-300" />

                  {/* Subtle Needle Cast Shadow on Table / Skin */}
                  <div 
                    className="absolute -bottom-1 w-8 h-1 bg-black/20 rounded-full filter blur-[1px] transform -translate-x-1" 
                    style={{
                      opacity: insertionStage === 'inserted' ? 0.3 : isDragging ? 0.15 : 0.4
                    }}
                  />
                </div>
              </div>

              {/* Mobile / Direct Touch Hint */}
              {!activePoint && !isDragging && (
                <div className="absolute bottom-4 left-6 right-6 text-center sm:text-left pointer-events-none">
                  <span className="text-[11px] text-neutral-500 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-xs inline-block">
                    Tip: Drag the needle or tap any labeled point to insert
                  </span>
                </div>
              )}

            </div>

            {/* Bottom Status Ticker */}
            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-neutral-500 pt-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Needle Spec: 0.18mm × 30mm Surgical Steel 316L (Single-use)</span>
              </div>
              <span className="tabular-nums font-medium text-neutral-700">Sterility: EO Gas 100%</span>
            </div>

          </div>

          {/* Right Column (5 cols): Dr. Nivedha's Clinical Note Card (Fades & Slides In) */}
          <div className="lg:col-span-5 space-y-6">
            
            <AnimatePresence mode="wait">
              {activePoint ? (
                <motion.div
                  key={activePoint.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 rounded-3xl bg-[#fdfcfa] border border-neutral-200 shadow-sm space-y-6"
                >
                  {/* Point Header */}
                  <div className="flex items-baseline justify-between border-b border-neutral-100 pb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold font-display text-ink">{activePoint.code}</span>
                        <span className="text-xl font-display font-medium text-neutral-600">· {activePoint.name}</span>
                        <span className="text-sm font-normal text-neutral-400 font-sans">({activePoint.hanzi})</span>
                      </div>
                      <p className="text-xs text-brand font-semibold mt-0.5">
                        {activePoint.channel} · “{activePoint.english}”
                      </p>
                    </div>

                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200">
                      Depth: {activePoint.depth}
                    </span>
                  </div>

                  {/* 1. Exact Anatomical Location */}
                  <div className="space-y-1.5">
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block">
                      Anatomical Landmark
                    </span>
                    <p className="text-sm text-neutral-800 leading-relaxed font-normal">
                      {activePoint.location}
                    </p>
                  </div>

                  {/* 2. Traditional Purpose */}
                  <div className="space-y-1.5">
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block">
                      Primary Clinical Indication
                    </span>
                    <p className="text-sm text-neutral-800 leading-relaxed font-normal">
                      {activePoint.indications}
                    </p>
                  </div>

                  {/* 3. The Real Sensation ("De-Qi") */}
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-1.5">
                    <span className="text-xs font-bold text-amber-900 block flex items-center space-x-1.5">
                      <span>What It Actually Feels Like (De-Qi):</span>
                    </span>
                    <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed font-normal">
                      {activePoint.sensation}
                    </p>
                  </div>

                  {/* 4. Doctor Nivedha's Perspective */}
                  <div className="border-t border-neutral-100 pt-4 text-xs italic text-neutral-600 leading-relaxed">
                    {activePoint.doctorTip}
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 flex items-center space-x-4">
                    <button
                      onClick={handleRemoveNeedle}
                      className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-ink transition-colors"
                    >
                      Try another point
                    </button>
                    <button
                      onClick={() => onOpenBooking(`Consultation (${activePoint.code} protocol)`, 600)}
                      className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                    >
                      <span>Book session (₹600)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </motion.div>
              ) : (
                <div className="p-8 rounded-3xl bg-neutral-50/60 border border-neutral-200/80 space-y-6">
                  <div className="flex items-center space-x-3 text-brand">
                    <Info className="w-5 h-5 flex-shrink-0" />
                    <h3 className="font-display text-xl font-bold text-ink">
                      Select Any Point to Inspect
                    </h3>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    Drag the coiled-handle needle from the sterile tray and drop it onto any of the 4 classic hand points (<strong>LI4, PC6, LU9, HT7</strong>), or simply tap any marker on the hand.
                  </p>

                  <div className="space-y-3 pt-2">
                    {ACUPOINTS.map((pt) => (
                      <div 
                        key={pt.id}
                        onClick={() => handlePointClick(pt)}
                        className="p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-brand hover:shadow-xs transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-sm text-ink">{pt.code} · {pt.name}</span>
                          <span className="text-xs text-neutral-500 block">{pt.english}</span>
                        </div>
                        <span className="text-xs font-semibold text-brand">Try point →</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-neutral-200/60 pt-4 text-xs text-neutral-500 leading-relaxed">
                    “In our Virugambakkam clinic, every needle is unhurriedly placed with patient awareness. There are no sudden shocks.” — Dr. Nivedha
                  </div>
                </div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* COMPANION MINI-INTERACTION: "How Thin?" True Scale Comparison */}
        <div className="pt-8 border-t border-neutral-200">
          <div className="bg-[#fbfbfa] rounded-3xl border border-neutral-200 p-8 sm:p-12 space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs uppercase tracking-wider text-brand font-bold block">
                  Companion Scale Comparison
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  How thin is 0.18 millimeters?
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  Overlaying three real objects at true relative scale. Notice how the acupuncture needle compares to a human hair, and why it feels completely different from a standard hospital injection syringe.
                </p>
              </div>

              {/* Magnification Slider Control */}
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2 min-w-[240px]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-700">Microscope Zoom</span>
                  <span className="font-bold text-brand tabular-nums">{zoomLevel}× Scale</span>
                </div>
                <input 
                  type="range"
                  min="4"
                  max="24"
                  step="1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand"
                />
              </div>
            </div>

            {/* True Relative Scale Visual Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-stretch">
              
              {/* 1. Human Hair */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Reference</span>
                    <span className="text-xs font-bold text-neutral-800 tabular-nums">~0.08 mm</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-ink">Human Scalp Hair</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Average human hair shaft diameter (80 microns). Flexible biological keratin fiber.
                  </p>
                </div>

                {/* Scaled Cross-Section Gauge Visual */}
                <div className="py-6 bg-neutral-50 rounded-xl flex items-center justify-center relative h-28 overflow-hidden">
                  <div 
                    className="bg-amber-900/80 rounded-full shadow-xs"
                    style={{
                      width: `${0.08 * zoomLevel * 14}px`,
                      height: `${0.08 * zoomLevel * 14}px`,
                      minWidth: '4px',
                      minHeight: '4px'
                    }}
                  />
                  <span className="absolute bottom-2 text-[10px] text-neutral-400 font-medium">
                    Actual Cross-Section at {zoomLevel}×
                  </span>
                </div>

                <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-100">
                  Solid organic filament
                </div>
              </div>

              {/* 2. Arura Acupuncture Needle (Hero) */}
              <div className="p-6 rounded-2xl bg-white border-2 border-brand shadow-sm space-y-4 flex flex-col justify-between relative">
                <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-brand text-white text-[10px] font-bold uppercase tracking-wider">
                  Arura Standard
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand uppercase tracking-wider">Solid Needle</span>
                    <span className="text-xs font-bold text-brand tabular-nums">0.18 mm</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-ink">Arura Acupuncture Needle</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Surgical stainless steel 316L. Just over twice the thickness of a single hair strand.
                  </p>
                </div>

                {/* Scaled Cross-Section Gauge Visual */}
                <div className="py-6 bg-neutral-50 rounded-xl flex items-center justify-center relative h-28 overflow-hidden border border-brand/20">
                  <div 
                    className="bg-neutral-800 rounded-full border border-neutral-400 shadow-sm"
                    style={{
                      width: `${0.18 * zoomLevel * 14}px`,
                      height: `${0.18 * zoomLevel * 14}px`
                    }}
                  />
                  <span className="absolute bottom-2 text-[10px] text-brand font-semibold">
                    Solid Pin-Point · Does not cut tissue
                  </span>
                </div>

                <div className="text-[11px] text-neutral-700 font-medium pt-1 border-t border-neutral-100">
                  Slides between muscle fibers painlessly
                </div>
              </div>

              {/* 3. Hypodermic Injection Syringe Needle */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Hospital Syringe</span>
                    <span className="text-xs font-bold text-neutral-800 tabular-nums">0.81 mm (21 Gauge)</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-ink">Blood Draw / Syringe Needle</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Hollow steel cylinder with beveled razor edge designed to slice tissue to inject or draw fluid.
                  </p>
                </div>

                {/* Scaled Cross-Section Gauge Visual */}
                <div className="py-6 bg-neutral-50 rounded-xl flex items-center justify-center relative h-28 overflow-hidden">
                  <div 
                    className="rounded-full border-[5px] border-neutral-600 bg-transparent shadow-sm flex items-center justify-center"
                    style={{
                      width: `${0.81 * zoomLevel * 14}px`,
                      height: `${0.81 * zoomLevel * 14}px`
                    }}
                  >
                    <span className="text-[9px] text-neutral-400">Hollow</span>
                  </div>
                  <span className="absolute bottom-2 text-[10px] text-neutral-400 font-medium">
                    4.5× Thicker + Slices tissue
                  </span>
                </div>

                <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-100">
                  Why hospital shots sting, but acupuncture does not
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
