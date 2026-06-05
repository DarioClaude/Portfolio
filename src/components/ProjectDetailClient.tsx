"use client";

import { useState } from "react";
import ProjectDetailContent from "./ProjectDetailContent";
import ProjectGallery, { GalleryToggle } from "./ProjectGallery";
import WorkCopyright from "./WorkCopyright";
import WorkIdentity from "./WorkIdentity";
import WorkMobileScroll from "./WorkMobileScroll";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  title: string;
  category: string;
  clients: string[];
  gallery: GalleryImage[];
}

export default function ProjectDetailClient({ title, category, clients, gallery }: Props) {
  const [mode, setMode] = useState<"grid" | "slideshow">("grid");

  return (
    <>
      <WorkMobileScroll />
      <section style={{ paddingTop: "clamp(78px, 8.4vw, 100px)", paddingBottom: "80px" }}>
        <ProjectDetailContent
          title={title}
          category={category}
          clients={clients}
          toggleSlot={
            gallery.length > 0 ? (
              <GalleryToggle mode={mode} setMode={setMode} />
            ) : undefined
          }
        />

        <div style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>
          <ProjectGallery images={gallery} mode={mode} />
        </div>
      </section>

      <div className="border-t border-[#E5E7EB]" />
      <div className="flex justify-between items-end" style={{ padding: "clamp(24px, 3vw, 40px) clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)" }}>
        <WorkCopyright />
        <WorkIdentity />
      </div>
    </>
  );
}
