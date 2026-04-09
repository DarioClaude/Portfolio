"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springConfig = { stiffness: 150, damping: 20 };

export default function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);
  const [isPrecise, setIsPrecise] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  useEffect(() => {
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor-hover]"
      );
      const precise = target.closest("[data-cursor-precise]");
      setIsHovering(!!interactive);
      setIsPrecise(!!precise);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[10000] pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: "difference",
      }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: isPrecise ? 24 : isHovering ? 48 : 16,
          height: isPrecise ? 24 : isHovering ? 48 : 16,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}
