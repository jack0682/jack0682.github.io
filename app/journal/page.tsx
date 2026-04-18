import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { JournalFilter } from "@/components/layout/JournalFilter";
import { journalEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "A dated journal of research in progress — conjectures, intermediate results, and the things that did not work.",
};

export default function JournalPage() {
  const entries = journalEntries.map((e) => ({
    slug: e.slug,
    title: e.title,
    date: e.date,
    permalink: e.permalink,
    summary: e.summary,
    track: e.track,
  }));

  return (
    <Container>
      <PageHeader
        mark="∂"
        eyebrow="Journal"
        title="Research in motion."
        lead="A dated journal of work in progress — curated excerpts from the daily notebook, surfacing the open questions and intermediate results that shape the research."
      />

      <JournalFilter entries={entries} />
    </Container>
  );
}
