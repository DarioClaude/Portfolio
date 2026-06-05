"use client";

import ImageSlideshow from "./ImageSlideshow";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

export default function ProjectGallery({ images }: Props) {
  if (images.length === 0) return null;
  return <ImageSlideshow images={images} />;
}
