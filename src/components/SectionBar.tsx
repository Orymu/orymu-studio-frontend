"use client";

import React from "react";
import { motion } from "motion/react";
import { EASE, DURATION, VIEWPORT_SETTINGS } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

interface SectionBarProps {
  label?: string;
  index?: string; // e.g. "01"
  total?: string; // defaults to "05"
  counterCustom?: React.ReactNode;
  leftCustom?: React.ReactNode;
  inverted?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export default function SectionBar({
  label,
  index = "01",
  total = "05",
  counterCustom,
  leftCustom,
  inverted = false,
  icon,
  className = "",
}: SectionBarProps) {
  const { isReducedMotion } = useMotion();

  return (
    <div
      className={`section-bar ${inverted ? "section-bar--dark" : "section-bar--light"} ${className}`}
    >
      <div className="section-bar__left">
        {leftCustom ? (
          leftCustom
        ) : (
          <>
            {icon && (
              <motion.span
                className="section-bar__icon"
                initial={isReducedMotion ? false : { opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT_SETTINGS}
                transition={{ duration: DURATION.base, ease: EASE }}
              >
                {icon}
              </motion.span>
            )}
            {label && <span className="section-bar__label">{label}</span>}
          </>
        )}
      </div>

      <div className="section-bar__right">
        {counterCustom ? (
          <motion.span
            className="section-bar__counter"
            initial={isReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_SETTINGS}
            transition={{ duration: DURATION.base, ease: EASE, delay: 0.1 }}
          >
            {counterCustom}
          </motion.span>
        ) : (
          <motion.span
            className="section-bar__counter"
            initial={isReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_SETTINGS}
            transition={{ duration: DURATION.base, ease: EASE, delay: 0.1 }}
          >
            <span className="section-bar__current">{index}</span>
            <span className="section-bar__sep"> | </span>
            <span className="section-bar__total">{total}</span>
          </motion.span>
        )}
      </div>

      <motion.div
        className="section-bar__hairline"
        initial={isReducedMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_SETTINGS}
        transition={{ duration: DURATION.slow, ease: EASE }}
        style={{ originX: 0 }}
        aria-hidden="true"
      />
    </div>
  );
}
