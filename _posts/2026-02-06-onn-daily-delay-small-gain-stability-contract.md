---
title: "ONN Daily - 2026-02-06 - Delay-Small-Gain Stability Contract"
date: 2026-02-06 09:00:00 +0900
last_modified_at: 2026-02-06 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, DelayRobustness, SmallGain, JacobianStability, DeepDelta]
toc: true
toc_sticky: true
permalink: /2026-02-06-onn-daily-delay-small-gain-stability-contract/
excerpt: "Formalized a measurable ONN-ORTSF coupled stability contract by tying delay-margin assumptions to Jacobian bounds and integrating four new 2024-2025 references."
---

[ONN Daily Index](/onn-daily/)

## 1. Context
Today focused on closing the deployment gap between theorem-level ORTSF delay robustness and measurable ONN-v2 training dynamics. The target was to replace assumption-light control claims with a contract that can be checked from runtime metrics and ablation statistics.

## 2. Today's Theory Target
Unify the ORTSF delay-small-gain theorem with ONN-v2 rank-1 Deep Delta update stability into one implementation-checkable stability contract.

## 3. What Changed in the Theory
### Restatement (cleaned)
- Optimization block: `x_{k+1} = T_onn(x_k)` with `T_onn = P_C o (I - eta grad F) + D_delta`.
- Deep Delta local linearization: `J_delta = I + beta k k^T`, `||k||=1`, `beta in [0,2]`.
- Control loop: `L(s)=C(s)G(s)e^{-s Delta t}` with `Delta t = T_s + tau_compute + tau_comm`.
- Coupling intent: ONN semantic update perturbation must remain contractive enough to preserve ORTSF delay-robust closed-loop behavior.

### Proof Audit (gaps & required assumptions)
- Internal stability and properness of `C(s)G(s)` are required but not explicit in the current theorem statement.
- The norm domain (`H_inf`, `mu`, induced norm) is not fixed for SISO/MIMO interpretation.
- A bounded ONN Jacobian term (`||J_onn|| <= c_J`) is required to map semantic perturbation into control perturbation.
- Discrete-time realization of the delay theorem is missing for sampled deployment.
- Constraint qualification and exact-penalty consistency need an explicit mapping to ONN-v2 loss components.

### Strengthening (new lemma / tighter condition / fix)
- Proposed coupled condition: if `Delta t < phi_m / omega_c` and `||J_onn|| <= c_J < 1/alpha_u`, then cascade semantic-control loop is ISS under bounded delay and projection error.
- Small-gain composition target: `c_J * alpha_u * ||G_cl|| < 1`.
- Failure mode added: disabling DDL can increase `lambda_max(J)` and break local contraction despite nominal delay margin.
- Runtime guard added: estimate `lambda_max(J_onn)` proxy and adapt `beta`, `eta`, and controller profile as delay budget tightens.

## 4. Paper Patch Notes (actionable edits)
- ONN-ORTSF paper: rewrite Theorem IV.8 assumptions to include internal stability, properness, norm domain, and explicit `Delta t_max = phi_m/omega_c`.
- ONN-ORTSF paper: add a lemma after IV.8 defining semantic Jacobian-gain coupling (`||J_onn|| <= c_J`).
- ONN-v2 paper: add a proposition linking rank-1 Deep Delta plus clipping to nonexpansiveness conditions.
- ONN-v2 paper: add a delay-noise ablation column and map Jacobian evidence to ORTSF coupling constants.

## 5. New Literature Integrated (>=3)
- Verma et al. (ICML 2024): persistence modules for graph-topology-aware learning, used as a stronger alternative to static PH summaries.
- Katz et al. (Automatica 2024): constructive averaging-based delay stability certificates, added as computable support for delayed loop design.
- Wei and Wei (Mathematics 2025): PTL survey framing spectral-topological operator choices for ONN regularization.
- Xin et al. (arXiv 2025): topology-invariant graph learning for OOD robustness, mapped to ONN auxiliary invariance objectives.

## 6. Development Actions (next 72 hours)
- Formalize cascade ISS theorem with measurable constants table (`phi_m`, `omega_c`, `c_J`, `alpha_u`).
- Implement Jacobian monitor with JVP power-iteration proxy and thresholded adaptation for `beta` and `eta`.
- Run latency injection sweep with jitter to compare observed instability onset against predicted delay bound.
- Add persistence-module/PTL ablations under OOD constraint-graph shifts.

## 7. Open Problems (carried + new)
- Carried: derive a rigorous conversion from ONN-v2 Jacobian statistics to a usable `c_J` bound.
- Carried: define a reproducible MIMO-ready ORTSF stability procedure (`H_inf` vs `mu`).
- Carried: prove nonexpansiveness for projection + Deep Delta + clipping composition.
- New: extend coupled theorem to stochastic delay (`Delta t_k`) with mean-square guarantees.
- New: validate whether online Jacobian gating preserves accuracy while enforcing contraction.

## 8. Next-day Seed
Instantiate one numeric coupled-stability inequality by measuring `phi_m`, `omega_c`, runtime delay decomposition, and `lambda_max(J_onn)` on one ONN-v2 scenario.

## 9. References (reference-style links only)
- Verma et al., "Topological Neural Networks go Persistent" [ICML 2024][verma2024]
- Katz et al., "A constructive method for averaging-based stability analysis and design of systems with time delays" [Automatica 2024][katz2024]
- Wei and Wei, "Persistent Topological Laplacians for Mathematical Deep Learning: A Survey" [Mathematics 2025][wei2025]
- Xin et al., "TopInG: Topological Invariant Graph Structure Learning for Out-of-Distribution Generalization" [arXiv 2025][xin2025]

[verma2024]: https://proceedings.mlr.press/v235/verma24a.html
[katz2024]: https://doi.org/10.1016/j.automatica.2024.111576
[wei2025]: https://www.mdpi.com/2227-7390/13/2/242
[xin2025]: https://arxiv.org/abs/2502.01282
