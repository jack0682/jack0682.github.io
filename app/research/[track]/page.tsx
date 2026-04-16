import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { researchTracks } from "@/lib/content";

export function generateStaticParams() {
  return researchTracks.map((track) => ({ track: track.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ track: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track } = await params;
  const t = researchTracks.find((r) => r.slug === track);
  if (!t) return {};
  return {
    title: t.title,
    description: t.summary,
  };
}

export default async function ResearchTrackPage({ params }: Props) {
  const { track } = await params;
  const t = researchTracks.find((r) => r.slug === track);
  if (!t) notFound();

  return (
    <Container width="prose">
      <PageHeader eyebrow="Research" title={t.title} lead={t.summary} />
      <Prose>
        <MDXContent code={t.body} />
      </Prose>
    </Container>
  );
}
