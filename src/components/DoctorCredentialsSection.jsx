import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, ExternalLink } from 'lucide-react';

const credentials = [
  {
    serial: "01",
    category: "Medical Degree",
    title: "Doctor of Medicine in Classical Acupuncture",
    degreeCode: "MD (Acu)",
    conferringBody: "Tamil Nadu Board of Alternative Medicine",
    regNumber: "REG: TN/ACU/2016",
    scope: "14-Channel Radial Pulse Diagnosis & Sterile Meridian Therapeutics",
    standing: "Active Clinical Standing"
  },
  {
    serial: "02",
    category: "International Diploma",
    title: "Cambridge International Diploma in Teaching & Learning",
    degreeCode: "CIDTL (UK)",
    conferringBody: "Cambridge Assessment International Education · University of Cambridge",
    regNumber: "CIDTL · Cambridge Framework",
    scope: "Structured Clinical Communication & Patient Pathophysiology Pedagogy",
    standing: "University Recognized"
  },
  {
    serial: "03",
    category: "Post Graduate Diploma",
    title: "Post Graduate Diploma in Counselling Therapy",
    degreeCode: "PG Dip (Counselling)",
    conferringBody: "Certified Cognitive Behavioral & REBT Psychotherapy Council",
    regNumber: "PGD-CT · REBT/CBT",
    scope: "Autonomic Nervous Regulation & Trauma-Informed Somatic De-escalation",
    standing: "Board Certified"
  }
];

export default function DoctorCredentialsSection() {
  return (
    <section id="credentials" className="py-20 lg:py-28 bg-[#fafafa] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ed3373] block">
              Official Medical Licensing
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Clinical Credentials & Accreditations
            </h2>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Practitioner · Reg: TN/ACU/2016</span>
          </div>
        </div>

        {/* 3 Refined Architectural Certificate Cards (No Gradients, No Clutter, Pure Clinical Elegance) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {credentials.map((cred) => (
            <div
              key={cred.serial}
              className="group relative rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-400/80 hover:shadow-lg hover:shadow-neutral-950/5 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between"
            >
              {/* Subtle top rose accent hairline on hover */}
              <div 
                aria-hidden="true" 
                className="absolute top-0 inset-x-8 h-[2px] bg-transparent group-hover:bg-[#ed3373] transition-colors duration-300 rounded-t-2xl" 
              />

              <div className="space-y-6">
                
                {/* Header: Serial & Category */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-[#ed3373] transition-colors">
                      {cred.serial}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-500">
                      {cred.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200/60">
                    {cred.degreeCode}
                  </span>
                </div>

                {/* Degree Title */}
                <div className="space-y-2">
                  <h3 className="font-display text-xl sm:text-[22px] font-bold text-neutral-900 leading-snug tracking-tight">
                    {cred.title}
                  </h3>
                  <p className="text-xs font-medium text-neutral-500 leading-relaxed">
                    {cred.conferringBody}
                  </p>
                </div>

                {/* Clinical Scope Statement */}
                <div className="pt-2">
                  <div className="p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-200/70 text-xs text-neutral-600 leading-relaxed font-normal">
                    {cred.scope}
                  </div>
                </div>

              </div>

              {/* Bottom Certificate Verification Strip */}
              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] font-bold text-neutral-800">
                  {cred.regNumber}
                </span>

                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{cred.standing}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
