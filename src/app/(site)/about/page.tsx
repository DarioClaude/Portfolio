"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SocialIcons from "@/components/SocialIcons";
import { useTranslation } from "@/context/LanguageContext";

const spring = { type: "spring" as const, stiffness: 100, damping: 22 };

export default function AboutPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());
  const { t } = useTranslation();

  useEffect(() => {
    const animate = () => {
      if (!isHovering) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setTilt({
          rotateX: Math.sin(elapsed * 0.8) * 4,
          rotateY: Math.cos(elapsed * 0.6) * 5,
        });
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isHovering]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 14, rotateY: x * 14 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    startTimeRef.current = Date.now();
  }, []);

  return (
    <section
      className="flex flex-col bg-white text-[#191D23] overflow-hidden"
      style={{ height: "100vh", paddingTop: "64px" }}
    >
      {/* CENTER — interactive 3D portrait, fills remaining vertical space */}
      <div className="flex-1 flex items-center justify-center px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.1 }}
          style={{ perspective: "1100px" }}
          className="w-full max-w-[300px] md:max-w-[360px]"
        >
          <div
            ref={cardRef}
            className="relative rounded-2xl overflow-hidden"
            style={{
              aspectRatio: "3/4",
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(20px)`,
              transition: isHovering ? "transform 0.15s ease-out" : "none",
              transformStyle: "preserve-3d",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.15), 0 10px 24px rgba(0,0,0,0.1)",
              willChange: "transform",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-protected
            data-cursor-hover
          >
            <Image
              src="/images/portrait.jpg"
              alt="Dario Tonini"
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 768px) 100vw, 360px"
              quality={90}
              priority
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* BOTTOM BIO STRIP — anchored, 2-column at md+ */}
      <div
        className="w-full"
        style={{ padding: "0 clamp(20px, 5vw, 74px) clamp(28px, 4vh, 48px)" }}
      >
        <motion.section
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.25 }}
        >
          {/* LEFT — bio */}
          <div style={{ maxWidth: 560 }}>
            <p
              className="font-sans"
              style={{
                fontSize: 15,
                fontWeight: 400,
                lineHeight: 1.65,
                color: "#191D23",
              }}
            >
              {t("about.bio.primary")}
            </p>
            <p
              className="font-sans mt-2"
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.65,
                color: "rgba(25, 29, 35, 0.55)",
              }}
            >
              {t("about.bio.secondary")}
            </p>
          </div>

          {/* RIGHT — availability tag, city, socials */}
          <div className="flex flex-col items-start md:items-end gap-2.5">
            <span
              className="font-sans"
              style={{
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "#191D23",
              }}
            >
              {t("about.tag")}
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: 13,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "rgba(25, 29, 35, 0.55)",
              }}
            >
              {t("about.cityFR")}
            </span>
            <div style={{ color: "#191D23" }}>
              <SocialIcons />
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
