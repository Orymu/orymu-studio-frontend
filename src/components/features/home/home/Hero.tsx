"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Lenis from "lenis";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroNavbar from "./HeroNavbar";
import type { NavItem } from "./hero-types";

type HeroProps = {
  navItems: NavItem[];
};

export default function Hero({ navItems }: HeroProps) {
  const [activeSection, setActiveSection] = useState<string>(
    navItems[0]?.href?.replace("#", "") ?? "home",
  );
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!navItems.length) return;

    const sectionIds = navItems
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.55, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    const lenis = lenisRef.current;

    if (!target || !lenis) return;

    event.preventDefault();
    lenis.scrollTo(target, {
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    window.history.pushState(null, "", href);
  };

  return (
    <section
      id="home"
      className="relative mx-auto min-h-screen w-full max-w-8xl overflow-hidden rounded-xl bg-gray-200"
    >
      <HeroBackground />

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-12 pt-8 md:px-10 md:pb-16 md:pt-10">
        <HeroNavbar
          navItems={navItems}
          activeSection={activeSection}
          onNavClick={handleNavClick}
        />
        <HeroContent />
      </div>
    </section>
  );
}
