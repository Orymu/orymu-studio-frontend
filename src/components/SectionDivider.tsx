import React from "react";

export function DividerTicks({ className = "" }: { className?: string }) {
  return (
    <svg
      width="52"
      height="30"
      viewBox="0 0 52 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="0.5"
        y1="0"
        x2="0.5"
        y2="30"
        stroke="var(--divider-tick, rgba(12, 17, 24, 0.14))"
        strokeOpacity="1"
        strokeWidth="1"
      />
      <line
        x1="17.5"
        y1="3.5"
        x2="17.5"
        y2="26.5"
        stroke="var(--divider-tick, rgba(12, 17, 24, 0.14))"
        strokeOpacity="0.9"
        strokeWidth="1"
      />
      <line
        x1="34.5"
        y1="10.5"
        x2="34.5"
        y2="19.5"
        stroke="var(--divider-tick, rgba(12, 17, 24, 0.14))"
        strokeOpacity="0.8"
        strokeWidth="1"
      />
      <line
        x1="51.5"
        y1="12"
        x2="51.5"
        y2="18"
        stroke="var(--divider-tick, rgba(12, 17, 24, 0.14))"
        strokeOpacity="0.65"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`section-divider-band ${className}`.trim()}
      aria-hidden="true"
      role="presentation"
    >
      <div className="content-frame section-divider-inner">
        <DividerTicks className="section-divider-ticks section-divider-ticks--left" />
        <DividerTicks className="section-divider-ticks section-divider-ticks--right" />
      </div>
    </div>
  );
}
