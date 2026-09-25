import type { Settings } from "./types";

/**
 * Everything about me that changes without a redesign.
 * Edit here; no component needs touching.
 */
export const SETTINGS: Settings = {
  name: { en: "Murhaf Ghziel", ar: "مرهف غزيل" },
  email: "ghzielmorhaf@gmail.com",
  whatsapp: "966507149775",
  cvUrl: "/Murhaf.pdf",
  availability: {
    open: true,
    label: { en: "Available for new projects", ar: "متاح لمشاريع جديدة" },
  },
  responseTime: { en: "within 24 hours", ar: "خلال ٢٤ ساعة" },
  // Ranges follow SIMA's published packages: Starter from 2,500, Signature
  // 4,500, Immersive from 8,000 SAR; SaaS builds sit above that.
  budgets: [
    { id: "lt5", label: { en: "Under 5k SAR", ar: "أقل من ٥ آلاف ريال" } },
    { id: "5-10", label: { en: "5–10k SAR", ar: "٥–١٠ آلاف ريال" } },
    { id: "10-25", label: { en: "10–25k SAR", ar: "١٠–٢٥ ألف ريال" } },
    { id: "25plus", label: { en: "25k+ SAR", ar: "أكثر من ٢٥ ألف ريال" } },
    { id: "unsure", label: { en: "Not sure yet", ar: "ما حددت بعد" } },
  ],
  timelines: [
    { id: "asap", label: { en: "As soon as possible", ar: "بأسرع وقت" } },
    { id: "1-2m", label: { en: "1–2 months", ar: "خلال شهر أو شهرين" } },
    { id: "3m", label: { en: "3 months or more", ar: "ثلاثة أشهر أو أكثر" } },
    { id: "flex", label: { en: "Flexible", ar: "مرن" } },
  ],
  socials: [
    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/4uee_m/" },
    { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/morhaf-ghziel-a720a72b9/" },
    { key: "github", label: "GitHub", href: "https://github.com/MorhafGhziel" },
    { key: "x", label: "X", href: "https://x.com/MorhafGhz" },
  ],
  testimonials: [],
};
