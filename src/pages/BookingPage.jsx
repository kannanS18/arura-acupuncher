import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MessageCircle, PhoneCall, MapPin, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { Booking } from '../components/booking';
import { getAssetUrl } from '../utils/assetUrl';

export default function BookingPage() {
  const services = [
    {
      id: 'diagnostic',
      title: 'Diagnostic Clinical Consultation',
      fee: 600,
      duration: 45,
      durationText: '45 mins',
      desc: 'Comprehensive medical history, 14-meridian pulse diagnosis, tongue examination & treatment plan.'
    },
    {
      id: 'acupuncture',
      title: 'Acupuncture Therapy Session',
      fee: 600,
      duration: 30,
      durationText: '30 mins (Daily Limit: 50 Sessions)',
      desc: '0.18mm hair-thin single-use sterile needles, TDP infrared therapy & optional glass cupping.'
    },
    {
      id: 'counselling',
      title: 'Clinical Psychotherapy',
      fee: 1800,
      duration: 50,
      durationText: '50 mins (Weekly Limit: 20 Sessions)',
      desc: 'Confidential CBT, REBT & Gestalt therapy in private acoustic suite with Dr. Nivedha.'
    },
    {
      id: 'dual',
      title: 'Mind-Body Dual Therapy',
      fee: 2400,
      duration: 90,
      durationText: '90 mins',
      desc: 'Combined cognitive psychotherapy + full somatic acupuncture needling session back-to-back.'
    }
  ];

  const [selectedService, setSelectedService] = useState(services[0]);

  // Generates real clinical appointment slots according to clinic working hours
  const getClinicSlots = useCallback(async ({ from, to, timeZone }, signal) => {
    // Timings: 10:00 AM - 7:30 PM
    const dailySlotTemplates = [
      { h: 10, m: 0 },
      { h: 10, m: 45 },
      { h: 11, m: 30 },
      { h: 12, m: 15 },
      { h: 13, m: 45 },
      { h: 14, m: 30 },
      { h: 15, m: 15 },
      { h: 16, m: 0 },
      { h: 16, m: 45 },
      { h: 17, m: 30 },
      { h: 18, m: 15 },
      { h: 19, m: 0 }
    ];

    const slots = [];
    const now = Date.now();
    const curr = new Date(from);
    const end = new Date(to);

    while (curr < end) {
      if (signal?.aborted) return [];

      const dayOfWeek = curr.getDay(); // 0 is Sunday
      // Sunday clinic hours: Morning only
      const hoursForDay = dayOfWeek === 0 ? dailySlotTemplates.slice(0, 4) : dailySlotTemplates;

      for (const t of hoursForDay) {
        const slotDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), t.h, t.m, 0);
        const slotMs = slotDate.getTime();
        // Only return slots at least 30 mins in the future
        if (slotMs > now + 30 * 60 * 1000) {
          slots.push(slotMs);
        }
      }
      curr.setDate(curr.getDate() + 1);
    }

    return slots;
  }, []);

  const handleBook = useCallback(async (request) => {
    // Emulate realistic appointment recording
    await new Promise((resolve) => setTimeout(resolve, 600));
    const appointmentId = `ARURA-${Date.now().toString(36).toUpperCase()}`;

    // Store in localStorage for client record
    try {
      const existing = JSON.parse(localStorage.getItem('arura_appointments') || '[]');
      existing.push({
        id: appointmentId,
        service: selectedService.title,
        fee: selectedService.fee,
        start: request.start.toISOString(),
        end: request.end.toISOString(),
        name: request.name,
        email: request.email,
        note: request.note,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('arura_appointments', JSON.stringify(existing));
    } catch {
      // Ignore storage errors in restricted contexts
    }

    return {
      id: appointmentId,
      meetingUrl: undefined // In-person clinic consultation
    };
  }, [selectedService]);

  const handleCancel = useCallback(async (booking) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const existing = JSON.parse(localStorage.getItem('arura_appointments') || '[]');
      const filtered = existing.filter(a => a.id !== booking.id);
      localStorage.setItem('arura_appointments', JSON.stringify(filtered));
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className="bg-white text-ink min-h-screen">
      
      {/* Header Banner */}
      <section className="pt-20 pb-14 bg-surface-subtle border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sanctuary Concierge • Virugambakkam</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.12]">
              Schedule Your Private <br />
              <span className="text-brand">Clinical Consultation</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
              Select your therapeutic modality below, pick your preferred appointment slot on the interactive ticket, and confirm your visit directly with Dr. Nivedha Priyadharshini.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Interactive Booking Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Step 1: Select Service Modality */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-brand block mb-1">
                  Step 1 of 2
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  Select clinical modality
                </h2>
              </div>
              <span className="text-xs text-neutral-500 font-normal hidden sm:inline">
                Click any service to update ticket
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((srv) => {
                const isSelected = selectedService.id === srv.id;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv)}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? 'border-brand bg-pink-50/40 ring-1 ring-brand'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-xl font-bold text-ink">₹{srv.fee}</span>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-brand bg-pink-100/70 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <h3 className={`font-display text-base font-bold ${isSelected ? 'text-brand' : 'text-neutral-900'}`}>
                        {srv.title}
                      </h3>
                      <p className="text-xs text-neutral-500 font-medium flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span>{srv.durationText}</span>
                      </p>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {srv.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: The Hairline UI Interactive Booking Ticket */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <div>
              <span className="text-xs font-medium text-brand block mb-1">
                Step 2 of 2
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Select date and printable ticket
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Click a date on the calendar, select an available hour, and your appointment time will print onto the clinical ticket stub.
              </p>
            </div>

            <div className="flex justify-center pt-2 w-full">
              <Booking
                key={selectedService.id}
                host={{
                  name: CLINIC_INFO.founder,
                  role: 'MD (Acu) • Chief Healer & Psychotherapist',
                  src: getAssetUrl('doctor_nivedha_portrait.jpg')
                }}
                title={selectedService.title}
                description={selectedService.desc}
                duration={selectedService.duration}
                location="Arura Studio • Chinmaya Nagar, Virugambakkam"
                getSlots={getClinicSlots}
                onBook={handleBook}
                onCancel={handleCancel}
                hour12={true}
                weekStartsOn={1}
                className="shadow-xl border border-gray-200/90 w-full"
              />
            </div>
          </div>

          {/* Trust Guarantees & Clinical Assurances */}
          <div className="pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-surface-subtle border border-gray-200 flex items-start space-x-3.5">
              <ShieldCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-gray-900">Strict Aseptic Needling</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Single-use 0.18mm surgical stainless steel needles unsealed fresh at your bedside. Zero reuse policy.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-subtle border border-gray-200 flex items-start space-x-3.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-gray-900">No Advance Payment</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Total consultation fee is collected only after direct personal clinical assessment. No pre-payment locks.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-subtle border border-gray-200 flex items-start space-x-3.5">
              <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-gray-900">Direct WhatsApp Concierge</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Need an urgent emergency slot or route directions? Chat directly with Dr. Nivedha's clinical desk.
                </p>
                <a
                  href={CLINIC_INFO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-2"
                >
                  <span>Open WhatsApp Desk</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
