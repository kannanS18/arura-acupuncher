import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition — Butter-Smooth Hardware-Accelerated Route Transitions
 * Perfectly fluid editorial fade and subtle elevation between all 6 pages.
 */
export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full min-h-[85vh]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
