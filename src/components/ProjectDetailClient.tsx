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
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="0" y="0" width="7.5" height="5" rx="0.5" fill="currentColor" />
      <rect x="8.5" y="0" width="7.5" height="5" rx="0.5" fill="currentColor" />
      <rect x="0" y="6" width="5" height="10" rx="0.5" fill="currentColor" />
      <rect x="6" y="6" width="10" height="10" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function CarouselIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="0" y="4" width="4" height="8" rx="0.5" fill="currentColor" opacity="0.3" />
      <rect x="4.5" y="2.5" width="7" height="11" rx="0.5" fill="currentColor" />
      <rect x="12" y="4" width="4" height="8" rx="0.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

type ViewMode = "gallery" | "carousel";

const TOGGLE_TRANSITION = "transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s cubic-bezier(0.4,0,0.2,1)";

function ViewToggle({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  const next = mode === "gallery" ? "carousel" : "gallery";
  const isGallery = mode === "gallery";
  return (
    <button
      onClick={() => onChange(next)}
      className="group relative inline-flex items-center gap-2.5 rounded overflow-hidden bg-[#1A1A1A] text-white font-sans font-normal tracking-normal text-[11px] md:text-[13px] px-3.5 py-1.5 md:px-5 md:py-2 active:scale-[0.97] active:translate-y-[1px]"
      data-cursor-hover
    >
      <span className="relative flex-shrink-0" style={{ width: 13, height: 13 }}>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transition: TOGGLE_TRANSITION,
            transform: isGallery ? "translateY(0)" : "translateY(-120%)",
            opacity: isGallery ? 1 : 0,
          }}
        >
          <GalleryIcon />
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transition: TOGGLE_TRANSITION,
            transform: isGallery ? "translateY(120%)" : "translateY(0)",
            opacity: isGallery ? 0 : 1,
          }}
        >
          <CarouselIcon />
        </span>
      </span>
      <span className="relative overflow-hidden" style={{ width: 60, height: "1.1em" }}>
        <span
          className="absolute inset-0 flex items-center"
          style={{
            transition: TOGGLE_TRANSITION,
            transform: isGallery ? "translateY(0)" : "translateY(-120%)",
            opacity: isGallery ? 1 : 0,
          }}
        >
          Gallery
        </span>
        <span
          className="absolute inset-0 flex items-center"
          style={{
            transition: TOGGLE_TRANSITION,
            transform: isGallery ? "translateY(120%)" : "translateY(0)",
            opacity: isGallery ? 0 : 1,
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
        {gallery.length > 0 && (
          <div className="flex items-end justify-between" style={{ marginBottom: 21 }}>
            <h2
              className="font-bold text-[#1A1A1A] tracking-tight leading-none uppercase whitespace-nowrap"
              style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)" }}
            >
              {title}
            </h2>
            {!isMobile && <ViewToggle mode={mode} onChange={setMode} />}
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
          padding: isMobile
            ? "32px clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)"
            : "0 clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)",
        }}
      >
        <div style={isMobile ? { transform: "scale(0.95)", transformOrigin: "bottom left" } : undefined}>
          <WorkCopyright />
        </div>
        <WorkIdentity />
      </div>
    </>
  );
}
