import React, { useState } from 'react';
import { PhoneCall, MessageCircle, MapPin, Menu, X } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import { LiquidTabs } from './ui/liquid-tabs';

export default function Navbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Exactly the essential clinic navigation destinations in user-requested order:
  // Home, About Us, Acupuncture (formerly Clinic), Counselling, 3D Anatomy, Blog, Booking
  const navTabs = [
    { value: '/', label: 'Home', href: '#/' },
    { value: '/about', label: 'About Us', href: '#/about' },
    { value: '/clinic', label: 'Acupuncture', href: '#/clinic' },
    { value: '/counselling', label: 'Counselling', href: '#/counselling' },
    { value: '/how-acupuncture-works', label: '3D Anatomy', href: '#/how-acupuncture-works' },
    { value: '/blog', label: 'Blog', href: '#/blog' },
    { value: '/booking', label: 'Booking', href: '#/booking' },
  ];

  // Map active route dynamically to LiquidTab value
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/' || path === '') return '/';
    if (path.startsWith('/about') || path === '/disorders') return '/about';
    if (path.startsWith('/doctor') || path === '/therapist') return '/about';
    if (path.startsWith('/clinic') || path.startsWith('/acupuncture') || path === '/pricing' || path === '/safety' || path === '/faqs') return '/clinic';
    if (path.startsWith('/counselling')) return '/counselling';
    if (path.startsWith('/how-acupuncture-works') || path.startsWith('/3d-lab') || path.startsWith('/anatomy') || path.startsWith('/3d-anatomy')) return '/how-acupuncture-works';
    if (path.startsWith('/blog')) return '/blog';
    if (path.startsWith('/booking') || path === '/contact') return '/booking';
    return '/';
  };

  const activeTab = getActiveTab();

  return (
    <header className="relative z-30 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-xs transition-colors duration-200">
      {/* Top Utility Strip — Minimalist & Direct */}
      <div className="bg-surface-subtle text-gray-700 text-xs py-2 px-4 sm:px-8 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile Icon Bar */}
          <div className="flex sm:hidden items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <a 
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-brand shadow-xs motion-safe:active:scale-95 transition-colors"
                title="Call Clinic"
              >
                <PhoneCall className="w-3.5 h-3.5 text-brand" />
                <span className="font-semibold text-gray-800 text-xs">Call</span>
              </a>

              <a 
                href={CLINIC_INFO.whatsappLink} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-emerald-600 shadow-xs motion-safe:active:scale-95 transition-colors"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-gray-800 text-xs">WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="https://maps.google.com/?q=Arura+Acupuncture+Virugambakkam+Chennai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 shadow-xs"
                title="Virugambakkam Clinic Location"
              >
                <MapPin className="w-3.5 h-3.5 text-brand" />
                <span className="font-semibold text-gray-800 text-xs">Location</span>
              </a>

              <span className="text-[11px] font-mono font-medium text-gray-500 px-2 py-1 bg-gray-50 rounded-lg border border-gray-200/60">
                10 AM – 8 PM
              </span>
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

            <div className="flex items-center space-x-4 text-gray-600 text-xs sm:text-sm">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand" />
                <span>Chinmaya Nagar, Virugambakkam, Chennai</span>
              </span>

              <span className="text-gray-300 hidden sm:inline">|</span>

              <span className="text-gray-500 font-medium">Daily 10:00 AM – 8:00 PM</span>
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

          {/* Desktop Navigation with Hairline Liquid Tabs */}
          <nav className="hidden lg:flex items-center justify-center">
            <LiquidTabs
              tabs={navTabs}
              value={activeTab}
              onValueChange={(path) => {
                navigate(path);
              }}
              label="Main navigation"
              size="sm"
              className="bg-slate-100/90 border border-slate-200/90 shadow-[inset_0_1px_2.5px_rgba(0,0,0,0.06)]"
            />
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-brand" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 sm:px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs text-brand font-bold uppercase tracking-wider">
              Navigation Menu
            </span>
            <span className="text-[11px] text-gray-400 font-mono">
              Arura Wellness
            </span>
          </div>

          {/* Clean Vertical Navigation Links */}
          <div className="flex flex-col space-y-1 text-base font-semibold text-gray-800">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.value;
              const is3D = tab.value === '/how-acupuncture-works';
              return (
                <NavLink
                  key={tab.value}
                  to={tab.value}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-brand font-bold bg-brand/10' 
                      : 'text-gray-700 hover:text-brand hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{tab.label}</span>
                    {is3D && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#e02868]/10 text-[#e02868] border border-[#e02868]/20">
                        3D Lab
                      </span>
                    )}
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand" />}
                </NavLink>
              );
            })}
          </div>

          <div className="pt-4 space-y-3 border-t border-gray-100">
            <Link
              to="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-center block bg-brand text-white hover:bg-brand-dark transition-colors shadow-sm cursor-pointer"
            >
              Book Priority Consultation (₹600)
            </Link>
            <a
              href={CLINIC_INFO.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 border border-gray-200 text-gray-800 hover:border-emerald-600 hover:text-emerald-700 transition-colors shadow-xs"
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
