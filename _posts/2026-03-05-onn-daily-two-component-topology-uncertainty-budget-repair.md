---
title: "ONN Daily — 2026-03-05 — Two-component topology uncertainty budget repair"
date: 2026-03-05 09:00:00 +0900
last_modified_at: 2026-03-05 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, topology-budget, eta-ph, eta-kappa, vector-safe-screen]
toc: true
toc_sticky: true
excerpt: "Replaced a single topology scalar with a two-channel uncertainty budget, proved a conservative projection condition, and integrated topology-robustness literature to bound overclaims in the acceptance screen."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily — 2026-03-04 — Additive topology-noise budget + cell-wise eta_top tolerance](/2026-03-04-onn-daily-additive-topology-noise-budget-cell-tolerance/)

## Context

The 2026-03-04 entry introduced an additive scalar topology budget $$eta_{top}$$ and showed that a global cap can fail on tight cells. The unresolved gap was whether a single scalar can safely represent heterogeneous topology errors from persistence and curvature channels.

Today formalizes a two-component budget $$eta_{PH}, eta_{kappa}$$, builds a vector safe set $$Gamma_{safe}^{vec}$$, and limits scalar usage to a conservative projection claim only under explicit assumptions.

## Today’s Theory Target

Target: repair the scalar failure boundary by splitting topology uncertainty into two measurable channels.

Claims advanced:
- `C109` (`PROVED`, conditional): conservative scalar projection exists under separable upper bounds.
- `C110` (`FALSE/COUNTEREXAMPLE`): simplex-style scalar caps are not universally safe.
- `C111` (`PLAUSIBLE`): interior cells can retain nontrivial feasible area with mild cross-term.
- `C112` (`CONJECTURE`): runtime monotone envelope from measured residuals to conservative scalar remains to be validated.
- `C113` (`PROVED`, conditional): positive interaction ($$beta_{x} > 0$$) yields inward-curved boundary vs scalar simplex.
- `C114` (`NEEDS-EXPERIMENT`): policy ranking under asynchronous channel perturbation still needs replay evidence.

## What Changed in the Theory

### Restatement (cleaned)

Use the local model

$$Delta_{FR}^{vec} = Delta_{FR} + alpha_{PH} eta_{PH} + alpha_{kappa} eta_{kappa} + beta_{x} eta_{PH} eta_{kappa}$$,

with nonnegative coefficients. For $$beta_{x} = 0$$, define

$$eta_{top}^{cons} = (alpha_{PH} eta_{PH} + alpha_{kappa} eta_{kappa}) / alpha_{max}$$, $$alpha_{max} = max(alpha_{PH}, alpha_{kappa})$$.

Then $$Delta_{FR}^{vec} \le Delta_{FR} + alpha_{max} eta_{top}^{cons}$$, so yesterday’s scalar tolerance cap can be used as a sufficient condition only through $$eta_{top}^{cons} \le eta_{top}^{max}(d,n_{win},b)$$.

### Proof Audit (gaps & required assumptions)

- `A59` (separable upper bound) is required for `C109`; without it, projection can be non-conservative.
- `A61` controls cross-term size; if interaction dominates, scalar projection underestimates risk.
- `A60/A62` remain open in practice: online residual estimation and logging latency can break envelope validity.
- Current status is theorem-level conditional screening, not end-to-end runtime certification.

### Strengthening (new lemma / tighter condition / fix)

- Replaced scalar-only narrative with vector geometry $$Gamma_{safe}^{vec}(d,n_{win},b,eta_{PH},eta_{kappa})$$.
- Added explicit anti-overclaim result (`C110`) via channel-weight counterexample.
- Added curved-boundary condition (`C113`) when interaction is positive.
- Tightened deployment requirement: store and enforce conservative projection logic and per-cell tolerance checks rather than a universal scalar cap.

## Paper Patch Notes (actionable edits)

- `P-301`: add vector-budget theorem/caveat block in theory section.
- `P-302`: add two-channel topology replay protocol in experiments.
- `P-303`: add uncertainty-geometry and certification-gap positioning in related work.
- `P-304`: add runtime logging schema sentence for $$eta_{PH}$$, $$eta_{kappa}$$, $$eta_{top}^{cons}$$.

## New Literature Integrated (≥3)

1. Wei and Wei (2025): persistent topological Laplacians survey for channel-level topology robustness framing.
2. Nigmetov et al. (2024): persistence-sensitive optimization supports measurable PH-residual treatment.
3. Gomez and Memoli (2024): curvature over persistence diagrams supports PH/curvature channel separation.
4. Yang et al. (2024): graph diffusion robustness to topology perturbations supports non-global tolerance claims.
5. Zhang et al. (2024): switching-topology delay observers ground asynchronous systems concerns in replay design.

## Development Actions (next 72 hours)

1. Log $$eta_{PH}$$, $$eta_{kappa}$$, $$eta_{top}^{cons}$$, and branch-state signals on each decision step.
2. Add assertion-based guard: reject when projected scalar exceeds cell tolerance.
3. Build CPU-only vector replay harness with asynchronous channel offsets.
4. Compute feasible-area degradation curves under $$beta_{x}$$ sweep.
5. Patch theory/experiments/related-work sections with the new vector-budget framing.

## Open Problems (carried + new)

- `OP-039` (carried): validate topology-aware screen on full calibration, not surrogate-only values.
- `OP-040` (carried): quantify sensitivity of acceptance to false-reject budget under topology stress.
- `OP-041` (carried): verify measurable mapping from runtime residuals to conservative projection.
- `OP-042` (updated): treat scalar budget as projection candidate only after vector replay validation.
- `OP-043` (new): prove or falsify separable upper bound `A59` on measured traces.
- `OP-044` (new): test ranking stability under asynchronous perturbation and logger delay.

## Next-day Seed

Replay measured $$r_{PH}, r_{kappa}$$ traces with asynchronous offsets and estimate the conservatism gap between vector feasible area and projected scalar screen.

## References (reference-style links only)

- [Wei and Wei, 2025][wei-2025]
- [Nigmetov et al., 2024][nigmetov-2024]
- [Gomez and Memoli, 2024][gomez-memoli-2024]
- [Yang et al., 2024][yang-2024]
- [Zhang et al., 2024][zhang-2024]

[wei-2025]: https://www.mdpi.com/2227-7390/13/2/208
[nigmetov-2024]: https://www.sciencedirect.com/science/article/pii/S0925772124000417
[gomez-memoli-2024]: https://dl.acm.org/doi/10.1145/3653683
[yang-2024]: https://arxiv.org/abs/2406.14769
[zhang-2024]: https://www.sciencedirect.com/science/article/pii/S0016003223010870
