import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCheck, X, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

const credentials = [
  {
    serial: "01",
    category: "Acupuncture Qualification",
    title: "Doctor of Medicine in Classical Acupuncture",
    degreeCode: "MD (Acu)",
    conferringBody: "Classical Acupuncture Clinical Practice",
    regNumber: "MD (Acu) · Classical Practice",
    scope: "14-Channel Radial Pulse Diagnosis & Sterile Meridian Therapeutics",
    standing: "Active Clinical Standing"
  },
  {
    serial: "02",
    category: "Post Graduate Diploma",
    title: "PG Diploma in School, Corporate and Family Counselling & Psychotherapy with Internship",
    degreeCode: "PG Dip",
    conferringBody: "CCS Academy (Chennai Counseling Services) · Accredited Training Provider: IAOTH (Reg. 2973-8538)",
    regNumber: "Cert: I3977/2026 · MSME: UDYAM-TN-02-0007295",
    scope: "Supervised theory & practice in the EasyIntegration Counselling Model under R M. Karthik Lakshmanan (Member, American Psychological Association)",
    standing: "IAOTH Accredited",
    certificateImg: "counselling_certification.jpg"
  }
];

export default function DoctorCredentialsSection() {
  const [showCertificateModal, setShowCertificateModal] = useState(false);

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
            <span>Active Clinical Practice · Ms. Nivedha Priyadharshini</span>
          </div>
        </div>

        {/* 2 Refined Architectural Certificate Cards (Pure Clinical Elegance) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-4xl mx-auto">
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
                <div className="pt-2 space-y-3">
                  <div className="p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-200/70 text-xs text-neutral-600 leading-relaxed font-normal">
                    {cred.scope}
                  </div>

                  {cred.certificateImg && (
                    <button
                      type="button"
                      onClick={() => setShowCertificateModal(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ed3373] hover:text-[#c91e5c] transition-colors cursor-pointer"
                    >
                      <FileCheck className="w-4 h-4 text-[#ed3373]" />
                      <span>View Verified Certificate (Cert No. I3977/2026) →</span>
                    </button>
                  )}
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

      {/* Interactive Certificate View Modal */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-neutral-200"
            >
              <div className="p-4 bg-neutral-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#ed3373]" />
                  <span className="text-xs sm:text-sm font-bold font-mono">
                    Official Counselling & Psychotherapy Certificate · CCS Academy
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close Certificate Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-neutral-100 flex justify-center">
                <img
                  src={getAssetUrl('counselling_certification.jpg')}
                  alt="PG Diploma in School, Corporate and Family Counselling & Psychotherapy Certificate - Ms. Nivedha Priyadharshini"
                  className="max-h-[75vh] w-auto object-contain rounded-lg shadow-md border border-neutral-200"
                />
              </div>

              <div className="p-4 bg-white border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
                <span>Cert. No: I3977/2026 · IAOTH Reg: 2973-8538 · MSME: UDYAM-TN-02-0007295</span>
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white font-bold hover:bg-[#ed3373] transition-colors cursor-pointer"
                >
                  Close Certificate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
