import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/websiteContent';
import { MapPin, PhoneCall, Mail, Clock, MessageCircle, Send, CheckCircle2, Sparkles, Navigation } from 'lucide-react';

export default function ContactPage({ onOpenBooking }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Clinical Acupuncture (₹1,800)',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Header Banner */}
      <section className="relative pt-24 pb-20 border-b border-gray-200/80 bg-ambient-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#581c87] text-xs uppercase tracking-wider font-bold">
              <Navigation className="w-3.5 h-3.5" />
              <span>Sanctuary Coordinates</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Visit Arura Studio <br />
              <span className="text-gradient-luxury">in Chennai</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
              Quiet, hygienic, and deeply restorative clinical environment in Virugambakkam, Chennai. Consultations are strictly by prior appointment to guarantee unhurried, private care.
            </p>
          </div>
        </div>
      </section>

      {/* Main Details & Form */}
      <section className="py-24 lg:py-32 border-b border-gray-200/80 relative bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Cards */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="p-8 sm:p-10 rounded-3xl spotlight-card space-y-8 border border-gray-200/80 bg-white">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#09090b]">Clinic Details</h3>
                  <p className="text-sm text-gray-500 font-light mt-1">Direct coordinates & consultation hours</p>
                </div>

                <div className="space-y-6 text-sm font-light text-gray-700 border-t border-gray-100 pt-6">
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-purple-50 text-[#581c87] border border-purple-200 flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-[#09090b] font-medium text-base block">Clinic Location</strong>
                      <p className="mt-1 leading-relaxed text-gray-600">{CLINIC_INFO.address}</p>
                      <p className="text-xs text-[#581c87] font-semibold mt-1">Virugambakkam, Chennai - 600092</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-[#09090b] font-medium text-base block">Studio Hours</strong>
                      <p className="mt-1 leading-relaxed text-gray-600">{CLINIC_INFO.timings}</p>
                      <p className="text-xs text-emerald-700 font-semibold mt-1">Open Monday through Sunday (By Appointment)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0 mt-0.5">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-[#09090b] font-medium text-base block">Direct Telephone</strong>
                      <p className="mt-1">
                        <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-[#581c87] text-black font-semibold text-base transition-colors">
                          {CLINIC_INFO.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0 mt-0.5">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-[#09090b] font-medium text-base block">WhatsApp Desk</strong>
                      <p className="mt-1">
                        <a href={CLINIC_INFO.whatsappLink} target="_blank" rel="noreferrer" className="text-emerald-700 hover:text-emerald-800 font-semibold transition-colors text-sm underline">
                          Direct WhatsApp Concierge
                        </a>
                      </p>
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={CLINIC_INFO.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full btn-luxury-dark py-4 rounded-xl text-sm font-semibold tracking-wider flex items-center justify-center space-x-3 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                    <span>Instant WhatsApp Booking</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Direct Booking Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl spotlight-card space-y-8 border border-gray-200/80 bg-white">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#581c87] font-bold">
                    Direct Calendar Intake
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b] mt-2">
                    Request an Appointment
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-light mt-2">
                    Fill out the form below. Dr. Nivedha's desk will confirm your appointment timing directly via WhatsApp or phone call.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fadeIn">
                    <CheckCircle2 className="w-14 h-14 text-emerald-700 mx-auto" />
                    <h4 className="font-display text-2xl font-bold text-[#09090b]">Appointment Request Received</h4>
                    <p className="text-sm text-gray-700 font-light max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-black font-semibold">{formData.name}</strong>. Dr. Nivedha's clinical coordinator will contact you at <strong className="text-emerald-800 ">{formData.phone}</strong> within 2 hours to confirm your consultation slot.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-gray-700 font-semibold">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[#09090b] placeholder-gray-400 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-gray-700 font-semibold">Phone Number (WhatsApp)</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[#09090b] placeholder-gray-400 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-gray-700 font-semibold">Preferred Clinical Service</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[#09090b] text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      >
                        <option>Diagnostic Clinical Consultation (₹600)</option>
                        <option>Clinical Acupuncture Session (₹1,800)</option>
                        <option>Mind-Body Dual Therapy (₹2,400)</option>
                        <option>Psychological Counselling Session (₹600)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-gray-700 font-semibold">Chief Health Concerns / Symptoms</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your symptoms (e.g. chronic sciatica, insomnia, knee arthritis, anxiety)..."
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[#09090b] placeholder-gray-400 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-luxury-dark py-4 rounded-xl text-sm font-semibold tracking-wider flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Appointment Request</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
