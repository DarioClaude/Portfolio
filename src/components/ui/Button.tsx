"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "dark";
type Size = "sm" | "md";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

/**
 * Reusable CTA button — Awwwards-style:
 *
 *  ▸ Label is PERFECTLY CENTERED in its idle state.
 *  ▸ Width stays constant — the arrow lives outside the button (right-side)
 *    initially, hidden via `overflow-hidden`, and slides in on hover.
 *  ▸ On hover the label shifts slightly left while the arrow fades/slides in
 *    from the right, all within the original padding.
 *  ▸ On click a 3D neumorphic press (inner shadow + scale + nudge down).
 *  ▸ Background transitions smoothly to Electric Blue (#0000ff).
 *  ▸ Font is locked to Montserrat via `font-sans` (mapped in tailwind.config).
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  const isExternal =
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http");

  const sizes: Record<Size, string> = {
    sm: "text-[11px] md:text-[13px] px-4 py-2 md:px-6 md:py-2.5",
    md: "text-sm md:text-base px-6 py-3 md:px-8 md:py-3.5",
  };

  // Arrow sits closer to the button edge than the padding so there is
  // visible space between the shifted label and the arrow on hover.
  const arrowRight: Record<Size, string> = {
    sm: "right-2 md:right-3",
    md: "right-3 md:right-4",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-[#0000ff] text-white shadow-sm hover:shadow-lg",
    outline:
      "border-2 border-[#0000ff] text-[#0000ff] bg-transparent hover:bg-[#0000ff] hover:text-white",
    dark:
      "bg-[#1A1A1A] text-white shadow-sm hover:shadow-lg hover:bg-[#0000ff]",
  };

  const base =
    "group font-sans relative inline-flex items-center justify-center " +
    "font-normal tracking-normal rounded-lg overflow-hidden " +
    "transition-all duration-500 ease-out " +
    "active:shadow-inner active:scale-[0.97] active:translate-y-[1px]";

  const classes =
    `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();

  const content = (
    <>
      {/* Label — perfectly centered by default; slides left on hover to open
          a gap for the arrow. */}
      <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-x-3">
        {children}
      </span>

      {/* Arrow — absolutely positioned flush with right padding, clipped by
          overflow-hidden when translated off-stage. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute ${arrowRight[size]} opacity-0 translate-x-6 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0`}
      >
        →
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} data-cursor-hover className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} data-cursor-hover className={classes}>
      {content}
    </Link>
  );
}
