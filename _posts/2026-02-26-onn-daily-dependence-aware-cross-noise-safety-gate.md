---
title: ONN Daily — 2026-02-26 — Dependence-aware Cross-noise Safety Gate
date: 2026-02-26 09:00:00 +0900
last_modified_at: 2026-02-26 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, dependence-aware, cross-noise, safety-gate, hurst]
toc: true
toc_sticky: true
excerpt: Hardened a dependence-aware dual-guard acceptance condition that links b_H coverage lower bounds and L_cp^0.95 CI limits into an auditable cross-noise safety gate.
---

[ONN Daily Index](/onn-daily/)  
[Previous: ONN Daily — 2026-02-25](/2026-02-25-onn-daily-mc-calibration-ci-validity-bh-lcp/)

## Context

This post converts the 2026-02-26 ONN/ORTSF research log into a publish-ready record. The day focused on turning yesterday's calibration framework into a dependence-aware cross-noise safety gate with explicit failure propagation and patch-ready theorem language.

## Today's Theory Target

Target: Dependence-aware cross-noise safety gate for $b_{H}$ and $L_{cp}^{0.95}$.

Why this was high leverage today:
- Bridges C68-C74 calibration results into deployable acceptance logic.
- Unifies dependence correction, heavy-tail inflation control, and lead-time uncertainty.
- Produces auditable conditions tied to explicit logged quantities.

## What Changed in the Theory

### Restatement (cleaned)

For each tracked noise family $nu$, require conservative coverage certification for $b_{H}(n_{win}, nu)$ through dependence-corrected lower bounds $LB_{nu}(alpha_{H})$. In parallel, require CP lead-time safety through dependent-bootstrap confidence intervals on $L_{cp}^{0.95}(nu)$. Accept only when both guards pass:
- coverage guard: $LB_{nu}(alpha_{H}) \ge 1 - alpha_{H}$
- lead-time guard: $max_{nu} CI_{cp}^{0.95}(nu) \le L_{max}$

### Proof Audit (gaps & required assumptions)

Main assumptions surfaced: effective sample conservatism (`A40`), bounded heavy-tail inflation (`A41`), and dependent-bootstrap CI validity (`A42`).

Primary gaps identified:
- optimistic $n_{eff}$ can invalidate coverage guarantees,
- unbounded inflation under skewed heavy tails can break cross-noise transfer,
- CI undercoverage can appear under stronger long-memory regimes.

### Strengthening (new lemma / tighter condition / fix)

Strengthening applied today:
- Replaced IID-style counts with conservative $n_{eff}$ from thinning/block-bootstrap policy.
- Introduced dual-guard acceptance (coverage + CI) to replace single-guard logic.
- Added explicit uncertainty-block interpretation for calibration effects and failure propagation.
- Marked Gaussian-only sufficiency as false by counterexample and replaced it with bounded-family logic.

## Paper Patch Notes (actionable edits)

- `paper/sections/05_theory.typ`: add dependence-aware dual-guard theorem block and failure-propagation conditions (P-248, P-251).
- `paper/sections/06_experiments.typ`: add bootstrap-CI intersection protocol and acceptance table (P-249).
- `paper/sections/07_related_work.typ`: add conflict-positioning paragraph for dependence-aware CP and delay-robust control literature (P-250).
- `paper/refs.bib`: integrate accepted references supporting uncertainty and dependence claims.

## New Literature Integrated (>=3)

1. Pinheiro and Colon (2024), uncertainty analysis/synthesis for time-delay systems with Padé approximations. https://doi.org/10.1016/j.jfranklin.2024.01.044
2. Zheng and Zhao (2024), robust $H_∞$ stabilization with uncertain input delay. https://doi.org/10.1016/j.jfranklin.2024.107223
3. Mo et al. (2025), Razumikhin-ISS/small-gain theorem for discrete-time delay systems. https://doi.org/10.1016/j.automatica.2025.112111
4. Wegner and Wendler (2024), robust CP detection under dependence with wild bootstrap. https://doi.org/10.1007/s00362-024-01577-7

## Development Actions (next 72 hours)

- Validate CI lower coverage under ARFIMA/fGn stress with conservative $n_{eff}$ choices.
- Stress-test skewed heavy-tail mixtures to bound inflation factor stability.
- Add dual-guard ablation (single vs dual) with false-accept/false-reject tradeoff reporting.
- Extend certification logs to enforce schema checks for $(nu, n_{eff}, LB_{nu}, L_{cp}^{0.95}, CI_{cp}^{0.95}, delta_{kappa})$.

## Open Problems (carried + new)

Carried:
- OP-028/029/030/031/032 on dependence correction, CI validity, and cross-noise transfer.

New:
- OP-034: prove or tightly bound inflation under broader heavy-tail/skew families.
- OP-035: establish practical lower-coverage guarantees for CI under strong LRD.

## Next-day Seed

Build a minimal theorem-plus-experiment package that certifies conservative dual-guard acceptance on bounded-family assumptions, then red-team with skewed heavy-tail and strong-LRD stress cases to locate the tight admissible regime.

## References

- Pinheiro, R. F., and Colon, D. (2024). On the μ-analysis and synthesis for uncertain time-delay systems with Padé approximations. *Journal of the Franklin Institute*. https://doi.org/10.1016/j.jfranklin.2024.01.044
- Zheng, Y.-G., and Zhao, Y.-Y. (2024). Robust H∞ stabilization for systems with uncertain input time-delay. *Journal of the Franklin Institute*. https://doi.org/10.1016/j.jfranklin.2024.107223
- Mo, Y., Yu, W., Hou, H., and Dasgupta, S. (2025). Razumikhin-type ISS Lyapunov function and small gain theorem for discrete-time time-delay systems with consensus applications. *Automatica*. https://doi.org/10.1016/j.automatica.2025.112111
- Wegner, L., and Wendler, M. (2024). Robust change-point detection for functional time series based on U-statistics and dependent wild bootstrap. *Statistical Papers*. https://doi.org/10.1007/s00362-024-01577-7
