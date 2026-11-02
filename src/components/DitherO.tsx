"use client";

import React, { useRef, useEffect } from "react";

export const CELL = 7;
export const ASCII_RAMP = " .:-=+*#%@";
export const FPS = 30;

const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

interface DitherOProps {
  mode?: "dither" | "ascii" | "smooth";
  intensity?: number;
  className?: string;
  cellSize?: number;
  color?: "dark" | "light" | string;
}

export default function DitherO({
  mode = "dither",
  intensity = 1.0,
  className = "",
  cellSize,
  color = "dark",
}: DitherOProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // If canvas 2D is unavailable, render nothing

    let animId = 0;
    let lastTime = 0;
    const interval = 1000 / FPS;
    let isVisible = true;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    let cssWidth = 0;
    let cssHeight = 0;
    let cols = 0;
    let rows = 0;
    const effectiveCell = cellSize || CELL;
    let cellW = effectiveCell;
    let cellH = effectiveCell;

    let L_buffer: Float32Array = new Float32Array(0);
    let Z_buffer: Float32Array = new Float32Array(0);

    const updateBuffers = () => {
      const needed = cols * rows;
      if (L_buffer.length !== needed) {
        L_buffer = new Float32Array(needed);
        Z_buffer = new Float32Array(needed);
      }
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      cssWidth = Math.max(10, Math.floor(rect.width));
      cssHeight = Math.max(10, Math.floor(rect.height));

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);

      if (mode === "ascii") {
        cellW = 7.2;
        cellH = 12;
      } else if (mode === "smooth") {
        const s = cellSize || 3;
        cellW = s;
        cellH = s;
      } else {
        cellW = effectiveCell;
        cellH = effectiveCell;
      }

      cols = Math.floor(cssWidth / cellW);
      rows = Math.floor(cssHeight / cellH);
      updateBuffers();
    };

    // Light direction: (-0.5, 0.6, 0.62) normalized
    const lx = -0.5014;
    const ly = 0.6017;
    const lz = 0.6217;

    const renderFrame = (t: number) => {
      if (cols <= 0 || rows <= 0) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      L_buffer.fill(0);
      Z_buffer.fill(0);

      // Torus parameters
      const R = 0.62;
      const r = 0.26;

      // Rotation angles
      let a: number;
      let b: number;
      if (isReducedMotion) {
        a = 0.2;
        b = 0.35;
      } else {
        a = 0.3 * Math.sin(t * 0.5);
        b = 0.55 * Math.sin(t * 0.35);
      }

      const cosA = Math.cos(a);
      const sinA = Math.sin(a);
      const cosB = Math.cos(b);
      const sinB = Math.sin(b);

      const d = 3.2;
      // Outer ring diameter fills about 72% of min(cols, rows)
      const S = (0.72 * Math.min(cols, rows)) / 1.76;

      const halfCols = cols / 2;
      const halfRows = rows / 2;
      const TWO_PI = Math.PI * 2;

      // Sample torus surface parametrically
      for (let theta = 0; theta < TWO_PI; theta += 0.035) {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);
        const tubeOffset = R + r * cosTheta;
        const nz_local = sinTheta;

        for (let phi = 0; phi < TWO_PI; phi += 0.02) {
          const cosPhi = Math.cos(phi);
          const sinPhi = Math.sin(phi);

          // Local point & normal
          const x = tubeOffset * cosPhi;
          const y = tubeOffset * sinPhi;
          const z = r * sinTheta;

          const nx = cosTheta * cosPhi;
          const ny = cosTheta * sinPhi;
          const nz = nz_local;

          // Rotate Ry(b)
          const x1 = x * cosB + z * sinB;
          const y1 = y;
          const z1 = -x * sinB + z * cosB;

          const nx1 = nx * cosB + nz * sinB;
          const ny1 = ny;
          const nz1 = -nx * sinB + nz * cosB;

          // Rotate Rx(a)
          const x_prime = x1;
          const y_prime = y1 * cosA - z1 * sinA;
          const z_prime = y1 * sinA + z1 * cosA;

          const nx_prime = nx1;
          const ny_prime = ny1 * cosA - nz1 * sinA;
          const nz_prime = ny1 * sinA + nz1 * cosA;

          // Perspective
          const ooz = 1 / (d - z_prime);
          const screenX = Math.round(halfCols + S * x_prime * ooz * d);
          const screenY = Math.round(halfRows - S * y_prime * ooz * d);

          if (screenX >= 0 && screenX < cols && screenY >= 0 && screenY < rows) {
            const idx = screenY * cols + screenX;
            if (ooz > Z_buffer[idx]) {
              Z_buffer[idx] = ooz;
              const dot = nx_prime * lx + ny_prime * ly + nz_prime * lz;
              const lum = 0.12 + 0.88 * Math.max(0, dot);
              L_buffer[idx] = lum;
            }
          }
        }
      }

      // Quantize and Draw
      if (mode === "smooth") {
        const c = cellW;
        for (let row = 0; row < rows; row++) {
          const rowOffset = row * cols;
          for (let col = 0; col < cols; col++) {
            const lum = L_buffer[rowOffset + col];
            if (lum <= 0) continue;

            const alpha = Math.min(1, (0.08 + 0.88 * lum) * intensity);
            if (color === "light" || color === "white") {
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            } else if (color === "dark") {
              ctx.fillStyle = `rgba(12, 17, 24, ${alpha})`;
            } else {
              ctx.fillStyle = color;
            }
            ctx.fillRect(col * c, row * c, c + 0.6, c + 0.6);
          }
        }
      } else if (mode === "dither") {
        const c = cellW;
        const dotRadius = c * 0.32;
        const halfCell = c * 0.5;

        for (let row = 0; row < rows; row++) {
          const rowOffset = row * cols;
          const bayerRow = BAYER_8X8[row % 8];

          for (let col = 0; col < cols; col++) {
            const lum = L_buffer[rowOffset + col];
            if (lum <= 0) continue;

            const bayerVal = (bayerRow[col % 8] + 0.5) / 64;
            if (lum > bayerVal) {
              const alpha = Math.min(1, (0.22 + 0.68 * lum) * intensity);
              if (color === "light" || color === "white") {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
              } else if (color === "dark") {
                ctx.fillStyle = `rgba(26, 29, 46, ${alpha})`;
              } else {
                ctx.fillStyle = color;
              }
              ctx.beginPath();
              ctx.arc(col * c + halfCell, row * c + halfCell, dotRadius, 0, TWO_PI);
              ctx.fill();
            }
          }
        }
      } else {
        // ASCII mode
        ctx.font = "11px var(--font-mono, 'Geist Mono', ui-monospace, monospace)";
        const rampLen = ASCII_RAMP.length;

        for (let row = 0; row < rows; row++) {
          const rowOffset = row * cols;
          const bayerRow = BAYER_8X8[row % 8];
          const textY = (row + 1) * cellH - 2;

          for (let col = 0; col < cols; col++) {
            const lum = L_buffer[rowOffset + col];
            if (lum <= 0) continue;

            const bayerVal = (bayerRow[col % 8] + 0.5) / 64;
            const val = (lum + (bayerVal - 0.5) * 0.12) * rampLen;
            const idx = Math.max(0, Math.min(rampLen - 1, Math.floor(val)));
            const char = ASCII_RAMP[idx];

            if (char !== " ") {
              const alpha = Math.min(1, (0.26 + 0.72 * lum) * intensity);
              if (color === "light" || color === "white") {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
              } else if (color === "dark") {
                ctx.fillStyle = `rgba(12, 17, 24, ${alpha})`;
              } else {
                ctx.fillStyle = color;
              }
              ctx.fillText(char, col * cellW, textY);
            }
          }
        }
      }

      ctx.restore();
    };

    handleResize();
    renderFrame(0.1);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
      renderFrame(0.5);
    });
    resizeObserver.observe(container);

    // Animation Loop
    const startTime = performance.now();
    const tick = (now: number) => {
      animId = requestAnimationFrame(tick);

      if (document.hidden || isReducedMotion) return;
      if (!isVisible && container.offsetWidth > 120) return;

      const elapsed = now - lastTime;
      if (elapsed < interval) return;

      lastTime = now - (elapsed % interval);
      const t = (now - startTime) / 1000;
      renderFrame(t);
    };

    if (isReducedMotion) {
      renderFrame(0.5);
    } else {
      animId = requestAnimationFrame(tick);
    }

    // Pause when canvas is outside viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    io.observe(container);

    // Pause when document is hidden
    const handleVisibility = () => {
      if (!document.hidden && isVisible && !isReducedMotion) {
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [mode, intensity, cellSize, color]);

  return (
    <div
      ref={containerRef}
      className={`dither-o-container ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="dither-o-canvas" />
    </div>
  );
}
