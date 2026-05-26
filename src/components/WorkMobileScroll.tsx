"use client";

import { useEffect } from "react";

export default function WorkMobileScroll() {
  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.classList.add("mobile-scroll-allowed");
    }
    return () => {
      document.body.classList.remove("mobile-scroll-allowed");
    };
  }, []);

  return null;
}
