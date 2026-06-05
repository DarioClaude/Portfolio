"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

const AUTO_INTERVAL = 4500;

// Landscape: 3:2 ratio — 900×600 optimal
// Portrait: 2:3 ratio — 480×720 optimal
const LANDSCAPE_W = 900;
const LANDSCAPE_H = 600;
const PORTRAIT_W = 480;
const PORTRAIT_H = 720;

export default function ImageSlideshow({ images }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, AUTO_INTERVAL);
  }, [images.length]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
    resetTimer();
  }, [images.length, resetTimer]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    resetTimer();
  }, [images.length, resetTimer]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  if (images.length === 0) return null;

  const current = images[index];
  const isLandscape = current.orientation === "landscape";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: "calc(100vh - 260px)", minHeight: "360px" }}
    >
      {/* Left arrow */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
        data-cursor-hover
        aria-label="Previous"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Image container — scales with viewport, stays sharp */}
      <div
        className="relative overflow-hidden"
        style={{
          width: isLandscape
            ? "min(60vw, 900px)"
            : "min(32vw, 480px)",
          height: isLandscape
            ? "min(40vw, 600px)"
            : "min(48vw, 720px)",
          maxHeight: "calc(100vh - 300px)",
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${current.src}-${index}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={isLandscape ? LANDSCAPE_W : PORTRAIT_W}
              height={isLandscape ? LANDSCAPE_H : PORTRAIT_H}
              className="object-cover w-full h-full rounded-[3px]"
              sizes={isLandscape ? "(max-width: 768px) 85vw, 60vw" : "(max-width: 768px) 70vw, 32vw"}
              quality={92}
              priority
              draggable={false}
              data-protected
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right arrow */}
      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
        data-cursor-hover
        aria-label="Next"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] tracking-[1px] text-[#9CA3AF] font-medium tabular-nums">
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}
