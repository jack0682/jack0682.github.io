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
- Optimization block: $$x_{k+1} = T_{onn}(x_{k})$$ with $$T_{onn} = P_{C} o (I - eta grad F) + D_{delta}$$.
- Deep Delta local linearization: $$J_{delta} = I + beta k k^{T}$$, $$||k|| = 1$$, $$beta \in [0,2]$$.
- Control loop: $$L(s) = C(s)G(s)e^{-s Delta t}$$ with $$Delta t = T_{s} + tau_{compute} + tau_{comm}$$.
- Coupling intent: ONN semantic update perturbation must remain contractive enough to preserve ORTSF delay-robust closed-loop behavior.

### Proof Audit (gaps & required assumptions)
- Internal stability and properness of $$C(s)G(s)$$ are required but not explicit in the current theorem statement.
- The norm domain ($$H_{inf}$$, $$mu$$, induced norm) is not fixed for SISO/MIMO interpretation.
- A bounded ONN Jacobian term ($$||J_{onn}|| \le c_{J}$$) is required to map semantic perturbation into control perturbation.
- Discrete-time realization of the delay theorem is missing for sampled deployment.
- Constraint qualification and exact-penalty consistency need an explicit mapping to ONN-v2 loss components.

### Strengthening (new lemma / tighter condition / fix)
- Proposed coupled condition: if $$Delta t < phi_{m} / omega_{c}$$ and $$||J_{onn}|| \le c_{J} < 1/alpha_{u}$$, then cascade semantic-control loop is ISS under bounded delay and projection error.
- Small-gain composition target: $$c_{J} * alpha_{u} * ||G_{cl}|| < 1$$.
- Failure mode added: disabling DDL can increase $$lambda_{max}(J)$$ and break local contraction despite nominal delay margin.
- Runtime guard added: estimate $$lambda_{max}(J_{onn})$$ proxy and adapt $$beta$$, $$eta$$, and controller profile as delay budget tightens.

## 4. Paper Patch Notes (actionable edits)
- ONN-ORTSF paper: rewrite Theorem IV.8 assumptions to include internal stability, properness, norm domain, and explicit $$Delta t_{max} = phi_{m}/omega_{c}$$.
- ONN-ORTSF paper: add a lemma after IV.8 defining semantic Jacobian-gain coupling ($$||J_{onn}|| \le c_{J}$$).
- ONN-v2 paper: add a proposition linking rank-1 Deep Delta plus clipping to nonexpansiveness conditions.
- ONN-v2 paper: add a delay-noise ablation column and map Jacobian evidence to ORTSF coupling constants.

## 5. New Literature Integrated (>=3)
- Verma et al. (ICML 2024): persistence modules for graph-topology-aware learning, used as a stronger alternative to static PH summaries.
- Katz et al. (Automatica 2024): constructive averaging-based delay stability certificates, added as computable support for delayed loop design.
- Wei and Wei (Mathematics 2025): PTL survey framing spectral-topological operator choices for ONN regularization.
- Xin et al. (arXiv 2025): topology-invariant graph learning for OOD robustness, mapped to ONN auxiliary invariance objectives.

## 6. Development Actions (next 72 hours)
- Formalize cascade ISS theorem with measurable constants table ($$phi_{m}$$, $$omega_{c}$$, $$c_{J}$$, $$alpha_{u}$$).
- Implement Jacobian monitor with JVP power-iteration proxy and thresholded adaptation for $$beta$$ and $$eta$$.
- Run latency injection sweep with jitter to compare observed instability onset against predicted delay bound.
- Add persistence-module/PTL ablations under OOD constraint-graph shifts.

## 7. Open Problems (carried + new)
- Carried: derive a rigorous conversion from ONN-v2 Jacobian statistics to a usable $$c_{J}$$ bound.
- Carried: define a reproducible MIMO-ready ORTSF stability procedure ($$H_{inf}$$ vs $$mu$$).
- Carried: prove nonexpansiveness for projection + Deep Delta + clipping composition.
- New: extend coupled theorem to stochastic delay ($$Delta t_{k}$$) with mean-square guarantees.
- New: validate whether online Jacobian gating preserves accuracy while enforcing contraction.

## 8. Next-day Seed
Instantiate one numeric coupled-stability inequality by measuring $$phi_{m}$$, $$omega_{c}$$, runtime delay decomposition, and $$lambda_{max}(J_{onn})$$ on one ONN-v2 scenario.

## 9. References (reference-style links only)
- Verma et al., "Topological Neural Networks go Persistent" [ICML 2024][verma2024]
- Katz et al., "A constructive method for averaging-based stability analysis and design of systems with time delays" [Automatica 2024][katz2024]
- Wei and Wei, "Persistent Topological Laplacians for Mathematical Deep Learning: A Survey" [Mathematics 2025][wei2025]
- Xin et al., "TopInG: Topological Invariant Graph Structure Learning for Out-of-Distribution Generalization" [arXiv 2025][xin2025]

[verma2024]: https://proceedings.mlr.press/v235/verma24a.html
[katz2024]: https://doi.org/10.1016/j.automatica.2024.111576
[wei2025]: https://www.mdpi.com/2227-7390/13/2/242
[xin2025]: https://arxiv.org/abs/2502.01282
