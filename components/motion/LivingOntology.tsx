"use client";

/**
 * LivingOntology — a self-organising relation field.
 *
 * A small ecosystem of nodes and edges. Forces keep it laid out;
 * a scheduler periodically spawns new nodes, binds them to the
 * nearest neighbours, collects dense clusters into group nodes,
 * and — after a lifespan or competitive decay — dissolves those
 * groups in a fracture, ejecting survivors back into the field.
 *
 * Pure React + requestAnimationFrame. No physics library. The goal
 * is not accuracy but a quiet, always-evolving diagram that reads
 * as the research model, not as generative decoration.
 */

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ───────── tuning ───────── */

const VIEW = 100; // square viewBox 0..100

// Simulation caps
const MAX_NODES = 88;
const MAX_GROUPS = 8;
const EDGE_REST = 7.5;
const MAX_SPEED = 0.45;

// Force coefficients (all very small — motion is deliberate)
const SPRING_K = 0.014;
const REPULSION_K = 0.45;
const CENTER_K = 0.00038;
const DAMPING = 0.9;
const BOUNDARY_K = 0.005;

// Event intervals (ms)
const SPAWN_INTERVAL = 1400;
const SPAWN_JITTER = 800;
const CLUSTER_EVAL_MS = 500;
const GROUP_TICK_MS = 500;
const REBIND_INTERVAL = 700;

// Lifespan — shorter cycles so the field turns over visibly
const GROUP_LIFESPAN_MS = 7_500;
const GROUP_LIFESPAN_JITTER = 3_500;

// Clustering thresholds — looser so groups form more readily
const CLUSTER_RADIUS = 11;
const CLUSTER_MIN_MEMBERS = 3;
const CLUSTER_MAX_MEMBERS = 8;
const CLUSTER_EDGE_DENSITY = 0.38;

// Reduced-motion snapshot time (simulate up to t seconds, then freeze)
const RM_SNAPSHOT_MS = 5_000;

// Visual
const NODE_R = 1.15;
const GROUP_CORE_R = 1.7;
const FADE_IN_MS = 900;
const FADE_OUT_MS = 600;
const FRACTURE_MS = 900;

/* ───────── types ───────── */

type Vec = { x: number; y: number };

type Node = {
  id: number;
  pos: Vec;
  vel: Vec;
  groupId: number | null;
  birth: number; // ms timestamp (sim clock)
  /** 0..1; 1 means fully present. Drops to 0 during fade-out before death. */
  alpha: number;
  /** If set, this node is fading out and will be removed when alpha<=0. */
  dying: boolean;
};

type Edge = {
  id: number;
  from: number;
  to: number;
  alpha: number;
  dying: boolean;
};

type Group = {
  id: number;
  memberIds: number[];
  /** Fraction of full life remaining, 0..1. Decays with age + external pressure. */
  stability: number;
  birth: number;
  lifespan: number; // ms
  dissolving: boolean;
  /** 0..1 fracture progress when dissolving. */
  fractureT: number;
  /** Cached for render: center + radius of convex hull-ish bound. */
  center: Vec;
  radius: number;
};

type Sim = {
  nodes: Map<number, Node>;
  edges: Map<number, Edge>;
  groups: Map<number, Group>;
  nextNodeId: number;
  nextEdgeId: number;
  nextGroupId: number;
  clock: number; // ms since start of this sim instance
  lastSpawn: number;
  lastClusterEval: number;
  lastGroupTick: number;
  lastRebind: number;
  rng: () => number;
};

/* ───────── helpers ───────── */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const dist2 = (a: Vec, b: Vec) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
};

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

/* ───────── simulation ───────── */

function createSim(seed = 1): Sim {
  const rng = mulberry32(seed);
  const sim: Sim = {
    nodes: new Map(),
    edges: new Map(),
    groups: new Map(),
    nextNodeId: 1,
    nextEdgeId: 1,
    nextGroupId: 1,
    clock: 0,
    lastSpawn: 0,
    lastClusterEval: 0,
    lastGroupTick: 0,
    lastRebind: 0,
    rng,
  };
  // Warm start: seed with enough nodes + edges that the field feels
  // inhabited from the first frame.
  const seeds = 34;
  for (let i = 0; i < seeds; i++) {
    spawnNode(sim, true);
  }
  // Initial edges — connect each node to its 2 nearest neighbours.
  const ids = [...sim.nodes.keys()];
  for (let i = 0; i < ids.length; i++) {
    const a = sim.nodes.get(ids[i])!;
    const cand: Array<{ id: number; d: number }> = [];
    for (let j = 0; j < ids.length; j++) {
      if (i === j) continue;
      const d = dist2(a.pos, sim.nodes.get(ids[j])!.pos);
      cand.push({ id: ids[j], d });
    }
    cand.sort((x, y) => x.d - y.d);
    addEdge(sim, ids[i], cand[0].id);
    if (rng() < 0.75 && cand[1]) addEdge(sim, ids[i], cand[1].id);
  }
  return sim;
}

function spawnNode(sim: Sim, initial = false): Node | null {
  if (sim.nodes.size >= MAX_NODES) return null;
  const r = sim.rng;
  // Warm-up scatters near centre; later spawns emerge from a ring
  // around the centre so nodes don't anchor to canvas corners.
  let x: number, y: number;
  const cx = VIEW / 2;
  const cy = VIEW / 2;
  if (initial) {
    const rr = r() * 26;
    const a = r() * Math.PI * 2;
    x = cx + Math.cos(a) * rr;
    y = cy + Math.sin(a) * rr;
  } else {
    const rr = 34 + r() * 6; // ring radius around centre
    const a = r() * Math.PI * 2;
    x = cx + Math.cos(a) * rr;
    y = cy + Math.sin(a) * rr;
  }
  const node: Node = {
    id: sim.nextNodeId++,
    pos: { x, y },
    vel: { x: (r() - 0.5) * 0.1, y: (r() - 0.5) * 0.1 },
    groupId: null,
    birth: sim.clock,
    alpha: initial ? 1 : 0,
    dying: false,
  };
  sim.nodes.set(node.id, node);
  return node;
}

function addEdge(sim: Sim, from: number, to: number): Edge | null {
  if (from === to) return null;
  // dedupe
  for (const e of sim.edges.values()) {
    if (
      (e.from === from && e.to === to) ||
      (e.from === to && e.to === from)
    ) {
      return null;
    }
  }
  const edge: Edge = {
    id: sim.nextEdgeId++,
    from,
    to,
    alpha: 0,
    dying: false,
  };
  sim.edges.set(edge.id, edge);
  return edge;
}

function removeNodeHard(sim: Sim, id: number) {
  sim.nodes.delete(id);
  for (const [eid, e] of sim.edges) {
    if (e.from === id || e.to === id) sim.edges.delete(eid);
  }
}

function step(sim: Sim, dtMs: number) {
  const dt = Math.min(dtMs, 64); // cap step size to avoid large jumps
  sim.clock += dt;
  const nodes = sim.nodes;
  const edges = sim.edges;

  /* 1) forces: edge springs */
  for (const e of edges.values()) {
    const a = nodes.get(e.from);
    const b = nodes.get(e.to);
    if (!a || !b) continue;
    const dx = b.pos.x - a.pos.x;
    const dy = b.pos.y - a.pos.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1e-6;
    const f = (SPRING_K * (d - EDGE_REST)) / d;
    a.vel.x += f * dx;
    a.vel.y += f * dy;
    b.vel.x -= f * dx;
    b.vel.y -= f * dy;
  }

  /* 2) global weak repulsion (Coulomb-ish) */
  const arr = [...nodes.values()];
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const b = arr[j];
      const dx = a.pos.x - b.pos.x;
      const dy = a.pos.y - b.pos.y;
      const d2 = dx * dx + dy * dy + 0.5;
      const inv = REPULSION_K / d2;
      a.vel.x += inv * dx * 0.05;
      a.vel.y += inv * dy * 0.05;
      b.vel.x -= inv * dx * 0.05;
      b.vel.y -= inv * dy * 0.05;
    }
  }

  /* 3) radial bowl toward centre + elastic boundary
        The pull grows with distance from centre (bowl) so nodes
        never settle against the canvas edge. */
  const cx = VIEW / 2;
  const cy = VIEW / 2;
  const halfView = VIEW / 2;
  const margin = 10;
  for (const n of arr) {
    const dx = cx - n.pos.x;
    const dy = cy - n.pos.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1e-6;
    const t = d / halfView;        // 0 at centre, 1 at corner
    const bowl = 1 + t * t * 3.5;   // quadratic steepening
    n.vel.x += dx * CENTER_K * bowl;
    n.vel.y += dy * CENTER_K * bowl;
    // elastic boundary with wider margin
    if (n.pos.x < margin) n.vel.x += BOUNDARY_K * (margin - n.pos.x) ** 1.4;
    if (n.pos.x > VIEW - margin)
      n.vel.x -= BOUNDARY_K * (n.pos.x - (VIEW - margin)) ** 1.4;
    if (n.pos.y < margin) n.vel.y += BOUNDARY_K * (margin - n.pos.y) ** 1.4;
    if (n.pos.y > VIEW - margin)
      n.vel.y -= BOUNDARY_K * (n.pos.y - (VIEW - margin)) ** 1.4;
  }

  /* 4) group cohesion (members pulled gently toward group centroid) */
  for (const g of sim.groups.values()) {
    if (g.dissolving) continue;
    let cx = 0,
      cy = 0,
      count = 0;
    for (const mid of g.memberIds) {
      const m = nodes.get(mid);
      if (!m) continue;
      cx += m.pos.x;
      cy += m.pos.y;
      count++;
    }
    if (count === 0) continue;
    cx /= count;
    cy /= count;
    g.center.x = cx;
    g.center.y = cy;
    let maxR = 0;
    for (const mid of g.memberIds) {
      const m = nodes.get(mid);
      if (!m) continue;
      const k = 0.03;
      m.vel.x += (cx - m.pos.x) * k;
      m.vel.y += (cy - m.pos.y) * k;
      const d = Math.sqrt(dist2(m.pos, { x: cx, y: cy }));
      if (d > maxR) maxR = d;
    }
    g.radius = maxR + 2.5;
  }

  /* 5) integrate + damping + speed cap */
  for (const n of arr) {
    n.vel.x *= DAMPING;
    n.vel.y *= DAMPING;
    const spd2 = n.vel.x * n.vel.x + n.vel.y * n.vel.y;
    if (spd2 > MAX_SPEED * MAX_SPEED) {
      const s = MAX_SPEED / Math.sqrt(spd2);
      n.vel.x *= s;
      n.vel.y *= s;
    }
    n.pos.x += n.vel.x;
    n.pos.y += n.vel.y;
  }

  /* 6) alpha transitions */
  for (const n of arr) {
    if (n.dying) {
      n.alpha -= dt / FADE_OUT_MS;
      if (n.alpha <= 0) removeNodeHard(sim, n.id);
    } else if (n.alpha < 1) {
      n.alpha = Math.min(1, n.alpha + dt / FADE_IN_MS);
    }
  }
  for (const e of [...edges.values()]) {
    if (e.dying) {
      e.alpha -= dt / FADE_OUT_MS;
      if (e.alpha <= 0) edges.delete(e.id);
    } else if (e.alpha < 1) {
      e.alpha = Math.min(1, e.alpha + dt / FADE_IN_MS);
    }
    // drop edges that lost endpoints
    if (!nodes.has(e.from) || !nodes.has(e.to)) edges.delete(e.id);
  }

  /* 7) scheduled events */
  runScheduler(sim);
}

/* ───────── scheduler: spawn, rebind, cluster, dissolve ───────── */

function runScheduler(sim: Sim) {
  const now = sim.clock;
  const r = sim.rng;

  // spawn
  const spawnGap = SPAWN_INTERVAL + (r() - 0.5) * SPAWN_JITTER;
  if (now - sim.lastSpawn > spawnGap && sim.nodes.size < MAX_NODES) {
    spawnNode(sim);
    sim.lastSpawn = now;
  }

  // rebind: try to attach a new edge between close unconnected free nodes
  if (now - sim.lastRebind > REBIND_INTERVAL) {
    sim.lastRebind = now;
    tryRebind(sim);
  }

  // cluster evaluation → merge
  if (now - sim.lastClusterEval > CLUSTER_EVAL_MS) {
    sim.lastClusterEval = now;
    if (sim.groups.size < MAX_GROUPS) tryFormGroup(sim);
  }

  // group stability tick + dissolve
  if (now - sim.lastGroupTick > GROUP_TICK_MS) {
    sim.lastGroupTick = now;
    tickGroups(sim);
  }
}

function tryRebind(sim: Sim) {
  const r = sim.rng;
  const free = [...sim.nodes.values()].filter(
    (n) => !n.dying && n.groupId === null,
  );
  if (free.length < 2) return;
  // pick a random node, then its nearest unconnected neighbor
  const a = free[Math.floor(r() * free.length)];
  let best: Node | null = null;
  let bestD = Infinity;
  for (const b of free) {
    if (b.id === a.id) continue;
    // skip if already linked
    let linked = false;
    for (const e of sim.edges.values()) {
      if (
        (e.from === a.id && e.to === b.id) ||
        (e.from === b.id && e.to === a.id)
      ) {
        linked = true;
        break;
      }
    }
    if (linked) continue;
    const d = dist2(a.pos, b.pos);
    if (d < bestD) {
      bestD = d;
      best = b;
    }
  }
  if (best && bestD < CLUSTER_RADIUS * CLUSTER_RADIUS * 1.4 && r() < 0.7) {
    addEdge(sim, a.id, best.id);
  }
}

function tryFormGroup(sim: Sim) {
  const free = [...sim.nodes.values()].filter(
    (n) => !n.dying && n.groupId === null && n.alpha > 0.6,
  );
  if (free.length < CLUSTER_MIN_MEMBERS) return;

  // pick a seed and accrete neighbours within CLUSTER_RADIUS
  const seed = free[Math.floor(sim.rng() * free.length)];
  const bag: Node[] = [seed];
  for (const n of free) {
    if (n.id === seed.id) continue;
    if (bag.length >= CLUSTER_MAX_MEMBERS) break;
    // within radius of any current bag member?
    let inside = false;
    for (const m of bag) {
      if (dist2(n.pos, m.pos) < CLUSTER_RADIUS * CLUSTER_RADIUS) {
        inside = true;
        break;
      }
    }
    if (inside) bag.push(n);
  }
  if (bag.length < CLUSTER_MIN_MEMBERS) return;

  // edge density inside the bag
  const ids = new Set(bag.map((n) => n.id));
  let intra = 0;
  for (const e of sim.edges.values()) {
    if (ids.has(e.from) && ids.has(e.to)) intra++;
  }
  const possible = (bag.length * (bag.length - 1)) / 2;
  const density = possible > 0 ? intra / possible : 0;
  if (density < CLUSTER_EDGE_DENSITY) return;

  // merge — form a group
  const center = { x: 0, y: 0 };
  for (const n of bag) {
    center.x += n.pos.x;
    center.y += n.pos.y;
  }
  center.x /= bag.length;
  center.y /= bag.length;

  const group: Group = {
    id: sim.nextGroupId++,
    memberIds: bag.map((n) => n.id),
    stability: 1,
    birth: sim.clock,
    lifespan: GROUP_LIFESPAN_MS + sim.rng() * GROUP_LIFESPAN_JITTER,
    dissolving: false,
    fractureT: 0,
    center,
    radius: 8,
  };
  sim.groups.set(group.id, group);
  for (const n of bag) n.groupId = group.id;
}

function tickGroups(sim: Sim) {
  for (const g of [...sim.groups.values()]) {
    if (g.dissolving) {
      g.fractureT += GROUP_TICK_MS / FRACTURE_MS;
      if (g.fractureT >= 1) finaliseDissolve(sim, g);
      continue;
    }
    // age decay
    const age = sim.clock - g.birth;
    g.stability -= (GROUP_TICK_MS / g.lifespan) * 0.75;
    // competitive pressure: nearby non-member nodes erode stability
    for (const n of sim.nodes.values()) {
      if (n.groupId === g.id || n.dying) continue;
      const d = Math.sqrt(dist2(n.pos, g.center));
      if (d < g.radius + 6) {
        g.stability -= 0.015;
      }
    }
    if (g.stability <= 0 || age > g.lifespan) {
      g.dissolving = true;
      g.fractureT = 0;
    }
  }
}

function finaliseDissolve(sim: Sim, g: Group) {
  const r = sim.rng;
  const members = g.memberIds
    .map((id) => sim.nodes.get(id))
    .filter((n): n is Node => !!n);
  // choose 1-2 to perish; rest are ejected outward
  const toDie = Math.min(members.length - 1, Math.random() < 0.7 ? 1 : 2);
  const doomedIdx = new Set<number>();
  while (doomedIdx.size < toDie) {
    doomedIdx.add(Math.floor(r() * members.length));
  }
  for (let i = 0; i < members.length; i++) {
    const n = members[i];
    n.groupId = null;
    if (doomedIdx.has(i)) {
      n.dying = true;
    } else {
      // ejection: add outward velocity
      const dx = n.pos.x - g.center.x;
      const dy = n.pos.y - g.center.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      n.vel.x += (dx / d) * 0.35;
      n.vel.y += (dy / d) * 0.35;
    }
  }
  sim.groups.delete(g.id);
}

/* ───────── component ───────── */

type Props = {
  className?: string;
  /** default seed for deterministic warm start */
  seed?: number;
};

export function LivingOntology({ className, seed = 7 }: Props) {
  const simRef = useRef<Sim | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(0);
  const [, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // initialise sim + loop
  useEffect(() => {
    if (!mounted) return;
    if (!simRef.current) simRef.current = createSim(seed);

    const sim = simRef.current;

    // If reduced-motion: fast-forward to snapshot then freeze.
    if (reducedMotion) {
      let t = 0;
      while (t < RM_SNAPSHOT_MS) {
        step(sim, 16);
        t += 16;
      }
      setTick((n) => n + 1);
      return;
    }

    const loop = (now: number) => {
      const prev = lastFrameRef.current || now;
      const dt = now - prev;
      lastFrameRef.current = now;
      const vis = document.visibilityState !== "hidden";
      if (!paused && vis) {
        step(sim, dt);
      }
      setTick((n) => (n + 1) % 1_000_000);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [mounted, reducedMotion, paused, seed]);

  if (!mounted) return null;
  const sim = simRef.current;
  if (!sim) return null;

  return (
    <figure className={className}>
      <div className="relative">
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          role="img"
          aria-labelledby="living-ontology-title"
          className="block h-auto w-full select-none"
        >
          <title id="living-ontology-title">
            Self-organising ontology graph, in evolution
          </title>

          {/* subtle dot-grid backdrop */}
          <defs>
            <pattern
              id="lo-dotgrid"
              x="0"
              y="0"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="0.25" cy="0.25" r="0.18" fill="var(--color-ink)" opacity="0.12" />
            </pattern>
          </defs>
          <rect x="0" y="0" width={VIEW} height={VIEW} fill="url(#lo-dotgrid)" />

          {/* groups (dashed boundary, possibly fracturing) */}
          {[...sim.groups.values()].map((g) => (
            <GroupBoundary key={g.id} g={g} />
          ))}

          {/* edges */}
          {[...sim.edges.values()].map((e) => {
            const a = sim.nodes.get(e.from);
            const b = sim.nodes.get(e.to);
            if (!a || !b) return null;
            return (
              <line
                key={e.id}
                x1={a.pos.x}
                y1={a.pos.y}
                x2={b.pos.x}
                y2={b.pos.y}
                stroke="var(--color-ink)"
                strokeWidth={0.25}
                opacity={Math.min(a.alpha, b.alpha) * e.alpha * 0.45}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {/* nodes */}
          {[...sim.nodes.values()].map((n) => {
            const isGrouped = n.groupId !== null;
            return (
              <circle
                key={n.id}
                cx={n.pos.x}
                cy={n.pos.y}
                r={isGrouped ? NODE_R * 1.05 : NODE_R}
                fill={isGrouped ? "var(--color-accent)" : "var(--color-ink)"}
                opacity={n.alpha * (isGrouped ? 0.85 : 0.7)}
              />
            );
          })}

          {/* group cores */}
          {[...sim.groups.values()].map((g) => (
            <circle
              key={`core-${g.id}`}
              cx={g.center.x}
              cy={g.center.y}
              r={GROUP_CORE_R}
              fill="var(--color-accent)"
              opacity={g.dissolving ? (1 - g.fractureT) * 0.5 : 0.55}
            />
          ))}
        </svg>

        {/* pause toggle — bottom-right, liquid-glass chip */}
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Resume ontology graph" : "Pause ontology graph"}
            className="liquid-glass absolute bottom-2 right-2 inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            {paused ? (
              <Play size={10} strokeWidth={1.8} />
            ) : (
              <Pause size={10} strokeWidth={1.8} />
            )}
            <span>{paused ? "play" : "pause"}</span>
          </button>
        )}
      </div>

      <figcaption className="mt-2 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
        fig. · ontology, in evolution
      </figcaption>
    </figure>
  );
}

/* ───────── group boundary render ───────── */

function GroupBoundary({ g }: { g: Group }) {
  if (!g.dissolving) {
    return (
      <circle
        cx={g.center.x}
        cy={g.center.y}
        r={g.radius}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={0.3}
        strokeDasharray="1.2 1.8"
        opacity={0.45 * g.stability + 0.15}
        vectorEffect="non-scaling-stroke"
      />
    );
  }
  // fracture: draw as arc segments flying outward
  const segs = 6;
  const t = g.fractureT;
  return (
    <g opacity={1 - t}>
      {Array.from({ length: segs }).map((_, i) => {
        const a0 = (i / segs) * Math.PI * 2;
        const a1 = ((i + 0.7) / segs) * Math.PI * 2;
        const outward = 1 + t * 1.4;
        const r = g.radius * outward;
        const x0 = g.center.x + Math.cos(a0) * r;
        const y0 = g.center.y + Math.sin(a0) * r;
        const x1 = g.center.x + Math.cos(a1) * r;
        const y1 = g.center.y + Math.sin(a1) * r;
        return (
          <path
            key={i}
            d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={0.35}
            strokeDasharray="1.2 1.8"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </g>
  );
}
