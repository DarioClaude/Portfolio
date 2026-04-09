"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import PixelLogo from "./PixelLogo";
import LanguageSelector from "./LanguageSelector";

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
      <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4 py-3 md:px-10 md:py-5">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" data-cursor-hover>
            <PixelLogo />
          </Link>

          <nav className="flex items-center gap-3 md:gap-6">
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
                    className="text-sm md:text-base transition-colors"
                    style={{
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#0000ff" : "#6B7280",
                    }}
                  >
                    {link.label}
                  </span>
                  {/* Hover underline */}
                  <span className="absolute -bottom-0.5 left-0 h-px bg-[#0000ff] w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </nav>

          <LanguageSelector />
        </div>

        {/* Right: CTA — hidden on About page since it already links there */}
        {pathname !== "/about" && (
          <motion.div
            whileHover={{ y: -1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/about"
              data-cursor-hover
              className="inline-block bg-[#0000ff] text-white text-[11px] md:text-[13px] font-medium px-3 py-2 md:px-5 md:py-2.5 rounded-lg hover:shadow-lg transition-shadow"
            >
              Get in touch
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
