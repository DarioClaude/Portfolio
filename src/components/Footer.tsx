"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="px-10 py-20 border-t border-black/10">
      <div className="flex flex-col md:flex-row justify-between gap-16">
        {/* Left: Bio */}
        <motion.div
          className="max-w-[450px]"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-black/40">
            About
          </h3>
          <p className="text-base font-medium leading-tight tracking-tight">
            Hi, I&apos;m Marlay — a creative developer passionate about building
            memorable digital experiences. I combine design thinking with
            technical excellence to deliver work that resonates and performs.
          </p>
          <p className="text-sm text-black/40 mt-6">
            © {new Date().getFullYear()} Marlay. All rights reserved.
          </p>
        </motion.div>

        {/* Right: Info + Links */}
        <motion.div
          className="text-right"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.15,
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-2">
            Co-founder of Studio Arct
          </p>
          <p className="text-sm text-black/50 mb-8">Bordeaux — FR</p>

          <div className="flex gap-6 justify-end">
            <a
              href="#"
              className="relative text-xs uppercase tracking-widest font-medium group"
            >
              Instagram
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#"
              className="relative text-xs uppercase tracking-widest font-medium group"
            >
              LinkedIn
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="mailto:hello@marlay.dev"
              className="text-2xl md:text-4xl font-black tracking-tighter hover:opacity-60 transition-opacity"
              data-cursor-hover
            >
              hello@marlay.dev
            </a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
