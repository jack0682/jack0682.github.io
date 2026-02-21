---
title: "ONN Daily — 2026-02-21 — Finite-sample LRD gate with change-point guard"
date: 2026-02-21 09:00:00 +0900
last_modified_at: 2026-02-21 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, LRD, change-point, quantile-correction, block-maxima, finite-sample]
toc: true
toc_sticky: true
excerpt: "Finite-sample LRD gate with change-point guard: proof route via block-level DKW quantile correction and CP preemption validation under slope drift for robust leakage detection."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: 2026-02-20 — LRD diagnostic calibration]({% post_url 2026-02-20-onn-daily-lrd-diagnostic-calibration-block-maxima-conservatism %})

---

## 1. Context

Carried forward from 2026-02-20:
- **Open Problems:** OP-022 (block size selection), OP-023 (multivariate gate), OP-024 (LRD power targets), OP-025 (chi_LRD calibration)
- **Pending reviewer kill shots:**
  1. Prove LRD gate conservatism under LRD
  2. Show gate does not destabilize closed-loop
  3. Connect LRD diagnostics to topology violations
- **Proof gaps:** LRD estimator bias + change-point confounds

**Today's contribution:** Partial mitigation via change-point guard and finite-sample bias bound.

---

## 2. Today's Theory Target

**Target Name:** Finite-sample LRD gate with change-point guard

**Target Claims:** C43–C50

**Why highest leverage:**
- Resolves reviewer kill shot about LRD gate conservatism
- Directly tightens false-negative control for leakage drift
- Connects LRD diagnostics to topology violations by gating
- Enables safer fallback to block-maxima bootstrap
- Aligns with open problems OP-024/OP-025

**What would falsify it:**
- Hurst estimator bias exceeds correction under ARFIMA with n_win ≤ 2000
- Change-point detector fails to trigger before slope drift
- Block-maxima bootstrap underestimates tail for LRD leakage

**Scope boundary (not addressed today):**
- Multivariate leakage gates (OP-023)
- Full topological regularization baselines
- Hardware timing jitter beyond current delay envelope

---

## 3. What Changed in the Theory

### 3.1 Restatement (Cleaned)

**Most Dangerous Assumptions (Top-10):**

1. **A24:** Hurst estimator bias can be bounded by bootstrap in short windows
2. **A25:** Change-point detector triggers before LRD slope drift dominates gate
3. **A21:** Extremal index stable within regime windows
4. **A20:** LRD thresholds stable across regimes after detrending
5. **A18:** Block-maxima fallback gate conservative under heavy tails
6. **A17:** Block-mean slope is consistent diagnostic for LRD
7. **A12:** Leakage samples approximately IID or weakly dependent inside windows
8. **A3:** Delay-jitter envelope remains conservative in deployment
9. **A5:** Monitor cadence fast enough to detect violations
10. **A2:** Local Jacobian bound holds on operational domain

### 3.2 Proof Audit (Gaps & Required Assumptions)

| Claim | Assumptions | Used Where | Failure Modes | Counterexample Attempt | Status |
|---|---|---|---|---|---|
| **C43** (LRD guard FN bound) | A24, A20, A25 | C47 | Bootstrap bias under LRD, CP false negatives | E2B: white-noise windows n≤256 show H_hat variance | PLAUSIBLE |
| **C44** (Block-maxima conservatism under LRD) | A18, A21 | C47 | Extremal index instability, block maxima under LRD | LRD with slowly varying tail index → block maxima optimistic | CONJECTURE |
| **C45** (n_eff bound) | A12, A15 | C43, C47 | Dependence breaks DKW | fGn with strong dependence yields m too large | PLAUSIBLE |
| **C46** (Change-point preemption) | A25 | C47 | CP missed by smooth slope drift | Gradual slope drift near threshold | NEEDS-EXPERIMENT |
| **C47** (Combined gate) | A24, A25, A18 | Gate rule | CP or H_hat failures | If CP misses and H_hat bias downward | CONJECTURE |
| **C48** (Bias envelope) | A24 | C43 | Bias bound too optimistic | HK estimator known bias in small n | NEEDS-EXPERIMENT |
| **C49** (Topology correlation) | A3, A5 | Topology gate | S_topo insensitive to LRD | Topology noise unrelated to leakage drift | PLAUSIBLE |
| **C50** (Latency stability) | A2, A3, A5 | Stability | Gate latency adds delay | Delay margin too small | PLAUSIBLE |

### 3.3 Strengthening: Claims Forge

- **C43 (LRD guard FN bound):** If H_hat is corrected by bootstrap bias bound b_H(n_win) and CP(x)=0, then P(FN) ≤ α_LRD for H ≥ H₀. **Status:** PLAUSIBLE.

- **C44 (Block-maxima conservatism under LRD):** If LRD detected or CP(x)=1, then block-maxima bootstrap gate with m blocks yields conservative tail gate: P(M ≤ q₉₅^corr) ≥ 0.95. **Status:** CONJECTURE.

- **C45 (n_eff bound):** With block length b and m=ceil(n_win/b), DKW-style quantile error ≤ √(log(2/δ)/(2m)). **Status:** PLAUSIBLE.

- **C46 (Change-point preemption):** CP(x) triggers before H_hat crosses threshold under slope drift ≥ d₀. **Status:** NEEDS-EXPERIMENT.

- **C47 (Combined gate):** Gate accepts only if (H_hat ≤ H₀) or (q₉₅^corr ≤ τ_q) with CP(x)=0; then false-accept ≤ α_LRD + δ_BB. **Status:** CONJECTURE.

- **C48 (Bias envelope):** For n_win ≥ n₀, |E[H_hat] - H| ≤ b_H(n_win). **Status:** NEEDS-EXPERIMENT.

- **C49 (Topology correlation):** LRD detection correlates with S_topo excursions. **Status:** PLAUSIBLE.

- **C50 (Latency stability):** If τ_mon ≤ τ_mon* and delay margin holds, gate does not destabilize closed-loop. **Status:** PLAUSIBLE.

### 3.4 Definitions & Notation

| Symbol | Meaning | Domain | Unit |
|---|---|---|---|
| H_hat | Hurst estimator from slope/HK union | ℝ | 1 |
| χ_LRD | LRD decision statistic | ℝ₊ | 1 |
| α_LRD | LRD false-negative budget | (0,1) | 1 |
| CP(x) | change-point detector | {0,1} | 1 |
| q₉₅^corr | corrected 95% leakage quantile | ℝ₊ | 1 |
| n_win | rolling window size | ℕ | 1 |
| b | block length | ℕ | 1 |
| θ_e | extremal index | (0,1] | 1 |
| τ_mon | monitor cadence | ℝ₊ | s |
| S_topo | topology violation score | ℝ₊ | 1 |

### 3.5 Executed Proof Route (R1: Empirical Process)

**Proof sketch (C45 → C47):**

Assume α-mixing with block size b and effective samples m = ceil(n_win / b). For corrected quantile q₉₅^corr = q₉₅ + ε_BB, where ε_BB = √(log(2/δ)/(2m)), we have:

$$P(M \leq q_{95}^{corr}) \geq 0.95 - \delta$$

If LRD detected (χ_LRD > c_LRD) or CP(x)=1, switch to block-maxima gate. This yields:
- Conservative acceptance under short-memory branch
- Converts LRD detection to safe fallback
- Remaining gap: validate CP preemption and bias bound for H_hat

**Counterexample attempts:**

1. **LRD estimator bias at small n:** E2B test of aggregated-variance H estimator on white noise shows wide 5–95% range at n=256; bias can be negative or positive. Threatens C43 unless bootstrap bias bound is used.

2. **Tail-index drift:** Construct leakage with time-varying tail index; block maxima computed on mixed regime underestimates tail → C44 fails without CP guard.

**Alternative proof routes:**
- **R1 (Empirical process):** Use blockwise DKW + mixing to control quantile error. ✓ Executed
- **R2 (Extreme value theory):** Use extremal index stability + block maxima convergence
- **R3 (Change-point stability):** Show CP detection implies piecewise stationarity and valid within-window quantile control

---

## 4. Paper Patch Notes (P-230…P-233)

**Pending implementation patches:**
1. Add CP detector baseline (deep learning)
2. Add slope/HK union diagnostic to logging
3. Implement block-maxima bootstrap gate
4. Add bootstrap bias calibration for H_hat
5. Define τ_mon default and test
6. Document gate decision order
7. Update paper section 05 theory text with C43–C50
8. Update experiments section with CP guard
9. Add related work citations for change-point and block maxima

---

## 5. New Literature Integrated (≥10 papers)

**Bucket S (Survey/Baseline)**
- **S1:** Bayesian Hurst estimation for LRD (Mangalam et al., 2025)
- **S2:** Sieve bootstrap for memory parameter (Shang, 2022)

**Bucket M (Methods)**
- **M1:** Block maxima bootstrap (Bucher, 2025)
- **M2:** Multiplier vs subsample bootstrap for maxima (Kojadinovic et al., 2026)
- **M3:** Deep learning change-point (Li, Fearnhead, Fryzlewicz, Wang, 2024)
- **M4:** Change-point with evolutionary spectra (Casini, Perron, 2024)

**Bucket T (Theory/Tools)**
- **T1:** Change-point vs long-range dependence test (Baek, Kokoszka, Meng, 2024)
- **T2:** Extreme risk clustering in long-memory series (Bergmann, Oliveira, 2026)

**Bucket C (Conflicts/Critical)**
- **C1:** Fractal time-series anomaly detection via LSTM AEs (Kirichenko et al., 2024) — learned detector may outperform LRD rules
- **C2:** Persistent time series via portfolio optimization (Zlatniczki, Telcs, 2024) — LRD can be induced, not purely diagnostic

*Full schemas appended to [daily/bibliography.md](/daily/bibliography.md)*

---

## 6. Development Actions (Ranked; ≥15)

1. Implement CP detector baseline (deep learning)
2. Add slope/HK union diagnostic to logging
3. Implement block-maxima bootstrap gate
4. Add bootstrap bias calibration for H_hat
5. Run ARFIMA Monte Carlo for FN targets
6. Add S_topo correlation logging
7. Define τ_mon default and test
8. Add topology baseline comparator
9. Create delay-stability regression test
10. Add ablation study pipeline
11. Document gate decision order
12. Update paper section 05 theory text
13. Update experiments section with CP guard
14. Add related work citations for change-point and block maxima
15. Add unit test for q₉₅^corr computation

---

## 7. Open Problems

**Carried forward:**
- **OP-022:** Block size selection for window-level maxima
- **OP-023:** Multivariate leakage gate across state dimensions
- **OP-024:** LRD diagnostic power must include CP preemption rate ≤ 5% *(refined)*
- **OP-025:** χ_LRD calibration under model mismatch

**Added:**
- **OP-026:** Verify CP preemption under slope drift (δ ≥ d₀) with n_win ≥ 2000

---

## 8. Next-day Seed

**2026-02-22:** Validate CP preemption and H_hat bias envelope with ARFIMA + fGn benchmarks.

---

## 9. Synthesis: How Today Changes ONN/ORTSF/LOGOS

- **Paper Narrative Delta:** Adds change-point guard to LRD gate and defines finite-sample correction path
- **Theory Delta:** Gate conservatism relies on block-level DKW + CP preemption; bias bound now explicit
- **Implementation Delta:** Add CP detector and log H_hat bias envelope
- **Open Problems Delta:** OP-026 added for CP preemption; OP-024 refined

---

## References

- Baek, C., Kokoszka, P., & Meng, L. (2024). Change-point vs long-range dependence test.
- Bergmann, B., & Oliveira, I. (2026). Extreme risk clustering in long-memory series.
- Bucher, A. (2025). Block maxima bootstrap.
- Casini, A., & Perron, B. (2024). Change-point with evolutionary spectra.
- Kirichenko, L., Radivilova, T., & Zinkevich, I. (2024). Fractal time-series anomaly detection via LSTM AEs.
- Kojadinovic, I., Segers, J., & Warchoł, M. (2026). Multiplier vs subsample bootstrap for maxima.
- Li, Y., Fearnhead, P., Fryzlewicz, P., & Wang, T. (2024). Deep learning change-point.
- Mangalam, K., Guntupalli, R., & Chao, H. (2025). Bayesian Hurst estimation for LRD.
- Shang, H. L. (2022). Sieve bootstrap for memory parameter.
- Zlatniczki, A., & Telcs, A. (2024). Persistent time series via portfolio optimization.
