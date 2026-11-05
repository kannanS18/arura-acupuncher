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
  const [selectedPointCode, setSelectedPointCode] = useState('BL-10');
  const [activeTool, setActiveTool] = useState('moxa');
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
      
      {/* ========================================================================= */}
      {/* TOP CLINICAL NAVIGATION & BREADCRUMB PROGRESS BAR                         */}
      {/* ========================================================================= */}
      <header className="relative z-30 shrink-0 h-14 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 px-4 sm:px-6 flex items-center justify-between shadow-xs">
        
        {/* Left: Home Navigation & Logo */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-800 transition"
            title="Return to Main Website"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#e02868]" />
            <span className="hidden sm:inline">Back to Clinic</span>
          </Link>

          <div className="h-4 w-px bg-neutral-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e02868] animate-pulse" />
            <span className="text-xs font-black tracking-tight text-[#09090b] uppercase font-display">
              Arura 3D Science Lab
            </span>
          </div>
        </div>

        {/* Center: 3-Stage Breadcrumb Stepper */}
        <div className="flex items-center gap-1.5 sm:gap-3 bg-neutral-100/80 p-1 rounded-xl border border-neutral-200/60">
          <button
            type="button"
            onClick={() => handleStageChange(1)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentStage === 1
                ? 'bg-white text-[#e02868] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#e02868]/10 text-[#e02868] flex items-center justify-center text-[10px]">1</span>
            <span className="hidden md:inline">Macro Body</span>
          </button>

          <span className="text-neutral-300 text-xs">/</span>

          <button
            type="button"
            onClick={() => handleStageChange(2)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentStage === 2
                ? 'bg-white text-amber-600 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center text-[10px]">2</span>
            <span className="hidden md:inline">Neural Science</span>
          </button>

          <span className="text-neutral-300 text-xs">/</span>

          <button
            type="button"
            onClick={() => handleStageChange(3)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentStage === 3
                ? 'bg-white text-emerald-600 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-[10px]">3</span>
            <span className="hidden md:inline">Micro Strata</span>
          </button>
        </div>

        {/* Right: Direct Clinical Booking Bridge */}
        <div className="flex items-center gap-2">
          {currentStage < 3 ? (
            <button
              type="button"
              onClick={handleNextStage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-sm transition cursor-pointer"
              title="Proceed to Next Clinical Stage"
            >
              <span>{currentStage === 1 ? 'Next: Neural Science' : 'Next: 3D Strata'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#e02868]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleStageChange(1)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition cursor-pointer"
              title="Return to Whole Body Anatomy"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#e02868]" />
              <span>Back to Macro Body</span>
            </button>
          )}
          {onOpenBooking && (
            <button
              type="button"
              onClick={() => onOpenBooking(`Acupuncture Treatment for ${activeAcupoint.painName}`)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#e02868] hover:bg-[#c91f58] text-white text-xs font-bold shadow-md shadow-[#e02868]/20 transition cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Book Session</span>
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
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] overflow-y-auto">
            
            <div className="max-w-4xl w-full bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 my-auto">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                    Stage 02 • Biological Mechanism
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#09090b] tracking-tight">
                    How Stimulation Resets Neuromuscular Tension
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Treating condition: <strong className="text-neutral-900">{activeAcupoint.painName}</strong> at point <strong className="text-[#e02868]">{activeAcupoint.code} ({activeAcupoint.translation})</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevStage}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-700 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStage}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#e02868] hover:bg-[#c91f58] text-white text-xs font-bold shadow-md transition"
                  >
                    <span>Enter 3D Living Strata</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3-Step Scientific Pathway Graphic */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#e02868]/10 text-[#e02868] flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    A-Beta & C-Fiber Excitation
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Mechanical needle rotation or vacuum suction stimulates low-threshold mechanoreceptors, sending rapid non-painful signals up afferent neural pathways.
                  </p>
                  <div className="text-[10px] font-mono text-[#e02868] bg-[#e02868]/5 p-2 rounded-lg">
                    ⚡ De-Qi fasciculation loop initiated
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    Spinal Dorsal Horn Gate Control
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    In the spinal substantia gelatinosa, the fast tactile signals activate inhibitory interneurons, closing the neural gate to chronic nociceptive pain signals.
                  </p>
                  <div className="text-[10px] font-mono text-amber-700 bg-amber-500/5 p-2 rounded-lg">
                    🛡️ Substance-P & pain transmission blocked
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    Microvascular Perfusion & Release
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Calcitonin gene-related peptide (CGRP) and nitric oxide flood the microcapillaries, flushing ischemic metabolites and releasing spastic motor endplates.
                  </p>
                  <div className="text-[10px] font-mono text-emerald-700 bg-emerald-500/5 p-2 rounded-lg">
                    🌿 +380% micro-perfusion & knot discharged
                  </div>
                </div>

              </div>

              {/* Bottom Transition Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-white">Ready for Microscopic Intervention</div>
                    <div className="text-neutral-400">Dive through the epidermis into the living tissue strata to release {activeAcupoint.painName}.</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStage}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#e02868] hover:bg-[#c91f58] text-white text-xs font-bold shadow-md transition"
                >
                  <span>Launch 3D Tissue Strata</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 3: MICRO 3D TISSUE STRATA SURGERY                                  */}
        {/* ======================================================================= */}
        {currentStage === 3 && (
          <div className="relative w-full h-full">
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
