import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // GitHub Pages (user site served at repo root) — static export
  output: "export",
  images: {
    // The next/image optimizer requires a server; disable for static export
    unoptimized: true,
  },
  // Clean URLs with trailing slashes (friendlier to static hosts)
  trailingSlash: true,
  reactStrictMode: true,
  // Pin Turbopack workspace root to this project, ignoring any
  // ancestor lockfiles (e.g. ~/package-lock.json).
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
