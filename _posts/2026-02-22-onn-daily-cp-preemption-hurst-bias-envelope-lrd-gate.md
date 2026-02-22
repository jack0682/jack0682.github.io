---
title: "ONN Daily — 2026-02-22 — CP-preemption + Hurst-bias envelope"
date: 2026-02-22 09:00:00 +0900
last_modified_at: 2026-02-22 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, change-point, hurst, lrd, bootstrap]
toc: true
toc_sticky: true
excerpt: "Introduced a CP-preemption inequality and bootstrap Hurst-bias envelope guard band, then anchored the theory patch with new CP-vs-LRD and bootstrap literature."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: 2026-02-21 — Finite-sample LRD gate with change-point guard]({% post_url 2026-02-21-onn-daily-finite-sample-lrd-gate-change-point-guard %})

---

## 1. Context

Today closes two blocking gaps from the prior day: explicit change-point preemption before threshold crossing, and finite-sample Hurst bias control in short windows.

Carried context:
- Open-problem continuity: OP-022, OP-023, OP-024, OP-025.
- Main reviewer objections: CP vs LRD confounding, CP false positives, unquantified Hurst bias.
- Scope of today's closure: CP preemption inequality + bootstrap bias envelope `b_H(n_win)`.

## 2. Today's Theory Target

- Target name: CP-preemption guarantee + Hurst-bias envelope.
- Claim set: C51-C55.
- Why high leverage: it converts estimator uncertainty into an explicit guard band and forces CP precedence under drift.
- Falsification triggers: CP lag exceeds bound under slow drift; bootstrap envelope under-covers ARFIMA/fGn bias; combined gate inflates false rejects.
- Scope boundary: multivariate gate extensions and full topology-coupled analysis remain deferred.

## 3. What Changed in the Theory

### Restatement (cleaned)

- Core gate rule: accept short-memory branch only when `CP(x)=0` and `Hhat <= H0 - b_H(n_win)`.
- New parameterization: detection lag `L_cp`, false-negative target `alpha_cp`, drift floor `d0`, and allowed lead-time bound `L_max`.
- Operational effect: CP alarms preempt long-memory misclassification when slope drift is present.

### Proof Audit (gaps & required assumptions)

- C51 needs `A28` (preemption reliability) and stronger SNR/overlap conditions to prevent delayed triggers.
- C52 needs bootstrap validity restrictions in finite windows; repaired to ARFIMA with `|phi| <= 0.5` and `n_win >= 2000`.
- C53 needs a conservative remainder margin; repaired as `H0 - b_H - Delta_H` with tighter CP miss budget.
- C54 remains sensitive to extremal-index instability; patched with circular block-maxima and conservative upper bounds.
- C55 requires empirical calibration to avoid CP-induced false-reject bursts.

### Strengthening (new lemma / tighter condition / fix)

- New lemma (preemption): if drift `>= d0`, `P(preempt) >= 1-alpha_cp`, and `L_cp <= L_max`, then CP triggers before `Hhat` crosses `H0` in-window.
- New guard band: bootstrap envelope `b_H(n_win)` provides an explicit bias budget for `Hhat`.
- Tighter condition set: CP hysteresis + envelope cap `b_H_max` to prevent over-conservative fallback.

## 4. Paper Patch Notes (actionable edits)

- P-234 (`paper/sections/05_theory.typ`): add formal CP-preemption lemma and inequality.
- P-235 (`paper/sections/05_theory.typ`): add `b_H(n_win)` definition and guard-band acceptance rule.
- P-236 (`paper/sections/06_experiments.typ`): add ARFIMA/fGn CP-preemption protocol with lag tracking and envelope coverage plots.
- P-237 (`paper/sections/07_related_work.typ`): integrate CP-vs-LRD and bootstrap references used in this update.
- P-238 (`paper/sections/05_theory.typ`): formalize notation (`L_cp`, `alpha_cp`, `d0`, `L_max`) and place inequality after lemma.

## 5. New Literature Integrated (>=3)

- Norwood and Killick (2018): spectral classification clarifying finite-sample CP-vs-LRD identifiability limits.
- Baek, Kokoszka, and Meng (2024): direct CP-vs-LRD test framing for dependent functional series.
- Xi and Pang (2024): change-point detection in variance under fractional integration.
- Shang (2023): sieve bootstrap support for long-memory parameter inference.
- Wegner and Wendler (2024): robust dependent wild bootstrap for change-point workflows.
- Zhang, Jin, and Su (2024): modified block bootstrap under persistence change with heavy tails.

## 6. Development Actions (next 72 hours)

1. Implement `b_H(n_win)` bootstrap envelope in the gate path.
2. Add CP detector hysteresis and false-positive cap.
3. Run ARFIMA/fGn Monte Carlo for envelope coverage and CP lead-time distributions.
4. Add integration test: CP preemption under slope drift with `n_win >= 2000`.
5. Add unit tests for `b_H` monotonicity and guard-band decisions.
6. Instrument runtime logging for `CP score`, `Hhat`, `b_H`, and gate branch decisions.

## 7. Open Problems (carried + new)

- OP-022: block-size selection under regime drift remains unstable.
- OP-023: multivariate leakage gate extension is still open.
- OP-024: CP-preemption probability target and FN calibration need empirical confirmation.
- OP-025: `chi_LRD` calibration for slope + HK union diagnostic remains pending.
- OP-026: verify CP preemption lag bound `L_cp <= L_max` under controlled drift.
- OP-027: quantify `b_H(n_win)` coverage across ARFIMA/fGn window sizes.

## 8. Next-day Seed

2026-02-23 seed: execute ARFIMA/fGn benchmark sweep to estimate `b_H(n_win)` coverage and CP lead-time distributions, then fold thresholds into theory and experiment sections.

## 9. References (reference-style links only)

- [Norwood and Killick 2018][norwood-killick-2018]
- [Baek et al. 2024][baek-2024]
- [Xi and Pang 2024][xi-pang-2024]
- [Shang 2023][shang-2023]
- [Wegner and Wendler 2024][wegner-wendler-2024]
- [Zhang, Jin, and Su 2024][zhang-jin-su-2024]

[norwood-killick-2018]: https://doi.org/10.1007/s11222-017-9731-0
[baek-2024]: https://doi.org/10.1111/jtsa.12723
[xi-pang-2024]: https://doi.org/10.1007/s00362-023-01490-5
[shang-2023]: https://doi.org/10.1007/s10182-022-00462-x
[wegner-wendler-2024]: https://doi.org/10.1007/s00362-023-01505-1
[zhang-jin-su-2024]: https://doi.org/10.3390/math12142153
