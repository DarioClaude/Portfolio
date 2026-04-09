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
      <div className="max-w-[1100px] mx-auto">
        {/* Two-column: small photo left, text right */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* LEFT — Small 3D Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            className="flex-shrink-0 md:mt-2"
          >
            <div
              style={{ perspective: "800px" }}
              className="w-[180px] md:w-[220px]"
            >
              <div
                ref={cardRef}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(20px)`,
                  transition: isHovering ? "transform 0.15s ease-out" : "none",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1)",
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
                  sizes="220px"
                  quality={90}
                  priority
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Text Content */}
          <div className="flex-1">
            <motion.h1
              className="text-4xl md:text-[52px] font-black text-[#1A1A1A] mb-6 leading-[1.1] tracking-tight"
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
              <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mb-5 max-w-[520px]">
                I&apos;ve been capturing moments and stories through photography for several
                years, working with brands and individuals worldwide. Using my camera
                as my primary tool allows me to create fast, authentic, and powerful
                visual experiences without compromising quality.
              </p>
              <p className="text-base md:text-lg text-[#1A1A1A] leading-relaxed mb-10 max-w-[520px]">
                So if you&apos;re looking for a <span className="font-bold text-[#0000ff]">photographer</span> and{" "}
                <span className="font-bold text-[#0000ff]">creative director</span> to
                create distinctive, high-quality digital experiences,{" "}
                <span className="font-semibold">feel free to reach out by email or
                connect with me on social media.</span>
              </p>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
            >
              <SocialIcons />
            </motion.div>

            {/* Contact links — inline like the reference */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.25 }}
            >
              <a
                href="mailto:toninidario@yahoo.fr"
                data-cursor-hover
                className="text-sm md:text-base font-semibold text-[#1A1A1A] hover:text-[#0000ff] transition-colors"
              >
                toninidario@yahoo.fr
              </a>
              <a
                href="tel:0603466274"
                data-cursor-hover
                className="text-sm md:text-base font-semibold text-[#1A1A1A] hover:text-[#0000ff] transition-colors"
              >
                06 03 46 62 74
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
