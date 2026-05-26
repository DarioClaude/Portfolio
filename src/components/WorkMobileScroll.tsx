"use client";

import { useEffect } from "react";

export default function WorkMobileScroll() {
  useEffect(() => {
    if (window.innerWidth < 768) {
      document.documentElement.classList.add("mobile-scroll-allowed");
      document.body.classList.add("mobile-scroll-allowed");
    }
    return () => {
      document.documentElement.classList.remove("mobile-scroll-allowed");
      document.body.classList.remove("mobile-scroll-allowed");
    };
  }, []);

  return null;
}
