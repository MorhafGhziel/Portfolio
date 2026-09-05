"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Project, ProjectKind } from "@/constants";
import { useLanguage } from "./LanguageContext";
import SectionHead from "./ui/SectionHead";
import ProjectSheet, { splitTitle } from "./ui/ProjectSheet";
import Reveal from "./ui/Reveal";

type Filter = "all" | ProjectKind;
const FILTERS: Filter[] = ["all", "client", "job", "practice"];
const INITIAL_ROWS = 8;

export default function Work({ projects }: { projects: Project[] }) {
  const { t, language, isRTL } = useLanguage();
  const reduce = useReducedMotion();
  const ar = language === "ar";

  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<Project | null>(null);
  const [open, setOpen] = useState<Project | null>(null);

  /* Cursor-following preview. Spring-damped so it trails the pointer
     instead of snapping to it — that lag is what makes it feel physical. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 220, damping: 28, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 220, damping: 28, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    px.set(e.clientX);
    py.set(e.clientY);
  };

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: projects.length,
      client: 0,
      job: 0,
      practice: 0,
    };
    projects.forEach((p) => (base[p.kind] += 1));
    return base;
  }, [projects]);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.kind === filter)),
    [projects, filter]
  );

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_ROWS);
  const remaining = filtered.length - visible.length;

  return (
    <section id="work" className="grain relative py-28 md:py-40">
      <div className="shell">
        <SectionHead
          index={t("work.index")}
          eyebrow={t("work.eyebrow")}
          heading={t("work.heading")}
          help={
            <>
              <span className="on-fine">{t("work.help")}</span>
              <span className="on-coarse">{t("work.helpTouch")}</span>
            </>
          }
          aside={
            <div className="flex flex-wrap gap-2" role="group" aria-label={t("work.eyebrow")}>
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setExpanded(false);
                    }}
                    aria-pressed={active}
                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors duration-300 ${
                      active
                        ? "border-accent/50 bg-accent/10 text-accent"
                        : "border-line text-ink-muted hover:border-line-2 hover:text-ink"
                    }`}
                  >
                    {t(`work.filters.${f}`)}{" "}
                    <span className="tabular-nums opacity-60">{counts[f]}</span>
                  </button>
                );
              })}
            </div>
          }
        />

        {/* The index */}
        <ul
          className="mt-16 border-t border-line"
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((project, i) => {
              const { name } = splitTitle(ar ? project.titleAr : project.title);
              return (
                <motion.li
                  key={project.slug}
                  layout={!reduce}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i, 6) * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-line"
                >
                  <button
                    onClick={() => setOpen(project)}
                    onMouseEnter={() => setHovered(project)}
                    onFocus={() => setHovered(project)}
                    className="group relative block w-full cursor-pointer py-7 text-start transition-colors duration-500 md:py-9"
                  >
                    {/* Wash that bleeds past the shell so the row reads as
                        full-bleed without breaking the text alignment. */}
                    <span
                      className="pointer-events-none absolute inset-y-0 -inset-x-[max(1.25rem,5vw)] -z-10 bg-[var(--wash)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden
                    />

                    <div className="flex items-baseline justify-between gap-5">
                      <div className="flex min-w-0 items-baseline gap-4 md:gap-7">
                        <span className="eyebrow w-6 shrink-0 tabular-nums text-ink-dim transition-colors duration-500 group-hover:text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="display d-sm truncate text-ink transition-colors duration-500 group-hover:text-accent">
                          {name}
                        </h3>
                      </div>

                      <div className="flex shrink-0 items-center gap-4 md:gap-6">
                        <span className="eyebrow hidden text-ink-dim sm:inline">
                          {t(`work.kind.${project.kind}`)}
                        </span>
                        <span className="eyebrow tabular-nums text-ink-dim">
                          {project.year}
                        </span>
                        <ArrowUpRight
                          className={`h-4 w-4 text-ink-dim transition-all duration-500 group-hover:text-accent ${
                            isRTL
                              ? "group-hover:-translate-x-0.5"
                              : "group-hover:translate-x-0.5"
                          } group-hover:-translate-y-0.5`}
                          aria-hidden
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between gap-6 ps-10 md:ps-13">
                      <p className="body-base max-w-[62ch] text-ink-muted">
                        {ar ? project.summaryAr : project.summary}
                      </p>
                      <span className="eyebrow hidden shrink-0 text-ink-dim lg:inline">
                        {ar ? project.roleAr : project.role}
                      </span>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {filtered.length === 0 && (
          <p className="body-base mt-10 text-ink-muted">{t("work.empty")}</p>
        )}

        {remaining > 0 && (
          <Reveal className="mt-10">
            <button
              onClick={() => setExpanded(true)}
              className="group inline-flex cursor-pointer items-center gap-3 text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                <Plus className="h-3.5 w-3.5" aria-hidden />
              </span>
              {t("work.showAll")} <span className="tabular-nums">({remaining})</span>
            </button>
          </Reveal>
        )}
      </div>

      {/* Hover preview, desktop pointers only */}
      <AnimatePresence>
        {hovered && !open && (
          <motion.div
            key="preview"
            className="pointer-events-none fixed left-0 top-0 z-30 hidden [@media(pointer:fine)]:block"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className="w-[300px] -translate-x-1/2 -translate-y-[115%] overflow-hidden rounded-[10px] border border-line bg-surface"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={hovered.image}
                alt=""
                width={600}
                height={375}
                sizes="300px"
                className="h-full w-full object-cover"
                style={{ aspectRatio: "16 / 10" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectSheet project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
