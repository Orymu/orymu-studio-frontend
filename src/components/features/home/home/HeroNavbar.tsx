"use client";

import { Menu, X } from "lucide-react";
import { useState, type MouseEvent } from "react";
import type { NavItem } from "./hero-types";

type HeroNavbarProps = {
  navItems: NavItem[];
  activeSection: string;
  onNavClick: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export default function HeroNavbar({
  navItems,
  activeSection,
  onNavClick,
}: HeroNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isItemActive = (item: NavItem) =>
    activeSection === item.href.replace("#", "");

  const handleMobileNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    onNavClick(event, href);
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex items-center justify-center">
      <div className="relative w-full max-w-4xl rounded-2xl bg-bg-brand px-4 py-3 shadow-[0_24px_50px_rgba(15,23,42,0.35)] md:w-auto md:max-w-none md:rounded-full md:px-8 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-medium text-white md:text-2xl">
            Orymu Studio
          </span>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 text-white md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="hero-mobile-nav"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="hidden items-center gap-6 px-2 py-1 text-base md:flex md:text-lg">
            <span className="text-text-tertiary">|</span>
            {navItems.map((item) => (
              <a
                key={item.label}
                className={`inline-flex items-center rounded-full px-3 py-1.5 transition-colors ${
                  isItemActive(item)
                    ? "text-text-inverse"
                    : "text-text-tertiary hover:text-text-inverse"
                }`}
                href={item.href}
                onClick={(event) => onNavClick(event, item.href)}
                aria-current={isItemActive(item) ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div
          id="hero-mobile-nav"
          className={`absolute left-0 right-0 top-full z-30 mt-2 transition-all duration-300 md:hidden ${
            isMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <div className="rounded-xl bg-bg-brand p-2 shadow-[0_18px_36px_rgba(15,23,42,0.35)]">
            {navItems.map((item) => (
              <a
                key={item.label}
                className={`block rounded-lg px-4 py-2.5 text-sm transition-colors ${
                  isItemActive(item)
                    ? "bg-white/15 text-white"
                    : "text-text-tertiary hover:bg-white/10 hover:text-white"
                }`}
                href={item.href}
                onClick={(event) => handleMobileNavClick(event, item.href)}
                aria-current={isItemActive(item) ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
