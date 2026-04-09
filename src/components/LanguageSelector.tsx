"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import type { Lang } from "@/lib/translations";

function Flag({ code, size = 18 }: { code: Lang; size?: number }) {
  const h = size * 0.667; // 3:2 aspect ratio
  if (code === "fr")
    return (
      <svg width={size} height={h} viewBox="0 0 30 20" className="rounded-[2px] block">
        <rect width="10" height="20" fill="#002395" />
        <rect x="10" width="10" height="20" fill="#fff" />
        <rect x="20" width="10" height="20" fill="#ED2939" />
      </svg>
    );
  if (code === "en")
    return (
      <svg width={size} height={h} viewBox="0 0 60 30" className="rounded-[2px] block">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    );
  // es
  return (
    <svg width={size} height={h} viewBox="0 0 30 20" className="rounded-[2px] block">
      <rect width="30" height="5" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
      <rect y="15" width="30" height="5" fill="#AA151B" />
    </svg>
  );
}

const langCodes: Lang[] = ["en", "fr", "es"];

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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 cursor-pointer"
        data-cursor-hover
        aria-label={t("aria.language")}
      >
        <Flag code={lang} />
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
            {langCodes.map((code) => (
              <button
                key={code}
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
                data-cursor-hover
                className={`flex items-center justify-center w-full px-3 py-2 hover:bg-gray-50 transition-colors ${
                  code === lang ? "bg-gray-50" : ""
                }`}
              >
                <Flag code={code} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
