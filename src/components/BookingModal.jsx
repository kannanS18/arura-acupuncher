import React, { useCallback } from 'react';
import { X, ShieldCheck, MessageCircle, PhoneCall } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { Booking } from './booking';
import { getAssetUrl } from '../utils/assetUrl';

export default function BookingModal({ isOpen, onClose, preselectedService, preselectedPrice }) {
  if (!isOpen) return null;

  const serviceTitle = preselectedService || 'Diagnostic Clinical Consultation (₹600)';
  const serviceDuration = serviceTitle.includes('Psychotherapy') ? 50 : serviceTitle.includes('Dual') ? 90 : 45;

  const getClinicSlots = async ({ from, to, timeZone }, signal) => {
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
      const dayOfWeek = curr.getDay();
      const hoursForDay = dayOfWeek === 0 ? dailySlotTemplates.slice(0, 4) : dailySlotTemplates;

      for (const t of hoursForDay) {
        const slotDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), t.h, t.m, 0);
        const slotMs = slotDate.getTime();
        if (slotMs > now + 30 * 60 * 1000) {
          slots.push(slotMs);
        }
      }
      curr.setDate(curr.getDate() + 1);
    }
    return slots;
  };

  const handleBook = async (request) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const appointmentId = `ARURA-${Date.now().toString(36).toUpperCase()}`;

    try {
      const existing = JSON.parse(localStorage.getItem('arura_appointments') || '[]');
      existing.push({
        id: appointmentId,
        service: serviceTitle,
        start: request.start.toISOString(),
        end: request.end.toISOString(),
        name: request.name,
        email: request.email,
        note: request.note,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('arura_appointments', JSON.stringify(existing));
    } catch {
      // Ignore
    }

    return {
      id: appointmentId
    };
  };

  const handleCancel = async (booking) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const existing = JSON.parse(localStorage.getItem('arura_appointments') || '[]');
      const filtered = existing.filter(a => a.id !== booking.id);
      localStorage.setItem('arura_appointments', JSON.stringify(filtered));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-4 sm:p-8 shadow-2xl border border-gray-200 max-h-[95vh] overflow-y-auto relative motion-safe:animate-fadeIn text-ink flex flex-col items-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full transition-colors z-20 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand"
          aria-label="Close Booking Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="w-full text-center sm:text-left mb-6 pr-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand bg-brand/10 px-2.5 py-1 rounded-full mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Priority Consultation Reservation</span>
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Book With Dr. Nivedha Priyadharshini
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-normal mt-0.5">
            Strict 1-on-1 private appointments at our Virugambakkam sanctuary. Choose your date & time below.
          </p>
        </div>

        {/* The Hairline UI Booking Component */}
        <div className="w-full flex justify-center">
          <Booking
            host={{
              name: CLINIC_INFO.founder,
              role: 'MD (Acu) • Chief Healer & Psychotherapist',
              src: getAssetUrl('doctor_nivedha_portrait.jpg')
            }}
            title={serviceTitle}
            description="14-pulse assessment, tongue diagnosis & private acupuncture consultation."
            duration={serviceDuration}
            location="Arura Studio • Chinmaya Nagar, Virugambakkam"
            getSlots={getClinicSlots}
            onBook={handleBook}
            onCancel={handleCancel}
            hour12={true}
            weekStartsOn={1}
            className="shadow-md border border-gray-200/90 w-full"
          />
        </div>

        {/* Quick Footer Links */}
        <div className="w-full pt-4 mt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
          <span>Fee collected after personal session • No advance payment lock</span>
          <a
            href={CLINIC_INFO.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Quick Desk</span>
          </a>
        </div>

      </div>
    </div>
  );
}
