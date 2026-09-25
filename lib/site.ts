import "server-only";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { PROJECTS, FEATURED } from "@/content/projects";
import type { Locale, Project } from "@/content/types";

export const LOCALES: Locale[] = ["en", "ar"];
export const isLocale = (v: string): v is Locale => v === "en" || v === "ar";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://murhaf.site";

const PUBLIC = path.join(process.cwd(), "public");
const has = (p: string) => existsSync(path.join(PUBLIC, p));

/** What the browser needs to show a project, resolved from what's on disk. */
export type Media = {
  poster: string;
  mp4?: string;
  webm?: string;
  mobile: string[];
};

export function mediaFor(p: Project): Media {
  const dir = `/media/${p.slug}`;
  // WebP first (about half the bytes); the JPEG stays for Open Graph cards.
  const poster = has(`${dir}/poster.webp`) ? `${dir}/poster.webp` : has(`${dir}/poster.jpg`) ? `${dir}/poster.jpg` : p.cover;
  return {
    poster,
    mp4: has(`${dir}/preview.mp4`) ? `${dir}/preview.mp4` : undefined,
    webm: has(`${dir}/preview.webm`) ? `${dir}/preview.webm` : undefined,
    mobile: ["m1", "m2", "m3"].map((m) => `${dir}/${m}.webp`).filter(has),
  };
}

export function reelMedia(): Media | null {
  if (!has("/media/reel/reel.mp4")) return null;
  return {
    poster: has("/media/reel/poster.webp") ? "/media/reel/poster.webp" : has("/media/reel/poster.jpg") ? "/media/reel/poster.jpg" : "",
    mp4: "/media/reel/reel.mp4",
    webm: has("/media/reel/reel.webm") ? "/media/reel/reel.webm" : undefined,
    mobile: [],
  };
}

export const allProjects = () => PROJECTS;
export const featuredProjects = () =>
  FEATURED.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean) as Project[];
export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export function nextProject(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

/** A serialisable card for client components: one language, media resolved. */
export type Card = {
  slug: string;
  name: string;
  summary: string;
  year: string;
  kind: Project["kind"];
  categories: Project["categories"];
  tags: string[];
  media: Media;
};

export function toCard(p: Project, lang: Locale): Card {
  return {
    slug: p.slug,
    name: p.name[lang],
    summary: p.summary[lang],
    year: p.year,
    kind: p.kind,
    categories: p.categories,
    tags: p.services[lang],
    media: mediaFor(p),
  };
}

/** Intrinsic size of a PNG/JPEG in /public, so images reserve their space (no CLS). */
export function imageSize(src: string): { width: number; height: number } {
  try {
    const b = readFileSync(path.join(PUBLIC, src));
    if (b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    // JPEG: walk the markers to the first SOFn frame.
    let i = 2;
    while (i < b.length) {
      const marker = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  } catch {}
  return { width: 1600, height: 1000 };
}
