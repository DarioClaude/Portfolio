"use client";

import { useRef } from "react";
import Image from "next/image";
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
          {project.imagePath ? (
            <Image
              src={project.imagePath}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          )}

          {/* Delicate gradient mask — soft light fade with no hard edge */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-1/5 z-10 bg-gradient-to-t from-white to-transparent backdrop-blur-[2px]"
          />

          {/* Project info overlay — title (left) + arrow (right) */}
          <div className="absolute bottom-0 left-0 w-full z-20 flex justify-between items-center px-3 py-2.5 md:px-4 md:py-3">
            <span className="font-sans text-xs md:text-sm font-medium text-[#1a1a1a] tracking-tight">
              {project.title}
            </span>
            <span className="text-[#1a1a1a] opacity-60 translate-x-1 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
