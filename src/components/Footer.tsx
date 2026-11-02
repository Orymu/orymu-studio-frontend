"use client";

import React from "react";
import { motion } from "motion/react";
import Button from "./Button";
import DitherO from "./DitherO";
import { EASE, DURATION, VIEWPORT_SETTINGS } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

export default function Footer() {
  const { isReducedMotion } = useMotion();

  return (
    <footer className="footer-section" id="contact">
      <span id="footer" style={{ position: "absolute", top: 0, pointerEvents: "none" }} aria-hidden="true" />
      <div className="content-frame footer-frame">
        {/* Upper Row */}
        <div className="footer-upper-row" id="kontak">
          <div className="footer-upper-content">
            <motion.h2
              className="footer-heading"
              initial={isReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SETTINGS}
              transition={{ duration: DURATION.base, ease: EASE }}
            >
              Butuh bantuan atau diskusi proyek?
            </motion.h2>

            <motion.p
              className="footer-paragraph"
              initial={isReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SETTINGS}
              transition={{ duration: DURATION.base, ease: EASE, delay: isReducedMotion ? 0 : 0.08 }}
            >
              Ubah ide Anda menjadi produk digital berdampak tinggi.
            </motion.p>

            <div className="footer-buttons-row">
              <motion.div
                initial={isReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_SETTINGS}
                transition={{ duration: DURATION.fast, ease: EASE, delay: isReducedMotion ? 0 : 0.16 }}
              >
                <Button
                  variant="dark"
                  href="mailto:orymu@studio.com?subject=Jadwalkan%20Diskusi"
                >
                  Jadwalkan Diskusi
                </Button>
              </motion.div>

              <motion.div
                initial={isReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_SETTINGS}
                transition={{ duration: DURATION.fast, ease: EASE, delay: isReducedMotion ? 0 : 0.24 }}
              >
                <Button
                  variant="light"
                  href="mailto:orymu@studio.com"
                >
                  Kirim Email
                </Button>
              </motion.div>
            </div>

            <div className="footer-email-note">
              <span className="footer-email-label">Atau kirim email ke</span>{" "}
              <a href="mailto:orymu@studio.com" className="footer-email-link">
                orymu@studio.com
              </a>
            </div>
          </div>

          {/* Art: <DitherO /> on the right of the upper row */}
          <motion.div
            className="footer-artwork"
            aria-hidden="true"
            initial={isReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_SETTINGS}
            transition={{ duration: DURATION.slow, ease: EASE }}
          >
            <DitherO mode="dither" intensity={0.6} />
          </motion.div>
        </div>

        {/* Lower Row */}
        <div className="footer-lower-row">
          <p className="footer-copyright">
            &copy; 2026 Orymu Studio. Hak Cipta Dilindungi.
          </p>

          <nav className="footer-social-links" aria-label="Media Sosial">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-lower-link"
            >
              Instagram
            </a>
            <span className="footer-dot-sep" aria-hidden="true" />
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-lower-link"
            >
              X / Twitter
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
