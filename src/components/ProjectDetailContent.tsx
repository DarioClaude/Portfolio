"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  title: string;
  category: string;
  clients: string[];
  toggleSlot?: React.ReactNode;
}

function RugbyBallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0000ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="10" ry="6" transform="rotate(-45 12 12)" />
      <path d="M7.5 7.5l9 9M8.5 12l3-3M12 15.5l3-3" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0000ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M12 7.5v4M10 13l-3.5 3M14 13l3.5 3" />
    </svg>
  );
}

export default function ProjectDetailContent({ title, category, clients, toggleSlot }: Props) {
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
              className="font-bold text-[#1A1A1A] tracking-tight leading-none uppercase"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              {title}
            </h1>
          </div>

          <div className="flex items-start gap-6">
            {/* Category + Client block (MetaRow style) */}
            <div className="flex flex-col" style={{ gap: 10 }}>
              <div className="flex items-center">
                <span className="flex items-center gap-2.5 flex-shrink-0">
                  <RugbyBallIcon />
                  <span style={{ fontSize: 13, fontWeight: 400, color: "#000" }}>{category}</span>
                </span>
                <span aria-hidden className="flex-1 ml-4" style={{ height: 1, background: "rgba(0, 0, 0, 0.1)", minWidth: 40 }} />
              </div>
              <div className="flex items-center">
                <span className="flex items-center gap-2.5 flex-shrink-0">
                  <NetworkIcon />
                  <span className="relative h-[18px] overflow-hidden inline-flex" style={{ minWidth: 120 }}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={clientIndex}
                        className="absolute"
                        style={{ fontSize: 13, fontWeight: 400, color: "#000" }}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        {clients[clientIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
                <span aria-hidden className="flex-1 ml-4" style={{ height: 1, background: "rgba(0, 0, 0, 0.1)", minWidth: 40 }} />
              </div>
            </div>

            {toggleSlot && (
              <div className="flex items-start pt-1">
                {toggleSlot}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-b border-[#E5E7EB] w-full" />
    </div>
  );
}
