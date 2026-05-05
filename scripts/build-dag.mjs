#!/usr/bin/env node
/**
 * Build a layouted theorem-dependency DAG.
 *
 * Inputs (from Velite):
 *   .velite/notes.json + .velite/onnDocs.json
 *
 * Output:
 *   .velite/dag.json — `{ nodes: [...], edges: [...], width, height }`
 *   with x/y coordinates already computed by dagre, ready to render
 *   as a static SVG in `/scc/dag/`.
 *
 * A node is any document with `kind: "theorem"`. An edge `a → b`
 * exists when `a.related` contains `b.slug` AND `b` is also a
 * theorem node (cross-theorem rail). Non-theorem references in
 * `related` are dropped silently.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import dagre from "@dagrejs/dagre";

const __filename = fileURLToPath(import.meta.url);
const root = resolve(dirname(__filename), "..");

function loadJson(rel) {
  return JSON.parse(readFileSync(resolve(root, rel), "utf8"));
}

const notes = loadJson(".velite/notes.json").filter((n) => !n.draft);
const onnDocs = loadJson(".velite/onnDocs.json").filter((d) => !d.draft);

const all = [...notes, ...onnDocs];
const theoremNodes = all.filter((n) => n.kind === "theorem");
const theoremSet = new Set(theoremNodes.map((n) => n.slug));

const g = new dagre.graphlib.Graph({ directed: true });
g.setGraph({
  rankdir: "TB",
  ranksep: 80,
  nodesep: 36,
  edgesep: 20,
  marginx: 20,
  marginy: 20,
});
g.setDefaultEdgeLabel(() => ({}));

const NODE_W = 200;
const NODE_H = 56;

for (const n of theoremNodes) {
  g.setNode(n.slug, {
    width: NODE_W,
    height: NODE_H,
    label: n.title,
    permalink: n.permalink,
    section: n.section ?? "",
    part: n.part ?? null,
  });
}

let edgeCount = 0;
for (const n of theoremNodes) {
  if (!Array.isArray(n.related)) continue;
  for (const target of n.related) {
    if (!theoremSet.has(target)) continue;
    if (target === n.slug) continue;
    g.setEdge(n.slug, target);
    edgeCount++;
  }
}

dagre.layout(g);

const nodes = g.nodes().map((id) => {
  const v = g.node(id);
  return {
    id,
    x: v.x,
    y: v.y,
    w: v.width,
    h: v.height,
    label: v.label,
    permalink: v.permalink,
    section: v.section,
    part: v.part,
  };
});

const edges = g.edges().map((e) => {
  const v = g.edge(e);
  return {
    from: e.v,
    to: e.w,
    points: v.points,
  };
});

const { width, height } = g.graph();

const out = resolve(root, ".velite/dag.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(
  out,
  JSON.stringify({
    nodes,
    edges,
    width: Math.ceil(width),
    height: Math.ceil(height),
  }),
);

console.log(
  `[dag] ${nodes.length} theorem nodes · ${edgeCount} dependency edges · ${
    Math.ceil(width)
  }×${Math.ceil(height)} layout`,
);
