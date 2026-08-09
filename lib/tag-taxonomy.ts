/**
 * Reader-facing taxonomy for the site's deliberately rich tag vocabulary.
 *
 * Frontmatter remains flexible, but the public index always resolves a tag to
 * one of five stable lenses. The explicit sets cover programme names and
 * document/status vocabulary; everything else is a research topic by default.
 */
export type TagCategory =
  | "track"
  | "topic"
  | "document"
  | "status"
  | "archive";

export type TagCategoryMeta = {
  label: string;
  shortLabel: string;
  mark: string;
  description: string;
};

export const TAG_CATEGORY_ORDER: readonly TagCategory[] = [
  "track",
  "topic",
  "document",
  "status",
  "archive",
];

export const TAG_CATEGORY_META: Record<TagCategory, TagCategoryMeta> = {
  track: {
    label: "Programmes & fields",
    shortLabel: "Programme",
    mark: "∮",
    description:
      "The main research programmes and disciplinary fields that organise the work.",
  },
  topic: {
    label: "Concepts & methods",
    shortLabel: "Topic",
    mark: "χ",
    description:
      "Mathematical objects, methods, systems, and recurring technical questions.",
  },
  document: {
    label: "Document types",
    shortLabel: "Document",
    mark: "¶",
    description:
      "Formal results, specifications, proofs, registries, and other ways the material is written.",
  },
  status: {
    label: "Status & research cycles",
    shortLabel: "Status",
    mark: "Δ",
    description:
      "Version stamps, research weeks, audits, and evidence-state markers.",
  },
  archive: {
    label: "Archive",
    shortLabel: "Archive",
    mark: "↶",
    description:
      "Historical, superseded, withdrawn, or otherwise preserved-for-record material.",
  },
};

const TRACK_TAGS = new Set([
  "scc",
  "onn",
  "ortsf",
  "perception",
  "theory",
  "control",
  "robotics",
  "relationworld",
  "lqg",
  "quantum-gravity",
  "cognitive-robotics",
  "human-robot-collaboration",
  "meta",
]);

const DOCUMENT_TAGS = new Set([
  "appendix",
  "applications",
  "axioms",
  "background",
  "brainstorm",
  "canonical",
  "canonical-spec",
  "claim",
  "commitments",
  "concrete-computations",
  "conjectures",
  "declaration",
  "evaluation",
  "examples",
  "experiments",
  "frontiers",
  "glossary",
  "hypothesis-tree",
  "interpretation",
  "methodology",
  "notation",
  "open-problems",
  "overview",
  "paper",
  "planning",
  "prerequisites",
  "proof",
  "reference",
  "registry",
  "specification",
  "theorem",
]);

const STATUS_TAGS = new Set([
  "audit-discipline",
  "conditional",
  "critical-resolution",
  "decision-c",
  "empirical-validation",
  "status-report",
  "testing",
  "theory-freeze",
  "theory-ledger",
]);

const ARCHIVE_TAGS = new Set([
  "archive",
  "deprecated",
  "historical-snapshot",
  "legacy",
  "retracted",
  "superseded",
  "withdrawn",
]);

/**
 * A deliberately small starting map. These are conceptual entrances, not a
 * ranking of importance or a list of every active project.
 */
export const CORE_TAGS = [
  "scc",
  "onn",
  "perception",
  "relationworld",
  "theory",
  "control",
  "robotics",
  "lqg",
  "gauge-theory",
  "cohomology",
  "topology",
  "ortsf",
  "cognitive-robotics",
  "quantum-gravity",
  "internal-time",
  "human-robot-collaboration",
] as const;

const CORE_TAG_RANK = new Map<string, number>(
  CORE_TAGS.map((tag, index) => [tag, index]),
);

export function classifyTag(tag: string): TagCategory {
  if (
    ARCHIVE_TAGS.has(tag) ||
    /(?:^|-)archive(?:d)?$/.test(tag) ||
    /(?:^|-)superseded$/.test(tag)
  ) {
    return "archive";
  }

  if (
    STATUS_TAGS.has(tag) ||
    /^cv-\d/.test(tag) ||
    /^w\d+(?:-|$)/.test(tag)
  ) {
    return "status";
  }

  if (TRACK_TAGS.has(tag)) return "track";
  if (DOCUMENT_TAGS.has(tag)) return "document";
  return "topic";
}

export function isCoreTag(tag: string): boolean {
  return CORE_TAG_RANK.has(tag);
}

export function coreTagRank(tag: string): number {
  return CORE_TAG_RANK.get(tag) ?? Number.POSITIVE_INFINITY;
}
