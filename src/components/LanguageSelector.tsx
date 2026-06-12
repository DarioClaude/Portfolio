"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import type { Lang } from "@/lib/translations";

function Flag({ code }: { code: Lang }) {
  const w = 20;
  const h = 14;
  if (code === "fr")
    return (
      <svg width={w} height={h} viewBox="0 0 60 30" className="rounded-[2px] block shrink-0">
        <rect width="20" height="30" fill="#002395" />
        <rect x="20" width="20" height="30" fill="#fff" />
        <rect x="40" width="20" height="30" fill="#ED2939" />
      </svg>
    );
  if (code === "en")
    return (
      <svg width={w} height={h} viewBox="0 0 60 30" className="rounded-[2px] block shrink-0">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30" stroke="#C8102E" strokeWidth="2" />
        <path d="M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
        <path d="M30,0 V30" stroke="#fff" strokeWidth="10" />
        <path d="M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30" stroke="#C8102E" strokeWidth="6" />
        <path d="M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    );
  // es
  return (
    <svg width={w} height={h} viewBox="0 0 60 30" className="rounded-[2px] block shrink-0">
      <rect width="60" height="7.5" fill="#AA151B" />
      <rect y="7.5" width="60" height="15" fill="#F1BF00" />
      <rect y="22.5" width="60" height="7.5" fill="#AA151B" />
    </svg>
  );
}

const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const suggested = languages.find((l) => l.code !== lang) || languages[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger pill */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-white dark:bg-[#171717] hover:border-[#D1D5DB] dark:hover:border-[#3f3f46] transition-colors cursor-pointer"
        data-cursor-hover
        data-cursor-precise
        data-cursor-noinvert
        aria-label={t("aria.language")}
      >
        <Flag code={suggested.code} />
        <span className="text-xs font-medium text-[#1A1A1A] leading-none hidden md:inline">{suggested.code.toUpperCase()}</span>
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="#6B7280"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 5L0 0h8L4 5z" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full right-0 md:right-auto md:left-0 mt-2 bg-white dark:bg-[#171717] rounded-xl shadow-lg border border-[#E5E7EB] dark:border-[#262626] overflow-hidden z-50 min-w-[140px]"
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                data-cursor-hover
                data-cursor-precise
                className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 hover:bg-[#F3F4F6] dark:hover:bg-[#262626] transition-colors text-left ${
                  l.code === lang ? "bg-[#F3F4F6] dark:bg-[#262626]" : ""
                }`}
              >
                <Flag code={l.code} />
                <span className="text-xs font-medium text-[#1A1A1A] dark:text-[#f5f5f5] leading-none">{l.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
