import React from 'react';

/**
 * PageTransition — Instant, Rock-Solid Page Rendering
 * Eliminates blocking exit/enter delays, preventing blank screens or stuck opacity: 0
 * across desktop and mobile devices.
 */
export default function PageTransition({ children }) {
  return (
    <div className="w-full min-h-[85vh]">
      {children}
    </div>
  );
}
