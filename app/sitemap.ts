import type { MetadataRoute } from "next";
import { PROJECTS } from "@/content/projects";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://murhaf.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", ...PROJECTS.map((p) => `/work/${p.slug}`)];
  return paths.map((p) => ({
    url: `${BASE}/en${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p === "/work" ? 0.8 : 0.7,
    alternates: { languages: { en: `${BASE}/en${p}`, ar: `${BASE}/ar${p}` } },
  }));
}
