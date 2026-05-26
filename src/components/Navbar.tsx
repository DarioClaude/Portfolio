"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import Button from "./ui/Button";
import AvatarTilt from "./AvatarTilt";
import SocialIcons from "./SocialIcons";
import { useTranslation } from "@/context/LanguageContext";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.work", href: "/work" },
  { key: "nav.about", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [isMobile]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const padding = isMobile
    ? "22px 20px"
    : "clamp(12px, 1.5vw, 20px) clamp(20px, 3vw, 40px)";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-500"
        style={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          background: isMobile && scrolled ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.8)",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div
          className="max-w-[1800px] mx-auto flex items-center justify-between"
          style={{ padding }}
        >
          {/* Left side */}
          <div className="flex items-center" style={{ gap: "clamp(12px, 2vw, 24px)" }}>
            {/* Mobile: CTA button as "logo" — Home on about page */}
            <span className="md:hidden" data-cursor-noinvert>
              <Button href={pathname === "/about" ? "/" : "/about"} variant="dark" size="sm">
                {pathname === "/about" ? t("nav.home") : t("nav.cta")}
              </Button>
            </span>

            {/* Desktop: Nav links */}
            <nav
              className="hidden md:flex items-center"
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
                    <span className="absolute -bottom-0.5 left-0 h-px bg-[#0000ff] w-0 group-hover:w-full transition-all duration-300" />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop: Language selector */}
            <span className="hidden md:inline">
              <LanguageSelector />
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Mobile: Language selector + Hamburger */}
            <span className="md:hidden">
              <LanguageSelector />
            </span>
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-[18px] h-[1.5px] bg-[#1A1A1A]" />
              <span className="block w-[18px] h-[1.5px] bg-[#1A1A1A] mt-[5px]" />
              <span className="block w-[18px] h-[1.5px] bg-[#1A1A1A] mt-[5px]" />
            </button>

            {/* Desktop: CTA */}
            {pathname !== "/about" && (
              <span className="hidden md:inline" data-cursor-noinvert>
                <Button href="/about" variant="dark" size="sm">
                  {t("nav.cta")}
                </Button>
              </span>
            )}
          </div>
        </div>
      </motion.header>

      {/* ===== Mobile Menu Overlay ===== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white md:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Menu header — mirrors navbar */}
            <div
              className="flex items-center justify-between"
              style={{ padding }}
            >
              <span data-cursor-noinvert onClick={() => setMenuOpen(false)}>
                <Button href="/about" variant="dark" size="sm">
                  {t("nav.cta")}
                </Button>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center"
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav links — massive and airy */}
            <nav className="flex-1 flex flex-col px-6 pt-10" style={{ gap: 20 }}>
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block"
                  >
                    <span
                      className="font-sans"
                      style={{
                        fontSize: 38,
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? "#1A1A1A" : "#9CA3AF",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {t(link.key)}
                      {!isActive && (
                        <span className="ml-2 text-[#9CA3AF]" style={{ fontSize: 28 }}>›</span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom — identity block (pdp) */}
            <div className="flex flex-col items-start gap-2" style={{ padding: "0 24px 36px" }}>
              <AvatarTilt />
              <div className="flex flex-col items-start leading-none">
                <p className="text-sm font-normal tracking-tight text-[#1A1A1A] leading-none">
                  Dario Tonini
                </p>
                <p className="text-xs tracking-[0.5px] text-[#9CA3AF] leading-none mt-0.5">
                  @dariotni
                </p>
              </div>
              <SocialIcons />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
