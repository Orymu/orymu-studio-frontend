"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MotionContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
  stopScroll: () => void;
  startScroll: () => void;
  isReducedMotion: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  lenis: null,
  scrollTo: () => {},
  stopScroll: () => {},
  startScroll: () => {},
  isReducedMotion: false,
});

export function useMotion() {
  return useContext(MotionContext);
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register GSAP plugins on client
    gsap.registerPlugin(ScrollTrigger);

    // Listen for preference changes
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) {
        document.documentElement.classList.add("reduce-motion");
      } else {
        document.documentElement.classList.remove("reduce-motion");
      }
    };
    mql.addEventListener("change", onChange);

    if (mql.matches) {
      document.documentElement.classList.add("reduce-motion");
      return () => {
        mql.removeEventListener("change", onChange);
      };
    }

    // 1. Initialize Lenis (smooth wheel only, anchors enabled)
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      anchors: false, // We handle smooth anchor scroll with custom offset
    });

    lenisRef.current = lenis;
    const instanceTimer = setTimeout(() => {
      setLenisInstance(lenis);
    }, 0);

    // 2. Drive Lenis with GSAP ticker so Lenis and ScrollTrigger share one clock
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 3. Connect Lenis scroll events to ScrollTrigger.update
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    // 4. Refresh ScrollTrigger after fonts and assets are ready
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    // Global in-page anchor click handler to smoothly scroll with navbar offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const dest = document.querySelector(href);
        if (dest) {
          e.preventDefault();
          // Navbar height is 48px + 20px top padding = 68px, plus 16px buffer = 84px offset
          lenis.scrollTo(dest as HTMLElement, {
            offset: -84,
            duration: 1.1,
          });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick, { capture: true });

    // Cleanup on unmount (safe for StrictMode)
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      clearTimeout(timer);
      clearTimeout(instanceTimer);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, options?: Record<string, unknown>) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: typeof target === "number" ? 0 : -84,
        duration: 1.1,
        ...options,
      });
    } else {
      // Fallback if reduced motion or Lenis not running
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: isReducedMotion ? "instant" : "smooth" });
      } else {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (el) {
          el.scrollIntoView({ behavior: isReducedMotion ? "instant" : "smooth" });
        }
      }
    }
  }, [isReducedMotion]);

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const startScroll = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return (
    <MotionContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        stopScroll,
        startScroll,
        isReducedMotion,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}
