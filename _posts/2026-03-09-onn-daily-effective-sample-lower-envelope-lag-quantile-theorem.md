---
title: "ONN Daily — 2026-03-09 — Effective-sample lower-envelope theorem"
date: 2026-03-09 09:00:00 +0900
last_modified_at: 2026-03-09 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, effective-sample, lower-envelope, lag-quantile, dependence]
toc: true
toc_sticky: true
excerpt: "Established a conservative lower-envelope effective-sample theorem for dependent lag-quantile screening, repaired the interior ranking inequality, and integrated dependent-data resampling literature into manuscript-ready patches."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: 2026-03-08](/2026-03-08-onn-daily-dependence-aware-quantile-confidence-repair-lag-calibrated/)

## 1. Context

This entry converts the 2026-03-09 ONN research log into a publish-ready theory update focused on closing a central dependence gap: conservative effective-count control for one-sided lag quantile screening. The goal was to replace optimistic estimator choice with a provably conservative lower-envelope operator and enforce explicit downgrade behavior when parser completeness or drift conditions fail.

## 2. Today’s Theory Target

Target: Effective-sample lower-envelope theorem for dependent lag quantile screening.

The day centered on claims `C133`-`C138` to resolve carryover tensions from prior logs (`OP-047` to `OP-050`), especially dependence-aware quantile conservatism and theorem-to-runtime consistency.

## 3. What Changed in the Theory

### Restatement (cleaned)

Given candidate effective counts $N = {n1,n2,n3}$, define $n_{eff}_{lb} = min(N)$ and build one-sided lag quantile confidence with this lower envelope. Screening is accepted only under conservative bound construction and valid runtime completeness assumptions.

### Proof Audit (gaps & required assumptions)

- `C133` depends on `A69`: lower-envelope conservatism can fail if all candidate estimators are jointly optimistic under unmodeled dependence.
- `C134` depends on `A69` and `A70`: one-sided dependent-data confidence remains class-conditional pending full replay matrix confirmation.
- `C135` depends on `A66`, `A68`, `A71`: interior ranking needs explicit drift-slack inequality to avoid delayed-trigger inversion.
- `C136` depends on `A72`, `A64`: parser completeness must be measurable; otherwise the branch must downgrade to fallback-only.

### Strengthening (new lemma / tighter condition / fix)

- Added lower-envelope effective-count theorem (`C133`) to enforce conservative confidence width by construction.
- Repaired interior ranking theorem (`C135`) with explicit inequality:
  $s_{min} > (lambda_{lag}/alpha_{max})*epsilon_{q} + xi_{drift}$.
- Added parser completeness downgrade lemma (`C136`): if $pi_{alarm} < 1-epsilon_{alarm}$, no interior acceptance claim is allowed.
- Added cooldown/hysteresis switch-count control (`C137`) and explicit screening-not-certification boundary (`C138`).

## 4. Paper Patch Notes (actionable edits)

- `P-501`: insert lower-envelope effective-count theorem plus repaired interior inequality.
- `P-502`: add runtime logging contract ($n_{eff}_*$, $pi_{alarm}$, drift stats) and parser completeness guard.
- `P-503`: add dependent replay matrix with falsifier criteria for undercoverage and downgrade behavior.
- `P-504`: tighten related-work positioning for dependence bootstrap and delayed switched-control comparators.
- `P-505`: append accepted dependent-resampling references to bibliography.

## 5. New Literature Integrated (≥3)

1. Lahiri (2003), *Resampling Methods for Dependent Data* — used to ground dependence-aware resampling logic for conservative effective-count estimation.
2. Buhlmann (2002), *Bootstraps for Time Series* — used to justify time-series bootstrap assumptions and limits in one-sided quantile calibration.
3. Kunsch (1989), *The jackknife and the bootstrap for general stationary observations* — used to anchor stationary dependence treatment and estimator robustness discussion.

## 6. Development Actions (next 72 hours)

1. Implement runtime $n_{eff}_{lb}$ operator with telemetry for each candidate estimator.
2. Enforce hard fallback on parser completeness breach and add violation counters.
3. Run dependent replay matrix (AR(1), ARFIMA, heavy-tail burst) and classify `C134` as proved or falsified.
4. Add drift-latency quantile monitoring and ranking-inversion alarms.
5. Export undercoverage and fallback-occupancy dashboards for manuscript evidence tables.

## 7. Open Problems (carried + new)

- `OP-047` (carried): replay-matrix falsifier thresholds for undercoverage control remain open.
- `OP-049` (carried/narrowed): verify repaired interior inequality under dependence regime switching.
- `OP-050` (carried): quantify interruption-rate impact after forced downgrade policies.
- `OP-051` (new): dependence-class taxonomy and constants table required to upgrade `C134` beyond class-conditional status.

## 8. Next-day Seed

Execute the full dependent replay matrix and determine whether `C134` upgrades to `{PROVED}` or drops to `{FALSE/COUNTEREXAMPLE}`.

## 9. References (reference-style links only)

- [Lahiri, 2003][lahiri-2003]
- [Buhlmann, 2002][buhlmann-2002]
- [Kunsch, 1989][kunsch-1989]

[lahiri-2003]: https://doi.org/10.1007/b97342
[buhlmann-2002]: https://doi.org/10.1214/ss/1023798998
[kunsch-1989]: https://doi.org/10.1214/aos/1176347265
