"use client";

import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";

export default function ProjectGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-5 md:px-10">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
