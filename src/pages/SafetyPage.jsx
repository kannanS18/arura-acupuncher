import React from 'react';
import { DOS_DONTS } from '../data/websiteContent';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Activity } from 'lucide-react';

export default function SafetyPage({ onOpenBooking }) {
  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Header Banner */}
      <section className="relative pt-24 pb-20 border-b border-neutral-200 bg-neutral-50/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Aseptic clinical standards</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Safety protocols, <br />
              <span className="text-brand">DOs and DON'Ts</span>
            </h1>
            
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl">
              Your physiological safety, comfort, and restorative outcome are paramount. Arura strictly complies with international hospital-grade aseptic hygiene and clear clinical guidelines before, during, and after each session.
            </p>
          </div>
        </div>
      </section>

      {/* Sterile Needle Guarantee Banner */}
      <section className="py-12 border-b border-neutral-200 bg-neutral-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl border border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-white">
            <div className="flex items-start space-x-5">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex-shrink-0">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="font-display text-2xl font-bold text-[#09090b]">100% Single-use aseptic needle guarantee</h3>
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-medium">
                    Zero reuse
                  </span>
                </div>
                <p className="text-sm text-neutral-600 font-normal max-w-3xl leading-relaxed">
                  Every needle used at Arura is factory-sealed, EO gas pre-sterilized, and engineered from surgical-grade stainless steel (0.16mm–0.25mm hair-thin gauges). Needles are unpackaged in your presence and discarded immediately into sealed biomedical sharps containers. <strong>Zero needle reuse, unconditionally.</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('Safety-First Acupuncture', 1800)}
              className="px-6 py-3 rounded-full bg-ink text-white font-medium text-xs hover:bg-neutral-800 transition-colors whitespace-nowrap flex items-center space-x-2"
            >
              <span>Book safe session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Pre & Post Treatment DOs & DON'Ts */}
      <section className="py-24 lg:py-32 border-b border-neutral-200 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* DOs */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4 border-b border-neutral-200 pb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#09090b]">Clinical DOs (Recommended)</h2>
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">Optimal preparation & integration</p>
                </div>
              </div>

              <div className="space-y-3">
                {DOS_DONTS.dos.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-neutral-200/80 bg-neutral-50/60 space-y-1">
                    <h4 className="font-display text-base font-bold text-[#09090b] flex items-center space-x-2">
                      <span className="text-xs text-emerald-700">0{idx + 1}.</span>
                      <span>{item.title}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed pl-5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DON'Ts */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4 border-b border-neutral-200 pb-5">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-700 border border-neutral-200 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-neutral-500" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#09090b]">Clinical DON'Ts (Avoid)</h2>
                  <p className="text-xs text-neutral-500 font-medium mt-0.5">Pre & post treatment safeguards</p>
                </div>
              </div>

              <div className="space-y-3">
                {DOS_DONTS.donts.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-neutral-200/80 bg-neutral-50/60 space-y-1">
                    <h4 className="font-display text-base font-bold text-[#09090b] flex items-center space-x-2">
                      <span className="text-xs text-neutral-500">0{idx + 1}.</span>
                      <span>{item.title}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed pl-5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Contraindications & Cautions */}
      <section className="py-20 bg-neutral-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl border border-amber-200/80 space-y-4 bg-amber-50/50">
            <div className="flex items-center space-x-3 text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-display text-2xl font-bold text-[#09090b]">Special clinical cautions & pregnancy guidelines</h3>
            </div>
            <p className="text-xs sm:text-sm text-amber-950/80 font-normal leading-relaxed max-w-4xl">
              Certain acupoints (such as LI4 Hegu and SP6 Sanyinjiao) are known to induce downward pelvic energy and uterine contractions. If you are pregnant or suspect pregnancy, please notify Dr. Nivedha during pulse evaluation so specific pregnancy-safe tonification points are utilized. Patients with pacemakers, bleeding disorders, or undergoing anticoagulant therapy must also disclose their status during clinical intake for customized protocol adjustment.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
