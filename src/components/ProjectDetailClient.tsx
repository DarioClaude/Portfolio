"use client";

import ProjectDetailContent from "./ProjectDetailContent";
import ProjectGallery from "./ProjectGallery";
import RecentWork from "./RecentWork";
import WorkCopyright from "./WorkCopyright";
import WorkIdentity from "./WorkIdentity";
import WorkMobileScroll from "./WorkMobileScroll";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  slug: string;
  title: string;
  category: string;
  clients: string[];
  gallery: GalleryImage[];
}

export default function ProjectDetailClient({ slug, title, category, clients, gallery }: Props) {
  return (
    <>
      <WorkMobileScroll />
      <section style={{ paddingTop: "clamp(78px, 8.4vw, 100px)", paddingBottom: "80px" }}>
        <ProjectDetailContent
          title={title}
          category={category}
          clients={clients}
        />

        <div style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>
          <ProjectGallery images={gallery} />
        </div>
      </section>

      <RecentWork currentSlug={slug} />

      <div className="flex justify-between items-end" style={{ padding: "clamp(24px, 3vw, 40px) clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)" }}>
        <WorkCopyright />
        <WorkIdentity />
      </div>
    </>
  );
}
