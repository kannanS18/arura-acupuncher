import React from 'react';
import { Instagram, MessageCircle, Phone, ArrowUp, MapPin, Clock, CalendarCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink text-white pt-20 pb-28 lg:pb-16 border-t border-gray-900 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-gray-800">
          
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-white shadow-sm inline-block">
                <img src={getAssetUrl('logo.png')} alt="Arura Wellness Studio" className="h-10 w-auto object-contain" />
              </div>
            </Link>
            
            <p className="text-base text-gray-300 max-w-md leading-relaxed font-normal">
              Arura Wellness Studio is Chennai’s trusted <strong className="text-white font-semibold">acupuncture centre</strong> for classical 14-meridian acupuncture treatment and certified psychological counselling. Led by Dr. Nivedha Priyadharshini, MD (Acu).
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a 
                href={CLINIC_INFO.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center border border-white/10 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={CLINIC_INFO.whatsappLink} 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center border border-white/10 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href={`tel:${CLINIC_INFO.phone}`} 
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center border border-white/10 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4 text-sm">
            <strong className="text-lg font-bold text-white block font-display tracking-wide">
              Studio Directory
            </strong>
            <ul className="space-y-3 text-sm text-gray-300 font-normal">
              <li><Link to="/" className="hover:text-brand transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand transition-colors">About Us</Link></li>
              <li><Link to="/doctor" className="hover:text-brand transition-colors">Doctor (Dr. Nivedha)</Link></li>
              <li><Link to="/clinic" className="hover:text-brand transition-colors">Clinic and Tariff Schedule</Link></li>
              <li><Link to="/counselling" className="hover:text-brand transition-colors">Counselling Centre (15 Modalities)</Link></li>
              <li><Link to="/blog" className="hover:text-brand transition-colors">Clinical Blog</Link></li>
              <li><Link to="/booking" className="hover:text-brand transition-colors">Book Priority Consultation</Link></li>
            </ul>
          </div>

          {/* Clinic Timings & Location (4 Cols) */}
          <div className="lg:col-span-4 space-y-4 text-sm">
            <strong className="text-lg font-bold text-white block font-display tracking-wide">
              Clinical Sanctuary
            </strong>
            <div className="space-y-3 text-gray-300 font-normal text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Monday to Sunday: 10:00 AM to 8:00 PM</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CalendarCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-400 font-semibold">Strictly by Prior Appointment</span>
              </div>
            </div>
          </div>

        </div>

        {/* Structured SEO Clinical Keyword Directory & Local SEO Chennai Index */}
        <div className="py-12 border-b border-gray-800/80 space-y-8 text-sm text-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1: Primary Services */}
            <div className="space-y-3">
              <strong className="text-white text-sm uppercase tracking-wider block font-mono font-bold">
                Acupuncture Treatment & Care
              </strong>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/clinic" className="hover:text-brand transition-colors">Acupuncture Treatment</Link></li>
                <li><Link to="/clinic" className="hover:text-brand transition-colors">Acupuncture Therapy (₹600)</Link></li>
                <li><Link to="/about" className="hover:text-brand transition-colors">Traditional Acupuncture Treatment</Link></li>
                <li><Link to="/about" className="hover:text-brand transition-colors">Holistic Acupuncture Therapy</Link></li>
                <li><Link to="/doctor" className="hover:text-brand transition-colors">Acupuncture Specialist</Link></li>
                <li><Link to="/doctor" className="hover:text-brand transition-colors">Best Acupuncture Doctor</Link></li>
                <li><Link to="/booking" className="hover:text-brand transition-colors">Acupuncture Treatment Near Me</Link></li>
              </ul>
            </div>

            {/* Column 2: Pain Relief & Orthopedic Clusters */}
            <div className="space-y-3">
              <strong className="text-white text-sm uppercase tracking-wider block font-mono font-bold">
                Pain Relief & Spine
              </strong>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/how-acupuncture-works" className="hover:text-brand transition-colors">Acupuncture for Pain Relief</Link></li>
                <li><Link to="/how-acupuncture-works" className="hover:text-brand transition-colors">Acupuncture for Back Pain</Link></li>
                <li><Link to="/how-acupuncture-works" className="hover:text-brand transition-colors">Acupuncture for Neck Pain</Link></li>
                <li><Link to="/how-acupuncture-works" className="hover:text-brand transition-colors">Acupuncture for Sciatica</Link></li>
                <li><Link to="/how-acupuncture-works" className="hover:text-brand transition-colors">Acupuncture for Knee Pain</Link></li>
                <li><Link to="/how-acupuncture-works" className="hover:text-brand transition-colors">Acupuncture for Shoulder Pain</Link></li>
                <li><Link to="/how-acupuncture-works" className="hover:text-brand transition-colors">Acupuncture for Joint Pain</Link></li>
              </ul>
            </div>

            {/* Column 3: Neurological & Women's Health Clusters */}
            <div className="space-y-3">
              <strong className="text-white text-sm uppercase tracking-wider block font-mono font-bold">
                Neurology & Women's Health
              </strong>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/how-acupuncture-works" className="hover:text-brand transition-colors">Acupuncture for Migraine</Link></li>
                <li><Link to="/how-acupuncture-works" className="hover:text-brand transition-colors">Acupuncture for Headaches</Link></li>
                <li><Link to="/how-acupuncture-works" className="hover:text-brand transition-colors">Acupuncture for Nerve Pain</Link></li>
                <li><Link to="/clinic" className="hover:text-brand transition-colors">Acupuncture for Women's Health</Link></li>
                <li><Link to="/clinic" className="hover:text-brand transition-colors">Acupuncture for PCOS</Link></li>
                <li><Link to="/clinic" className="hover:text-brand transition-colors">Acupuncture for Menstrual Pain</Link></li>
                <li><Link to="/counselling" className="hover:text-brand transition-colors">Acupuncture for Stress Relief & Anxiety</Link></li>
              </ul>
            </div>

            {/* Column 4: Local SEO Chennai */}
            <div className="space-y-3">
              <strong className="text-white text-sm uppercase tracking-wider block font-mono font-bold">
                Chennai Local Sanctuary
              </strong>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/clinic" className="hover:text-brand transition-colors">Acupuncture Treatment in Chennai</Link></li>
                <li><Link to="/clinic" className="hover:text-brand transition-colors">Best Acupuncture Clinic in Chennai</Link></li>
                <li><Link to="/doctor" className="hover:text-brand transition-colors">Acupuncture Specialist in Chennai</Link></li>
                <li><Link to="/booking" className="hover:text-brand transition-colors">Acupuncture Centre in Chennai</Link></li>
                <li><Link to="/doctor" className="hover:text-brand transition-colors">Acupuncture Doctor in Chennai</Link></li>
                <li><Link to="/clinic" className="hover:text-brand transition-colors">Affordable Acupuncture Treatment in Chennai</Link></li>
                <li><span className="text-neutral-400 text-xs">Virugambakkam • Chinmaya Nagar • Vadapalani • Koyambedu • Anna Nagar</span></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 gap-4">
          <p>© 2026 Arura Acupuncture & Counselling Centre. Virugambakkam, Chennai 600092.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-gray-300 transition-colors">100% Single-Use Sterile Needles</span>
            <span className="hover:text-gray-300 transition-colors">Cambridge-Certified Counselling</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-brand text-gray-400 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-safe:active:scale-95 disabled:opacity-50"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
