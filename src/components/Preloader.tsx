"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete?: () => void;
}

const SPINNER_FRAMES = ["|", "/", "-", "\\"];
const TOTAL_BAR_CHARS = 24;

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [spinnerIndex, setSpinnerIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      const timerId = setTimeout(() => {
        setIsLoaded(true);
        setShouldRender(false);
        onComplete?.();
      }, 0);
      return () => clearTimeout(timerId);
    }

    const startTime = Date.now();
    const duration = 1000; // 1.0s smooth load time

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / duration);
      // Smooth cubic ease-out
      const eased = 1 - Math.pow(1 - t, 2.2);
      const rawProgress = Math.min(100, Math.floor(eased * 100));

      setProgress(rawProgress);
      setSpinnerIndex(Math.floor(elapsed / 80) % SPINNER_FRAMES.length);

      if (t >= 1) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          onComplete?.();
          setTimeout(() => {
            setShouldRender(false);
          }, 500);
        }, 120);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!shouldRender) return null;

  // Build pure ASCII progress bar: [===================>           ]
  const filledCount = Math.round((progress / 100) * TOTAL_BAR_CHARS);
  const filledChars =
    filledCount > 0
      ? "=".repeat(Math.max(0, filledCount - 1)) + (filledCount < TOTAL_BAR_CHARS ? ">" : "=")
      : "";
  const emptyChars = " ".repeat(Math.max(0, TOTAL_BAR_CHARS - filledChars.length));

  return (
    <AnimatePresence presenceAffectsLayout={false}>
      {!isLoaded && (
        <motion.div
          key="preloader"
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          aria-live="polite"
          aria-label="Memuat Orymu Studio"
        >
          <div className="preloader-container preloader-container--ascii-only">
            {/* ASCII Brand & Live Spinner */}
            <div className="preloader-ascii-header">
              <span className="preloader-ascii-brand">ORYMU STUDIO</span>
              <span className="preloader-ascii-spinner" aria-hidden="true">
                {SPINNER_FRAMES[spinnerIndex]}
              </span>
            </div>

            {/* Pure ASCII Progress Bar */}
            <div className="preloader-ascii-bar" aria-hidden="true">
              <span className="preloader-bracket">[</span>
              <span className="preloader-bar-text">
                {filledChars}
                {emptyChars}
              </span>
              <span className="preloader-bracket">]</span>
              <span className="preloader-ascii-num">
                {progress.toString().padStart(3, " ")}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
