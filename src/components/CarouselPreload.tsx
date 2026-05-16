"use client";

import { useEffect } from "react";

const CAROUSEL_IMAGES = Array.from({ length: 26 }, (_, i) =>
  `/images/carousel/carousel-${String(i + 1).padStart(2, "0")}.jpg`
);

export default function CarouselPreload() {
  useEffect(() => {
    CAROUSEL_IMAGES.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}
