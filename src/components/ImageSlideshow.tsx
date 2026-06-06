"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

interface Props {
  images: GalleryImage[];
}

const AUTO_INTERVAL = 5000;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// ══════════════════════════════════════════════════
//  DESKTOP: 3D depth carousel — no slot recycling
// ══════════════════════════════════════════════════

const CARD_H = 420;
const LANDSCAPE_RATIO = 3 / 2;
const PORTRAIT_RATIO = 2 / 3;
const VIS_RANGE = 3;
const LAYOUT_RANGE = VIS_RANGE + 2;
const EASE_FACTOR = 0.15;
const SNAP_THRESHOLD = 0.001;
const CARD_GAP = 22;

function getCardWidth(orientation: "landscape" | "portrait") {
  return orientation === "landscape"
    ? Math.round(CARD_H * LANDSCAPE_RATIO)
    : Math.round(CARD_H * PORTRAIT_RATIO);
}

function computeVisuals(offset: number) {
  const abs = Math.abs(offset);
  const scale = abs <= 1
    ? lerp(1, 0.3, abs)
    : lerp(0.3, 0.18, clamp(abs - 1, 0, 3) / 3);
  const blur = abs <= 1
    ? lerp(0, 7, abs)
    : lerp(7, 16, clamp(abs - 1, 0, 2) / 2);
  const opacity = abs <= 1
    ? lerp(1, 0.45, abs)
    : lerp(0.45, 0.05, clamp(abs - 1, 0, 3) / 3);
  return { scale, blur, opacity };
}

type LayoutEntry = { x: number; scale: number; blur: number; opacity: number; offset: number };

function DesktopCarousel({ images }: Props) {
  const len = images.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const hasDragged = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval>>();
  const counterRef = useRef<HTMLDivElement>(null);

  const computeLayout = useCallback((centerPos: number): Map<number, LayoutEntry> => {
    const result = new Map<number, LayoutEntry>();
    const count = LAYOUT_RANGE * 2 + 1;

    const vStart = centerPos - LAYOUT_RANGE;
    const offsets: number[] = [];
    const imgIndices: number[] = [];
    for (let k = 0; k < count; k++) {
      const v = vStart + k;
      offsets.push(v - centerPos);
      imgIndices.push(((v % len) + len) % len);
    }

    const vis = offsets.map(o => computeVisuals(o));
    const scaledHalves = imgIndices.map((idx, k) =>
      (getCardWidth(images[idx].orientation) * vis[k].scale) / 2
    );

    const centerK = LAYOUT_RANGE;
    const positions: number[] = new Array(count).fill(0);

    let rightEdge = scaledHalves[centerK];
    for (let k = centerK + 1; k < count; k++) {
      positions[k] = rightEdge + CARD_GAP + scaledHalves[k];
      rightEdge = positions[k] + scaledHalves[k];
    }
    let leftEdge = -scaledHalves[centerK];
    for (let k = centerK - 1; k >= 0; k--) {
      positions[k] = leftEdge - CARD_GAP - scaledHalves[k];
      leftEdge = positions[k] - scaledHalves[k];
    }

    for (let k = 0; k < count; k++) {
      result.set(vStart + k, {
        x: positions[k],
        scale: vis[k].scale,
        blur: vis[k].blur,
        opacity: vis[k].opacity,
        offset: offsets[k],
      });
    }
    return result;
  }, [len, images]);

  const resetAutoTimer = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      if (Math.abs(posRef.current - targetRef.current) < 0.05) {
        targetRef.current += 1;
      }
    }, AUTO_INTERVAL);
  }, []);

  const animate = useCallback(() => {
    // Normalize when at rest to prevent unbounded growth
    if (!isDragging.current) {
      const delta = targetRef.current - posRef.current;
      if (Math.abs(delta) < SNAP_THRESHOLD) {
        posRef.current = targetRef.current;
        if (posRef.current >= len || posRef.current < 0) {
          const norm = ((posRef.current % len) + len) % len;
          posRef.current = norm;
          targetRef.current = norm;
        }
      } else {
        posRef.current += delta * EASE_FACTOR;
      }
    }

    const container = containerRef.current;
    if (!container) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const children = container.children as HTMLCollectionOf<HTMLElement>;
    const floorPos = Math.floor(posRef.current);
    const frac = posRef.current - floorPos;

    const layoutA = computeLayout(floorPos);
    const layoutB = computeLayout(floorPos + 1);

    let elemIdx = 0;
    for (let copy = -1; copy <= 1; copy++) {
      for (let i = 0; i < len; i++) {
        const child = children[elemIdx++];
        if (!child) continue;

        const vIdx = i + copy * len;
        const a = layoutA.get(vIdx);
        const b = layoutB.get(vIdx);

        if (!a && !b) {
          child.style.opacity = "0";
          continue;
        }

        let x: number, scale: number, blur: number, opacity: number, absOffset: number;

        if (a && b) {
          x = lerp(a.x, b.x, frac);
          scale = lerp(a.scale, b.scale, frac);
          blur = lerp(a.blur, b.blur, frac);
          opacity = lerp(a.opacity, b.opacity, frac);
          absOffset = Math.abs(lerp(a.offset, b.offset, frac));
        } else if (a) {
          x = a.x;
          scale = a.scale;
          blur = a.blur;
          opacity = a.opacity * (1 - frac);
          absOffset = Math.abs(a.offset);
        } else {
          x = b!.x;
          scale = b!.scale;
          blur = b!.blur;
          opacity = b!.opacity * frac;
          absOffset = Math.abs(b!.offset);
        }

        if (absOffset > VIS_RANGE + 1.5) {
          child.style.opacity = "0";
          continue;
        }

        child.style.transform = `translateX(${x}px) scale(${scale})`;
        child.style.filter = blur > 0.5 ? `blur(${blur}px)` : "none";
        child.style.opacity = String(opacity);
        child.style.zIndex = String(100 - Math.round(absOffset * 10));

        const bracket = child.querySelector(".bracket-overlay") as HTMLElement;
        if (bracket) {
          const bracketOpacity = absOffset < 0.5 ? lerp(1, 0, absOffset * 2) : 0;
          bracket.style.opacity = String(bracketOpacity);
        }
      }
    }

    const rounded = Math.round(posRef.current);
    const displayIndex = ((rounded % len) + len) % len;
    if (counterRef.current) {
      counterRef.current.textContent = `${String(displayIndex + 1).padStart(2, "0")} / ${String(len).padStart(2, "0")}`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [len, computeLayout]);

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
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    clearInterval(autoTimerRef.current);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    if (!hasDragged.current) return;
    posRef.current = dragStartPos.current - dx / 300;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (!hasDragged.current) {
      targetRef.current = Math.round(dragStartPos.current);
    } else {
      targetRef.current = Math.round(posRef.current);
    }
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

  return (
    <div className="flex flex-col items-center select-none">
      <div
        className="relative w-full overflow-x-hidden overflow-y-visible"
        style={{
          height: `${CARD_H + 80}px`,
          cursor: "grab",
          touchAction: "pan-y",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          {[-1, 0, 1].flatMap(copy =>
            images.map((img, i) => {
              const w = getCardWidth(img.orientation);
              const bracketSize = 18;
              const bracketGap = 10;
              return (
                <div
                  key={`${copy}_${i}`}
                  className="absolute will-change-transform"
                  style={{ width: w, height: CARD_H, transformOrigin: "center center", opacity: 0 }}
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
                    ) : (
                      <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                        <span className="text-sm text-neutral-400 font-medium select-none">
                          {img.orientation === "landscape" ? "3:2" : "2:3"}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Corner brackets */}
                  <div className="bracket-overlay absolute pointer-events-none" style={{ inset: -bracketGap, opacity: 0, transition: "opacity 0.3s ease" }}>
                    <span style={{ position: "absolute", top: 0, left: 0, width: bracketSize, height: bracketSize, borderTop: "1.5px solid #1A1A1A", borderLeft: "1.5px solid #1A1A1A" }} />
                    <span style={{ position: "absolute", top: 0, right: 0, width: bracketSize, height: bracketSize, borderTop: "1.5px solid #1A1A1A", borderRight: "1.5px solid #1A1A1A" }} />
                    <span style={{ position: "absolute", bottom: 0, left: 0, width: bracketSize, height: bracketSize, borderBottom: "1.5px solid #1A1A1A", borderLeft: "1.5px solid #1A1A1A" }} />
                    <span style={{ position: "absolute", bottom: 0, right: 0, width: bracketSize, height: bracketSize, borderBottom: "1.5px solid #1A1A1A", borderRight: "1.5px solid #1A1A1A" }} />
                  </div>
                </div>
              );
            })
          )}
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
const M_EASE = 0.12;

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
  const hasTouchMoved = useRef(false);

  const resetAutoTimer = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      if (Math.abs(angleRef.current - targetAngleRef.current) < 0.5) {
        targetAngleRef.current -= ANGLE_STEP;
      }
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
    hasTouchMoved.current = false;
    touchStartX.current = e.touches[0].clientX;
    touchStartAngle.current = angleRef.current;
    clearInterval(autoTimerRef.current);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 8) hasTouchMoved.current = true;
    if (!hasTouchMoved.current) return;
    angleRef.current = touchStartAngle.current + dx * 0.4;
    targetAngleRef.current = angleRef.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (!hasTouchMoved.current) {
      targetAngleRef.current = Math.round(touchStartAngle.current / ANGLE_STEP) * ANGLE_STEP;
    } else {
      targetAngleRef.current = Math.round(angleRef.current / ANGLE_STEP) * ANGLE_STEP;
    }
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
          style={{ left: "50%", top: "50%", width: 0, height: 0 }}
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
//  MAIN EXPORT
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
