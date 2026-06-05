"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";
import { projects } from "@/lib/projects";
import Button from "./ui/Button";

interface Props {
  currentSlug: string;
}

export default function RecentWork({ currentSlug }: Props) {
  const { t } = useTranslation();

  const others = projects
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  return (
    <section style={{ padding: "clamp(48px, 6vw, 80px) clamp(20px, 3vw, 40px) clamp(16px, 2vw, 24px)" }}>
      {/* Header row */}
      <div className="flex items-end justify-between mb-8">
        <h2
          className="font-bold text-[#1A1A1A] tracking-tight leading-none uppercase"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          {t("recentWork.title")}
        </h2>

        <Button href="/work" variant="dark" size="sm">
          {t("recentWork.viewAll")}
        </Button>
      </div>

      {/* Project cards grid */}
      <div className="grid grid-cols-3 gap-4">
        {others.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative overflow-hidden rounded-lg"
            style={{ aspectRatio: "4 / 3" }}
            data-cursor-hover
          >
            <Image
              src={project.imagePath}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="33vw"
              quality={80}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm font-bold tracking-wide">
                *{t(project.titleKey).toUpperCase()}
              </p>
              <p className="text-white/70 text-xs mt-0.5 line-clamp-1">
                {t(project.descriptionKey)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
