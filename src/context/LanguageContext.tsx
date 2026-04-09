"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Lang, translations } from "@/lib/translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  const t = useCallback(
    (key: string) => translations[lang][key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}

/**
 * Parse translation strings with <bold> tags into React elements.
 * Usage: renderBold(t("hero.bio"), "text-[#0000ff]")
 */
export function renderBold(text: string, boldClass: string = "font-bold text-[#0000ff]") {
  const parts = text.split(/<bold>(.*?)<\/bold>/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={boldClass}>
        {part}
      </span>
    ) : (
      part
    )
  );
}
