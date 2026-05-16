"use client";

import { useEffect } from "react";

const CAROUSEL_IMAGES = Array.from({ length: 26 }, (_, i) =>
  `/images/carousel/carousel-${String(i + 1).padStart(2, "0")}.jpg`
);

export default function CarouselPreload() {
  useEffect(() => {
    CAROUSEL_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.decode?.().catch(() => {});
    });
  }, []);

  return null;
}
