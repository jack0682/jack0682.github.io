import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TOC } from "@/components/layout/TOC";
import { DocMeta } from "@/components/layout/DocMeta";
import { DocActions } from "@/components/layout/DocActions";
import { StickyDocTitle } from "@/components/layout/StickyDocTitle";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { ulrAllDocs } from "@/lib/content";
import { articleSchema, jsonLdScript } from "@/lib/seo";
import { ulrCanonLabel, ulrDocStatusLabel } from "@/lib/ulr-labels";

export function generateStaticParams() {
  return ulrAllDocs.map((doc) => ({ slug: doc.slug }));
}

export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = ulrAllDocs.find((item) => item.slug === slug);
  if (!doc) return {};
  const ogImage = `/og/ulr/${doc.slug}.png`;
  return {
    title: doc.title,
    description: doc.summary ?? doc.description,
    alternates: { canonical: doc.permalink },
    openGraph: { title: doc.title, description: doc.summary ?? doc.description, url: doc.permalink, locale: "ko_KR", images: [{ url: ogImage, width: 1200, height: 630, alt: doc.title }] },
    twitter: { card: "summary_large_image", images: [ogImage] },
  };
}

export default async function UlrDocPage({ params }: Props) {
  const { slug } = await params;
  const doc = ulrAllDocs.find((item) => item.slug === slug);
  if (!doc) notFound();

  const related = doc.related
    .map((relatedSlug) => ulrAllDocs.find((item) => item.slug === relatedSlug))
    .filter((item): item is (typeof ulrAllDocs)[number] => Boolean(item));

  return (
    <div data-track="ulr" lang="ko">
        <DocActions slug={doc.slug} />
        <StickyDocTitle title={doc.title} />
        <TOC toc={doc.toc} />
        <Container width="prose">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleSchema({
          title: doc.title,
          permalink: doc.permalink,
          description: doc.summary ?? doc.description,
          ogImage: `/og/ulr/${doc.slug}.png`,
          datePublished: doc.date,
          dateModified: doc.updated,
          wordCount: doc.metadata.wordCount,
          keywords: doc.tags,
          inLanguage: "ko",
        })) }} />
        <header className="pt-10 pb-6 sm:pt-20 sm:pb-10 md:pt-28">
          <Breadcrumb items={[{ href: "/ulr/", label: "ULR · Main" }, { label: doc.section ?? doc.title }]} />
          <p className="mb-4 sci-eyebrow text-xs text-[var(--color-accent)] sm:mb-5">
            <span className="sci-section-mark mr-2 not-italic text-[0.95em]">Ω</span>
            ULR · {ulrDocStatusLabel(doc.status)}
            {doc.canon && <span className="ml-2 text-[var(--color-muted)] normal-case tracking-normal">· {ulrCanonLabel(doc.canon)}</span>}
          </p>
          <h1 className="font-display text-[clamp(1.5rem,6.5vw,3.25rem)] leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)]">{doc.title}</h1>
          {(doc.summary ?? doc.description) && <p className="mt-6 max-w-[44rem] text-base leading-relaxed text-[var(--color-muted)]">{doc.summary ?? doc.description}</p>}
          <DocMeta published={doc.date} updated={doc.updated} readingTime={doc.metadata.readingTime} wordCount={doc.metadata.wordCount} tags={doc.tags} />
        </header>

        {doc.status === "noncanonical" && (
          <aside className="mb-10 border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] px-5 py-4 text-sm leading-relaxed text-[var(--color-muted)]">
            <strong className="font-medium text-[var(--color-ink)]">비정본 진행층.</strong>{" "}
            이 문서는 Canon 24 이후의 연구를 기록하지만 Canon 25나 새 ontology의 확립을 선언하지 않습니다.
          </aside>
        )}

        <Prose essay className="border-t border-[var(--color-rule)] pt-10">
          <MDXContent code={doc.body} />
        </Prose>

        {related.length > 0 && (
          <nav aria-label="Related ULR documents" className="mt-16 border-t border-[var(--color-rule)] pt-8">
            <p className="sci-eyebrow text-xs text-[var(--color-accent)]">이어 읽기</p>
            <ul className="mt-4 space-y-2 text-sm">
              {related.map((item) => <li key={item.slug}><Link href={item.permalink} className="text-[var(--color-muted)] hover:text-[var(--color-accent)]">{item.title} →</Link></li>)}
            </ul>
          </nav>
        )}
        </Container>
    </div>
  );
}
