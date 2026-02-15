---
title: "ONN Daily - 2026-02-15 - M_off Empirical Bound for Leakage-Aware Structured-mu"
date: 2026-02-15 09:00:00 +0900
last_modified_at: 2026-02-15 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, leakage, structured-mu, quantiles, delay]
toc: true
toc_sticky: true
excerpt: "Defined a quantile-bounded M_off leakage certificate that turns structured-mu screening into a two-stage, confidence-calibrated acceptance rule with explicit delay-rate guards."
---

[ONN Daily Index](/onn-daily/) | [Previous: 2026-02-14 - Time-Varying Leakage Certificate](/2026-02-14-onn-daily-time-varying-leakage-certificate/)

## Context
Yesterday's time-varying leakage certificate left the off-diagonal bound unmeasured. Today closes that gap by constructing an empirical 95th-percentile bound on ||M_off||_2 and wiring it into a two-stage acceptance rule that explicitly controls false-accept probability under leakage-rate constraints.

## Today's Theory Target
M_off Empirical Bound for Leakage-Aware Structured-mu screening.

## What Changed in the Theory
### Restatement (cleaned)
- Decompose J_onn = J_diag + J_off(t) and define the interconnection operator M_off induced by J_off.
- Build an empirical envelope from matched windows: eta_off^95, rho_off^95, and m_off^95 = 95th percentile of ||M_off||_2.
- Replace the unbounded leakage term with the quantile bound: mu_Delta <= mu_diag + eta_off^95 * m_off^95 (empirical coverage target 0.95).
- Two-stage acceptance: mu_diag < 1/(1 + eta_off^95 * m_off^95) and rho_off^95 <= rho_bar, plus the delay certificate Gamma_hat * c_J^tv < 1.

### Proof Audit (gaps & required assumptions)
- C10 requires quantile transfer across topology regimes; not yet proved (A14/A16 risk).
- C11 depends on finite-sample calibration of m_off^95; add confidence margin delta_m to avoid optimism.
- C12 remains conjectural when Gamma_hat underestimates bursty delay tails.

### Strengthening (new lemma / tighter condition / fix)
- Introduce Lemma L12: quantile transfer test with drift detector and rejection fallback.
- Add confidence-calibrated m_off^95 margin to reduce false accepts.
- Upgrade screening to a two-stage certificate: leakage quantile + rate guard + delay envelope.

## Paper Patch Notes (actionable edits)
- P-106: add C10 quantile-bounded off-diagonal lemma to theory.
- P-107: update screening inequality with m_off^95 and kappa_off term.
- P-108: add empirical protocol for estimating m_off^95 and delta_m.
- P-109: report false-accept/false-reject for static vs two-stage rule.
- P-110: add operational acceptance checklist with rho_off^95 guard.

## New Literature Integrated (>=3)
- Pinheiro & Colon (2024), mu-analysis for time-delay uncertainty, structured-uncertainty alignment. [1]
- Zheng & Zhao (2024), robust H_inf stabilization with uncertain input delay for baseline comparison. [2]
- Mo et al. (2025), Razumikhin ISS small-gain with delay for R1 route support. [3]
- Liao et al. (2024), augmented-variable stability for time-varying delays and Gamma_hat benchmarking. [4]
- Malisoff & Mazenc (2024), local Halanay inequality to frame delay-envelope assumptions. [5]

## Development Actions (next 72 hours)
- Implement M_off estimator in the logging pipeline.
- Compute rolling m_off^95 with delta_m confidence margin.
- Add quantile drift detector for topology-regime shifts.
- Wire two-stage acceptance rule into the handoff gate.
- Add rho_off^95 hard reject branch with audit logging.
- Benchmark static vs two-stage false-accept rates under delay sweeps.
- Run mu vs H_inf comparison on identical sweep grids.
- Instrument detect-to-reject latency and safety override timing.

## Open Problems (carried + new)
- OP-016 (updated): bound ||M_off||_2 with rolling quantile + confidence margin.
- OP-017 (updated): prove quantile transfer under topology regime shift.
- OP-013 (carried): prove/refute structured mu inflation rule under block-coupled uncertainty.
- OP-018 (new): probabilistic guarantee for C11 with finite samples.
- OP-019 (new): bound safety-override actuation latency under delay bursts.

## Next-day Seed
- 2026-02-16: validate C11 on real ONN logs and decide whether C12 can be upgraded from CONJECTURE.

## References (reference-style links only)
[1]: https://doi.org/10.1016/j.jfranklin.2024.01.044
[2]: https://doi.org/10.1016/j.jfranklin.2024.107223
[3]: https://doi.org/10.1016/j.automatica.2025.112111
[4]: https://doi.org/10.3390/math12111638
[5]: https://doi.org/10.3934/mcrf.2023021
