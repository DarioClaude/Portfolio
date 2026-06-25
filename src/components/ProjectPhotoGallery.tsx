"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const GAP = 6;
const L_RATIO = 3 / 2;
const P_RATIO = 2 / 3;

const DESKTOP_PATTERNS = [
  ["L", "P", "L", "P"],
  ["P", "L", "P", "L"],
  ["L", "P", "P", "L"],
  ["P", "L", "L", "P"],
];

const MOBILE_PATTERNS = [
  ["L", "P", "P"],
  ["P", "L", "P"],
  ["P", "P", "L"],
  ["L", "P", "P"],
  ["P", "L", "P"],
  ["P", "P", "L"],
];

/* ------------------------------------------------------------------ */
/*  Build rows with source-image tracking                             */
/* ------------------------------------------------------------------ */

type Cell = { img: GalleryImage; srcIndex: number };

function buildRows(
  images: GalleryImage[],
  patterns: string[][],
): Cell[][] {
  const landscapes: Cell[] = [];
  const portraits: Cell[] = [];

  images.forEach((img, i) => {
    if (img.orientation === "landscape") {
      landscapes.push({ img, srcIndex: i });
    } else {
      portraits.push({ img, srcIndex: i });
    }
  });

  // All same orientation: chunk into rows, no duplicates
  if (landscapes.length === 0 || portraits.length === 0) {
    const pool: Cell[] = images.map((img, i) => ({ img, srcIndex: i }));
    const cols = patterns[0].length;
    const rows: Cell[][] = [];
    for (let i = 0; i < pool.length; i += cols) {
      rows.push(pool.slice(i, i + cols));
    }
    return rows;
  }

  // Mixed: cycle patterns, stop when all photos used
  let li = 0;
  let pi = 0;
  let used = 0;
  const total = images.length;
  const rows: Cell[][] = [];
  let patIdx = 0;

  while (used < total) {
    const pattern = patterns[patIdx % patterns.length];
    const row: Cell[] = [];

    for (const type of pattern) {
      if (used >= total) break;
      if (type === "L" && li < landscapes.length) {
        row.push(landscapes[li++]);
        used++;
      } else if (type === "P" && pi < portraits.length) {
        row.push(portraits[pi++]);
        used++;
      } else if (li < landscapes.length) {
        row.push(landscapes[li++]);
        used++;
      } else if (pi < portraits.length) {
        row.push(portraits[pi++]);
        used++;
      }
    }

    if (row.length > 0) rows.push(row);
    patIdx++;
  }

  return rows;
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                          */
/* ------------------------------------------------------------------ */

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (delta: number) => void;
}

function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number>(0);
  const isTouch = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const LERP = 0.08;

  // Detect touch device on mount
  useEffect(() => {
    isTouch.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  // Escape & arrow keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onNavigate(-1);
      else if (e.key === "ArrowRight") onNavigate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNavigate]);

  // Tilt animation loop
  useEffect(() => {
    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * LERP;
      currentY.current += (targetY.current - currentY.current) * LERP;

      const el = imgRef.current;
      if (el) {
        el.style.transform = `perspective(800px) rotateX(${currentY.current}deg) rotateY(${currentX.current}deg)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // Reset tilt when navigating to a new image
  useEffect(() => {
    targetX.current = 0;
    targetY.current = 0;
  }, [index]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    targetX.current = (x - 0.5) * 6;
    targetY.current = -(y - 0.5) * 6;
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetX.current = 0;
    targetY.current = 0;
  }, []);

  const image = images[index];
  if (!image) return null;

  const isLandscape = image.orientation === "landscape";

  // Compute display size
  // Landscape: width = min(80vw, 900px), height from ratio
  // Portrait:  height = min(75vh, 720px), width from ratio
  const sizeStyle: React.CSSProperties = isLandscape
    ? {
        width: isMobile ? "min(88vw, 900px)" : "min(80vw, 900px)",
        height: "auto",
        maxHeight: "75vh",
        aspectRatio: "auto",
      }
    : {
        height: isMobile ? "min(71vh, 684px)" : "min(75vh, 720px)",
        width: "auto",
        maxWidth: "80vw",
        aspectRatio: "auto",
      };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={imgRef}
        className="relative"
        style={{
          ...sizeStyle,
          willChange: "transform",
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={isLandscape ? 1800 : 800}
            height={isLandscape ? 1200 : 1200}
            className="w-full h-full object-contain"
            sizes="min(80vw, 900px)"
            quality={90}
            draggable={false}
            priority
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
            <span className="text-sm text-neutral-400 font-medium">
              {isLandscape ? "3:2" : "2:3"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main gallery component                                            */
/* ------------------------------------------------------------------ */

export default function ProjectPhotoGallery({ images }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Track container width via ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Track mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleNavigate = useCallback(
    (delta: number) => {
      setLightboxIndex((prev) => {
        if (prev === null) return null;
        const next = prev + delta;
        if (next < 0) return images.length - 1;
        if (next >= images.length) return 0;
        return next;
      });
    },
    [images.length],
  );

  if (images.length === 0) return null;

  const patterns = isMobile ? MOBILE_PATTERNS : DESKTOP_PATTERNS;
  const rows = buildRows(images, patterns);

  return (
    <>
      <div ref={containerRef} className="w-full">
        {width > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            {rows.map((row, ri) => {
              const ratioSum = row.reduce(
                (s, cell) =>
                  s +
                  (cell.img.orientation === "landscape" ? L_RATIO : P_RATIO),
                0,
              );
              const rawH = (width - (row.length - 1) * GAP) / ratioSum;
              const fullCols = rows[0].length;
              let h = rawH;
              if (row.length < fullCols) {
                const fullRatioSum = rows[0].reduce(
                  (s, cell) =>
                    s +
                    (cell.img.orientation === "landscape" ? L_RATIO : P_RATIO),
                  0,
                );
                h = Math.min(rawH, (width - (fullCols - 1) * GAP) / fullRatioSum);
              }

              return (
                <div key={ri} style={{ display: "flex", gap: GAP }}>
                  {row.map((cell, ci) => {
                    const ratio =
                      cell.img.orientation === "landscape"
                        ? L_RATIO
                        : P_RATIO;
                    const w = h * ratio;
                    return (
                      <div
                        key={`${ri}-${ci}`}
                        style={{
                          width: w,
                          height: h,
                          flexShrink: 0,
                          cursor: "pointer",
                        }}
                        onClick={() => setLightboxIndex(cell.srcIndex)}
                      >
                        {cell.img.src ? (
                          <Image
                            src={cell.img.src}
                            alt={cell.img.alt}
                            width={Math.round(w)}
                            height={Math.round(h)}
                            className="object-cover w-full h-full"
                            sizes={`${Math.round(w)}px`}
                            quality={85}
                            draggable={false}
                            data-protected
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                            <span className="text-sm text-neutral-400 font-medium">
                              {cell.img.orientation === "landscape"
                                ? "3:2"
                                : "2:3"}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {lightboxIndex !== null && createPortal(
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />,
        document.body,
      )}
    </>
  );
}
