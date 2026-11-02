/**
 * Shared motion design constants for Orymu Studio.
 * No magic numbers elsewhere.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_STRING = "cubic-bezier(0.22, 1, 0.36, 1)";

export const DURATION = {
  fast: 0.25,
  base: 0.6,
  slow: 0.9,
} as const;

export const REVEAL_DISTANCE = 24;
export const STAGGER = 0.08;

export const VIEWPORT_SETTINGS = {
  once: true,
  amount: 0.25,
} as const;

export const SPRING_KEYCAP = {
  type: "spring",
  stiffness: 300,
  damping: 20,
} as const;

export const SPRING_NAV = {
  type: "spring",
  stiffness: 400,
  damping: 34,
} as const;
