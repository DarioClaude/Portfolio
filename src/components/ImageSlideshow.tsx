"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

const AUTO_INTERVAL = 5000;
const CARD_H = 520;
const LANDSCAPE_RATIO = 3 / 2;
const PORTRAIT_RATIO = 2 / 3;

function getCardWidth(orientation: "landscape" | "portrait") {
  return orientation === "landscape"
    ? Math.round(CARD_H * LANDSCAPE_RATIO)
    : Math.round(CARD_H * PORTRAIT_RATIO);
}

export default function ImageSlideshow({ images }: Props) {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const len = images.length;

  const go = useCallback(
    (dir: number) => {
      setActive((prev) => ((prev + dir) % len + len) % len);
    },
    [len],
  );

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), AUTO_INTERVAL);
  }, [go]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { go(1); resetTimer(); }
      if (e.key === "ArrowLeft") { go(-1); resetTimer(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go, resetTimer]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < 5 && Math.abs(e.deltaY) < 5) return;
      e.preventDefault();
      const dir = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      go(dir > 0 ? 1 : -1);
      resetTimer();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go, resetTimer]);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragDelta.current = e.clientX - dragStartX.current;
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 60;
    if (dragDelta.current < -threshold) { go(1); resetTimer(); }
    else if (dragDelta.current > threshold) { go(-1); resetTimer(); }
  };

  if (len === 0) return null;

  const visibleRange = 3;
  const cards: { idx: number; offset: number }[] = [];
  for (let d = -visibleRange; d <= visibleRange; d++) {
    cards.push({ idx: ((active + d) % len + len) % len, offset: d });
  }

  return (
    <div className="flex flex-col items-center select-none">
      {/* Mobile controls */}
      <div className="flex md:hidden items-center justify-center gap-4 mb-4">
        <button
          onClick={() => { go(-1); resetTimer(); }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E7EB] text-[#1A1A1A] transition-all duration-200"
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="text-[11px] tracking-[1px] text-[#9CA3AF] font-medium tabular-nums">
          {String(active + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
        </span>
        <button
          onClick={() => { go(1); resetTimer(); }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E7EB] text-[#1A1A1A] transition-all duration-200"
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* 3D Carousel */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{
          height: `min(${CARD_H + 40}px, calc(100vh - 260px))`,
          perspective: "1200px",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {cards.map(({ idx, offset }) => {
          const img = images[idx];
          const w = getCardWidth(img.orientation);
          const absOffset = Math.abs(offset);
          const scale = offset === 0 ? 1 : Math.max(0.55, 1 - absOffset * 0.15);
          const translateX = offset * (w * 0.55 + 40);
          const translateZ = offset === 0 ? 0 : -absOffset * 120;
          const blur = offset === 0 ? 0 : Math.min(absOffset * 3, 8);
          const opacity = offset === 0 ? 1 : Math.max(0.3, 1 - absOffset * 0.25);
          const zIndex = visibleRange - absOffset;

          return (
            <div
              key={`${idx}-${offset}`}
              className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
              style={{
                width: w,
                height: CARD_H,
                transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
                zIndex,
                filter: blur > 0 ? `blur(${blur}px)` : "none",
                opacity,
                pointerEvents: offset === 0 ? "auto" : "none",
              }}
              onClick={() => {
                if (offset !== 0) {
                  go(offset);
                  resetTimer();
                }
              }}
            >
              <div
                className="w-full h-full rounded-[3px] overflow-hidden shadow-lg"
                data-protected
              >
                {img.src ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={w}
                    height={CARD_H}
                    className="object-cover w-full h-full pointer-events-none select-none"
                    sizes={`${w}px`}
                    quality={offset === 0 ? 92 : 75}
                    priority={absOffset <= 1}
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                    <span className="text-sm text-neutral-400 font-medium select-none">
                      {img.orientation === "landscape" ? "3:2" : "2:3"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop counter */}
      <div className="hidden md:block mt-4 text-[11px] tracking-[1px] text-[#9CA3AF] font-medium tabular-nums">
        {String(active + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
      </div>
    </div>
  );
}
