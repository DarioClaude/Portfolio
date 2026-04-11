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
    <div className="max-w-6xl mx-auto px-6">
      {/* ── Top Row: Title (left) + Description (right, offset down) ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mb-14 md:mb-20">
        <h1 className="md:col-span-7 text-4xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] dark:text-[#f5f5f5] leading-[1.05] tracking-tight">
          {title}
        </h1>
        <div className="md:col-span-5 md:pt-6 md:pl-6">
          <p className="text-base text-[#6B7280] dark:text-[#a1a1aa] leading-relaxed max-w-[45ch]">
            {t(descriptionKey)}
          </p>
        </div>
      </div>

      {/* ── Second Row: 3-column metadata grid, aligned under the description ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 pb-10 border-b border-[#E5E7EB] dark:border-[#262626]">
        <div className="hidden md:block md:col-span-7" />
        <div className="md:col-span-5 md:pl-6 grid grid-cols-3 gap-6">
          <div>
            <p className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF] dark:text-[#71717a] mb-2 font-medium">
              {t("project.category")}
            </p>
            <p className="text-sm font-semibold text-[#1A1A1A] dark:text-[#f5f5f5]">{category}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF] dark:text-[#71717a] mb-2 font-medium">
              {t("project.client")}
            </p>
            <p className="text-sm font-semibold text-[#1A1A1A] dark:text-[#f5f5f5]">{client}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF] dark:text-[#71717a] mb-2 font-medium">
              {t("project.year")}
            </p>
            <p className="text-sm font-semibold text-[#1A1A1A] dark:text-[#f5f5f5]">{year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
