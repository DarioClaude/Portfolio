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

const offsets = [0, -20, 10];
const speeds = [1, 0.7, 0.9];

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
      <div ref={stripRef} className="flex gap-8 will-change-transform" style={{ width: "max-content" }}>
        {doubled.map((img, i) => {
          const isLandscape = img.orientation === "landscape";
          const w = isLandscape ? 340 : 240;
          const h = isLandscape ? 227 : 320;

          return (
            <div
              key={`${img.src}-${i}`}
              className="flex-shrink-0 rounded-lg overflow-hidden shadow-md"
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
        <div className="grid grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, i) => {
            const isLandscape = i % 3 !== 0;
            const w = isLandscape ? 340 : 240;
            const h = isLandscape ? 227 : 320;
            return (
              <div
                key={i}
                className="rounded-lg bg-neutral-200 animate-pulse"
                style={{ width: w, height: h }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 py-8 overflow-hidden">
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
