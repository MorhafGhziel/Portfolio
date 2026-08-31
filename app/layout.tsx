import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  themeColor: "#0a0a0b",
  colorScheme: "dark",
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
      <body className="font-sans antialiased">
        <LanguageProvider>
          <SmoothScroll />

          {/* Keyboard users land here first. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-bone focus:text-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>

          <Header />
          <main id="main">{children}</main>
          <Footer />

          <Toaster
            position="bottom-right"
            theme="dark"
            richColors={false}
            offset={24}
            duration={3200}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
