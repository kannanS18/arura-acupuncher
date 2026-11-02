import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

// 4 Authentically Mapped Dorsal Points on Real Hand & Forearm Anatomy
const ACUPOINTS = [
  {
    id: 'li4',
    code: 'LI4',
    name: 'Hegu',
    hanzi: '合谷',
    english: 'Joining Valley',
    channel: 'Large Intestine Meridian',
    // Normalized percentage coordinates on anatomical photograph (1200 x 896)
    pctX: 35.8,
    pctY: 55.8,
    angle: -8, // slight natural perpendicular angle
    depth: '10–15 mm',
    location: 'In the fleshy mound between the 1st and 2nd metacarpal bones, at the highest point of the muscle when thumb and index finger are brought together.',
    indications: 'Traditionally indicated for frontal headaches, chronic migraines, tension in the face, teeth, and jaw, sinus congestion, and systemic autonomic down-regulation.',
    sensation: 'A momentary feather-light sensation as it passes the epidermal layer, followed by a warm, radiating dull ache or pleasant heaviness (the authentic “De-Qi” response). It feels deeply grounding, never sharp.',
    doctorTip: '“LI4 is classical medicine’s premier command point for all discomfort above the neck. It triggers rapid central endorphin release and interrupts chronic pain loops.” — Dr. Nivedha'
  },
  {
    id: 'li5',
    code: 'LI5',
    name: 'Yangxi',
    hanzi: '阳溪',
    english: 'Yang Stream',
    channel: 'Large Intestine Meridian',
    pctX: 45.4,
    pctY: 55.2,
    angle: -4,
    depth: '8–12 mm',
    location: 'On the radial border of the wrist, in the anatomical snuffbox depression formed between the extensor pollicis longus and brevis tendons when the thumb is extended.',
    indications: 'Traditionally indicated for wrist pain, repetitive strain injuries (RSI), tendonitis, thumb mobility restrictions, and clearing cranial sensory heat.',
    sensation: 'A clear, focused sensation of pressure that dissolves localized tendon tension and immediately opens wrist joint flexibility.',
    doctorTip: '“For IT professionals and patients with mouse-wrist strain, LI5 relieves inflammation directly at the radial nerve boundary.” — Dr. Nivedha'
  },
  {
    id: 'sj4',
    code: 'SJ4',
    name: 'Yangchi',
    hanzi: '阳池',
    english: 'Yang Pool',
    channel: 'San Jiao Meridian (Triple Energizer)',
    pctX: 47.9,
    pctY: 46.9,
    angle: 0,
    depth: '6–10 mm',
    location: 'On the transverse crease of the back of the wrist, in the soft depression between the extensor digitorum and extensor digiti minimi tendons.',
    indications: 'Traditionally indicated for chronic wrist weakness, localized arthritis, diabetes support, cold extremities, and autonomic temperature regulation.',
    sensation: 'A deep, warming sensation that radiates through the wrist joint and frequently brings a feeling of gentle warmth to previously cold fingers.',
    doctorTip: '“SJ4 is the Yuan-Source point of the Triple Energizer. It activates the body’s innate metabolic warmth and tonifies systemic autonomic balance.” — Dr. Nivedha'
  },
  {
    id: 'sj5',
    code: 'SJ5',
    name: 'Waiguan',
    hanzi: '外关',
    english: 'Outer Pass',
    channel: 'San Jiao Meridian (Triple Energizer)',
    pctX: 61.7,
    pctY: 49.1,
    angle: 6,
    depth: '12–18 mm',
    location: 'On the back of the forearm, exactly two finger-widths (2 cun) above the dorsal wrist crease, situated in the groove between the radius and ulna bones.',
    indications: 'Traditionally indicated for cervical stiffness, upper shoulder tension, migraine aura, ear ringing (tinnitus), febrile colds, and forearm myofascial pain.',
    sensation: 'A tingling or spreading warmth that frequently travels up the arm into the shoulder and neck, dissipating tight muscular knots within seconds.',
    doctorTip: '“Waiguan opens the Yang Link vessel. It is one of my most effective points for patients whose neck pain locks up their entire upper back.” — Dr. Nivedha'
  }
];

export default function PlaceTheNeedleInteractive({ onOpenBooking }) {
  const [activePoint, setActivePoint] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [needlePos, setNeedlePos] = useState({ x: 36, y: 80 }); // relative coords in stage container
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [insertionStage, setInsertionStage] = useState('resting'); // 'resting', 'dragging', 'snapped', 'inserted'
  const [tiltAngle, setTiltAngle] = useState(20);
  const [ripplePoint, setRipplePoint] = useState(null);

  // Companion Slider: "How Thin?" Microscope Zoom
  const [zoomLevel, setZoomLevel] = useState(12);

  const containerRef = useRef(null);
  const boardRef = useRef(null);

  // Default Resting Tray Position
  const RESTING_POS = { x: 36, y: 70 };

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = (e) => {
    if (insertionStage === 'inserted') return;
    e.preventDefault();
    const board = boardRef.current.getBoundingClientRect();
    setIsDragging(true);
    setInsertionStage('dragging');
    setTiltAngle(24);

    setDragOffset({
      x: e.clientX - board.left - needlePos.x,
      y: e.clientY - board.top - needlePos.y
    });

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Pointer Move (Mouse drag or touch move)
  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const board = boardRef.current.getBoundingClientRect();
    const currentX = e.clientX - board.left - dragOffset.x;
    const currentY = e.clientY - board.top - dragOffset.y;

    setNeedlePos({ x: currentX, y: currentY });

    // Calculate tip position in board percentages (tip is at bottom center of needle element)
    const tipX = currentX + 16;
    const tipY = currentY + 115;
    const pctX = (tipX / board.width) * 100;
    const pctY = (tipY / board.height) * 100;

    // Check proximity to any acupoint (snap radius: ~6.5% of board)
    let matched = null;
    for (const pt of ACUPOINTS) {
      const dist = Math.hypot(pt.pctX - pctX, pt.pctY - pctY);
      if (dist < 6.8) {
        matched = pt;
        break;
      }
    }
    setHoveredPoint(matched);
  };

  // Pointer Up (Drop needle)
  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    if (hoveredPoint) {
      insertIntoPoint(hoveredPoint);
    } else {
      // Return smoothly to tray
      setNeedlePos(RESTING_POS);
      setTiltAngle(20);
      setInsertionStage('resting');
    }
  };

  // Trigger Insertion Sequence at a Point
  const insertIntoPoint = (point) => {
    setActivePoint(point);
    setHoveredPoint(null);
    setInsertionStage('snapped');
    setTiltAngle(point.angle);

    const board = boardRef.current;
    if (board) {
      const rect = board.getBoundingClientRect();
      const targetPixelX = (point.pctX / 100) * rect.width - 16;
      const targetPixelY = (point.pctY / 100) * rect.height - 98; // align needle tip to point
      setNeedlePos({ x: targetPixelX, y: targetPixelY });
    }

    // Trigger physical skin ripple and insertion sink
    setTimeout(() => {
      setInsertionStage('inserted');
      setRipplePoint({ x: point.pctX, y: point.pctY });

      // Clear ripple after 1.4s
      setTimeout(() => setRipplePoint(null), 1400);
    }, 250);
  };

  // Remove needle and reset
  const handleRemoveNeedle = () => {
    setInsertionStage('snapped');
    setTimeout(() => {
      setNeedlePos(RESTING_POS);
      setTiltAngle(20);
      setActivePoint(null);
      setInsertionStage('resting');
      setRipplePoint(null);
    }, 220);
  };

  // Direct Click on Point Shortcut
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
            First-time patients often carry a natural fear of injection needles. Classical acupuncture uses solid, hair-thin filaments (0.18mm) that slide between tissue fibers rather than cutting them. Pick up the real single-use needle below and test an authentic point on the hand.
          </p>
        </div>

        {/* MAIN INTERACTIVE BOARD: "Place the Needle" on Real Hand Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (7 cols): Anatomical Hand Canvas & Interactive Needle */}
          <div className="lg:col-span-7 bg-[#fbfbfa] rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs relative overflow-hidden select-none">
            
            {/* Top Bar / Status */}
            <div className="flex items-center justify-between border-b border-neutral-200/70 pb-4 mb-5 text-xs text-neutral-500 font-medium">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="font-semibold text-ink">
                  {insertionStage === 'inserted' 
                    ? `Needle Placed at ${activePoint.code} (${activePoint.name})` 
                    : isDragging 
                    ? 'Release over any highlighted point to place' 
                    : 'Drag the needle onto any point on the hand'}
                </span>
              </div>

              {insertionStage === 'inserted' && (
                <button
                  onClick={handleRemoveNeedle}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-brand text-white text-xs font-semibold transition-colors shadow-xs motion-safe:active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Remove needle</span>
                </button>
              )}
            </div>

            {/* Stage: Photographic Canvas with Perspective Tilt */}
            <div 
              ref={boardRef}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200/90 shadow-inner bg-neutral-100 cursor-crosshair"
              style={{ touchAction: 'none' }}
            >
              {/* High-Resolution Anatomical Photograph of Bare Hand & Forearm on Linen */}
              <img 
                src={getAssetUrl('anatomical_hand_resting.jpg')} 
                alt="Authentic relaxed human hand and wrist resting on clean clinic treatment linen" 
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />

              {/* Wooden / Slate Sterile Resting Tray for the Needle */}
              <div className="absolute top-4 left-4 w-20 h-40 rounded-xl bg-white/85 backdrop-blur-md border border-neutral-300 shadow-sm p-2 pointer-events-none flex flex-col justify-between z-10">
                <span className="text-[9.5px] uppercase font-bold tracking-wider text-neutral-600 block text-center">
                  Sterile Tray
                </span>
                <div className="w-full h-px bg-neutral-200" />
                <span className="text-[9px] text-neutral-500 block text-center leading-tight">
                  0.18mm × 30mm Surgical Steel
                </span>
              </div>

              {/* Concentric Skin Ripple when Needle is Placed (Physical CSS Wave) */}
              {ripplePoint && (
                <div 
                  className="absolute pointer-events-none z-15 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${ripplePoint.x}%`,
                    top: `${ripplePoint.y}%`
                  }}
                >
                  <div className="w-8 h-8 rounded-full border border-brand/50 animate-ping" />
                  <div className="absolute inset-0 w-12 h-12 -translate-x-2 -translate-y-2 rounded-full border border-neutral-800/20" />
                </div>
              )}

              {/* 4 Anatomical Acupoints Overlaid on Real Anatomy */}
              {ACUPOINTS.map((pt) => {
                const isHovered = hoveredPoint?.id === pt.id;
                const isPlaced = activePoint?.id === pt.id;

                return (
                  <div
                    key={pt.id}
                    onClick={() => handlePointClick(pt)}
                    className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `${pt.pctX}%`,
                      top: `${pt.pctY}%`
                    }}
                  >
                    {/* Generous Click/Drop Target */}
                    <div className="w-12 h-12 -ml-3 -mt-3 flex items-center justify-center">
                      
                      {/* Outer Ring */}
                      <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isPlaced 
                            ? 'bg-brand/20 ring-2 ring-brand' 
                            : isHovered 
                            ? 'bg-neutral-900/20 ring-2 ring-neutral-900 scale-125' 
                            : 'bg-white/80 ring-1 ring-neutral-400/80 shadow-xs'
                        }`}
                      >
                        {/* Center Dot */}
                        <div 
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            isPlaced ? 'bg-brand' : isHovered ? 'bg-neutral-900' : 'bg-brand'
                          }`}
                        />
                      </div>

                    </div>

                    {/* Point Tag Callout */}
                    <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-neutral-800 border border-neutral-300 shadow-xs block text-center">
                        {pt.code} · {pt.name}
                      </span>
                    </div>

                  </div>
                );
              })}

              {/* THE REAL PHOTOGRAPHIC NEEDLE (Draggable with True Proportions) */}
              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className={`absolute z-30 transition-transform ${
                  isDragging 
                    ? 'cursor-grabbing scale-105' 
                    : insertionStage === 'inserted' 
                    ? 'cursor-pointer' 
                    : 'cursor-grab hover:scale-105'
                }`}
                style={{
                  left: `${needlePos.x}px`,
                  top: `${needlePos.y}px`,
                  transform: `rotate(${tiltAngle}deg) ${insertionStage === 'inserted' ? 'translateY(22px)' : ''}`,
                  transformOrigin: '50% 90%',
                  transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s ease, top 0.3s ease'
                }}
              >
                {/* Authentic Scaled Needle Image from Clinical Supplier */}
                <div className="relative flex flex-col items-center">
                  <img 
                    src={getAssetUrl('single_needle_authentic.png')} 
                    alt="Authentic 0.18mm acupuncture needle with coiled handle"
                    className="select-none pointer-events-none drop-shadow-md transition-all duration-500"
                    style={{
                      height: insertionStage === 'inserted' ? '92px' : '124px', // Sinks in as it enters tissue
                      width: 'auto'
                    }}
                    draggable={false}
                  />

                  {/* Faint Contact Cast Shadow */}
                  <div 
                    className="w-4 h-1 bg-neutral-900/30 rounded-full filter blur-[1px] transform -translate-y-1"
                    style={{ opacity: insertionStage === 'inserted' ? 0.4 : 0.2 }}
                  />
                </div>
              </div>

              {/* Helper prompt banner when resting */}
              {!activePoint && !isDragging && (
                <div className="absolute bottom-3 left-4 right-4 pointer-events-none flex justify-center">
                  <span className="text-[11px] text-neutral-600 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-200/80 shadow-xs">
                    Drag the coiled needle or tap any highlighted point to place
                  </span>
                </div>
              )}

            </div>

            {/* Bottom Technical Specifications Ledger */}
            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-200/60">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Needle Spec: 0.18mm × 30mm Surgical Steel 316L (Single-use)</span>
              </div>
              <span className="tabular-nums font-medium text-neutral-700">Sterilization: EO Gas 100%</span>
            </div>

          </div>

          {/* Right Column (5 cols): Dr. Nivedha's Clinical Note Card */}
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
                      className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-ink transition-colors cursor-pointer"
                    >
                      Try another point
                    </button>
                    <button
                      onClick={() => onOpenBooking(`Consultation (${activePoint.code} protocol)`, 600)}
                      className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark transition-colors flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
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
                      Select Any Point on the Hand
                    </h3>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    Drag the coiled-handle needle from the sterile tray and drop it onto any of the 4 classic hand points (<strong>LI4, LI5, SJ4, SJ5</strong>), or simply tap any marker on the hand.
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
