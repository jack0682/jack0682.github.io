---
title: "ONN Daily — 2026-02-23 — Calibration-aware LRD gate"
date: 2026-02-23 09:00:00 +0900
last_modified_at: 2026-02-23 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, calibration, lrd-gate, change-point, hurst]
toc: true
toc_sticky: true
excerpt: "Established a calibration-backed Hurst bias envelope and CP lead-time quantile guard, then integrated ten new references into a testable LRD gate update."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: 2026-02-22 — CP-preemption + Hurst-bias envelope]({% post_url 2026-02-22-onn-daily-cp-preemption-hurst-bias-envelope-lrd-gate %})

---

## 1. Context

Today closes two central gaps in the LRD gate path: finite-sample calibration for the Hurst bias envelope and an explicit CP lead-time quantile condition for preemption.

Continuity carried from yesterday:
- Carried open problems: OP-022, OP-023, OP-024, OP-026, OP-027.
- Main pending objections: CP-vs-LRD identifiability, unquantified bias envelope, and conservative-gate false reject inflation.
- Scope held for this run: calibration-aware LRD gate only; multivariate and topology-coupled extensions remain deferred.

## 2. Today’s Theory Target

- Target name: Calibration-aware LRD gate (bias envelope + CP lead-time).
- Claim block advanced: C56-C61.
- Why highest leverage: it converts gate uncertainty into measurable acceptance conditions and directly narrows OP-024/OP-027.
- Falsification triggers: b_H miscoverage on ARFIMA/fGn, CP lead-time quantile exceeding L_max, or FR beyond beta_target after calibration.

## 3. What Changed in the Theory

### Restatement (cleaned)

- Gate acceptance is now explicitly conditioned on `CP(x)=0` and `Hhat <= H0 - b_H`.
- `b_H` is promoted from heuristic margin to calibrated envelope with binomial coverage control.
- CP preemption is parameterized by `L_cp^0.95 <= L_max` under a calibration regime.

### Proof Audit (gaps & required assumptions)

- C56 depends on adequate Monte Carlo count (`N_mc`) and dependence-aware bootstrap validity.
- C57 depends on CP preemption reliability under slow drift and sufficient CP SNR.
- C58 remains contingent on controlling FR inflation when `b_H` is conservative.
- C59 monotonicity can fail in short windows and requires post-calibration smoothing.
- C61 transfer to unseen noise families is still experimental, not theorem-complete.

### Strengthening (new lemma / tighter condition / fix)

- Added calibration lemma using Clopper-Pearson lower bound to certify `P(|Hhat-H| <= b_H) >= 1-alpha_H` under calibration assumptions.
- Added conservative CP preemption condition using empirical lead-time quantile `L_cp^0.95 <= L_max`.
- Added practical fixes: isotonic smoothing for `b_H(n_win)` and CP hysteresis with an envelope cap `b_H_max`.

## 4. Paper Patch Notes (actionable edits)

- `P-239` (`paper/sections/05_theory.typ`): insert calibration lemma (binomial coverage + CP lower-bound criterion).
- `P-240` (`paper/sections/05_theory.typ`): define `L_cp^p`, `alpha_H`, `N_mc`, and guard condition placement.
- `P-241` (`paper/sections/06_experiments.typ`): add ARFIMA/fGn protocol for `b_H` coverage and CP lead-time quantiles.
- `P-242` (`paper/sections/06_experiments.typ`): add noise-family transfer stress test (Gaussian vs `t_5`).
- `P-243` (`paper/sections/07_related_work.typ`): integrate CP segmentation and Hurst-bias-correction references cited today.

## 5. New Literature Integrated (>=3)

1. McGonigle and Cho (2025): multivariate nonparametric CP segmentation via joint characteristic functions, used for CP baseline framing.
2. Hou et al. (2025): bootstrap confidence intervals for multiple CPs, used for lead-time uncertainty reporting.
3. Sagor et al. (2025): bias-corrected MOM Hurst estimation, used as estimator-bias correction input.
4. Wang et al. (2025): diffusing-diffusivity FBM variants, used to motivate robustness calibration across LRD generators.
5. Pacheco-Pozo and Krapf (2024): fluctuating diffusivity FBM, used as adversarial dependence scenario.
6. Leung and Zhao (2024): noisy fBm modeling for microstructure noise, used for noise-aware calibration track.
7. Grzesiek et al. (2024): random-vs-constant Hurst diagnostics, used for H variability checks.
8. Palipana et al. (2024): integrated fBm covariance modeling, used for alternative dependence stress track.
9. Feng et al. (2020): wavelet-robust Hurst estimation, used for estimator baseline comparison.
10. Wu (2020): wavelet estimator bias note, used to justify initialization-bias handling.

## 6. Development Actions (next 72 hours)

1. Run Monte Carlo calibration for `b_H(n_win)` and `L_cp` over ARFIMA/fGn windows (`n_win >= 2000`).
2. Add isotonic post-processing for `b_H(n_win)` with coverage-preservation check.
3. Add CP lead-time CI computation and gate monitoring metrics (`FR`, `FA`, `L_cp^p`).
4. Execute Gaussian vs `t_5` transfer calibration and report delta coverage.
5. Implement logging fields (`Hhat`, `b_H`, `CP score`, decision branch) for deployment traceability.

## 7. Open Problems (carried + new)

- OP-022: block size selection under dependence/drift remains unstable.
- OP-023: multivariate gate extension not yet integrated.
- OP-024: CP preemption reliability still needs empirical confirmation across drift regimes.
- OP-027: `b_H` coverage validation remains open across ARFIMA/fGn settings.
- OP-028 (new): calibrate `b_H(n_win)` with explicit finite-sample coverage guarantees by noise family.
- OP-029 (new): validate `L_cp^0.95 <= L_max` under drift floor `d0` with CI reporting.

## 8. Next-day Seed

Run the ARFIMA/fGn calibration sweep with Gaussian and `t_5` innovations to estimate `b_H` coverage and `L_cp` quantile stability for direct paper insertion.

## 9. References (reference-style links only)

- [Wang et al. 2025][wang-2025]
- [Pacheco-Pozo and Krapf 2024][pacheco-krapf-2024]
- [McGonigle and Cho 2025][mcgonigle-cho-2025]
- [Hou et al. 2025][hou-2025]
- [Sagor et al. 2025][sagor-2025]
- [Leung and Zhao 2024][leung-zhao-2024]
- [Grzesiek et al. 2024][grzesiek-2024]
- [Palipana et al. 2024][palipana-2024]
- [Feng et al. 2020][feng-2020]
- [Wu 2020][wu-2020]

[wang-2025]: https://doi.org/10.1103/w8gv-3fxt
[pacheco-krapf-2024]: https://doi.org/10.1103/PhysRevE.110.014105
[mcgonigle-cho-2025]: https://doi.org/10.1093/biomet/asaf024
[hou-2025]: https://doi.org/10.3390/e27050537
[sagor-2025]: https://doi.org/10.3390/jrfm18100588
[leung-zhao-2024]: https://doi.org/10.3390/math12060864
[grzesiek-2024]: https://doi.org/10.1063/5.0201436
[palipana-2024]: https://doi.org/10.1093/biomtc/ujae011
[feng-2020]: https://doi.org/10.6339/JDS.202010_18(4).0001
[wu-2020]: https://doi.org/10.3390/e22030349
