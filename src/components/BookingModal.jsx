import React, { useState } from 'react';
import { X, ShieldCheck, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

export default function BookingModal({ isOpen, onClose, preselectedService, preselectedPrice }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: preselectedService || 'Diagnostic Clinical Consultation (₹600)',
    date: '',
    time: '10:00 AM to 12:00 PM (Morning)',
    concerns: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const message = `*Arura Wellness Studio — Priority Clinical Appointment*
---------------------------------------
👤 *Patient:* ${formData.name}
📞 *Phone:* ${formData.phone}
🩺 *Service:* ${formData.service}
🗓️ *Preferred Date:* ${formData.date}
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-10 shadow-2xl border border-gray-200 max-h-[92vh] overflow-y-auto relative motion-safe:animate-fadeIn text-ink">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-black bg-gray-100 p-2.5 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Priority Appointment Reservation
            </h3>
            <p className="text-sm text-gray-600 font-normal">
              Direct one-on-one consultation with Dr. Nivedha Priyadharshini, MD (Acu).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Selection */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-700 font-semibold block">
                Clinical procedure
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-ink focus:outline-none focus:border-brand font-medium focus-visible:outline-brand"
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
                <label className="text-xs text-gray-700 font-semibold block">
                  Preferred date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-ink focus:outline-none focus:border-ink focus-visible:outline-brand"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-700 font-semibold block">
                  Time window
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-ink focus:outline-none focus:border-ink focus-visible:outline-brand"
                >
                  <option>10:00 AM to 12:00 PM (Morning)</option>
                  <option>02:00 PM to 05:00 PM (Afternoon)</option>
                  <option>05:00 PM to 08:00 PM (Evening)</option>
                </select>
              </div>
            </div>

            {/* Patient Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-700 font-semibold block">
                  Patient full name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-ink focus:outline-none focus:border-ink focus-visible:outline-brand"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-700 font-semibold block">
                  WhatsApp phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-ink focus:outline-none focus:border-ink focus-visible:outline-brand"
                />
              </div>
            </div>

            {/* Health Concern */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-700 font-semibold block">
                Chief health concern
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe your symptoms (e.g. severe cervical pain for 3 months, migraine attacks, anxiety)..."
                value={formData.concerns}
                onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-ink focus:outline-none focus:border-ink focus-visible:outline-brand"
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
              className="w-full py-4 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 bg-ink text-white hover:bg-brand transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-safe:active:scale-95 disabled:opacity-50 shadow-md whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Confirm on WhatsApp</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
