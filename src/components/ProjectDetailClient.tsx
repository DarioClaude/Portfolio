"use client";

import { useState, useEffect } from "react";
import ProjectPhotoGallery from "./ProjectPhotoGallery";
import ProjectGallery from "./ProjectGallery";
import RecentWork from "./RecentWork";
import WorkCopyright from "./WorkCopyright";
import WorkIdentity from "./WorkIdentity";
import WorkMobileScroll from "./WorkMobileScroll";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  slug: string;
  title: string;
  gallery: GalleryImage[];
}

function GalleryIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="0.5" y="0.5" width="7" height="5" rx="0.5" fill="currentColor" />
      <rect x="8.5" y="0.5" width="7" height="5" rx="0.5" fill="currentColor" />
      <rect x="0.5" y="6.5" width="5" height="7" rx="0.5" fill="currentColor" />
      <rect x="6.5" y="6.5" width="9" height="7" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function CarouselIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3.5" width="3.5" height="9" rx="0.5" fill="currentColor" opacity="0.4" />
      <rect x="11.5" y="3.5" width="3.5" height="9" rx="0.5" fill="currentColor" opacity="0.4" />
      <rect x="5" y="1" width="6" height="14" rx="0.5" fill="currentColor" />
    </svg>
  );
}

type ViewMode = "gallery" | "carousel";

function ViewToggle({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  const next = mode === "gallery" ? "carousel" : "gallery";
  return (
    <button
      onClick={() => onChange(next)}
      className="group relative inline-flex items-center gap-2 rounded overflow-hidden bg-[#1A1A1A] text-white font-sans font-normal tracking-normal text-[11px] md:text-[13px] px-3.5 py-1.5 md:px-5 md:py-2 transition-all duration-500 ease-out active:scale-[0.97] active:translate-y-[1px]"
      data-cursor-hover
    >
      <span className="relative w-[14px] h-[14px] overflow-hidden flex-shrink-0">
        <span
          className="absolute inset-0 transition-all duration-400 ease-out"
          style={{
            transform: mode === "gallery" ? "translateY(0)" : "translateY(-100%)",
            opacity: mode === "gallery" ? 1 : 0,
          }}
        >
          <GalleryIcon />
        </span>
        <span
          className="absolute inset-0 transition-all duration-400 ease-out"
          style={{
            transform: mode === "carousel" ? "translateY(0)" : "translateY(100%)",
            opacity: mode === "carousel" ? 1 : 0,
          }}
        >
          <CarouselIcon />
        </span>
      </span>
      <span className="relative h-[16px] overflow-hidden">
        <span
          className="block transition-all duration-400 ease-out"
          style={{
            transform: mode === "gallery" ? "translateY(0)" : "translateY(-100%)",
            opacity: mode === "gallery" ? 1 : 0,
          }}
        >
          Gallery
        </span>
        <span
          className="block transition-all duration-400 ease-out"
          style={{
            transform: mode === "carousel" ? "translateY(0)" : "translateY(100%)",
            opacity: mode === "carousel" ? 1 : 0,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          Carousel
        </span>
      </span>
    </button>
  );
}

export default function ProjectDetailClient({ slug, title, gallery }: Props) {
  const [mode, setMode] = useState<ViewMode>("gallery");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <WorkMobileScroll />
      <section
        style={{
          position: "relative",
          zIndex: 0,
          padding: isMobile
            ? "clamp(96px, 10vw, 120px) clamp(20px, 3vw, 40px) 40px"
            : "clamp(96px, 10vw, 120px) clamp(20px, 3vw, 40px) 80px",
        }}
      >
        {!isMobile && gallery.length > 0 && (
          <div className="flex items-end justify-between mb-8">
            <h2
              className="font-bold text-[#1A1A1A] tracking-tight leading-none uppercase whitespace-nowrap"
              style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)" }}
            >
              {title}
            </h2>
            <ViewToggle mode={mode} onChange={setMode} />
          </div>
        )}

        {mode === "gallery" || isMobile ? (
          <ProjectPhotoGallery images={gallery} />
        ) : (
          <ProjectGallery images={gallery} />
        )}
      </section>

      <RecentWork currentSlug={slug} />

      <div
        className="flex justify-between items-end"
        style={{
          padding: "0 clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)",
        }}
      >
        <WorkCopyright />
        <WorkIdentity />
      </div>
    </>
  );
}
