// Hairline UI · searchlight-hero (Acupuncture Theme Edition) · MIT License
// Copyright (c) 2026 Hairline UI · https://hairlineui.com/license#components

"use client";

import * as React from "react";
import { ArrowRight, CalendarCheck, ShieldCheck } from "lucide-react";
import { SEARCHLIGHT_ART } from "./searchlight-art";
import { cover, createSearchlight, onBox, readColor, type Layout, type Rgb, type Searchlight } from "./searchlight-gl";
import { EASE_OUT, INTERACTION_FOCUS, INTERACTION_PRESS, useInteractionReducedMotion } from "./ui-interaction-motion";

export interface SearchlightPoint {
  x: number;
  y: number;
}

export interface SearchlightFind extends SearchlightPoint {
  label: string;
}

export interface SearchlightAction {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface SearchlightHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  primary?: SearchlightAction;
  secondary?: SearchlightAction;
  image?: string;
  alt?: string;
  lamp?: SearchlightPoint;
  lampSize?: number;
  rest?: SearchlightPoint;
  focus?: SearchlightPoint;
  finds?: SearchlightFind[];
  as?: "h1" | "h2";
  className?: string;
}

const DEFAULT_LAMP: SearchlightPoint = { x: 0.74, y: 0.20 };
const DEFAULT_REST: SearchlightPoint = { x: 0.44, y: 0.65 };
const DEFAULT_FOCUS: SearchlightPoint = { x: 0.64, y: 0.52 };
const NO_FINDS: SearchlightFind[] = [];

// Arura Clinical Sanctuary Color Variables
const STAGE: React.CSSProperties = {
  backgroundColor: "#13050c",
  boxShadow: "0 0 0 1px rgba(237, 51, 115, 0.2), 0 24px 60px -12px rgba(15, 3, 10, 0.4)",
  color: "#ffffff",
};

const PRIMARY: React.CSSProperties = {
  backgroundColor: "#ed3373",
  color: "#ffffff",
  boxShadow: "0 4px 18px rgba(237, 51, 115, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
};

const SECONDARY: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(12px)",
  boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.25)",
  color: "#ffffff",
};

const TAG: React.CSSProperties = {
  backgroundColor: "rgba(19, 5, 12, 0.88)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 0 0 1px rgba(237, 51, 115, 0.5), 0 4px 16px rgba(0, 0, 0, 0.35)",
  color: "#ffffff",
};

const SPREAD = 0.28;
const SWEEP = 0.58;
const PERIOD = 12;
const MIN_ANGLE = 0.12 * Math.PI;
const MAX_ANGLE = 1.25 * Math.PI;

function aim(dx: number, dy: number) {
  let a = Math.atan2(dy, dx);
  if (a < 0) a += Math.PI * 2;
  if (a > MAX_ANGLE) a = a > 1.62 * Math.PI ? MIN_ANGLE : MAX_ANGLE;
  return Math.max(MIN_ANGLE, a);
}

const switchOn = (t: number) => (t < 0.12 ? 0 : t < 0.2 ? 0.9 : t < 0.32 ? 0.15 : t < 0.42 ? 1 : t < 0.5 ? 0.35 : Math.min(1, 0.6 + (t - 0.5) * 1.2));

// Arura Sanctuary warm plum/rose grading tones
function themeTones(): [Rgb, Rgb] {
  const deep: Rgb = [0.065, 0.018, 0.038]; // Deep luxury clinic wellness dark
  const tint: Rgb = [0.28, 0.07, 0.15];   // Ambient warm magenta tone
  return [deep, tint];
}

export function SearchlightHero({
  title,
  description,
  eyebrow,
  primary,
  secondary,
  image = SEARCHLIGHT_ART,
  alt = "Clinical acupuncture treatment suite at Arura Wellness Sanctuary, Chennai",
  lamp = DEFAULT_LAMP,
  lampSize = 0.012,
  rest = DEFAULT_REST,
  focus = DEFAULT_FOCUS,
  finds = NO_FINDS,
  as: Heading = "h1",
  className = "",
}: SearchlightHeroProps) {
  const reduced = useInteractionReducedMotion();
  const stageRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const baseRef = React.useRef<HTMLImageElement>(null);
  const fallbackRef = React.useRef<HTMLImageElement>(null);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const wordsRef = React.useRef<(HTMLSpanElement | null)[]>([]);
  const findsRef = React.useRef<(HTMLSpanElement | null)[]>([]);
  const words = React.useMemo(() => title.split(/\s+/).filter(Boolean), [title]);

  React.useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    let disposed = false;
    let light: Searchlight | null = null;
    let raf = 0;
    let visible = false;
    let layout: Layout | null = null;
    let wordPts: [number, number][] = [];
    let findPts: ([number, number] | null)[] = [];
    const litWords: boolean[] = [];
    const seen: number[] = [];

    const restAngle = { value: 0 };
    const beam = { angle: 0, vel: 0, target: 0, pointer: false, lastPointer: 0, start: 0, last: 0, sweep0: 0 };

    const img = new Image();
    img.decoding = "async";
    if (!image.startsWith("data:")) img.crossOrigin = "anonymous";
    img.src = image;

    const measure = () => {
      const box = stage.getBoundingClientRect();
      const w = Math.max(1, box.width);
      const h = Math.max(1, box.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const crop = cover(w, h, img.naturalWidth || 16, img.naturalHeight || 9, [focus.x, focus.y]);
      const lampPx = onBox([lamp.x, lamp.y], crop, w, h);
      const restPx = onBox([rest.x, rest.y], crop, w, h);
      restAngle.value = aim(restPx[0] - lampPx[0], restPx[1] - lampPx[1]);
      const c = copyRef.current?.getBoundingClientRect();
      const copy: Layout["copy"] = c ? [c.left - box.left, c.top - box.top, c.right - box.left, c.bottom - box.top] : [0, 0, 0, 0];
      layout = { width: Math.round(w * dpr), height: Math.round(h * dpr), dpr, crop, lamp: lampPx, lens: Math.max(3, (lampSize / crop[2]) * w), reach: Math.hypot(w, h) * 0.65, copy };
      light?.layout(layout);
      wordPts = wordsRef.current.map((el) => {
        if (!el) return [-1e4, -1e4];
        const r = el.getBoundingClientRect();
        return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top];
      });
      findPts = finds.map((f, i) => {
        const p = onBox([f.x, f.y], crop, w, h);
        const el = findsRef.current[i];
        const inside = p[0] > 16 && p[0] < w - 16 && p[1] > 40 && p[1] < h - 16;
        if (el) {
          el.style.transform = `translate(${p[0].toFixed(1)}px, ${p[1].toFixed(1)}px)`;
          el.style.display = inside ? "" : "none";
        }
        return inside ? p : null;
      });
      const position = `${(crop[0] / (1 - crop[2] || 1)) * 100}% ${(crop[1] / (1 - crop[3] || 1)) * 100}%`;
      if (baseRef.current) baseRef.current.style.objectPosition = position;
      const lit = fallbackRef.current;
      if (lit && !light) {
        const a = restAngle.value;
        const far = Math.hypot(w, h) * 1.2;
        const p1 = [lampPx[0] + Math.cos(a - SPREAD) * far, lampPx[1] + Math.sin(a - SPREAD) * far];
        const p2 = [lampPx[0] + Math.cos(a + SPREAD) * far, lampPx[1] + Math.sin(a + SPREAD) * far];
        lit.style.clipPath = `polygon(${lampPx[0]}px ${lampPx[1]}px, ${p1[0]}px ${p1[1]}px, ${p2[0]}px ${p2[1]}px)`;
        lit.style.objectPosition = position;
      }
    };

    const reveal = (angle: number, now: number) => {
      if (!layout) return;
      const [lx, ly] = layout.lamp;
      const inBeam = (p: [number, number], slack: number) => {
        const a = aim(p[0] - lx, p[1] - ly);
        return Math.abs(a - angle) < SPREAD * slack && Math.hypot(p[0] - lx, p[1] - ly) < layout!.reach * 1.4;
      };
      wordPts.forEach((p, i) => {
        const on = inBeam(p, 1.05);
        if (on !== !!litWords[i]) {
          litWords[i] = on;
          wordsRef.current[i]?.classList.toggle("is-lit", on);
        }
      });
      findPts.forEach((p, i) => {
        if (!p) return;
        const on = inBeam(p, 0.85);
        if (on) seen[i] = now;
        const show = on || now - (seen[i] ?? -1e9) < 1400;
        const el = findsRef.current[i];
        if (el && el.classList.contains("is-found") !== show) el.classList.toggle("is-found", show);
      });
    };

    const frame = (now: number) => {
      raf = 0;
      if (!light || !visible || disposed) return;
      const dt = Math.min(1 / 30, (now - (beam.last || now)) / 1000);
      beam.last = now;
      const t = (now - beam.start) / 1000;
      if (beam.pointer && now - beam.lastPointer > 2500) {
        beam.pointer = false;
        beam.sweep0 = t - (PERIOD / (2 * Math.PI)) * Math.asin(Math.max(-1, Math.min(1, (beam.angle - restAngle.value) / SWEEP)));
      }
      if (!beam.pointer) beam.target = restAngle.value + SWEEP * Math.sin(((t - beam.sweep0) / PERIOD) * Math.PI * 2);
      const omega = beam.pointer ? 7 : 3;
      beam.vel += (omega * omega * (beam.target - beam.angle) - 2 * omega * beam.vel) * dt;
      beam.angle += beam.vel * dt;
      light.draw({ angle: beam.angle, spread: SPREAD, time: t, on: switchOn(t) });
      reveal(beam.angle, now);
      raf = requestAnimationFrame(frame);
    };

    const run = () => {
      if (!raf && visible && light && !reduced) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (disposed) return;
      try {
        light = createSearchlight(canvas, img);
      } catch {
        light = null;
      }
      measure();
      if (!light) {
        stage.dataset.fallback = "";
        reveal(restAngle.value, performance.now());
        return;
      }
      light.colors(...themeTones());
      beam.angle = beam.target = restAngle.value;
      stage.dataset.ready = "";
      if (reduced) {
        light.draw({ angle: restAngle.value, spread: SPREAD, time: 0, on: 1 });
        reveal(restAngle.value, performance.now());
        return;
      }
      beam.start = performance.now();
      run();
    };
    img.decode().then(start, start);

    const ro = new ResizeObserver(() => {
      measure();
      if (reduced && light) light.draw({ angle: restAngle.value, spread: SPREAD, time: 0, on: 1 });
    });
    ro.observe(stage);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      run();
    });
    io.observe(stage);
    document.fonts?.ready.then(() => !disposed && measure());

    const onMove = (e: PointerEvent) => {
      if (reduced || !layout || (e.pointerType === "touch" && e.buttons === 0)) return;
      const box = stage.getBoundingClientRect();
      beam.target = aim(e.clientX - box.left - layout.lamp[0], e.clientY - box.top - layout.lamp[1]);
      beam.pointer = true;
      beam.lastPointer = e.timeStamp;
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerdown", onMove);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerdown", onMove);
      light?.dispose();
      delete stage.dataset.ready;
    };
  }, [image, lamp.x, lamp.y, lampSize, rest.x, rest.y, focus.x, focus.y, finds, reduced]);

  const objectPosition = `${focus.x * 100}% ${focus.y * 100}%`;

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      <div className="@container w-full">
        <div
          ref={stageRef}
          className="group/stage relative isolate grid min-h-[660px] sm:min-h-[580px] lg:min-h-[540px] touch-pan-y overflow-clip rounded-[32px] border border-pink-500/25 shadow-[0_20px_50px_-10px_rgba(20,5,14,0.35)] @[640px]:aspect-[16/10] @[960px]:aspect-[16/9]"
          style={STAGE}
        >
          {/* Background image & WebGL procedural illumination */}
          <div role="img" aria-label={alt} className="absolute inset-0">
            <img 
              ref={baseRef} 
              src={image} 
              alt="" 
              draggable={false} 
              className="absolute inset-0 size-full object-cover" 
              style={{ objectPosition, filter: "brightness(0.35) saturate(0.6)" }} 
            />
            <img 
              ref={fallbackRef} 
              src={image} 
              alt="" 
              draggable={false} 
              className="absolute inset-0 hidden size-full object-cover group-data-[fallback]/stage:block" 
            />
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="absolute inset-0 size-full opacity-0 transition-opacity duration-700 group-data-[ready]/stage:opacity-100"
            />
          </div>

          {/* Acupoint pins & labels found by the light beam */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
            {finds.map((f, i) => (
              <span key={`${f.label}-${i}`} ref={(el) => void (findsRef.current[i] = el)} className="group/find absolute left-0 top-0 [&.is-found]:z-[1]">
                <span
                  className="absolute left-0 top-0 size-3 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full opacity-0 transition-[opacity,scale] duration-300 group-[.is-found]/find:scale-125 group-[.is-found]/find:opacity-100"
                  style={{ boxShadow: "0 0 0 2px #ed3373, 0 0 16px #ed3373, inset 0 0 0 1px #ffffff", backgroundColor: "#ffffff", transitionTimingFunction: EASE_OUT }}
                />
                <span
                  className="absolute bottom-3 left-0 flex -translate-x-1/2 translate-y-1.5 items-center gap-1.5 whitespace-nowrap rounded-full py-1.5 pl-3 pr-3.5 text-[11px] sm:text-[12px] font-bold font-mono leading-4 opacity-0 blur-[3px] transition-[opacity,translate,filter] duration-300 group-[.is-found]/find:translate-y-0 group-[.is-found]/find:opacity-100 group-[.is-found]/find:blur-[0px]"
                  style={{ ...TAG, transitionTimingFunction: EASE_OUT }}
                >
                  <span className="size-2 rounded-full bg-[#ed3373] animate-pulse" />
                  {f.label}
                </span>
              </span>
            ))}
          </div>

          {/* Cohesive Copy Block: Formatted to generously cover the space without awkward gaps */}
          <div 
            ref={copyRef} 
            className="pointer-events-none relative z-[2] flex max-w-[48rem] flex-col items-start gap-5 sm:gap-6 self-start p-6 pt-10 sm:p-12 lg:p-16 sm:self-center"
          >
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-pink-200 tracking-wider uppercase">
                <span aria-hidden="true" className="size-2 rounded-full bg-[#ed3373] animate-pulse" />
                <span>{eyebrow}</span>
              </div>
            )}

            <Heading className="text-balance text-[34px] sm:text-[48px] lg:text-[58px] font-extrabold leading-[1.05] tracking-tight font-display text-white">
              <span className="sr-only">{title}</span>
              <span aria-hidden="true">
                {words.map((w, i) => (
                  <React.Fragment key={i}>
                    <span
                      ref={(el) => void (wordsRef.current[i] = el)}
                      className="transition-colors duration-300 [&.is-lit]:!text-white [&.is-lit]:drop-shadow-[0_0_20px_rgba(237,51,115,0.7)]"
                      style={{ color: reduced ? "#ffffff" : "rgba(255, 255, 255, 0.65)" }}
                    >
                      {w}
                    </span>
                    {i < words.length - 1 ? " " : null}
                  </React.Fragment>
                ))}
              </span>
            </Heading>

            {description && (
              <p className="max-w-[40rem] text-[15px] sm:text-[16.5px] leading-relaxed text-neutral-200/90 font-normal">
                {description}
              </p>
            )}

            {/* Actions: Hairline Pill Buttons */}
            {(primary || secondary) && (
              <div className="pointer-events-auto mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                {primary && (
                  <a 
                    href={primary.href} 
                    onClick={primary.onClick}
                    className={`inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-7 text-[14px] font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${INTERACTION_PRESS} ${INTERACTION_FOCUS}`} 
                    style={PRIMARY}
                  >
                    <CalendarCheck className="w-4 h-4 text-white shrink-0" />
                    <span>{primary.label}</span>
                    <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                  </a>
                )}
                {secondary && (
                  <a 
                    href={secondary.href} 
                    onClick={secondary.onClick}
                    className={`inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full px-6 text-[14px] font-semibold transition-all duration-200 hover:bg-white/20 active:scale-[0.98] ${INTERACTION_PRESS} ${INTERACTION_FOCUS}`} 
                    style={SECONDARY}
                  >
                    <svg className="w-4 h-4 text-emerald-400 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.404z"/>
                    </svg>
                    <span>{secondary.label}</span>
                  </a>
                )}
              </div>
            )}

            {/* Fact Strip with Hairline Dividers */}
            <div className="pt-3 text-xs text-pink-100/70 font-medium flex flex-wrap items-center gap-3 sm:gap-4 border-t border-white/10 w-full">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#ed3373]" />
                <span>100% Single-Use Sterile Needles</span>
              </span>
              <span>•</span>
              <span>10:00 AM – 8:00 PM</span>
              <span>•</span>
              <span>Daily Cap: 50 Patients</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Prior Appointment Only</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
