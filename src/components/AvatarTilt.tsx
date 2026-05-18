"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

interface Props {
  showTooltip?: boolean;
}

export default function AvatarTilt({ showTooltip = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovering, setHovering] = useState(false);
  const { t } = useTranslation();

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 20, rotateY: x * 20 });
  }, []);

  return (
    <div className="relative" style={{ width: 36, height: 36 }}>
      <AnimatePresence>
        {showTooltip && hovering && (
          <motion.div
            className="absolute pointer-events-none z-20"
            style={{ bottom: "calc(100% + 6px)", left: "50%" }}
            initial={{ opacity: 0, y: 4, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="rounded-lg shadow-lg"
              style={{
                background: "#1A1A1A",
                padding: "5px 10px",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              <p className="text-white leading-tight font-bold" style={{ fontSize: 10 }}>{t("avatar.name")}</p>
              <p className="text-gray-400 leading-tight" style={{ fontSize: 8.5 }}>{t("avatar.role")}</p>
            </div>
            <div
              style={{
                width: 0,
                height: 0,
                margin: "0 auto",
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid #1A1A1A",
                borderRadius: "0 0 2px 2px",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{ perspective: "400px" }}
        className="w-9 h-9"
      >
        <div
          ref={ref}
          className="w-full h-full rounded-full overflow-hidden ring-2 ring-[#0000ff]"
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
            src="/images/avatar.jpg"
            alt="Dario Tonini"
            width={36}
            height={36}
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
