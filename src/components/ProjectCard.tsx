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
        <div
          className="rounded-[4px] overflow-hidden relative"
          style={{ aspectRatio: "16/10" }}
          data-protected
        >
          <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.5,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <Image
              src={project.imagePath}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={85}
              draggable={false}
            />
          </motion.div>
          {/* Overlay text */}
          <div className="absolute bottom-0 left-0 p-4 z-10">
            <p className="text-[13px] font-bold uppercase text-white drop-shadow-md">
              *{project.title}
            </p>
            <p className="text-[11px] mt-0.5 text-white opacity-60 drop-shadow-md">
              {t(project.descriptionKey)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
