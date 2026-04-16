import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "About",
  description: "About Jaehong Oh — research interests, background, and CV.",
};

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="About"
        title="Jaehong Oh."
        lead="Researcher working at the boundary between the mathematics of perception and the engineering of embodied systems. Currently focused on Ontology Neural Networks and their implications for delay-robust control."
      />
      <ComingSoon note="A full biographical page with CV, selected projects, and contact details will live here." />
    </Container>
  );
}
