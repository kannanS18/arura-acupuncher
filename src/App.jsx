import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import CounsellingPage from './pages/CounsellingPage';

// Lazy-loaded dedicated 3D interactive science lab (code-split from main bundle)
const HowAcupunctureWorksPage = React.lazy(() => import('./pages/HowAcupunctureWorksPage'));

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

function AppLayout({ onOpenBooking, isBookingOpen, onCloseBooking, selectedService, selectedPrice }) {
  const location = useLocation();
  const isLabPage = location.pathname.includes('how-acupuncture-works') || location.pathname.includes('3d-lab');

  return (
    <div className="min-h-screen bg-white text-[#09090b] flex flex-col font-sans selection:bg-[#e02868] selection:text-white relative">
      {/* Navigation Bar strictly showing Home, About Us, Doctor, Clinic, Blog, Booking (hidden on dedicated 3D lab) */}
      {!isLabPage && <Navbar onOpenBooking={onOpenBooking} />}

      {/* Dynamic Multi-Page Router Outlet */}
      <main className="flex-1">
        <PageTransition>
          <Routes>
            {/* The 6 Core Pages strictly requested */}
            <Route path="/" element={<HomePage onOpenBooking={onOpenBooking} />} />
            <Route path="/about" element={<AboutPage onOpenBooking={onOpenBooking} />} />
            <Route path="/doctor" element={<DoctorPage onOpenBooking={onOpenBooking} />} />
            <Route path="/clinic" element={<ClinicPage onOpenBooking={onOpenBooking} />} />
            <Route path="/blog" element={<BlogPage onOpenBooking={onOpenBooking} />} />
            <Route path="/blog/:id" element={<BlogPostPage onOpenBooking={onOpenBooking} />} />
            <Route path="/booking" element={<BookingPage onOpenBooking={onOpenBooking} />} />

            {/* Dedicated Fullscreen 3D Science Lab Experience */}
            <Route 
              path="/how-acupuncture-works" 
              element={
                <React.Suspense fallback={
                  <div className="h-screen w-full flex items-center justify-center bg-white">
                    <div className="flex items-center gap-2 text-sm font-bold text-neutral-600 animate-pulse">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#e02868] animate-ping" />
                      <span>Initializing 3D Clinical Anatomy Lab...</span>
                    </div>
                  </div>
                }>
                  <HowAcupunctureWorksPage onOpenBooking={onOpenBooking} />
                </React.Suspense>
              } 
            />
            <Route path="/counselling" element={<CounsellingPage onOpenBooking={onOpenBooking} />} />
            <Route path="/3d-lab" element={<Navigate to="/how-acupuncture-works" replace />} />
            <Route path="/safety" element={<Navigate to="/clinic" replace />} />
            <Route path="/faqs" element={<Navigate to="/clinic" replace />} />
            <Route path="/contact" element={<Navigate to="/booking" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </main>

      {/* Persistent Minimalist Footer (hidden on dedicated 3D lab) */}
      {!isLabPage && <Footer />}

      {/* Mobile Sticky Booking Bar */}
      {!isLabPage && <MobileStickyBar onOpenBooking={onOpenBooking} />}

      {/* Concierge Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={onCloseBooking}
        preselectedService={selectedService}
        preselectedPrice={selectedPrice}
      />
    </div>
  );
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
    <HashRouter>
      <ScrollToTop />
      <AppLayout
        onOpenBooking={handleOpenBooking}
        isBookingOpen={isBookingOpen}
        onCloseBooking={handleCloseBooking}
        selectedService={selectedService}
        selectedPrice={selectedPrice}
      />
    </HashRouter>
  );
}
