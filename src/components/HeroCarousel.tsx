"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CarouselCard from "./CarouselCard";
import ProjectCursorPill from "./ProjectCursorPill";
import SocialIcons from "./SocialIcons";
import { projects } from "@/lib/projects";

export default function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Raw mouse position for global tilt
  const rawMouseX = useMotionValue(0.5);
  const rawMouseY = useMotionValue(0.5);

  // Global tilt — entire stack rotates based on cursor position
  const globalRotateY = useSpring(
    useTransform(rawMouseX, [0, 1], [-12, 12]),
    { stiffness: 50, damping: 25 }
  );
  const globalRotateX = useSpring(
    useTransform(rawMouseY, [0, 1], [6, -6]),
    { stiffness: 50, damping: 25 }
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawMouseX.set((e.clientX - rect.left) / rect.width);
      rawMouseY.set((e.clientY - rect.top) / rect.height);
    },
    [rawMouseX, rawMouseY]
  );

  // Mobile: snap scroll slider
  if (isMobile) {
    return (
      <section className="relative w-full min-h-screen flex flex-col pt-24">
        <div className="flex-1 flex flex-col justify-center px-6">
          <div
            className="flex gap-4 overflow-x-auto pb-6 no-scrollbar"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {projects.map((project) => (
              <div
                key={project.slug}
                className="flex-shrink-0 w-[300px] h-[200px] rounded-xl overflow-hidden"
                style={{ scrollSnapAlign: "center" }}
              >
                <a href={`/work/${project.slug}`} className="block w-full h-full">
                  <div className={`w-full h-full ${project.bg} flex items-center justify-center`}>
                    <p className={`text-lg font-bold ${project.textColor}`}>{project.name}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="p-10 pt-0">
          <p className="text-lg font-medium leading-tight tracking-tight text-[#1A1A1A]">
            Hi, I&apos;m Marlay. I help brands translate strategy into clear,
            impactful digital experiences.
          </p>
        </div>
      </section>
    );
  }

  // Visible cards = 5 centered, stacked with Z offset and slight X spread
  const visibleCount = 5;
  const centerIndex = Math.floor(visibleCount / 2);

  return (
    <section
      className="relative w-full h-screen flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Magnetic pill — only visible when hovering a card */}
      <ProjectCursorPill visible={hoveredIndex !== null} />

      {/* 3D Stack Carousel */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative"
          style={{
            rotateY: globalRotateY,
            rotateX: globalRotateX,
            transformStyle: "preserve-3d",
          }}
        >
          {projects.slice(0, visibleCount).map((project, index) => {
            // Stack layout: cards fan out from center with Z-depth overlap
            const offset = index - centerIndex;
            const xSpread = offset * 180; // horizontal spread
            const zDepth = -Math.abs(offset) * 80; // push non-center cards back
            const rotateCard = offset * -4; // slight fan rotation

            return (
              <CarouselCard
                key={project.slug}
                project={project}
                index={index}
                isHovered={hoveredIndex === index}
                isOtherHovered={hoveredIndex !== null && hoveredIndex !== index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                stackX={xSpread}
                stackZ={zDepth}
                stackRotateY={rotateCard}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Four Corners Bio */}
      <div className="absolute bottom-0 left-0 right-0 p-10 flex justify-between items-end pointer-events-none">
        {/* Bottom-Left */}
        <motion.div
          className="max-w-[450px] pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg font-medium leading-tight tracking-tight text-[#1A1A1A]">
            Hi, I&apos;m Marlay. I help brands translate strategy into clear,
            impactful digital experiences.
          </p>
          <p className="text-sm text-[#6B7280] mt-3">
            We craft brands, websites and digital products designed to stand out
            and scale.
          </p>
        </motion.div>

        {/* Bottom-Right */}
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
            Co-founder of
          </p>
          <p className="text-sm font-bold text-[#1A1A1A]">STUDIO ARCT</p>
          <p className="text-xs tracking-[1px] text-[#9CA3AF]">
            BORDEAUX — FR
          </p>
          <SocialIcons />
        </motion.div>
      </div>
    </section>
  );
}
