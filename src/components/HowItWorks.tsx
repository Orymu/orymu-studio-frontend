"use client";

import React from "react";
import { motion } from "motion/react";
import SectionBar from "./SectionBar";
import Button from "./Button";
import { RouteIcon } from "./SectionIcons";
import { EASE, DURATION, VIEWPORT_SETTINGS } from "@/lib/motion";
import { useMotion } from "./MotionProvider";
import { ProcessCardFigure, type ProcessVariant } from "./figures/process/ProcessFigures";

interface ProcessStep {
  index: string;
  hotkey: string;
  title: string;
  description: string;
  variant: ProcessVariant;
}

const steps: ProcessStep[] = [
  {
    index: "01",
    hotkey: "D",
    title: "Discover",
    description: "Riset kebutuhan pengguna (ICP) dan penetapan metrik bisnis terukur sebelum eksekusi.",
    variant: "discover",
  },
  {
    index: "02",
    hotkey: "S",
    title: "Design",
    description: "User flow terarah, sistem komponen UI modular, dan prototipe interaktif siap uji.",
    variant: "design",
  },
  {
    index: "03",
    hotkey: "B",
    title: "Build",
    description: "Kode modular, bersih, dan scalable dengan Next.js & TypeScript tanpa technical debt.",
    variant: "build",
  },
  {
    index: "04",
    hotkey: "L",
    title: "Launch",
    description: "QA menyeluruh, verifikasi integrasi API, optimasi performa, dan rilis produksi.",
    variant: "launch",
  },
  {
    index: "05",
    hotkey: "I",
    title: "Improve",
    description: "Monitoring stabilitas sistem dan iterasi fitur berkelanjutan berbasis metrik nyata.",
    variant: "improve",
  },
  {
    index: "06",
    hotkey: "K",
    title: "Hak Milik Penuh",
    description: "100% kepemilikan penuh atas source code, desain Figma, dan dokumentasi.",
    variant: "ownership",
  },
];

export default function HowItWorks() {
  const { isReducedMotion } = useMotion();

  return (
    <section className="process-section theme-light" id="how-it-works">
      <div className="content-frame industri-container">
        {/* Section Header Bar */}
        <SectionBar
          label="PROSES KERJA"
          index="02"
          total="05"
          icon={<RouteIcon />}
        />

        {/* Heading Row */}
        <motion.div
          className="process-heading-row"
          initial={isReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_SETTINGS}
          transition={{ duration: DURATION.base, ease: EASE }}
        >
          <div className="process-heading-left">
            <h2 className="process-heading-title">Cara Kami Bekerja</h2>
          </div>
          <div className="process-heading-right">
            <p className="process-heading-subtext">
              Proses yang sederhana &amp; transparan dari ide hingga produk siap rilis.
            </p>
            <div>
              <Button variant="dark" href="#contact">
                Jadwalkan Diskusi
              </Button>
            </div>
          </div>
        </motion.div>

        {/* 3x2 Grid of 6 .card-v2 Cards in reading order */}
        <div className="process-cards-grid">
          {steps.map((step, idx) => (
            <motion.article
              key={step.index}
              className="card-v2 industri-card process-card-v2"
              initial={isReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SETTINGS}
              transition={{ duration: DURATION.base, ease: EASE, delay: idx * 0.08 }}
            >
              {/* Top Row: Title on Left, Index + Hotkey Badge on Right */}
              <div className="industri-card-top">
                <h3 className="industri-card-title">{step.title}</h3>
                <div className="industri-card-meta" aria-hidden="true">
                  <span className="industri-card-index">{step.index}</span>
                  <kbd className="industri-card-kbd">{step.hotkey}</kbd>
                </div>
              </div>

              {/* Center: Interactive Isometric Anatomy Machine */}
              <ProcessCardFigure variant={step.variant} />

              {/* Bottom: Concise Description */}
              <p className="industri-card-desc">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
