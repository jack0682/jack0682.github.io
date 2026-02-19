---
title: "ONN Daily - 2026-02-19 - Long-Memory Diagnostic Fallback Quantile Gate"
date: 2026-02-19 09:00:00 +0900
last_modified_at: 2026-02-19 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, long-memory, quantile-gate, block-maxima, dependence-robust]
toc: true
toc_sticky: true
excerpt: "Added a long-memory diagnostic with a fallback quantile branch to preserve conservative coverage under heavy-tail dependence while integrating new bootstrap and maximal-inequality references."
---

[ONN Daily Index](/onn-daily/) | [Previous: 2026-02-18 - Dependence-Robust Quantile Gate with Block Bootstrap](/2026-02-18-onn-daily-dependence-robust-quantile-gate-block-bootstrap/)

## Context
Today's work tightened the dependence-robust acceptance gate by explicitly handling long-range dependence and heavy-tail leakage where short-memory corrections can fail. The key update is a diagnostic-triggered two-branch quantile rule that keeps acceptance conservative when assumptions weaken.

## Today’s Theory Target
Long-Memory Diagnostic + Fallback Quantile Gate.

## What Changed in the Theory
### Restatement (cleaned)
- Introduce a block-mean variance slope diagnostic on `V(ell)` to detect long-range dependence.
- Use a two-branch quantile rule: corrected quantile under short-memory, block-maxima fallback under detected long-memory.
- Define a runtime indicator `chi_LRD` and propagate it directly into gate selection.
- Tie gate refresh behavior to monitoring cadence so regime drift does not silently invalidate calibration.

### Proof Audit (gaps & required assumptions)
- `A14`: short-range dependence assumptions remain required for the short-memory branch.
- `A17`: diagnostic consistency still needs formal validation under finite windows and nonstationary variance.
- `A18`: fallback conservativeness depends on block-maxima behavior under heavy tails.
- Exact maximal-inequality rate constants for the correction width are still not fully pinned down in-text.

### Strengthening (new lemma / tighter condition / fix)
- Added claim-level guardrails (`C27-C34`) that split short-memory and long-memory regimes explicitly.
- Replaced single-path quantile transfer with branch-aware selection:
  `q* = (1 - chi_LRD) q_corr + chi_LRD q_LRD`.
- Added practical instrumentation requirements (`V(ell)` slope, branch indicator, both quantiles) for auditability.
- Added fallback conservativeness framing so false accepts are bounded under heavy-tail leakage.

## Paper Patch Notes (actionable edits)
- `P-227`: add long-memory diagnostic definition and branch-gate theorem statement in theory section.
- `P-228`: add fallback block-maxima quantile route and conservativeness remark for heavy-tail LRD.
- `P-229`: add experiment protocol for diagnostic accuracy, branch switching, and coverage/stability metrics.

## New Literature Integrated (≥3)
- Arvanitis (2023), concentration inequalities under uniform mixing, to ground dependence-rate corrections [1].
- Yang (2024), blockwise bootstrap for high-dimensional time series, for practical dependence testing design [2].
- Bucher (2025), block-maxima bootstrap behavior, to constrain fallback assumptions and failure modes [3].
- Pouzo (2024), maximal inequalities for dependent data, as the main proof route anchor for correction width [4].

## Development Actions (next 72 hours)
- Implement and test long-memory slope diagnostic classification on AR(1) vs ARFIMA leakage series.
- Add branch gate runtime logging and safety counters for `chi_LRD` transitions.
- Run coverage and false-accept sweeps across block length, window size, and monitoring cadence.
- Validate delay-handoff stability with branch-gate inputs under delay jitter and regime drift.
- Prepare ablation tables for slope threshold and fallback quantile conservativeness.

## Open Problems (carried + new)
- OP-022 (carried): adaptive block-size selection remains unresolved under unknown dependence.
- OP-023 (carried): multivariate quantile gate extension is still open.
- OP-019 (carried): monitor cadence bound `tau_mon <= n_win/2` remains unvalidated.
- OP-024 (new): prove diagnostic correctness and finite-sample reliability for long-memory detection.

## Next-day Seed
Derive and validate finite-sample threshold calibration for the long-memory slope diagnostic, then benchmark branch-gate coverage against a single-branch baseline.

## References (reference-style links only)
[1]: https://doi.org/10.1007/s42952-023-00208-5
[2]: https://doi.org/10.3390/e26030226
[3]: https://doi.org/10.1093/jrsssb/qkaf060
[4]: https://arxiv.org/abs/2402.11394
