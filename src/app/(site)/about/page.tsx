"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import AvatarTilt from "@/components/AvatarTilt";
import { useTranslation } from "@/context/LanguageContext";

const spring = { type: "spring" as const, stiffness: 100, damping: 22 };

const CAROUSEL_IMAGES = [
  "/images/gallery/cirro/1.jpg",
  "/images/gallery/garden/2.jpg",
  "/images/gallery/kora/3.jpg",
  "/images/gallery/marlay/4.jpg",
  "/images/gallery/ship-studio/5.jpg",
  "/images/gallery/studio-17/1.jpg",
  "/images/gallery/studio-arct/2.jpg",
  "/images/gallery/volumaker/3.jpg",
  "/images/gallery/para-bellum/1.jpg",
  "/images/gallery/cirro/4.jpg",
  "/images/gallery/garden/5.jpg",
  "/images/gallery/kora/6.jpg",
];

const N = CAROUSEL_IMAGES.length;
const CARD_W = 220;
const CARD_H = 155;
const GAP = 14;
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
        <span style={{ fontSize: 13, fontWeight: 400, color: "#191D23" }}>{text}</span>
      </span>
      <span aria-hidden className="flex-1 ml-4" style={{ height: 1, background: "rgba(25, 29, 35, 0.12)" }} />
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

  const animate = useCallback(() => {
    tiltRef.current.rotateX = lerp(tiltRef.current.rotateX, targetRef.current.rotateX, 0.04);
    tiltRef.current.rotateY = lerp(tiltRef.current.rotateY, targetRef.current.rotateY, 0.04);

    if (ref.current) {
      ref.current.style.transform = `rotateX(${tiltRef.current.rotateX}deg) rotateY(${tiltRef.current.rotateY}deg)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);

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
  }, [animate]);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRef.current = { rotateX: -y * 14, rotateY: x * 14 };
  };

  return (
    <motion.div
      className="hidden lg:block"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ...spring, delay: 0.15 }}
    >
      <div style={{ perspective: "600px" }} className="w-[230px]">
        <div
          ref={ref}
          className="w-full aspect-[2/3] rounded-lg overflow-hidden shadow-xl"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
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
            sizes="230px"
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
    <section className="pt-28 md:pt-36 pb-0 bg-white text-[#191D23] overflow-hidden min-h-screen">
      {/* BIO + PORTRAIT — two-column layout */}
      <div className="px-5 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-start justify-between gap-12 lg:gap-20">
            <motion.div
              className="max-w-[600px] flex flex-col gap-8 md:gap-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
            >
              <div>
                <Pill>{t("about.pill.aboutMe")}</Pill>
              </div>

              <div>
                <p className="text-sm md:text-lg font-normal leading-snug md:leading-tight tracking-tight text-[#1A1A1A] text-justify">
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
              </div>
            </motion.div>

            <PortraitPhoto />
          </div>
        </div>
      </div>

      {/* 3D CYLINDRICAL CAROUSEL — tilted, auto-rotating */}
      <motion.div
        className="relative mt-12 md:mt-20"
        style={{
          height: "clamp(320px, 42vw, 520px)",
          perspective: "1200px",
          perspectiveOrigin: "50% 40%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <div
          style={{
            position: "absolute",
            left: "55%",
            top: "50%",
            transform: "translate(-50%, -50%) rotateX(-18deg) rotateZ(-6deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              width: CARD_W,
              height: CARD_H,
              transformStyle: "preserve-3d",
              animation: "carousel-spin 50s linear infinite",
            }}
          >
            {CAROUSEL_IMAGES.map((src, i) => (
              <div
                key={src + i}
                className="absolute rounded-lg overflow-hidden shadow-lg"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  top: 0,
                  left: 0,
                  transform: `rotateY(${i * (360 / N)}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="220px"
                  quality={75}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
