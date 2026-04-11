"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SocialIcons from "./SocialIcons";
import { useTranslation, renderBold } from "@/context/LanguageContext";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useTranslation();

  return (
    <footer ref={ref} className="border-t border-[#E5E7EB] dark:border-[#262626]">
      <div className="flex flex-col md:flex-row justify-between gap-12 p-10">
        {/* Left: Bio */}
        <motion.div
          className="max-w-[450px]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <p className="text-lg font-medium leading-tight tracking-tight text-[#1A1A1A] dark:text-[#f5f5f5]">
            {renderBold(t("footer.bio"), "font-bold")}
          </p>
          <p className="text-sm text-[#6B7280] dark:text-[#a1a1aa] mt-3">
            {t("footer.sub")}
          </p>
        </motion.div>

        {/* Right: Identity */}
        <motion.div
          className="flex flex-col items-end gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.1,
          }}
        >
          <p className="text-xs tracking-[1.5px] uppercase text-[#6B7280] dark:text-[#a1a1aa]">
            {t("footer.role")}
          </p>
          <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#f5f5f5]">{t("footer.name")}</p>

          <SocialIcons />
        </motion.div>
      </div>
    </footer>
  );
}
