"use client";

import { useRef, useState } from "react";
import type { Copy } from "@/content/copy";

type Props = {
  copy: Copy["services"];
  /** slug -> { name, poster } for the related-project previews. */
  projects: Record<string, { name: string; poster: string }>;
};

/**
 * An editorial list. Hover (or tap) a row: it opens to show what's included,
 * and on desktop a small preview of related work follows the pointer.
 */
export default function Services({ copy, projects }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const float = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const f = float.current;
    if (f) f.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 80}px, 0)`;
  };

  const preview = hover !== null ? projects[copy.items[hover].projects[0]] : null;

  return (
    <div className="services" onPointerMove={move} onPointerLeave={() => setHover(null)}>
      <ol>
        {copy.items.map((s, i) => {
          const isOpen = open === i;
          return (
            <li
              key={s.name}
              className="svc"
              data-open={isOpen ? "1" : ""}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                setHover(i);
                setOpen(i);
              }}
            >
              <button
                className="svc__head"
                aria-expanded={isOpen}
                aria-controls={`svc-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="mono svc__i">0{i + 1}</span>
                <span className="svc__name">{s.name}</span>
                <span className="svc__line">{s.line}</span>
                <span className="svc__plus" aria-hidden="true" />
              </button>
              <div id={`svc-${i}`} className="svc__body" role="region" aria-label={s.name}>
                <div>
                  <ul className="svc__list">
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <ul className="svc__tags mono">
                    {s.projects.map((p) => (
                      <li key={p}>{projects[p]?.name ?? p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div ref={float} className="float" data-on={preview ? "1" : ""} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {preview && <img src={preview.poster} alt="" />}
      </div>
    </div>
  );
}
