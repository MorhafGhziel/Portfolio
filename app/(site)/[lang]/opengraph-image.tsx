import { og } from "./og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Murhaf Ghziel — websites people remember";

export default function Image() {
  return og({ lead: "Websites people", accent: "remember.", kicker: "Murhaf Ghziel — Riyadh" });
}
