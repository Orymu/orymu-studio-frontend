"use client";

import React from "react";
import { motion } from "motion/react";
import SectionBar from "./SectionBar";
import { BullseyeIcon } from "./SectionIcons";
import { EASE, DURATION, VIEWPORT_SETTINGS } from "@/lib/motion";
import { useMotion } from "./MotionProvider";
import { SmartphoneCardFigure } from "./figures/smartphone/live";
import { TestRigCardFigure } from "./figures/test-rig/figure";
import { SpotPlateCardFigure } from "./figures/spot-plate/figure";

interface SolutionCard {
  id: string;
  index: string;
  hotkey: string;
  title: string;
  description: string;
  figure: React.ReactNode;
}

const cardsData: SolutionCard[] = [
  {
    id: "local-business",
    index: "01",
    hotkey: "L",
    title: "Bisnis Lokal & Layanan",
    description: "Sistem lead dan booking otomatis yang mengubah pengunjung menjadi pelanggan.",
    figure: <SmartphoneCardFigure />,
  },
  {
    id: "product-teams",
    index: "02",
    hotkey: "P",
    title: "Untuk Tim Produk",
    description: "Stabilkan arsitektur dan percepat rilis produk tanpa risiko teknis.",
    figure: <TestRigCardFigure />,
  },
  {
    id: "conversion-flow",
    index: "03",
    hotkey: "A",
    title: "Satu Alur Aksi Terukur",
    description: "Satu jalur konversi utama yang jelas, cepat diakses, dan terukur.",
    figure: <SpotPlateCardFigure />,
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
              {/* Top Row: Title on Left, Index + Hotkey Badge on Right */}
              <div className="industri-card-top">
                <h3 className="industri-card-title">{card.title}</h3>
                <div className="industri-card-meta" aria-hidden="true">
                  <span className="industri-card-index">{card.index}</span>
                  <kbd className="industri-card-kbd">{card.hotkey}</kbd>
                </div>
              </div>

              {/* Center: Interactive Isometric Anatomy Figure */}
              {card.figure}

              {/* Bottom: Concise Description */}
              <p className="industri-card-desc">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
