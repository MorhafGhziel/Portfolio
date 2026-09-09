import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import { ThemeProvider, NO_FLASH_SCRIPT } from "@/components/ThemeContext";

/* Grotesque for UI, serif for display, mono for micro-labels.
   The serif/grotesque collision is the whole visual signature. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://morhaf.me";

const description =
  "Full-stack developer in Riyadh. I design and build web apps end to end — React, Next.js and TypeScript on the front, APIs and databases behind them.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Morhaf Ghziel — Full-stack developer",
    template: "%s — Morhaf Ghziel",
  },
  description,
  keywords: [
    "full-stack developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Riyadh",
    "Saudi Arabia",
  ],
  authors: [{ name: "Morhaf Ghziel", url: baseUrl }],
  creator: "Morhaf Ghziel",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: "Morhaf Ghziel",
    title: "Morhaf Ghziel — Full-stack developer",
    description,
    // The image comes from app/opengraph-image.tsx via the file convention.
  },
  twitter: {
    card: "summary_large_image",
    title: "Morhaf Ghziel — Full-stack developer",
    description,
    creator: "@MorhafGhz",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables go on <html>: the theme tokens in globals.css live on
    // :root, and a var() there can only see variables declared on :root itself.
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${arabic.variable}`}
    >
      <head>
        {/* Sets data-theme before first paint so the page never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
