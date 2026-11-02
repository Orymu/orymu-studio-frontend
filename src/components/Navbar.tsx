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
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: "how-it-works",
    label: "Cara Kerja",
    href: "#how-it-works",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="6" cy="19" r="3" />
        <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
        <circle cx="18" cy="5" r="3" />
      </svg>
    ),
  },
  {
    id: "work",
    label: "Portofolio",
    href: "#work",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "pricing",
    label: "Biaya",
    href: "#pricing",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <path d="M7 7h.01" />
      </svg>
    ),
  },
  {
    id: "faqs",
    label: "FAQ",
    href: "#faqs",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
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

      {/* Group 2 (Center): Section Icons Pill */}
      <nav data-nav-group="center" className="nav-odama-center-pill" aria-label="Navigasi Bagian Halaman">
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
      </nav>

      {/* Group 3 (Right): CTA Button & Mobile Toggle */}
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
