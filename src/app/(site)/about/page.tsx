"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import AvatarTilt from "@/components/AvatarTilt";
import SocialIcons from "@/components/SocialIcons";
import { useTranslation } from "@/context/LanguageContext";

const spring = { type: "spring" as const, stiffness: 100, damping: 22 };

const CAROUSEL_IMAGES = Array.from({ length: 26 }, (_, i) =>
  `/images/carousel/carousel-${String(i + 1).padStart(2, "0")}.jpg`
);

const N = CAROUSEL_IMAGES.length;
const CARD_W = 152;
const CARD_H = 115;
const GAP = 2;
const RADIUS = Math.round((CARD_W + GAP) * N / (2 * Math.PI));

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

function MetaRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center">
      <span className="flex items-center gap-2.5 flex-shrink-0">
        {icon}
        <span style={{ fontSize: 13, fontWeight: 400, color: "#000" }}>{text}</span>
      </span>
      <span aria-hidden className="flex-1 ml-4" style={{ height: 1, background: "rgba(0, 0, 0, 0.1)" }} />
    </div>
  );
}

function PortraitPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const tiltRef = useRef({ rotateX: 0, rotateY: 0 });
  const targetRef = useRef({ rotateX: 0, rotateY: 0 });
  const rafRef = useRef<number>(0);
  const idleRef = useRef<number>(0);
  const isHoveringRef = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animateLoop = useCallback(() => {
    tiltRef.current.rotateX = lerp(tiltRef.current.rotateX, targetRef.current.rotateX, 0.04);
    tiltRef.current.rotateY = lerp(tiltRef.current.rotateY, targetRef.current.rotateY, 0.04);

    if (ref.current) {
      ref.current.style.transform = `rotateX(${tiltRef.current.rotateX}deg) rotateY(${tiltRef.current.rotateY}deg)`;
    }

    rafRef.current = requestAnimationFrame(animateLoop);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animateLoop);

    const idle = () => {
      if (!isHoveringRef.current) {
        const t = Date.now() / 1000;
        targetRef.current = {
          rotateX: Math.sin(t * 0.45) * 3,
          rotateY: Math.cos(t * 0.35) * 4,
        };
      }
      idleRef.current = requestAnimationFrame(idle);
    };
    idleRef.current = requestAnimationFrame(idle);

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(idleRef.current);
    };
  }, [animateLoop]);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRef.current = { rotateX: -y * 14, rotateY: x * 14 };
  };

  return (
    <motion.div
      className="hidden md:block"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
    >
      <div style={{ perspective: "600px" }} className="w-[180px]">
        <div
          ref={ref}
          className="w-full aspect-[2/3] overflow-hidden shadow-xl relative"
          style={{
            transformStyle: "preserve-3d",
          }}
          onMouseMove={onMove}
          onMouseEnter={() => { isHoveringRef.current = true; }}
          onMouseLeave={() => {
            isHoveringRef.current = false;
            targetRef.current = { rotateX: 0, rotateY: 0 };
          }}
          data-cursor-hover
        >
          <Image
            src="/images/portrait.jpg"
            alt="Dario Tonini"
            fill
            className="object-cover pointer-events-none"
            sizes="180px"
            quality={85}
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();
  const [time, setTime] = useState("");

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

  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-[#000]">
      {/* TOP — Bio + Portrait */}
      <div className="relative z-20 pt-24 md:pt-30 px-5 md:px-10" style={{ isolation: "isolate" }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-start gap-10 md:gap-14">
            {/* Left column — Bio */}
            <motion.div
              className="flex flex-col gap-8 md:gap-10 max-w-[560px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
            >
              <div>
                <Pill>{t("about.pill.aboutMe")}</Pill>
              </div>

              <div>
                <p className="text-sm md:text-lg font-normal leading-snug md:leading-tight tracking-tight text-[#000] text-justify">
                  {t("about.heading")}
                </p>
                <p className="text-sm md:text-lg font-light leading-snug md:leading-tight tracking-tight text-[#9CA3AF] mt-1 md:mt-1.5 text-justify">
                  {t("about.heading.sub")}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <MetaRow icon={<GlobeIcon />} text={t("about.location.line")} />
                <MetaRow icon={<ClockIcon />} text={time || "—:—:—"} />
              </div>

              <div className="flex items-center gap-4">
                <AvatarTilt />
                <Button href="mailto:toninidario@yahoo.fr" variant="dark" size="sm">
                  {t("about.email")}
                </Button>
                <div className="ml-2">
                  <SocialIcons />
                </div>
              </div>
            </motion.div>

            {/* Portrait — small, aligned to bio height */}
            <PortraitPhoto />
          </div>
        </div>
      </div>

      {/* 3D Cylindrical Carousel — CLOU Architects style */}
      <motion.div
        className="hidden lg:block fixed inset-0 pointer-events-none z-0"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "85% 80%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            bottom: 70,
            transform:
              "rotateX(-2.5deg) rotateY(22deg) rotateZ(-1deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            style={{
              width: CARD_W,
              height: CARD_H,
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateY: -360 }}
            transition={{
              duration: 110,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {CAROUSEL_IMAGES.map((src, i) => (
              <div
                key={src + i}
                className="absolute overflow-hidden"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  top: 0,
                  left: 0,
                  transform: `rotateY(${i * (360 / N)}deg) translateZ(${RADIUS}px)`,
                  transformStyle: "preserve-3d",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="304px"
                  quality={90}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
