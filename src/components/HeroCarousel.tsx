"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCursorPill from "./ProjectCursorPill";
import ProjectCardVisual from "./ProjectCardVisual";
import SocialIcons from "./SocialIcons";
import { projects } from "@/lib/projects";

export default function HeroCarousel() {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const cardCount = projects.length;
  const angleStep = 360 / cardCount; // 40deg per card
  const radius = 600; // translateZ radius for the cylinder

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (!isAutoRotating || isMobile) return;
    const interval = setInterval(() => {
      setCurrentAngle((prev) => prev - 0.15);
    }, 16);
    return () => clearInterval(interval);
  }, [isAutoRotating, isMobile]);

  // Pause auto-rotation on hover
  useEffect(() => {
    if (hoveredIndex !== null) {
      setIsAutoRotating(false);
    } else {
      const timer = setTimeout(() => setIsAutoRotating(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [hoveredIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setIsAutoRotating(false);
        setCurrentAngle((prev) => prev + angleStep);
        setTimeout(() => setIsAutoRotating(true), 3000);
      } else if (e.key === "ArrowRight") {
        setIsAutoRotating(false);
        setCurrentAngle((prev) => prev - angleStep);
        setTimeout(() => setIsAutoRotating(true), 3000);
      }
    },
    [angleStep]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Mobile: horizontal snap slider
  if (isMobile) {
    return (
      <section className="relative w-full h-screen flex flex-col pt-24">
        <div className="flex-1 flex flex-col justify-center px-6">
          <div
            className="flex gap-4 overflow-x-auto pb-6"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {projects.map((project) => (
              <div
                key={project.slug}
                className="flex-shrink-0 w-[300px] h-[200px] rounded-xl overflow-hidden"
                style={{ scrollSnapAlign: "center" }}
              >
                <Link href={`/work/${project.slug}`} className="block w-full h-full">
                  <ProjectCardVisual project={project} />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="p-10 pt-0">
          <p className="text-lg font-medium leading-tight tracking-tight text-[#1A1A1A]">
            Hi, I&apos;m <span className="font-bold">Dario</span>, a{" "}
            <span className="font-bold">French photographer</span> dedicated to
            capturing raw emotions and minimalist digital aesthetics.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Magnetic pill — only when hovering a card */}
      <ProjectCursorPill visible={hoveredIndex !== null} />

      {/* 3D Cylinder Carousel */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative w-[420px] h-[300px]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: currentAngle }}
          transition={{
            type: isAutoRotating ? "tween" : "spring",
            stiffness: 60,
            damping: 20,
            duration: isAutoRotating ? 0 : undefined,
          }}
        >
          {projects.map((project, index) => {
            const cardAngle = index * angleStep;

            // Calculate how "front-facing" this card is
            const normalizedAngle =
              ((currentAngle + cardAngle) % 360 + 360) % 360;
            const isFront = normalizedAngle < 40 || normalizedAngle > 320;
            const isBack = normalizedAngle > 120 && normalizedAngle < 240;

            return (
              <motion.div
                key={project.slug}
                className="absolute inset-0 w-[420px] h-[300px] rounded-xl overflow-hidden"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  boxShadow: isFront
                    ? "0 35px 80px rgba(0,0,0,0.2)"
                    : "0 15px 40px rgba(0,0,0,0.1)",
                }}
                animate={{
                  scale:
                    hoveredIndex === index
                      ? 1.08
                      : isFront
                        ? 1
                        : 0.85,
                  opacity:
                    hoveredIndex !== null && hoveredIndex !== index
                      ? 0.4
                      : isBack
                        ? 0
                        : isFront
                          ? 1
                          : 0.7,
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  },
                  default: { type: "spring", stiffness: 100, damping: 20 },
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-cursor-hover
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="block w-full h-full"
                >
                  <ProjectCardVisual project={project} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Four Corners Bio — single instance, no duplicate */}
      <div className="absolute bottom-0 left-0 right-0 p-10 flex justify-between items-end pointer-events-none z-10">
        {/* Bottom-Left: Bio */}
        <motion.div
          className="max-w-[450px] pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg font-medium leading-tight tracking-tight text-[#1A1A1A]">
            Hi, I&apos;m <span className="font-bold">Dario</span>, a{" "}
            <span className="font-bold">French photographer</span> dedicated to
            capturing raw emotions and minimalist digital aesthetics.
          </p>
          <p className="text-sm text-[#6B7280] mt-3">
            I craft visual stories that stand out and resonate.
          </p>
        </motion.div>

        {/* Bottom-Right: Identity */}
        <motion.div
          className="flex flex-col items-end gap-2 pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="8" r="4" />
              <path d="M12 14c-6 0-8 3-8 5v1h16v-1c0-2-2-5-8-5z" />
            </svg>
          </div>
          <p className="text-xs tracking-[1.5px] uppercase text-[#6B7280]">
            French Photographer
          </p>
          <p className="text-sm font-bold text-[#1A1A1A]">DARIO TONINI</p>
          <p className="text-xs tracking-[1px] text-[#9CA3AF]">
            FRANCE
          </p>
          <SocialIcons />
        </motion.div>
      </div>
    </section>
  );
}
