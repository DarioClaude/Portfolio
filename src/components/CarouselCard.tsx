"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import ProjectCardVisual from "./ProjectCardVisual";

interface Props {
  project: Project;
  index: number;
  isHovered: boolean;
  isOtherHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function CarouselCard({
  project,
  index,
  isHovered,
  isOtherHovered,
  onHoverStart,
  onHoverEnd,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-150, 150], [8, -8]),
    { stiffness: 150, damping: 20 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-200, 200], [-8, 8]),
    { stiffness: 150, damping: 20 }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[420px] h-[300px] rounded-xl overflow-hidden relative"
      style={{
        rotateX: isHovered ? 0 : rotateX,
        rotateY: isHovered ? 0 : rotateY,
        transformStyle: "preserve-3d",
        boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
      }}
      animate={{
        scale: isHovered ? 1.05 : 1,
        z: isHovered ? 50 : isOtherHovered ? -30 : 0,
        opacity: isOtherHovered ? 0.6 : 1,
        y: [0, -15, 0],
      }}
      transition={{
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        },
        default: { type: "spring", stiffness: 100, damping: 20 },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/work/${project.slug}`} className="block w-full h-full">
        <ProjectCardVisual project={project} />
      </Link>
    </motion.div>
  );
}
