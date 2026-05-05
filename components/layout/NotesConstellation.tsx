import Link from "next/link";
import { cn } from "@/lib/cn";

type Note = {
  slug: string;
  title: string;
  part: number;
  chapter?: number;
  kind?: string;
  related: readonly string[];
};

type Props = {
  notesByPart: readonly (readonly [number, readonly Note[]])[];
  className?: string;
};

const VIEW_W = 960;
const ROW_H = 56;
const TOP_PAD = 28;
const BOTTOM_PAD = 28;
const X_PAD_LEFT = 130;
const X_PAD_RIGHT = 36;

const KIND_COLOUR: Record<string, string> = {
  canonical: "var(--color-accent)",
  theorem: "var(--color-ink)",
  proof: "var(--color-ink)",
  overview: "var(--color-muted)",
  roadmap: "var(--color-muted)",
  registry: "var(--color-muted)",
  essay: "var(--color-subtle)",
};

const partTitles: Record<number, string> = {
  0: "Part 0 · SCC",
  1: "Part I · Foundations",
  2: "Part II · Theorems",
  3: "Part III · Cohomology",
  4: "Part IV · Dynamics",
  5: "Part V · Applications",
  6: "Part VI · Frontiers",
  7: "Part VII · Robotics",
  8: "Appendices",
};

/**
 * Server-rendered constellation: each Part is a horizontal band;
 * each note is a small circle along that band; explicit `related`
 * cross-references are drawn as soft arcs. Hover a circle to see
 * its title via the native SVG `<title>` tooltip; click to open
 * the note. Pure SVG — no client JS, no layout libraries.
 */
export function NotesConstellation({ notesByPart, className }: Props) {
  const partRows = notesByPart.map(([part, items], idx) => {
    const sorted = [...items].sort(
      (a, b) => (a.chapter ?? 0) - (b.chapter ?? 0) || a.slug.localeCompare(b.slug),
    );
    const span = VIEW_W - X_PAD_LEFT - X_PAD_RIGHT;
    const positions = sorted.map((n, i) => ({
      slug: n.slug,
      title: n.title,
      kind: n.kind,
      related: n.related,
      part: n.part,
      x:
        sorted.length === 1
          ? X_PAD_LEFT + span / 2
          : X_PAD_LEFT + (i / (sorted.length - 1)) * span,
      y: TOP_PAD + idx * ROW_H,
    }));
    return { part, label: partTitles[part] ?? `Part ${part}`, nodes: positions };
  });

  // Flatten for fast slug → position lookup.
  const indexBySlug = new Map<string, { x: number; y: number }>();
  for (const row of partRows)
    for (const n of row.nodes) indexBySlug.set(n.slug, { x: n.x, y: n.y });

  // Edges: only when both endpoints exist in the rendered set.
  type Edge = { fromX: number; fromY: number; toX: number; toY: number };
  const edges: Edge[] = [];
  for (const row of partRows) {
    for (const n of row.nodes) {
      for (const target of n.related) {
        const tgt = indexBySlug.get(target);
        if (!tgt) continue;
        if (tgt.x === n.x && tgt.y === n.y) continue;
        edges.push({ fromX: n.x, fromY: n.y, toX: tgt.x, toY: tgt.y });
      }
    }
  }

  const totalH =
    TOP_PAD + partRows.length * ROW_H + BOTTOM_PAD - ROW_H + 16;

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)] p-4",
        className,
      )}
    >
      <svg
        role="img"
        aria-label="Constellation of every note across all parts, with related edges"
        viewBox={`0 0 ${VIEW_W} ${totalH}`}
        width={VIEW_W}
        height={totalH}
        className="block max-w-full"
      >
        {/* Part guide rules + labels */}
        {partRows.map((row, idx) => (
          <g key={`row-${row.part}`}>
            <line
              x1={X_PAD_LEFT - 16}
              x2={VIEW_W - X_PAD_RIGHT + 16}
              y1={TOP_PAD + idx * ROW_H}
              y2={TOP_PAD + idx * ROW_H}
              stroke="var(--color-rule)"
              strokeWidth={0.5}
              strokeDasharray="2 4"
            />
            <text
              x={X_PAD_LEFT - 22}
              y={TOP_PAD + idx * ROW_H}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fill="var(--color-subtle)"
              className="select-none"
            >
              {row.label}
            </text>
          </g>
        ))}

        {/* Edges — drawn first so nodes overlay */}
        {edges.map((e, i) => {
          const midX = (e.fromX + e.toX) / 2;
          const midY = (e.fromY + e.toY) / 2 - Math.abs(e.toY - e.fromY) * 0.25;
          return (
            <path
              key={i}
              d={`M ${e.fromX} ${e.fromY} Q ${midX} ${midY} ${e.toX} ${e.toY}`}
              fill="none"
              stroke="var(--color-rule)"
              strokeOpacity={0.6}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Nodes */}
        {partRows.map((row) =>
          row.nodes.map((n) => {
            const fill = KIND_COLOUR[n.kind ?? "essay"] ?? "var(--color-subtle)";
            return (
              <Link
                key={n.slug}
                href={`/notes/part-${n.part}/${n.slug}/`}
                aria-label={n.title}
              >
                <g className="group">
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={3}
                    fill={fill}
                    className="transition-[r] duration-150 group-hover:[r:5]"
                  />
                  <title>{n.title}</title>
                </g>
              </Link>
            );
          }),
        )}
      </svg>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
        <span>{indexBySlug.size} notes</span>
        <span aria-hidden>·</span>
        <span>{edges.length} edges</span>
        <span aria-hidden>·</span>
        <LegendDot label="canonical" colour="var(--color-accent)" />
        <LegendDot label="theorem" colour="var(--color-ink)" />
        <LegendDot label="overview" colour="var(--color-muted)" />
        <LegendDot label="essay" colour="var(--color-subtle)" />
      </div>
    </div>
  );
}

function LegendDot({ label, colour }: { label: string; colour: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: colour }}
      />
      {label}
    </span>
  );
}
