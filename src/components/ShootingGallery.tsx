"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { GalleryImage } from "@/lib/projects";

function GalleryItem({ image, index }: { image: GalleryImage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-[4px] group"
      style={{
        aspectRatio: image.orientation === "landscape" ? "3/2" : "2/3",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      data-protected
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={90}
        draggable={false}
      />
    </motion.div>
  );
}

/**
 * Builds a harmonious grid from a mix of landscape + portrait images.
 *
 * Row patterns (repeating):
 *  - Row A: 1 landscape full-width
 *  - Row B: 2 portraits side by side
 *  - Row C: 1 portrait + 1 landscape (or vice versa)
 *  - Row D: 1 landscape full-width
 *  - Row E: 1 landscape + 1 portrait (or vice versa)
 *
 * The grid uses CSS grid with 2 columns. Landscape full-width spans 2 cols.
 * Two portraits sit in 1 col each. Mixed rows use fr ratios.
 */
export default function ShootingGallery({ images }: { images: GalleryImage[] }) {
  if (!images || images.length === 0) return null;

  // Separate images into rows for a balanced layout
  const rows: GalleryImage[][] = [];
  let i = 0;

  while (i < images.length) {
    const current = images[i];
    const next = images[i + 1];

    if (current.orientation === "landscape" && (!next || next.orientation === "landscape")) {
      // Full-width landscape
      rows.push([current]);
      i += 1;
    } else if (current.orientation === "portrait" && next?.orientation === "portrait") {
      // Two portraits side by side
      rows.push([current, next]);
      i += 2;
    } else if (current.orientation === "landscape" && next?.orientation === "portrait") {
      // Landscape + portrait
      rows.push([current, next]);
      i += 2;
    } else if (current.orientation === "portrait" && next?.orientation === "landscape") {
      // Portrait + landscape
      rows.push([current, next]);
      i += 2;
    } else {
      // Fallback: single image
      rows.push([current]);
      i += 1;
    }
  }

  let imageIndex = 0;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {rows.map((row, rowIdx) => {
        if (row.length === 1) {
          // Full-width single image
          const img = row[0];
          const idx = imageIndex++;
          return (
            <div key={rowIdx}>
              <GalleryItem image={img} index={idx} />
            </div>
          );
        }

        // Two images side by side
        const [a, b] = row;
        const idxA = imageIndex++;
        const idxB = imageIndex++;

        // Calculate flex ratios based on aspect ratios
        // Landscape = 3:2 (1.5), Portrait = 2:3 (0.667)
        // For equal height, width ratio = aspectRatio_a / (aspectRatio_a + aspectRatio_b)
        const arA = a.orientation === "landscape" ? 3 / 2 : 2 / 3;
        const arB = b.orientation === "landscape" ? 3 / 2 : 2 / 3;
        const flexA = arA / (arA + arB);
        const flexB = arB / (arA + arB);

        return (
          <div key={rowIdx} className="flex gap-3 md:gap-4">
            <div style={{ flex: flexA }}>
              <GalleryItem image={a} index={idxA} />
            </div>
            <div style={{ flex: flexB }}>
              <GalleryItem image={b} index={idxB} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
