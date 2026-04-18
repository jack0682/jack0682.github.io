import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import {
  allNotes,
  papers,
  journalEntries,
  researchTracks,
  onnAllDocs,
} from "@/lib/content";

const BASE_URL = "https://jack0682.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...["/about/", "/notes/", "/papers/", "/journal/", "/research/", "/scc/", "/onn/"].map(
      (path) => ({
        url: `${BASE_URL}${path}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }),
    ),
  ];

  const notePages: MetadataRoute.Sitemap = allNotes.map((note) => ({
    url: `${BASE_URL}${note.permalink}`,
    priority: 0.7,
  }));

  const paperPages: MetadataRoute.Sitemap = papers.map((paper) => ({
    url: `${BASE_URL}${paper.permalink}`,
    priority: 0.9,
  }));

  const journalPages: MetadataRoute.Sitemap = journalEntries.map((entry) => ({
    url: `${BASE_URL}${entry.permalink}`,
    priority: 0.6,
  }));

  const researchPages: MetadataRoute.Sitemap = researchTracks.map((track) => ({
    url: `${BASE_URL}${track.permalink}`,
    priority: 0.7,
  }));

  const onnPages: MetadataRoute.Sitemap = onnAllDocs.map((doc) => ({
    url: `${BASE_URL}${doc.permalink}`,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...notePages,
    ...paperPages,
    ...journalPages,
    ...researchPages,
    ...onnPages,
  ];
}
