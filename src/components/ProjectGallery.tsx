"use client";

import { motion, AnimatePresence } from "framer-motion";
import InfiniteImageGrid from "./InfiniteImageGrid";
import ImageSlideshow from "./ImageSlideshow";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
  mode: "grid" | "slideshow";
}

export function GalleryToggle({
  mode,
  setMode,
}: {
  mode: "grid" | "slideshow";
  setMode: (m: "grid" | "slideshow") => void;
}) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB]">
      <button
        onClick={() => setMode("grid")}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
          mode === "grid"
            ? "bg-[#1A1A1A] text-white shadow-sm"
            : "text-[#9CA3AF] hover:text-[#1A1A1A]"
        }`}
        data-cursor-hover
        aria-label="Grid view"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="0.5" y="0.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="8.5" y="0.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="0.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="8.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <button
        onClick={() => setMode("slideshow")}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
          mode === "slideshow"
            ? "bg-[#1A1A1A] text-white shadow-sm"
            : "text-[#9CA3AF] hover:text-[#1A1A1A]"
        }`}
        data-cursor-hover
        aria-label="Slideshow view"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
    </div>
  );
}

export default function ProjectGallery({ images, mode }: Props) {
  if (images.length === 0) return <InfiniteImageGrid images={images} />;

  return (
    <AnimatePresence mode="wait">
      {mode === "grid" ? (
        <motion.div
          key="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <InfiniteImageGrid images={images} />
        </motion.div>
      ) : (
        <motion.div
          key="slideshow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ImageSlideshow images={images} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
