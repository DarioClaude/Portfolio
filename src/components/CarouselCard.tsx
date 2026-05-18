"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  slug: string;
  title: string;
  imagePath: string;
  cardW: number;
}

export default function CarouselCard({ slug, title, imagePath, cardW }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef({ rotateX: 0, rotateY: 0 });
  const targetRef = useRef({ rotateX: 0, rotateY: 0 });
  const rafRef = useRef<number>(0);
  const isHoveringRef = useRef(false);
  const [hovering, setHovering] = useState(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  useEffect(() => {
    const animate = () => {
      tiltRef.current.rotateX = lerp(tiltRef.current.rotateX, targetRef.current.rotateX, 0.12);
      tiltRef.current.rotateY = lerp(tiltRef.current.rotateY, targetRef.current.rotateY, 0.12);

      if (innerRef.current) {
        innerRef.current.style.transform = `rotateX(${tiltRef.current.rotateX}deg) rotateY(${tiltRef.current.rotateY}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRef.current = { rotateX: -y * 12, rotateY: x * 12 };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ perspective: "600px" }}
      className="w-full h-full"
      onMouseMove={onMouseMove}
      onMouseEnter={() => {
        isHoveringRef.current = true;
        setHovering(true);
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false;
        setHovering(false);
        targetRef.current = { rotateX: 0, rotateY: 0 };
      }}
    >
      <div
        ref={innerRef}
        className="w-full h-full rounded-[4px] overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: hovering
            ? "0 20px 40px rgba(0,0,0,0.2)"
            : "0 8px 20px rgba(0,0,0,0.1)",
          transition: "box-shadow 0.4s ease-out",
        }}
        data-cursor-hide
        data-protected
      >
        <Link
          href={`/work/${slug}`}
          className="block w-full h-full relative select-none"
          draggable={false}
        >
          {imagePath ? (
            <Image
              src={imagePath}
              alt={title}
              fill
              className={`object-cover pointer-events-none transition-transform duration-500 ease-out ${
                hovering ? "scale-105" : "scale-100"
              }`}
              sizes={`${cardW}px`}
              quality={100}
              unoptimized
              draggable={false}
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 animate-pulse rounded-lg flex items-end p-3">
              <span className="text-xs font-normal text-neutral-500">{title}</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}
