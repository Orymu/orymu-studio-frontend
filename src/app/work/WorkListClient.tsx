"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import SectionBar from "@/components/SectionBar";
import { GridIcon } from "@/components/SectionIcons";
import { projects } from "@/data/projects";

export default function WorkListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("kategori") || "semua";

  // Extract distinct categories from data
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, []);

  const distinctCategories = useMemo(() => {
    return Object.keys(categoryCounts);
  }, [categoryCounts]);

  const handleSelectCategory = (cat: string) => {
    const catSlug = cat === "semua" ? "" : cat.toLowerCase().replace(/\s+/g, "-");
    const newUrl = catSlug ? `/work?kategori=${encodeURIComponent(catSlug)}` : "/work";
    router.replace(newUrl, { scroll: false });
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "semua" || distinctCategories.length < 2) {
      return projects;
    }
    return projects.filter(
      (p) =>
        p.category &&
        p.category.toLowerCase().replace(/\s+/g, "-") ===
          selectedCategory.toLowerCase().replace(/\s+/g, "-")
    );
  }, [selectedCategory, distinctCategories]);

  return (
    <div className="content-frame work-page-container">
      {/* Section Bar */}
      <SectionBar
        label="PORTOFOLIO"
        icon={<GridIcon />}
        counterCustom={
          <span className="section-bar__counter-custom">
            <span className="section-bar__current">{projects.length}</span>
            <span className="section-bar__sep"> PROYEK</span>
          </span>
        }
      />

      {/* Hero Block */}
      <div className="work-hero-block">
        <h1 className="work-hero-title">
          <span className="work-hero-title-dark">Semua karya,</span>{" "}
          <span className="work-hero-title-muted">dari dekat.</span>
        </h1>
        <p className="work-hero-desc">
          Kumpulan proyek web &amp; mobile yang kami bangun. Buka salah satunya untuk melihat proyek selengkapnya.
        </p>

        {/* Filter Chips: only rendered if >= 2 distinct categories */}
        {distinctCategories.length >= 2 && (
          <div className="work-chips-row" role="group" aria-label="Filter kategori proyek">
            <button
              type="button"
              className={`chip work-chip ${selectedCategory === "semua" ? "chip--active work-chip--active" : ""}`}
              aria-pressed={selectedCategory === "semua"}
              onClick={() => handleSelectCategory("semua")}
            >
              <span>Semua</span>
              <span className="chip-count work-chip-count">{projects.length}</span>
            </button>
            {distinctCategories.map((cat) => {
              const catSlug = cat.toLowerCase().replace(/\s+/g, "-");
              const isSelected = selectedCategory === catSlug || selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`chip work-chip ${isSelected ? "chip--active work-chip--active" : ""}`}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="chip-count work-chip-count">{categoryCounts[cat]}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Screen-reader announcement for results count */}
        <div className="sr-only" aria-live="polite">
          Menampilkan {filteredProjects.length} proyek
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="work-grid">
        {filteredProjects.map((proj, idx) => {
          const cover = proj.media.find((m) => m.type === "image") || proj.media[0];
          return (
            <Link
              key={proj.slug}
              href={`/work/${proj.slug}`}
              className="card-v2 work-card group"
            >
              <div className="work-card-media-wrap">
                <Image
                  src={cover?.src || ""}
                  alt={proj.title}
                  width={1120}
                  height={700}
                  quality={92}
                  priority={idx < 3}
                  loading={idx < 3 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="work-card-img"
                />
                {proj.isNew && (
                  <span className="work-badge-new">
                    <span className="work-badge-dot" aria-hidden="true" />
                    BARU
                  </span>
                )}
              </div>
              <div className="work-card-caption">
                <span className="work-card-title">{proj.title}</span>
                {proj.category && (
                  <span className="work-card-cat">{proj.category}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
