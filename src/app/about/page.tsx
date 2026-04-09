"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SocialIcons from "@/components/SocialIcons";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

export default function AboutPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());

  // Continuous idle animation — gentle floating tilt
  useEffect(() => {
    const animate = () => {
      if (!isHovering) {
        const t = (Date.now() - startTimeRef.current) / 1000;
        setTilt({
          rotateX: Math.sin(t * 0.8) * 4,
          rotateY: Math.cos(t * 0.6) * 5,
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
    setTilt({
      rotateX: -y * 14,
      rotateY: x * 14,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    startTimeRef.current = Date.now();
  }, []);

  return (
    <section className="pt-28 md:pt-36 pb-20 px-5 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* LEFT COLUMN — Text */}
          <div>
            <motion.h1
              className="text-4xl md:text-6xl font-black text-[#1A1A1A] mb-8 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
            >
              Hey, I&apos;m Dario.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
            >
              <p className="text-lg font-medium leading-tight tracking-tight text-[#1A1A1A] mb-5">
                A <span className="font-bold text-[#0000ff]">french photographer</span> dedicated
                to capturing raw emotions and minimalist digital aesthetics.
              </p>
              <p className="text-base text-[#6B7280] leading-relaxed mb-5">
                Through my lens, I explore the quiet beauty of everyday moments,
                transforming them into powerful visual narratives. My work sits
                at the intersection of documentary photography and fine art.
              </p>
              <p className="text-base text-[#6B7280] leading-relaxed mb-10">
                Every project is an opportunity to push boundaries and create
                something that resonates with people. I believe in the power of
                visual storytelling.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
            >
              <a
                href="mailto:toninidario@yahoo.fr"
                data-cursor-hover
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#0000ff] text-[#0000ff] text-sm font-semibold tracking-wide rounded-lg hover:bg-[#0000ff] hover:text-white transition-all duration-300"
              >
                Me laisser un mail
              </a>
              <a
                href="tel:0603466274"
                data-cursor-hover
                className="inline-flex items-center justify-center px-6 py-3 bg-[#0000ff] text-white text-sm font-semibold tracking-wide rounded-lg hover:bg-[#0000cc] transition-all duration-300"
              >
                M&apos;appeler
              </a>
            </motion.div>

            {/* Social + Details */}
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.3 }}
            >
              <div className="flex gap-10">
                <div>
                  <p className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF] mb-1">Role</p>
                  <p className="text-sm font-bold text-[#1A1A1A]">Photographer</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF] mb-1">Location</p>
                  <p className="text-sm font-bold text-[#1A1A1A]">France</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF] mb-1">Specialties</p>
                  <p className="text-sm text-[#1A1A1A]">Portrait, Editorial, Fine Art</p>
                </div>
              </div>
              <SocialIcons />
            </motion.div>
          </div>

          {/* RIGHT COLUMN — 3D Portrait with continuous animation */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...spring, delay: 0.15 }}
            className="flex justify-center md:justify-end"
          >
            <div
              style={{ perspective: "1000px" }}
              className="w-full max-w-[380px]"
            >
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
                  alt="Dario Tonini — Photographer"
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 380px"
                  quality={90}
                  priority
                  draggable={false}
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
