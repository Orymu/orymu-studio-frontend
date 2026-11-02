"use client";

import React from "react";
import { motion } from "motion/react";
import SectionBar from "./SectionBar";
import { BullseyeIcon } from "./SectionIcons";
import { EASE, DURATION, VIEWPORT_SETTINGS, SPRING_KEYCAP } from "@/lib/motion";
import { useMotion } from "./MotionProvider";
import {
  StorefrontGlyph,
  CalendarGlyph,
  CodeBracketsGlyph,
  LayersGlyph,
  FunnelGlyph,
  BarChartGlyph,
} from "./KeycapGlyphs";

interface SolutionCard {
  id: string;
  title: string;
  description: string;
  darkGlyph: React.ReactNode;
  blueGlyph: React.ReactNode;
}

const cardsData: SolutionCard[] = [
  {
    id: "local-business",
    title: "Bisnis Lokal & Layanan",
    description:
      "Kami membangun sistem lead dan booking yang sederhana namun efektif untuk mengubah perhatian pengunjung menjadi pertanyaan dan pemesanan.",
    darkGlyph: <StorefrontGlyph />,
    blueGlyph: <CalendarGlyph />,
  },
  {
    id: "product-teams",
    title: "Untuk Tim Produk",
    description:
      "Membantu tim menstabilkan dan mempercepat pengembangan produk yang sedang berjalan. Fokus pada penurunan risiko teknis dan delivery terprediksi.",
    darkGlyph: <CodeBracketsGlyph />,
    blueGlyph: <LayersGlyph />,
  },
  {
    id: "conversion-flow",
    title: "Satu Alur Aksi Terukur",
    description:
      "Fokus pada satu jalur konversi utama yang jelas, mudah diakses pengguna, dan dapat diukur secara transparan setiap metriknya.",
    darkGlyph: <FunnelGlyph />,
    blueGlyph: <BarChartGlyph />,
  },
];

export default function WhySection() {
  const { isReducedMotion } = useMotion();

  return (
    <section className="industri-section theme-light" id="problem">
      <div className="content-frame industri-container">
        {/* Section Header Bar */}
        <SectionBar
          label="FOKUS SOLUSI"
          index="01"
          total="05"
          icon={<BullseyeIcon />}
        />

        {/* Section Heading Group */}
        <motion.div
          className="industri-heading-group"
          initial={isReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_SETTINGS}
          transition={{ duration: DURATION.base, ease: EASE }}
        >
          <h2 className="industri-heading">
            Industri &amp; Masalah yang
            <br />
            Kami Selesaikan
          </h2>
          <p className="industri-lede">
            Solusi digital yang berorientasi pada <strong>hasil bisnis nyata</strong>.
          </p>
        </motion.div>

        {/* Cards Row - 3-column grid (1 column below 900px) */}
        <div className="industri-cards-row">
          {cardsData.map((card, idx) => (
            <motion.article
              key={card.id}
              className="card-v2 industri-card group"
              initial={isReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SETTINGS}
              transition={{ duration: DURATION.base, ease: EASE, delay: idx * 0.1 }}
            >
              {/* Row of two chunky 3D keycaps with '+' between them */}
              <div className="keycap-row">
                <motion.span
                  className="keycap keycap--dark"
                  initial={isReducedMotion ? false : { y: -8, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={VIEWPORT_SETTINGS}
                  transition={
                    isReducedMotion
                      ? { duration: 0 }
                      : {
                          ...SPRING_KEYCAP,
                          delay: idx * 0.1 + 0.12,
                        }
                  }
                >
                  {card.darkGlyph}
                </motion.span>
                <span className="keycap-plus" aria-hidden="true">
                  +
                </span>
                <motion.span
                  className="keycap keycap--blue"
                  initial={isReducedMotion ? false : { y: -8, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={VIEWPORT_SETTINGS}
                  transition={
                    isReducedMotion
                      ? { duration: 0 }
                      : {
                          ...SPRING_KEYCAP,
                          delay: idx * 0.1 + 0.2, // 0.08s after dark key
                        }
                  }
                >
                  {card.blueGlyph}
                </motion.span>
              </div>

              {/* Title & Monospace Description */}
              <h3 className="industri-card-title">{card.title}</h3>
              <p className="industri-card-desc">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
