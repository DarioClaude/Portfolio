"use client";

import { useTranslation } from "@/context/LanguageContext";

export default function WorkTitle() {
  const { t } = useTranslation();

  return (
    <h1 className="font-black uppercase text-[#1A1A1A] text-[16vw] md:text-[12vw] leading-[0.8] tracking-[-0.05em]">
      {t("work.title")}
    </h1>
  );
}
