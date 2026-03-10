---
title: "ONN Daily — 2026-03-10 — Dependence-class selector inflation closure"
date: 2026-03-10 09:00:00 +0900
last_modified_at: 2026-03-10 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, dependence-class, finite-sample, quantile-conservatism, parser-gate]
toc: true
toc_sticky: true
excerpt: "Closed the dependence-class uncertainty bridge with finite-sample inflation and parser-CI gating, and integrated dependent-resampling literature into actionable paper patches."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: 2026-03-09](/2026-03-09-onn-daily-effective-sample-lower-envelope-lag-quantile-theorem/)

## 1. Context

This entry converts the 2026-03-10 ONN research log into a publish-ready update focused on making dependence-class uncertainty explicit in one-sided lag-quantile screening. The work targets a conservative bridge from theorem statements to runtime gating under class-switch and parser-drop risk.

## 2. Today’s Theory Target

Target: Dependence-class safe selector and finite-sample inflation closure for one-sided lag-quantile conservatism.

Primary claim set: `C139`-`C144`, with emphasis on closing carryover gaps from `OP-051` (class ambiguity) and parser-completeness calibration risk.

## 3. What Changed in the Theory

### Restatement (cleaned)

At each step `t`, select dependence class `k_t` conservatively, then inflate confidence margin by a class-selection uncertainty term:
`m_conf^safe = m_conf + zeta_cls`.
Screening acceptance is allowed only when parser completeness also passes a confidence-corrected gate:
`pi_alarm - epsilon_pi >= 1 - epsilon_alarm`.

### Proof Audit (gaps & required assumptions)

- `C139` still depends on safe class selection assumptions (`A73`, `A77`) and remains conditional under abrupt class transitions.
- `C140` requires `zeta_cls` to upper-bound selector error in finite samples (`A78`, `A69`).
- `C141` depends on reliable parser-drop observability (`A75`, `A79`) to avoid false-safe acceptance.
- `C142` is conservative only if class, drift, and parser guards are jointly enforced (`A70`, `A71`, `A73`, `A78`).

### Strengthening (new lemma / tighter condition / fix)

- Hardened finite-sample inflation closure (`C140`) by making `zeta_cls` an explicit uncertainty constant.
- Hardened parser estimation-error gate (`C141`) with confidence correction `epsilon_pi`.
- Added failure-propagation rule (`C143`): if selector safety assumptions break, downgrade conservatism claim immediately.
- Reasserted scope boundary (`C144`): screening conservatism only, not closed-loop certification.

## 4. Paper Patch Notes (actionable edits)

- `P-601`: insert class-selection uncertainty inflation theorem block (`C140`) and parser estimation-error gate (`C141`).
- `P-602`: insert runtime telemetry contract for `(k_t, n_eff^(k), zeta_cls, pi_alarm, epsilon_pi)`.
- `P-603`: insert joint falsifier matrix over class-switch, parser-drop, and drift-latency regimes.
- `P-604`: clarify related-work positioning and keep screening-vs-certification boundary explicit.
- `P-605`: append accepted dependence/bootstrap references to bibliography.

## 5. New Literature Integrated (≥3)

1. Lahiri (2003), *Resampling Methods for Dependent Data* — supports conservative dependence-aware margin design and replay calibration.
2. Buhlmann (2002), *Bootstraps for Time Series* — supports class-conditional bootstrap assumptions and finite-sample caveats.
3. Kunsch (1989), *The jackknife and the bootstrap for general stationary observations* — anchors stationary dependence handling in the class taxonomy.
4. Politis and Romano (1994), *The Stationary Bootstrap* — supports candidate calibration mechanism for `zeta_cls` under serial dependence.

## 6. Development Actions (next 72 hours)

1. Instrument `k_t` and class-wise `n_eff^(k)` telemetry in calibration logs.
2. Implement and persist `zeta_cls`; enforce `m_conf^safe` in the acceptance path.
3. Implement parser confidence envelope `epsilon_pi` and enforce corrected gate.
4. Run combined falsifier matrix (class-switch + parser-drop + drift-latency).
5. Produce finite-sample constants table for `zeta_cls` and downgrade thresholds.

## 7. Open Problems (carried + new)

- `OP-051` (updated): taxonomy now defined, but constants table and combined falsifier closure remain open.
- `OP-048` (updated): parser gate includes CI correction, but calibration evidence is incomplete.
- `OP-052` (new): finite-sample calibration of `zeta_cls` and `epsilon_pi` under joint class-switch/parser-drop.

## 8. Next-day Seed

Build the finite-sample constants table for `zeta_cls`/`epsilon_pi` and adjudicate `C142` with the combined falsifier matrix.

## 9. References (reference-style links only)

- [Lahiri, 2003][lahiri-2003]
- [Buhlmann, 2002][buhlmann-2002]
- [Kunsch, 1989][kunsch-1989]
- [Politis and Romano, 1994][politis-romano-1994]

[lahiri-2003]: https://doi.org/10.1007/b97342
[buhlmann-2002]: https://doi.org/10.1214/ss/1023798998
[kunsch-1989]: https://doi.org/10.1214/aos/1176347265
[politis-romano-1994]: https://doi.org/10.1080/01621459.1994.10476870
