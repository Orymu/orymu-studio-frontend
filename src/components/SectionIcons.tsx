import React from "react";

interface SectionIconProps {
  className?: string;
}

/**
 * 1. FOKUS SOLUSI: Bullseye
 * Solid outer disc with a ring-shaped hole and a solid center dot.
 * Uses fillRule="evenodd" for a real transparent cutout.
 */
export function BullseyeIcon({ className = "" }: SectionIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M 12 2 A 10 10 0 1 0 12 22 A 10 10 0 1 0 12 2 Z M 12 5 A 7 7 0 1 0 12 19 A 7 7 0 1 0 12 5 Z M 12 8.2 A 3.8 3.8 0 1 0 12 15.8 A 3.8 3.8 0 1 0 12 8.2 Z"
      />
    </svg>
  );
}

/**
 * 2. PROSES KERJA: Route
 * Two solid circular nodes (top-right and bottom-left) connected by a thick S-shaped filled path.
 */
export function RouteIcon({ className = "" }: SectionIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <circle cx="17.5" cy="6.5" r="4" />
      <circle cx="6.5" cy="17.5" r="4" />
      <path d="M 5.3 17.5 C 5.3 10.0 16.3 13.0 16.3 6.5 L 18.7 6.5 C 18.7 15.0 7.7 12.0 7.7 17.5 Z" />
    </svg>
  );
}

/**
 * 3. PORTOFOLIO: Grid
 * Four solid rounded squares in 2x2 (each 8x8 with radius 2, gap 3).
 */
export function GridIcon({ className = "" }: SectionIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="8" height="8" rx="2" />
      <rect x="13.5" y="2.5" width="8" height="8" rx="2" />
      <rect x="2.5" y="13.5" width="8" height="8" rx="2" />
      <rect x="13.5" y="13.5" width="8" height="8" rx="2" />
    </svg>
  );
}

/**
 * 4. PAKET INVESTASI: Price Tag
 * Solid tag shape pointed at top right with a real circular hole cutout near the pointed end.
 * Uses fillRule="evenodd" for the hole.
 */
export function PriceTagIcon({ className = "" }: SectionIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M 15.2 2.6 L 19.4 2.6 A 2 2 0 0 1 21.4 4.6 L 21.4 8.8 A 2 2 0 0 1 20.8 10.2 L 11.2 19.8 A 2.4 2.4 0 0 1 7.8 19.8 L 4.2 16.2 A 2.4 2.4 0 0 1 4.2 12.8 L 13.8 3.2 A 2 2 0 0 1 15.2 2.6 Z M 17.2 5.2 A 1.6 1.6 0 1 0 17.2 8.4 A 1.6 1.6 0 1 0 17.2 5.2 Z"
      />
    </svg>
  );
}

/**
 * 5. FAQ: Question Mark Disc
 * Solid circular disc with a question mark "?" glyph cutout as a real transparent hole.
 * Uses fillRule="evenodd" for the cutout.
 */
export function FaqDiscIcon({ className = "" }: SectionIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M 12 2 A 10 10 0 1 0 12 22 A 10 10 0 1 0 12 2 Z M 10.8 12.5 L 13.2 12.5 L 13.2 10.2 C 14.4 9.5 15.3 8.6 15.3 7.2 C 15.3 5.3 13.8 3.8 12.0 3.8 C 10.2 3.8 8.8 5.2 8.7 7.0 L 10.9 7.2 C 11.0 6.2 11.4 5.8 12.0 5.8 C 12.6 5.8 13.1 6.3 13.1 7.1 C 13.1 7.9 12.4 8.5 11.4 9.2 C 11.0 9.5 10.8 10.0 10.8 10.5 Z M 12 14.15 A 1.25 1.25 0 1 0 12 16.65 A 1.25 1.25 0 1 0 12 14.15 Z"
      />
    </svg>
  );
}
