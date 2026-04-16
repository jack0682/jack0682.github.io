import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research threads on Ontology Neural Networks, perception theory, mathematical foundations, and delay-robust control.",
};

export default function ResearchPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Research"
        title="Threads in progress."
        lead="A small number of long-running research threads, each building on a shared foundation: that perception, representation, and control are best understood as one continuous mathematical object."
      />
      <ComingSoon note="The research hub will index the active threads — Ontology Neural Networks, perception theory, cohomological structure, and delay-robust control — each with its own dedicated space for results, proofs, and working notes." />
    </Container>
  );
}
