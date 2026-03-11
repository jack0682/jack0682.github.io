---
title: "ONN Daily — 2026-03-11 — Tri-Guard finite-sample closure"
date: 2026-03-11 09:00:00 +0900
last_modified_at: 2026-03-11 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, tri-guard, class-switch, parser-ci, drift-latency]
toc: true
toc_sticky: true
excerpt: "Formalized a tri-guard finite-sample screening closure linking class uncertainty, parser confidence correction, and drift-latency gating with explicit failure propagation."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: 2026-03-10](/2026-03-10-onn-daily-dependence-class-selector-inflation-closure/)

## 1. Context

This entry converts the 2026-03-11 ONN/ORTSF daily log into a publish-ready post focused on closing joint uncertainty across dependence-class switching, parser confidence intervals, and drift-latency coupling. The goal is an auditable screening-layer closure with explicit downgrade semantics.

## 2. Today’s Theory Target

Target: Tri-Guard Finite-Sample Closure (`C145`–`C150`).

Rationale: the previous unresolved status on `C142` required a joint guard with finite-sample constants and reproducible acceptance criteria tied directly to runtime telemetry.

## 3. What Changed in the Theory

### Restatement (cleaned)

Define a tri-guard condition over parser, drift, and class residual terms:

\[
\Phi_{\text{tri}} = \max\left(
\epsilon_{\text{alarm}} - (1 - (\pi_{\text{alarm}} - \epsilon_{\pi})),
\tau_{\text{drift}}^{0.95} - w_{\text{cal}},
\Delta_{\text{cov}}(\zeta_{\text{cls}})
\right).
\]

If `Phi_tri <= 0`, then safe margin `m_conf^safe = m_conf + zeta_cls` preserves screening conservatism over calibrated replay cells.

### Proof Audit (gaps & required assumptions)

- `C145` remains sufficient (not necessary) and depends on `A80`–`A83` for coupled perturbation validity.
- `C146` requires finite-sample calibration where `zeta_cls` upper-bounds class-selection optimism (`A78`, `A69`).
- `C147` requires parser observability assumptions (`A75`, `A79`) so CI correction reflects true burst-drop behavior.
- `C148` relies on enforceable runtime guard `tau_drift^0.95 <= w_cal` (`A71`, `A83`).
- Extrapolation outside calibration support is still open and isolated as `L-145a` (`{NEEDS-EXPERIMENT}`).

### Strengthening (new lemma / tighter condition / fix)

- Introduced composable chain `C146/C147/C148 -> C149` with immediate failure propagation to fallback.
- Upgraded parser gate to CI-corrected inequality `pi_alarm - epsilon_pi >= 1 - epsilon_alarm`.
- Added explicit drift-latency quantile guard for stale-calibration prevention.
- Clarified `C150` scope boundary: screening-layer guarantee only, not controller-level robustness certification.

## 4. Paper Patch Notes (actionable edits)

- `P-611`: insert tri-guard sufficient condition theorem (`C145`–`C149`).
- `P-612`: add finite-sample constants telemetry tuple in method section.
- `P-613`: add tri-axis falsifier matrix and acceptance criterion in experiments.
- `P-614`: tighten related-work positioning against certification framing.
- `P-615`: update bibliography bridge note (`refs.bib` already contains accepted core references).

## 5. New Literature Integrated (≥3)

1. Lahiri (2003), *Resampling Methods for Dependent Data* — dependence-aware calibration foundations.
2. Buhlmann (2002), *Bootstraps for Time Series* — finite-sample time-series bootstrap caveats and practice.
3. Kunsch (1989), *The jackknife and the bootstrap for general stationary observations* — stationary dependence calibration basis.
4. Politis and Romano (1994), *The Stationary Bootstrap* — practical route for class-conditioned `zeta_cls` calibration.

## 6. Development Actions (next 72 hours)

1. Implement tri-axis replay-cell generator (class-switch, parser-drop, drift-latency).
2. Serialize calibration constants table for `zeta_cls`, `epsilon_pi`, and `tau_drift^0.95`.
3. Add monotonicity/invariant checks for tri-guard runtime conditions.
4. Integrate parser burst-loss and class-boundary adversarial harnesses.
5. Produce safety-vs-interruption Pareto report with downgrade traceability.

## 7. Open Problems (carried + new)

- `UPDATED OP-052`: validate calibration stability under unseen dependence regimes.
- `NEW OP-053`: prove or falsify extrapolation guard (`L-145a`) for out-of-support shifts.
- `RESOLVED OP-051`: dependence-class taxonomy and constants-table schema now specified.

## 8. Next-day Seed

Prove or falsify `L-145a` using out-of-support regime-shift replays and derive a conservative extrapolation inflation rule.

## 9. References (reference-style links only)

- [Lahiri, 2003][lahiri-2003]
- [Buhlmann, 2002][buhlmann-2002]
- [Kunsch, 1989][kunsch-1989]
- [Politis and Romano, 1994][politis-romano-1994]

[lahiri-2003]: https://doi.org/10.1007/b97342
[buhlmann-2002]: https://doi.org/10.1214/ss/1023798998
[kunsch-1989]: https://doi.org/10.1214/aos/1176347265
[politis-romano-1994]: https://doi.org/10.1080/01621459.1994.10476870
