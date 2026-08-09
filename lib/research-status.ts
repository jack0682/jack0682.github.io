import { researchTracks } from "@/lib/content";

export type ResearchTrackKey = (typeof researchTracks)[number]["track"];

const FALLBACK_LABELS = {
  active: "Active",
  paused: "Paused",
  archived: "Archived",
} as const;

/**
 * Public research-state view derived exclusively from research frontmatter.
 * Pages consume this helper instead of repeating version numbers, audit dates,
 * or active/archived wording in JSX.
 */
export function getResearchStatus(track: ResearchTrackKey) {
  const source = researchTracks.find((item) => item.track === track);
  if (!source) {
    throw new Error(`Missing research metadata for track: ${track}`);
  }

  return {
    track: source.track,
    title: source.title,
    state: source.status,
    label: source.statusLabel ?? FALLBACK_LABELS[source.status],
    summary: source.statusSummary ?? source.summary,
    version: source.currentVersion,
    statusHref: source.currentStatusHref,
    auditedAt: source.auditedAt,
    successorTitle: source.successorTitle,
    successorHref: source.successorHref,
    role: source.role,
    updated: source.updated,
  };
}

export type ResearchStatus = ReturnType<typeof getResearchStatus>;

export const SCC_STATUS = getResearchStatus("perception");
export const ONN_STATUS = getResearchStatus("onn");
export const ULR_STATUS = getResearchStatus("ulr");
