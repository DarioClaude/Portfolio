"use client";

import { motion } from "framer-motion";
import SocialIcons from "@/components/SocialIcons";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

export default function AboutPage() {
  return (
    <section className="pt-28 pb-20 px-10">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-6xl md:text-8xl font-black uppercase text-[#1A1A1A] mb-16 leading-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
        >
          About
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
          >
            <p className="text-xl font-medium leading-tight tracking-tight text-[#1A1A1A] mb-6">
              Hi, I&apos;m Marlay. I help brands translate strategy into clear,
              impactful digital experiences.
            </p>
            <p className="text-base text-[#6B7280] leading-relaxed mb-6">
              We craft brands, websites and digital products designed to stand
              out and scale. With over 5 years of experience in creative
              development, I bring a unique blend of design thinking and
              technical expertise.
            </p>
            <p className="text-base text-[#6B7280] leading-relaxed">
              Every project is an opportunity to push boundaries and create
              something that resonates with people. I believe in the power of
              thoughtful interaction and visual storytelling.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-xs tracking-[1.5px] uppercase text-[#6B7280] mb-1">
                Role
              </p>
              <p className="text-base font-bold text-[#1A1A1A]">
                Co-founder of STUDIO ARCT
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[1.5px] uppercase text-[#6B7280] mb-1">
                Location
              </p>
              <p className="text-base font-bold text-[#1A1A1A]">
                Bordeaux — FR
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[1.5px] uppercase text-[#6B7280] mb-1">
                Services
              </p>
              <p className="text-base text-[#1A1A1A]">
                Brand Identity, Web Design, Creative Direction, Development
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[1.5px] uppercase text-[#6B7280] mb-2">
                Social
              </p>
              <SocialIcons />
            </div>

            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="mailto:hello@marlay.dev"
                data-cursor-hover
                className="text-2xl font-black text-[#1A1A1A] hover:opacity-60 transition-opacity"
              >
                hello@marlay.dev
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
