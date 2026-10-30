import React from 'react';
import { MapPin, Phone, MessageCircle, Instagram, Clock, Navigation } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

export default function ContactSection({ onOpenBooking }) {
  return (
    <section id="contact" className="py-24 bg-[#faf8fb] border-t border-[#ede7f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Coordinates (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#581c87]">Get In Touch</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#161820] font-display mt-1">
                Visit Arura Studio in Chennai
              </h2>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                We welcome you to our calm, serene healing sanctuary located in Chinmaya Nagar, Virugambakkam.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3 p-5 bg-white rounded-3xl border border-[#ede7f3] shadow-sm">
                <div className="p-3 bg-purple-50 text-[#66478d] rounded-2xl flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <strong className="text-gray-900 font-bold block text-sm">Clinic Location</strong>
                  <p className="text-gray-600 mt-1 leading-relaxed">{CLINIC_INFO.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3 p-5 bg-white rounded-3xl border border-[#ede7f3] shadow-sm">
                <div className="p-3 bg-pink-50 text-[#581c87] rounded-2xl flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <strong className="text-gray-900 font-bold block text-sm">Direct Office Line</strong>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="text-[#581c87] font-bold text-sm hover:underline">
                    {CLINIC_INFO.phone}
                  </a>
                  <p className="text-gray-400 text-[11px] mt-0.5">(Please call during office hours only)</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-3 p-5 bg-white rounded-3xl border border-[#ede7f3] shadow-sm">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <strong className="text-gray-900 font-bold block text-sm">Instant WhatsApp Desk</strong>
                  <a href={CLINIC_INFO.whatsappLink} target="_blank" rel="noreferrer" className="text-emerald-700 font-bold text-sm hover:underline">
                    wa.me/{CLINIC_INFO.phoneRaw}
                  </a>
                  <p className="text-gray-400 text-[11px] mt-0.5">Direct chat with clinical coordinator</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start space-x-3 p-5 bg-white rounded-3xl border border-[#ede7f3] shadow-sm">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl flex-shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <strong className="text-gray-900 font-bold block text-sm">Official Instagram</strong>
                  <a href={CLINIC_INFO.instagram} target="_blank" rel="noreferrer" className="text-rose-600 font-bold text-sm hover:underline">
                    {CLINIC_INFO.instagramHandle}
                  </a>
                  <p className="text-gray-400 text-[11px] mt-0.5">Daily healing stories & health insights</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Embedded Interactive Map & Booking CTA (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-[#ede7f3] bg-gray-200">
              <iframe
                title="Arura Wellness Studio Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.666113886561!2d80.1919865751286!3d13.056885387266613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266c2bbd39423%3A0x6b404d8f070b4a43!2sVirugambakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#ede7f3] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
              <div className="flex items-center space-x-3 text-gray-700">
                <Navigation className="w-5 h-5 text-[#581c87] flex-shrink-0" />
                <span>Central Chennai access: Close to Vadapalani, Ashok Nagar, T. Nagar & Nungambakkam.</span>
              </div>
              <button
                onClick={() => onOpenBooking()}
                className="btn-magnetic px-6 py-3 rounded-full bg-gradient-to-r from-[#66478d] to-[#581c87] text-white font-bold whitespace-nowrap shadow-md"
              >
                Book Priority Slot
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
