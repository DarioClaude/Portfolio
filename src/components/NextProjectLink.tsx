"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

interface Props {
  slug: string;
  title: string;
  imagePath: string;
}

export default function NextProjectLink({ slug, title, imagePath }: Props) {
  const { t } = useTranslation();

  return (
    <div className="border-t border-[#E5E7EB] dark:border-[#262626] pt-12" style={{ padding: "48px clamp(16px, 3vw, 24px) 0", marginTop: "clamp(80px, 8vw, 112px)" }}>
      <p className="text-xs uppercase tracking-[2px] text-[#9CA3AF] dark:text-[#71717a] mb-6">{t("project.next")}</p>
      <Link
        href={`/work/${slug}`}
        className="group flex items-center gap-6"
        data-cursor-hover
      >
        <div className="rounded-[4px] overflow-hidden relative shrink-0" style={{ width: "clamp(80px, 8vw, 112px)", height: "clamp(56px, 6vw, 80px)" }} data-protected>
          {imagePath ? (
            <Image
              src={imagePath}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="112px"
              quality={80}
              draggable={false}
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-sm" />
          )}
        </div>
        <span className="font-black uppercase text-[#1A1A1A] dark:text-[#f5f5f5] group-hover:opacity-60 transition-opacity" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)" }}>
          {title} →
        </span>
      </Link>
    </div>
  );
}
