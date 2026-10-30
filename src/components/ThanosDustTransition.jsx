import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';

/**
 * 🌌 Audio Synthesis: Authentic Thanos Finger Snap & Dust Wind Swoosh
 * Built with Web Audio API (Native browser audio, zero external mp3 files)
 */
function playThanosSnapAudio() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // 1. Crisp Snap Pop (Finger snap transient)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(1400, ctx.currentTime);
    snapOsc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

    snapGain.gain.setValueAtTime(0.7, ctx.currentTime);
    snapGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);
    snapOsc.start();
    snapOsc.stop(ctx.currentTime + 0.09);

    // 2. Wind / Ash Dissolve Ethereal Whoosh (Filtered noise)
    const bufferSize = ctx.sampleRate * 1.4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, ctx.currentTime + 0.05);
    filter.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 1.2);
    filter.Q.value = 3.0;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.12);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(ctx.currentTime + 0.04);
    whiteNoise.stop(ctx.currentTime + 1.4);
  } catch (e) {
    // Audio autoplay restrictions or muted
  }
}

/**
 * 🌌 Google Thanos Easter Egg Disintegration Engine
 * 
 * 1. Takes an instant pixel snapshot of the active page.
 * 2. Words from every line and photos break down into thousands of real pixel dust particles
 *    matching the EXACT colors of the words, buttons, and images.
 * 3. Words dissolve line-by-line and letter-by-letter with wind physics blowing to the right.
 * 4. At the 20% mark of the disintegration, the new page begins filling the vacated space beneath.
 * 5. Dust completely disperses in the air, leaving the new page perfectly in place.
 */
export default function ThanosDustTransition({ children }) {
  const location = useLocation();
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  const [currentContent, setCurrentContent] = useState(children);
  const [incomingVisible, setIncomingVisible] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) {
      setCurrentContent(children);
      return;
    }

    const nextContent = children;
    const oldContainer = contentRef.current;
    prevPath.current = location.pathname;

    // Trigger authentic finger snap audio
    playThanosSnapAudio();

    if (!oldContainer) {
      setCurrentContent(nextContent);
      return;
    }

    setIsSnapping(true);
    setIncomingVisible(false);

    // Capture the exact visible DOM snapshot (Word-by-word, photo-by-photo)
    const runGoogleSnapEffect = async () => {
      try {
        const rect = oldContainer.getBoundingClientRect();
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Render current DOM to canvas
        const snapshot = await html2canvas(oldContainer, {
          backgroundColor: null,
          scale: 1,
          logging: false,
          useCORS: true,
          width: rect.width,
          height: Math.min(rect.height, window.innerHeight * 1.5)
        });

        const ctx = canvas.getContext('2d');
        const width = (canvas.width = rect.width);
        const height = (canvas.height = snapshot.height);

        // Get exact pixel data of the words and photos
        const imgData = snapshot.getContext('2d').getImageData(0, 0, width, height);
        const data = imgData.data;

        // Break words and photos into individual dust particles
        const particles = [];
        const step = 6; // Sampling density: thousands of fine ash particles

        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            const index = (y * width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const a = data[index + 3];

            // Only capture non-transparent pixels (text, images, borders, buttons)
            if (a > 30) {
              // Stagger start time based on line and horizontal word order
              // Words dissolve progressively line by line like the Google Easter egg!
              const lineDelay = (y / height) * 0.35 + (x / width) * 0.25;

              particles.push({
                x: x,
                y: y,
                originX: x,
                originY: y,
                size: Math.random() * 2.8 + 1.2,
                color: `rgba(${r},${g},${b},${a / 255})`,
                vx: Math.random() * 5 + 3, // Wind blowing rightwards
                vy: (Math.random() - 0.7) * 4 - 1.5, // Dust floating upwards
                rotation: Math.random() * Math.PI,
                vRot: (Math.random() - 0.5) * 0.15,
                alpha: 1,
                decay: Math.random() * 0.02 + 0.015,
                delay: lineDelay,
                active: false
              });
            }
          }
        }

        // Now swap the react DOM to next content underneath
        setCurrentContent(nextContent);

        let startTime = performance.now();
        const totalDuration = 1100; // ms
        let animId;

        const animate = (now) => {
          const elapsed = (now - startTime) / totalDuration; // 0 to 1
          ctx.clearRect(0, 0, width, height);

          // 20% Mark: Incoming content begins filling the vacated space!
          if (elapsed >= 0.20 && !incomingVisible) {
            setIncomingVisible(true);
          }

          let alive = 0;

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            if (elapsed >= p.delay) {
              p.active = true;
            }

            if (p.active && p.alpha > 0.01) {
              alive++;
              p.x += p.vx;
              p.y += p.vy;
              p.alpha -= p.decay;
              p.rotation += p.vRot;

              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.rotate(p.rotation);
              ctx.globalAlpha = Math.max(0, p.alpha);
              ctx.fillStyle = p.color;

              // Draw fine dust pixel flake
              ctx.beginPath();
              ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
              ctx.fill();
              ctx.restore();
            } else if (!p.active) {
              // Word is still intact, waiting for its wave to disintegrate
              alive++;
              ctx.fillStyle = p.color;
              ctx.fillRect(p.x, p.y, p.size, p.size);
            }
          }

          if (alive > 0 && elapsed < 1.2) {
            animId = requestAnimationFrame(animate);
          } else {
            ctx.clearRect(0, 0, width, height);
            setIsSnapping(false);
            setIncomingVisible(true);
          }
        };

        animId = requestAnimationFrame(animate);

      } catch (err) {
        console.error('Snap fallback:', err);
        setCurrentContent(nextContent);
        setIncomingVisible(true);
        setIsSnapping(false);
      }
    };

    runGoogleSnapEffect();

  }, [location.pathname, children]);

  return (
    <div className="relative w-full min-h-[85vh]">
      {/* Google Thanos Snap Disintegration Canvas: Renders pixel-by-pixel disintegration */}
      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0 w-full pointer-events-none z-50 transition-opacity duration-300 ${
          isSnapping ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Main Page Container */}
      <div
        ref={contentRef}
        className={`w-full transition-all duration-700 ease-out ${
          isSnapping && !incomingVisible
            ? 'opacity-0 scale-[0.985] translate-y-8 filter blur-[6px]'
            : 'opacity-100 scale-100 translate-y-0 filter blur-0 animate-thanosAssemble'
        }`}
      >
        {currentContent}
      </div>
    </div>
  );
}
