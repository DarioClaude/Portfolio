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
 * Reusable CTA button with Awwwards-style hover + neumorphic active press.
 *
 * Hover: background smoothly transitions to Electric Blue, the label slides
 * slightly left, and an arrow (→) fades/slides in from the right.
 *
 * Active: 3D pressed depth (inner shadow + scale + nudge down).
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
    sm: "text-[11px] md:text-[13px] px-4 py-2 md:px-5 md:py-2.5",
    md: "text-sm md:text-base px-6 py-3 md:px-7 md:py-3.5",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-[#0000ff] text-white hover:bg-[#0000ff] shadow-sm hover:shadow-lg",
    outline:
      "border-2 border-[#0000ff] text-[#0000ff] bg-transparent hover:bg-[#0000ff] hover:text-white",
    dark:
      "bg-[#1A1A1A] text-white hover:bg-[#0000ff] shadow-sm hover:shadow-lg",
  };

  const base =
    "group relative inline-flex items-center justify-center font-semibold tracking-wide rounded-lg " +
    "transition-all duration-300 ease-out " +
    "active:shadow-inner active:scale-95 active:translate-y-[1px]";

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();

  const content = (
    <span className="relative inline-flex items-center">
      <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-1.5">
        {children}
      </span>
      <span
        aria-hidden
        className="ml-2 inline-block opacity-0 translate-x-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
      >
        →
      </span>
    </span>
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
