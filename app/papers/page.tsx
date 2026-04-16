import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Papers",
  description:
    "Published and in-progress papers, with abstracts, citations, and links to the preprint PDFs.",
};

export default function PapersPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Papers"
        title="Manuscripts."
        lead="Published, submitted, and in-progress manuscripts. Each entry links to the preprint PDF and supporting artefacts where available."
      />
      <ComingSoon note="Papers will be indexed here with abstracts, BibTeX, and per-paper pages linking supplementary material, figures, and code." />
    </Container>
  );
}
