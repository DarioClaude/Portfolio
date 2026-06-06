"use client";

import ProjectPhotoGallery from "./ProjectPhotoGallery";
import RecentWork from "./RecentWork";
import WorkCopyright from "./WorkCopyright";
import WorkIdentity from "./WorkIdentity";
import WorkMobileScroll from "./WorkMobileScroll";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  slug: string;
  gallery: GalleryImage[];
}

export default function ProjectDetailClient({ slug, gallery }: Props) {
  return (
    <>
      <WorkMobileScroll />
      <section style={{ paddingTop: "clamp(96px, 10vw, 120px)", padding: "clamp(96px, 10vw, 120px) clamp(20px, 3vw, 40px) 80px" }}>
        <ProjectPhotoGallery images={gallery} />
      </section>

      <RecentWork currentSlug={slug} />

      <div className="flex justify-between items-end" style={{ padding: "clamp(24px, 3vw, 40px) clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)" }}>
        <WorkCopyright />
        <WorkIdentity />
      </div>
    </>
  );
}
