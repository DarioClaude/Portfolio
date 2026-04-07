"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CarouselCard from "./CarouselCard";
import ProjectCursorPill from "./ProjectCursorPill";
import SocialIcons from "./SocialIcons";
import { projects } from "@/lib/projects";

export default function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);

  // Global tilt based on mouse X position
  const globalRotateY = useSpring(
    useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1440], [-8, 8]),
    { stiffness: 60, damping: 20 }
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
  };

  // Drag constraints
  const cardWidth = 420;
  const gap = 24;
  const totalWidth = projects.length * (cardWidth + gap);
  const viewWidth = typeof window !== "undefined" ? window.innerWidth : 1440;
  const dragRight = 200;
  const dragLeft = -(totalWidth - viewWidth + 200);

  // Mobile: snap scroll slider
  if (isMobile) {
    return (
      <section className="relative w-full min-h-screen flex flex-col pt-24">
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
                <a href={`/work/${project.slug}`} className="block w-full h-full">
                  <div className={`w-full h-full ${project.bg} flex items-center justify-center`}>
                    <p className={`text-lg font-bold ${project.textColor}`}>{project.name}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile bio */}
        <div className="p-10 pt-0">
          <p className="text-lg font-medium leading-tight tracking-tight text-[#1A1A1A]">
            Hi, I&apos;m Marlay. I help brands translate strategy into clear,
            impactful digital experiences.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full h-screen flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Pill cursor */}
      <ProjectCursorPill visible={hoveredIndex !== null} />

      {/* 3D Carousel */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          className="flex gap-6 pl-[calc(50vw-210px)]"
          style={{ rotateY: globalRotateY, transformStyle: "preserve-3d" }}
          drag="x"
          dragConstraints={{ left: dragLeft, right: dragRight }}
          dragElastic={0.1}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {projects.map((project, index) => (
            <CarouselCard
              key={project.slug}
              project={project}
              index={index}
              isHovered={hoveredIndex === index}
              isOtherHovered={hoveredIndex !== null && hoveredIndex !== index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))}
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
          {/* Avatar */}
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
