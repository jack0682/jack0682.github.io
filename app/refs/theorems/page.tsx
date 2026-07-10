import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { idsByKind } from "@/lib/content";
import { IdIndexList } from "@/components/layout/IdIndexList";

export const metadata: Metadata = {
  alternates: { canonical: "/refs/theorems/" },
  title: "Theorem index",
  description:
    "Every theorem, lemma, proposition, and corollary ID extracted from the SCC and ONN notes — sorted alphabetically with the document each ID first appears in.",
};

export default function TheoremIndexPage() {
  const items = idsByKind("theorem");

  return (
    <Container width="prose">
      <div className="pt-10 md:pt-20">
        <Breadcrumb
          items={[
            { href: "/notes/", label: "Notes" },
            { label: "Theorem index" },
          ]}
        />
      </div>
      <PageHeader
        mark="T"
        eyebrow="Index"
        title="Theorem index"
        lead={`${items.length} unique theorem-class IDs (T-…) extracted from the SCC and ONN notes. Each row links to the first document that names the ID.`}
        className="pt-0 md:pt-0"
      />

      {items.length === 0 ? (
        <p className="text-[var(--color-muted)]">No IDs extracted yet.</p>
      ) : (
        <IdIndexList items={items} prefix="T-" />
      )}
    </Container>
  );
}
