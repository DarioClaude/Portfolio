"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

export default function AvatarTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 20, rotateY: x * 20 });
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <div
        style={{ perspective: "400px" }}
        className="w-9 h-9"
      >
        <div
          ref={ref}
          className="w-full h-full rounded-full overflow-hidden ring-2 ring-[#0000ff]"
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: "transform 0.1s ease-out",
            transformStyle: "preserve-3d",
          }}
          onMouseMove={onMove}
          onMouseLeave={() => {
            setTilt({ rotateX: 0, rotateY: 0 });
          }}
          data-cursor-hover
          data-protected
        >
          <Image
            src="/images/avatar.jpg"
            alt="Dario Tonini"
            width={36}
            height={36}
            className="object-cover w-full h-full pointer-events-none"
            quality={90}
            priority
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
