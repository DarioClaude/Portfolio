"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer ref={ref} className="border-t border-[#E5E7EB]">
      <div className="flex flex-col md:flex-row justify-between gap-12 p-10">
        {/* Left: Bio */}
        <motion.div
          className="max-w-[450px]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <p className="text-lg font-medium leading-tight tracking-tight text-[#1A1A1A]">
            Hi, I&apos;m Marlay. I help brands translate strategy into clear,
            impactful digital experiences.
          </p>
          <p className="text-sm text-[#6B7280] mt-3">
            We craft brands, websites and digital products designed to stand out
            and scale.
          </p>
        </motion.div>

        {/* Right: Studio info */}
        <motion.div
          className="flex flex-col items-end gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.1,
          }}
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="white"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M12 14c-6 0-8 3-8 5v1h16v-1c0-2-2-5-8-5z" />
            </svg>
          </div>

          <p className="text-xs tracking-[1.5px] uppercase text-[#6B7280]">
            Co-founder of
          </p>
          <p className="text-sm font-bold text-[#1A1A1A]">STUDIO ARCT</p>
          <p className="text-xs tracking-[1px] text-[#9CA3AF]">
            BORDEAUX — FR
          </p>

          <SocialIcons />
        </motion.div>
      </div>
    </footer>
  );
}
