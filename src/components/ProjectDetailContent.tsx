"use client";

import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

interface Props {
  title: string;
  descriptionKey: string;
  nextProjectSlug: string;
  nextProjectTitle: string;
}

export default function ProjectDetailContent({ title, descriptionKey, nextProjectSlug, nextProjectTitle }: Props) {
  const { t } = useTranslation();

  return (
    <>
      {/* Project info */}
      <div className="px-10 max-w-3xl">
        <h1 className="text-5xl font-black uppercase tracking-tight text-[#1A1A1A] mb-4">
          {title}
        </h1>
        <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
          {t(descriptionKey)}
        </p>
        <div className="flex gap-4 text-sm text-[#9CA3AF]">
          <span className="border border-[#E5E7EB] px-3 py-1 rounded-full">{t("project.photography")}</span>
          <span className="border border-[#E5E7EB] px-3 py-1 rounded-full">{t("project.artDirection")}</span>
          <span className="border border-[#E5E7EB] px-3 py-1 rounded-full">{t("project.visualDesign")}</span>
        </div>
      </div>

      {/* Next project */}
      <div className="px-10 mt-24 border-t border-[#E5E7EB] pt-12">
        <p className="text-xs uppercase tracking-[2px] text-[#9CA3AF] mb-4">{t("project.next")}</p>
        <Link
          href={`/work/${nextProjectSlug}`}
          className="text-3xl font-black uppercase text-[#1A1A1A] hover:opacity-60 transition-opacity"
          data-cursor-hover
        >
          {nextProjectTitle} →
        </Link>
      </div>
    </>
  );
}
