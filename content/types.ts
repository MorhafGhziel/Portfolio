export type Locale = "en" | "ar";

/** A string in both languages. Arabic is written, not translated. */
export type T = { en: string; ar: string };
export type TList = { en: string[]; ar: string[] };

/** Drives the filter chips. A project can sit in more than one. */
export type Category = "websites" | "ecommerce" | "webapps";

/**
 * client   = paid freelance build for a named company
 * job      = shipped in a full-time role
 * personal = my own product, live and public
 * studio   = SIMA, my own studio
 */
export type ProjectKind = "client" | "job" | "personal" | "studio";

export type Project = {
  slug: string;
  name: T;
  /** The longer title, used on the case study hero. */
  headline: T;
  /** One scannable line for work previews. */
  summary: T;
  kind: ProjectKind;
  /** The company, or null for a personal product. */
  client: T | null;
  categories: Category[];
  year: string;
  role: T;
  services: TList;
  stack: string[];
  liveUrl?: string;
  codeUrl?: string;
  /** Screenshot used when there is no preview video. */
  cover: string;
  gallery: string[];
  /** 2–4 lines. Left out when the source material doesn't say. */
  challenge?: T;
  idea?: T;
  /** The full original write-up, shown behind "Read the build notes". */
  notes: T;
  /** Real, checkable outcomes only. The block is skipped when empty. */
  results?: TList;
};

export type Settings = {
  name: T;
  email: string;
  /** Digits only, with country code. */
  whatsapp: string;
  cvUrl: string;
  availability: { open: boolean; label: T };
  responseTime: T;
  budgets: { id: string; label: T }[];
  timelines: { id: string; label: T }[];
  socials: { key: string; label: string; href: string }[];
  /** Real testimonials with permission only. Hidden while empty. */
  testimonials: { quote: T; name: string; company: T }[];
};
