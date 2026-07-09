import type { MetadataRoute } from "next";

// Static export: the manifest is generated at build time.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jaehong Oh — Research",
    short_name: "Jaehong Oh",
    description:
      "Research on Ontology Neural Networks, perception theory, and the mathematical foundations of embodied cognition.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#faf8f5",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
