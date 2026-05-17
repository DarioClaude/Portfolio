"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { GalleryImage } from "@/lib/projects";

function GalleryItem({ image, index }: { image: GalleryImage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-[4px] group break-inside-avoid mb-5 md:mb-6"
      style={{
        aspectRatio: image.orientation === "landscape" ? "3/2" : "2/3",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.04,
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      data-protected
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, 33vw"
        quality={100}
        unoptimized
        draggable={false}
      />
    </motion.div>
  );
}

export default function ShootingGallery({ images }: { images: GalleryImage[] }) {
  if (!images || images.length === 0) return null;

  return (
    <div
      className="max-w-5xl mx-auto"
      style={{
        columnCount: 3,
        columnGap: "clamp(12px, 1.5vw, 20px)",
        padding: "0 clamp(16px, 3vw, 24px)",
      }}
    >
      {images.map((image, i) => (
        <GalleryItem key={i} image={image} index={i} />
      ))}
    </div>
  );
}
