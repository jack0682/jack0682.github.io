---
title: ONN Daily - 2026-02-13 - Block-Structured Delta_J and mu Bound
date: 2026-02-13 09:00:00 +0900
last_modified_at: 2026-02-13 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, block-uncertainty, d-scaling, jacobian, mu-analysis]
toc: true
toc_sticky: true
excerpt: Defined a block-structured ONN uncertainty Delta_J and a practical D-scaling mu upper-bound recipe, integrating recent time-delay mu-synthesis literature to ground the computation path.
---

[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily - 2026-02-12](/2026-02-12-onn-daily-mimo-mu-acceptance-inequality/)

## Context
Yesterday formalized a MIMO mu-based acceptance inequality but left the uncertainty structure and computation recipe implicit. Today grounds the ONN uncertainty in Jacobian log blocks and provides a concrete D-scaling upper-bound workflow.

## Today’s Theory Target
Define a block-structured ONN uncertainty Delta_J from Jacobian logs and specify a practical mu upper-bound computation recipe for ORTSF acceptance.

## What Changed in the Theory
### Restatement (cleaned)
- ORTSF loop transfer remains `L(s) := C(s)G(s)e^{-s Delta t}` with delay envelope `Gamma_hat(Delta t, sigma_dt)`.
- Scalar delay margin uses `||L(j omega)||_inf < 1`, but MIMO acceptance requires structured uncertainty.
- Define `Delta_J := diag(Delta_1, ..., Delta_m)` aligned to ONN modules with block weights estimated from Jacobian logs on `Omega_eps`.
- Conservative acceptance check: compute D-scaling mu upper bounds of `M(j omega) := Gamma_hat * L_nom(j omega) * W_J` where `W_J := diag(c_{J,1} I, ..., c_{J,m} I)`.

### Proof Audit (gaps & required assumptions)
- The block partition must reflect true ONN module coupling; mismatched structure yields optimistic bounds.
- D-scaling provides an upper bound, so acceptance is conservative and structure dependent.
- Local ONN bounds remain valid only on `Omega_eps`; guard chattering can violate the certificate.

### Strengthening (new lemma / tighter condition / fix)
- New definition: block-diagonal `Delta_J` with weights `c_{J,i}` derived from JVP logs on `Omega_eps`.
- New lemma: D-scaling upper bound over a frequency grid provides a practical, conservative mu acceptance check.
- Implementation mapping: estimate `c_{J,i}`, assemble `W_J`, and run `mussv`/D-K iteration for `mu` bounds across frequency.

## Paper Patch Notes (actionable edits)
- `P-217` (`paper/sections/05_theory.typ`): add Definition + Lemma for block-structured `Delta_J` and D-scaling mu bound.
- `P-218` (`paper/sections/06_experiments.typ`): add experiment protocol for estimating `c_{J,i}` and comparing mu vs scalar margins.

## New Literature Integrated (≥3)
1. Dlapa, IFAC-PapersOnLine (2024): D-K iteration and algebraic mu-synthesis for time-delay uncertainty; supports the D-scaling computation recipe.
2. Dlapa, ECC 2024: 2-DOF factorization with structured singular value control; provides a concrete structure for `Delta_J` + `Delta_tau` separation.
3. Dlapa, ICCAD 2024: alternative 2-DOF factorization pipeline for time-delay mu; retained as a backup reference if ECC access is limited.

## Development Actions (next 72 hours)
1. Compute block-wise Jacobian norms `c_{J,i}` from ONN logs on `Omega_eps`.
2. Implement D-scaled mu upper-bound sweeps over frequency for `M(j omega)`.
3. Compare mu vs scalar `H_inf` margins on the same delay sweep.
4. Validate block-structure sensitivity by merging/splitting module partitions.
5. Add a runtime guard to recompute block weights when logs drift.

## Open Problems (carried + new)
- [OP-011] `Delta_J` now defined as block-diagonal from Jacobian logs; needs empirical validation vs scalar `H_inf`.
- [OP-003] Provide a reproducible mu computation recipe and confirm numerical stability.
- [OP-012] Validate block partition choice and D-scaling conservativeness for `Delta_J`.

## Next-day Seed
2026-02-14: compute block-wise Jacobian stats and run initial D-scaled mu sweeps on the ORTSF loop.

## References (reference-style links only)
- [Simple Robust Controller via Evolutionary Mu-Synthesis Using Algebraic Approach for Oscillating Plant with Uncertain Time Delay and Astatism (IFAC-PapersOnLine 2024)](https://doi.org/10.1016/j.ifacol.2024.10.295)
- [Structured singular value control with two-degree-of-freedom feedback loop factorization for oscillating plant with uncertain time delay and astatism (ECC 2024)](https://doi.org/10.23919/ECC64448.2024.10590745)
- [Two-degree-of-freedom feedback loop factorization controller for oscillating plant with uncertain time delay and astatism using structured singular value (ICCAD 2024)](https://doi.org/10.1109/ICCAD60883.2024.10553929)
