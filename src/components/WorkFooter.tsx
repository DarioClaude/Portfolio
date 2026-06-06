"use client";

import { useState, useEffect } from "react";
import WorkCopyright from "./WorkCopyright";
import WorkIdentity from "./WorkIdentity";

export default function WorkFooter() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className={`flex justify-between ${isMobile ? "items-start" : "items-end"}`}
      style={{
        padding: isMobile
          ? "26px clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)"
          : "0 clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)",
      }}
    >
      <WorkCopyright />
      <div style={isMobile ? { transform: "scale(0.85)", transformOrigin: "top right" } : undefined}>
        <WorkIdentity />
      </div>
    </div>
  );
}
