"use client";

import React from "react";
import { motion } from "motion/react";
import SectionBar from "./SectionBar";
import Button from "./Button";
import { PriceTagIcon } from "./SectionIcons";
import { EASE, DURATION, VIEWPORT_SETTINGS } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

interface PricingCard {
  label: string;
  name: string;
  price: string;
  unit: string;
  bestFor: string;
  subheading: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
}

const pricingPlans: PricingCard[] = [
  {
    label: "CARE PLAN",
    name: "Care Plan",
    price: "$2,500 – $4,000",
    unit: "/proyek",
    bestFor:
      "Terbaik untuk: produk yang sudah berjalan dan ingin berkembang secara terkontrol dan berkelanjutan.",
    subheading: "Termasuk dalam paket:",
    features: [
      "Pengembangan dan perbaikan produk berkelanjutan",
      "Monitoring stabilitas, performa, dan reliabilitas",
      "Iterasi fitur berdasarkan data dan kebutuhan bisnis",
      "Perawatan sistem dan pencegahan isu teknis",
      "Dukungan teknis dan rekomendasi peningkatan produk",
      "SLA penanganan bug & update prioritas",
    ],
    buttonText: "MULAI SEKARANG",
    buttonHref: "#contact",
  },
  {
    label: "CUSTOM BUILD",
    name: "Custom Build",
    price: "$6,000 – $10,000",
    unit: "/proyek",
    bestFor:
      "Terbaik untuk: bisnis atau tim yang membutuhkan solusi spesifik dengan target hasil yang jelas.",
    subheading: "Semua di Care Plan, ditambah:",
    features: [
      "Perancangan dan pengembangan sistem dari nol",
      "Pemetaan alur utama dan target konversi produk",
      "Desain UI/UX eksklusif dan implementasi fitur inti",
      "Integrasi API, payment gateway, dan otomasi",
      "Tracking analitik, logging, dan hasil terukur",
      "100% kepemilikan penuh atas kode & hak cipta",
    ],
    buttonText: "MULAI SEKARANG",
    buttonHref: "#contact",
  },
  {
    label: "KONSULTASI",
    name: "Konsultasi",
    price: "Sesuai kebutuhan",
    unit: "",
    bestFor:
      "Terbaik untuk: scoping arsitektur, audit teknis, atau penyelamatan produk yang menghadapi kendala.",
    subheading: "Fokus pendampingan khusus:",
    features: [
      "Technical audit menyeluruh terhadap kode lama",
      "Pemetaan technical debt dan arsitektur target",
      "Rekomendasi perbaikan performa & skalabilitas",
      "Roadmap implementasi dan estimasi delivery",
      "Pendampingan teknis dan review berkala",
      "Konsultasi langsung dengan principal engineer",
    ],
    buttonText: "JADWALKAN DISKUSI",
    buttonHref: "#contact",
  },
];

export default function PricingSection() {
  const { isReducedMotion } = useMotion();

  return (
    <section className="pricing-section theme-light" id="pricing">
      <div className="content-frame pricing-container">
        {/* Section Header Bar */}
        <SectionBar
          label="PAKET INVESTASI"
          index="04"
          total="05"
          icon={<PriceTagIcon />}
        />

        {/* Two-Column Layout (Stretching Full Height with Zero Gap Divider) */}
        <div className="pricing-v2-layout">
          {/* Left Column (~36%, Sticky from 1024px) */}
          <div className="pricing-v2-left">
            <div className="pricing-v2-sticky">
              <h2 className="pricing-v2-heading">
                Paket Investasi yang Transparan
              </h2>
              <p className="pricing-v2-subtext">
                Paket fleksibel yang dirancang untuk setiap tahap pertumbuhan bisnis Anda. Harga jelas, tanpa biaya tersembunyi.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Stacked .card-v2 Cards with border-left as Column Divider */}
          <div className="pricing-v2-right">
            {pricingPlans.map((plan, idx) => (
              <motion.article
                key={idx}
                className="card-v2 pricing-v2-card"
                initial={isReducedMotion ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_SETTINGS}
                transition={{
                  duration: DURATION.base,
                  ease: EASE,
                  delay: isReducedMotion ? 0 : idx * 0.1,
                }}
              >
                {/* 1. Plan label in uppercase mono 12px muted */}
                <div className="pricing-v2-label">{plan.label}</div>

                {/* 2. Price at 48px weight 500 in var(--ink) with small muted unit */}
                <div className="pricing-v2-price-row">
                  {plan.unit ? (
                    <>
                      <span className="pricing-v2-price">{plan.price}</span>
                      <span className="pricing-v2-unit">{plan.unit}</span>
                    </>
                  ) : (
                    <span className="pricing-v2-price pricing-v2-price--custom">
                      {plan.price}
                    </span>
                  )}
                </div>

                {/* 3. Existing "Terbaik untuk" sentence in mono 14px muted */}
                <p className="pricing-v2-bestfor">{plan.bestFor}</p>

                {/* 4. Existing subheading at 13px muted */}
                <div className="pricing-v2-subheading">{plan.subheading}</div>

                {/* 5. Bullet items: rendered each on its own line (line-height 1.9) with no bars or bullets */}
                <ul className="pricing-v2-features">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="pricing-v2-feature-item">
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* 6. Plan button: .btn--dark, left-aligned, not full width */}
                <div className="pricing-v2-btn-row">
                  <Button
                    variant="dark"
                    href={plan.buttonHref}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
