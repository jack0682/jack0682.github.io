---
title: "ONN Daily - 2026-02-15 - M_off Empirical Bound for Leakage-Aware Structured-mu"
date: 2026-02-15 09:00:00 +0900
last_modified_at: 2026-02-15 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, m-off, structured-mu, leakage, empirical-bound]
toc: true
toc_sticky: true
excerpt: "Quantile-calibrated M_off bounds replaced the unbounded leakage term, enabling a two-stage structured-mu acceptance rule and tying the certificate to recent delay-robust control literature."
---

[ONN Daily Index](/onn-daily/) | [Previous: 2026-02-14 - Time-Varying Leakage Certificate](/2026-02-14-onn-daily-time-varying-leakage-certificate/)

## Context
Today closes the missing bridge between leakage statistics (eta_off, rho_off) and the structured-mu acceptance rule. The main deliverable is an empirical M_off envelope that makes the screening rule measurable and answers the reviewer kill-shot on unbounded off-diagonal gain.

## Today's Theory Target
M_off Empirical Bound for Leakage-Aware Structured-mu.

## What Changed in the Theory
### Restatement (cleaned)
- Keep the decomposition J_onn = J_diag + J_off(t) and define the interconnection channel M_off.
- Calibrate empirical envelopes: eta_off^95, rho_off^95, and m_off^95 = 95th percentile of ||M_off||_2.
- Replace the unbounded term with an empirical coverage statement: mu_Delta(M) <= mu_diag + eta_off^95 * m_off^95 (95% matched-window coverage).
- Two-stage acceptance rule: mu_diag < 1/(1 + eta_off^95 * m_off^95) and rho_off^95 <= rho_bar.
- Delay coupling still required: Gamma_hat(Delta t, sigma_dt) * c_J^tv < 1.

### Proof Audit (gaps & required assumptions)
- C10 depends on A11/A14/A16; quantile transfer breaks under regime shift.
- C11 remains NEEDS-EXPERIMENT because m_off^95 can be underestimated in heavy tails.
- C12 stays CONJECTURE until delay bursts are bounded by Gamma_hat.

### Strengthening (new lemma / tighter condition / fix)
- Isolate quantile-transfer risk as Lemma L12 and require stratified calibration per topology regime.
- Add a confidence margin delta_m to m_off^95 when sample counts are low.
- Replace the single inequality with the two-stage certificate (mu + rho_off^95 guard).

## Paper Patch Notes (actionable edits)
- P-106: add C10 quantile-bounded off-diagonal lemma.
- P-107: update screening inequality to include m_off^95.
- P-108: add protocol to estimate m_off^95 plus confidence margin delta_m.
- P-109: add false-accept/false-reject reporting for static vs two-stage rule.
- P-110: add operational acceptance checklist with rho_off^95 guard.

## New Literature Integrated (>=3)
- Pinheiro and Colon (2024), structured-mu with delay uncertainty and practical computation. [1]
- Zheng and Zhao (2024), robust H_inf stabilization under uncertain input delay. [2]
- Mo et al. (2025), small-gain ISS Lyapunov framing for time-delay systems. [3]
- Liao et al. (2024), augmented-variable stability analysis for time-varying delay. [4]

## Development Actions (next 72 hours)
- Implement M_off estimator in the logging pipeline.
- Compute rolling m_off^95 with confidence margins.
- Add drift detector for quantile transfer.
- Add two-stage acceptance in the handoff gate.
- Add rho_off^95 hard-reject branch.
- Benchmark static vs two-stage false accepts.

## Open Problems (carried + new)
- OP-016 (updated): bound ||M_off||_2 with rolling quantile + confidence margin.
- OP-017 (updated): quantile transfer under topology regime shift.
- OP-013 (updated): replace old rule with two-stage rule including m_off^95.
- OP-018 (new): prove probabilistic guarantee for C11 with finite samples.
- OP-019 (new): bound safety-override actuation latency under delay bursts.

## Next-day Seed
Validate C11 on real ONN logs and decide whether C12 can be upgraded from CONJECTURE.

## References (reference-style links only)
[1]: https://doi.org/10.1016/j.jfranklin.2024.01.044
[2]: https://doi.org/10.1016/j.jfranklin.2024.107223
[3]: https://doi.org/10.1016/j.automatica.2025.112111
[4]: https://doi.org/10.3390/math12111638
