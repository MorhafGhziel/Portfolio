"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "group/act relative inline-flex items-center justify-center gap-2.5 rounded-[4px] px-6 py-3.5 " +
  "text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50";

/* One copper button per screen. Everything else is a hairline. */
const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-canvas hover:bg-accent-hover shadow-[0_6px_24px_-8px_var(--accent-glow)]",
  secondary:
    "border border-line-2 text-ink hover:border-ink/60 hover:bg-[var(--wash)]",
};

type ActionProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Renders the diagonal arrow that nudges on hover. */
  arrow?: boolean;
};

/* Children stay as separate flex items so a caller can pass an icon
   alongside the label and get the gap, not an overlap. */
function inner(children: ReactNode, arrow?: boolean) {
  return (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/act:translate-x-0.5 group-hover/act:-translate-y-0.5"
          aria-hidden
        />
      )}
    </>
  );
}

export function ActionButton({
  variant = "primary",
  children,
  className = "",
  arrow,
  ...props
}: ActionProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className} cursor-pointer`}
      {...props}
    >
      {inner(children, arrow)}
    </button>
  );
}

export function ActionLink({
  variant = "secondary",
  children,
  className = "",
  arrow,
  href,
  external,
  ...props
}: ActionProps & { href: string; external?: boolean } & Omit<
    ComponentProps<"a">,
    "href"
  >) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...props}
      >
        {inner(children, arrow)}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...props}>
      {inner(children, arrow)}
    </Link>
  );
}

/** Small hairline chip. Used for tech-stack tags. */
export function Chip({
  children,
  className = "",
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
