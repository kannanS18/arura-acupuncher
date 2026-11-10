import React, { useEffect, useState, useRef } from 'react';

/**
 * Smooth Animated Counter for clinical metrics
 * Counts up smoothly from 0 to target when visible, with instant fallback
 * so metrics NEVER get stuck at 0 on mobile or desktop.
 */
export default function AnimatedCounter({ end, duration = 600, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Immediate fallback for reduced motion preferences
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      setHasAnimated(true);
      return;
    }

    const startAnimation = () => {
      if (hasAnimated) return;
      setHasAnimated(true);
      let startTime = null;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Crisp ease out cubic
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutProgress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          startAnimation();
        }
      },
      { threshold: 0.05 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Safety fallback: trigger after 250ms so metrics never stay at 0
    const timer = setTimeout(() => {
      startAnimation();
    }, 250);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
