---
title: "ONN Daily - 2026-02-14 - Time-Varying Leakage Certificate"
date: 2026-02-14 09:00:00 +0900
last_modified_at: 2026-02-14 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, leakage, time-varying, certificate, rho-off]
toc: true
toc_sticky: true
excerpt: "Extended the ONN handoff certificate with time-varying leakage inflation (c_J^tv = c_diag + c_off + rho_off*Delta h) and added a runtime safety override policy backed by new delay-stability literature."
---

[ONN Daily Index](/onn-daily/) | [Previous: 2026-02-13 - Leakage-Aware Structured-mu Screening](/2026-02-13-onn-daily-leakage-aware-structured-mu-screening/)

## Context
Today focuses on closing the gap left by the static leakage certificate. The key objective is to make off-diagonal leakage variation measurable in runtime windows and to prevent false accepts when leakage changes too quickly for static uncertainty assumptions.

## Today's Theory Target
Time-Varying Leakage Certificate for ONN->ORTSF handoff.

## What Changed in the Theory
### Restatement (cleaned)
- Keep the block decomposition: J = J_blk + J_off.
- Define c_diag = sup ||J_blk||_2, c_off = sup ||J_off||_2 on Omega_eps.
- Add leakage-rate term: rho_off = sup_t ||J_off(t+1)-J_off(t)||_2 / Delta h.
- Inflate leakage on a finite window: c_off^Delta = c_off + rho_off * Delta h.
- Updated local bound: c_J^tv = c_diag + c_off^Delta.
- Updated runtime check: Gamma_hat(Delta t, sigma_dt) * c_J^tv < 1.

### Proof Audit (gaps & required assumptions)
- C7 is proved under bounded leakage-rate assumption (A10): c_off^Delta is conservative over the chosen window.
- C8 remains plausible, not fully proved: dynamic structured-mu mapping for rate-bounded Delta_off is still unresolved.
- Main risk remains nonstationary leakage bursts and under-fitted Gamma_hat tails.

### Strengthening (new lemma / tighter condition / fix)
- Added C7/C8/C9 continuity:
  - C7: time-window leakage inflation bound.
  - C8: conservative runtime filter with c_J^tv.
  - C9: safety override policy, reject static acceptance when TV certificate fails.
- Operational fix: monitor rho_off quantiles (especially rho_off^95) and coverage of Omega_eps before accepting handoff.

## Paper Patch Notes (actionable edits)
- P-222: add Definition 11, Lemma 11, Corollary 11 for time-varying leakage certificate in `05_theory.typ`.
- P-223: add rho_off measurement protocol and static-vs-TV evaluation flow in `06_experiments.typ`.
- P-224: add related-work bridge on switched time-delay ISS interpretation for rate-bounded leakage in `07_related_work.typ`.

## New Literature Integrated (>=3)
- Goksu (2024), switched nonlinear time-delay ISS results and admissible switching constraints. [1]
- Ruan et al. (2025), robust control design under rate-free time-varying communication delays and uncertainties. [2]
- Liao et al. (2024), augmented-variable stability analysis for linear time-varying delay systems. [3]
- Wei and Wei (2025), survey on persistent topological Laplacians for topology-informed module analysis context. [4]

## Development Actions (next 72 hours)
- Implement rho_off estimator in runtime monitoring pipeline.
- Add rho_off^95 and eta_off^95 dashboards with confidence intervals.
- Enable C9 safety override in acceptance policy.
- Run static-vs-TV certificate delay-jitter batch and measure false-accept reduction.
- Run seed sweeps for rho_off estimator stability.
- Add topology-informed vs random partition ablation under identical delay profiles.

## Open Problems (carried + new)
- OP-014 (updated): bounded-rate leakage model and protocol added; proof and empirical closure still open.
- OP-015 (new): derive dynamic structured-mu or IQC-equivalent conservative condition for rate-bounded Delta_off.
- OP-013 (carried): static inflation rule proof/refutation remains open.
- OP-012 (carried): eta_off^95 <= 0.25 target remains unverified.

## Next-day Seed
- 2026-02-15: run full static-vs-TV certificate batch and quantify false-accept reduction with reproducible seed sweeps.

## References (reference-style links only)
[1]: https://doi.org/10.1016/j.sysconle.2024.105724
[2]: https://doi.org/10.1016/j.trc.2024.104913
[3]: https://doi.org/10.3390/math12111638
[4]: https://doi.org/10.3390/math13020208
