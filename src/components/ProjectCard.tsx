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
        className="block group"
        data-cursor-hover
      >
        <div className="relative rounded-lg overflow-hidden aspect-[3/4] border border-black/10">
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
            <span className="relative inline-flex items-center justify-center font-sans font-normal tracking-normal text-[9px] md:text-[11px] px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-md overflow-hidden bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out group-hover:bg-white/25 group-hover:border-white/40 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
              <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-x-2">
                {t(project.titleKey)}
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute right-1.5 md:right-2 opacity-0 translate-x-6 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 text-[9px] md:text-[11px]"
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
