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
  stackX: number;
  stackZ: number;
  stackRotateY: number;
}

export default function CarouselCard({
  project,
  index,
  isHovered,
  isOtherHovered,
  onHoverStart,
  onHoverEnd,
  stackX,
  stackZ,
  stackRotateY,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const localMouseX = useMotionValue(0);
  const localMouseY = useMotionValue(0);

  // Per-card tilt relative to card center
  const tiltX = useSpring(
    useTransform(localMouseY, [-150, 150], [10, -10]),
    { stiffness: 200, damping: 20 }
  );
  const tiltY = useSpring(
    useTransform(localMouseX, [-200, 200], [-10, 10]),
    { stiffness: 200, damping: 20 }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    localMouseX.set(e.clientX - (rect.left + rect.width / 2));
    localMouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    localMouseX.set(0);
    localMouseY.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-[420px] h-[300px] rounded-xl overflow-hidden"
      style={{
        rotateX: isHovered ? tiltX : 0,
        rotateY: isHovered ? tiltY : 0,
        transformStyle: "preserve-3d",
        boxShadow: isHovered
          ? "0 35px 80px rgba(0,0,0,0.25)"
          : "0 25px 60px rgba(0,0,0,0.15)",
        left: "50%",
        top: "50%",
        marginLeft: "-210px",
        marginTop: "-150px",
      }}
      animate={{
        x: isHovered ? stackX : stackX,
        z: isHovered ? stackZ + 80 : isOtherHovered ? stackZ - 30 : stackZ,
        rotateY: isHovered ? 0 : stackRotateY,
        scale: isHovered ? 1.08 : 1,
        opacity: isOtherHovered ? 0.5 : 1,
        y: [0, -15, 0],
      }}
      transition={{
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.6,
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
