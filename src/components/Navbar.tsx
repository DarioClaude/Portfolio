"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import Button from "./ui/Button";
import { useTranslation } from "@/context/LanguageContext";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.work", href: "/work" },
  { key: "nav.about", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm transition-colors duration-500"
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div
        className="max-w-[1800px] mx-auto flex items-center justify-between"
        style={{ padding: "clamp(12px, 1.5vw, 20px) clamp(20px, 3vw, 40px)" }}
      >
        {/* Left: Nav links */}
        <nav
          className="flex items-center"
          style={{ gap: "clamp(12px, 2vw, 24px)" }}
        >
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
                  className="transition-colors"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1.1vw, 16px)",
                    color: isActive ? "#0000ff" : "#6B7280",
                  }}
                >
                  {t(link.key)}
                </span>
                {/* Hover underline */}
                <span className="absolute -bottom-0.5 left-0 h-px bg-[#0000ff] w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            );
          })}
          <LanguageSelector />
        </nav>

        {/* Right: CTA — hidden on About page since it already links there */}
        {pathname !== "/about" && (
          <span data-cursor-noinvert>
            <Button href="/about" variant="dark" size="sm">
              {t("nav.cta")}
            </Button>
          </span>
        )}
      </div>
    </motion.header>
  );
}
