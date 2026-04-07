"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import PixelLogo from "./PixelLogo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="flex items-center justify-between px-10 py-5">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" data-cursor-hover>
            <PixelLogo />
          </Link>

          <nav className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor-hover
                  className="relative group"
                >
                  <span
                    className="text-[14px] transition-colors"
                    style={{
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#1A1A1A" : "#6B7280",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span className="ml-1 text-[#6B7280]">&gt;</span>
                    )}
                  </span>
                  {/* Hover underline */}
                  <span className="absolute -bottom-0.5 left-0 h-px bg-[#1A1A1A] w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: CTA */}
        <motion.div
          whileHover={{ y: -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Link
            href="/about"
            data-cursor-hover
            className="inline-block bg-[#1A1A1A] text-white text-[13px] font-medium px-5 py-2.5 rounded-lg hover:shadow-lg transition-shadow"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
