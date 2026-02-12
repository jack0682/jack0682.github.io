---
title: ONN Daily - 2026-02-12 - MIMO mu Acceptance Inequality
date: 2026-02-12 09:00:00 +0900
last_modified_at: 2026-02-12 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, mimo, mu-analysis, robust-stability, delay]
toc: true
toc_sticky: true
excerpt: Defined a mu-based MIMO acceptance inequality tied to Gamma_hat and integrated recent time-delay robustness literature to justify the structured uncertainty block.
---

[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily - 2026-02-11](/2026-02-11-onn-daily-finite-sample-conservative-envelope-lipschitz-delay/)

## Context
Yesterday replaced symbolic delay amplification with a finite-sample conservative envelope and tightened the acceptance check. Today extends the acceptance condition to MIMO robustness using structured singular value `mu`, while retaining the scalar `H_inf` bound as a fallback.

## Today's Theory Target
Define a MIMO robust acceptance inequality using structured singular value `mu` and relate it to the existing `H_inf`-style small-gain bound.

## What Changed in the Theory
### Restatement (cleaned)
- ORTSF loop transfer remains `L(s) := C(s)G(s)e^{-s Delta t}` with delay/jitter envelope `Gamma_hat(Delta t, sigma_dt)`.
- Scalar delay-margin condition stays as `||L(j omega)||_inf < 1` for unstructured uncertainty.
- MIMO robust stability can be certified by `sup_omega mu_Delta(L(j omega)) < 1` after rational delay approximation.
- Conservative acceptance inequality: `sup_omega mu_Delta(Gamma_hat(Delta t, sigma_dt) * L_nom(j omega) * W_J) < 1`, with `W_J := c_J^local I`.

### Proof Audit (gaps & required assumptions)
- The `mu` bound requires a valid structured uncertainty block `Delta` and a stable rational delay approximation (Padé or equivalent).
- The `Gamma_hat` envelope must upper bound the delay/jitter amplification across the operating regime.
- Local ONN gain uncertainty `W_J` is only justified on `Omega_eps`; guard chattering can violate this.
- Structure mismatch or poor Padé order can invalidate the `mu` certificate.

### Strengthening (new lemma / tighter condition / fix)
- New lemma: a `mu`-based MIMO acceptance inequality that reduces to the scalar `H_inf` condition when uncertainty is unstructured.
- Implementation mapping: build linearized ORTSF loop matrices, sweep frequency, and compute `mu` upper bounds instead of scalar `||L||_inf`.
- Clarify the delay-approximation error as a structured block `Delta_tau` inside `Delta` to separate conservativeness from model structure.

## Paper Patch Notes (actionable edits)
- `P-214` (`paper/sections/05_theory.typ`): add Definition + Lemma for structured uncertainty and the `mu`-based MIMO acceptance inequality.
- `P-215` (`paper/sections/06_experiments.typ`): add a `mu` vs `H_inf` margin comparison protocol on linearized ORTSF loops.
- `P-216` (`paper/sections/07_related_work.typ`): add a short paragraph on time-delay `mu`-analysis and robust `H_inf` stabilization.

## New Literature Integrated (>=3)
1. Pinheiro and Colón, Journal of the Franklin Institute (2024): `mu`-analysis/synthesis for uncertain time-delay systems via Padé approximations; supports `Delta_tau` modeling.
2. Zheng and Zhao, Journal of the Franklin Institute (2024): robust `H_inf` stabilization for uncertain input time-delay; baseline for scalar fallback acceptance.
3. Zhou et al., Mathematics (2024): event-triggered output feedback `H_inf` control for networked delay systems; motivates delay-aware margin checks.

## Development Actions (next 72 hours)
1. Compute `mu` upper bounds for linearized ORTSF loops across frequency for `Delta = diag(Delta_J, Delta_tau)`.
2. Define `Delta_J` structure from ONN gain logs (block-diagonal or diagonal by module).
3. Compare `mu` vs scalar `H_inf` margins across delay sweeps and overlay instability rates.
4. Validate Padé order sensitivity vs `Gamma_hat` envelope assumptions.
5. Integrate the MIMO acceptance check into the runtime monitor with cached lookup grids.

## Open Problems (carried + new)
- [OP-011] Define `Delta_J` structure from ONN modules and validate `mu`-based acceptance vs scalar `H_inf`.
- [OP-003] MIMO robustness now framed as `mu`-margin with Padé delay block; needs computation recipe.

## Next-day Seed
2026-02-13: compute initial `mu`-margin curves on a linearized ORTSF loop and compare to scalar `H_inf` checks.

## References (reference-style links only)
- [On the mu-analysis and synthesis for uncertain time-delay systems with Pade approximations (Journal of the Franklin Institute 2024)](https://doi.org/10.1016/j.jfranklin.2024.01.044)
- [Robust H-infinity stabilization for systems with uncertain input time-delay (Journal of the Franklin Institute 2024)](https://doi.org/10.1016/j.jfranklin.2024.107223)
- [Event-Triggered Output Feedback H-infinity Control for Markov-Type Networked Control Systems (Mathematics 2024)](https://doi.org/10.3390/math12172666)
