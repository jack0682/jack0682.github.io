"use client";

import { useMemo, useState } from "react";
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

const VIEW_W = 1080;
const ROW_H = 64;
const TOP_PAD = 32;
const BOTTOM_PAD = 24;
const X_PAD_LEFT = 140;
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

const KIND_LABEL: Record<string, string> = {
  canonical: "canonical",
  theorem: "theorem",
  proof: "proof",
  overview: "overview",
  roadmap: "roadmap",
  registry: "registry",
  essay: "essay",
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

type LaidOutNode = {
  slug: string;
  title: string;
  kind: string | undefined;
  related: readonly string[];
  part: number;
  chapter?: number;
  index: number;
  x: number;
  y: number;
  permalink: string;
};

/**
 * Interactive constellation: each Part is a horizontal band; each
 * note a small circle along that band; explicit `related` cross
 * references rendered as soft arcs. Hover a node to see its title,
 * kind, and chapter in the status bar below — connected edges
 * highlight in accent, the rest dim. Click to open the note.
 *
 * Pure client component (interactive state); no layout libraries.
 */
export function NotesConstellation({ notesByPart, className }: Props) {
  const { rows, allNodes, edges, totalH } = useMemo(() => {
    const rows = notesByPart.map(([part, items], idx) => {
      const sorted = [...items].sort(
        (a, b) =>
          (a.chapter ?? 0) - (b.chapter ?? 0) || a.slug.localeCompare(b.slug),
      );
      const span = VIEW_W - X_PAD_LEFT - X_PAD_RIGHT;
      const positions: LaidOutNode[] = sorted.map((n, i) => ({
        slug: n.slug,
        title: n.title,
        kind: n.kind,
        related: n.related,
        part: n.part,
        chapter: n.chapter,
        index: i + 1,
        x:
          sorted.length === 1
            ? X_PAD_LEFT + span / 2
            : X_PAD_LEFT + (i / (sorted.length - 1)) * span,
        y: TOP_PAD + idx * ROW_H,
        permalink: `/notes/part-${n.part}/${n.slug}/`,
      }));
      return {
        part,
        label: partTitles[part] ?? `Part ${part}`,
        count: positions.length,
        nodes: positions,
      };
    });

    const allNodes: LaidOutNode[] = rows.flatMap((r) => r.nodes);
    const indexBySlug = new Map(allNodes.map((n) => [n.slug, n]));

    type Edge = {
      from: LaidOutNode;
      to: LaidOutNode;
    };
    const edges: Edge[] = [];
    for (const n of allNodes) {
      for (const target of n.related) {
        const tgt = indexBySlug.get(target);
        if (!tgt || tgt.slug === n.slug) continue;
        edges.push({ from: n, to: tgt });
      }
    }

    const totalH =
      TOP_PAD + rows.length * ROW_H + BOTTOM_PAD;

    return { rows, allNodes, edges, totalH };
  }, [notesByPart]);

  // Adjacency map for hover dimming.
  const neighbours = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const e of edges) {
      const a = m.get(e.from.slug) ?? new Set<string>();
      a.add(e.to.slug);
      m.set(e.from.slug, a);
      const b = m.get(e.to.slug) ?? new Set<string>();
      b.add(e.from.slug);
      m.set(e.to.slug, b);
    }
    return m;
  }, [edges]);

  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const hovered = hoveredSlug
    ? allNodes.find((n) => n.slug === hoveredSlug) ?? null
    : null;

  const isHighlighted = (slug: string) =>
    !hoveredSlug ||
    hoveredSlug === slug ||
    (neighbours.get(hoveredSlug)?.has(slug) ?? false);

  return (
    <div
      className={cn(
        "rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)] p-4",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <svg
          role="img"
          aria-label="Constellation of every note across all parts, with related edges"
          viewBox={`0 0 ${VIEW_W} ${totalH}`}
          width={VIEW_W}
          height={totalH}
          className="block max-w-full"
        >
          {/* Part guide rules + labels */}
          {rows.map((row, idx) => (
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
                y={TOP_PAD + idx * ROW_H - 2}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fill="var(--color-subtle)"
                className="select-none"
              >
                {row.label}
              </text>
              <text
                x={X_PAD_LEFT - 22}
                y={TOP_PAD + idx * ROW_H + 12}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="9"
                fontFamily="var(--font-mono)"
                fill="var(--color-subtle)"
                opacity={0.7}
                className="select-none"
              >
                {row.count} {row.count === 1 ? "note" : "notes"}
              </text>
            </g>
          ))}

          {/* Edges — drawn first so nodes overlay */}
          {edges.map((e, i) => {
            const fromActive = hoveredSlug === e.from.slug;
            const toActive = hoveredSlug === e.to.slug;
            const active = fromActive || toActive;
            const dim = hoveredSlug !== null && !active;
            const midX = (e.from.x + e.to.x) / 2;
            const midY =
              (e.from.y + e.to.y) / 2 -
              Math.abs(e.to.y - e.from.y) * 0.25;
            return (
              <path
                key={i}
                d={`M ${e.from.x} ${e.from.y} Q ${midX} ${midY} ${e.to.x} ${e.to.y}`}
                fill="none"
                stroke={active ? "var(--color-accent)" : "var(--color-rule)"}
                strokeOpacity={active ? 0.9 : dim ? 0.08 : 0.55}
                strokeWidth={active ? 1.2 : 0.6}
                className="transition-[stroke,stroke-opacity,stroke-width] duration-150"
              />
            );
          })}

          {/* Nodes + chapter indices */}
          {allNodes.map((n) => {
            const fill = KIND_COLOUR[n.kind ?? "essay"] ?? "var(--color-subtle)";
            const lit = isHighlighted(n.slug);
            const isHover = hoveredSlug === n.slug;
            return (
              <Link
                key={n.slug}
                href={n.permalink}
                aria-label={n.title}
              >
                <g
                  className="group cursor-pointer transition-opacity duration-150"
                  onMouseEnter={() => setHoveredSlug(n.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onFocus={() => setHoveredSlug(n.slug)}
                  onBlur={() => setHoveredSlug(null)}
                  opacity={lit ? 1 : 0.22}
                >
                  {/* generous transparent click target */}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={12}
                    fill="transparent"
                  />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isHover ? 7 : 4}
                    fill={fill}
                    className="transition-[r] duration-150"
                  />
                  {isHover && (
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={11}
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth={0.8}
                      strokeOpacity={0.5}
                    />
                  )}
                  <text
                    x={n.x}
                    y={n.y + 16}
                    textAnchor="middle"
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    fill="var(--color-subtle)"
                    opacity={lit ? 0.85 : 0.18}
                    className="pointer-events-none select-none transition-opacity duration-150"
                  >
                    {n.index}
                  </text>
                </g>
              </Link>
            );
          })}
        </svg>
      </div>

      {/* Status bar — replaces the slow native SVG title tooltip. */}
      <div className="mt-3 flex min-h-[2.5em] items-baseline gap-3 border-t border-[var(--color-rule)] pt-3">
        {hovered ? (
          <>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {KIND_LABEL[hovered.kind ?? "essay"] ?? "essay"}
            </span>
            <span className="flex-1 truncate font-display text-base leading-tight text-[var(--color-ink)]">
              {hovered.title}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              {partTitles[hovered.part] ?? `Part ${hovered.part}`}
              {hovered.chapter !== undefined && ` · §${hovered.part}.${hovered.chapter}`}
              {neighbours.get(hovered.slug)?.size
                ? ` · ${neighbours.get(hovered.slug)!.size} link${neighbours.get(hovered.slug)!.size === 1 ? "" : "s"}`
                : ""}
            </span>
          </>
        ) : (
          <span className="text-sm italic text-[var(--color-subtle)]">
            Hover any dot to see its title and connections; click to open.
          </span>
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
        <span>{allNodes.length} notes</span>
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
