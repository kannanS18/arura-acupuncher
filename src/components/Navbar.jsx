import React, { useState } from 'react';
import { PhoneCall, MessageCircle, MapPin, Menu, X, CalendarCheck, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { Link, NavLink } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';

export default function Navbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exactly the 5 essential pages requested by the user
  const navLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Doctor', path: '/doctor' },
    { name: 'Clinic', path: '/clinic' },
    { name: 'Blog', path: '/blog' },
    { name: 'Booking', path: '/booking' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-xs transition-all">
      {/* Top Utility Strip — Minimalist & Direct */}
      <div className="bg-[#f8fafc] text-gray-700 text-xs py-2 px-4 sm:px-8 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile Icon Bar (Clean, Uncluttered, Zero Stuffed Text) */}
          <div className="flex sm:hidden items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <a 
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-[#e02868] shadow-xs active:scale-95 transition-transform"
                title="Call Clinic"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#e02868]" />
                <span className="font-semibold text-gray-800 text-[11px]">Call</span>
              </a>

              <a 
                href={CLINIC_INFO.whatsappLink} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-emerald-600 shadow-xs active:scale-95 transition-transform"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-gray-800 text-[11px]">WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="https://maps.google.com/?q=Arura+Acupuncture+Virugambakkam+Chennai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 shadow-xs"
                title="Virugambakkam Clinic Location"
              >
                <MapPin className="w-3.5 h-3.5 text-[#e02868]" />
                <span className="font-semibold text-gray-800 text-[11px]">Location</span>
              </a>

              <Link
                to="/booking"
                className="px-3 py-1.5 rounded-lg bg-[#e02868] text-white font-bold text-[11px] shadow-xs hover:bg-[#c21e54] transition-colors"
              >
                Book ₹600
              </Link>
            </div>
          </div>

          {/* Desktop Utility Strip (Spacious & Clean) */}
          <div className="hidden sm:flex justify-between items-center gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2 text-gray-900 font-semibold">
                <PhoneCall className="w-3.5 h-3.5 text-[#e02868]" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-[#e02868] transition-colors">
                  {CLINIC_INFO.phone}
                </a>
                <span className="text-gray-500 font-normal text-xs hidden md:inline">(10:00 AM – 8:00 PM)</span>
              </span>

              <span className="text-gray-300 hidden sm:inline">|</span>

              <a 
                href={CLINIC_INFO.whatsappLink} 
                target="_blank" 
                rel="noreferrer" 
                className="hidden sm:flex items-center space-x-1.5 text-emerald-700 hover:text-emerald-800 font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>

            <div className="flex items-center space-x-4 text-gray-600 text-xs">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#e02868]" />
                <span>Chinmaya Nagar, Virugambakkam, Chennai</span>
              </span>

              <span className="text-gray-300 hidden sm:inline">|</span>

              <Link
                to="/booking"
                className="text-[#e02868] hover:text-[#b01c4e] font-bold transition-colors"
              >
                Book Priority Consultation →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar — Clean, Uncluttered, Minimalist */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <div className="p-1 rounded-xl bg-white border border-gray-200 group-hover:border-[#e02868] transition-colors shadow-xs">
              <img 
                src={getAssetUrl('logo.png')} 
                alt="Arura Wellness Studio" 
                className="h-10 sm:h-11 w-auto object-contain" 
              />
            </div>
          </Link>

          {/* Desktop Navigation Links — Pink Active Highlight (#e02868) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-700">
            <NavLink
              to="/"
              className={({ isActive }) => `py-2 transition-all relative ${
                isActive 
                  ? 'text-[#e02868] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#e02868]' 
                  : 'hover:text-[#e02868]'
              }`}
            >
              Home
            </NavLink>

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `py-2 transition-all relative whitespace-nowrap ${
                  isActive 
                    ? 'text-[#e02868] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#e02868]' 
                    : 'hover:text-[#e02868]'
                }`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Button — Distinct Pink Accent on Hover */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link
              to="/booking"
              className="hidden sm:inline-flex btn-luxury-dark px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold whitespace-nowrap shadow-sm hover:border-[#e02868] hover:bg-[#e02868] transition-colors"
            >
              Consultation (₹600)
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#e02868]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="text-xs uppercase tracking-wider text-[#e02868] font-bold mb-2">
            Navigation Menu
          </div>
          <div className="flex flex-col space-y-3 text-base font-semibold text-gray-800">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `py-2 transition-colors ${isActive ? 'text-[#e02868] font-bold' : 'hover:text-[#e02868]'}`}
            >
              Home
            </NavLink>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `py-2 transition-colors ${isActive ? 'text-[#e02868] font-bold' : 'hover:text-[#e02868]'}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <Link
              to="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-luxury-dark py-4 rounded-xl text-xs uppercase tracking-wider font-bold text-center block bg-[#e02868] text-white"
            >
              Book Priority Consultation (₹600)
            </Link>
            <a
              href={CLINIC_INFO.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full btn-luxury-outline py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
