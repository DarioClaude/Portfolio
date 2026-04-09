"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import type { Lang } from "@/lib/translations";

const languages: { code: Lang; flag: string }[] = [
  { code: "fr", flag: "🇫🇷" },
  { code: "en", flag: "🇬🇧" },
  { code: "es", flag: "🇪🇸" },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const currentFlag = languages.find((l) => l.code === lang)?.flag;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 cursor-pointer"
        data-cursor-hover
        aria-label={t("aria.language")}
      >
        <span className="text-sm leading-none">{currentFlag}</span>
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="#1A1A1A"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 5L0 0h8L4 5z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50"
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
                className={`flex items-center justify-center w-full px-3 py-1.5 hover:bg-gray-50 transition-colors ${
                  l.code === lang ? "bg-gray-50" : ""
                }`}
              >
                <span className="text-sm leading-none">{l.flag}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
