---
title: "ONN Daily - 2026-02-17 - Finite-Sample Quantile Transfer Correction"
date: 2026-02-17 09:00:00 +0900
last_modified_at: 2026-02-17 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, quantile-calibration, leakage-gate, regime-shift, finite-sample]
toc: true
toc_sticky: true
excerpt: "Replaced unconditional quantile transfer with a regime-conditional finite-sample correction and linked it to explicit monitor/window acceptance conditions."
---

[ONN Daily Index](/onn-daily/) | [Previous: 2026-02-16 - Semantic Manifold 100K Scalability Proof](/2026-02-16-onn-daily-semantic-manifold-100k-scalability-proof/)

## Context
Today's work hardened the leakage-gate theory against regime shift and finite-sample uncertainty. The key change is moving from unconditional quantile transfer to a regime-conditional quantile gate with an explicit confidence correction term and deployment-facing monitoring constraints.

## Today's Theory Target
Finite-Sample Quantile Transfer Correction for Leakage Gate.

## What Changed in the Theory
### Restatement (cleaned)
- Unconditional transfer of `m_off^95` across regimes is not accepted after a heavy-tail counterexample.
- The gate is now regime-conditional: estimate `m_off^95(R)` within matched regime labels.
- Add finite-sample correction `epsilon_n(delta)` so the acceptance threshold uses a conservative quantile estimate.
- Connect gate validity to monitor cadence and rolling-window size assumptions.

### Proof Audit (gaps & required assumptions)
- `A11`: regime labels must be stable/correct in the calibration window.
- `A12`: leakage samples in the window must satisfy assumptions close enough for quantile correction validity.
- Dependence/autocorrelation can weaken IID-style concentration guarantees, so block-bootstrap validation is still required.
- Delay bursts beyond the modeled envelope remain a failure mode for global claims.

### Strengthening (new lemma / tighter condition / fix)
- Added a finite-sample correction route based on concentration-style quantile inflation for conservative gating.
- Reframed the acceptance rule as a two-stage condition: corrected leakage gate plus drift guard.
- Added explicit window-size and monitor-cadence requirements as acceptance preconditions.
- Narrowed scope of claims to local safety under stated assumptions rather than unconditional global transfer.

## Paper Patch Notes (actionable edits)
- Insert theory updates C12-C14 into `05_theory.typ` with explicit assumptions (`A11`, `A12`).
- Add calibration protocol and coverage validation plan to `06_experiments.typ`.
- Expand topology/method positioning and quantile-transfer rationale in `07_related_work.typ`.
- Update `refs.bib` with the new topological-regularization and trigger-delay references used today.

## New Literature Integrated (>=3)
- Verma et al. (2024): Topological neural networks (persistent/equivariant/continuous) to tighten topology-conditioning positioning. [1]
- Nigmetov et al. (2024): Persistence-sensitive topological regularization as a concrete integration candidate. [2]
- Chen et al. (2025): Trigger-dependent communication delay theory aligned with delay-trigger acceptance analysis. [3]
- Ballester et al. (2024): PH-based generalization-gap diagnostics as a candidate drift proxy. [4]

## Development Actions (next 72 hours)
- Implement block-bootstrap coverage validation for corrected leakage quantiles (OP-021).
- Implement regime drift detector for stale-quantile invalidation (OP-021).
- Run trigger-dependent delay sweep and evaluate false-accept/false-reject tradeoff (OP-018).
- Add confusion-matrix and heatmap outputs for gated acceptance monitoring.
- Rebuild `main.typ` after section insertions to verify integration compilation.

## Open Problems (carried + new)
- OP-013 (carried): structured `mu` inflation under block-coupled uncertainty.
- OP-012 (carried): validate D-scaling conservativeness with measurable `eta_off^95` target.
- OP-020 (updated): finite-sample quantile correction validation with dependence-aware coverage checks.
- OP-018 (updated): trigger-dependent delay sweep for acceptance boundary robustness.
- OP-021 (new): regime drift detector plus block-bootstrap coverage test.

## Next-day Seed
Implement the block-bootstrap coverage test and regime drift detector, then re-evaluate gate coverage and false-accept risk under regime shifts.

## References (reference-style links only)
[1]: https://proceedings.mlr.press/v235/verma24a.html
[2]: https://doi.org/10.1016/j.comgeo.2024.102086
[3]: https://link.springer.com/article/10.1007/s44443-025-00277-y
[4]: https://www.sciencedirect.com/science/article/pii/S0925231224005587
