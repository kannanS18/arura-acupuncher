// Hairline UI · feature-tabs · MIT License
// Copyright (c) 2026 Hairline UI · https://hairlineui.com/license#components

"use client";

import * as React from "react";

export interface FeatureTab {
  id: string;
  label: string;
  badge?: string;
  content: React.ReactNode;
}

export interface FeatureTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: FeatureTab[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** Move to the next tab every this many ms. Pointing at the tabs pauses it. */
  autoplay?: number;
}

type Leaving = { id: string; dir: number; key: number };

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const THROW = "cubic-bezier(0.34,1.36,0.64,1)";
const MORPH = 420;
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed3373]/40";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(
    subscribeReduced,
    () => (typeof window !== "undefined" ? window.matchMedia(reducedQuery).matches : false),
    () => false
  );

function Pane({
  children,
  dir,
  leaving,
  reduced,
  paneRef,
}: {
  children: React.ReactNode;
  dir: number;
  leaving: boolean;
  reduced: boolean;
  paneRef?: (el: HTMLDivElement | null) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced || dir === 0) return;
    const shift = 24 * dir;
    const animation = leaving
      ? el.animate(
          [
            { opacity: 1, filter: "blur(0px)", transform: "none" },
            { opacity: 0, filter: "blur(4px)", transform: `translateX(${-shift}px)` },
          ],
          { duration: MORPH * 0.55, easing: EASE, fill: "forwards" }
        )
      : el.animate(
          [
            { opacity: 0, filter: "blur(4px)", transform: `translateX(${shift}px)` },
            { opacity: 1, filter: "blur(0px)", transform: "none" },
          ],
          { duration: MORPH, easing: EASE, delay: 50, fill: "backwards" }
        );
    return () => animation.cancel();
  }, [dir, leaving, reduced]);

  return (
    <div
      ref={(el) => {
        ref.current = el;
        paneRef?.(el);
      }}
      aria-hidden={leaving || undefined}
      className={leaving ? "absolute inset-x-0 top-0 pointer-events-none" : "relative w-full"}
    >
      {children}
    </div>
  );
}

export function FeatureTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  autoplay,
  className = "",
  ...props
}: FeatureTabsProps) {
  const reduced = useReducedMotion();
  const id = React.useId();
  const [own, setOwn] = React.useState(defaultValue ?? tabs[0]?.id);
  const active = value ?? own;
  const index = Math.max(0, tabs.findIndex((t) => t.id === active));

  const [leaving, setLeaving] = React.useState<Leaving[]>([]);
  const [dir, setDir] = React.useState(0);
  const [cycle, setCycle] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [line, setLine] = React.useState({ left: 0, width: 0, ready: false });
  const [height, setHeight] = React.useState<number | null>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const paneRef = React.useRef<HTMLDivElement | null>(null);
  const setPane = React.useCallback((el: HTMLDivElement | null) => {
    paneRef.current = el;
  }, []);
  const keyCounter = React.useRef(0);

  const select = (next: number, focus = false) => {
    const tab = tabs[(next + tabs.length) % tabs.length];
    if (!tab) return;
    setCycle((c) => c + 1);
    if (tab.id === active) return;
    const nextIndex = tabs.indexOf(tab);
    setDir(Math.sign(nextIndex - index) || 1);
    setLeaving((l) => [...l, { id: active, dir: Math.sign(nextIndex - index) || 1, key: ++keyCounter.current }]);
    if (value === undefined) setOwn(tab.id);
    onValueChange?.(tab.id);
    if (focus) tabRefs.current[nextIndex]?.focus();
  };

  React.useEffect(() => {
    if (!leaving.length) return;
    const timer = window.setTimeout(() => setLeaving([]), MORPH);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  // The line sits under the chosen tab
  React.useLayoutEffect(() => {
    const measure = () => {
      const tab = tabRefs.current[index];
      if (!tab) return;
      const left = tab.offsetLeft;
      const width = tab.offsetWidth;
      setLine((l) => (l.left === left && l.width === width ? l : { left, width, ready: l.width > 0 }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    tabRefs.current.forEach((t) => t && observer.observe(t));
    return () => observer.disconnect();
  }, [index, tabs]);

  // The panel takes the height of what it's showing
  React.useLayoutEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    const measure = () => setHeight((h) => (h === pane.offsetHeight ? h : pane.offsetHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(pane);
    return () => observer.disconnect();
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    select(moves[e.key], true);
  };

  const playing = Boolean(autoplay) && !reduced && !paused;
  const current = tabs[index];

  return (
    <div
      className={`w-full ${className}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setPaused(false)}
      {...props}
    >
      <div
        role="tablist"
        aria-label="Features"
        onKeyDown={onKeyDown}
        className="relative flex items-center gap-1 sm:gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-neutral-200/90 pb-px"
      >
        {tabs.map((tab, i) => {
          const selected = i === index;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={`cursor-pointer relative shrink-0 whitespace-nowrap px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors duration-200 rounded-t-lg ${FOCUS} ${
                selected ? "text-neutral-950 font-bold" : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                      selected
                        ? "bg-[#ed3373]/10 text-[#ed3373] border border-[#ed3373]/30 font-bold"
                        : "bg-neutral-100 text-neutral-400 border border-neutral-200"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {/* Sliding indicator line */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] bg-[#ed3373] z-10"
          style={{
            width: line.width,
            transform: `translateX(${line.left}px)`,
            transition:
              line.ready && !reduced ? `transform 420ms ${THROW}, width 320ms ${EASE}` : "none",
          }}
        />
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="relative mt-6 overflow-hidden min-h-[340px]"
        style={{
          height: height ?? undefined,
          transition: reduced || height === null ? "none" : `height ${MORPH}ms ${EASE}`,
        }}
      >
        {leaving.map((l) => (
          <Pane key={l.key} dir={l.dir} leaving reduced={reduced}>
            {tabs.find((t) => t.id === l.id)?.content}
          </Pane>
        ))}
        {current && (
          <Pane
            key={current.id}
            dir={leaving.length ? dir : 0}
            leaving={false}
            reduced={reduced}
            paneRef={setPane}
          >
            {current.content}
          </Pane>
        )}
      </div>
    </div>
  );
}
