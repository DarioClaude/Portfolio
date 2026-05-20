"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import ProjectCursorPill from "./ProjectCursorPill";
import SocialIcons from "./SocialIcons";
import AvatarTilt from "./AvatarTilt";
import CarouselCard from "./CarouselCard";
import { carouselProjects } from "@/lib/projects";
import { useTranslation, renderBold } from "@/context/LanguageContext";

const CARD_COUNT = 6;
const ANGLE_STEP = 360 / CARD_COUNT; // 60deg

// Fluid dimensions — computed from container width for proportional scaling
function getFluidDims(containerW: number) {
  if (containerW < 768) {
    const t = Math.min(Math.max((containerW - 320) / 448, 0), 1);
    const cardW = Math.round(143 + t * 44);
    const cardH = Math.round(cardW / 1.5);
    const radius = Math.round(cardW * 1.04);
    return { cardW, cardH, radius };
  }
  const t = Math.min(Math.max((containerW - 900) / 900, 0), 1);
  const cardW = Math.round(340 + t * 80);
  const cardH = Math.round(cardW / 1.5);
  const radius = Math.round(380 + t * 90);
  return { cardW, cardH, radius };
}

export default function HeroCarousel() {
  const [globalRotation, setGlobalRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dims, setDims] = useState({ cardW: 380, cardH: 253, radius: 430 });
  const [isHoveringWheel, setIsHoveringWheel] = useState(false);
  const [mobileGap, setMobileGap] = useState(80);
  const autoRotateRef = useRef(true);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileTextRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const containerW = sectionRef.current?.offsetWidth ?? window.innerWidth;
      setDims(getFluidDims(Math.min(containerW, 1800)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const computeGap = () => {
      if (!mobileTextRef.current) return;
      const vh = window.innerHeight;
      const textTop = Math.max(70, Math.min(0.12 * vh, 100));
      const textHeight = mobileTextRef.current.offsetHeight;
      const textBottom = textTop + textHeight;
      const carouselCenterY = vh * 0.48 - 97;
      const carouselTop = carouselCenterY - dims.cardH / 2;
      setMobileGap(Math.max(carouselTop - textBottom, 15));
    };
    requestAnimationFrame(computeGap);
    window.addEventListener("resize", computeGap);
    return () => window.removeEventListener("resize", computeGap);
  }, [isMobile, dims]);

  // Auto-rotation — slow luxury feel
  useEffect(() => {
    let raf: number;
    const rotate = () => {
      if (autoRotateRef.current && !isHoveringWheel) {
        setGlobalRotation((prev) => prev - (isMobile ? 0.04 : 0.018));
      }
      raf = requestAnimationFrame(rotate);
    };
    raf = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(raf);
  }, [isHoveringWheel, isMobile]);

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

  // Touch/drag handlers — horizontal swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    autoRotateRef.current = false;
    dragStartX.current = e.touches[0].clientX;
    dragStartRotation.current = globalRotation;
  }, [globalRotation]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - dragStartX.current;
    setGlobalRotation(dragStartRotation.current + dx * 0.5);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => { autoRotateRef.current = true; }, 2000);
  }, []);

  // Mouse drag for desktop
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
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
  }, [globalRotation]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      <ProjectCursorPill visible={isHoveringWheel} />

      {/* ===== CAROUSEL — centered within the max-w container ===== */}
      <div
        className="absolute left-1/2"
        style={{
          top: isMobile ? "calc(48% - 97px)" : "42%",
          transform: "translate(-50%, -50%)",
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
            touchAction: "pan-y",
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
                }}
              >
                <CarouselCard
                  slug={project.slug}
                  title={project.title}
                  imagePath={project.imagePath}
                  cardW={dims.cardW}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== MOBILE: Bio text above carousel, centered ===== */}
      {isMobile && (
        <motion.div
          ref={mobileTextRef}
          className="absolute left-0 right-0 z-10 text-center pointer-events-auto"
          style={{ top: "clamp(70px, 12vh, 100px)", padding: "0 24px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm font-normal leading-snug tracking-tight text-[#1A1A1A] dark:text-[#f5f5f5] whitespace-pre-line">
            {renderBold(t("hero.bio"), "text-[#0000ff]")}
          </p>
          <p className="text-sm font-light leading-snug tracking-tight text-[#9CA3AF] dark:text-[#71717a] mt-1">
            {t("hero.sub")}
          </p>
        </motion.div>
      )}

      {/* ===== MOBILE: Avatar + name + socials centered below carousel ===== */}
      {isMobile && (
        <motion.div
          className="absolute left-0 right-0 z-10 flex justify-center pointer-events-auto"
          style={{ top: `calc(48% - 97px + ${dims.cardH / 2 + mobileGap + 20}px)` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <AvatarTilt />
            <div className="flex flex-col leading-none">
              <p className="text-sm font-normal tracking-tight text-[#1A1A1A] leading-none">Dario Tonini</p>
              <p className="text-xs tracking-[0.5px] text-[#9CA3AF] leading-none mt-0.5">@dariotni</p>
            </div>
            <SocialIcons />
          </div>
        </motion.div>
      )}

      {/* ===== DESKTOP: Footer bio — original layout ===== */}
      {!isMobile && (
        <div
          className="absolute left-0 right-0 flex justify-between items-end pointer-events-none z-10"
          style={{
            bottom: "clamp(40px, 12vh, 140px)",
            padding: "0 clamp(20px, 3vw, 40px)",
          }}
        >
          <motion.div
            className="pointer-events-auto"
            style={{ maxWidth: "520px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg font-normal leading-tight tracking-tight text-[#1A1A1A] dark:text-[#f5f5f5] whitespace-pre-line">
              {renderBold(t("hero.bio"), "text-[#0000ff]")}
            </p>
            <p className="text-lg font-light leading-tight tracking-tight text-[#9CA3AF] dark:text-[#71717a] mt-1.5">
              {t("hero.sub")}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-end gap-2 pointer-events-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <AvatarTilt showTooltip />
            <div className="flex flex-col items-end leading-none">
              <p className="text-lg font-normal tracking-tight text-[#1A1A1A] leading-none">Dario Tonini</p>
              <p className="text-xs tracking-[0.5px] text-[#9CA3AF] dark:text-[#71717a] leading-none mt-0.5">@dariotni</p>
            </div>
            <SocialIcons />
          </motion.div>
        </div>
      )}
    </section>
  );
}
