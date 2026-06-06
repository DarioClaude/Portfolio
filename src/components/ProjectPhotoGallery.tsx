"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

const GAP = 6;
const L_RATIO = 3 / 2;
const P_RATIO = 2 / 3;

const ROW_PATTERNS = [
  ["L", "P", "L", "P"],
  ["P", "L", "P", "L"],
  ["L", "P", "P", "L"],
  ["P", "L", "L", "P"],
];

function buildRows(images: GalleryImage[]) {
  const landscapes = images.filter((img) => img.orientation === "landscape");
  const portraits = images.filter((img) => img.orientation === "portrait");

  if (landscapes.length === 0 || portraits.length === 0) {
    return Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 4 }, (_, c) => images[(r * 4 + c) % images.length])
    );
  }

  let li = 0;
  let pi = 0;
  return ROW_PATTERNS.map((pattern) =>
    pattern.map((type) => {
      if (type === "L") {
        return landscapes[li++ % landscapes.length];
      }
      return portraits[pi++ % portraits.length];
    })
  );
}

export default function ProjectPhotoGallery({ images }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (images.length === 0) return null;

  const rows = buildRows(images);

  return (
    <div ref={containerRef} className="w-full">
      {width > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
          {rows.map((row, ri) => {
            const ratioSum = row.reduce(
              (s, img) => s + (img.orientation === "landscape" ? L_RATIO : P_RATIO),
              0
            );
            const h = (width - (row.length - 1) * GAP) / ratioSum;

            return (
              <div key={ri} style={{ display: "flex", gap: GAP }}>
                {row.map((img, ci) => {
                  const ratio = img.orientation === "landscape" ? L_RATIO : P_RATIO;
                  const w = h * ratio;
                  return (
                    <div key={`${ri}-${ci}`} style={{ width: w, height: h, flexShrink: 0 }}>
                      {img.src ? (
                        <Image
                          src={img.src}
                          alt={img.alt}
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
                            {img.orientation === "landscape" ? "3:2" : "2:3"}
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
  );
}
