import type { Settings } from "./types";

/**
 * Everything about me that changes without a redesign.
 * Edit here; no component needs touching.
 */
export const SETTINGS: Settings = {
  name: { en: "Murhaf Ghziel", ar: "مرهف غزيل" },
  email: "ghzielmorhaf@gmail.com",
  // Confirm: this is the SIMA Studio WhatsApp line. See CONTENT-NEEDED.md.
  whatsapp: "966582737120",
  cvUrl: "/Murhaf.pdf",
  availability: {
    open: true,
    label: { en: "Available for new projects", ar: "متاح لمشاريع جديدة" },
  },
  responseTime: { en: "within 24 hours", ar: "خلال ٢٤ ساعة" },
  // Placeholder ranges: confirm or change. See CONTENT-NEEDED.md.
  budgets: [
    { id: "lt10", label: { en: "Under 10k SAR", ar: "أقل من ١٠ آلاف ريال" } },
    { id: "10-25", label: { en: "10–25k SAR", ar: "١٠–٢٥ ألف ريال" } },
    { id: "25-60", label: { en: "25–60k SAR", ar: "٢٥–٦٠ ألف ريال" } },
    { id: "60plus", label: { en: "60k+ SAR", ar: "أكثر من ٦٠ ألف ريال" } },
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
