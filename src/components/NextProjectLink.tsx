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
    <div className="px-6 mt-20 md:mt-28 border-t border-[#E5E7EB] dark:border-[#262626] pt-12">
      <p className="text-xs uppercase tracking-[2px] text-[#9CA3AF] dark:text-[#71717a] mb-6">{t("project.next")}</p>
      <Link
        href={`/work/${slug}`}
        className="group flex items-center gap-6"
        data-cursor-hover
      >
        <div className="w-20 h-14 md:w-28 md:h-20 rounded-[4px] overflow-hidden relative shrink-0" data-protected>
          <Image
            src={imagePath}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="112px"
            quality={80}
            draggable={false}
          />
        </div>
        <span className="text-2xl md:text-3xl font-black uppercase text-[#1A1A1A] dark:text-[#f5f5f5] group-hover:opacity-60 transition-opacity">
          {title} →
        </span>
      </Link>
    </div>
  );
}
