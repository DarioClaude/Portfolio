"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

const AUTO_INTERVAL = 5000;

// ── Shared helpers ──
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// ══════════════════════════════════════════════════
//  DESKTOP: 3D depth carousel with aggressive scale-down
// ══════════════════════════════════════════════════

const CARD_H = 420;
const LANDSCAPE_RATIO = 3 / 2;
const PORTRAIT_RATIO = 2 / 3;
const VISIBLE_RANGE = 5;
const EASE_FACTOR = 0.12;
const SNAP_THRESHOLD = 0.001;

function getCardWidth(orientation: "landscape" | "portrait") {
  return orientation === "landscape"
    ? Math.round(CARD_H * LANDSCAPE_RATIO)
    : Math.round(CARD_H * PORTRAIT_RATIO);
}

function computeCardStyle(offset: number) {
  const absOffset = Math.abs(offset);

  const scale =
    absOffset <= 1
      ? lerp(1, 0.3, absOffset)
      : lerp(0.3, 0.18, clamp(absOffset - 1, 0, 3) / 3);

  const blur =
    absOffset <= 1
      ? lerp(0, 7, absOffset)
      : lerp(7, 16, clamp(absOffset - 1, 0, 2) / 2);

  const opacity =
    absOffset <= 1
      ? lerp(1, 0.45, absOffset)
      : lerp(0.45, 0.05, clamp(absOffset - 1, 0, 3) / 3);

  const baseSpacing = 440;
  const compression =
    absOffset <= 1
      ? absOffset * baseSpacing
      : baseSpacing + (absOffset - 1) * baseSpacing * 0.25;
  const translateX = Math.sign(offset) * compression;

  return { scale, blur, opacity, translateX };
}

function DesktopCarousel({ images }: Props) {
  const len = images.length;
  const canvasRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);
  const dragVelocity = useRef(0);
  const autoTimerRef = useRef<ReturnType<typeof setInterval>>();
  const counterRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);

  const resetAutoTimer = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      targetRef.current += 1;
    }, AUTO_INTERVAL);
  }, []);

  const animate = useCallback(() => {
    const pos = posRef.current;
    const target = targetRef.current;

    if (!isDragging.current) {
      const delta = target - pos;
      if (Math.abs(delta) < SNAP_THRESHOLD) {
        posRef.current = target;
      } else {
        posRef.current += delta * EASE_FACTOR;
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const children = canvas.children as HTMLCollectionOf<HTMLElement>;

    for (let c = 0; c < children.length; c++) {
      const child = children[c];
      const slotOffset = c - VISIBLE_RANGE;
      const baseIndex = Math.floor(posRef.current);
      const imgIndex = ((baseIndex + slotOffset) % len + len) % len;

      child.dataset.imgIndex = String(imgIndex);

      const fractionalPos = posRef.current;
      const offset = slotOffset - (fractionalPos - Math.floor(fractionalPos));
      const style = computeCardStyle(offset);

      child.style.transform = `translateX(${style.translateX}px) scale(${style.scale})`;
      child.style.filter = style.blur > 0.5 ? `blur(${style.blur}px)` : "none";
      child.style.opacity = String(style.opacity);
      child.style.zIndex = String(VISIBLE_RANGE * 10 - Math.round(Math.abs(offset) * 10));

      const img = images[imgIndex];
      if (img) {
        const imgEl = child.querySelector("img") as HTMLImageElement | null;
        const placeholder = child.querySelector("[data-placeholder]") as HTMLElement | null;
        const w = getCardWidth(img.orientation);
        child.style.width = `${w}px`;

        if (img.src) {
          if (imgEl) {
            if (!imgEl.src.endsWith(img.src)) {
              imgEl.src = img.src;
              imgEl.alt = img.alt;
            }
            imgEl.style.display = "";
          }
          if (placeholder) placeholder.style.display = "none";
        } else {
          if (imgEl) imgEl.style.display = "none";
          if (placeholder) {
            placeholder.style.display = "";
            const label = placeholder.querySelector("span");
            if (label) label.textContent = img.orientation === "landscape" ? "3:2" : "2:3";
          }
        }
      }
    }

    const reticle = reticleRef.current;
    if (reticle) {
      const fractional = posRef.current - Math.floor(posRef.current);
      const centerStyle = computeCardStyle(-fractional);
      const activeImgIndex = (Math.floor(posRef.current) % len + len) % len;
      const activeW = getCardWidth(images[activeImgIndex]?.orientation ?? "landscape");
      const rPad = 16;
      reticle.style.transform = `translateX(${centerStyle.translateX}px)`;
      reticle.style.width = `${activeW + rPad * 2}px`;
      reticle.style.height = `${CARD_H + rPad * 2}px`;
      const reticleOpacity = 1 - Math.abs(fractional) * 2;
      reticle.style.opacity = String(clamp(reticleOpacity, 0, 1));
    }

    const rounded = Math.round(posRef.current);
    const displayIndex = ((rounded % len) + len) % len;
    const counterText = `${String(displayIndex + 1).padStart(2, "0")} / ${String(len).padStart(2, "0")}`;
    if (counterRef.current) counterRef.current.textContent = counterText;

    rafRef.current = requestAnimationFrame(animate);
  }, [len, images]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    resetAutoTimer();
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(autoTimerRef.current);
    };
  }, [animate, resetAutoTimer]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    lastDragX.current = e.clientX;
    lastDragTime.current = Date.now();
    dragVelocity.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    clearInterval(autoTimerRef.current);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    const now = Date.now();
    const dt = now - lastDragTime.current;
    if (dt > 0) {
      dragVelocity.current = (e.clientX - lastDragX.current) / dt;
    }
    lastDragX.current = e.clientX;
    lastDragTime.current = now;
    posRef.current = dragStartPos.current - dx / 300;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    targetRef.current = Math.round(posRef.current);
    resetAutoTimer();
  }, [resetAutoTimer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { targetRef.current += 1; resetAutoTimer(); }
      if (e.key === "ArrowLeft") { targetRef.current -= 1; resetAutoTimer(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resetAutoTimer]);

  const totalSlots = VISIBLE_RANGE * 2 + 1;

  return (
    <div className="flex flex-col items-center select-none">
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: `${CARD_H + 80}px`,
          maxHeight: "calc(100vh - 240px)",
          cursor: isDragging.current ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={canvasRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          {Array.from({ length: totalSlots }).map((_, i) => {
            const slotOffset = i - VISIBLE_RANGE;
            const imgIndex = ((slotOffset % len) + len) % len;
            const img = images[imgIndex];
            const w = getCardWidth(img.orientation);

            return (
              <div
                key={i}
                className="absolute will-change-transform"
                style={{ width: w, height: CARD_H, transformOrigin: "center center" }}
              >
                <div
                  className="w-full h-full rounded-[3px] overflow-hidden"
                  style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)" }}
                  data-protected
                >
                  {img.src ? (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={w}
                      height={CARD_H}
                      className="object-cover w-full h-full pointer-events-none select-none"
                      sizes={`${w}px`}
                      quality={85}
                      draggable={false}
                    />
                  ) : null}
                  <div
                    data-placeholder
                    className="w-full h-full bg-neutral-200 flex items-center justify-center absolute inset-0"
                    style={{ display: img.src ? "none" : "" }}
                  >
                    <span className="text-sm text-neutral-400 font-medium select-none">
                      {img.orientation === "landscape" ? "3:2" : "2:3"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          ref={reticleRef}
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            marginTop: `-${(CARD_H + 32) / 2}px`,
            width: getCardWidth(images[0]?.orientation ?? "landscape") + 32,
            height: CARD_H + 32,
            zIndex: 100,
          }}
        >
          <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-[#1A1A1A]/30" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-[#1A1A1A]/30" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-[#1A1A1A]/30" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-[#1A1A1A]/30" />
        </div>
      </div>

      <div
        ref={counterRef}
        className="mt-4 text-[11px] tracking-[1px] text-[#9CA3AF] font-medium tabular-nums"
      >
        01 / {String(len).padStart(2, "0")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  MOBILE: CSS 3D cylinder (Y-axis rotation)
// ══════════════════════════════════════════════════

const M_CARD_W = 200;
const M_CARD_H = 280;
const M_PERSPECTIVE = 1200;
const M_EASE = 0.1;

function MobileCylinder({ images }: Props) {
  const len = images.length;
  const groupRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const rafRef = useRef(0);
  const autoTimerRef = useRef<ReturnType<typeof setInterval>>();
  const counterRef = useRef<HTMLSpanElement>(null);

  const ANGLE_STEP = 360 / len;
  const naturalRadius = (M_CARD_W * 0.55) / Math.tan(Math.PI / Math.max(len, 3));
  const RADIUS = Math.min(Math.max(naturalRadius, 180), 320);

  const isDragging = useRef(false);
  const touchStartX = useRef(0);
  const touchStartAngle = useRef(0);

  const resetAutoTimer = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      targetAngleRef.current -= ANGLE_STEP;
    }, AUTO_INTERVAL);
  }, [ANGLE_STEP]);

  const goNext = useCallback(() => {
    targetAngleRef.current -= ANGLE_STEP;
    resetAutoTimer();
  }, [ANGLE_STEP, resetAutoTimer]);

  const goPrev = useCallback(() => {
    targetAngleRef.current += ANGLE_STEP;
    resetAutoTimer();
  }, [ANGLE_STEP, resetAutoTimer]);

  const animate = useCallback(() => {
    if (!isDragging.current) {
      const delta = targetAngleRef.current - angleRef.current;
      if (Math.abs(delta) < 0.05) {
        angleRef.current = targetAngleRef.current;
      } else {
        angleRef.current += delta * M_EASE;
      }
    }

    if (groupRef.current) {
      groupRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
    }

    const normalizedAngle = ((-angleRef.current % 360) + 360) % 360;
    const currentIndex = Math.round(normalizedAngle / ANGLE_STEP) % len;
    if (counterRef.current) {
      counterRef.current.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(len).padStart(2, "0")}`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [len, ANGLE_STEP]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    resetAutoTimer();
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(autoTimerRef.current);
    };
  }, [animate, resetAutoTimer]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartAngle.current = angleRef.current;
    clearInterval(autoTimerRef.current);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    angleRef.current = touchStartAngle.current + dx * 0.4;
    targetAngleRef.current = angleRef.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const snapAngle = Math.round(angleRef.current / ANGLE_STEP) * ANGLE_STEP;
    targetAngleRef.current = snapAngle;
    resetAutoTimer();
  }, [ANGLE_STEP, resetAutoTimer]);

  const arrowBtn =
    "flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E7EB] text-[#1A1A1A] transition-colors";

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center justify-center gap-4 mb-4">
        <button onClick={goPrev} className={arrowBtn} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span
          ref={counterRef}
          className="text-[11px] tracking-[1px] text-[#9CA3AF] font-medium tabular-nums"
        >
          01 / {String(len).padStart(2, "0")}
        </span>
        <button onClick={goNext} className={arrowBtn} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          perspective: `${M_PERSPECTIVE}px`,
          height: M_CARD_H + 40,
          touchAction: "pan-y",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
          }}
        >
          <div
            ref={groupRef}
            style={{
              transformStyle: "preserve-3d",
              width: 0,
              height: 0,
              position: "relative",
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="absolute rounded-[4px] overflow-hidden"
                style={{
                  width: M_CARD_W,
                  height: M_CARD_H,
                  left: -M_CARD_W / 2,
                  top: -M_CARD_H / 2,
                  transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                }}
                data-protected
              >
                {img.src ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={M_CARD_W}
                    height={M_CARD_H}
                    className="object-cover w-full h-full pointer-events-none select-none"
                    sizes={`${M_CARD_W}px`}
                    quality={80}
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                    <span className="text-sm text-neutral-400 font-medium">
                      {img.orientation === "landscape" ? "3:2" : "2:3"}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  MAIN EXPORT: picks desktop or mobile
// ══════════════════════════════════════════════════

export default function ImageSlideshow({ images }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (images.length === 0) return null;

  return isMobile ? (
    <MobileCylinder images={images} />
  ) : (
    <DesktopCarousel images={images} />
  );
}
