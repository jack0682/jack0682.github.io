import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "A dated journal of research in progress — curated excerpts from the daily working notes.",
};

export default function JournalPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Journal"
        title="Research in motion."
        lead="A dated journal of work in progress — curated excerpts from the daily notebook, surfacing the open questions and intermediate results that shape the research."
      />
      <ComingSoon note="Entries are drawn from the ongoing ONN research log, edited for public reading. Expect short notes rather than polished essays: conjectures, negative results, and the things that did not work." />
    </Container>
  );
}
