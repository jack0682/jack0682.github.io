/**
 * Schema.org JSON-LD helpers.
 *
 * Each function returns a plain object ready to be JSON-stringified
 * into a `<script type="application/ld+json">` tag. We emit one
 * structured-data block per page (root layout = WebSite + Person;
 * detail pages = Article / ScholarlyArticle / BlogPosting), which is
 * the shape Google Search Central recommends for academic blogs.
 */

import { absoluteUrl, SITE_URL } from "./site";
import { IDENTITY_LINKS, EMAIL } from "./identity";

const PUBLISHER_NAME = "Jaehong Oh — Research";
const AUTHOR_NAME = "Jaehong Oh";

/** Person schema reused by every Article/BlogPosting/ScholarlyArticle. */
export function personSchema() {
  return {
    "@type": "Person",
    name: AUTHOR_NAME,
    url: SITE_URL,
    email: `mailto:${EMAIL}`,
    sameAs: IDENTITY_LINKS.filter((l) => l.external).map((l) => l.href),
    affiliation: [
      { "@type": "Organization", name: "ROBOTIS — Perception Team" },
      { "@type": "Organization", name: "Soongsil University" },
    ],
    jobTitle:
      "Robotics engineer · AI researcher · Mechanical Engineering undergraduate",
  };
}

/** WebSite + Person — emitted from the root layout. */
export function rootSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: PUBLISHER_NAME,
      url: SITE_URL,
      description:
        "Research on Ontology Neural Networks, perception theory, and the mathematical foundations of embodied cognition.",
      inLanguage: "en",
      author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      ...personSchema(),
    },
  ];
}

type ArticleProps = {
  title: string;
  permalink: string;
  description?: string;
  ogImage?: string;
  datePublished?: string;
  dateModified?: string;
  wordCount?: number;
  keywords?: readonly string[];
  /** Override `@type` when the doc warrants `BlogPosting` etc. */
  type?: "Article" | "BlogPosting";
};

/** Article (default) or BlogPosting — for notes / journal / onn. */
export function articleSchema({
  title,
  permalink,
  description,
  ogImage,
  datePublished,
  dateModified,
  wordCount,
  keywords,
  type = "Article",
}: ArticleProps) {
  const url = absoluteUrl(permalink);
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    name: title,
    url,
    mainEntityOfPage: url,
    ...(description && { description }),
    ...(ogImage && { image: absoluteUrl(ogImage) }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(wordCount && wordCount > 0 && { wordCount }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
    inLanguage: "en",
    author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: SITE_URL,
    },
  };
}

type ScholarlyProps = {
  title: string;
  permalink: string;
  abstract: string;
  authors: readonly string[];
  datePublished: string;
  dateModified?: string;
  ogImage?: string;
  doi?: string;
  arxiv?: string;
  pdf?: string;
  venue?: string;
  keywords?: readonly string[];
};

/** ScholarlyArticle — for the papers collection. Emits citation
 *  identifiers (DOI, arXiv) so Google Scholar can pick them up. */
export function scholarlyArticleSchema({
  title,
  permalink,
  abstract,
  authors,
  datePublished,
  dateModified,
  ogImage,
  doi,
  arxiv,
  pdf,
  venue,
  keywords,
}: ScholarlyProps) {
  const url = absoluteUrl(permalink);
  const identifiers: { "@type": string; propertyID: string; value: string }[] = [];
  if (doi) {
    identifiers.push({
      "@type": "PropertyValue",
      propertyID: "DOI",
      value: doi,
    });
  }
  if (arxiv) {
    identifiers.push({
      "@type": "PropertyValue",
      propertyID: "arXiv",
      value: arxiv,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: title,
    name: title,
    abstract,
    url,
    mainEntityOfPage: url,
    ...(ogImage && { image: absoluteUrl(ogImage) }),
    datePublished,
    ...(dateModified && { dateModified }),
    ...(pdf && { sameAs: [absoluteUrl(pdf)] }),
    inLanguage: "en",
    author: authors.map((name) =>
      name === AUTHOR_NAME
        ? { "@type": "Person", name, url: SITE_URL }
        : { "@type": "Person", name },
    ),
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: SITE_URL,
    },
    ...(venue && {
      isPartOf: { "@type": "Periodical", name: venue },
    }),
    ...(identifiers.length > 0 && { identifier: identifiers }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
  };
}

/** Render helper — one-liner for embedding in JSX. */
export function jsonLdScript(schema: object | object[]): string {
  return JSON.stringify(schema);
}
