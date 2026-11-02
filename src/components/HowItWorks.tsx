"use client";

import React from "react";
import { motion } from "motion/react";
import SectionBar from "./SectionBar";
import Button from "./Button";
import { RouteIcon } from "./SectionIcons";
import {
  MagnifierGlyph,
  PenNibGlyph,
  CodeBracketsGlyph,
  RocketGlyph,
  BarChartGlyph,
  KeyGlyph,
} from "./KeycapGlyphs";
import { EASE, DURATION, VIEWPORT_SETTINGS } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

interface ProcessStep {
  index: string;
  title: string;
  description: string;
  glyph: React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    index: "(001)",
    title: "Discover",
    description:
      "Definisi tujuan bisnis, riset kebutuhan pengguna (ICP), dan penetapan metrik sukses terukur sebelum masuk tahap eksekusi.",
    glyph: <MagnifierGlyph />,
  },
  {
    index: "(002)",
    title: "Design",
    description:
      "Penerjemahan insight menjadi user flow terarah, sistem desain komponen UI modular, serta prototipe interaktif siap uji.",
    glyph: <PenNibGlyph />,
  },
  {
    index: "(003)",
    title: "Build",
    description:
      "Implementasi kode modular, bersih, dan scalable dengan Next.js & TypeScript tanpa template lambat atau technical debt.",
    glyph: <CodeBracketsGlyph />,
  },
  {
    index: "(004)",
    title: "Launch",
    description:
      "Quality assurance menyeluruh, verifikasi form booking dan integrasi API, optimasi performa, serta kesiapan rilis produksi.",
    glyph: <RocketGlyph />,
  },
  {
    index: "(005)",
    title: "Improve",
    description:
      "Monitoring stabilitas, reliabilitas sistem, dan iterasi fitur berkelanjutan berbasis metrik nyata dan feedback pengguna.",
    glyph: <BarChartGlyph />,
  },
  {
    index: "(006)",
    title: "Hak Milik Penuh",
    description:
      "100% kepemilikan penuh atas seluruh source code, desain Figma, dokumentasi, dan hak cipta tanpa keterikatan lisensi tersembunyi.",
    glyph: <KeyGlyph />,
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
              className="card-v2 process-card-v2"
              initial={isReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SETTINGS}
              transition={{ duration: DURATION.base, ease: EASE, delay: idx * 0.08 }}
            >
              <div className="process-card-header">
                <div className="keycap keycap--dark keycap--44" aria-hidden="true">
                  {step.glyph}
                </div>
                <span className="process-card-index">{step.index}</span>
              </div>
              <h3 className="process-card-title">{step.title}</h3>
              <p className="process-card-desc">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
