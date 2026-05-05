/**
 * Giscus comment-widget configuration.
 *
 * Comments only render when ALL three IDs below are set. Generate
 * them at https://giscus.app after enabling GitHub Discussions on
 * the repository, then paste the values here. Until then,
 * `<GiscusComments />` returns null and journal pages stay quiet.
 */

export type GiscusConfig = {
  /** "owner/repo" form. */
  repo: `${string}/${string}`;
  /** GitHub repo node ID (starts with R_). */
  repoId: string;
  /** Discussions category to write into. */
  category: string;
  /** Category node ID (starts with DIC_). */
  categoryId: string;
};

/** Set these once Discussions are enabled and giscus.app is configured. */
export const GISCUS_CONFIG: GiscusConfig | null = null;

// Example shape (uncomment + paste real IDs when ready):
// export const GISCUS_CONFIG: GiscusConfig | null = {
//   repo: "jack0682/jack0682.github.io",
//   repoId: "R_xxx",
//   category: "Comments",
//   categoryId: "DIC_xxx",
// };
