"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete?: () => void;
}

let hasPlayedInApp = false;

const seg = (t: number, start: number, span: number) => {
  const u = Math.min(1, Math.max(0, (t - start) / span));
  return 1 - Math.pow(1 - u, 2.4);
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [t, setT] = useState(0);
  const [isLoaded, setIsLoaded] = useState(hasPlayedInApp);
  const [shouldRender, setShouldRender] = useState(!hasPlayedInApp);

  useEffect(() => {
    if (hasPlayedInApp) {
      onComplete?.();
      return;
    }
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      hasPlayedInApp = true;
      const timerId = setTimeout(() => {
        setIsLoaded(true);
        setShouldRender(false);
        onComplete?.();
      }, 0);
      return () => clearTimeout(timerId);
    }

    const startTime = performance.now();
    const duration = 1550; // 1.55s architectural CAD construction

    let rafId = 0;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const nextT = Math.min(1, elapsed / duration);
      setT(nextT);

      if (nextT < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        hasPlayedInApp = true;
        setTimeout(() => {
          setIsLoaded(true);
          onComplete?.();
          setTimeout(() => {
            setShouldRender(false);
          }, 480);
        }, 180);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  if (!shouldRender) return null;

  const progress = Math.min(100, Math.floor((1 - Math.pow(1 - t, 2.0)) * 100));

  // Staggered CAD drawing progress (0 -> 1)
  const pNav = seg(t, 0.0, 0.34);
  const pStatus = seg(t, 0.14, 0.32);
  const pHero = seg(t, 0.24, 0.36);
  const pBody = seg(t, 0.36, 0.32);
  const pBtns = seg(t, 0.46, 0.32);
  const pPlates = seg(t, 0.54, 0.34);
  const pCross = seg(t, 0.70, 0.26);

  const dash = (p: number): React.CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: 1 - p,
    opacity: p > 0.01 ? 1 : 0,
  });

  const fade = (p: number): React.CSSProperties => ({
    opacity: p,
  });

  return (
    <AnimatePresence presenceAffectsLayout={false}>
      {!isLoaded && (
        <motion.div
          key="preloader"
          className="preloader-overlay preloader-blueprint"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          aria-live="polite"
          aria-label="Memuat Orymu Studio"
        >
          {/* Desktop Architectural CAD Wireframe Layout (>= 768px) */}
          <div className="bp-stage bp-stage--desktop">
            <svg
              className="bp-svg"
              viewBox="0 0 1200 720"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g>
                <rect pathLength={1} style={dash(pNav)} className="bp-stroke bp-dim" x="40" y="24" width="1120" height="58" rx="4" />
                <rect pathLength={1} style={dash(pNav)} className="bp-stroke bp-main" x="56" y="34" width="38" height="38" rx="19" />
                <text style={fade(pNav)} className="bp-label" x="64" y="20">00</text>
                {[454, 506, 558, 610, 662].map((nx) => (
                  <rect key={nx} pathLength={1} style={dash(pNav)} className="bp-stroke" x={nx} y="35" width="44" height="36" rx="18" />
                ))}
                <text style={fade(pNav)} className="bp-label" x="456" y="20">NAV · 01..05</text>
                <rect pathLength={1} style={dash(pNav)} className="bp-stroke bp-main" x="984" y="34" width="160" height="38" rx="8" />
                <text style={fade(pNav)} className="bp-label" x="986" y="20">CTA</text>
              </g>

              <g>
                <rect pathLength={1} style={dash(pStatus)} className="bp-stroke" x="518" y="128" width="164" height="24" rx="12" />
                <text style={fade(pStatus)} className="bp-label" x="540" y="144">STATUS · READY</text>
                <line pathLength={1} style={dash(pStatus)} className="bp-stroke bp-faint" x1="120" y1="168" x2="1080" y2="168" />
                <line pathLength={1} style={dash(pStatus)} className="bp-stroke bp-faint" x1="120" y1="163" x2="120" y2="173" />
                <line pathLength={1} style={dash(pStatus)} className="bp-stroke bp-faint" x1="1080" y1="163" x2="1080" y2="173" />
                <text style={fade(pStatus)} className="bp-label" x="582" y="182">W 960</text>
              </g>

              <g>
                <rect pathLength={1} style={dash(pHero)} className="bp-stroke bp-main" x="120" y="196" width="960" height="108" rx="2" />
                <text style={fade(pHero)} className="bp-label" x="124" y="190">FRAME 960 × 108 · HEADLINE</text>
                <path
                  pathLength={1}
                  style={dash(pHero)}
                  className="bp-stroke bp-faint"
                  d="M114 196h12M120 190v12 M1074 196h12M1080 190v12 M114 304h12M120 298v12 M1074 304h12M1080 298v12"
                />
              </g>

              <g>
                <rect pathLength={1} style={dash(pBody)} className="bp-stroke" x="300" y="324" width="600" height="44" rx="2" />
                <text style={fade(pBody)} className="bp-label" x="304" y="318">BODY · 48 / 48</text>
              </g>

              <g>
                <rect pathLength={1} style={dash(pBtns)} className="bp-stroke bp-main" x="424" y="392" width="170" height="44" rx="10" />
                <text style={fade(pBtns)} className="bp-label" x="434" y="386">BTN 01</text>
                <rect pathLength={1} style={dash(pBtns)} className="bp-stroke" x="606" y="392" width="170" height="44" rx="10" />
                <text style={fade(pBtns)} className="bp-label" x="616" y="386">BTN 02</text>
              </g>

              <g>
                {[
                  { x: 40, label: "PLATE 01 · TOUCH RIG" },
                  { x: 422, label: "PLATE 02 · SPRING RIG" },
                  { x: 804, label: "PLATE 03 · METRIC RIG" },
                ].map((plate) => (
                  <g key={plate.x}>
                    <rect pathLength={1} style={dash(pPlates)} className="bp-stroke bp-main" x={plate.x} y="472" width="356" height="224" rx="8" />
                    <line pathLength={1} style={dash(pCross)} className="bp-stroke bp-cross" x1={plate.x} y1="472" x2={plate.x + 356} y2="696" />
                    <line pathLength={1} style={dash(pCross)} className="bp-stroke bp-cross" x1={plate.x + 356} y1="472" x2={plate.x} y2="696" />
                    <text style={fade(pPlates)} className="bp-label" x={plate.x + 8} y="465">{plate.label}</text>
                  </g>
                ))}
              </g>
            </svg>
          </div>

          {/* Mobile Portrait CAD Wireframe Layout (< 768px) */}
          <div className="bp-stage bp-stage--mobile">
            <svg
              className="bp-svg"
              viewBox="0 0 390 760"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Mobile Navbar: 40px Logo Circle + 5-dot Center Dock + 40px CTA Circle */}
              <g>
                <rect pathLength={1} style={dash(pNav)} className="bp-stroke bp-dim" x="16" y="18" width="358" height="52" rx="8" />
                <rect pathLength={1} style={dash(pNav)} className="bp-stroke bp-main" x="24" y="26" width="36" height="36" rx="18" />
                {[109, 144, 179, 214, 249].map((nx) => (
                  <rect key={nx} pathLength={1} style={dash(pNav)} className="bp-stroke" x={nx} y="27" width="32" height="34" rx="16" />
                ))}
                <rect pathLength={1} style={dash(pNav)} className="bp-stroke bp-main" x="330" y="26" width="36" height="36" rx="18" />
              </g>

              {/* Status Pill & Dimension Line */}
              <g>
                <rect pathLength={1} style={dash(pStatus)} className="bp-stroke" x="95" y="96" width="200" height="26" rx="13" />
                <text style={fade(pStatus)} className="bp-label" x="148" y="113">STATUS · READY</text>
                <text style={fade(pStatus)} className="bp-label" x="178" y="137">W 342</text>
                <line pathLength={1} style={dash(pStatus)} className="bp-stroke bp-faint" x1="24" y1="143" x2="366" y2="143" />
              </g>

              {/* Mobile Hero Headline Frame */}
              <g>
                <rect pathLength={1} style={dash(pHero)} className="bp-stroke bp-main" x="24" y="172" width="342" height="110" rx="4" />
                <text style={fade(pHero)} className="bp-label" x="28" y="166">FRAME 342 × 110 · HEADLINE</text>
              </g>

              {/* Mobile Hero Body */}
              <g>
                <rect pathLength={1} style={dash(pBody)} className="bp-stroke" x="38" y="302" width="314" height="62" rx="4" />
                <text style={fade(pBody)} className="bp-label" x="42" y="296">BODY · 36 / 36</text>
              </g>

              {/* Stacked Mobile CTA Buttons */}
              <g>
                <rect pathLength={1} style={dash(pBtns)} className="bp-stroke bp-main" x="85" y="386" width="220" height="42" rx="10" />
                <text style={fade(pBtns)} className="bp-label" x="93" y="380">BTN 01</text>
                <rect pathLength={1} style={dash(pBtns)} className="bp-stroke" x="85" y="440" width="220" height="42" rx="10" />
                <text style={fade(pBtns)} className="bp-label" x="93" y="434">BTN 02</text>
              </g>

              {/* Stacked Mobile Card Plates */}
              <g>
                <rect pathLength={1} style={dash(pPlates)} className="bp-stroke bp-main" x="24" y="512" width="342" height="214" rx="10" />
                <line pathLength={1} style={dash(pCross)} className="bp-stroke bp-cross" x1="24" y1="512" x2="366" y2="726" />
                <line pathLength={1} style={dash(pCross)} className="bp-stroke bp-cross" x1="366" y1="512" x2="24" y2="726" />
                <text style={fade(pPlates)} className="bp-label" x="32" y="505">PLATE 01 · MOBILE</text>
              </g>
            </svg>
          </div>

          {/* Bottom-Left Progress Indicator (without WIREFRAME & GRID 48PX labels) */}
          <div className="bp-footer-bar" aria-hidden="true">
            <span className="bp-pill">{progress.toString().padStart(3, " ")}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
