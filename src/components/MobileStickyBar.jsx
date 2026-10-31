import React from 'react';
import { PhoneCall, MessageCircle, Calendar, MapPin, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { Link, useLocation } from 'react-router-dom';

export default function MobileStickyBar() {
  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40 px-2 py-1.5 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between text-gray-800">
        
        {/* 1. Direct Phone Call */}
        <a 
          href={`tel:${CLINIC_INFO.phone}`}
          className="flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] text-gray-700 hover:text-brand transition-colors duration-200 motion-safe:active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          title="Direct Doctor Desk Call"
        >
          <PhoneCall className="w-4 h-4 text-brand mb-0.5" />
          <span className="text-[11px] font-semibold">Call</span>
        </a>

        {/* 2. Direct WhatsApp Concierge */}
        <a 
          href={CLINIC_INFO.whatsappLink} 
          target="_blank" 
          rel="noreferrer" 
          className="flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] text-gray-700 hover:text-emerald-700 transition-colors duration-200 motion-safe:active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          title="WhatsApp Concierge"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>

        {/* 3. CENTER PRIMARY ACTION: BOOKING */}
        <div className="flex-1 flex justify-center -mt-4">
          <Link
            to="/booking"
            className="w-14 h-14 rounded-2xl bg-ink text-white border-2 border-brand shadow-lg flex flex-col items-center justify-center text-center hover:bg-brand transition-colors duration-200 motion-safe:active:scale-95 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            title="Book Consultation"
          >
            <Calendar className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
            <span className="text-[10px] font-bold mt-0.5">Book</span>
          </Link>
        </div>

        {/* 4. Clinic Modalities & Tariff */}
        <Link 
          to="/clinic"
          className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] transition-colors duration-200 motion-safe:active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
            location.pathname === '/clinic' ? 'text-brand font-bold' : 'text-gray-700 hover:text-brand'
          }`}
          title="Clinical Modalities & Fees"
        >
          <Sparkles className="w-4 h-4 text-brand mb-0.5" />
          <span className="text-[11px] font-semibold">Clinic</span>
        </Link>

        {/* 5. Clinic Map & Navigation */}
        <a 
          href="https://maps.google.com/?q=Arura+Acupuncture+Virugambakkam+Chennai"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] text-gray-700 hover:text-brand transition-colors duration-200 motion-safe:active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          title="Clinic Location on Google Maps"
        >
          <MapPin className="w-4 h-4 text-brand mb-0.5" />
          <span className="text-[11px] font-semibold">Location</span>
        </a>

      </div>
    </div>
  );
}
