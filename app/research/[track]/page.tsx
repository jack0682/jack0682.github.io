import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RelatedDocs } from "@/components/layout/RelatedDocs";
import { PageHeader } from "@/components/layout/PageHeader";
import { DocMeta } from "@/components/layout/DocMeta";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { allNotes, papers, researchTracks } from "@/lib/content";

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

  const crumbs = [
    { href: "/research/", label: "Research" },
    { label: t.title.length > 60 ? t.title.slice(0, 58) + "…" : t.title },
  ];

  const trackNotes = allNotes.filter((n) => n.track === t.track);
  const trackPapers = papers.filter((p) => p.track === t.track);

  return (
    <Container width="prose" data-track={t.track}>
      <div className="pt-10 md:pt-20">
        <Breadcrumb items={crumbs} />
      </div>
      <PageHeader
        mark="∮"
        eyebrow="Research"
        title={t.title}
        lead={t.summary}
        className="pt-0 md:pt-0"
      />
      <DocMeta
        published={t.date}
        updated={t.updated}
        readingTime={t.metadata.readingTime}
        wordCount={t.metadata.wordCount}
        className="-mt-4 mb-8"
      />
      <Prose>
        <MDXContent code={t.body} />
      </Prose>

      <RelatedDocs
        relatedNotes={trackNotes}
        relatedPapers={trackPapers}
      />
    </Container>
  );
}
