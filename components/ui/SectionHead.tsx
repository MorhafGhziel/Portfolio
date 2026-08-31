"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  /** Section number, e.g. "02". Gives the page an editorial spine. */
  index: string;
  eyebrow: string;
  heading: ReactNode;
  /** One plain sentence telling the reader what to do here. */
  help?: ReactNode;
  /** Right-hand slot: counts, filters, a link. */
  aside?: ReactNode;
  /** Set on the light section so the hairlines and muted text invert. */
  inverted?: boolean;
  className?: string;
};

export default function SectionHead({
  index,
  eyebrow,
  heading,
  help,
  aside,
  inverted = false,
  className = "",
}: Props) {
  const line = inverted ? "bg-ink/12" : "bg-line";
  const muted = inverted ? "text-ink/55" : "text-mute";
  const dot = inverted ? "bg-copper-deep" : "bg-copper";

  return (
    <div className={className}>
      <div className={`h-px w-full ${line}`} />

      <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 pt-5">
        <p className={`eyebrow flex items-center gap-2.5 ${muted}`}>
          <span
            className={`inline-block h-[5px] w-[5px] rounded-full ${dot}`}
            aria-hidden
          />
          <span className={inverted ? "text-copper-deep" : "text-copper"}>
            {index}
          </span>
          <span aria-hidden className={inverted ? "text-ink/25" : "text-dim"}>
            /
          </span>
          {eyebrow}
        </p>
        {aside}
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className={`display d-lg mt-8 max-w-[18ch] text-balance ${
            inverted ? "text-ink" : "text-bone"
          }`}
        >
          {heading}
        </h2>
      </Reveal>

      {help && (
        <Reveal delay={0.12}>
          <p className={`body-base mt-6 max-w-[52ch] ${muted}`}>{help}</p>
        </Reveal>
      )}
    </div>
  );
}
