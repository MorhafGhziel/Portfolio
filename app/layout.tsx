import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Morhaf Ghziel - Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in React, Next.js, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen`}
      >
        <div className="relative">
          {/* Background gradient for header */}
          <div className="fixed inset-0 h-[20vh] bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none" />

          {/* Header with backdrop blur */}
          <div className="fixed inset-x-0 top-0 h-20 bg-black/20 backdrop-blur-sm z-20" />
          <Header />

          {/* Main content */}
          <main className="relative bg-black">{children}</main>
        </div>
      </body>
    </html>
  );
}
