# SCC Figures — Served Binaries

**Single physical location of the 18 SCC figures (PNG/SVG).** All blog pages reference figures from this directory via `/content-assets/scc-figures/figNN-name.png` (Next.js public path).

The **source** of these binaries lives in the Perception_theory repo:

```
/Users/ojaehong/Perception/Perception_theory/THEORY/canonical/figures/
```

- 6 data figures (F01, F03, F04, F06, F08, F11) — Python scripts in `sources/python/`. Run the script → output lands here directly.
- 12 schematic figures (F02, F05, F07, F09, F10, F12–F18) — generated via image-AI prompts (one-shot, no script regeneration).

---

## Inventory + caption text + page mapping (ready to copy into MDX)

Figures are referenced via the `<Figure>` MDX component in `components/mdx/Figure.tsx`. Standard form:

```mdx
<Figure
  src="/content-assets/scc-figures/figNN-name.png"
  alt="One-line accessibility description."
  caption={<>One- to two-sentence caption text.</>}
  className="mx-auto max-w-full sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%]"
/>
```

The responsive `className` gives 75–80% width on desktop, full width on mobile.

### F01 — Soft cohesion field

- **Used in**: `canonical-spec-scc.mdx` (Part 1 link), `canonical-spec-scc-1-foundations.mdx` (§3.3), `scc-glossary.mdx` (Cohesion field entry), `claim-c0001-soft-cohesion-primitive.mdx` (Statement), `scc-hero-t1-existence.mdx` (Statement), `integrated-architecture.mdx` (Layer 1), `research/perception.mdx` (top splash).
- **Caption**: Soft cohesion field $u_t : X_t \to [0,1]$ on a 2D grid — the primitive entity of the theory; objects emerge as derivative limits where cohesion is high, structurally articulated, and temporally inherited.

### F02 — 4-term energy decomposition

- **Used in**: `canonical-spec-scc.mdx` (Part 3 link), `canonical-spec-scc-3-energy.mdx` (§8.1), `scc-research-overview.mdx` (§3 Energy Functional), `scc-glossary.mdx` (Energy Functional entry), `research/perception.mdx` (Formal structure).
- **Caption**: Four conceptually independent structural requirements assembled into the canonical energy: closure (self-support), separation (exterior asymmetry), boundary/morphology (smooth interface + double-well), and transport (temporal inheritance).

### F03 — Closure operator iteration

- **Used in**: `canonical-spec-scc-2-axioms.mdx` (§6 Group A), `canonical-spec-scc-5-results-registry.mdx` (§13 T6 entry), `scc-glossary.mdx` (Closure Operator entry), `scc-research-overview.mdx` (§4 Closure Structure), `scc-hero-t6-closure-fp.mdx` (Statement).
- **Caption**: Closure iteration profiles converge to a unique fixed point at geometric rate $a_{cl}/4 < 1$ (Banach contraction, $a_{cl} < 4$ regime). The trajectory carries structural information, but the destination is unique (CN1, CN9).

### F04 — Phase transition threshold

- **Used in**: `canonical-spec-scc-5-results-registry.mdx` (§13 T8-Core entry), `scc-research-overview.mdx` (§4 Phase-Transition Phenomenon), `scc-hero-t8-core-phase-transition.mdx` (Statement).
- **Caption**: Phase-transition threshold $\beta/\alpha > 4\lambda_2 / |W''(c)|$ in (volume fraction $c$, energy ratio) space, plotted for three graph families. Above the curve: non-uniform minimizer (formation regime). Below: uniform minimizer.

### F05 — Diagnostic vector (graded vs Boolean)

- **Used in**: `canonical-spec-scc-2-axioms.mdx` (§7.2), `scc-research-overview.mdx` (§3 Derived Diagnostic Vector), `scc-glossary.mdx` (Proto-Cohesion Diagnostic entry).
- **Caption**: The proto-cohesion diagnostic $\mathbf{d} = (\text{Bind}, \text{Sep}, \text{Inside}, \text{Persist}) \in [0,1]^4$. The graded vector preserves four-dimensional information that the Boolean projection collapses to a single bit.

### F06 — T7-Enhanced Hessian eigenvalue spectrum

- **Used in**: `canonical-spec-scc-5-results-registry.mdx` (§13 T7-Enhanced entry), `scc-hero-t7-enhanced-metastability.mdx` (Why this is a hero).
- **Caption**: Closure Hessian eigenvalues at a fixed point: (a) non-idempotent closure ($\|J_{Cl}\|_{op} < 1$) yields all $n$ strictly positive eigenvalues; (b) idempotent closure has $k$ zero eigenvalues (flat directions). Non-idempotent closure has strictly enhanced metastability.

### F07 — Sharp-interface limit (Γ-convergence)

- **Used in**: `canonical-spec-scc-5-results-registry.mdx` (§13 T11 entry), `scc-hero-t11-gamma-convergence.mdx` (Statement).
- **Caption**: As $\varepsilon = \alpha/\beta \to 0$, soft cohesion fields $u^\varepsilon$ Γ-converge to characteristic functions of minimal-perimeter sets. The soft-to-crisp bridge: object-like crisp entities are recovered as the asymptotic limit of the soft framework.

### F08 — Gradient flow on $\Sigma_m$

- **Used in**: `canonical-spec-scc-3-energy.mdx` (§8.7 Natural Geometry), `canonical-spec-scc-5-results-registry.mdx` (§13 T14 entry), `scc-hero-t14-gradient-flow.mdx` (Statement).
- **Caption**: Projected gradient flow on the constraint manifold $\Sigma_m$ (here $n=3$ simplex with mass $m=1$): trajectories from various initial points descend to critical points. The uniform field at the centroid is a saddle; corner-region attractors are non-trivial minimizers.

### F09 — T-PreObj-1 mechanism (W4 capstone)

- **Used in**: `canonical-spec-scc-4-interpretation.mdx` (§12 Pre-Objective Mechanism), `canonical-spec-scc-5-results-registry.mdx` (§13 W4 close), `scc-research-overview.mdx` (§4 Multi-Formation Behavior), `claim-c0002-k-field-architecture.mdx` (Statement), `scc-hero-t-preobj-1.mdx` (Statement), `journal/2026-04-26-perception-week-4-extended.mdx` (Cat A 승급).
- **Caption**: Theorem T-PreObj-1 (W4 close, 2026-04-24): under full SCC parameters on any (G1)–(G4) graph, the F=1 single-disk minimizer is **not a critical point**, gradient flow attracts to multi-peak F≥2 configurations, and IC-protocol dichotomy distinguishes adaptive bounded vs random initialization scaling.

### F10 — Lemma 4 (quadratic form PD)

- **Used in**: `canonical-spec-scc-4-interpretation.mdx` (§12 Pre-Objective Mechanism — proof note), `canonical-spec-scc-5-results-registry.mdx` (§13 Lemma 4 entry), `scc-hero-t-preobj-1.mdx` (Proof idea), `journal/2026-04-26-perception-week-4-extended.mdx` (Cat A 승급).
- **Caption**: Lemma 4 — the inner-product matrix $M \in \mathbb{R}^{2 \times 2}$ of $g_{cl}, g_{sep}$ at the F=1 candidate is positive definite under linear independence; destabilization magnitude $\Lambda^T M \Lambda > 0$ for all nonzero $\Lambda$.

### F11 — Goldstone Bloch dispersion (T-V5b-T)

- **Used in**: `canonical-spec-scc-4-interpretation.mdx` (§12 Pre-Objective Goldstone), `canonical-spec-scc-5-results-registry.mdx` (§13 W4-extended), `scc-hero-t-v5b-t.mdx` (Statement), `journal/2026-04-26-perception-week-4-extended.mdx` (Goldstone).
- **Caption**: T-V5b-T (W4-extended, 2026-04-26): on translation-invariant graphs, Goldstone modes form a 2-fold doublet on 2D torus $T^2$ with commensurability splitting, vs a 1-fold branch on the 1D cycle $C_n$.

### F12 — Goldstone nodal count comparison

- **Used in**: `canonical-spec-scc-4-interpretation.mdx` (§12 Pre-Objective Goldstone — closing), `canonical-spec-scc-5-results-registry.mdx` (§13 V5b-F new finding), `scc-hero-t-v5b-t.mdx` (Proof idea), `journal/2026-04-26-perception-week-4-extended.mdx` (Goldstone closing).
- **Caption**: Goldstone nodal count = 2 universal across translation-invariant graph classes (2D torus periodic, 2D torus free BC, 1D cycle). The universal feature distinguishes T-V5b-T (Cat A, all classes) from V5b-F (Cat C, partial Goldstone on boundary-modified graphs).

### F13 — Hero theorem dependency DAG

- **Used in**: `canonical-spec-scc.mdx` (Overview), `canonical-spec-scc-5-results-registry.mdx` (§13 introduction), `scc-theorem-registry.mdx` (top), `scc-status-2026-04.mdx` (Theorem ledger), `scc-heroes.mdx` (Logical dependency, replacing ASCII), `integrated-architecture.mdx` (Layer 1 results), `journal/2026-04-26-perception-week-4-extended.mdx` (Canonical impact), `research/perception.mdx` (State of play).
- **Caption**: Logical dependencies among the 9 SCC hero theorems: foundation (T1, T6, T20) → phase transition + stability (T8-Core, T7-Enhanced, T11, T14) → W4 capstone (T-PreObj-1) → W4-extended capstone (T-V5b-T).

### F14 — F-1 split-resolution

- **Used in**: `canonical-spec-scc-4-interpretation.mdx` (§12 W4 Resolution Banner), `scc-theorem-registry.mdx` (Open Problems), `scc-status-2026-04.mdx` (Open problems — W4 close), `scc-glossary.mdx` (F-1 entry), `scc-hero-t-preobj-1.mdx` (Why this is a hero), `journal/2026-04-26-perception-week-4-extended.mdx` (F-1 SPLIT-RESOLVED).
- **Caption**: F-1 (K=2 vacuity) split-resolved (2026-04-24): two layers, both Category A. Pure $\mathcal{E}_{bd}$ portion via T-Merge (b) (canonical, isoperimetric ordering — pre-existing). Full SCC portion via T-PreObj-1 (i) (W4 new). The dichotomy "K=1 cheaper vs observed K>1" is dissolved.

### F15 — CN15 Static / Dynamic Separation

- **Used in**: `canonical-spec-scc-4-interpretation.mdx` (§11.1 item 14), `canonical-spec-scc-5-results-registry.mdx` (§14 CN15), `scc-status-2026-04.mdx` (Open problems closing), `scc-glossary.mdx` (M-1 entry), `journal/2026-04-26-perception-week-4-extended.mdx` (M-1 LAYER-CLARIFIED).
- **Caption**: CN15 Static / Dynamic Separation: the static global minimum on pure $\mathcal{E}_{bd}$ (K=1, by T-Merge (b)) and the dynamic protocol-endpoint observables under full SCC ($\widehat{K}, \mathcal{F}$) are quantities of different layers. The "F-1 paradox" arose from conflating them.

### F16 — Promotion pipeline

- **Used in**: `scc-status-2026-04.mdx` (Repository structure).
- **Caption**: One-way promotion pipeline: working → weekly draft → weekly summary → canonical. Retractions stay explicit (inline erratum). canonical/ accepts only promoted content; no reverse flow.

### F17 — SCC vs Allen-Cahn

- **Used in**: `scc-research-overview.mdx` (§10 Distinctiveness — opening).
- **Caption**: SCC inherits the variational substrate, double-well, and gradient-flow machinery of Allen-Cahn, but adds two structurally independent self-referential operators (closure for self-completion, distinction for self-contrast) and a four-term energy with no Allen-Cahn counterpart.

### F18 — SCC vs clustering / segmentation

- **Used in**: `canonical-spec-scc-4-interpretation.mdx` (§10 last paragraph), `scc-research-overview.mdx` (§10 Distinctiveness — closing), `research/perception.mdx` (Commitments).
- **Caption**: Categorical inversion: clustering and segmentation start from pre-given objects (input = individuated entities); SCC starts from a graded soft cohesion field (input = pre-objective primitive). The methods may share machinery downstream, but the starting commitments differ at the input.

---

## Aligned with canonical CV-1.4 (2026-04-26)

These captions correspond to the canonical specification CV-1.4 (W4-extended close). When canonical bumps versions, captions referring to specific theorems may need light updates.
