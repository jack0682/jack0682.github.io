export const ULR_DOC_STATUS_LABEL = {
  canonical: "정본",
  current: "현재",
  historical: "역사",
  noncanonical: "비정본",
} as const;

export function ulrDocStatusLabel(status: keyof typeof ULR_DOC_STATUS_LABEL) {
  return ULR_DOC_STATUS_LABEL[status];
}

export function ulrCanonLabel(canon?: string, fallback?: string) {
  return canon ? `Canon ${canon}` : fallback;
}
