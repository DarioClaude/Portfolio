"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import ProjectCardVisual from "./ProjectCardVisual";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="block group"
        data-cursor-hover
      >
        <div className="rounded-[4px] overflow-hidden relative" style={{ aspectRatio: "16/10" }}>
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.5,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <ProjectCardVisual project={project} />
          </motion.div>
          {/* Overlay text */}
          <div className="absolute bottom-0 left-0 p-4 z-10">
            <p
              className={`text-[13px] font-bold uppercase ${project.textColor}`}
            >
              *{project.name}
            </p>
            <p
              className={`text-[11px] mt-0.5 ${project.textColor} opacity-60`}
            >
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
