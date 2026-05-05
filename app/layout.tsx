import type { Metadata } from "next";
import Script from "next/script";
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
import {
  SITE_URL,
  GOOGLE_SITE_VERIFICATION,
  BING_SITE_VERIFICATION,
  GTM_ID,
} from "@/lib/site";
import { rootSchema, jsonLdScript } from "@/lib/seo";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jaehong Oh — Research",
    template: "%s · Jaehong Oh",
  },
  description:
    "Research on Ontology Neural Networks, perception theory, and the mathematical foundations of embodied cognition.",
  authors: [{ name: "Jaehong Oh" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Jaehong Oh — Research",
    locale: "en_US",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Jaehong Oh — Research" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
  robots: { index: true, follow: true },
  alternates: {
    types: {
      "application/atom+xml": "/feed.xml",
    },
  },
  // Search-engine verification tokens — opt-in via build-time env vars.
  // Both `verification.google` and `verification.other` emit the
  // appropriate `<meta name="...">` tag in the document head.
  ...(GOOGLE_SITE_VERIFICATION || BING_SITE_VERIFICATION
    ? {
        verification: {
          ...(GOOGLE_SITE_VERIFICATION && { google: GOOGLE_SITE_VERIFICATION }),
          ...(BING_SITE_VERIFICATION && {
            other: { "msvalidate.01": BING_SITE_VERIFICATION },
          }),
        },
      }
    : {}),
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
      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      <body className="flex min-h-full flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(rootSchema()) }}
        />
        <ThemeProvider>
          <RouteProgress />
          <ScrollProgress />
          <Masthead />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CommandPalette items={searchIndex} />
          <FloatingChip items={searchIndex} />
        </ThemeProvider>
      </body>
    </html>
  );
}
