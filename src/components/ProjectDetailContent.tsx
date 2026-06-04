"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

interface Props {
  title: string;
  category: string;
  clients: string[];
}

export default function ProjectDetailContent({ title, category, clients }: Props) {
  const { t } = useTranslation();
  const [clientIndex, setClientIndex] = useState(0);

  useEffect(() => {
    if (clients.length <= 1) return;
    const interval = setInterval(() => {
      setClientIndex((prev) => (prev + 1) % clients.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [clients]);

  return (
    <div style={{ padding: "0 clamp(20px, 3vw, 40px)" }}>
      <h1
        className="font-bold text-[#1A1A1A] leading-[1.05] tracking-tight"
        style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", marginBottom: "clamp(24px, 3vw, 40px)" }}
      >
        {title}
      </h1>

      <div
        className="flex gap-12 pb-10 border-b border-[#E5E7EB]"
      >
        <div>
          <p className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF] mb-2 font-medium">
            {t("project.category")}
          </p>
          <p className="text-sm font-semibold text-[#1A1A1A]">{category}</p>
        </div>
        <div className="min-w-[140px]">
          <p className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF] mb-2 font-medium">
            {t("project.client")}
          </p>
          <div className="relative h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={clientIndex}
                className="text-sm font-semibold text-[#1A1A1A] absolute"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {clients[clientIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
