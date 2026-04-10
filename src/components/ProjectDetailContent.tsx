"use client";

import { useTranslation } from "@/context/LanguageContext";

interface Props {
  title: string;
  descriptionKey: string;
}

export default function ProjectDetailContent({ title, descriptionKey }: Props) {
  const { t } = useTranslation();

  return (
    <div className="px-5 md:px-10 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1A1A1A] mb-4">
        {title}
      </h1>
      <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mb-8">
        {t(descriptionKey)}
      </p>
      <div className="flex flex-wrap gap-3 text-sm text-[#9CA3AF]">
        <span className="border border-[#E5E7EB] px-3 py-1 rounded-full">{t("project.photography")}</span>
        <span className="border border-[#E5E7EB] px-3 py-1 rounded-full">{t("project.artDirection")}</span>
        <span className="border border-[#E5E7EB] px-3 py-1 rounded-full">{t("project.visualDesign")}</span>
      </div>
    </div>
  );
}
