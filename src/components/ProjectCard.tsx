"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { useTranslation } from "@/context/LanguageContext";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useTranslation();

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
        className="block group select-none"
        data-cursor-hover
        style={{ WebkitTapHighlightColor: "transparent", WebkitTouchCallout: "none" } as React.CSSProperties}
      >
        <div className="relative rounded overflow-hidden aspect-[3/4] border border-black/10">
          {project.imagePath ? (
            <Image
              src={project.imagePath}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 animate-pulse" />
          )}

          <div className="absolute inset-x-0 bottom-0 z-20 flex items-center px-3 py-2.5 md:px-4 md:py-3">
            <span className="work-pill relative inline-flex items-center justify-center font-sans font-normal tracking-normal text-[9px] md:text-[11px] px-2.5 py-1 md:px-3 md:py-1.5 rounded-md overflow-hidden backdrop-blur-md border text-white transition-all duration-500 ease-out">
              <span className="work-pill-label inline-block transition-transform duration-500 ease-out">
                {t(project.titleKey)}
              </span>
              <span
                aria-hidden
                className="work-pill-arrow pointer-events-none absolute right-2 md:right-2.5 transition-all duration-500 ease-out text-[9px] md:text-[11px]"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
