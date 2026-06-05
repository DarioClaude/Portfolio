"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

const ROW_COUNT = 3;

function generateRows(images: GalleryImage[]) {
  const rows: GalleryImage[][] = Array.from({ length: ROW_COUNT }, () => []);
  images.forEach((img, i) => {
    rows[i % ROW_COUNT].push(img);
  });
  return rows;
}

const offsets = [0, -10, 5];
const speeds = [1, 0.95, 1.05];

const sizeVariants = [
  { lw: 220, lh: 147, pw: 130, ph: 183 },
  { lw: 180, lh: 120, pw: 155, ph: 218 },
  { lw: 250, lh: 167, pw: 120, ph: 169 },
  { lw: 160, lh: 107, pw: 145, ph: 204 },
  { lw: 200, lh: 133, pw: 170, ph: 240 },
];

function ScrollRow({
  images,
  speed,
  offsetY,
}: {
  images: GalleryImage[];
  speed: number;
  offsetY: number;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const animate = () => {
      xRef.current -= 0.4 * speed;
      const halfWidth = strip.scrollWidth / 2;
      if (Math.abs(xRef.current) >= halfWidth) {
        xRef.current += halfWidth;
      }
      strip.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  const doubled = [...images, ...images];

  return (
    <div
      className="relative overflow-hidden"
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      <div ref={stripRef} className="flex will-change-transform" style={{ width: "max-content", gap: "clamp(40px, 5vw, 80px)" }}>
        {doubled.map((img, i) => {
          const isLandscape = img.orientation === "landscape";
          const variant = sizeVariants[i % sizeVariants.length];
          const w = isLandscape ? variant.lw : variant.pw;
          const h = isLandscape ? variant.lh : variant.ph;

          return (
            <div
              key={`${img.src}-${i}`}
              className="flex-shrink-0 rounded-[3px] overflow-hidden shadow-md"
              style={{ width: w, height: h }}
              data-protected
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={w}
                height={h}
                className="object-cover w-full h-full pointer-events-none select-none"
                sizes={`${w}px`}
                quality={85}
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function InfiniteImageGrid({ images }: Props) {
  const rows = generateRows(images);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="grid grid-cols-4" style={{ gap: "clamp(40px, 5vw, 80px)" }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const isLandscape = i % 3 !== 0;
            const w = isLandscape ? 200 : 140;
            const h = isLandscape ? 133 : 187;
            return (
              <div
                key={i}
                className="rounded-[3px] bg-neutral-200 animate-pulse"
                style={{ width: w, height: h }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-14 py-4 overflow-hidden">
      {rows.map((row, i) => (
        <ScrollRow
          key={i}
          images={row}
          speed={speeds[i]}
          offsetY={offsets[i]}
        />
      ))}
    </div>
  );
}
