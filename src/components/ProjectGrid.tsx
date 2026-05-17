"use client";

import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";

export default function ProjectGrid() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4"
      style={{ gap: "clamp(12px, 1vw, 16px)", padding: "0 clamp(20px, 3vw, 40px)" }}
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
