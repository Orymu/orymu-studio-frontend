"use client";

import React from "react";

/**
 * Card 1 "Bisnis Lokal & Layanan":
 * - Dark = Storefront: a flat awning with 3 scallops over a small building body with a door.
 * - Blue = Calendar: rounded rectangle, a header line, two small top tabs, and a small check mark inside.
 */
export function StorefrontGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 5h15" />
      <path d="M2.5 5v2.2a2.5 2.5 0 0 0 5 0V5m0 2.2a2.5 2.5 0 0 0 5 0V5m0 2.2a2.5 2.5 0 0 0 5 0V5" />
      <path d="M3.8 8.8v7.7h12.4V8.8" />
      <path d="M8 16.5v-4h4v4" />
    </svg>
  );
}

export function CalendarGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="14" height="12.5" rx="2" />
      <path d="M6 2.5v3M14 2.5v3" />
      <path d="M3 8.5h14" />
      <path d="M7.5 12.2l2 2 3.5-3.5" />
    </svg>
  );
}

/**
 * Card 2 "Untuk Tim Produk":
 * - Dark = Code brackets: < / > (opening angle bracket, slash, closing angle bracket).
 * - Blue = Layers: 3 stacked rhombus outlines, isometric style.
 */
export function CodeBracketsGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.5 6.5L3 10l3.5 3.5" />
      <path d="M11.5 5.5l-3 9" />
      <path d="M13.5 6.5L17 10l-3.5 3.5" />
    </svg>
  );
}

export function LayersGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="10 3.5 16.2 6.5 10 9.5 3.8 6.5" />
      <path d="M3.8 10.2l6.2 3 6.2-3" />
      <path d="M3.8 13.5l6.2 3 6.2-3" />
    </svg>
  );
}

/**
 * Card 3 "Satu Alur Aksi Terukur":
 * - Dark = Funnel: a wide top ellipse line narrowing to a short stem.
 * - Blue = Bar chart: 3 rising bars on a baseline, with a small arrow tip on the top bar.
 */
export function FunnelGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="10" cy="5.2" rx="6.5" ry="2.2" />
      <path d="M3.5 5.2L8 10.8v5.7h4v-5.7l4.5-5.6" />
    </svg>
  );
}

export function BarChartGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 16.5h14" />
      <line x1="5.5" y1="16.5" x2="5.5" y2="12.5" />
      <line x1="10" y1="16.5" x2="10" y2="8.5" />
      <line x1="14.5" y1="16.5" x2="14.5" y2="4.5" />
      <path d="M12.5 6.5L14.5 4.5 16.5 6.5" />
    </svg>
  );
}

export function MagnifierGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8.5" cy="8.5" r="5" />
      <path d="M12.2 12.2L16.5 16.5" />
    </svg>
  );
}

export function PenNibGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 2.5L4 12.5l2.5 4.5h7l2.5-4.5L10 2.5z" />
      <circle cx="10" cy="11.5" r="1" fill="#ffffff" />
      <path d="M10 2.5v8" />
    </svg>
  );
}

export function RocketGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 3.5c-3-1-7.5 1-9 6l-2 2 3.5 1 1 3.5 2-2c5-1.5 7-6 6-9l-1.5-1.5z" />
      <circle cx="12" cy="7" r="1.25" fill="#ffffff" />
      <path d="M4 16l2-1M3 13l1 2" />
    </svg>
  );
}

export function KeyGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6.5" cy="10" r="3.5" />
      <circle cx="6.5" cy="10" r="1" fill="#ffffff" />
      <path d="M10 10h7v3M14 10v2" />
    </svg>
  );
}
