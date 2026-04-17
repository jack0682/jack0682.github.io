import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { allNotes } from "@/lib/content";

/**
 * Dual-purpose page at `/notes/{segment}/`:
 *
 *   1. If `{segment}` is `part-N`, redirect to `/notes/` (per-part
 *      index pages will be built separately in a later phase).
 *
 *   2. If `{segment}` is a note slug (e.g. `canonical-spec-scc`),
 *      redirect to the canonical `/notes/part-X/{slug}/` URL.
 *
 * Under `output: "export"`, Next.js renders `redirect()` as a static
 * HTML page containing a meta-refresh + client jump — which is what
 * GitHub Pages actually serves.
 */

export function generateStaticParams() {
  const slugParams = allNotes.map((n) => ({ part: n.slug }));
  const parts = Array.from(new Set(allNotes.map((n) => n.part))).map((p) => ({
    part: `part-${p}`,
  }));
  return [...slugParams, ...parts];
}

export const dynamicParams = false;

type Props = { params: Promise<{ part: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { part } = await params;
  const note = allNotes.find((n) => n.slug === part);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: `/notes/part-${note.part}/${note.slug}/`,
    },
  };
}

export default async function NotesAliasOrPartIndex({ params }: Props) {
  const { part } = await params;

  if (/^part-\d+$/.test(part)) {
    redirect("/notes/");
  }

  const note = allNotes.find((n) => n.slug === part);
  if (!note) {
    redirect("/notes/");
  }

  redirect(`/notes/part-${note.part}/${note.slug}/`);
}
