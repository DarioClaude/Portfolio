"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  slug: string;
  title: string;
  imagePath: string;
  cardW: number;
}

export default function CarouselCard({ slug, title, imagePath, cardW }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovering, setHovering] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 12, rotateY: x * 12 });
  }, []);

  return (
    <div
      ref={ref}
      style={{ perspective: "600px" }}
      className="w-full h-full"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setTilt({ rotateX: 0, rotateY: 0 });
      }}
    >
      <div
        className="w-full h-full rounded-[4px] overflow-hidden"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: hovering ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
          transformStyle: "preserve-3d",
          boxShadow: hovering
            ? "0 20px 40px rgba(0,0,0,0.2)"
            : "0 8px 20px rgba(0,0,0,0.1)",
        }}
        data-cursor-hover
        data-protected
      >
        <Link
          href={`/work/${slug}`}
          className="block w-full h-full relative select-none"
          draggable={false}
        >
          <Image
            src={imagePath}
            alt={title}
            fill
            className={`object-cover pointer-events-none transition-transform duration-500 ease-out ${
              hovering ? "scale-105" : "scale-100"
            }`}
            sizes={`${cardW}px`}
            quality={90}
            draggable={false}
          />
        </Link>
      </div>
    </div>
  );
}
