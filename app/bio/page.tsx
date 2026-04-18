import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { BioToggle } from "@/components/layout/BioToggle";

export const metadata: Metadata = {
  title: "Bio",
  description:
    "A short self-introduction in English, Korean, Japanese, German, and Chinese.",
  alternates: {
    languages: {
      en: "/bio/",
      ko: "/bio/",
      ja: "/bio/",
      de: "/bio/",
      "zh-Hans": "/bio/",
    },
  },
};

export default function BioPage() {
  return (
    <Container width="prose">
      <PageHeader
        mark="α"
        eyebrow="Bio · 5 languages"
        title="A brief self-introduction."
        lead="The same essay in English, 한국어, 日本語, Deutsch, and 中文. Pick a language; the choice is remembered on this device."
      />
      <BioToggle />
    </Container>
  );
}
