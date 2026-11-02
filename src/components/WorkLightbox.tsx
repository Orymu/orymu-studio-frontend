"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ProjectMedia } from "@/data/projects";
import { useMotion } from "@/components/MotionProvider";

export interface WorkLightboxProps {
  isOpen: boolean;
  currentIndex: number;
  media: ProjectMedia[];
  projectTitle: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function WorkLightbox({
  isOpen,
  currentIndex,
  media,
  projectTitle,
  onClose,
  onNavigate,
  triggerRef,
}: WorkLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const { stopScroll, startScroll } = useMotion();

  const total = media.length;
  const currentItem = media[currentIndex] || media[0];

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    }, 50);
  }, [onClose, triggerRef]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + total) % total;
    onNavigate(prevIndex);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % total;
    onNavigate(nextIndex);
  }, [currentIndex, total, onNavigate]);

  // Open / Close dialog with showModal
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.documentElement.style.overflow = "hidden";
      stopScroll();
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.documentElement.style.overflow = "";
      startScroll();
    }

    return () => {
      document.documentElement.style.overflow = "";
      startScroll();
    };
  }, [isOpen, stopScroll, startScroll]);

  // Reset scroll to top on media change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || total <= 1) return;
    const nextIdx = (currentIndex + 1) % total;
    const prevIdx = (currentIndex - 1 + total) % total;
    [nextIdx, prevIdx].forEach((idx) => {
      const item = media[idx];
      if (item && item.type === "image") {
        const img = new window.Image();
        img.src = item.src;
      }
    });
  }, [isOpen, currentIndex, total, media]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, handlePrev, handleNext]);

  // Touch swipe handling (50px threshold)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Only swipe if horizontal move is greater than vertical move and exceeds 50px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Close when clicking directly on dialog backdrop
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="work-lightbox"
      onClick={handleDialogClick}
      onCancel={(e) => {
        e.preventDefault();
        handleClose();
      }}
      aria-label={`${projectTitle} — tampilan ${currentIndex + 1} dari ${total}`}
    >
      {/* Screen reader live announcement */}
      <div className="sr-only" aria-live="polite">
        Tampilan {currentIndex + 1} dari {total}
      </div>

      {/* Top Bar (height 72px, padding 0 24px) */}
      <header className="work-lightbox-header">
        <div className="work-lightbox-title" title={projectTitle}>
          {projectTitle}
        </div>

        <div className="work-lightbox-counter-pill">
          {currentIndex + 1} / {total}
        </div>

        <button
          type="button"
          className="work-lightbox-close-btn"
          onClick={handleClose}
          aria-label="Tutup galeri"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </header>

      {/* Main Body */}
      <div
        ref={bodyRef}
        className="work-lightbox-body"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="work-lightbox-media-wrap">
          {currentItem.type === "video" ? (
            <video
              src={currentItem.src}
              poster={currentItem.poster}
              controls
              autoPlay
              muted
              playsInline
              className="work-lightbox-video"
            />
          ) : (
            <Image
              src={currentItem.src}
              alt={`${projectTitle} — tampilan ${currentIndex + 1}`}
              width={currentItem.width}
              height={currentItem.height}
              priority
              quality={95}
              className="work-lightbox-img"
              sizes="100vw"
            />
          )}
        </div>
      </div>

      {/* Navigation Buttons (Desktop fixed side, Mobile bottom bar) */}
      {total > 1 && (
        <div className="work-lightbox-nav">
          <button
            type="button"
            className="work-lightbox-nav-btn work-lightbox-nav-btn--prev"
            onClick={handlePrev}
            aria-label="Tampilan sebelumnya"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="work-lightbox-nav-btn work-lightbox-nav-btn--next"
            onClick={handleNext}
            aria-label="Tampilan berikutnya"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </dialog>
  );
}
