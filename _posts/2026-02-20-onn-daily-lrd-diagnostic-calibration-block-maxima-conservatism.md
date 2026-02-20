---
title: "ONN Daily - 2026-02-20 - LRD Diagnostic Calibration Block-Maxima Conservatism"
date: 2026-02-20 09:00:00 +0900
last_modified_at: 2026-02-20 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, lrd-diagnostic, block-maxima, extremal-index, hurst-calibration]
toc: true
toc_sticky: true
excerpt: "Formalized LRD calibration and a conservative block-maxima fallback gate, then integrated recent block-bootstrap and extremal-index literature into actionable paper patches."
---

[ONN Daily Index](/onn-daily/) | [Previous: 2026-02-19 - Long-Memory Diagnostic Fallback Quantile Gate](/2026-02-19-onn-daily-long-memory-diagnostic-fallback-quantile-gate/)

## Context
Today focused on reducing false-accept risk when leakage exhibits long-range dependence (LRD), where short-memory DKW-style correction is unreliable. The update calibrates an LRD detector and binds it to a conservative block-maxima fallback quantile.

## Today’s Theory Target
LRD Diagnostic Calibration + Block-Maxima Conservatism (Claims C35-C42).

## What Changed in the Theory
### Restatement (cleaned)
- Added a slope-based LRD diagnostic on block-mean variance scaling and a practical threshold range.
- Defined branch gate quantile selection: `q* = (1 - chi_LRD) q_corr + chi_LRD q_LRD`.
- Linked fallback quantile estimation to circular block-maxima bootstrap under dependence.
- Added cadence condition coupling (`tau_mon <= n_win/2`) to keep online gate updates auditable.

### Proof Audit (gaps & required assumptions)
- `A20`: slope threshold stability across regimes remains an assumption and needs calibration data.
- `A17`: finite-window bias in slope estimation can induce false positives under trend/heteroskedasticity.
- `A21`: extremal-index stationarity within window is required for conservative fallback interpretation.
- `A10`, `A16`: cadence aliasing and regime-label drift still threaten closed-loop reliability.

### Strengthening (new lemma / tighter condition / fix)
- Promoted explicit claim-level guardrails for LRD detection and misclassification risk accounting (C35, C38, C39).
- Added extremal-index based conservatism framing for fallback quantiles (C36).
- Adopted circular block-maxima bootstrap consistency route (C40) instead of naive block bootstrap.
- Added measurable runtime instrumentation targets for `beta`, `chi_LRD`, `q_corr`, and `q_LRD`.

## Paper Patch Notes (actionable edits)
- `P-230`: insert LRD calibration rule and Hurst-alternative diagnostic statement.
- `P-231`: add extremal-index conservatism remark and fallback condition block.
- `P-232`: add ARFIMA calibration + block-maxima coverage protocol.
- `P-233`: expand related-work citations for circular maxima bootstrap and MSB/ESB maxima resampling.

## New Literature Integrated (≥3)
- Bücher & Staud (2025): circular block-maxima bootstrap consistency and failure mode of naive bootstrap [1].
- Ma & Zhang (2026): MSB/ESB maxima bootstrap for high-dimensional dependent series [2].
- Ferreira (2024): extremal-index estimation and resampling guidance [3].
- Mangalam & Likens (2025): Bayesian Hurst-Kolmogorov estimator for short-series diagnostics [4].

## Development Actions (next 72 hours)
- Run AR(1) vs ARFIMA calibration sweep for `beta_0` and report FN/FP operating points.
- Execute block-length sensitivity for fallback quantile coverage under heavy-tail leakage.
- Add gate telemetry logs and alert thresholds for frequent `chi_LRD` toggles.
- Validate cadence bound under delay bursts with branch-gate enabled.
- Draft ablation table comparing single-branch vs branch-gate false-accept rates.

## Open Problems (carried + new)
- OP-022 (carried): adaptive block-size selection under unknown dependence.
- OP-023 (carried): multivariate quantile gate and copula corrections.
- OP-024 (carried): LRD diagnostic consistency and finite-sample threshold guarantees.
- OP-025 (new): robust extremal-index tracking under regime drift.

## Next-day Seed
Calibrate a two-signal LRD detector (`beta` slope + Hurst estimate) and validate whether branch switching improves coverage without destabilizing adaptation.

## References (reference-style links only)
[1]: https://doi.org/10.1093/jrsssb/qkaf060
[2]: https://doi.org/10.1016/j.jmva.2025.105579
[3]: https://doi.org/10.1007/s00180-023-01406-9
[4]: https://doi.org/10.3390/e27050500
