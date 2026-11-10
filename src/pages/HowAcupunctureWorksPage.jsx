import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Layers, 
  Activity, 
  ShieldCheck, 
  RotateCcw,
  Flame,
  CircleDot,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import TissueDepthSimulator from '../components/interactive-lab/TissueDepthSimulator';
import SkinLayersPip, { preloadSkinModel } from '../components/interactive-lab/SkinLayersPip';
import AnatomyLabPreloader from '../components/interactive-lab/AnatomyLabPreloader';
import { CLINICAL_ACUPOINTS, getClinicalOutcome } from '../components/interactive-lab/acupointsData';

const CLINICAL_CONDITIONS = [
  { code: 'BL-10', label: 'Cervical Neck Spasm' },
  { code: 'BL-13', label: 'Thoracic Back Tension' },
  { code: 'PC-6', label: 'Carpal Tunnel & Stress' },
  { code: 'LI-4', label: 'Headache & Facial Spasm' },
  { code: 'ST-36', label: 'Knee & Systemic Fatigue' },
  { code: 'BL-23', label: 'Lumbar Strain' }
];

export default function HowAcupunctureWorksPage({ onOpenBooking }) {
  // 3-Stage Storyboard: 1 = Macro Body, 2 = Neural Science, 3 = Micro Tissue Strata
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedPointCode, setSelectedPointCode] = useState('GV-20');
  const [activeTool, setActiveTool] = useState('needle');
  const [depth, setDepth] = useState(0);
  const [isDisintegrated, setIsDisintegrated] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);

  // Find active acupoint data
  const activeAcupoint = CLINICAL_ACUPOINTS.find(p => p.code === selectedPointCode) || CLINICAL_ACUPOINTS[0];
  const clinicalOutcome = getClinicalOutcome(activeTool, activeAcupoint);

  // Preload 3D histological strata in background for instant Stage 3 activation
  useEffect(() => {
    preloadSkinModel();
  }, []);

  // Sync initial tool for point
  useEffect(() => {
    if (activeAcupoint.tools && activeAcupoint.tools.length > 0) {
      setActiveTool(activeAcupoint.tools[0]);
    } else {
      setActiveTool('needle');
    }
    setDepth(0);
    setIsDisintegrated(false);
  }, [selectedPointCode]);

  const handleSelectCondition = (pointCode) => {
    setSelectedPointCode(pointCode);
  };

  const handleStageChange = (stage) => {
    setCurrentStage(stage);
    if (stage === 1) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 30);
    }
  };

  const handleNextStage = () => {
    if (currentStage < 3) handleStageChange(currentStage + 1);
  };

  const handlePrevStage = () => {
    if (currentStage > 1) handleStageChange(currentStage - 1);
  };

  const handleApplyTherapy = (targetVal) => {
    setDepth(targetVal);
    setIsSnapping(true);
    setTimeout(() => {
      setIsDisintegrated(true);
      setIsSnapping(false);
    }, 900);
  };

  const handleResetTherapy = () => {
    setDepth(0);
    setIsDisintegrated(false);
    setIsSnapping(false);
  };

  return (
    <div className="relative w-full h-screen min-h-[640px] bg-[#f8fafc] text-[#09090b] flex flex-col overflow-hidden font-sans select-none">
      
      {/* Dedicated RAM Preloader for this page alone: Downloads & caches all 3D models into memory */}
      <AnatomyLabPreloader />

      {/* ========================================================================= */}
      {/* TOP CLINICAL NAVIGATION & BREADCRUMB PROGRESS BAR                         */}
      {/* ========================================================================= */}
      <header className="relative z-30 shrink-0 h-14 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 px-4 sm:px-6 flex items-center justify-between shadow-xs">
        
        {/* Left: Home Navigation & Logo */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-800 transition"
            title="Return to Main Website"
          >
            <ArrowLeft className="w-4 h-4 text-[#e02868]" />
            <span className="hidden sm:inline">Back to Clinic</span>
          </Link>

          <div className="h-4 w-px bg-neutral-200 hidden md:block" />

          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e02868] animate-pulse" />
            <span className="text-xs font-bold tracking-tight text-neutral-900 font-display">
              Arura 3D Science Lab
            </span>
          </div>
        </div>

        {/* Center: 3-Stage Breadcrumb Stepper (Mobile Optimized Segmented Controller) */}
        <div className="flex items-center gap-1 sm:gap-2 bg-neutral-100/90 p-1 rounded-xl border border-neutral-200/80">
          <button
            type="button"
            onClick={() => handleStageChange(1)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentStage === 1
                ? 'bg-white text-[#e02868] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
            title="Stage 1: Whole Body Macro Anatomy"
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
              currentStage === 1 ? 'bg-[#e02868]/15 text-[#e02868]' : 'bg-neutral-200 text-neutral-600'
            }`}>1</span>
            <span className="hidden md:inline">Macro Body</span>
          </button>

          <span className="text-neutral-300 text-xs select-none">/</span>

          <button
            type="button"
            onClick={() => handleStageChange(2)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentStage === 2
                ? 'bg-white text-amber-600 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
            title="Stage 2: Neural Science Mechanism"
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
              currentStage === 2 ? 'bg-amber-500/15 text-amber-600' : 'bg-neutral-200 text-neutral-600'
            }`}>2</span>
            <span className="hidden md:inline">Neural Science</span>
          </button>

          <span className="text-neutral-300 text-xs select-none">/</span>

          <button
            type="button"
            onClick={() => handleStageChange(3)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentStage === 3
                ? 'bg-white text-emerald-600 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
            title="Stage 3: 3D Living Tissue Strata"
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
              currentStage === 3 ? 'bg-emerald-500/15 text-emerald-600' : 'bg-neutral-200 text-neutral-600'
            }`}>3</span>
            <span className="hidden md:inline">Micro Strata</span>
          </button>
        </div>

        {/* Right: Stage Advancement & Direct Booking Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {currentStage < 3 ? (
            <button
              type="button"
              onClick={handleNextStage}
              className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-sm transition cursor-pointer"
              title="Proceed to Next Clinical Stage"
            >
              <span className="hidden sm:inline">{currentStage === 1 ? 'Next: Neural Science' : 'Next: 3D Strata'}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#e02868]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleStageChange(1)}
              className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition cursor-pointer"
              title="Return to Whole Body Anatomy"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#e02868]" />
              <span className="hidden sm:inline">Back to Macro Body</span>
              <span className="sm:hidden">Macro</span>
            </button>
          )}
          {onOpenBooking && (
            <button
              type="button"
              onClick={() => onOpenBooking(`Acupuncture Treatment for ${activeAcupoint.painName}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-[#e02868] hover:bg-[#c91f58] text-white text-xs font-bold shadow-md shadow-[#e02868]/20 transition cursor-pointer"
              title="Book Clinical Consultation"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Book Session</span>
            </button>
          )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN STAGE VIEWPORT (100% SCREEN HEIGHT)                                  */}
      {/* ========================================================================= */}
      <div className="relative flex-1 w-full h-[calc(100vh-3.5rem)] overflow-hidden">
        
        {/* ======================================================================= */}
        {/* STAGE 1: MACRO WHOLE HUMAN ANATOMY & CONDITION PICKER                   */}
        {/* Preserves 3D WebGL context and 60 FPS state across stage transitions    */}
        {/* ======================================================================= */}
        <div className={`relative w-full h-full flex flex-col ${currentStage === 1 ? 'block' : 'hidden'}`}>
          <div className="relative flex-1 w-full h-full">
            <TissueDepthSimulator 
              onOpenBooking={onOpenBooking} 
              selectedPointCode={selectedPointCode}
              onSelectAcupointCode={(code) => setSelectedPointCode(code)}
              onNavigateToStage={(stage) => handleStageChange(stage)}
            />
          </div>
        </div>

        {/* ======================================================================= */}
        {/* STAGE 2: THE NEUROLOGICAL BRIDGE & SCIENCE MECHANICS                    */}
        {/* ======================================================================= */}
        {currentStage === 2 && (
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-neutral-50 overflow-y-auto">
            
            <div className="max-w-4xl w-full bg-white border border-neutral-200/90 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xs space-y-4 sm:space-y-6 my-auto">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4 sm:pb-6">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Stage 02 · Biological Mechanism</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                    How Stimulation Resets Neuromuscular Tension
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-normal">
                    Target condition: <span className="text-neutral-900 font-semibold">{activeAcupoint.painName}</span> at point <span className="text-[#e02868] font-semibold">{activeAcupoint.code} ({activeAcupoint.translation})</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrevStage}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-700 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStage}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#e02868] hover:bg-[#c91f58] text-white text-xs font-bold transition shadow-sm"
                  >
                    <span>Enter 3D Living Strata</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3-Step Scientific Pathway Graphic (Hairline Micro-Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Step 1 */}
                <div className="p-4 sm:p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200 text-neutral-900 flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    A-Beta & C-Fiber Excitation
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Mechanical needle rotation or vacuum suction stimulates low-threshold mechanoreceptors, sending rapid non-painful signals up afferent neural pathways.
                  </p>
                  <div className="text-[11px] font-mono text-[#e02868] border border-[#e02868]/20 bg-[#e02868]/5 px-2.5 py-1 rounded-lg">
                    De-Qi sensory loop initiated
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 sm:p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200 text-neutral-900 flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    Spinal Dorsal Horn Gate Control
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    In the spinal substantia gelatinosa, the fast tactile signals activate inhibitory interneurons, closing the neural gate to chronic nociceptive pain signals.
                  </p>
                  <div className="text-[11px] font-mono text-neutral-700 border border-neutral-200 bg-neutral-100 px-2.5 py-1 rounded-lg">
                    Nociceptive transmission attenuated
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 sm:p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200 text-neutral-900 flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    Microvascular Perfusion & Release
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Calcitonin gene-related peptide (CGRP) and nitric oxide flood the microcapillaries, flushing ischemic metabolites and releasing spastic motor endplates.
                  </p>
                  <div className="text-[11px] font-mono text-emerald-800 border border-emerald-200 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Microvascular perfusion restored
                  </div>
                </div>

              </div>

              {/* Bottom Transition Banner */}
              <div className="p-4 sm:p-6 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-800 text-neutral-300 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-[#e02868]" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white">Microscopic Histological View</div>
                    <div className="text-neutral-400">Observe epidermis, dermis, and muscular strata to release {activeAcupoint.painName}.</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStage}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#e02868] hover:bg-[#c91f58] text-white text-xs font-bold transition shadow-sm"
                >
                  <span>Launch 3D Tissue Strata</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 3: MICRO 3D TISSUE STRATA SURGERY                                  */}
        {/* ======================================================================= */}
        {currentStage === 3 && (
          <div className="relative w-full h-full animate-strata-in">
            <SkinLayersPip
              fullStage={true}
              activeTool={activeTool}
              depth={depth}
              maxDepth={activeTool === 'needle' ? 15.0 : activeTool === 'cup' ? 6.0 : 43.0}
              targetDepth={activeAcupoint.depthTarget || 12.0}
              depthCun={activeAcupoint.depthCun || '0.5–1.0 cun'}
              pointCode={activeAcupoint.code}
              pointName={activeAcupoint.translation}
              painName={activeAcupoint.painName}
              isDisintegrated={isDisintegrated}
              isSnapping={isSnapping}
              onDepthChange={(newDepth) => {
                setDepth(newDepth);
                if (newDepth >= (activeTool === 'needle' ? (activeAcupoint.depthTarget || 12.0) : activeTool === 'cup' ? 5.5 : 42.0)) {
                  handleApplyTherapy(newDepth);
                }
              }}
              onReset={handleResetTherapy}
              onBackToBody={() => handleStageChange(1)}
              onSelectTool={(toolId) => {
                setActiveTool(toolId);
                setDepth(0);
                setIsDisintegrated(false);
              }}
            />
          </div>
        )}

      </div>

    </div>
  );
}
