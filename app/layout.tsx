import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://morhaf.me";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Morhaf Ghziel",
  description:
    "Front-End Developer specializing in React, Next.js, and modern web technologies.",
  icons: {
    icon: "./favicon.ico",
  },
  openGraph: {
    title: "Morhaf Ghziel",
    description:
      "Front-End Developer specializing in React, Next.js, and modern web technologies.",
    images: [
      {
        url: `${baseUrl}/opengraph-image.png?v=2`,
        width: 1200,
        height: 630,
        alt: "Morhaf Ghziel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morhaf Ghziel",
    description:
      "Front-End Developer specializing in React, Next.js, and modern web technologies.",
    images: [`${baseUrl}/opengraph-image.png?v=2`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <LanguageProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${notoSansArabic.variable} antialiased min-h-screen font-sans`}
          style={{ background: "#0f0f0f" }}
        >
          <SmoothScroll />
          <Toaster
            position="top-center"
            theme="dark"
            richColors={false}
            closeButton
            toastOptions={{
              style: {
                background: "rgba(15, 15, 15, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
              },
            }}
            expand={false}
          />
          <div className="relative" style={{ background: "#0f0f0f" }}>
            {/* Background gradient for header */}
            <div className="fixed inset-0 h-[20vh] bg-gradient-to-b from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent z-10 pointer-events-none" />

            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="relative" style={{ background: "#0f0f0f" }}>
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </body>
      </LanguageProvider>
    </html>
  );
}
