"use client";

import { useEffect } from "react";

export default function ImageProtection() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.closest("img, [data-protected]")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  return null;
}
