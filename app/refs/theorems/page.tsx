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
    "Every theorem, lemma, proposition, and corollary ID extracted across ULR, SCC, ONN, papers, and notes — sorted and linked to its sources.",
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
        lead={`${items.length} unique theorem-class IDs (T-…) extracted across ULR, SCC, ONN, papers, and notes. Each row links to the first document that names the ID.`}
        className="pt-0 md:pt-0"
      />

      <aside className="mb-10 border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] px-5 py-4 text-sm leading-relaxed text-[var(--color-muted)]">
        This is a lexical occurrence index, not a status ledger. Appearance
        here does not imply that a theorem is current, canonical, or in the
        active ULR programme; follow the linked document&apos;s scope and archive label.
      </aside>

      {items.length === 0 ? (
        <p className="text-[var(--color-muted)]">No IDs extracted yet.</p>
      ) : (
        <IdIndexList items={items} prefix="T-" />
      )}
    </Container>
  );
}
