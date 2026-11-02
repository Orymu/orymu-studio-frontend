"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ProjectMedia } from "@/data/projects";

interface WorkMediaItemProps {
  media: ProjectMedia;
  index: number;
  total: number;
  projectTitle: string;
  isFirst: boolean;
  onOpenLightbox: (index: number, triggerEl: HTMLElement | null) => void;
}

export default function WorkMediaItem({
  media,
  index,
  total,
  projectTitle,
  isFirst,
  onOpenLightbox,
}: WorkMediaItemProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isTall = media.height > 2.2 * media.width;

  useEffect(() => {
    if (media.type !== "video" || !videoRef.current) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      if (!videoRef.current) return;
      if (mediaQuery.matches) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    };
    handleMotionChange();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
      return () => mediaQuery.removeEventListener("change", handleMotionChange);
    }
  }, [media.type]);

  return (
    <div className="work-detail-media-block">
      <div className="work-detail-media-label">
        TAMPILAN {index + 1}
      </div>

      <div
        className={`work-detail-media-container ${
          isTall ? "work-detail-media-container--clamped" : ""
        }`}
      >
        <button
          ref={btnRef}
          type="button"
          className="work-detail-media-btn"
          onClick={() => onOpenLightbox(index, btnRef.current)}
          aria-label={`Perbesar tampilan ${index + 1} dari ${total}: ${projectTitle}`}
        >
          {media.type === "video" ? (
            <video
              ref={videoRef}
              src={media.src}
              poster={media.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="work-detail-video"
              autoPlay
            />
          ) : (
            <Image
              src={media.src}
              alt={`${projectTitle} — tampilan ${index + 1}`}
              width={media.width}
              height={media.height}
              priority={isFirst}
              loading={isFirst ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="work-detail-img"
            />
          )}

          {/* Hover / focus expand badge */}
          <div className="work-detail-expand-badge" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </div>
        </button>

        {isTall && (
          <div className="work-detail-clamp-overlay">
            <button
              type="button"
              className="btn btn--light btn--sm"
              onClick={() => onOpenLightbox(index, btnRef.current)}
            >
              <span className="btn__label">Lihat penuh</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
