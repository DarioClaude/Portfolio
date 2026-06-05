"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

interface Props {
  title: string;
  category: string;
  clients: string[];
  toggleSlot?: React.ReactNode;
}

export default function ProjectDetailContent({ title, category, clients, toggleSlot }: Props) {
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
    <div>
      <div style={{ padding: "0 clamp(20px, 3vw, 40px)", paddingBottom: "clamp(16px, 2vw, 24px)" }}>
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="font-bold text-[#1A1A1A] leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              {title}
            </h1>

            <div className="flex gap-8 mt-5">
              <div>
                <p className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF] mb-1 font-medium">
                  {t("project.category")}
                </p>
                <p className="text-sm font-semibold text-[#1A1A1A]">{category}</p>
              </div>
              <div className="min-w-[120px]">
                <p className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF] mb-1 font-medium">
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

          {toggleSlot && (
            <div className="flex items-start pt-2">
              {toggleSlot}
            </div>
          )}
        </div>
      </div>
      <div className="border-b border-[#E5E7EB] w-full" />
    </div>
  );
}
