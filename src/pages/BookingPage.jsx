import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, PhoneCall, MessageCircle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import MeridianPulseWave from '../components/MeridianPulseWave';

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
    <div className="bg-white text-ink min-h-screen">
      
      {/* Header with Scroll Reveal */}
      <section className="pt-24 pb-20 bg-surface-subtle border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center space-x-2 text-xs text-brand font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sanctuary Concierge & Scheduling</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.12]">
              Schedule Your Private <br />
              <span className="text-brand">Clinical Consultation</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
              Appointments are held strictly 1-on-1 in sound-dampened acoustic rooms at our Virugambakkam sanctuary. Prior scheduling is required to protect patient confidentiality.
            </p>
          </motion.div>
        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-8">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* Main Booking Interface */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <form onSubmit={handleWhatsAppBooking} className="space-y-12">
            
            {/* Step 1: Select Service */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Select Clinical Modality
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {services.map((srv, idx) => {
                  const isSelected = selectedService.title === srv.title;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedService(srv)}
                      className={`p-6 rounded-2xl cursor-pointer border transition-colors duration-200 flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'border-brand bg-pink-50/20 shadow-md ring-1 ring-brand'
                          : 'border-gray-200 bg-surface-subtle hover:border-gray-400 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-display text-lg font-bold ${isSelected ? 'text-brand' : 'text-gray-900'}`}>
                            {srv.title}
                          </h3>
                          <span className="text-xs text-gray-500 font-medium">{srv.duration}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-ink">₹{srv.fee}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        {srv.desc}
                      </p>

                      <div className="pt-2 text-xs font-semibold">
                        <span className={isSelected ? 'text-brand' : 'text-gray-400'}>
                          {isSelected ? '✓ Selected' : 'Click to select'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Step 2: Patient Information */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 pt-6 border-t border-gray-200"
            >
              <div className="space-y-1">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  Patient & Appointment Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1.5">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1.5">
                    Contact Phone Number (WhatsApp Enabled)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1.5">
                    Preferred Time Window
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand bg-white"
                  >
                    <option>Morning (10:00 AM to 1:00 PM)</option>
                    <option>Afternoon (1:00 PM to 4:00 PM)</option>
                    <option>Evening (4:00 PM to 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1.5">
                  Primary Health Distress / Chief Complaint
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your health concern (e.g. cervical spondylosis, migraine frequency, sleep trouble, sciatica)..."
                  value={healthConcern}
                  onChange={(e) => setHealthConcern(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>
            </motion.div>

            {/* Submit Action */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-sm font-bold text-gray-900 block">
                  Total Consultation Fee: ₹{selectedService.fee}
                </span>
                <span className="text-xs text-gray-500 block">
                  No advance payment required. Fee collected after direct clinical session.
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark shadow-lg flex items-center justify-center space-x-2 transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp desk</span>
                <ArrowRight className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

          </form>

        </div>
      </section>

    </div>
  );
}
