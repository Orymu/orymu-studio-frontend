"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Button from "./Button";
import OrymuMark from "./OrymuMark";
import { useMotion } from "./MotionProvider";
import { EASE, SPRING_NAV } from "@/lib/motion";

interface SectionItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SECTION_ITEMS: SectionItem[] = [
  {
    id: "problem",
    label: "Solusi",
    href: "#problem",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-3.58 0-6.5-2.92-6.5-6.5S8.42 5.5 12 5.5s6.5 2.92 6.5 6.5-2.92 6.5-6.5 6.5zm0-9.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      </svg>
    ),
  },
  {
    id: "how-it-works",
    label: "Cara Kerja",
    href: "#how-it-works",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2a3 3 0 0 0-2.82 2H9a4.5 4.5 0 0 0 0 9h6a2.5 2.5 0 0 1 0 5H8.82A3 3 0 1 0 6 22a3 3 0 0 0 2.82-2H15a4.5 4.5 0 0 0 0-9H9a2.5 2.5 0 0 1 0-5h6.18A3 3 0 1 0 18 2z" />
      </svg>
    ),
  },
  {
    id: "work",
    label: "Portofolio",
    href: "#work",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9 3a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v3.5c2.9 1.3 6.3 2 10 2s7.1-.7 10-2V8a2 2 0 0 0-2-2h-3V5a2 2 0 0 0-2-2H9zm0 3V5h6v1H9zm-7 7.1V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.9c-2.8 1.1-6 1.7-9.2 1.8V16a1 1 0 1 1-2 0v-1.1C7.9 14.8 4.8 14.2 2 13.1z" />
      </svg>
    ),
  },
  {
    id: "pricing",
    label: "Biaya",
    href: "#pricing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.83 8.83a2 2 0 0 0 2.83 0l7.17-7.17a2 2 0 0 0 0-2.83l-8.83-8.83zM7 8.5A1.5 1.5 0 1 1 7 5.5a1.5 1.5 0 0 1 0 3z" />
      </svg>
    ),
  },
  {
    id: "faqs",
    label: "FAQ",
    href: "#faqs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-6.75-.9.92C12.45 12.9 12 13.5 12 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState<string>(
    pathname.startsWith("/work") ? "work" : ""
  );
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollTo, stopScroll, startScroll, isReducedMotion } = useMotion();

  // Scroll spy via scroll listener + accurate viewport detection
  useEffect(() => {
    if (!isHome) {
      const timer = setTimeout(() => {
        setActiveId(pathname.startsWith("/work") ? "work" : "");
      }, 0);
      return () => clearTimeout(timer);
    }

    const sectionIds = ["hero", "problem", "how-it-works", "work", "pricing", "faqs"];

    const updateActiveSection = () => {
      // If near bottom of the page, activate the last section (faqs)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveId("faqs");
        return;
      }

      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        if (heroRect.bottom > 200) {
          setActiveId("");
          return;
        }
      }

      // Check section currently in top viewport reading area
      for (const id of sectionIds) {
        if (id === "hero") continue;
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 250 && rect.bottom > 120) {
          setActiveId(id);
          return;
        }
      }
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [isHome, pathname]);

  // Lock Lenis scroll while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      stopScroll();
      setTimeout(() => {
        const first = panelRef.current?.querySelector<HTMLElement>("a");
        first?.focus();
      }, 50);
    } else {
      startScroll();
    }
  }, [menuOpen, stopScroll, startScroll]);

  // Close mobile menu on Escape key or outside click + focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        const toggleBtn = document.querySelector<HTMLButtonElement>(".nav-odama-menu-btn");
        toggleBtn?.focus();
      } else if (e.key === "Tab" && menuOpen && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          "a, button, [tabindex]:not([tabindex='-1'])"
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement)?.closest(".nav-odama-menu-btn")
      ) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const getItemHref = (item: SectionItem) => {
    if (isHome) return item.href;
    if (item.id === "work") return "/work";
    return `/${item.href}`;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: SectionItem) => {
    if (isHome && item.href.startsWith("#")) {
      e.preventDefault();
      setActiveId(item.id);
      scrollTo(item.href);
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <header id="navbar" className="nav-odama-header">
      {/* Group 1 (Left): Brand Circle */}
      <Link
        href="/"
        data-nav-group="left"
        className="nav-odama-left-circle"
        aria-label="Orymu Studio, beranda"
        title="Orymu Studio, beranda"
        onClick={(e) => {
          if (isHome) {
            e.preventDefault();
            scrollTo(0);
          }
        }}
      >
        <div className="nav-odama-mark" aria-hidden="true">
          <OrymuMark size={32} className="nav-logo-mark" />
        </div>
      </Link>

      {/* Group 2 (Center): Gooey Metaball Section Icons Dock */}
      <nav data-nav-group="center" className="nav-odama-center-pill nav-goo-dock" aria-label="Navigasi Bagian Halaman">
        {/* Hidden SVG Gooey Filter for smooth metaball pinched bridges */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <filter id="nav-goo-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7.5" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* Filtered Gooey Background Lobes Layer */}
        <div className="nav-goo-backdrop" aria-hidden="true">
          {SECTION_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <span key={item.id} className="nav-goo-slot">
                <span className={`nav-goo-lobe ${isActive ? "is-active" : ""}`} />
              </span>
            );
          })}
        </div>

        {/* Crisp Foreground Layer: Active White Disc + Filled Icons + Tooltips */}
        <div className="nav-goo-items">
          {SECTION_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            const targetHref = getItemHref(item);
            return (
              <Link
                key={item.id}
                href={targetHref}
                className={`nav-odama-icon-btn ${isActive ? "is-active" : ""}`}
                aria-label={item.label}
                onClick={(e) => handleNavClick(e, item)}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="nav-active-indicator"
                    transition={isReducedMotion ? { duration: 0 } : SPRING_NAV}
                    aria-hidden="true"
                  />
                )}
                {item.icon}
                <span className="nav-odama-tooltip" aria-hidden="true">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Group 3 (Right): CTA Button & Mobile Icon CTA */}
      <div data-nav-group="right" className="nav-odama-right-group">
        <Button
          variant="dark"
          size="lg"
          href={isHome ? "#pricing" : "/#pricing"}
          className="nav-cta-btn"
          aria-label="Mulai Konsultasi"
        >
          <span className="nav-cta-text-full">MULAI KONSULTASI</span>
          <span className="nav-cta-text-mobile">KONSULTASI</span>
        </Button>

        {/* Mobile Circular Icon CTA (<900px) */}
        <Link
          href={isHome ? "#pricing" : "/#pricing"}
          className="nav-cta-mobile-icon"
          aria-label="Mulai Konsultasi"
          title="Mulai Konsultasi"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              scrollTo("#pricing");
            }
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 9H7V9h10v2zm-4 4H7v-2h6v2z" />
          </svg>
        </Link>

        {/* Mobile Hamburger Toggle (<900px) */}
        <button
          type="button"
          className="nav-odama-menu-btn"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        {/* Mobile Menu Panel (Motion + AnimatePresence) */}
        <AnimatePresence presenceAffectsLayout={false}>
          {menuOpen && (
            <motion.div
              ref={panelRef}
              key="nav-mobile-panel"
              className="nav-odama-mobile-panel"
              role="dialog"
              aria-modal="true"
              data-lenis-prevent
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              style={{ transformOrigin: "top right" }}
              transition={{ duration: isReducedMotion ? 0 : 0.18, ease: EASE }}
            >
              {SECTION_ITEMS.map((item, idx) => {
                const isActive = activeId === item.id;
                const targetHref = getItemHref(item);
                return (
                  <motion.div
                    key={item.id}
                    initial={isReducedMotion ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: isReducedMotion ? 0 : 0.18,
                      delay: isReducedMotion ? 0 : idx * 0.04,
                      ease: EASE,
                    }}
                  >
                    <Link
                      href={targetHref}
                      className={`nav-odama-mobile-link ${isActive ? "is-active" : ""}`}
                      onClick={(e) => handleNavClick(e, item)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
