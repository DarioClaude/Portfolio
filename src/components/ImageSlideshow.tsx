"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

// ── Layout constants ──
const CARD_H = 520;
const LANDSCAPE_RATIO = 3 / 2;
const PORTRAIT_RATIO = 2 / 3;
const VISIBLE_RANGE = 5;
const AUTO_INTERVAL = 5000;

// ── Spring physics constants ──
const SPRING_STIFFNESS = 0.08;
const SPRING_DAMPING = 0.78;
const DRAG_SENSITIVITY = 1;
const SNAP_THRESHOLD = 0.001;

// ── Depth interpolation ──
// Scale: center=1, adjacent=0.55, far=0.35
// Blur: center=0, adjacent=5px, far=12px
// Opacity: center=1, adjacent=0.6, far=0.15
// TranslateX compression: cards cluster toward center for parallax depth
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function getCardWidth(orientation: "landscape" | "portrait") {
  return orientation === "landscape"
    ? Math.round(CARD_H * LANDSCAPE_RATIO)
    : Math.round(CARD_H * PORTRAIT_RATIO);
}

// Compute visual properties for a card based on continuous offset from center
function computeCardStyle(offset: number) {
  const absOffset = Math.abs(offset);

  // Scale: 1 → 0.55 for first step, then 0.55 → 0.35 for farther
  const scale =
    absOffset <= 1
      ? lerp(1, 0.55, absOffset)
      : lerp(0.55, 0.35, clamp(absOffset - 1, 0, 3) / 3);

  // Blur: 0 → 5px → 12px
  const blur =
    absOffset <= 1
      ? lerp(0, 5, absOffset)
      : lerp(5, 12, clamp(absOffset - 1, 0, 2) / 2);

  // Opacity: 1 → 0.6 → 0.15
  const opacity =
    absOffset <= 1
      ? lerp(1, 0.6, absOffset)
      : lerp(0.6, 0.15, clamp(absOffset - 1, 0, 3) / 3);

  // Horizontal compression: cards cluster closer to center
  // Active card spacing is wider, far cards compress together
  const baseSpacing = 320;
  const compression = absOffset <= 1
    ? absOffset * baseSpacing
    : baseSpacing + (absOffset - 1) * baseSpacing * 0.45;
  const translateX = Math.sign(offset) * compression;

  return { scale, blur, opacity, translateX };
}

export default function ImageSlideshow({ images }: Props) {
  const len = images.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Continuous position (fractional index)
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef(0);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);
  const dragVelocity = useRef(0);

  // Auto-advance
  const autoTimerRef = useRef<ReturnType<typeof setInterval>>();

  // Counter element ref
  const counterRef = useRef<HTMLDivElement>(null);
  const mobileCounterRef = useRef<HTMLSpanElement>(null);

  const resetAutoTimer = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      targetRef.current += 1;
    }, AUTO_INTERVAL);
  }, []);

  // ── Reticle corners (camera viewfinder brackets) ──
  const reticleRef = useRef<HTMLDivElement>(null);

  // ── Main animation loop: spring physics ──
  const animate = useCallback(() => {
    const pos = posRef.current;
    const target = targetRef.current;

    if (isDragging.current) {
      // During drag, position follows directly
    } else {
      // Spring toward target
      const delta = target - pos;
      velocityRef.current += delta * SPRING_STIFFNESS;
      velocityRef.current *= SPRING_DAMPING;
      posRef.current += velocityRef.current;

      // Snap when close enough
      if (Math.abs(delta) < SNAP_THRESHOLD && Math.abs(velocityRef.current) < SNAP_THRESHOLD) {
        posRef.current = target;
        velocityRef.current = 0;
      }
    }

    // ── Render cards ──
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

      // Store image index for rendering
      child.dataset.imgIndex = String(imgIndex);

      const fractionalPos = posRef.current;
      const offset = slotOffset - (fractionalPos - Math.floor(fractionalPos));
      const style = computeCardStyle(offset);

      child.style.transform = `translateX(${style.translateX}px) scale(${style.scale})`;
      child.style.filter = style.blur > 0.5 ? `blur(${style.blur}px)` : "none";
      child.style.opacity = String(style.opacity);
      child.style.zIndex = String(VISIBLE_RANGE * 10 - Math.round(Math.abs(offset) * 10));

      // Update image src if needed
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

    // ── Update reticle position (follows active card) ──
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

    // ── Update counter ──
    const rounded = Math.round(posRef.current);
    const displayIndex = ((rounded % len) + len) % len;
    const counterText = `${String(displayIndex + 1).padStart(2, "0")} / ${String(len).padStart(2, "0")}`;
    if (counterRef.current) counterRef.current.textContent = counterText;
    if (mobileCounterRef.current) mobileCounterRef.current.textContent = counterText;

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

  // ── Pointer events (drag) ──
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    lastDragX.current = e.clientX;
    lastDragTime.current = Date.now();
    dragVelocity.current = 0;
    velocityRef.current = 0;
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

    // Map pixel drag to fractional position change
    posRef.current = dragStartPos.current - (dx * DRAG_SENSITIVITY) / 300;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Apply momentum from drag velocity
    const momentum = -dragVelocity.current * 300;
    const projected = posRef.current + momentum * 0.3;

    // Snap to nearest integer
    targetRef.current = Math.round(projected);
    velocityRef.current = momentum * 0.002;

    resetAutoTimer();
  }, [resetAutoTimer]);

  // ── Keyboard ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { targetRef.current += 1; resetAutoTimer(); }
      if (e.key === "ArrowLeft") { targetRef.current -= 1; resetAutoTimer(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resetAutoTimer]);

  if (len === 0) return null;

  // Pre-generate slot elements
  const totalSlots = VISIBLE_RANGE * 2 + 1;

  return (
    <div className="flex flex-col items-center select-none">
      {/* Mobile controls */}
      <div className="flex md:hidden items-center justify-center gap-4 mb-4">
        <button
          onClick={() => { targetRef.current -= 1; resetAutoTimer(); }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E7EB] text-[#1A1A1A] transition-colors"
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span
          ref={mobileCounterRef}
          className="text-[11px] tracking-[1px] text-[#9CA3AF] font-medium tabular-nums"
        >
          01 / {String(len).padStart(2, "0")}
        </span>
        <button
          onClick={() => { targetRef.current += 1; resetAutoTimer(); }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E7EB] text-[#1A1A1A] transition-colors"
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Carousel container */}
      <div
        ref={containerRef}
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
        {/* Card slots */}
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
                style={{
                  width: w,
                  height: CARD_H,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className="w-full h-full rounded-[3px] overflow-hidden"
                  style={{
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)",
                  }}
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

        {/* Reticle (viewfinder brackets) around active card */}
        <div
          ref={reticleRef}
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            marginLeft: 0,
            marginTop: `-${(CARD_H + 32) / 2}px`,
            width: getCardWidth(images[0]?.orientation ?? "landscape") + 32,
            height: CARD_H + 32,
            zIndex: 100,
          }}
        >
          {/* Top-left corner */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-[#1A1A1A]/30" />
          {/* Top-right corner */}
          <div className="absolute top-0 right-0 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-[#1A1A1A]/30" />
          {/* Bottom-left corner */}
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-[#1A1A1A]/30" />
          {/* Bottom-right corner */}
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-[#1A1A1A]/30" />
        </div>
      </div>

      {/* Desktop counter */}
      <div
        ref={counterRef}
        className="hidden md:block mt-4 text-[11px] tracking-[1px] text-[#9CA3AF] font-medium tabular-nums"
      >
        01 / {String(len).padStart(2, "0")}
      </div>
    </div>
  );
}
