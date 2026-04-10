"use client";

import { useTranslation } from "@/context/LanguageContext";

interface Props {
  title: string;
  descriptionKey: string;
  category: string;
  client: string;
  year: number;
}

export default function ProjectDetailContent({ title, descriptionKey, category, client, year }: Props) {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Header: Title left, Description right */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-16 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.1] tracking-tight shrink-0">
          {title}
        </h1>
        <p className="text-base text-[#6B7280] leading-relaxed max-w-[45ch] md:text-right">
          {t(descriptionKey)}
        </p>
      </div>

      {/* Metadata grid: Category / Client / Year */}
      <div className="grid grid-cols-3 gap-8 pb-10 border-b border-[#E5E7EB]">
        <div>
          <p className="text-[11px] tracking-[1px] uppercase text-[#9CA3AF] mb-2 font-medium">
            {t("project.category")}
          </p>
          <p className="text-base font-semibold text-[#1A1A1A]">{category}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[1px] uppercase text-[#9CA3AF] mb-2 font-medium">
            {t("project.client")}
          </p>
          <p className="text-base font-semibold text-[#1A1A1A]">{client}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[1px] uppercase text-[#9CA3AF] mb-2 font-medium">
            {t("project.year")}
          </p>
          <p className="text-base font-semibold text-[#1A1A1A]">{year}</p>
        </div>
      </div>
    </div>
  );
}
