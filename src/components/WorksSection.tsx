"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface WorkItem {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
}

const works: WorkItem[] = [
  {
    id: 1,
    title: "Horizon Interface",
    category: "Web Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1634017839464-5c339afa1f97?w=800&h=1000&fit=crop",
  },
  {
    id: 2,
    title: "Lunar Brand System",
    category: "Branding",
    year: "2025",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=1000&fit=crop",
  },
  {
    id: 3,
    title: "Prism Dashboard",
    category: "UI/UX",
    year: "2025",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=1000&fit=crop",
  },
  {
    id: 4,
    title: "Vertex Studio",
    category: "Creative Direction",
    year: "2024",
    image: "https://images.unsplash.com/photo-1614851099511-773084f6911d?w=800&h=1000&fit=crop",
  },
  {
    id: 5,
    title: "Aurora Platform",
    category: "Development",
    year: "2024",
    image: "https://images.unsplash.com/photo-1604076913837-52ab5f7c1ac4?w=800&h=1000&fit=crop",
  },
  {
    id: 6,
    title: "Solstice App",
    category: "Mobile Design",
    year: "2023",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=1000&fit=crop",
  },
];

function WorkCard({
  work,
  index,
}: {
  work: WorkItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      data-cursor-hover
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
    >
      <a href="#" className="block">
        <div className="aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized
            />
          </motion.div>
        </div>
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h3 className="text-base font-medium tracking-tight">
              {work.title}
            </h3>
            <p className="text-sm text-black/50 mt-0.5">{work.category}</p>
          </div>
          <span className="text-xs text-black/40 mt-1">{work.year}</span>
        </div>
      </a>
    </motion.div>
  );
}

export default function WorksSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="works" className="px-10 py-32">
      {/* Title row */}
      <div ref={titleRef} className="mb-20 flex items-end gap-6">
        <motion.h2
          className="text-[15vw] font-black leading-[0.8] tracking-[-0.05em] text-black"
          initial={{ opacity: 0, y: 100 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          WORKS
        </motion.h2>
        <motion.span
          className="inline-flex items-center px-3 py-1 border border-black/20 rounded-full text-xs font-medium tracking-wide mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            titleInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        >
          ©21 – 26
        </motion.span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {works.map((work, index) => (
          <WorkCard key={work.id} work={work} index={index} />
        ))}
      </div>
    </section>
  );
}
