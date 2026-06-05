"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

const COLUMN_PATTERNS = [
  [
    { w: 120, h: 120 },
    { w: 250, h: 250 },
    { w: 120, h: 120 },
    { w: 250, h: 250 },
  ],
  [
    { w: 300, h: 200 },
    { w: 300, h: 200 },
    { w: 300, h: 200 },
    { w: 300, h: 200 },
  ],
  [
    { w: 100, h: 70 },
    { w: 300, h: 200 },
    { w: 100, h: 70 },
    { w: 300, h: 200 },
  ],
  [
    { w: 250, h: 350 },
    { w: 250, h: 350 },
    { w: 250, h: 350 },
    { w: 250, h: 350 },
  ],
];

function distributeImages(images: GalleryImage[], colCount: number) {
  const cols: GalleryImage[][] = Array.from({ length: colCount }, () => []);
  images.forEach((img, i) => cols[i % colCount].push(img));
  return cols;
}

function ScrollColumn({
  images,
  pattern,
}: {
  images: GalleryImage[];
  pattern: { w: number; h: number }[];
}) {
  const colRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = colRef.current;
    if (!el) return;
    const halfH = el.scrollHeight / 2;
    el.style.setProperty("--scroll-h", `${halfH}px`);
  }, [images]);

  const items = images.length > 0 ? images : pattern.map((_, i) => ({ src: "", alt: `placeholder-${i}`, orientation: "landscape" as const }));
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden flex-1" style={{ minWidth: 0 }}>
      <div
        ref={colRef}
        className="flex flex-col infinite-scroll-col"
        style={{ gap: 170 }}
      >
        {doubled.map((img, i) => {
          const size = pattern[i % pattern.length];
          const hasImage = img.src !== "";

          return (
            <div
              key={`${img.src || "ph"}-${i}`}
              className="flex-shrink-0 rounded-[3px] overflow-hidden mx-auto"
              style={{
                width: size.w,
                height: size.h,
                background: hasImage ? undefined : "#e5e7eb",
              }}
              data-protected
            >
              {hasImage && (
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={size.w}
                  height={size.h}
                  className="object-cover w-full h-full pointer-events-none select-none"
                  sizes={`${size.w}px`}
                  quality={85}
                  draggable={false}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function InfiniteImageGrid({ images }: Props) {
  const cols = distributeImages(images, 4);

  return (
    <div
      className="overflow-hidden flex justify-center"
      style={{ height: "70vh", padding: "0 clamp(20px, 3vw, 40px)" }}
    >
      <div className="flex w-full" style={{ gap: "clamp(40px, 6vw, 100px)", maxWidth: 1400 }}>
        {COLUMN_PATTERNS.map((pattern, i) => (
          <ScrollColumn
            key={i}
            images={cols[i] || []}
            pattern={pattern}
          />
        ))}
      </div>
    </div>
  );
}
