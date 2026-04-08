"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCursorPill from "./ProjectCursorPill";
import ProjectCardVisual from "./ProjectCardVisual";
import SocialIcons from "./SocialIcons";
import { projects } from "@/lib/projects";

// Exactly 6 cards for the cylinder
const carouselProjects = projects.slice(0, 6);
const CARD_COUNT = 6;
const ANGLE_STEP = 360 / CARD_COUNT; // 60deg
const RADIUS = 400; // translateZ — compact ring

export default function HeroCarousel() {
  const [globalRotation, setGlobalRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHoveringWheel, setIsHoveringWheel] = useState(false);
  const autoRotateRef = useRef(true);

  // Responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-rotation — 0.05 deg/frame for luxury gallery feel
  useEffect(() => {
    if (isMobile) return;
    let raf: number;
    const rotate = () => {
      if (autoRotateRef.current && !isHoveringWheel) {
        setGlobalRotation((prev) => prev - 0.05);
      }
      raf = requestAnimationFrame(rotate);
    };
    raf = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, isHoveringWheel]);

  // Keyboard: Left/Right snap by 60deg
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      autoRotateRef.current = false;
      setGlobalRotation((prev) => prev + ANGLE_STEP);
      setTimeout(() => { autoRotateRef.current = true; }, 3000);
    } else if (e.key === "ArrowRight") {
      autoRotateRef.current = false;
      setGlobalRotation((prev) => prev - ANGLE_STEP);
      setTimeout(() => { autoRotateRef.current = true; }, 3000);
    }
  }, []);

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
            {carouselProjects.map((project) => (
              <div
                key={project.slug}
                className="flex-shrink-0 w-[300px] h-[200px] rounded-[4px] overflow-hidden"
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
            Hi, I&apos;m <span className="font-bold text-[#0000ff]">Dario</span>, a{" "}
            <span className="font-bold text-[#0000ff]">French photographer</span> dedicated to
            capturing raw emotions and minimalist digital aesthetics.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* "SEE PROJECT" pill — only when hovering the carousel area */}
      <ProjectCursorPill visible={isHoveringWheel} />

      {/* ===== CAROUSEL — independently positioned at top: 150px ===== */}
      <div
        className="absolute left-1/2 w-[357px] h-[242px]"
        style={{
          top: "150px",
          transform: "translateX(-50%)",
          perspective: "1500px",
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${globalRotation}deg)`,
            transition: autoRotateRef.current
              ? "none"
              : "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
          onMouseEnter={() => setIsHoveringWheel(true)}
          onMouseLeave={() => setIsHoveringWheel(false)}
        >
          {carouselProjects.map((project, index) => {
            const angle = index * ANGLE_STEP;

            return (
              <div
                key={project.slug}
                className="absolute inset-0 w-[357px] h-[242px]"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: "visible",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
                data-cursor-hover
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="block w-full h-full"
                >
                  <ProjectCardVisual project={project} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== FOOTER BIO — independently anchored at 75vh ===== */}
      <div
        className="absolute left-0 right-0 px-10 flex justify-between items-end pointer-events-none z-10"
        style={{ top: "75vh" }}
      >
        {/* Bottom-Left: Bio */}
        <motion.div
          className="max-w-[450px] pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg font-medium leading-tight tracking-tight text-[#1A1A1A]">
            Hi, I&apos;m <span className="font-bold text-[#0000ff]">Dario</span>, a{" "}
            <span className="font-bold text-[#0000ff]">French photographer</span> dedicated to
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
          <p className="text-xs tracking-[1px] text-[#9CA3AF]">FRANCE</p>
          <SocialIcons />
        </motion.div>
      </div>
    </section>
  );
}
