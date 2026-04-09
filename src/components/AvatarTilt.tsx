"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AvatarTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 20, rotateY: x * 20 });
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Tooltip */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            className="absolute -top-16 left-1/2 bg-white rounded-lg px-4 py-2 shadow-lg border border-gray-100 whitespace-nowrap pointer-events-none z-20"
            style={{ transform: "translateX(-50%)" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-bold text-[#1A1A1A]">Dario Tonini</p>
            <p className="text-[10px] text-[#6B7280]">Photographer</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar frame */}
      <div
        style={{ perspective: "400px" }}
        className="w-16 h-16 md:w-[72px] md:h-[72px]"
      >
        <div
          ref={ref}
          className="w-full h-full rounded-full overflow-hidden ring-2 ring-gray-200"
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: "transform 0.1s ease-out",
            transformStyle: "preserve-3d",
          }}
          onMouseMove={onMove}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            setHovering(false);
            setTilt({ rotateX: 0, rotateY: 0 });
          }}
          data-cursor-hover
          data-protected
        >
          <Image
            src="/images/portrait.jpg"
            alt="Dario Tonini"
            width={72}
            height={72}
            className="object-cover w-full h-full pointer-events-none"
            quality={90}
            priority
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
