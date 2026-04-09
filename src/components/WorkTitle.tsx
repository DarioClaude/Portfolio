"use client";

import { useTranslation } from "@/context/LanguageContext";

export default function WorkTitle() {
  const { t } = useTranslation();

  return (
    <h1 className="font-black uppercase text-[#1A1A1A] text-[20vw] md:text-[15vw] leading-[0.8] tracking-[-0.05em]">
      {t("work.title")}
      <sup className="ml-2 inline-flex items-center align-top">
        <span className="text-[14px] font-normal text-[#6B7280] border border-[#E5E7EB] px-3 py-1 rounded-full tracking-normal">
          {t("work.copyright")}
        </span>
      </sup>
    </h1>
  );
}
