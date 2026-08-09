import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { IdIndexList } from "@/components/layout/IdIndexList";
import { idsByKind } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/refs/claims/" },
  title: "Claim ID index",
  description:
    "Every C-… and ULR-… formal claim ID extracted across the public ULR, SCC, ONN, paper, and journal records, linked to its source.",
};

export default function ClaimIndexPage() {
  const items = idsByKind("claim");
  const ulrCount = items.filter((item) => item.id.startsWith("ULR-")).length;

  return (
    <Container width="prose">
      <div className="pt-10 md:pt-20">
        <Breadcrumb
          items={[
            { href: "/refs/", label: "Reference" },
            { label: "Claim ID index" },
          ]}
        />
      </div>
      <PageHeader
        mark="C"
        eyebrow="Index"
        title="Claim ID index"
        lead={`${items.length} unique claim IDs, including ${ulrCount} ULR-* IDs, extracted from the public corpus. This is a lexical navigation index: canonical, active, historical, and retracted status remains owned by each linked ledger.`}
        className="pt-0 md:pt-0"
      />

      <aside className="mb-10 border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] px-5 py-4 text-sm leading-relaxed text-[var(--color-muted)]">
        ULR currently has 54 active rows, while this index also retains the
        retracted <code>ULR-ASSEMBLY-UAR-MONO</code> identifier for auditability.
        An ID appearing here is not by itself evidence that the claim is active.
      </aside>

      {items.length === 0 ? (
        <p className="text-[var(--color-muted)]">No claim IDs extracted yet.</p>
      ) : (
        <IdIndexList items={items} prefix="" />
      )}
    </Container>
  );
}
