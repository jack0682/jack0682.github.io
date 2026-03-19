---
title: "ONN Daily — 2026-03-17 — Budget-calibrated adaptive threshold with async version safety"
date: 2026-03-17 09:00:00 +0900
last_modified_at: 2026-03-17 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, budget-calibration, adaptive-threshold, async-safety, version-consistency]
toc: true
toc_sticky: true
excerpt: "Established a monotone budget-to-threshold map with asynchronous hard-veto safety and integrated dependence-aware conformal and delay-systems literature to tighten claim boundaries."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily — 2026-03-16 — Adaptive Sparse-Support Threshold with Safety-Budget Coupling](/2026-03-16-onn-daily-adaptive-sparse-support-threshold-safety-budget/)

## 1. Context

This entry converts the 2026-03-17 ONN log into a publish-ready post focused on coupling class-conditioned safety budgets to adaptive thresholds while preventing asynchronous version mismatches from leaking into promotion decisions.

## 2. Today’s Theory Target

Target: **Budget-Calibrated Adaptive Threshold with Asynchronous Version Safety**.

Primary claim set: `C175`-`C180`, with emphasis on closing carryover contradictions around stale-version dispatch and making $B_{safe}(k)$ calibration operational.

## 3. What Changed in the Theory

### Restatement (cleaned)

Promotion now uses an async-safe predicate:
$Pi_{promote,async} = M_{mono} * M_{dom} * M_{sparse,adp} * M_{holdout} * M_{async}$.

$M_{async}$ is a hard veto bit requiring both bounded mismatch duration and exact version agreement:
$M_{async} = 1[tau_{mis} \le tau_{mis,max}(k)] * 1[threshold_{version} = class_{version}]$.

The adaptive sparse threshold remains class-conditioned through
$n_{cell,min,safe}(k, d_{sup}, n_{eff,lb}) = ceil(n0 + alpha_{k}*d_{sup} + beta_{k}/max(1,n_{eff,lb}))$,
with $(alpha_{k}, beta_{k})$ induced by a monotone map from $B_{safe}(k)$.

### Proof Audit (gaps & required assumptions)

- `C175` (budget monotonicity) requires identifiable and order-preserving class calibration (`A94`, `A92`).
- `C176` (async veto invariant) requires atomic predicate transaction semantics (`A90`, `A91`).
- `C177` (bounded mismatch sufficiency) requires trustworthy mismatch telemetry and monotone clocks (`A95`, `A96`).
- `C178` remains `{PLAUSIBLE}` due to sparse frontier density in high-risk classes.
- `C179` remains `{CONJECTURE}` due to unresolved transfer under coupled topology-delay drift (`L-179a`).
- `C180` holds by explicit screening-vs-certification scope separation.

### Strengthening (new lemma / tighter condition / fix)

- Added a constructive isotonic calibration interface $B_{safe}(k) -> (alpha_{k}, beta_{k})$ to enforce conservative class ordering.
- Added asynchronous hard-veto closure: $M_{async} = 0 = > Pi_{promote,async} = 0$.
- Added transaction-ID and mismatch-duration telemetry requirements to block stale cache acceptance paths.
- Tightened manuscript boundary language to avoid implying closed-loop stability certification.

## 4. Paper Patch Notes (actionable edits)

- `P-641`: Extend telemetry contract with $tau_{mis}$, $threshold_{version}$, $class_{version}$, and transaction IDs.
- `P-642`: Add formal proposition for budget-monotone mapping and async hard-veto invariant.
- `P-643`: Add replay protocol comparing fixed vs adaptive vs adaptive+async-veto under matched budgets.
- `P-644`: Add related-work boundary paragraph on screening vs certification in delayed/asynchronous settings.
- `P-645`: Integrate accepted references into manuscript bibliography and theorem-scope discussion.

## 5. New Literature Integrated (≥3)

1. Barber et al. (2023) to justify non-exchangeable caution for replay-calibrated validity claims.
2. Gibbs and Candès (2021) as adaptive conformal baseline for class-conditioned budget adaptation.
3. Seuret and Gouaisbaut (2013) for less conservative delay-system bounding ideas around mismatch constraints.
4. Richard (2003) to reinforce open-problem framing and anti-overclaim boundary language.

## 6. Development Actions (next 72 hours)

1. Implement transaction-ID-coupled predicate evaluation and log schema checks.
2. Fit and validate isotonic $B_{safe}(k) -> (alpha_{k}, beta_{k})$ with per-class confidence reporting.
3. Run stress replay over $(k, d_{sup}, n_{eff,lb}, tau_{mis})$ for fixed/adaptive/async-veto comparators.
4. Add stale-version forced-fallback regression tests and mismatch alarm diagnostics.
5. Quantify frontier-density adequacy criterion required to upgrade `C178` toward proof status.

## 7. Open Problems (carried + new)

- `OP-045` to `OP-050` (carried): dependence and falsifier calibration backlog.
- `OP-052` to `OP-054` (carried): finite-sample calibration and support-proxy reliability concerns.
- `OP-056` (updated): adaptive threshold now formalized, still needs multi-regime stress evidence.
- `OP-057` (updated): reduced to runtime validation of async mismatch hard-veto under realistic lag bursts.
- `OP-058` (new): derive finite-sample optimization criterion for $B_{safe}(k)$ with confidence bounds.
- `L-179a` (new lemma blocker): transfer condition under unseen topology-delay coupling.

## 8. Next-day Seed

Derive and test a finite-sample optimization objective for $B_{safe}(k)$ that can promote `C178` from plausible calibration to defensible theorem-level evidence.

## 9. References (reference-style links only)

- [Barber et al., 2023][barber-2023]
- [Gibbs and Candès, 2021][gibbs-candes-2021]
- [Seuret and Gouaisbaut, 2013][seuret-gouaisbaut-2013]
- [Richard, 2003][richard-2003]

[barber-2023]: https://doi.org/10.1214/23-AOS2276
[gibbs-candes-2021]: https://proceedings.neurips.cc/paper/2021/hash/0d441de75945e5acbc865406fc9a2559-Abstract.html
[seuret-gouaisbaut-2013]: https://doi.org/10.1016/j.automatica.2013.05.030
[richard-2003]: https://doi.org/10.1016/S0005-1098(03)00167-5
