import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { BIO } from "@/lib/bio";

export const metadata: Metadata = {
  title: "Bio",
  description:
    "A short self-introduction by Jaehong Oh.",
  alternates: {
    canonical: "/bio/",
    languages: {
      en: "/bio/",
    },
  },
};

export default function BioPage() {
  const bio = BIO.en;

  return (
    <Container width="prose" lang="en">
      <PageHeader
        mark="α"
        eyebrow="Biography"
        title="A brief self-introduction."
        lead="Robotics, representation, and the questions that connect theory to embodied systems."
      />
      <section aria-label="Biography" lang={bio.langTag}>
        <h2 className="font-display text-[clamp(1.5rem,5vw,2.25rem)] leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)]">
          {bio.heading}
        </h2>
        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[var(--color-ink)]/90 sm:mt-8 sm:space-y-6 sm:text-base">
          {bio.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-justify hyphens-auto">{paragraph}</p>
          ))}
        </div>
      </section>
    </Container>
  );
}
