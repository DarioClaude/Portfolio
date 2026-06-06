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
  gallery: GalleryImage[];
}

function GalleryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="4" rx="0.5" fill="currentColor" />
      <rect x="9" y="1" width="6" height="4" rx="0.5" fill="currentColor" />
      <rect x="1" y="7" width="6" height="4" rx="0.5" fill="currentColor" />
      <rect x="9" y="7" width="6" height="4" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function CarouselIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3" width="4" height="10" rx="0.5" fill="currentColor" opacity="0.35" />
      <rect x="10.5" y="3" width="4" height="10" rx="0.5" fill="currentColor" opacity="0.35" />
      <rect x="4.5" y="1.5" width="7" height="13" rx="0.5" fill="currentColor" />
    </svg>
  );
}

type ViewMode = "gallery" | "carousel";

function ViewToggle({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  return (
    <div
      className="relative inline-flex items-center rounded bg-[#F3F4F6] p-[3px]"
      style={{ height: 32 }}
    >
      <div
        className="absolute top-[3px] bottom-[3px] rounded bg-[#1A1A1A] transition-transform duration-300 ease-out"
        style={{
          width: "calc(50% - 3px)",
          left: 3,
          transform: mode === "carousel" ? "translateX(100%)" : "translateX(0)",
        }}
      />
      <button
        onClick={() => onChange("gallery")}
        className={`relative z-10 flex items-center justify-center gap-1.5 px-3 h-full rounded text-[11px] font-medium tracking-wide transition-colors duration-300 ${
          mode === "gallery" ? "text-white" : "text-[#9CA3AF]"
        }`}
      >
        <GalleryIcon />
      </button>
      <button
        onClick={() => onChange("carousel")}
        className={`relative z-10 flex items-center justify-center gap-1.5 px-3 h-full rounded text-[11px] font-medium tracking-wide transition-colors duration-300 ${
          mode === "carousel" ? "text-white" : "text-[#9CA3AF]"
        }`}
      >
        <CarouselIcon />
      </button>
    </div>
  );
}

export default function ProjectDetailClient({ slug, gallery }: Props) {
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
      <section style={{ padding: "clamp(96px, 10vw, 120px) clamp(20px, 3vw, 40px) 80px" }}>
        {!isMobile && gallery.length > 0 && (
          <div className="flex justify-end" style={{ marginBottom: 16 }}>
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

      <div className="flex justify-between items-end" style={{ padding: "clamp(24px, 3vw, 40px) clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)" }}>
        <WorkCopyright />
        <WorkIdentity />
      </div>
    </>
  );
}
