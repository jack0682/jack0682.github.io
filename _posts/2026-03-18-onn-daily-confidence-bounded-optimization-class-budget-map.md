---
title: "ONN Daily — 2026-03-18 — Confidence-Bounded Optimization of Class Budget Map"
date: 2026-03-18 09:00:00 +0900
last_modified_at: 2026-03-18 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, confidence-bounded, budget-optimization, class-budget-map, finite-sample-safety]
toc: true
toc_sticky: true
excerpt: "Formalized a confidence-bounded objective for class-conditioned budget selection, tightened feasible-set safety constraints, and integrated robust/scenario-risk literature into executable manuscript patches."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily — 2026-03-17 — Budget-Calibrated Adaptive Threshold with Asynchronous Version Safety](/2026-03-17-onn-daily-budget-calibrated-adaptive-threshold-async-safety/)

## 1. Context

This entry converts the 2026-03-18 ONN research log into a publish-ready post centered on finite-sample, confidence-bounded optimization of class-conditioned interruption budgets $B_{safe}(k)$.

## 2. Today’s Theory Target

Target: **Confidence-Bounded Optimization of Class Budget Map $B_{safe}(k)$**.

Primary claim focus: `C181`-`C186`, with direct closure of the prior carryover contradiction on missing finite-sample optimization criteria.

## 3. What Changed in the Theory

### Restatement (cleaned)

For each dependence class $k$, define:

$$
u_{k}^{U}(B) = u_{k}(B) + r_{k}(n_{eff,lb}, delta)
$$

$$
J_{k}(B) = w_{u} * u_{k}^{U}(B) + w_{i} * i_{k}(B) + w_{f} * f_{k}(B), w_{u} >> w_{i} \ge 0, w_{f} \ge 0
$$

Select
$$
B_{k}^{*} \in argmin_{B} J_{k}(B)
$$
subject to:
- $u_{k}^{U}(B) \le u_{tol},k$
- $rho_{k}(B) \ge rho_{min}$
- $M_{async}(B) = 1$ on accepted cells

If no feasible candidate exists, class $k$ is downgraded to fallback-only.

### Proof Audit (gaps & required assumptions)

- `C181`-`C183` and `C186` are now defended under explicit assumptions (`A95`-`A99`) with safety-priority objective ordering and hard feasibility gates.
- `C184` remains `{PLAUSIBLE}` because conservative confidence radii can empty feasible sets in sparse/high-risk classes.
- `C185` remains `{CONJECTURE}` due to unresolved transfer under unseen topology-delay coupling (`L-185a`).
- Main fragile assumptions are confidence-radius validity under dependence (`A98`) and weighting-policy correctness (`A99`).

### Strengthening (new lemma / tighter condition / fix)

- Added a finite-sample confidence penalty term directly inside the optimization objective.
- Added strict frontier-density gating ($rho_{k} \ge rho_{min}$) so sparse classes cannot be promoted by optimistic point estimates.
- Enforced conjunction closure with asynchronous hard-veto logic so optimization cannot bypass runtime safety predicates.
- Added executable acceptance tests for feasible-set emptiness, weight-audit dominance, and async-veto preemption.

## 4. Paper Patch Notes (actionable edits)

- `P-651`: Extend method telemetry to include $J_{k}$, $u_{k}^{U}$, $rho_{k}$, and feasible-set status.
- `P-652`: Add CBBO proposition and downgrade rule when feasible set is empty.
- `P-653`: Add matched-budget replay falsifier matrix and acceptance criteria.
- `P-654`: Add related-work boundary paragraph on risk-aware calibration and screening/certification non-equivalence.
- `P-655`: Add accepted scenario/robust-risk references to bibliography bridge.

## 5. New Literature Integrated (≥3)

1. Rockafellar and Uryasev (2000) for risk-penalized optimization structure.
2. Calafiore and Campi (2006) for scenario-style feasibility interpretation.
3. Nemirovski and Shapiro (2006) for conservative chance-constraint approximations.
4. Artzner et al. (1999) for coherent risk rationale behind safety-weighted objective design.

## 6. Development Actions (next 72 hours)

1. Run matched-budget replay cube over $(k, d_{sup}, n_{eff,lb}, tau_{mis}, lag_{skew})$ comparing fixed, adaptive, and CBBO+async-veto.
2. Stress-test sparse-frontier classes to estimate how often feasible sets become empty under conservative $r_{k}$.
3. Validate $w_{u}$ policy floor with failure-injection scenarios that attempt interruption-favoring unsafe optima.
4. Add runtime alarms when confidence-adjusted unsafe bound approaches tolerance edge.
5. Draft transfer-stress protocol for `L-185a` to upgrade `C185` from conjecture status.

## 7. Open Problems (carried + new)

- Carried: `OP-045`-`OP-050`, `OP-052`-`OP-054`, `OP-056`, `OP-057`.
- `OP-058` now reduced from objective-definition gap to empirical stress-validation gap.
- New blocker: `L-185a` transfer-error bound under topology-delay coupling with novelty bursts.

## 8. Next-day Seed

Prove or falsify a conservative transfer bound for $B_{k}^{*}$ under novelty-conditioned topology-delay coupling while preserving $u_{k}^{U}$ safety caps.

## 9. References (reference-style links only)

- [Artzner et al., 1999][artzner-1999]
- [Rockafellar and Uryasev, 2000][rockafellar-uryasev-2000]
- [Calafiore and Campi, 2006][calafiore-campi-2006]
- [Nemirovski and Shapiro, 2006][nemirovski-shapiro-2006]

[artzner-1999]: https://doi.org/10.1111/1467-9965.00068
[rockafellar-uryasev-2000]: https://doi.org/10.21314/JOR.2000.038
[calafiore-campi-2006]: https://doi.org/10.1109/TAC.2006.875041
[nemirovski-shapiro-2006]: https://doi.org/10.1137/050622328
