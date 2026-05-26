"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function WorkCopyright() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="flex flex-col items-start max-w-[200px] md:max-w-[400px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <p className="text-[11px] md:text-[13px] leading-snug tracking-tight text-[#1A1A1A]">
        <span className="font-medium">© 2026 Dario Tonini.</span>{" "}
        <span className="font-normal">{t("work.copyright")}</span>
      </p>
      <Link
        href="/privacy"
        className="text-[11px] md:text-[13px] font-normal leading-snug tracking-tight text-[#6B7280] mt-1 hover:text-[#1A1A1A] transition-colors"
        data-cursor-hover
      >
        {t("work.privacy")}
      </Link>
    </motion.div>
  );
}
