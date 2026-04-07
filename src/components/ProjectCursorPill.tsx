"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";

const springConfig = { stiffness: 120, damping: 20 };

export default function ProjectCursorPill({ visible }: { visible: boolean }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    },
    [x, y]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 z-[10001] pointer-events-none"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="bg-[#1A1A1A] text-white text-[13px] font-medium px-5 py-2 rounded-full whitespace-nowrap">
            See the project
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
