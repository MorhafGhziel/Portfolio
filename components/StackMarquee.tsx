"use client";

const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma",
  "Supabase",
  "MongoDB",
  "Framer Motion",
  "Three.js",
  "Figma",
];

/**
 * Full-bleed hairline band. Pure texture — it pauses on hover and stops
 * entirely under prefers-reduced-motion, so it never becomes a distraction.
 */
export default function StackMarquee() {
  const run = [...STACK, ...STACK];

  return (
    <div
      className="marquee edge-fade relative select-none overflow-hidden border-y border-line py-4"
      aria-hidden
    >
      <div className="marquee-track" style={{ ["--marquee-duration" as string]: "48s" }}>
        {run.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="eyebrow flex shrink-0 items-center whitespace-nowrap text-ink-dim"
          >
            <span className="px-6">{item}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
