"use client";

import { useEffect, useState } from "react";

/**
 * 3D neumorphic Dark Mode toggle.
 * - Pill track with inset shadow (light → neutral-200, dark → neutral-800)
 * - Circular white knob with drop shadow
 * - When checked, track turns Electric Blue (#0000ff)
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      data-cursor-hover
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 ease-out ${
        mounted && isDark
          ? "bg-[#0000ff]"
          : "bg-neutral-200 dark:bg-neutral-800"
      }`}
      style={{
        boxShadow:
          "inset 2px 2px 4px rgba(0,0,0,0.18), inset -1px -1px 2px rgba(255,255,255,0.7)",
      }}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white transition-transform duration-300 ease-out ${
          mounted && isDark ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
        style={{
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.12)",
        }}
      />
    </button>
  );
}
