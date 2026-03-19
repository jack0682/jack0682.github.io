---
title: ONN Daily — 2026-02-24 — Cross-noise calibration lemma
date: 2026-02-24 09:00:00 +0900
last_modified_at: 2026-02-24 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, calibration, hurst-bias, change-point, heavy-tail]
toc: true
toc_sticky: true
excerpt: Established a cross-noise calibration lemma with explicit Hurst-bias coverage and CP lead-time CI conditions, then integrated accepted references into theory and experiment patches.
---

> Continuity
> - ONN Daily Index: [/onn-daily/](/onn-daily/)
> - Previous: [ONN Daily — 2026-02-23 — Calibration-aware LRD gate](/2026-02-23-onn-daily-calibration-aware-lrd-gate-cp-preemption/)

## Context
Today focused on converting noise-family robustness into explicit calibration and acceptance conditions for ORTSF gating. The log added new open problems OP-030/OP-031, patched theory and experiment plans, and integrated accepted literature into related-work and validation design.

## Today’s Theory Target
**Target:** Cross-noise calibration lemma for $$b_{H}$$ and $$L_{cp}^{p}$$.

**Claims advanced:** C62-C67, centered on family-indexed coverage, cross-noise transfer constraints, and CP lead-time quantile guardrails.

**Why leverage is high:** it closes the path from calibration to deployable gate checks by turning robustness concerns into measurable pass/fail conditions.

## What Changed in the Theory
### Restatement (cleaned)
For each noise family $$nu$$ in $${Gaussian, t5, ARFIMA-like}$$, calibrate an envelope $$b_{H}(n_{win}, nu)$$ and require lower-confidence coverage $$LB_{nu}(alpha_{H}) \ge 1 - alpha_{H}$$. In parallel, estimate $$L_{cp}^{0.95}(nu)$$ with bootstrap CI and enforce $$L_{cp}^{0.95} \le L_{max}$$ under SNR threshold $$s0$$.

### Proof Audit (gaps & required assumptions)
- C62 depends on Clopper-Pearson style guarantees and effective independence; dependence can invalidate nominal binomial coverage.
- C63 remains a conjectural transfer step; heavy-tail regimes below the chosen kurtosis/df boundary can break Gaussian-to-nu transfer.
- C65 requires dependence-aware bootstrap validity; under long-memory or nonstationary drift, naive bootstrap under-covers.
- C64 needs explicit $$s0$$ definition and detector-specific lag assumptions.

### Strengthening (new lemma / tighter condition / fix)
- Added repaired conditions: block-resampled/thinned calibration for dependence, minimum Monte Carlo budget, and CI-based guard usage.
- Tightened cross-noise scope to bounded-tail families (including $$t5$$) with an explicit inflation factor $$delta_{kappa}$$.
- Added isotonic smoothing requirement for monotone $$b_{H}(n_{win})$$ behavior in practical ranges.

## Paper Patch Notes (actionable edits)
- Insert a calibration lemma subsection defining family-indexed $$b_{H}$$ coverage conditions and failure criteria.
- Add CP lead-time CI subsection using a two-stage bootstrap protocol and acceptance threshold tied to $$L_{max}$$.
- Update experiment design with cross-noise acceptance tests (coverage, FA/FR, lag quantiles, chattering).
- Extend related work with accepted references supporting bias correction, CP CI, rough-H estimation under noise, and TDA survey positioning.

## New Literature Integrated (≥3)
- Hou et al. (2025): two-stage bootstrap confidence intervals for multiple change points; integrated as basis for $$L_{cp}^{p}$$ uncertainty treatment.
- Sagor et al. (2025): bias-corrected MOM Hurst estimation; integrated as motivation/baseline for explicit $$b_{H}$$ calibration.
- Szymanski (2024): rough Hurst estimation under additive noise; integrated for noise-aware estimator and rate framing.
- Wei and Wei (2025): persistent topological Laplacians survey; integrated for TDA positioning in related work.

## Development Actions (next 72 hours)
1. Implement Monte Carlo calibration loop for $$b_{H}$$ by noise family.
2. Implement CP lead-time quantile CI estimation and report upper-bound acceptance checks.
3. Define and lock $$s0$$ and detector config used in guard acceptance.
4. Run Gaussian/t5 transfer experiments with inflation factor $$delta_{kappa}$$ sensitivity.
5. Add isotonic smoothing pipeline and compare raw vs smoothed envelope behavior.
6. Execute stress tests for heavy-tail and heteroskedastic regimes with failure catalog logging.

## Open Problems (carried + new)
- Carried: OP-028 (cross-noise coverage targets/CI for $$b_{H}$$), OP-029 ($$L_{cp}^{p}$$ CI coverage requirement).
- New: OP-030 (bound/prove cross-noise inflation factor $$delta_{kappa}$$), OP-031 (validate $$L_{cp}^{p}$$ CI coverage under dependence).

## Next-day Seed
2026-02-25: implement the MC calibration script and verify Gaussian/t5 coverage plus CP lead-time CI validity under dependence-aware resampling.

## References (reference-style links only)
- [Hou et al., 2025, Entropy 27(5):537, DOI 10.3390/e27050537](https://doi.org/10.3390/e27050537)
- [Sagor et al., 2025, Journal of Risk and Financial Management 18(10):588, DOI 10.3390/jrfm18100588](https://doi.org/10.3390/jrfm18100588)
- [Szymanski, 2024, Stochastic Processes and their Applications 170:104302, DOI 10.1016/j.spa.2024.104302](https://doi.org/10.1016/j.spa.2024.104302)
- [Wei and Wei, 2025, Mathematics 13(2):208, DOI 10.3390/math13020208](https://doi.org/10.3390/math13020208)
