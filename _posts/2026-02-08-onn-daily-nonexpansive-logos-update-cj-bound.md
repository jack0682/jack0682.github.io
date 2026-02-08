---
title: "ONN Daily - 2026-02-08 - Nonexpansive LOGOS Update cJ Contract"
date: 2026-02-08 09:00:00 +0900
last_modified_at: 2026-02-08 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, NonexpansiveMaps, DeepDelta, JacobianBound, DelayISS]
toc: true
toc_sticky: true
permalink: /2026-02-08-onn-daily-nonexpansive-logos-update-cj-bound/
excerpt: "Derived explicit nonexpansiveness conditions for the LOGOS semantic update and integrated four 2025 references to connect measurable cJ bounds with discrete-time delay robustness."
---

[ONN Daily Index](/onn-daily/)

## 1. Context
The current ONN-ORTSF coupling theorem requires a semantic-block gain bound, but the ONN update was still described algorithmically without a proof-ready nonexpansiveness condition. Today focused on turning the LOGOS update (projection + Deep Delta + clipping) into a verifiable operator bound that can be measured and inserted into the delay-small-gain argument.

## 2. Today's Theory Target
Formalize nonexpansiveness and averagedness conditions for the composed LOGOS update so the ONN semantic block has an explicit, measurable Jacobian bound `c_J` that plugs into the ORTSF delay theorem.

## 3. What Changed in the Theory
### Restatement (cleaned)
- Deep Delta step (TCCS Eq. 3): `x' = x + beta * (k^T(v-x)) * k`, with `k = g / ||g||`, `beta in [0,2]`.
- Training target map: `v(x) = x - alpha g(x)`.
- Composed semantic operator: `T_logos(x) = P_C(clip(T_delta(x)))` where `P_C` is projection onto feasible topology constraints.
- Coupling requirement for ONN-ORTSF: provide `||J_onn|| <= c_J` (or local Lipschitz bound) so semantic gain can be used inside delay-robust small-gain conditions.

### Proof Audit (gaps & required assumptions)
- Convex closed constraint set `C` must be explicit to use firm nonexpansiveness of projection.
- `g(x)` needs Lipschitz continuity and a lower active-region norm bound `||g(x)|| >= g_min > 0` so normalized direction `k(x)` remains bounded.
- Beta range is stated (`beta in [0,2]`) but fixed-`k` vs state-dependent `k(x)` cases were not separated.
- Clipping is treated as a code operation but should be stated as box projection with nonexpansive property.
- ONN-ORTSF theorem text needs an explicit bridge from Jacobian estimator output to the semantic gain constant used by the control proof.

### Strengthening (new lemma / tighter condition / fix)
- Fixed-`k` lemma: for `beta in [0,2]`, affine rank-1 map `(I - beta k k^T)` has spectral norm `<= 1`, so the Deep Delta step is nonexpansive.
- Composition result: clip and convex projection preserve nonexpansiveness; therefore the frozen-direction LOGOS step is nonexpansive.
- State-dependent correction: when `k(x)` and `v(x)` vary with `x`, add perturbation terms bounded by `L_g` and `g_min` to obtain a local `c_J` bound.
- Practical guard: the early-return branch for `||g|| < epsilon` is a theorem requirement, not only an implementation detail.

## 4. Paper Patch Notes (actionable edits)
- TCCS paper: add a lemma after Algorithm 1 proving nonexpansiveness for Deep Delta with `beta in [0,2]` and clarify assumptions for state-dependent `k(x)`.
- TCCS paper: add a remark that clipping is projection onto a box and thus nonexpansive.
- TCCS paper: elevate the `||g|| < epsilon` guard into the formal assumptions to avoid singular normalization.
- ONN-ORTSF paper: extend Theorem IV.8 assumptions with explicit semantic-gain condition `||J_onn|| <= c_J` and include a measurable estimator recipe.
- ONN-ORTSF paper: add a short discrete-time delay appendix mapping semantic gain to ISS/small-gain inequalities.

## 5. New Literature Integrated (>=3)
- Mo, Yu, Hou, Dasgupta (Automatica 2025): Razumikhin-type expISS small-gain for discrete-time delay systems; used to support sampled ORTSF extension.
- Li and Li (MCRF 2025/2026): exact delay-range characterization for discrete-time systems; used to tighten delay-margin validation protocol.
- Fang (Symmetry 2025): rank-one update with projection for constrained monotone systems; supports rank-1 + projection convergence framing.
- Unser, Goujon, Ducotterd (ACHA 2025): controlled nonexpansive pointwise nonlinearities; supports enforcing semantic Lipschitz constraints in practice.

## 6. Development Actions (next 72 hours)
- Draft and insert the fixed-`k` nonexpansiveness lemma in TCCS text with explicit assumptions list.
- Implement JVP power-iteration monitor to log iteration-wise `c_J` estimates in LOGOS runs.
- Add discrete-time Razumikhin ISS appendix skeleton to ONN-ORTSF and map constants to measured metrics.
- Run bounded jitter delay experiments and compare observed failure onset to derived inequalities.
- Add exact delay-range benchmark to calibrate ORTSF delay margin conservativeness.

## 7. Open Problems (carried + new)
- Carried: convert empirical Jacobian traces into a conservative but tight global `c_J` bound.
- Carried: finalize MIMO norm domain (`H_inf` vs `mu`) for ORTSF deployment claims.
- Carried: complete rigorous proof for full state-dependent composition (`k(x)`, `v(x)`) beyond frozen-direction approximation.
- New: formalize convexity conditions for contextual topology constraints used by `P_C`.
- New: quantify how `epsilon` guard frequency affects convergence and semantic fidelity.

## 8. Next-day Seed
Derive a numeric inequality for local `c_J` from `L_g`, `g_min`, `alpha`, and `beta`, then validate it against JVP-measured values on one ONN-v2 scenario.

## 9. References (reference-style links only)
- Mo, Yu, Hou, Dasgupta, "Razumikhin-type ISS Lyapunov function and small gain theorem for discrete time time-delay systems" [mo2025]
- Li and Li, "Exact delay range for the stability of discrete-time systems with applications in delay robust problems" [lili2026]
- Fang, "A Derivative-Free Method with the Symmetric Rank-One Update for Constrained Nonlinear Systems of Monotone Equations" [fang2025]
- Unser, Goujon, Ducotterd, "Controlled learning of pointwise nonlinearities in neural-network-like architectures" [unser2025]

[mo2025]: https://doi.org/10.1016/j.automatica.2025.112111
[lili2026]: https://doi.org/10.3934/mcrf.2025023
[fang2025]: https://doi.org/10.3390/sym17111956
[unser2025]: https://doi.org/10.1016/j.acha.2025.101764
