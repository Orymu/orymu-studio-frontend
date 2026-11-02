"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "./Button";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Row 1: all 8 projects in data order (covers)
const row1 = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  media: p.media.find((m) => m.type === "image") || p.media[0],
}));

// Row 2: rotated by 4 using second image || first image
const row2 = projects.map((_, i) => {
  const p = projects[(i + 4) % projects.length];
  const images = p.media.filter((m) => m.type === "image");
  return {
    slug: p.slug,
    title: p.title,
    media: images[1] || images[0] || p.media[0],
  };
});

function HeroTile({
  item,
  isDuplicate = false,
}: {
  item: { slug: string; title: string; media: { src: string; thumbSrc?: string; width: number; height: number } };
  isDuplicate?: boolean;
}) {
  const content = (
    <Image
      src={item.media.src}
      alt={isDuplicate ? "" : `${item.title} preview`}
      width={720}
      height={450}
      quality={92}
      loading="lazy"
      sizes="(min-width: 768px) 360px, 260px"
      className="hero-marquee-img"
    />
  );

  if (isDuplicate) {
    return (
      <div className="hero-marquee-tile" aria-hidden="true" tabIndex={-1}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/work/${item.slug}`}
      className="hero-marquee-tile"
      aria-label={`Lihat proyek ${item.title}`}
    >
      {content}
    </Link>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const el = heroRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1) Navbar groups fade down
    const navLeft = document.querySelector("[data-nav-group='left']");
    const navCenter = document.querySelector("[data-nav-group='center']");
    const navRight = document.querySelector("[data-nav-group='right']");
    const navGroups = [navLeft, navCenter, navRight].filter(Boolean) as HTMLElement[];

    if (navGroups.length > 0) {
      tl.fromTo(
        navGroups,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
        0
      );
    }

    // 2) The brand name and experience label fade up
    const topLabels = [
      el.querySelector(".hero-brand-name"),
      el.querySelector(".hero-exp-label"),
    ].filter(Boolean) as HTMLElement[];

    if (topLabels.length > 0) {
      tl.fromTo(
        topLabels,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
        0.12
      );
    }

    // 3) The statement is revealed line by line
    const lines = el.querySelectorAll(".hero-headline-line-inner");
    if (lines.length > 0) {
      tl.fromTo(
        lines,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        0.2
      );
    }

    // 4) Paragraph and two buttons fade up
    const staggerEls = [
      el.querySelector(".hero-subtext"),
      el.querySelector(".hero-actions"),
    ].filter(Boolean) as HTMLElement[];

    if (staggerEls.length > 0) {
      tl.fromTo(
        staggerEls,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
        0.38
      );
    }

    // 5) Hero marquee fades up smoothly
    const marquee = el.querySelector(".hero-marquee-wrapper");
    if (marquee) {
      tl.fromTo(
        marquee,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.45
      );
    }
  });

  return (
    <section className="hero-light" id="hero" ref={heroRef} aria-label="Hero">
      <div className="content-frame hero-frame">
        {/* Center Content Block */}
        <div className="hero-content-block">
          {/* 1) Eyebrow Badge / Brand */}
          <div className="hero-exp-label">
            <span className="hero-exp-dot" aria-hidden="true" />
            <span className="hero-exp-text">
              10+ TAHUN PENGALAMAN ENGINEERING &bull; ORYMU STUDIO
            </span>
          </div>

          {/* 2) Headline */}
          <div className="hero-headline-wrap">
            <h1 className="hero-headline">
              <span className="hero-headline-line-wrap">
                <span className="hero-headline-line-inner">
                  Sistem <span className="hero-hl-ink">Lead</span>,{" "}
                  <span className="hero-hl-ink">Booking</span>, dan
                </span>
              </span>
              <span className="hero-headline-line-wrap">
                <span className="hero-headline-line-inner">
                  <span className="hero-hl-ink">Product Engineering</span>.
                </span>
              </span>
            </h1>
          </div>

          {/* 3) Paragraph */}
          <p className="hero-subtext">
            Orymu Studio membantu bisnis membangun{" "}
            <strong>sistem lead dan booking</strong> yang menghasilkan pelanggan,
            serta membantu tim produk{" "}
            <strong>menyelamatkan dan menskalakan</strong> aplikasi web &amp; mobile
            yang sedang berjalan.
          </p>

          {/* 4) Action Buttons */}
          <div className="hero-actions">
            <Button variant="dark" href="#pricing">
              Mulai Sekarang
            </Button>
            <Button variant="light" href="#footer">
              Jadwalkan Diskusi
            </Button>
          </div>
        </div>

        {/* Marquee viewport (clipped inside frame) */}
        <div className="hero-marquee-wrapper" aria-label="Karya Pilihan">
          {/* Row 1: Scrolling Left */}
          <div className="hero-marquee-track hero-marquee-track--left">
            {row1.map((item) => (
              <HeroTile key={`r1-orig-${item.slug}`} item={item} />
            ))}
            {row1.map((item) => (
              <HeroTile key={`r1-dup-${item.slug}`} item={item} isDuplicate={true} />
            ))}
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="hero-marquee-track hero-marquee-track--right">
            {row2.map((item) => (
              <HeroTile key={`r2-orig-${item.slug}`} item={item} />
            ))}
            {row2.map((item) => (
              <HeroTile key={`r2-dup-${item.slug}`} item={item} isDuplicate={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
