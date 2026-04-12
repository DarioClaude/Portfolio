"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/projects";

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
        <div className="relative rounded-lg overflow-hidden aspect-[3/4]">
          {/* Image placeholder */}
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />

          {/* Progressive blur gradient — stops just above the title text */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 w-full h-20 z-10 bg-gradient-to-t from-neutral-900/90 to-transparent backdrop-blur-[2px]"
          />

          {/* Project info overlay — title (left) + arrow (right) */}
          <div className="absolute bottom-0 left-0 w-full z-20 flex justify-between items-center p-4">
            <span className="font-sans text-sm md:text-base font-normal text-white">
              {project.title}
            </span>
            <span className="text-white opacity-60 translate-x-1 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
