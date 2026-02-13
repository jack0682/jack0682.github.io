---
title: "ONN Daily - 2026-02-13 - Leakage-Aware Structured-mu Screening"
date: 2026-02-13 09:00:00 +0900
last_modified_at: 2026-02-13 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, leakage, structured-mu, screening, stability]
toc: true
toc_sticky: true
excerpt: "Established a leakage-aware correction to the ONN stability certificate (c_J^eff = c_diag + c_off) and tied it to structured-mu screening while integrating new delay-robustness literature."
---

[ONN Daily Index](/onn-daily/) | [Previous: 2026-02-12 - MIMO mu Acceptance Inequality](/2026-02-12-onn-daily-mimo-mu-acceptance-inequality/)

## Context
Today extends the ONN/ORTSF handoff criterion by explicitly measuring off-diagonal coupling in the ONN Jacobian and folding it into a conservative stability screen. The goal is to avoid false accepts caused by block-diagonal-only certificates and to align the acceptance rule with what JVP logs actually reveal.

## Today's Theory Target
**Leakage-Aware Structured-mu Screening** - convert empirical leakage (eta_off) into a conservative correction for the structured-mu acceptance check, while preserving the existing block-based decomposition.

## What Changed in the Theory
### Restatement (cleaned)
- Decompose the Jacobian into block and off-diagonal parts: J = J_blk + J_off.
- Define c_diag = sup ||J_blk||_2, c_off = sup ||J_off||_2 on Omega_eps.
- Leakage ratio: eta_off = c_off / max(c_diag, epsilon_c).
- Conservative effective bound: c_J^eff = c_diag + c_off = c_diag(1 + eta_off).
- Updated handoff check: Gamma_hat(Delta t, sigma_dt) * c_J^eff < 1.

### Proof Audit (gaps & required assumptions)
- C4 (norm subadditivity) holds and justifies c_J^eff.
- Mapping c_off into a structured uncertainty block for mu-based screening remains conjectural and requires assumptions on time variation and block-basis stability.
- Non-normal transient amplification remains a risk if J_off is ignored; any screening must report eta_off alongside diagonal block gains.

### Strengthening (new lemma / tighter condition / fix)
- Lemma L10: Treat J_off as a bounded additive perturbation with measured c_off and enforce the leakage-inflated bound in acceptance.
- Practical fix: use eta_off^95 instead of a point estimate and require Omega_eps coverage >= 95% when computing c_off.

## Paper Patch Notes (actionable edits)
- Add Definition 9 and Lemma 9 introducing J_off, c_off, and eta_off, plus the conservative certificate c_J^eff (P-217D).
- Add Remark 9 illustrating the 2x2 swap counterexample that defeats diagonal-only screening (P-217D).
- Add coupling-leakage diagnostic and eta_off^95 reporting protocol in experiments (P-218D).
- Retain D-scaling mu upper-bound recipe for block-structured Delta_J (P-217/P-218).

## New Literature Integrated (>=3)
- Mondal & Samal (2024) on Bakry-Emery-Ricci curvature as an alternative geometry signal for module partitioning. [1]
- Mo, Yu, Hou, Dasgupta (2025) on Razumikhin ISS small-gain results for discrete time-delay systems. [2]
- Dlapa (2024) on evolutionary mu-synthesis approaches for robust control screening. [3]

## Development Actions (next 72 hours)
- Implement c_off estimator from JVP logs and log eta_off distributions.
- Compute eta_off^95 and wire the conservative screening 1/(1+eta_off^95).
- Extend mu computation to include a leakage uncertainty block and compare with H_inf.
- Run delay-sweep validation against the inflated bound to quantify false-accept reduction.
- Add non-normal transient amplification diagnostic to the stability dashboard.
- Validate Omega_eps coverage and alert if it drops below 95%.

## Open Problems (carried + new)
- OP-013 (updated): Prove or refute mu_diag < 1/(1+eta_off) under block-coupled uncertainty with explicit Delta_off modeling.
- OP-014 (new): Bound time variation of J_off to justify static leakage modeling.
- OP-012 (carried): Empirical target eta_off^95 <= 0.25 remains unverified.
- OP-011 (carried): Validate mu vs H_inf on the same delay sweeps.

## Next-day Seed
- 2026-02-14: compute eta_off^95 from fresh ONN logs and compare inflated screening with observed instability boundary.

## References (reference-style links only)
[1]: https://doi.org/10.1093/comnet/cnae019
[2]: https://doi.org/10.1016/j.automatica.2025.112111
[3]: https://doi.org/10.1016/j.ifacol.2024.10.295
