import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { JournalFilter } from "@/components/layout/JournalFilter";
import { journalEntries } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/journal/" },
  title: "Journal",
  description:
    "Current research notes alongside clearly labeled, dated SCC and ONN historical archives.",
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
        lead="Current work and dated research notes, with SCC and ONN entries retained as explicitly labeled historical archives rather than presented as the active Main programme."
      />

      <JournalFilter entries={entries} />
    </Container>
  );
}
