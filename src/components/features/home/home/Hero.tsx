"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Lenis from "lenis";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroNavbar from "./HeroNavbar";
import type { NavItem } from "./hero-types";

type HeroProps = {
  navItems: NavItem[];
};

export default function Hero({ navItems }: HeroProps) {
  const sectionIds = useMemo(
    () =>
      navItems
        .map((item) => item.href.replace("#", ""))
        .filter(Boolean),
    [navItems],
  );
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] ?? "home",
  );
  const lenisRef = useRef<Lenis | null>(null);

  const updateActiveSection = useCallback(() => {
    if (!sectionIds.length) return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
      .sort((a, b) => a.offsetTop - b.offsetTop);

    if (!sections.length) return;

    const scrollAnchor = window.innerHeight * 0.35;
    let currentSection = sections[0];

    for (const section of sections) {
      const rect = section.getBoundingClientRect();

      if (rect.top > scrollAnchor) break;

      currentSection = section;

      if (rect.bottom > scrollAnchor) break;
    }

    setActiveSection(currentSection.id);
  }, [sectionIds]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    let rafId = 0;
    let scrollSpyRafId = 0;

    const scheduleActiveSectionUpdate = () => {
      if (scrollSpyRafId) return;

      scrollSpyRafId = requestAnimationFrame(() => {
        scrollSpyRafId = 0;
        updateActiveSection();
      });
    };

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    updateActiveSection();
    lenis.on("scroll", scheduleActiveSectionUpdate);
    window.addEventListener("scroll", scheduleActiveSectionUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleActiveSectionUpdate);
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(scrollSpyRafId);
      lenis.off("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [updateActiveSection]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    const lenis = lenisRef.current;

    if (!target || !lenis) return;

    event.preventDefault();
    setActiveSection(targetId);
    lenis.scrollTo(target, {
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    window.history.pushState(null, "", href);
  };

  return (
    <>
      <HeroNavbar
        navItems={navItems}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />

      <section
        id="home"
        className="relative mx-auto min-h-[100svh] w-full max-w-8xl overflow-hidden bg-gray-200 sm:rounded-xl"
      >
        <HeroBackground />

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-12 md:px-10 md:pb-16 md:pt-32">
          <HeroContent />
        </div>
      </section>
    </>
  );
}
