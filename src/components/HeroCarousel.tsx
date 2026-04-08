"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ProjectCursorPill from "./ProjectCursorPill";
import SocialIcons from "./SocialIcons";
import { projects } from "@/lib/projects";

// Exactly 6 cards for the cylinder
const carouselProjects = projects.slice(0, 6);
const CARD_COUNT = 6;
const ANGLE_STEP = 360 / CARD_COUNT; // 60deg

// Photo paths for each carousel card (temporary test)
const CARD_PHOTOS = [
  "/photos/1.png",
  "/photos/2.png",
  "/photos/3.png",
  "/photos/4.png",
  "/photos/5.png",
  "/photos/6.png",
];

// Responsive dimensions
const DESKTOP = { cardW: 357, cardH: 242, radius: 400 };
const MOBILE = { cardW: 280, cardH: 187, radius: 300 };

export default function HeroCarousel() {
  const [globalRotation, setGlobalRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHoveringWheel, setIsHoveringWheel] = useState(false);
  const autoRotateRef = useRef(true);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);

  // Responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const dims = isMobile ? MOBILE : DESKTOP;

  // Auto-rotation — slow luxury feel (mobile too, slightly slower)
  useEffect(() => {
    let raf: number;
    const speed = isMobile ? 0.015 : 0.02;
    const rotate = () => {
      if (autoRotateRef.current && !isHoveringWheel) {
        setGlobalRotation((prev) => prev - speed);
      }
      raf = requestAnimationFrame(rotate);
    };
    raf = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, isHoveringWheel]);

  // Keyboard: Left/Right snap by 60deg (desktop only)
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

  // Touch/drag handlers for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    autoRotateRef.current = false;
    dragStartX.current = e.touches[0].clientX;
    dragStartRotation.current = globalRotation;
  }, [globalRotation]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - dragStartX.current;
    // Map drag distance to rotation: ~0.5 deg per pixel
    setGlobalRotation(dragStartRotation.current + dx * 0.5);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => { autoRotateRef.current = true; }, 2000);
  }, []);

  // Mouse drag for desktop fallback
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isMobile) return; // handled by touch events
    autoRotateRef.current = false;
    dragStartX.current = e.clientX;
    dragStartRotation.current = globalRotation;

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - dragStartX.current;
      setGlobalRotation(dragStartRotation.current + dx * 0.5);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setTimeout(() => { autoRotateRef.current = true; }, 2000);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [isMobile, globalRotation]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* "SEE PROJECT" pill — desktop only */}
      {!isMobile && <ProjectCursorPill visible={isHoveringWheel} />}

      {/* ===== CAROUSEL — absolute positioned ===== */}
      <div
        className="absolute left-1/2"
        style={{
          top: isMobile ? "50%" : "150px",
          transform: isMobile ? "translate(-50%, -60%)" : "translateX(-50%)",
          width: dims.cardW,
          height: dims.cardH,
          perspective: isMobile ? "1000px" : "1500px",
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
        >
          {carouselProjects.map((project, index) => {
            const angle = index * ANGLE_STEP;

            return (
              <div
                key={project.slug}
                className="absolute inset-0"
                style={{
                  width: dims.cardW,
                  height: dims.cardH,
                  transform: `rotateY(${angle}deg) translateZ(${dims.radius}px)`,
                  backfaceVisibility: "visible",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
                data-cursor-hover
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="block w-full h-full relative"
                >
                  <Image
                    src={CARD_PHOTOS[index]}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes={`${dims.cardW}px`}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== FOOTER BIO — independently anchored ===== */}
      <div
        className="absolute left-0 right-0 px-5 md:px-10 flex justify-between items-end pointer-events-none z-10"
        style={isMobile ? { bottom: "24px" } : { top: "75vh" }}
      >
        {/* Bottom-Left: Bio */}
        <motion.div
          className="max-w-[280px] md:max-w-[450px] pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm md:text-lg font-medium leading-snug md:leading-tight tracking-tight text-[#1A1A1A]">
            Hi, I&apos;m <span className="font-bold text-[#0000ff]">Dario</span>, a{" "}
            <span className="font-bold text-[#0000ff]">French photographer</span> dedicated to
            capturing raw emotions and minimalist digital aesthetics.
          </p>
          <p className="text-[10px] md:text-sm text-[#6B7280] mt-2 md:mt-3">
            I craft visual stories that stand out and resonate.
          </p>
        </motion.div>

        {/* Bottom-Right: Identity */}
        <motion.div
          className="flex flex-col items-end gap-1 md:gap-2 pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gray-700 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="8" r="4" />
              <path d="M12 14c-6 0-8 3-8 5v1h16v-1c0-2-2-5-8-5z" />
            </svg>
          </div>
          <p className="text-[10px] md:text-xs tracking-[1.5px] uppercase text-[#6B7280]">
            French Photographer
          </p>
          <p className="text-xs md:text-sm font-bold text-[#1A1A1A]">DARIO TONINI</p>
          <p className="text-[10px] md:text-xs tracking-[1px] text-[#9CA3AF] hidden md:block">FRANCE</p>
          <SocialIcons />
        </motion.div>
      </div>
    </section>
  );
}
