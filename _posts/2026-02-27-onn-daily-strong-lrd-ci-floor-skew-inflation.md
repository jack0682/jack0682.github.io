---
title: ONN Daily — 2026-02-27 — Strong-LRD CI floor + skew-heavy-tail inflation cap
date: 2026-02-27 09:00:00 +0900
last_modified_at: 2026-02-27 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, lrd, ci-floor, skew-heavy-tail, inflation-cap]
toc: true
toc_sticky: true
excerpt: Repaired the dual-guard acceptance theorem with a conservative CI floor and capped skew-heavy-tail inflation policy, anchored by dependence-bootstrap literature for deployment-safe calibration.
---

[ONN Daily Index](/onn-daily/)  
[Previous: ONN Daily — 2026-02-26](/2026-02-26-onn-daily-dependence-aware-cross-noise-safety-gate/)

## Context

This post converts the 2026-02-27 ONN/ORTSF research log into a publish-ready record. The day focused on closing the strongest reviewer-risk gap by adding a conservative CI-floor rule for long-range dependence and a bounded skew-heavy-tail inflation cap to harden acceptance decisions.

## Today’s Theory Target

Target: Strong-LRD CI floor and skew-heavy-tail inflation cap for dual-guard acceptance.

Why this was high leverage today:
- Directly tackles active blockers OP-034/035 with deployable acceptance constraints.
- Tightens the previous dual-guard logic into a stricter and auditable three-part safety rule.
- Bridges daily calibration logs to theorem-level acceptance language used in the paper.

## What Changed in the Theory

### Restatement (cleaned)

Define the repaired acceptance tuple:
- inflation term: capped $$delta_{kappa}^{skew}$$ with upper bound $$bar_{delta,kappa}$$
- CP validity term: lower confidence bound $$LB_{cp}$$
- lag validity term: recalibration monitor $$chi_{lag}$$

Accept only when all constraints hold:
- $$mu_{diag} * (1 + min(delta_{kappa}^{skew}, bar_{delta,kappa})) < 1$$
- $$LB_{cp} \ge c_{CI,floor}$$
- $$chi_{lag} = 0$$

### Proof Audit (gaps & required assumptions)

Required assumptions surfaced today:
- conservative effective sample sizing (`A40`)
- dependence-bootstrap CI conservatism under LRD (`A46`)
- admissible skew-heavy-tail family filter and bounded inflation behavior (`A47`, `A41`)
- stale-calibration detection via TTL/lag policy (`A48`)

Primary remaining gaps:
- finite-sample lower-coverage guarantee near ARFIMA $$d ~ = 0.45$$ (C85 still experimental),
- robustness of cap behavior under broader skew-mixture families,
- explicit propagation bound from $$n_{eff}$$ error into $$LB_{cp}$$.

### Strengthening (new lemma / tighter condition / fix)

Strengthening applied:
- Replaced nominal CI pass/fail with a conservative CI-floor gate (`C84/C85` pathway).
- Replaced uncapped skew transfer (falsified by counterexample) with cap-and-alert policy (`C87`).
- Upgraded acceptance from dual guard to conjunctive triple guard (CI floor + inflation cap + lag monitor), proving stricter false-accept control under stated assumptions (`C89` conditional).

## Paper Patch Notes (actionable edits)

- `paper/sections/05_theory.typ`: insert CI-floor + inflation-cap theorem block and failure-propagation note (P-252, P-255).
- `paper/sections/06_experiments.typ`: add strong-LRD CI-floor protocol, lag-monitor ablation, and safety-branch metrics (P-253).
- `paper/sections/07_related_work.typ`: add dependence-robust inference conflict-positioning paragraph (P-254).

## New Literature Integrated (≥3)

1. Politis, Romano, and Wolf (1999), *Subsampling* (dependence-robust inference baseline). https://link.springer.com/book/10.1007/978-1-4612-1554-7
2. Lahiri (2003), *Resampling Methods for Dependent Data* (block/bootstrap assumptions under dependence). https://link.springer.com/book/10.1007/b97342
3. Bucher (2025), block-maxima bootstrap for dependent estimators (JRSS-B). https://doi.org/10.1093/jrsssb/qkaf060
4. Wegner and Wendler (2024), dependent-bootstrap CIs for change-point statistics. https://doi.org/10.1007/s00362-024-01621-5

## Development Actions (next 72 hours)

- Implement runtime CI-floor checks and hard rejection on floor breach.
- Integrate capped inflation estimator with alert thresholds and telemetry.
- Add TTL + lag watchdog and branch-hysteresis cooldown guard.
- Run ARFIMA high-dependence stress ($$d$$ up to 0.45) for finite-sample lower-coverage evidence.
- Execute dual-vs-triple guard ablation on FA/FR/chatter tradeoffs.
- Add topology-noise injection ablation to quantify guard sensitivity.

## Open Problems (carried + new)

Carried:
- OP-034: bounded skew-heavy-tail family characterization and exceedance policy.
- OP-035: CI-floor tightness vs conservativeness under strong dependence.
- OP-036: lag-monitor theorem and runtime watchdog validation.

New:
- OP-037: finite-sample CI-floor guarantee near ARFIMA high-dependence boundary ($$d ~ = 0.45$$).
- OP-038: branch-transition chatter bounds with TTL + hysteresis coupling.

## Next-day Seed

Prove or falsify C85 with finite-sample lower-coverage experiments at the ARFIMA high-dependence boundary, then calibrate a minimal safety margin indexed by $$d$$.

## References

- [Politis et al., 1999. *Subsampling*](https://link.springer.com/book/10.1007/978-1-4612-1554-7)
- [Lahiri, 2003. *Resampling Methods for Dependent Data*](https://link.springer.com/book/10.1007/b97342)
- [Bucher, 2025. *Bootstrapping estimators based on the block maxima method*](https://doi.org/10.1093/jrsssb/qkaf060)
- [Wegner and Wendler, 2024. *Dependent bootstrap confidence intervals for change-point statistics*](https://doi.org/10.1007/s00362-024-01621-5)
