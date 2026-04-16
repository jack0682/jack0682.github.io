import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

// Display serif — Fraunces variable, for hero & headings
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

// Body sans — Inter variable, for UI & body text
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
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        {children}
      </body>
    </html>
  );
}
