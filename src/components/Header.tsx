"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#works" },
  { label: "About", href: "#about" },
];

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-6 mix-blend-difference"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <nav className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="relative text-sm text-white font-medium tracking-tight group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </nav>
      <Link
        href="#contact"
        className="relative text-sm text-white font-medium tracking-tight group"
      >
        Get in touch
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
      </Link>
    </motion.header>
  );
}
