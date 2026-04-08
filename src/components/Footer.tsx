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
            Hi, I&apos;m <span className="font-bold">Dario</span>, a{" "}
            <span className="font-bold">french photographer</span> dedicated to
            capturing raw emotions and minimalist digital aesthetics.
          </p>
          <p className="text-sm text-[#6B7280] mt-3">
            I craft visual stories that stand out and resonate.
          </p>
        </motion.div>

        {/* Right: Identity */}
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
          <p className="text-xs tracking-[1.5px] uppercase text-[#6B7280]">
            french photographer
          </p>
          <p className="text-sm font-bold text-[#1A1A1A]">DARIO TONINI</p>

          <SocialIcons />
        </motion.div>
      </div>
    </footer>
  );
}
