import React, { useState } from 'react';
import { PhoneCall, MessageCircle, MapPin, Menu, X } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-xs transition-colors duration-200">
      {/* Top Utility Strip — Minimalist & Direct */}
      <div className="bg-surface-subtle text-gray-700 text-xs py-2 px-4 sm:px-8 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile Icon Bar */}
          <div className="flex sm:hidden items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <a 
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-brand shadow-xs motion-safe:active:scale-95 transition-colors"
                title="Call Clinic"
              >
                <PhoneCall className="w-3.5 h-3.5 text-brand" />
                <span className="font-semibold text-gray-800 text-[11px]">Call</span>
              </a>

              <a 
                href={CLINIC_INFO.whatsappLink} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-emerald-600 shadow-xs motion-safe:active:scale-95 transition-colors"
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
                <MapPin className="w-3.5 h-3.5 text-brand" />
                <span className="font-semibold text-gray-800 text-[11px]">Location</span>
              </a>

              <Link
                to="/booking"
                className="px-3 py-1.5 rounded-lg bg-brand text-white font-semibold text-[11px] shadow-xs hover:bg-brand-dark transition-colors"
              >
                Book ₹600
              </Link>
            </div>
          </div>

          {/* Desktop Utility Strip */}
          <div className="hidden sm:flex justify-between items-center gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2 text-gray-900 font-semibold">
                <PhoneCall className="w-3.5 h-3.5 text-brand" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-brand transition-colors">
                  {CLINIC_INFO.phone}
                </a>
                <span className="text-gray-500 font-normal text-xs hidden md:inline">(10:00 AM to 8:00 PM)</span>
              </span>

              <span className="text-gray-300 hidden sm:inline">|</span>

              <a 
                href={CLINIC_INFO.whatsappLink} 
                target="_blank" 
                rel="noreferrer" 
                className="hidden sm:flex items-center space-x-1.5 text-emerald-700 hover:text-emerald-800 font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp concierge</span>
              </a>
            </div>

            <div className="flex items-center space-x-4 text-gray-600 text-xs">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand" />
                <span>Chinmaya Nagar, Virugambakkam, Chennai</span>
              </span>

              <span className="text-gray-300 hidden sm:inline">|</span>

              <Link
                to="/booking"
                className="text-brand hover:text-brand-dark font-semibold transition-colors"
              >
                Book priority consultation
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <div className="p-1 rounded-xl bg-white border border-gray-200 group-hover:border-brand transition-colors shadow-xs">
              <img 
                src={getAssetUrl('logo.png')} 
                alt="Arura Wellness Studio" 
                className="h-10 sm:h-11 w-auto object-contain" 
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-700">
            <NavLink
              to="/"
              className={({ isActive }) => `py-2 transition-colors relative ${
                isActive 
                  ? 'text-brand font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand' 
                  : 'hover:text-brand'
              }`}
            >
              Home
            </NavLink>

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `py-2 transition-colors relative whitespace-nowrap ${
                  isActive 
                    ? 'text-brand font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand' 
                    : 'hover:text-brand'
                }`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Button */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link
              to="/booking"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap bg-ink text-white hover:bg-brand transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-safe:active:scale-95 shadow-sm"
            >
              Consultation (₹600)
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-brand" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 shadow-xl">
          <p className="text-xs text-brand font-semibold mb-2">
            Navigation menu
          </p>
          <div className="flex flex-col space-y-3 text-base font-semibold text-gray-800">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `py-2 transition-colors ${isActive ? 'text-brand font-bold' : 'hover:text-brand'}`}
            >
              Home
            </NavLink>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `py-2 transition-colors ${isActive ? 'text-brand font-bold' : 'hover:text-brand'}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <Link
              to="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl text-xs font-semibold text-center block bg-brand text-white hover:bg-brand-dark transition-colors motion-safe:active:scale-95 shadow-sm"
            >
              Book priority consultation (₹600)
            </Link>
            <a
              href={CLINIC_INFO.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 border border-gray-200 text-gray-800 hover:border-emerald-600 hover:text-emerald-700 transition-colors motion-safe:active:scale-95 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp desk</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
