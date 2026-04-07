"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Nebula Studio",
    category: "Branding & Web Design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1000&fit=crop",
    color: "#1a1a2e",
  },
  {
    id: 2,
    title: "Arcane Labs",
    category: "Creative Direction",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=1000&fit=crop",
    color: "#16213e",
  },
  {
    id: 3,
    title: "Void Agency",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=1000&fit=crop",
    color: "#0f3460",
  },
  {
    id: 4,
    title: "Flux Creative",
    category: "Art Direction",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&h=1000&fit=crop",
    color: "#533483",
  },
  {
    id: 5,
    title: "Echo Digital",
    category: "Development",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=1000&fit=crop",
    color: "#2c2c54",
  },
];

function CarouselCard({
  project,
  index,
  totalCards,
  hoveredIndex,
  onHover,
}: {
  project: Project;
  index: number;
  totalCards: number;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardMouseX = useMotionValue(0);
  const cardMouseY = useMotionValue(0);

  // Calculate spread based on mouse position
  const offset = index - Math.floor(totalCards / 2);
  const baseSpacing = 280;

  // Individual card tilt based on mouse position on card
  const cardRotateX = useSpring(
    useTransform(cardMouseY, [-150, 150], [8, -8]),
    { stiffness: 150, damping: 20 }
  );
  const cardRotateY = useSpring(
    useTransform(cardMouseX, [-200, 200], [-8, 8]),
    { stiffness: 150, damping: 20 }
  );

  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    cardMouseX.set(e.clientX - centerX);
    cardMouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    cardMouseX.set(0);
    cardMouseY.set(0);
    onHover(null);
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-[280px] md:w-[320px] h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl"
      data-cursor-label="See Project"
      data-cursor-hover
      style={{
        rotateY: cardRotateY,
        rotateX: cardRotateX,
        transformStyle: "preserve-3d",
      }}
      animate={{
        x: offset * baseSpacing,
        z: isHovered ? 80 : isOtherHovered ? -60 : 0,
        opacity: isOtherHovered ? 0.6 : 1,
        y: [0, -15, 0],
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        y: {
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        default: {
          type: "spring",
          stiffness: 100,
          damping: 20,
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="320px"
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${project.color}cc 0%, transparent 60%)`,
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
            {project.category}
          </p>
          <h3 className="text-xl font-semibold tracking-tight">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Mobile horizontal slider
  if (isMobile) {
    return (
      <section className="relative w-full min-h-screen flex flex-col justify-center">
        {/* Hero bio text */}
        <div className="px-10 pt-28 pb-10">
          <motion.p
            className="text-lg font-medium leading-tight tracking-tight max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hi, I&apos;m Marlay — a creative developer crafting immersive digital
            experiences at the intersection of design and technology.
          </motion.p>
        </div>

        {/* Mobile slider */}
        <div className="relative w-full overflow-hidden px-6">
          <motion.div
            className="flex gap-4"
            animate={{ x: -mobileIndex * 300 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-[280px] h-[360px] rounded-2xl overflow-hidden relative"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${project.color}cc 0%, transparent 60%)`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mobile dots */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === mobileIndex ? "bg-black" : "bg-black/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen flex flex-col">
      {/* Four corners layout */}
      <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none z-10">
        {/* Top spacer for header */}
        <div />

        {/* Bottom row */}
        <div className="flex justify-between items-end pointer-events-auto">
          {/* Bottom-Left: Bio */}
          <motion.div
            className="max-w-[450px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-base font-medium leading-tight tracking-tight" id="about">
              Hi, I&apos;m Marlay — a creative developer crafting immersive digital
              experiences at the intersection of design and technology. I
              believe in the power of thoughtful interaction and visual
              storytelling.
            </p>
          </motion.div>

          {/* Bottom-Right: Info */}
          <motion.div
            className="text-right text-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="font-semibold uppercase tracking-widest text-xs mb-2">
              Co-founder of Studio Arct
            </p>
            <p className="text-black/50 mb-4">Bordeaux — FR</p>
            <div className="flex gap-4 justify-end" id="contact">
              <a
                href="#"
                className="text-xs uppercase tracking-widest hover:opacity-50 transition-opacity"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-xs uppercase tracking-widest hover:opacity-50 transition-opacity"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3D Carousel */}
      <div
        ref={containerRef}
        className="perspective-container flex-1 flex items-center justify-center"
      >
        <div
          className="relative flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project, index) => (
            <CarouselCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projects.length}
              hoveredIndex={hoveredIndex}
              onHover={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
