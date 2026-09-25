import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { ViewTransitions } from "next-view-transitions";
import "./site.css";
import "./sections.css";
import { sans, mono, serif, arSans, arDisplay } from "@/lib/fonts";
import { BASE_URL, LOCALES, isLocale } from "@/lib/site";
import { COPY } from "@/content/copy";
import { SETTINGS } from "@/content/settings";
import type { Locale } from "@/content/types";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import SmoothScroll from "@/components/site/SmoothScroll";
import Cursor from "@/components/site/Cursor";
import Analytics from "@/components/site/Analytics";
import Reveals from "@/components/site/Reveals";
import { SITE_THEME_SCRIPT } from "@/components/site/ThemeToggle";

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const c = COPY[lang].meta;
  return {
    metadataBase: new URL(BASE_URL),
    title: { default: c.title, template: `%s — ${SETTINGS.name[lang]}` },
    description: c.description,
    authors: [{ name: SETTINGS.name.en, url: BASE_URL }],
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: SETTINGS.name[lang],
      locale: lang === "ar" ? "ar_SA" : "en_US",
      title: c.title,
      description: c.description,
    },
    twitter: { card: "summary_large_image", creator: "@MorhafGhz" },
    icons: { icon: "/favicon.ico" },
  };
}

export const viewport: Viewport = {
  themeColor: "#120E17",
  colorScheme: "dark light",
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const c = COPY[l];

  const org = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SETTINGS.name.en,
    alternateName: SETTINGS.name.ar,
    url: BASE_URL,
    email: `mailto:${SETTINGS.email}`,
    jobTitle: "Full-stack developer",
    address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
    sameAs: SETTINGS.socials.map((s) => s.href),
  };

  return (
    <ViewTransitions>
      <html
        lang={l}
        dir={l === "ar" ? "rtl" : "ltr"}
        suppressHydrationWarning
        className={`${sans.variable} ${mono.variable} ${serif.variable} ${arSans.variable} ${arDisplay.variable}`}
      >
        <head>
          {/* Marks JS-capable browsers before paint, so reveal styles never hide content without JS. */}
          <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
          <script dangerouslySetInnerHTML={{ __html: SITE_THEME_SCRIPT }} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
          />
        </head>
        <body>
          <a className="skip" href="#main">
            {c.skip}
          </a>
          <SmoothScroll />
          <Nav lang={l} copy={c.nav} />
          <main id="main">{children}</main>
          <Footer lang={l} />
          <div className="grain" aria-hidden="true" />
          <Cursor />
          <Analytics lang={l} />
          <Reveals />
        </body>
      </html>
    </ViewTransitions>
  );
}
