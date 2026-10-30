import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, PhoneCall, MessageCircle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState({
    title: 'Initial Diagnostic Consultation',
    fee: 600,
    duration: '30 to 45 mins'
  });
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (10:00 AM – 1:00 PM)');
  const [healthConcern, setHealthConcern] = useState('');

  const services = [
    { title: 'Initial Diagnostic Consultation', fee: 600, duration: '30 to 45 mins', desc: 'Medical history, 14-pulse assessment, tongue diagnosis' },
    { title: 'Acupuncture Therapy Session', fee: 600, duration: '25 mins (Daily Limit: 50 Sessions)', desc: '0.18mm hair-thin single-use needles, TDP infrared heat, moxa/cupping' },
    { title: 'Clinical Psychotherapy', fee: 1800, duration: '50 mins (Weekly Limit: 20 Sessions)', desc: 'CBT, REBT & Gestalt therapy in private acoustic suite' },
    { title: 'Mind-Body Dual Therapy', fee: 2400, duration: '75 to 90 mins', desc: 'Integrated psychotherapy + full acupuncture needling back-to-back' }
  ];

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert('Please enter your full name.');
      return;
    }
    const message = encodeURIComponent(
      `Hello Dr. Nivedha,\n\nI would like to schedule a private clinical consultation at Arura Wellness Studio, Virugambakkam.\n\n` +
      `• Patient Name: ${patientName}\n` +
      `• Phone: ${patientPhone || 'Direct'}\n` +
      `• Selected Service: ${selectedService.title} (₹${selectedService.fee})\n` +
      `• Preferred Date: ${preferredDate || 'Earliest Available'}\n` +
      `• Time Window: ${preferredSlot}\n` +
      `• Chief Complaint: ${healthConcern || 'General Assessment'}\n\n` +
      `Kindly confirm the earliest appointment slot. Thank you.`
    );
    window.open(`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Header */}
      <section className="pt-24 pb-20 bg-ambient-light border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs uppercase tracking-wider text-[#e02868] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sanctuary Concierge & Scheduling</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Schedule Your Private <br />
              <span className="text-[#e02868]">Clinical Consultation</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
              Appointments are held strictly 1-on-1 in sound-dampened acoustic rooms at our Virugambakkam sanctuary. Prior scheduling is required to protect patient confidentiality.
            </p>
          </div>
        </div>
      </section>

      {/* Main Booking Interface — Clean, Minimalist, Clutter-Free */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <form onSubmit={handleWhatsAppBooking} className="space-y-12">
            
            {/* Step 1: Select Service */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold block">
                Step 01 • Select Treatment Modality
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b]">
                Clinical Tariff Options
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {services.map((srv, idx) => {
                  const isSelected = selectedService.title === srv.title;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedService(srv)}
                      className={`p-6 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'border-[#e02868] bg-pink-50/20 shadow-md ring-2 ring-[#e02868]'
                          : 'border-gray-200 bg-[#f8fafc] hover:border-gray-400 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-display text-lg font-bold ${isSelected ? 'text-[#e02868]' : 'text-gray-900'}`}>
                            {srv.title}
                          </h3>
                          <span className="text-xs text-gray-500 font-medium">{srv.duration}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-[#09090b]">₹{srv.fee}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        {srv.desc}
                      </p>

                      <div className="pt-2 text-xs font-bold uppercase tracking-wider">
                        <span className={isSelected ? 'text-[#e02868]' : 'text-gray-400'}>
                          {isSelected ? '✓ Selected' : 'Click to Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Patient Information */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold block">
                  Step 02 • Patient Details & Preferred Time
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b]">
                  Appointment Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-gray-700 block">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#e02868] focus:ring-1 focus:ring-[#e02868]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-gray-700 block">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#e02868] focus:ring-1 focus:ring-[#e02868]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-gray-700 block">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#e02868] focus:ring-1 focus:ring-[#e02868]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-gray-700 block">
                    Preferred Time Window
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#e02868] focus:ring-1 focus:ring-[#e02868] bg-white"
                  >
                    <option>Morning (10:00 AM – 1:00 PM)</option>
                    <option>Afternoon (2:00 PM – 5:00 PM)</option>
                    <option>Evening (5:00 PM – 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-700 block">
                  Primary Medical Condition / Symptoms (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Chronic cervical spondylosis, migraine headaches, sciatica, emotional anxiety, insomnia..."
                  value={healthConcern}
                  onChange={(e) => setHealthConcern(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#e02868] focus:ring-1 focus:ring-[#e02868]"
                />
              </div>
            </div>

            {/* Submission Desk */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline mr-1" />
                <span>Zero registration charges. 100% single-use needle guarantee.</span>
              </div>

              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="btn-luxury-outline px-6 py-4 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#e02868]" />
                  <span>Call Reception</span>
                </a>

                <button
                  type="submit"
                  className="btn-luxury-dark bg-[#e02868] hover:bg-[#c21e54] text-white px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center space-x-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Schedule via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </form>

        </div>
      </section>

    </div>
  );
}
