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
    <div className="max-w-6xl mx-auto" style={{ padding: "0 clamp(16px, 3vw, 24px)" }}>
      {/* ── Top Row: Title (left) + Description (right, offset down) ── */}
      <div className="grid grid-cols-1 md:grid-cols-12" style={{ gap: "clamp(24px, 3vw, 40px)", marginBottom: "clamp(56px, 6vw, 80px)" }}>
        <h1 className="md:col-span-7 font-bold text-[#1A1A1A] dark:text-[#f5f5f5] leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
          {title}
        </h1>
        <div className="md:col-span-5" style={{ paddingTop: "clamp(0px, 1vw, 24px)", paddingLeft: "clamp(0px, 1vw, 24px)" }}>
          <p className="text-base text-[#6B7280] dark:text-[#a1a1aa] leading-relaxed max-w-[45ch]">
            {t(descriptionKey)}
          </p>
        </div>
      </div>

      {/* ── Second Row: 3-column metadata grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 pb-10 border-b border-[#E5E7EB] dark:border-[#262626]" style={{ gap: "clamp(24px, 3vw, 40px)" }}>
        <div className="hidden md:block md:col-span-7" />
        <div className="md:col-span-5 grid grid-cols-3" style={{ paddingLeft: "clamp(0px, 1vw, 24px)", gap: "clamp(16px, 2vw, 24px)" }}>
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
