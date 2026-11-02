import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SectionBar from "@/components/SectionBar";
import SectionDivider from "@/components/SectionDivider";
import Button from "@/components/Button";
import WorkDetailGallery from "./WorkDetailGallery";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const description =
    project.subtitle ||
    project.overview ||
    "Kumpulan proyek web & mobile yang kami bangun. Buka salah satunya untuk melihat proyek selengkapnya.";

  return {
    title: `${project.title} | Orymu Studio`,
    description,
    openGraph: {
      title: `${project.title} | Orymu Studio`,
      description,
      images: [project.media.find((m) => m.type === "image")?.src || project.media[0]?.src || ""],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const total = projects.length;

  // Deterministic 3 related projects: same category first, then cyclical
  const otherProjects = projects.filter((_, idx) => idx !== currentIndex);
  const sameCategory = otherProjects.filter((p) => p.category === project.category);
  const diffCategory = otherProjects.filter((p) => p.category !== project.category);
  const relatedProjects = [...sameCategory, ...diffCategory].slice(0, 3);

  const hasOverview = Boolean(project.overview);
  const hasScope = Boolean(project.scope && project.scope.length > 0);
  const hasHref = Boolean(project.href);
  const hasMetaOrMore = hasOverview || hasScope || hasHref || Boolean(project.category);

  return (
    <div className="work-detail-bleed">
      <div className="content-frame work-detail-container">
        {/* Section Bar */}
        <SectionBar
          leftCustom={
            <Link href="/work" className="work-detail-back-link">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="section-bar__label">SEMUA KARYA</span>
            </Link>
          }
          counterCustom={
            <span className="section-bar__counter-custom">
              <span className="section-bar__current">{currentIndex + 1}</span>
              <span className="section-bar__sep"> | </span>
              <span className="section-bar__total">{total}</span>
            </span>
          }
        />

        {/* Two-Column Area */}
        <div className="work-detail-split">
          {/* Left Column (Sticky from 1024px) */}
          <aside className="work-detail-left">
            <div className="work-detail-left-inner">
              {project.category && (
                <span className="work-detail-category-label">
                  {project.category}
                </span>
              )}

              <h1 className="work-detail-title">{project.title}</h1>

              {project.subtitle && (
                <p className="work-detail-subtitle">{project.subtitle}</p>
              )}

              {project.overview && (
                <div className="work-detail-overview-group">
                  <div className="work-detail-section-label">RINGKASAN</div>
                  <p className="work-detail-overview-text">{project.overview}</p>
                </div>
              )}

              {hasMetaOrMore && <div className="work-detail-hairline" />}

              {/* Meta Grid */}
              <div className="work-detail-meta-grid">
                {project.category && (
                  <div className="work-detail-meta-item">
                    <span className="work-detail-meta-label">KATEGORI</span>
                    <span className="work-detail-meta-val">{project.category}</span>
                  </div>
                )}
                <div className="work-detail-meta-item">
                  <span className="work-detail-meta-label">TAMPILAN</span>
                  <span className="work-detail-meta-val">{project.media.length}</span>
                </div>
              </div>

              {/* Scope Tags */}
              {hasScope && (
                <div className="work-detail-scope-group">
                  <div className="work-detail-section-label">RUANG LINGKUP</div>
                  <div className="work-detail-scope-pills">
                    {project.scope!.map((s) => (
                      <span key={s} className="work-detail-scope-pill">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Visit Site Button */}
              {project.href && (
                <div className="work-detail-cta-wrap">
                  <Button
                    variant="dark"
                    href={project.href}
                    className="work-detail-visit-btn"
                  >
                    Kunjungi Situs
                  </Button>
                </div>
              )}
            </div>
          </aside>

          {/* Right Column (Gallery previews) */}
          <section className="work-detail-right" aria-label="Galeri Tampilan">
            <WorkDetailGallery
              media={project.media}
              projectTitle={project.title}
            />
          </section>
        </div>
      </div>

      {/* Section Divider Band before Related Projects */}
      <SectionDivider />

      {/* Related Projects Section */}
      <section className="content-frame work-related-container" aria-label="Proyek Terkait">
        <SectionBar
          label="PROYEK TERKAIT"
          counterCustom={
            <span className="section-bar__counter-custom">
              <span className="section-bar__current">3</span>
            </span>
          }
        />
        <div className="work-grid work-related-grid">
          {relatedProjects.map((p) => {
            const cover = p.media.find((m) => m.type === "image") || p.media[0];
            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="card-v2 work-card group"
              >
                <div className="work-card-media-wrap">
                  <Image
                    src={cover.thumbSrc || cover.src}
                    alt={p.title}
                    width={560}
                    height={350}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="work-card-img"
                  />
                </div>
                <div className="work-card-caption">
                  <span className="work-card-title">{p.title}</span>
                  {p.category && (
                    <span className="work-card-cat">{p.category}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
