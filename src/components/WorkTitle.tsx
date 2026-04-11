"use client";

import { useTranslation } from "@/context/LanguageContext";

export default function WorkTitle() {
  const { t } = useTranslation();

  return (
    <h1 className="font-black uppercase text-[#1A1A1A] dark:text-[#f5f5f5] text-[16vw] md:text-[12vw] leading-[0.8] tracking-[-0.05em]">
      {t("work.title")}
      <sup className="ml-2 inline-flex items-center align-top">
        <span className="text-[12px] font-normal text-[#6B7280] dark:text-[#a1a1aa] border border-[#E5E7EB] dark:border-[#262626] px-3 py-1 rounded-full tracking-normal">
          {t("work.copyright")}
        </span>
      </sup>
    </h1>
  );
}
