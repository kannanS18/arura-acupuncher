import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, QrCode, Sparkles, Building2, Award, Calendar } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

export default function DoctorIdCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full flex justify-center py-4">
      {/* 3D Perspective Card Container */}
      <motion.div
        className="w-full max-w-sm sm:max-w-md perspective-1000 cursor-pointer select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        animate={{
          rotateY: isHovered ? mousePos.x * 12 : 0,
          rotateX: isHovered ? -mousePos.y * 12 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Physical Badge Body */}
        <div className="relative rounded-3xl bg-white text-neutral-900 border border-neutral-200/90 shadow-2xl shadow-neutral-950/40 overflow-hidden p-6 sm:p-7">
          
          {/* Holographic Iridescent Sheen on Hover (21st.dev signature touch) */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-30"
            style={{
              opacity: isHovered ? 0.25 : 0,
              background: `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(237, 51, 115, 0.4) 0%, rgba(59, 130, 246, 0.25) 40%, transparent 70%)`
            }}
          />

          {/* Top Lanyard Slot Clip Assembly */}
          <div className="flex flex-col items-center mb-5">
            <div className="w-14 h-2.5 rounded-full bg-neutral-900 border border-neutral-700/80 shadow-inner flex items-center justify-center">
              <div className="w-8 h-1 rounded-full bg-neutral-950/90" />
            </div>
            <div className="flex items-center justify-between w-full pt-3 border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ed3373] animate-pulse" />
                <span className="font-mono text-xs font-bold text-neutral-900 tracking-wider uppercase">
                  ARURA WELLNESS STUDIO
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#ed3373] bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Official Credential
              </span>
            </div>
          </div>

          {!isFlipped ? (
            /* FRONT FACE: Official Medical Practitioner ID */
            <div className="space-y-5">
              
              {/* Photo & Identity Header */}
              <div className="flex items-start gap-4">
                {/* Official Passport Photo with Gold Security Border */}
                <div className="relative w-28 h-36 rounded-2xl overflow-hidden border-2 border-[#ed3373] shadow-md shrink-0 bg-neutral-100">
                  <img
                    src={getAssetUrl('doctor_nivedha_portrait.jpg')}
                    alt="Dr. Nivedha Priyadharshini"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Security Verification Ribbon */}
                  <div className="absolute bottom-0 inset-x-0 bg-[#ed3373] text-white text-[10px] font-mono font-bold text-center py-0.5 tracking-wider uppercase">
                    Verified
                  </div>
                </div>

                {/* Identity Text */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block font-medium">
                    Lead Clinical Acupuncturist
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                    Dr. Nivedha Priyadharshini
                  </h3>
                  <p className="text-sm font-bold text-[#ed3373] font-mono">
                    MD (Acu)
                  </p>
                  
                  {/* Registration Chip Box */}
                  <div className="pt-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
                      <span className="text-neutral-500 font-bold">REG:</span>
                      <strong className="text-neutral-900 font-bold">TN/ACU/2016</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-mono font-semibold pt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Active Clinical Practice</span>
                  </div>
                </div>
              </div>

              {/* Key Verification Metrics Strip */}
              <div className="grid grid-cols-2 gap-3 py-3 px-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <div>
                  <span className="text-xs font-mono text-neutral-500 uppercase block">Clinical Practice</span>
                  <span className="font-display text-lg font-bold text-neutral-900 block">8+ Years</span>
                  <span className="text-xs text-neutral-600 font-medium block">Classical Acupuncture</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-500 uppercase block">Recoveries</span>
                  <span className="font-display text-lg font-bold text-[#ed3373] block">1,100+ Cases</span>
                  <span className="text-xs text-neutral-600 font-medium block">Documented Relief</span>
                </div>
              </div>

              {/* Verified Clinical Accreditations */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                  Accredited Qualifications
                </span>
                <div className="space-y-1.5 text-sm text-neutral-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ed3373] shrink-0" />
                    <span className="font-medium">14-Channel Classical Pulse & Meridian Therapy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ed3373] shrink-0" />
                    <span className="font-medium">Cambridge Intl Dip. in Teaching & Learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ed3373] shrink-0" />
                    <span className="font-medium">PG Diploma in Counselling Therapy (CBT / REBT)</span>
                  </div>
                </div>
              </div>

              {/* Security Barcode & Clinic Location Footer */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  {/* Stylized Security Barcode */}
                  <div className="h-6 flex items-center gap-[2px]">
                    {[4, 2, 6, 1, 4, 3, 2, 5, 2, 4, 1, 3, 5, 2, 4, 2, 3, 6, 1, 4, 2, 5, 3].map((h, bIdx) => (
                      <span
                        key={bIdx}
                        className="bg-neutral-900 w-[1.5px] rounded-xs"
                        style={{ height: `${h * 4}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 tracking-widest block mt-0.5">
                    TN-ACU-2016-0842
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-600 block">
                    Virugambakkam, Chennai
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 block">
                    Consultations Daily
                  </span>
                </div>
              </div>

            </div>
          ) : (
            /* REVERSE FACE: Clinical Licensing & Practice Standards */
            <div className="space-y-5 py-2">
              <div className="text-center space-y-1 pb-2 border-b border-neutral-100">
                <span className="text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider block">
                  CLINICAL LICENSING & PRACTICE STANDARDS
                </span>
                <h4 className="font-display text-lg font-bold text-neutral-900">
                  Arura Acupuncture & Somatic Sanctuary
                </h4>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-xs font-mono font-bold text-neutral-500 uppercase block">
                    Practitioner Registration
                  </span>
                  <p className="font-mono text-sm font-bold text-neutral-900">
                    Reg No: TN/ACU/2016
                  </p>
                  <p className="text-xs text-neutral-600">
                    Registered under Tamil Nadu Clinical Acupuncture Practice Standards.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-xs font-mono font-bold text-neutral-500 uppercase block">
                    Sterility & Biohazard Protocol
                  </span>
                  <p className="font-mono text-sm font-bold text-emerald-600">
                    100% Single-Use Sterile Guarantee
                  </p>
                  <p className="text-xs text-neutral-600">
                    EO-Gas pre-sterilized 0.18mm surgical stainless steel. Zero needle reuse guaranteed.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-xs font-mono font-bold text-neutral-500 uppercase block">
                    Clinical Sanctuary Location
                  </span>
                  <p className="font-mono text-sm text-neutral-800">
                    Chinmaya Nagar, Virugambakkam, Chennai - 600092
                  </p>
                  <p className="text-xs text-neutral-600">
                    Hours: Mon–Sun · 10:00 AM to 8:00 PM (By Prior Appointment)
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-xs font-mono text-neutral-500">
                  Click card again to flip back to badge front
                </span>
              </div>
            </div>
          )}

          {/* Micro flip hint pill */}
          <div className="mt-3 pt-2 text-center border-t border-neutral-100">
            <span className="text-xs font-mono text-neutral-500 inline-flex items-center gap-1 hover:text-[#ed3373] transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-[#ed3373]" />
              <span>Interactive ID Badge · Click card to {isFlipped ? 'view front' : 'view accreditation details'}</span>
            </span>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
