"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };

export default function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });

      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor-hover], [data-cursor-label]");
      if (interactive) {
        setIsHovering(true);
        const label = interactive.getAttribute("data-cursor-label");
        setCursorLabel(label);
      } else {
        setIsHovering(false);
        setCursorLabel(null);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-black"
          animate={{
            width: isHovering ? 60 : 10,
            height: isHovering ? 60 : 10,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </motion.div>

      {/* Label cursor (e.g., "See Project") */}
      <AnimatePresence>
        {cursorLabel && (
          <motion.div
            className="fixed top-0 left-0 z-[10001] pointer-events-none"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="bg-black text-white text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap">
              {cursorLabel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
