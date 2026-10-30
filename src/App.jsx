import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import BookingModal from './components/BookingModal';
import PageTransition from './components/PageTransition';

// Strictly the 6 Dedicated Pages requested by user
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DoctorPage from './pages/DoctorPage';
import ClinicPage from './pages/ClinicPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import BookingPage from './pages/BookingPage';

/**
 * Scroll to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleOpenBooking = (service = '', price = null) => {
    setSelectedService(service);
    setSelectedPrice(price);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Pink (#e02868) text selection highlight as strictly requested */}
      <div className="min-h-screen bg-white text-[#09090b] flex flex-col font-sans selection:bg-[#e02868] selection:text-white relative">
        
        {/* Navigation Bar strictly showing Home, About Us, Doctor, Clinic, Blog, Booking */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Dynamic Multi-Page Router Outlet */}
        <main className="flex-1">
          <PageTransition>
            <Routes>
              {/* The 6 Core Pages strictly requested */}
              <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />
              <Route path="/about" element={<AboutPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/doctor" element={<DoctorPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/clinic" element={<ClinicPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/blog" element={<BlogPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/blog/:id" element={<BlogPostPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/booking" element={<BookingPage onOpenBooking={handleOpenBooking} />} />

              {/* Seamless redirects for legacy paths to consolidated pages */}
              <Route path="/therapist" element={<Navigate to="/doctor" replace />} />
              <Route path="/pricing" element={<Navigate to="/clinic" replace />} />
              <Route path="/acupuncture" element={<Navigate to="/clinic" replace />} />
              <Route path="/disorders" element={<Navigate to="/about" replace />} />
              <Route path="/counselling" element={<Navigate to="/clinic" replace />} />
              <Route path="/safety" element={<Navigate to="/clinic" replace />} />
              <Route path="/faqs" element={<Navigate to="/clinic" replace />} />
              <Route path="/contact" element={<Navigate to="/booking" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
        </main>

        {/* Persistent Minimalist Footer */}
        <Footer />

        {/* Mobile Sticky Booking Bar */}
        <MobileStickyBar onOpenBooking={handleOpenBooking} />

        {/* Concierge Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          preselectedService={selectedService}
          preselectedPrice={selectedPrice}
        />

      </div>
    </BrowserRouter>
  );
}
