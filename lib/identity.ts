/**
 * Single source of truth for scholarly / online identity links.
 *
 * Consumed by Footer "Elsewhere" column and About page "Contact"
 * section. Add an entry only when its identifier is real — undefined
 * fields are filtered out at render time.
 */

export type IdentityLink = {
  /** Short label, e.g. "GitHub". */
  label: string;
  /** Absolute URL. */
  href: string;
  /** Whether the link is external (opens in same tab by default; UI can override). */
  external: boolean;
  /** Optional inline display string when the URL would be too long. */
  display?: string;
};

export const EMAIL = "jack0682@naver.com";

export const IDENTITY_LINKS: IdentityLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/jack0682",
    display: "github.com/jack0682",
    external: true,
  },
  {
    label: "arXiv",
    // Author-search URL works without an arXiv ID; replace with a
    // canonical /a/<author_id> link once registered.
    href: "https://arxiv.org/search/?searchtype=author&query=Oh+Jaehong",
    display: "arxiv.org / Oh Jaehong",
    external: true,
  },
  // To enable, replace with the real identifiers and uncomment.
  // {
  //   label: "ORCID",
  //   href: "https://orcid.org/0000-0000-0000-0000",
  //   display: "0000-0000-0000-0000",
  //   external: true,
  // },
  // {
  //   label: "Scholar",
  //   href: "https://scholar.google.com/citations?user=XXXX",
  //   display: "scholar.google.com",
  //   external: true,
  // },
];
