"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

const AUTO_INTERVAL = 4500;

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

  const arrowBtn = "flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200";

  return (
    <div className="flex flex-col items-center">
      {/* Mobile: arrows + counter row above image */}
      <div className="flex md:hidden items-center justify-center gap-4 mb-4">
        <button
          onClick={goPrev}
          className={`${arrowBtn} w-9 h-9`}
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="text-[11px] tracking-[1px] text-[#9CA3AF] font-medium tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <button
          onClick={goNext}
          className={`${arrowBtn} w-9 h-9`}
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Image area */}
      <div
        className="relative flex items-center justify-center w-full"
        style={{ height: "calc(100vh - 260px)", minHeight: "360px" }}
      >
        {/* Desktop: side arrows */}
        <button
          onClick={goPrev}
          className={`${arrowBtn} absolute left-8 z-10 w-12 h-12 hidden md:flex`}
          data-cursor-hover
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Image container */}
        <div
          className="relative overflow-hidden"
          style={{
            width: isLandscape
              ? "min(90vw, 900px)"
              : "min(65vw, 480px)",
            height: isLandscape
              ? "min(60vw, 600px)"
              : "min(90vw, 720px)",
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
                sizes={isLandscape ? "(max-width: 768px) 90vw, 60vw" : "(max-width: 768px) 65vw, 32vw"}
                quality={92}
                priority
                draggable={false}
                data-protected
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: side arrow right */}
        <button
          onClick={goNext}
          className={`${arrowBtn} absolute right-8 z-10 w-12 h-12 hidden md:flex`}
          data-cursor-hover
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Desktop: counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] tracking-[1px] text-[#9CA3AF] font-medium tabular-nums hidden md:block">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
