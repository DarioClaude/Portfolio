"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import AvatarTilt from "@/components/AvatarTilt";
import SocialIcons from "@/components/SocialIcons";
import { useTranslation } from "@/context/LanguageContext";

const CylinderCarousel = dynamic(() => import("@/components/CylinderCarousel"), {
  ssr: false,
});

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
  const [portraitWidth, setPortraitWidth] = useState("clamp(100px, 13vw, 180px)");
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobilePortrait(mobile);
      setPortraitWidth(mobile ? "70px" : "clamp(100px, 13vw, 180px)");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
    targetRef.current = { rotateX: -y * 24, rotateY: x * 24 };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
      style={{ marginTop: isMobilePortrait ? 56 : "clamp(54px, 6vw, 80px)" }}
    >
      <div style={{ perspective: "600px", width: portraitWidth }}>
        <div
          ref={ref}
          className="w-full aspect-[2/3] overflow-hidden rounded-sm relative"
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
    <section className={`relative bg-white text-[#000] overflow-hidden ${isMobile ? "" : "min-h-screen"}`} style={isMobile ? { height: '100dvh', overflowY: 'hidden' } : undefined}>
      {/* TOP — Bio + Portrait */}
      <div className="relative z-20" style={{ paddingTop: "clamp(96px, 10vw, 120px)", paddingLeft: "clamp(20px, 3vw, 40px)", paddingRight: "clamp(20px, 3vw, 40px)", isolation: "isolate" }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-start md:justify-center" style={{ gap: "clamp(24px, 4vw, 56px)" }}>
            {/* Left column — Bio */}
            <motion.div
              className="flex flex-col max-w-[560px]"
              style={{ gap: "clamp(24px, 3vw, 40px)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
            >
              <div style={{ marginTop: 10 }}>
                <Pill>{t("about.pill.aboutMe")}</Pill>
              </div>

              <div>
                <p className="font-normal leading-snug tracking-tight text-[#000] text-justify" style={{ fontSize: "clamp(14px, 1.3vw, 18px)" }}>
                  {t("about.heading")}
                </p>
                <p className="font-light leading-snug tracking-tight text-[#9CA3AF] text-justify" style={{ fontSize: "clamp(14px, 1.3vw, 18px)", marginTop: "clamp(4px, 0.3vw, 6px)" }}>
                  {t("about.heading.sub")}
                </p>
              </div>

              <div className="flex flex-col" style={{ gap: 10 }}>
                <MetaRow icon={<GlobeIcon />} text={t("about.location.line")} />
                <MetaRow icon={<ClockIcon />} text={time || "—:—:—"} />
              </div>

              <div className="flex items-center gap-4" style={{ marginTop: -2 }}>
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

      {/* 3D Cylindrical Carousel — WebGL */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {isMobile ? (
          <div className="absolute inset-0 pointer-events-auto">
            <Suspense fallback={null}>
              <CylinderCarousel />
            </Suspense>
          </div>
        ) : (
          <Link href="/work" className="absolute inset-0 pointer-events-auto">
            <Suspense fallback={null}>
              <CylinderCarousel />
            </Suspense>
          </Link>
        )}
      </div>
    </section>
  );
}
