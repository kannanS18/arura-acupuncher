import React from 'react';
import { PhoneCall, MessageCircle, Calendar, MapPin, Navigation } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { Link } from 'react-router-dom';

export default function MobileStickyBar({ onOpenBooking }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto flex items-center justify-between text-gray-800">
        
        {/* 1. Direct Phone Call */}
        <a 
          href={`tel:${CLINIC_INFO.phone}`}
          className="flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] text-gray-700 hover:text-[#e02868] transition-colors active:scale-95"
          title="Direct Doctor Desk Call"
        >
          <PhoneCall className="w-4 h-4 text-[#e02868] mb-0.5" />
          <span className="text-[10px] font-bold tracking-wider uppercase">Call</span>
        </a>

        {/* 2. Direct WhatsApp Concierge */}
        <a 
          href={CLINIC_INFO.whatsappLink} 
          target="_blank" 
          rel="noreferrer" 
          className="flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] text-gray-700 hover:text-emerald-700 transition-colors active:scale-95"
          title="WhatsApp Concierge"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[10px] font-bold tracking-wider uppercase">WhatsApp</span>
        </a>

        {/* 3. CENTER PRIMARY ACTION: BOOKING */}
        <div className="flex-1 flex justify-center -mt-4">
          <Link
            to="/booking"
            className="w-14 h-14 rounded-2xl bg-[#09090b] text-white border-2 border-[#e02868] shadow-lg flex flex-col items-center justify-center text-center hover:bg-[#e02868] transition-all active:scale-95 group"
            title="Book Consultation"
          >
            <Calendar className="w-5 h-5 text-[#e02868] group-hover:text-white transition-colors" />
            <span className="text-[9px] font-extrabold uppercase tracking-wider mt-0.5">Book</span>
          </Link>
        </div>

        {/* 4. Clinic Location */}
        <a 
          href="https://maps.google.com/?q=Arura+Acupuncture+Virugambakkam+Chennai"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] text-gray-700 hover:text-[#e02868] transition-colors active:scale-95"
          title="Clinic Address"
        >
          <MapPin className="w-4 h-4 text-[#e02868] mb-0.5" />
          <span className="text-[10px] font-bold tracking-wider uppercase">Location</span>
        </a>

        {/* 5. GPS Navigation / Directions */}
        <a 
          href="https://www.google.com/maps/dir/?api=1&destination=Arura+Acupuncture+Virugambakkam+Chennai"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] text-gray-700 hover:text-indigo-600 transition-colors active:scale-95"
          title="Turn-by-turn Navigation"
        >
          <Navigation className="w-4 h-4 text-indigo-600 mb-0.5" />
          <span className="text-[10px] font-bold tracking-wider uppercase">Directions</span>
        </a>

      </div>
    </div>
  );
}
