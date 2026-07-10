import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { idsByKind } from "@/lib/content";
import { IdIndexList } from "@/components/layout/IdIndexList";

export const metadata: Metadata = {
  alternates: { canonical: "/refs/open-problems/" },
  title: "Open problems index",
  description:
    "Every OP-XXXX open-problem ID extracted from the SCC and ONN notes — sorted, deduplicated, linked to the first document that registers the problem.",
};

export default function OpenProblemsIndexPage() {
  const items = idsByKind("openProblem");

  return (
    <Container width="prose">
      <div className="pt-10 md:pt-20">
        <Breadcrumb
          items={[
            { href: "/notes/", label: "Notes" },
            { label: "Open problems" },
          ]}
        />
      </div>
      <PageHeader
        mark="OP"
        eyebrow="Index"
        title="Open problems index"
        lead={`${items.length} unique OP-XXXX IDs surfaced across the notes. Each row links to the document that registers or last discusses the problem.`}
        className="pt-0 md:pt-0"
      />

      {items.length === 0 ? (
        <p className="text-[var(--color-muted)]">No open problems registered.</p>
      ) : (
        <IdIndexList items={items} prefix="OP-" />
      )}
    </Container>
  );
}
