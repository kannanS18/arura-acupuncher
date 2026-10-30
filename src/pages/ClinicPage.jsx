import React from 'react';
import { PRICING_DATA, CLINIC_INFO, DOS_DONTS, ACUPUNCTURE_TECHNIQUES } from '../data/websiteContent';
import { ShieldCheck, HeartPulse, Clock, Sparkles, CheckCircle2, ArrowRight, PhoneCall, MessageCircle, AlertCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClinicPage({ onOpenBooking }) {
  const clinicalTariff = [
    {
      code: "MED-01",
      title: "Initial Diagnostic Consultation",
      subtitle: "First Visit Clinical Assessment & Pulse Mapping",
      duration: "30 to 45 mins",
      fee: "₹600",
      feeNum: 600,
      scope: "Comprehensive medical history evaluation, pain chronicity review, sleep & stress intake, 14-channel radial pulse diagnosis, tongue topography inspection, and personalized multi-session care plan.",
      inclusions: ["14-Channel Radial Pulse", "Tongue Topography Analysis", "Personalized Treatment Roadmap", "Doctor 1-on-1 Consultation"]
    },
    {
      code: "MED-02",
      title: "Acupuncture Therapy Session",
      subtitle: "Targeted Meridian Needling & Pain Management",
      duration: "25 mins (Daily Limit: 50 Sessions)",
      fee: "₹600",
      feeNum: 600,
      scope: "Placement of 5 to 20 ultra-fine sterile surgical stainless steel needles along designated nerve pathways. Includes localized infrared TDP heat therapy and complimentary moxibustion or glass cupping as clinically indicated.",
      inclusions: ["100% Single-Use Sterile Needles", "Ethylene Oxide Pre-Sterilized", "TDP Mineral Heat Therapy", "Complimentary Glass Cupping / Moxa"]
    },
    {
      code: "MED-03",
      title: "Clinical Psychotherapy",
      subtitle: "Evidence-Based Cognitive & Emotional Healing",
      duration: "50 mins",
      fee: "₹1,800",
      feeNum: 1800,
      scope: "Private, strictly confidential psychotherapy conducted in our sound-dampened acoustic room. Integrates Cognitive Behavioral Therapy (CBT), REBT, and Gestalt methods to unburden emotional stress and autonomic overdrive.",
      inclusions: ["Evidence-Based CBT & REBT", "Private Sound-Dampened Acoustic Suite", "Somatic Calming Techniques", "100% Confidential Clinical Ethics"]
    },
    {
      code: "MED-04",
      title: "Integrated Mind-Body Dual Session",
      subtitle: "Psychotherapy + Full Acupuncture Needling",
      duration: "75 to 90 mins",
      fee: "₹2,400",
      feeNum: 2400,
      scope: "Our comprehensive sanctuary session combining 40 minutes of cognitive dialogue with immediate full-body precision acupuncture needling to biologically interrupt chronic pain-spasm loops.",
      inclusions: ["Full Clinical Psychotherapy", "Complete Precision Needling", "Infrared Heat & Vagus Regulation", "Maximum Multi-System Synergy"]
    }
  ];

  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Clinic Header: Dignified Medical Tariff Banner (Clean & Non-Repetitive) */}
      <section className="pt-20 pb-16 bg-[#f8fafc] border-b border-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs uppercase tracking-wider text-[#e02868] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Arura Wellness Sanctuary • Virugambakkam, Chennai</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Clinical Modalities <br />
              <span className="text-[#e02868]">& Consultation Tariff</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
              Clean clinical facilities, hospital-grade single-use needles, and unhurried private acoustic suites. All consultation and session fees are transparent with zero hidden charges.
            </p>
          </div>
        </div>
      </section>

      {/* Official Medical Consultation & Treatment Tariff (Clinical Ledger — NOT SaaS Pricing Columns) */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
                Clinical Schedule of Fees
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b]">
                Medical Tariff Schedule
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              Hospital-grade sterile single-use needles, infrared heat, and pulse diagnostics are unconditionally included.
            </p>
          </div>

          {/* Elegant Clinical Fee Schedule Table / Ledger */}
          <div className="space-y-4">
            {clinicalTariff.map((item) => (
              <div 
                key={item.code}
                className="p-6 sm:p-8 rounded-2xl bg-[#f8fafc] border border-gray-200 hover:border-[#e02868] hover:bg-white hover:shadow-lg transition-all group flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left: Service Details */}
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-[#e02868] bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-md">
                      {item.code}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#09090b] group-hover:text-[#e02868] transition-colors">
                      {item.title}
                    </h3>
                    <span className="hidden sm:inline-flex items-center space-x-1 text-xs text-gray-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.duration}</span>
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {item.scope}
                  </p>

                  {/* Clinical Inclusions */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.inclusions.map((inc, i) => (
                      <span key={i} className="inline-flex items-center space-x-1.5 text-xs text-gray-700 bg-white border border-gray-200 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{inc}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Tariff & Booking Action */}
                <div className="flex items-center justify-between lg:flex-col lg:items-end gap-4 lg:min-w-[200px] border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-200">
                  <div className="text-left lg:text-right">
                    <div className="font-display text-3xl sm:text-4xl font-bold text-[#09090b] group-hover:text-[#e02868] transition-colors">
                      {item.fee}
                    </div>
                    <span className="text-xs text-gray-500 font-normal">Standard Session Fee</span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(item.title, item.feeNum)}
                    className="btn-luxury-dark group-hover:bg-[#e02868] group-hover:border-[#e02868] px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center space-x-2 transition-all shadow-xs"
                  >
                    <span>Schedule Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Patient Guidelines: Clinical DOs and DON'Ts from Official PDF */}
      <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
              Treatment Protocol
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b]">
              Preparation & Home Care Guidelines
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal">
              Official patient guidelines from Dr. Nivedha to ensure safe and effective treatment outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DOs */}
            <div className="p-8 rounded-3xl bg-white border border-emerald-200 shadow-xs space-y-6">
              <div className="flex items-center space-x-3 text-emerald-800 border-b border-emerald-100 pb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h3 className="font-display text-2xl font-bold">Clinical DOs Before & After</h3>
              </div>
              <div className="space-y-4">
                {DOS_DONTS.dos.map((d, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">{d.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DON'Ts */}
            <div className="p-8 rounded-3xl bg-white border border-amber-200 shadow-xs space-y-6">
              <div className="flex items-center space-x-3 text-amber-900 border-b border-amber-100 pb-4">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <h3 className="font-display text-2xl font-bold">Important Precautions (DON'Ts)</h3>
              </div>
              <div className="space-y-4">
                {DOS_DONTS.donts.map((d, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">{d.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Clinic Sanctuary Location & Working Hours */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#09090b] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-pink-300 font-bold block">
                Sanctuary Address
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                {CLINIC_INFO.address}
              </h3>
              <p className="text-sm text-gray-300 font-normal max-w-lg">
                Daily clinical consultations from 10:00 AM to 8:00 PM. Prior appointment booking required to preserve private acoustic suite confidentiality.
              </p>
            </div>

            <Link
              to="/booking"
              className="btn-shimmer px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#e02868] text-white hover:bg-[#c21e54] whitespace-nowrap shadow-xl"
            >
              Book In-Clinic Session (₹600)
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
