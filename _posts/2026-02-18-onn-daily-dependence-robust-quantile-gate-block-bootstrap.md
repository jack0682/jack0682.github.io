---
title: "ONN Daily - 2026-02-18 - Dependence-Robust Quantile Gate with Block Bootstrap"
date: 2026-02-18 09:00:00 +0900
last_modified_at: 2026-02-18 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, dependence-robust, quantile-gate, block-bootstrap, regime-drift]
toc: true
toc_sticky: true
excerpt: "Introduced an effective-sample-size quantile correction with block-bootstrap regime checks and grounded the update with dependence-focused literature."
---

[ONN Daily Index](/onn-daily/) | [Previous: 2026-02-17 - Finite-Sample Quantile Transfer Correction](/2026-02-17-onn-daily-finite-sample-quantile-transfer-correction-leakage/)

## Context
Today's log focused on fixing leakage-gate undercoverage when samples are dependent and regimes drift. The core move was to replace IID-style quantile assumptions with a dependence-aware correction and a regime-change test that can trigger recalibration.

## Today's Theory Target
Dependence-Robust Quantile Gate with Block Bootstrap Correction.

## What Changed in the Theory
### Restatement (cleaned)
- Define an effective sample size `n_eff` from autocorrelation and use it in a dependence-adjusted DKW-style correction.
- Replace the raw 95th-percentile gate with a conservative corrected quantile `q_(0.95 + epsilon_eff)`.
- Make the acceptance rule regime-conditional and reject unconditional quantile transfer across shifted regimes.
- Pair quantile correction with block-bootstrap regime testing so stale calibration is invalidated on drift.

### Proof Audit (gaps & required assumptions)
- `A14`: leakage sequence must satisfy short-range dependence assumptions; long-range dependence remains a known breaker.
- `A15`: block bootstrap validity depends on a reasonable block length `b`.
- `A16`: regime labels and drift alarms must be timely enough for recalibration.
- Exact constants for the dependence-adjusted DKW step still need a formal citation-level lemma in the paper text.

### Strengthening (new lemma / tighter condition / fix)
- Added a tighter conservative quantile route using `n_eff` instead of `n_win`.
- Added a runtime linkage between monitor cadence and recalibration freshness.
- Refuted the prior unconditional transfer claim with a heavy-tail regime-shift counterexample and restricted claims to regime-conditional validity.

## Paper Patch Notes (actionable edits)
- `P-225`: insert dependence-corrected quantile gate text in `paper/sections/05_theory.typ`, including `n_eff`, `epsilon_eff(delta)`, and block-bootstrap drift trigger.
- `P-226`: add block-length sweep and drift-reset protocol in `paper/sections/06_experiments.typ` (`b in {5,10,20,40}`; reset on `p < delta`).
- Add acceptance checks to verify conservative coverage recovery under AR(1)-style dependence after correction.

## New Literature Integrated (>=3)
- Natarajan et al. (2024): blockwise and tail-robust inference for dependent data, used to justify dependence-aware calibration framing [1].
- Voleti and Prabhu (2024): block-bootstrap stationarity/regime-change foundation, used for drift-test rationale [2].
- Zhang et al. (2025): block-based delay stability route, used to align blockwise statistical correction with delay-stability analysis [3].
- Yang et al. (2024): high-dimensional blockwise bootstrap testing, used as a practical two-sample testing reference point [4].

## Development Actions (next 72 hours)
- Implement and unit-test autocorrelation-truncated `n_eff` estimation on synthetic AR(1) leakage.
- Implement block-bootstrap consecutive-window regime test and drift-triggered quantile reset.
- Run coverage sweeps across `phi`, `n_win`, and `b`, and verify false-accept <= 5%.
- Log `q_0.95`, corrected quantile, `n_eff`, and drift score per window for diagnosis.
- Re-run delay-jitter acceptance sweeps using corrected gate inputs.

## Open Problems (carried + new)
- OP-021 (carried): validate regime drift detector plus bootstrap coverage under realistic shift patterns.
- OP-019 (carried): verify monitor-cadence bound `tau_mon <= n_win/2` under nonstationary windows.
- OP-022 (new): adaptive block-size selection under unknown dependence to reduce calibration sensitivity.

## Next-day Seed
Validate the `n_eff` estimator on ARFIMA leakage and compare coverage against block-bootstrap-only correction.

## References (reference-style links only)
[1]: https://doi.org/10.3390/e16031247
[2]: https://doi.org/10.3390/math12081156
[3]: https://doi.org/10.1016/j.automatica.2025.113456
[4]: https://www.mdpi.com/1099-4300/26/10/850
