import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Zap, 
  Layers, 
  Hand, 
  Check, 
  Flame, 
  CircleDot, 
  Sliders,
  ShieldCheck,
  Disc
} from 'lucide-react';

export const INSTRUMENT_TOOLS = [
  {
    id: 'needle',
    name: '0.18mm Hair-Thin Needle',
    sub: 'Seirin Guide-Tube Needle (0.18 × 40mm)',
    targetName: 'Spastic Motor Endplate Knot',
    layer: 'Striated Muscle Layer (12mm)',
    defaultDepth: 12.0,
    unit: 'mm',
    color: '#e02868',
    actionLabel: 'Insert Needle to Knot (12mm)',
    description: 'Precision de-spasming of deep motor trigger points; stimulates A-delta nerve fibers to elicit De-Qi.'
  },
  {
    id: 'cup',
    name: 'Glass Vacuum Cupping Jar',
    sub: 'Fire & Negative Pressure Cup',
    targetName: 'Myofascial Adhesion',
    layer: 'Subcutaneous Fascia (6mm lift)',
    defaultDepth: 6.0,
    unit: 'mm lift',
    color: '#8b5cf6',
    actionLabel: 'Apply Negative Suction (6mm)',
    description: 'Negative suction lifts tangled collagen fascial sheets, boosting micro-vascular flow +380%.'
  },
  {
    id: 'moxa',
    name: 'Herbal Artemisia Moxa Warmer',
    sub: 'Smokeless Moxibustion Stick',
    targetName: 'Cold Damp Microvascular Stasis',
    layer: 'Dermal & Subdermal Plexus (43°C)',
    defaultDepth: 43.0,
    unit: '°C',
    color: '#f97316',
    actionLabel: 'Ignite & Radiate Heat (43°C)',
    description: 'Gentle infrared wavelengths disperse deep micro-vascular cold constriction and calm vagal tone.'
  }
];

export default function ClinicalInstrumentTray({
  activeTool = 'needle',
  onSelectTool,
  depth = 0,
  onDepthChange,
  isDisintegrated = false,
  onReset,
  pointCode = 'PC-6',
  pointName = 'Inner Gate'
}) {
  const currentTool = INSTRUMENT_TOOLS.find(t => t.id === activeTool) || INSTRUMENT_TOOLS[0];

  return (
    <aside 
      aria-label="Clinical Instrument Tray"
      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto w-[94%] max-w-2xl bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl shadow-2xl p-3 md:p-4 space-y-3"
    >
      {/* Tray Header */}
      <div className="flex items-center justify-between border-b border-neutral-200/80 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#e02868]">
            <Disc className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900 leading-tight">
              Sterile Acupuncture Instrument Tray
            </h4>
            <span className="text-[10px] text-neutral-500 font-mono">
              Pick up tool & apply at <strong className="text-neutral-800">{pointCode} ({pointName})</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#e02868]/10 text-[#e02868] font-bold">
            In Hand: {currentTool.name.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* 3 Tool Pick-Up Slots */}
      <div className="grid grid-cols-3 gap-2">
        {INSTRUMENT_TOOLS.map((tool) => {
          const isSelected = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => onSelectTool(tool.id)}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-2 ring-[#e02868]/40 -translate-y-0.5'
                  : 'bg-neutral-50/90 text-neutral-700 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[9px] font-mono uppercase font-bold tracking-wider ${isSelected ? 'text-[#e02868]' : 'text-neutral-500'}`}>
                  {tool.id === 'needle' && '01 • NEEDLE'}
                  {tool.id === 'cup' && '02 • CUP'}
                  {tool.id === 'moxa' && '03 • MOXA'}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#e02868] animate-pulse" />
                )}
              </div>

              <div className="my-1.5">
                <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
                  {tool.name}
                </div>
                <div className={`text-[10px] truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {tool.sub}
                </div>
              </div>

              <div className={`text-[9px] font-mono font-bold pt-1 border-t ${
                isSelected ? 'border-neutral-800 text-emerald-400' : 'border-neutral-200/80 text-neutral-600'
              }`}>
                {isSelected ? '✓ Picked Up (In Hand)' : 'Click to Pick Up'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Tool Depth / Insertion Controls */}
      <div className="pt-2 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
            <span className="text-[10px] text-neutral-600 font-mono flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-[#e02868]" />
              <span>
                {activeTool === 'needle' && 'Needle Penetration Depth:'}
                {activeTool === 'cup' && 'Negative Pressure Suction Lift:'}
                {activeTool === 'moxa' && 'Infrared Thermal Warming:'}
              </span>
            </span>
            <span className="text-xs font-mono font-bold text-[#e02868]">
              {depth.toFixed(1)} {currentTool.unit}
            </span>
          </div>

          <input
            type="range"
            min={activeTool === 'moxa' ? 35 : 0}
            max={activeTool === 'needle' ? 15 : activeTool === 'cup' ? 6 : 43}
            step={0.1}
            value={depth}
            onChange={(e) => onDepthChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#e02868]"
          />
        </div>

        {/* Action Button & Reset */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => onDepthChange(currentTool.defaultDepth)}
            className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-[#e02868] hover:bg-[#c21e54] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-[#e02868]/20"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{currentTool.actionLabel}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition"
            title="Reset Treatment"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
