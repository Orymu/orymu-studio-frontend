"use client";

import React, { useState, useRef } from "react";
import { ProjectMedia } from "@/data/projects";
import WorkMediaItem from "./WorkMediaItem";
import WorkLightbox from "@/components/WorkLightbox";

interface WorkDetailGalleryProps {
  media: ProjectMedia[];
  projectTitle: string;
}

export default function WorkDetailGallery({
  media,
  projectTitle,
}: WorkDetailGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerButtonRef = useRef<HTMLElement | null>(null);

  const handleOpenLightbox = (index: number, triggerEl: HTMLElement | null) => {
    triggerButtonRef.current = triggerEl;
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <>
      <div className="work-detail-gallery">
        {media.map((item, idx) => (
          <WorkMediaItem
            key={`${item.src}-${idx}`}
            media={item}
            index={idx}
            total={media.length}
            projectTitle={projectTitle}
            isFirst={idx === 0}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </div>

      <WorkLightbox
        isOpen={lightboxIndex !== null}
        currentIndex={lightboxIndex ?? 0}
        media={media}
        projectTitle={projectTitle}
        onClose={handleCloseLightbox}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
        triggerRef={triggerButtonRef}
      />
    </>
  );
}
