"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
};

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
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-60 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute left-[28%] top-[40%] h-10 w-10 bg-slate-200" />
        <div className="absolute left-[32%] top-[52%] h-10 w-10 bg-slate-200" />
        <div className="absolute right-[20%] top-[30%] h-12 w-12 bg-slate-200" />
        <div className="absolute right-[8%] top-[55%] h-8 w-8 bg-slate-200" />
        <div className="absolute right-[24%] bottom-[24%] h-10 w-10 bg-slate-200" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 pt-8 pb-12 md:px-10 md:pt-10 md:pb-16">
        <nav className="flex items-center justify-center">
          <div className="inline-flex items-center gap-6 rounded-full bg-bg-brand px-8 py-4 shadow-[0_24px_50px_rgba(15,23,42,0.35)]">
            <span className="text-sm font-semibold text-white md:text-base">
              Orymu Studio
            </span>
            <div className="hidden items-center gap-6 text-sm md:flex">
              <span className="text-text-tertiary">|</span>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  className={`transition-colors ${
                    activeSection === item.href.replace("#", "")
                      ? "text-text-inverse"
                      : "text-text-tertiary hover:text-text-inverse"
                  }`}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  aria-current={
                    activeSection === item.href.replace("#", "")
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="max-w-6xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-white px-3 py-2">
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span className="absolute h-6 w-6 rounded-full bg-[#3ccf7d]/15 blur-[6px]" />
              <span className="relative h-3 w-3 rounded-full bg-[#3ccf7d]" />
            </span>
            <span className="flex items-center gap-2 font-mono text-text-primary font-semibold tracking-wider text-base">
              <span>Product Engineering Studio</span>
              <span aria-hidden="true">•</span>
              <span>Mobile & Web</span>
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-tight text-text-primary md:text-5xl lg:text-6xl">
            Orymu Studio Sistem Lead, Booking,
            <br className="hidden md:block" />
            dan Product Engineering
          </h1>

          <p className="text-base leading-relaxed font-medium text-text-secondary sm:text-lg md:text-xl lg:text-2xl">
            Kami membangun sistem lead dan booking yang menghasilkan pelanggan,
            serta membantu tim produk menyelamatkan dan menskalakan produk
            web/mobile yang sudah berjalan.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-shark-100">
            <Button className="rounded-xl p-8 text-base shadow-[0_60px_120px_rgba(15,23,42,0.45),0_22px_44px_rgba(15,23,42,0.30)] text-text-inverse">
              Booking Now
            </Button>
            <Button
              variant="outline"
              className="rounded-xl p-8 text-base border border-border-brand text-text-brand shadow-[0_8px_18px_rgba(15,23,42,0.08)] hover:bg-white"
            >
              View Our Process
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
