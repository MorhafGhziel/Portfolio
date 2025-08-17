import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/LanguageContext";

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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://morhaf.me"
  ),
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
    images: ["./opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morhaf Ghziel",
    description:
      "Front-End Developer specializing in React, Next.js, and modern web technologies.",
    images: ["./opengraph-image.jpg"],
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
          className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${notoSansArabic.variable} antialiased bg-black min-h-screen font-sans`}
        >
          <Toaster position="top-center" theme="dark" />
          <div className="relative bg-black">
            {/* Background gradient for header */}
            <div className="fixed inset-0 h-[20vh] bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none" />

            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="relative bg-black">{children}</main>

            {/* Footer */}
            <Footer />
          </div>
        </body>
      </LanguageProvider>
    </html>
  );
}
