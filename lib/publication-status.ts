export const PAPER_STATUS_LABELS = {
  published: "Published",
  accepted: "Accepted",
  submitted: "Submitted",
  preprint: "Preprint",
  "in-progress": "In progress",
} as const;

export type PaperStatus = keyof typeof PAPER_STATUS_LABELS;
export type ClaimStatus =
  | "current"
  | "partially-superseded"
  | "withdrawn"
  | "historical";

export function paperStatusLabel(status: PaperStatus) {
  return PAPER_STATUS_LABELS[status];
}

export function paperPublicSummary(paper: {
  abstract: string;
  claimStatus?: ClaimStatus;
  auditSummary?: string;
}) {
  return paper.claimStatus && paper.claimStatus !== "current" && paper.auditSummary
    ? paper.auditSummary
    : paper.abstract;
}

export function paperClaimLabel(status?: ClaimStatus) {
  switch (status) {
    case "partially-superseded":
      return "Partially superseded after audit";
    case "withdrawn":
      return "Claims withdrawn";
    case "historical":
      return "Historical record";
    default:
      return "Current claims";
  }
}
