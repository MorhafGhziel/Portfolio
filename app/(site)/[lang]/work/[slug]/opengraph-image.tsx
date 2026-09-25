import { og } from "../../og";
import { PROJECTS } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study by Murhaf Ghziel";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug)!;
  return og({
    lead: p.name.en,
    accent: "case study",
    kicker: `Murhaf Ghziel — ${p.year}`,
    image: `/media/${p.slug}/poster.jpg`,
  });
}
