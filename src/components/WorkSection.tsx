"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import SectionBar from "./SectionBar";
import Button from "./Button";
import { GridIcon } from "./SectionIcons";
import { EASE, DURATION, VIEWPORT_SETTINGS } from "@/lib/motion";
import { useMotion } from "./MotionProvider";
import { projects } from "@/data/projects";

export default function WorkSection() {
  const { isReducedMotion } = useMotion();

  // Exactly 3 featured cards: MAINTANA, Drope, Arunika Wedding
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="portfolio-minimal-section theme-light" id="work">
      <div className="content-frame portfolio-minimal-container">
        {/* Section Header Bar */}
        <SectionBar
          label="PORTOFOLIO"
          index="03"
          total="05"
          inverted={false}
          icon={<GridIcon />}
        />

        {/* Editorial Section Header Row (Full Width with Bottom Hairline) */}
        <motion.div
          className="portfolio-minimal-header-row"
          initial={isReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_SETTINGS}
          transition={{ duration: DURATION.base, ease: EASE }}
        >
          <div className="portfolio-minimal-header-left">
            <h2 className="portfolio-minimal-title">Karya yang Kami Bangun</h2>
            <p className="portfolio-minimal-subtitle">
              Solusi digital yang berorientasi pada fungsi dan dampak bisnis nyata.
            </p>
          </div>
          <div className="portfolio-minimal-header-right">
            <Button variant="light" href="/work">
              Lihat Semua Karya
            </Button>
          </div>
        </motion.div>

        {/* 3-Column Grid of 3 Featured Cards (1 Column on Mobile) */}
        <motion.div
          className="portfolio-home-grid"
          initial={isReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_SETTINGS}
          transition={{ duration: DURATION.base, ease: EASE, delay: 0.1 }}
        >
          {featuredProjects.map((proj, idx) => {
            const cover = proj.media.find((m) => m.type === "image") || proj.media[0];
            return (
              <Link
                key={proj.slug}
                href={`/work/${proj.slug}`}
                className="card-v2 work-card group"
              >
                <div className="work-card-media-wrap">
                  <Image
                    src={cover.thumbSrc || cover.src}
                    alt={proj.title}
                    width={560}
                    height={350}
                    priority={idx < 3}
                    loading={idx < 3 ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="work-card-img"
                  />
                </div>
                <div className="work-card-caption">
                  <span className="work-card-title">{proj.title}</span>
                  {proj.category && (
                    <span className="work-card-cat">{proj.category}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
