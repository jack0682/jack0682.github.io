export const ULR_DOC_STATUS_LABEL = {
  canonical: "Canonical",
  current: "Current",
  historical: "Historical",
  noncanonical: "Non-canonical",
} as const;

export function ulrDocStatusLabel(status: keyof typeof ULR_DOC_STATUS_LABEL) {
  return ULR_DOC_STATUS_LABEL[status];
}

export function ulrCanonLabel(canon?: string, fallback?: string) {
  return canon ? `Canon ${canon}` : fallback;
}
