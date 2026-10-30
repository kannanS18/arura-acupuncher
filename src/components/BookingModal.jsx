import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, MessageCircle, Clock, ShieldCheck, HeartPulse } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

export default function BookingModal({ isOpen, onClose, preselectedService, preselectedPrice }) {
  const [formData, setFormData] = useState({
    service: preselectedService || 'Diagnostic Clinical Consultation (₹600)',
    date: '',
    time: '10:00 AM - 12:00 PM (Morning)',
    name: '',
    phone: '',
    city: 'Chennai',
    concerns: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct automated, beautifully formatted WhatsApp appointment request
    const message = `*NEW APPOINTMENT RESERVATION — ARURA WELLNESS STUDIO*
---------------------------------------
👤 *Patient Name:* ${formData.name}
📞 *WhatsApp Phone:* ${formData.phone}
📍 *City:* ${formData.city}
🌿 *Clinical Service:* ${formData.service}
📅 *Preferred Date:* ${formData.date}
⏰ *Time Window:* ${formData.time}
💬 *Primary Health Concern:* ${formData.concerns || 'General clinical consultation'}
---------------------------------------
_Requested via Arura Official Studio Concierge_`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-10 shadow-2xl border border-gray-200 max-h-[92vh] overflow-y-auto relative animate-fadeIn text-[#09090b]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-black bg-gray-100 p-2.5 rounded-full transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
              Arura Concierge Desk
            </span>
            <h3 className="font-display text-3xl font-bold text-[#09090b]">
              Priority Appointment Reservation
            </h3>
            <p className="text-sm text-gray-600 font-light">
              Direct one-on-one consultation with Dr. Nivedha Priyadharshini, MD (Acu).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Selection */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-700 font-semibold">
                Clinical Procedure
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#09090b] focus:outline-none focus:border-[#e02868] font-medium"
              >
                <option>Diagnostic Clinical Consultation (₹600)</option>
                <option>Acupuncture Therapy Session (₹600)</option>
                <option>Clinical Psychotherapy (₹1,800)</option>
                <option>Mind-Body Dual Therapy (₹2,400)</option>
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-700 font-semibold">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#09090b] focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-700 font-semibold">
                  Time Window
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#09090b] focus:outline-none focus:border-black"
                >
                  <option>10:00 AM - 12:00 PM (Morning)</option>
                  <option>02:00 PM - 05:00 PM (Afternoon)</option>
                  <option>05:00 PM - 08:00 PM (Evening)</option>
                </select>
              </div>
            </div>

            {/* Patient Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-700 font-semibold">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#09090b] focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-700 font-semibold">
                  WhatsApp Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#09090b] focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Health Concern */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-700 font-semibold">
                Chief Health Concern / Symptoms
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe your symptoms (e.g. severe cervical pain for 3 months, migraine attacks, anxiety)..."
                value={formData.concerns}
                onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#09090b] focus:outline-none focus:border-black"
              />
            </div>

            {/* Clinical Guarantee Notice */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>Strict clinical confidentiality. 100% single-use sterile Japanese needles.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-luxury-dark hover:bg-[#e02868] hover:border-[#e02868] py-4 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Confirm & Dispatch via WhatsApp</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
