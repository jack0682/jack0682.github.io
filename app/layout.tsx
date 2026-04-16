import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Masthead } from "@/components/layout/Masthead";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { RouteProgress } from "@/components/motion/RouteProgress";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { FloatingChip } from "@/components/layout/FloatingChip";
import { searchIndex } from "@/lib/content";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://jack0682.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jaehong Oh — Research",
    template: "%s · Jaehong Oh",
  },
  description:
    "Research on Ontology Neural Networks, perception theory, and the mathematical foundations of embodied cognition.",
  authors: [{ name: "Jaehong Oh" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Jaehong Oh — Research",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        <ThemeProvider>
          <RouteProgress />
          <ScrollProgress />
          <Masthead />
          <main className="flex-1">{children}</main>
          <Footer />
          <CommandPalette items={searchIndex} />
          <FloatingChip items={searchIndex} />
        </ThemeProvider>
      </body>
    </html>
  );
}
