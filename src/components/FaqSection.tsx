"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionBar from "./SectionBar";
import { FaqDiscIcon } from "./SectionIcons";
import { EASE, DURATION, VIEWPORT_SETTINGS } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

interface FaqItem {
  id: string;
  q: string;
  a: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    q: "Apa itu Orymu Studio?",
    a: (
      <>
        <p>
          Orymu Studio adalah studio product engineering independen yang berspesialisasi dalam membangun sistem lead, booking, serta pengembangan dan penyelamatan produk web &amp; mobile.
        </p>
        <p>
          Kami fokus pada pembuatan solusi digital yang berdampak langsung pada pertumbuhan bisnis tanpa kode berbelit atau fitur yang mubazir.
        </p>
      </>
    ),
  },
  {
    id: "faq-2",
    q: "Berapa lama waktu pengerjaan sebuah sistem?",
    a: (
      <>
        <p>
          Sebagian besar proyek Custom Build diselesaikan dalam waktu 3 hingga 6 minggu dengan scope yang jelas dan sprint terukur.
        </p>
        <p>
          Untuk kebutuhan mendesak atau penyelamatan produk yang sedang berjalan, kami dapat memulai dengan audit cepat dan prioritisasi fitur terpenting terlebih dahulu.
        </p>
      </>
    ),
  },
  {
    id: "faq-3",
    q: "Teknologi apa saja yang digunakan oleh Orymu Studio?",
    a: (
      <p>
        Kami menggunakan modern engineering stack yang stabil dan cepat: Next.js, React, TypeScript, Node.js, Tailwind CSS, serta integrasi database modern dan API pihak ketiga (payment gateway, CRM, WhatsApp automation, dan analytics).
      </p>
    ),
  },
  {
    id: "faq-4",
    q: "Apakah kami memiliki kepemilikan penuh atas kode sumber?",
    a: (
      <p>
        Ya, 100%! Anda memiliki kepemilikan penuh atas seluruh source code, desain Figma, dokumentasi, dan hak cipta produk Anda tanpa ada keterikatan lisensi tersembunyi.
      </p>
    ),
  },
  {
    id: "faq-5",
    q: "Bagaimana jika produk kami sudah berjalan namun banyak masalah teknis?",
    a: (
      <p>
        Ini adalah salah satu spesialisasi kami. Kami membantu tim produk menstabilkan kode lama, mengatasi technical debt, membenahi performa yang lambat, dan mengembalikan kecepatan delivery tim Anda.
      </p>
    ),
  },
  {
    id: "faq-6",
    q: "Apa perbedaan antara Care Plan dan Custom Build?",
    a: (
      <>
        <p>
          <strong>Custom Build</strong> dirancang untuk membangun sistem atau produk baru dari nol dengan target dan alur konversi spesifik.
        </p>
        <p>
          <strong>Care Plan</strong> dirancang untuk produk yang sudah live dan membutuhkan pemeliharaan berkelanjutan, optimasi performa, monitoring bug, dan iterasi fitur secara konsisten.
        </p>
      </>
    ),
  },
  {
    id: "faq-7",
    q: "Bagaimana cara memulai kerja sama dengan Orymu Studio?",
    a: (
      <p>
        Anda dapat langsung menjadwalkan sesi diskusi singkat melalui tombol di website atau mengirimkan pesan langsung ke email kami di{" "}
        <a href="mailto:orymu@studio.com">orymu@studio.com</a>. Kami akan mendiskusikan kebutuhan Anda dan memberikan rekomendasi rencana aksi yang jelas.
      </p>
    ),
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const { isReducedMotion, lenis } = useMotion();

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handlePointerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("kontak");
    if (!target) return;
    if (isReducedMotion) {
      return;
    }
    if (lenis) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -84, duration: 1.1 });
    } else {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="faq-section theme-light" id="faqs">
      <div className="content-frame faq-container">
        {/* Section Header Bar (Full width touching frame lines) */}
        <SectionBar
          label="FAQ"
          index="05"
          total="05"
          inverted={false}
          icon={<FaqDiscIcon />}
        />

        {/* 2-Column Grid (Stretching full height with 0 gaps at top and bottom) */}
        <div className="faq-grid">
          {/* Left Column (~60%) */}
          <div className="faq-left-col">
            <motion.div
              className="faq-heading-block"
              initial={isReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SETTINGS}
              transition={{ duration: DURATION.base, ease: EASE }}
            >
              <h2 className="faq-heading">
                Pertanyaan yang Sering<br />Diajukan (FAQ)
              </h2>
              <p className="faq-subtitle">
                Semua yang perlu Anda ketahui tentang layanan kami.
              </p>
            </motion.div>

            {/* Accordion List - Hairlines span from left frame line to column divider */}
            <div className="faq-accordion">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`faq-row ${isOpen ? "faq-row--open" : "faq-row--closed"}`}
                  >
                    <button
                      type="button"
                      id={`faq-btn-${faq.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      onClick={() => toggle(faq.id)}
                      className="faq-row-trigger"
                    >
                      <span className="faq-row-question">{faq.q}</span>
                      <motion.span
                        className="faq-row-chevron"
                        aria-hidden="true"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{
                          duration: isReducedMotion ? 0 : 0.25,
                          ease: EASE,
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false} presenceAffectsLayout={false}>
                      {isOpen && (
                        <motion.div
                          key={`faq-anim-${faq.id}`}
                          id={`faq-answer-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-btn-${faq.id}`}
                          initial={isReducedMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: isReducedMotion ? 0 : 0.35,
                            ease: EASE,
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          <motion.div
                            className="faq-row-answer"
                            initial={isReducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: isReducedMotion ? 0 : 0.25,
                              delay: isReducedMotion ? 0 : 0.1,
                              ease: EASE,
                            }}
                          >
                            {faq.a}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (~40%) with border-left as Column Divider */}
          <div className="faq-right-col">
            <motion.div
              className="faq-right-sticky"
              initial={isReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SETTINGS}
              transition={{ duration: DURATION.base, ease: EASE, delay: 0.1 }}
            >
              <h3 className="faq-right-heading">Tidak menemukan jawabannya?</h3>
              <p className="faq-right-subtitle">
                Tanyakan langsung ke tim kami.
              </p>

              <a
                href="#kontak"
                className="faq-direct-link"
                onClick={handlePointerClick}
              >
                <span>Hubungi kami langsung</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="faq-direct-arrow"
                >
                  <path
                    d="M7 2.5V11.5M7 11.5L3.5 8M7 11.5L10.5 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
