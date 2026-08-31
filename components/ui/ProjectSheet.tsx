"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Github, X } from "lucide-react";
import type { Project } from "@/constants";
import { useLanguage } from "../LanguageContext";
import { getLenis } from "../SmoothScroll";
import { ActionLink, Chip } from "./Action";

/** Titles are stored as "Name - What it is". Split them for display. */
export function splitTitle(title: string) {
  const [name, ...rest] = title.split(" - ");
  return { name, kicker: rest.join(" - ") };
}

export default function ProjectSheet({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { t, language, isRTL } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shot, setShot] = useState(0);
  // Hold the last project so the closing animation still has content to draw.
  const [cached, setCached] = useState<Project | null>(null);

  const open = Boolean(project);

  useEffect(() => {
    if (project) setCached(project);
  }, [project]);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    setShot(0);
    // Move focus into the sheet so Escape and Tab behave as expected.
    const id = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const data = project ?? cached;
  if (!data) return null;

  const ar = language === "ar";
  const { name, kicker } = splitTitle(ar ? data.titleAr : data.title);
  const images = data.images?.length ? data.images : [data.image];

  const step = (dir: 1 | -1) => {
    const next = Math.min(Math.max(shot + dir, 0), images.length - 1);
    setShot(next);
    const track = trackRef.current;
    if (track) {
      const child = track.children[next] as HTMLElement | undefined;
      child?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const meta = [
    { label: t("work.role"), value: ar ? data.roleAr : data.role },
    { label: t("work.year"), value: data.year },
    { label: t("work.kindLabel"), value: t(`work.kind.${data.kind}`) },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={name}
          className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-canvas"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Sticky bar so the way out is always in the same place */}
          <div className="sticky top-0 z-10 border-b border-line bg-canvas/90 backdrop-blur-md">
            <div className="shell flex h-16 items-center justify-between gap-4">
              <p className="eyebrow flex items-center gap-2.5 text-ink-dim">
                <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                {t(`work.kind.${data.kind}`)}
                <span aria-hidden className="text-line-2">
                  /
                </span>
                {data.year}
              </p>

              <div className="flex items-center gap-4">
                <span className="eyebrow hidden text-ink-dim sm:inline">
                  {t("work.closeHint")}
                </span>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-300 hover:border-line-2 hover:text-ink"
                  aria-label={t("nav.close")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="shell pt-14 pb-28"
          >
            <h2 className="display d-lg max-w-[16ch] text-ink">{name}</h2>
            {kicker && (
              <p className="body-lg mt-5 max-w-[46ch] text-ink-muted">{kicker}</p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {data.liveUrl && (
                <ActionLink
                  href={data.liveUrl}
                  external
                  variant="primary"
                  arrow
                >
                  {t("work.visitLive")}
                </ActionLink>
              )}
              {data.githubUrl && (
                <ActionLink href={data.githubUrl} external variant="secondary">
                  <Github className="h-4 w-4" aria-hidden />
                  {t("work.readCode")}
                </ActionLink>
              )}
            </div>

            {/* Gallery */}
            <div className="mt-16">
              <div className="flex items-end justify-between gap-6 border-b border-line pb-4">
                <p className="eyebrow text-ink-dim">{t("work.gallery")}</p>
                {images.length > 1 && (
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.6875rem] tabular-nums text-ink-dim">
                      {String(shot + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => step(isRTL ? 1 : -1)}
                      disabled={isRTL ? shot === images.length - 1 : shot === 0}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-line-2 hover:text-ink disabled:opacity-30"
                      aria-label="Previous screen"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => step(isRTL ? -1 : 1)}
                      disabled={isRTL ? shot === 0 : shot === images.length - 1}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-line-2 hover:text-ink disabled:opacity-30"
                      aria-label="Next screen"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div
                ref={trackRef}
                className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((src, i) => (
                  <div
                    key={src}
                    className="w-[88%] shrink-0 snap-center overflow-hidden rounded-[10px] border border-line bg-surface md:w-[70%]"
                  >
                    <Image
                      src={src}
                      alt={`${name} — screen ${i + 1}`}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 768px) 88vw, 70vw"
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Overview + meta */}
            <div className="mt-20 grid gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="eyebrow text-ink-dim">{t("work.overview")}</p>
                <p className="body-lg mt-6 whitespace-pre-line text-ink/85">
                  {ar ? data.descriptionAr : data.description}
                </p>
              </div>

              <div className="lg:col-span-5">
                <dl className="space-y-0">
                  {meta.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                    >
                      <dt className="eyebrow text-ink-dim">{m.label}</dt>
                      <dd className="text-sm text-ink">{m.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {data.techStack.map((tech) => (
                    <li key={tech}>
                      <Chip>{tech}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
