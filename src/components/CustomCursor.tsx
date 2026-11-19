"use client";

import React, { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "view" | "pointer";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let rafId = 0;
    let last = 0;
    let currentMode: CursorMode = "default";
    let isVisible = false;

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (calm) {
        pos.x = target.x;
        pos.y = target.y;
      } else {
        const k = 1 - Math.exp(-dt / 0.055);
        pos.x += (target.x - pos.x) * k;
        pos.y += (target.y - pos.y) * k;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      }

      if (Math.abs(target.x - pos.x) > 0.15 || Math.abs(target.y - pos.y) > 0.15) {
        rafId = requestAnimationFrame(tick);
      } else {
        pos.x = target.x;
        pos.y = target.y;
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
        }
        rafId = 0;
      }
    };

    const kick = () => {
      if (!rafId) {
        last = 0;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!isVisible) {
        isVisible = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
        setVisible(true);
      }
      target.x = e.clientX;
      target.y = e.clientY;
      kick();

      const el = e.target as HTMLElement | null;
      let nextMode: CursorMode = "default";
      if (el?.closest(".work-card, [data-cursor='view']")) {
        nextMode = "view";
      } else if (el?.closest("a, button, [role='button'], [role='slider'], input, select")) {
        nextMode = "pointer";
      }

      if (nextMode !== currentMode) {
        currentMode = nextMode;
        setMode(nextMode);
      }
    };

    const onLeave = () => {
      isVisible = false;
      setVisible(false);
    };

    const onEnter = () => {
      isVisible = true;
      setVisible(true);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`orymu-cursor is-${mode} ${visible ? "is-visible" : ""}`}
      aria-hidden="true"
    >
      <span className="orymu-cursor__inner">
        {mode === "view" && (
          <span className="orymu-cursor__view">
            <span>VIEW</span>
            <span className="orymu-cursor__badge" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 8.5L8.5 3.5M4.5 3.5h4v4" />
              </svg>
            </span>
          </span>
        )}
      </span>
    </div>
  );
}
