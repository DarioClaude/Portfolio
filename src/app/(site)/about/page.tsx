"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

const spring = { type: "spring" as const, stiffness: 100, damping: 22 };

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center font-sans"
      style={{
        padding: "6px 14px",
        borderRadius: 9999,
        border: "1px solid rgba(0, 0, 255, 0.25)",
        color: "#0000ff",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.01em",
        background: "#fff",
      }}
    >
      {children}
    </span>
  );
}

function Divider() {
  return (
    <span
      aria-hidden
      className="flex-1 mx-3 md:mx-5"
      style={{ height: 1, background: "rgba(25, 29, 35, 0.12)", minWidth: 24 }}
    />
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0000ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0000ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-2 flex-shrink-0">
      <span style={{ color: "#0000ff", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>
        {value}
      </span>
      <span style={{ color: "#191D23", fontSize: 14, fontWeight: 400 }}>
        {label}
      </span>
    </span>
  );
}

function MetaRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center">
      <span className="flex items-center gap-2.5 flex-shrink-0">
        {icon}
        <span style={{ fontSize: 13, fontWeight: 400, color: "#191D23" }}>{text}</span>
      </span>
      <span aria-hidden className="flex-1 ml-4" style={{ height: 1, background: "rgba(25, 29, 35, 0.12)" }} />
    </div>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();
  const [time, setTime] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const format = () => {
      const d = new Date();
      let hh = d.getHours();
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      const ampm = hh >= 12 ? "PM" : "AM";
      hh = hh % 12 || 12;
      return `${String(hh).padStart(2, "0")}:${mm}:${ss} ${ampm}`;
    };
    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

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
    <section className="pt-28 md:pt-36 pb-24 md:pb-32 px-5 md:px-10 bg-white text-[#191D23]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT — pill + bio text + stats + meta + CTA */}
          <motion.div
            className="flex flex-col gap-8 md:gap-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <div>
              <Pill>{t("about.pill.aboutMe")}</Pill>
            </div>

            {/* Bio — same typo/size as hero, justified */}
            <div>
              <p className="text-sm md:text-lg font-normal leading-snug md:leading-tight tracking-tight text-[#1A1A1A] text-justify">
                {t("about.heading")}
              </p>
              <p className="text-sm md:text-lg font-light leading-snug md:leading-tight tracking-tight text-[#9CA3AF] mt-1 md:mt-1.5 text-justify">
                {t("about.heading.sub")}
              </p>
            </div>

            {/* Stats row */}
            <div className="flex items-center flex-wrap font-sans" style={{ rowGap: 8 }}>
              <Stat value={t("about.stats.years.value")} label={t("about.stats.years.label")} />
              <Divider />
              <Stat value={t("about.stats.projects.value")} label={t("about.stats.projects.label")} />
              <Divider />
              <Stat value={t("about.stats.clients.value")} label={t("about.stats.clients.label")} />
            </div>

            {/* Location + Time rows */}
            <div className="flex flex-col gap-3">
              <MetaRow icon={<GlobeIcon />} text={t("about.location.line")} />
              <MetaRow icon={<ClockIcon />} text={time || "—:—:—"} />
            </div>

            {/* CTA */}
            <a
              href="mailto:toninidario@yahoo.fr"
              data-cursor-hover
              className="inline-flex items-center justify-center font-sans transition-all duration-200 hover:-translate-y-px"
              style={{
                background: "#191D23",
                color: "#fff",
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 22px",
                borderRadius: 4,
                width: "fit-content",
                textDecoration: "none",
              }}
            >
              {t("about.cta")}
            </a>
          </motion.div>

          {/* RIGHT — 3D tilt portrait with continuous animation */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...spring, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <div style={{ perspective: "1000px" }} className="w-full max-w-[380px]">
              <div
                ref={cardRef}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(20px)`,
                  transition: isHovering ? "transform 0.15s ease-out" : "none",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.15), 0 10px 24px rgba(0,0,0,0.1)",
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
                  sizes="(max-width: 768px) 100vw, 380px"
                  quality={90}
                  priority
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
