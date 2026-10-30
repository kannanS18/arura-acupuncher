import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 🌿 PageTransition — Clean, Butter-Smooth Luxury Route Transition
 * Zero gimmicks, zero audio, perfectly fluid editorial fade and elevation.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const onAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayLocation(location);
      setTransitionStage('fadeIn');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={`w-full min-h-[85vh] transition-all duration-300 ${
        transitionStage === 'fadeIn' ? 'animate-pageFadeIn' : 'animate-pageFadeOut'
      }`}
    >
      {children}
    </div>
  );
}
