import React from "react";

export interface OrymuMarkProps {
  size?: number;
  variant?: "dots" | "ring";
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

export default function OrymuMark({
  size = 36,
  variant,
  className,
  "aria-hidden": ariaHidden = true,
}: OrymuMarkProps) {
  // Use variant "ring" automatically when rendered size is below 28px, and "dots" otherwise
  const effectiveVariant = variant ?? (size < 28 ? "ring" : "dots");

  // Generate 12 dots at 30-degree increments starting from top (0 deg) and moving clockwise
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30; // 0, 30, 60, ... 330 deg
    const rad = (angle * Math.PI) / 180;
    const cx = 16 + 9 * Math.sin(rad);
    const cy = 16 - 9 * Math.cos(rad);

    // Shading as if lit from top left (315 degrees):
    // t = (1 + cos(angle - 315 deg)) / 2
    const diffRad = ((angle - 315) * Math.PI) / 180;
    const t = (1 + Math.cos(diffRad)) / 2;
    const r = 1.2 + 0.9 * t; // 1.2 to 2.1 units
    const opacity = 0.55 + 0.45 * t; // 0.55 to 1.0

    return { angle, cx, cy, r, opacity };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Navy background circle */}
      <circle cx="16" cy="16" r="16" fill="var(--navy-900, #050c2e)" />

      {/* Render dots or ring */}
      {effectiveVariant === "dots" ? (
        dots.map(({ angle, cx, cy, r, opacity }) => (
          <circle
            key={angle}
            cx={cx.toFixed(3)}
            cy={cy.toFixed(3)}
            r={r.toFixed(3)}
            fill="#ffffff"
            opacity={opacity.toFixed(3)}
          />
        ))
      ) : (
        <circle cx="16" cy="16" r="9" fill="none" stroke="#ffffff" strokeWidth="3.2" />
      )}
    </svg>
  );
}
