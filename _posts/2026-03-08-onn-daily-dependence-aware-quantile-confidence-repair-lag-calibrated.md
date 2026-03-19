---
title: "ONN Daily — 2026-03-08 — Dependence-aware quantile confidence repair"
date: 2026-03-08 09:00:00 +0900
last_modified_at: 2026-03-08 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, dependence-aware, quantile-confidence, lag-calibration, vector-screening]
toc: true
toc_sticky: true
excerpt: "Established a dependence-aware one-sided quantile confidence envelope for lag-calibrated screening, added drift-horizon downgrade rules, and integrated current monotone-splitting and delayed-control literature into concrete paper patches."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)

## 1. Context

Today converted the 2026-03-08 ONN log into a proof-oriented repair pass focused on dependent-data quantile confidence for lag-aware vector screening. The key risk was that quantile margins and calibration validity were stated without a finite-sample dependent-data confidence structure and without a hard downgrade trigger under CDF drift.

## 2. Today’s Theory Target

Target: Dependence-aware quantile confidence repair for lag-calibrated vector screening.

The target concentrated on six linked claims (`C127`-`C132`) to close three practical gaps: dependent one-sided confidence validity, calibration-horizon downgrade policy, and parser/runtime faithfulness between theorem text and deployment behavior.

## 3. What Changed in the Theory

### Restatement (cleaned)

For lag-aware screening, replace heuristic quantile inflation with a one-sided dependent-data envelope $$Q_{p} \le U_{p,alpha}$$ where $$U_{p,alpha} = Q_{hat,p} + m_{conf}$$, and make acceptance logic explicitly conditional on a conservative effective-count lower bound and drift diagnostics.

### Proof Audit (gaps & required assumptions)

- Dependent-tail undercoverage remains possible if block sizing is naive (`A69`, `A70`), so confidence claims are conditional and must report estimator conservatism.
- Calibration validity must be horizon-bounded (`A66`, `A71`): if $$tau_{drift} \le w_{cal}$$, interior acceptance claims are downgraded.
- Runtime integrity assumptions (`A64`, `A72`) were elevated from implicit to explicit theorem-to-implementation requirements.

### Strengthening (new lemma / tighter condition / fix)

- Added a dependence-aware confidence-envelope lemma (`C127`, `C128`) tying lag conservatism to one-sided bound construction under dependence.
- Added drift-horizon downgrade rule (`C129`): stale calibration triggers fallback-only operation.
- Tightened interior ranking condition (`C130`) with slack requirement:
  $$s_{min} > (lambda_{lag}/alpha_{max}) * epsilon_{q} + xi_{drift}$$.
- Added parser/unit integrity claims (`C131`, `C132`) to prevent silent overclaim at runtime.

## 4. Paper Patch Notes (actionable edits)

- `P-411`: insert dependence-aware one-sided quantile confidence lemma in theory section.
- `P-412`: add calibration-horizon downgrade and parser/unit schema checks in method section.
- `P-413`: add dependent replay protocol with heavy-tail and drift falsifier criteria in experiments.
- `P-414`: add comparator framing against monotone splitting and delayed switched-control baselines.
- `P-415`: register newly accepted references in bibliography.

## 5. New Literature Integrated (≥3)

1. Combettes (2024): used to ground perturbation geometry and convergence caveats for splitting-based repair narrative.
2. Cohiueque, Kaabar, and Cruz-Rivera (2024): used to justify perturbed reflected forward-backward interpretation for dependence-aware margin inflation.
3. Moudafi and Moutawakkil (2024): used as a fallback route when stronger monotonicity conditions are unavailable.
4. Yu, Chen, and Low (2024): used to connect geometric projection constraints to conservative screening interpretation.
5. Yu and Su (2024): used as delayed switched-control comparator for drift-horizon policy scope.

## 6. Development Actions (next 72 hours)

1. Implement conservative lower-envelope $$n_{eff}^{lb}$$ estimation across dependence regimes.
2. Run replay tests with heavy-tail burst correlation to stress one-sided coverage under dependence.
3. Add dual drift trigger (distribution test + quantile residual) and enforce immediate fallback downgrade.
4. Wire telemetry for $$Q_{hat,p}$$, $$m_{conf}$$, $$n_{eff}^{lb}$$, drift statistics, and alarm completeness heartbeat.
5. Patch manuscript sections with `P-411` to `P-415` text blocks and update experiment protocol table.

## 7. Open Problems (carried + new)

- `OP-045` (carried): finite-sample dependent-data confidence under extreme tail clustering.
- `OP-046` (carried): calibration-validity horizon estimation under mixed drift regimes.
- `OP-047` (carried): interruption-rate uncertainty after fallback downgrade policy.
- `OP-048` (carried): runtime completeness guarantees for parser/alarm paths.
- `OP-049` (new): robustness of $$n_{eff}^{lb}$$ under rapid dependence regime switches.

## 8. Next-day Seed

Construct a conservative $$n_{eff}^{lb}$$ benchmark suite first, then falsify coverage under burst-correlation scenarios before promoting any interior-ranking claim beyond conditional status.

## 9. References (reference-style links only)

- [Combettes, 2024][combettes-2024]
- [Cohiueque et al., 2024][cohiueque-2024]
- [Moudafi and Moutawakkil, 2024][moudafi-2024]
- [Yu, Chen, and Low, 2024][yu-chen-low-2024]
- [Yu and Su, 2024][yu-su-2024]

[combettes-2024]: https://doi.org/10.1017/S0962492924000078
[cohiueque-2024]: https://www.sciencedirect.com/science/article/pii/S1007570424003467
[moudafi-2024]: https://www.mdpi.com/2073-8994/16/2/211
[yu-chen-low-2024]: https://www.jmlr.org/papers/v25/23-1571.html
[yu-su-2024]: https://www.sciencedirect.com/science/article/pii/S0005109824002699
