import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { PanZoomBox } from "@/components/layout/PanZoomBox";
import dagJson from "../../../.velite/dag.json";

export const metadata: Metadata = {
  title: "SCC · Theorem dependency graph",
  description:
    "An auto-laid-out directed graph of every theorem-kind note and the explicit `related` edges between them. Each node links to the underlying note.",
};

type DagNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  permalink: string;
  section: string;
  part: number | null;
};

type DagEdge = {
  from: string;
  to: string;
  points: { x: number; y: number }[];
};

type Dag = {
  nodes: DagNode[];
  edges: DagEdge[];
  width: number;
  height: number;
};

const dag = dagJson as Dag;

function pathFromPoints(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  return `M ${first.x} ${first.y} ` + rest.map((p) => `L ${p.x} ${p.y}`).join(" ");
}

export default function SccDagPage() {
  return (
    <Container width="wide">
      <div className="pt-10 md:pt-20">
        <Breadcrumb
          items={[
            { href: "/scc/", label: "SCC · Hub" },
            { label: "Dependency graph" },
          ]}
        />
      </div>
      <PageHeader
        mark="DAG"
        eyebrow="SCC"
        title="Theorem dependency graph"
        lead={`${dag.nodes.length} theorem-kind notes laid out by their explicit \`related\` edges (${dag.edges.length} arrows). Click any node to open the underlying note.`}
        className="pt-0 md:pt-0"
      />

      {dag.nodes.length === 0 ? (
        <p className="text-[var(--color-muted)]">
          No theorem nodes yet — annotate a note with <code>kind: theorem</code> to opt in.
        </p>
      ) : (
        <PanZoomBox className="rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)] p-4">
          <svg
            role="img"
            aria-label="Theorem dependency graph"
            viewBox={`0 0 ${dag.width} ${dag.height}`}
            width={dag.width}
            height={dag.height}
            className="block max-w-full"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path
                  d="M 0 0 L 10 5 L 0 10 z"
                  fill="var(--color-subtle)"
                />
              </marker>
            </defs>

            {/* edges first so nodes overlay */}
            {dag.edges.map((e, i) => (
              <path
                key={`${e.from}-${e.to}-${i}`}
                d={pathFromPoints(e.points)}
                fill="none"
                stroke="var(--color-rule)"
                strokeWidth={1}
                markerEnd="url(#arrow)"
              />
            ))}

            {dag.nodes.map((n) => (
              <g key={n.id} transform={`translate(${n.x - n.w / 2}, ${n.y - n.h / 2})`}>
                <Link href={n.permalink}>
                  <rect
                    width={n.w}
                    height={n.h}
                    rx={2}
                    fill="var(--color-bg)"
                    stroke="var(--color-rule)"
                    strokeWidth={1}
                    className="transition-[stroke,fill] hover:fill-[var(--color-surface)] hover:stroke-[var(--color-accent)]"
                  />
                  <text
                    x={n.w / 2}
                    y={n.h / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fontFamily="var(--font-mono)"
                    fill="var(--color-ink)"
                    className="select-none"
                  >
                    {truncate(n.label, 28)}
                  </text>
                </Link>
              </g>
            ))}
          </svg>
        </PanZoomBox>
      )}

      <p className="mt-6 max-w-[44rem] text-sm leading-relaxed text-[var(--color-muted)]">
        Layout is computed at build time by{" "}
        <code className="font-mono text-xs">@dagrejs/dagre</code> — top-to-bottom, no
        manual placement. Edges are derived from the <code className="font-mono text-xs">related:</code>{" "}
        frontmatter on each theorem note. To add a node, set{" "}
        <code className="font-mono text-xs">kind: theorem</code> on the note; to add an
        edge, list the target slug in the source note&rsquo;s{" "}
        <code className="font-mono text-xs">related:</code> array.
      </p>
    </Container>
  );
}

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}
