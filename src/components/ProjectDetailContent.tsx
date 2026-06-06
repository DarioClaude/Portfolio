"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  title: string;
  clients: string[];
}

export default function ProjectDetailContent({ title, clients }: Props) {
  const [clientIndex, setClientIndex] = useState(0);

  useEffect(() => {
    if (clients.length <= 1) return;
    const interval = setInterval(() => {
      setClientIndex((prev) => (prev + 1) % clients.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [clients]);

  return (
    <div className="flex flex-col items-center text-center">
      <h1
        className="font-bold text-[#1A1A1A] tracking-tight leading-none uppercase"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
      >
        {title}
      </h1>

      {clients.length > 0 && (
        <div
          className="relative overflow-hidden"
          style={{ height: 22, marginTop: "clamp(10px, 1.2vw, 16px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={clientIndex}
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
              style={{ fontSize: 13, fontWeight: 400, color: "#9CA3AF", letterSpacing: "0.02em" }}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {clients[clientIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
