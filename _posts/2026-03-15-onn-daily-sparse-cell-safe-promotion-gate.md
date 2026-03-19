---
title: "ONN Daily — 2026-03-15 — Sparse-cell safe promotion gate"
date: 2026-03-15 09:00:00 +0900
last_modified_at: 2026-03-15 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, sparse-cell, promotion-gate, dominance-calibrated, extrapolation]
toc: true
toc_sticky: true
excerpt: "Formalized a sparse-cell veto promotion predicate for dominance-calibrated extrapolation claims and integrated operator/topology/ISS literature to tighten screening-to-paper traceability."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)

## 1. Context

This entry converts the 2026-03-15 ONN research log into a publish-ready update focused on preventing false promotion of extrapolative claims under sparse replay support. The day’s contribution is a deterministic promotion contract that binds theorem language to runtime guard ordering and holdout falsifiers.

## 2. Today’s Theory Target

Target: Sparse-Cell Safe Promotion Gate for dominance-calibrated extrapolation claims.

Primary claim set: `C163`-`C168`, with explicit closure attempts for carryover contradiction `C159` and open problem `OP-055` (no-false-promotion under sparse support).

## 3. What Changed in the Theory

### Restatement (cleaned)

A claim in the `C159` class can be promoted only when all four checks pass:
$M_{mono} = 1$, $M_{dom} = 1$, $M_{sparse} = 1$, $M_{holdout} = 1$.
The promotion predicate is
$Pi_{promote} = M_{mono} * M_{dom} * M_{sparse} * M_{holdout}$.

### Proof Audit (gaps & required assumptions)

- `C163` depends on replay-identifiable telemetry versions and atomic evaluation ordering (`A87`, `A88`, `A90`).
- `C164` requires conservative support counting in dependent data (`A69`, `A87`).
- `C165` requires strict dominance precedence; any race can invalidate acceptance (`A86`, `A90`).
- `C166` depends on holdout representativeness and split integrity (`A88`, `A89`).
- `C167` remains bounded to local support and does not imply global nonstationary sufficiency (`A84`, `A85`, `A89`).

### Strengthening (new lemma / tighter condition / fix)

- Added sparse-cell hard veto: if any evaluated cell has $n_{cell} < n_{cell,min}$, promotion is invalid (`C164`).
- Enforced dominance precedence: if $Phi_{dom} > 0$, accept-state is forbidden regardless of other checks (`C165`).
- Added holdout falsifier rule: any holdout cell with $u_{cov} > u_{tol}$ forces $Pi_{promote} = 0$ (`C166`).
- Kept explicit scope boundary: predicate success is screening evidence, not closed-loop robustness certification (`C168`).

## 4. Paper Patch Notes (actionable edits)

- `P-631`: add promotion telemetry contract and deterministic guard order in method section.
- `P-632`: add formal promotion predicate theorem and sparse no-promotion corollary in theory section.
- `P-633`: add sparse-cell plus holdout falsifier matrix protocol in experiments section.
- `P-634`: reinforce screening-vs-certification boundary in related-work section.
- `P-635`: update bibliography bridge for operator-theory, IQC, and topology-stability anchors.

## 5. New Literature Integrated (≥3)

1. Bauschke and Combettes (2017) for monotone operator foundations supporting predicate-route rigor.
2. Megretski and Rantzer (1997) for IQC framing of what stronger compositional certificates would require.
3. Cohen-Steiner, Edelsbrunner, and Harer (2007) for persistence-diagram stability under perturbations.
4. Sontag (2008) for ISS boundary conditions clarifying why current claims remain screening-level.

## 6. Development Actions (next 72 hours)

1. Instrument atomic evaluation ordering and persist telemetry version IDs for promotion checks.
2. Run sparse-cell ablation matrix with deterministic split manifests across low-support regimes.
3. Add automated holdout veto tests for $u_{cov} > u_{tol}$ falsification paths.
4. Quantify estimator uncertainty for $u_{cov}$ and $d_{sup}$ under dependence shifts.
5. Draft minimal theorem extension plan for `L-167a` with explicit experiment prerequisites.

## 7. Open Problems (carried + new)

- `OP-055` (carried): no-false-promotion condition now formalized, but needs repeated holdout stress evidence.
- `OP-048` (carried): parser/telemetry race resilience still requires fault-injection validation.
- `OP-052` (carried): finite-sample calibration of sparse-support thresholds remains unresolved.
- `OP-056` (new): derive conservative uncertainty envelope for $u_{cov}$ estimation under dependent replay.

## 8. Next-day Seed

Close `L-167a` feasibility by running the sparse-cell falsifier matrix with dependence-stratified holdout slices and publishing downgrade thresholds tied to observed veto frequency.

## 9. References (reference-style links only)

- [Bauschke and Combettes, 2017][bauschke-combettes-2017]
- [Megretski and Rantzer, 1997][megretski-rantzer-1997]
- [Cohen-Steiner et al., 2007][cohen-steiner-2007]
- [Sontag, 2008][sontag-2008]

[bauschke-combettes-2017]: https://doi.org/10.1007/978-3-319-48311-5
[megretski-rantzer-1997]: https://doi.org/10.1109/9.587335
[cohen-steiner-2007]: https://doi.org/10.1007/s00454-006-1276-5
[sontag-2008]: https://doi.org/10.1007/978-3-540-77653-6_3
