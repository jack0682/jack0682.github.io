---
title: ONN Daily - 2026-02-25 - MC Calibration CI Validity for b_H and L_cp^p
date: 2026-02-25 09:00:00 +0900
last_modified_at: 2026-02-25 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, monte-carlo, calibration, hurst, change-point]
toc: true
toc_sticky: true
excerpt: Formalized a dependence-aware Monte Carlo calibration protocol and CI validity plan that turns b_H and L_cp^p checks into auditable acceptance criteria.
---

[ONN Daily Index](/onn-daily/)

## Context

This entry converts the 2026-02-25 ONN/ORTSF research log into a publish-ready record focused on deployment-grade uncertainty calibration. The day concentrated on converting informal calibration practice into explicit acceptance conditions for Hurst-bias envelopes and change-point lead-time quantiles under dependence and heavy-tail stressors.

## Today's Theory Target

Target: Monte Carlo calibration protocol plus CI validity for $$b_{H}$$ and $$L_{cp}^{p}$$.

Leverage:
- Converts calibration from heuristic tuning to auditable pass/fail constraints.
- Addresses reviewer concerns on dependence-corrected coverage and lead-time confidence intervals.
- Defines falsifiers tied to measurable diagnostics.

Primary claims advanced today: C68-C74.

## What Changed in the Theory

### Restatement (cleaned)

For each noise family $$nu$$, define calibration trials for the Hurst envelope and estimate coverage $$p_{hat,nu}$$. After dependence correction via thinning or block resampling, require a conservative lower bound $$LB_{nu}(alpha_{H}) \ge 1 - alpha_{H}$$. In parallel, estimate $$L_{cp}^{0.95}$$ and certify a dependent-bootstrap CI; accept gating only when CI upper bounds satisfy operational latency constraints.

### Proof Audit (gaps and required assumptions)

Critical assumptions checked:
- Effective independence after thinning (`A38`) for coverage lower bounds.
- Valid dependent-bootstrap CI behavior for $$L_{cp}^{p}$$ (`A39`, `A12`).
- Cross-noise inflation control (`A30`) and sufficient MC depth (`A31`).

Main identified gaps:
- Residual long-range dependence can make binomial lower bounds optimistic.
- Heavy-tail families below practical kurtosis bounds can violate envelope transfer from Gaussian calibration.
- CI under-coverage risk for strong-memory regimes.

### Strengthening (new lemma / tighter condition / fix)

Strengthening introduced today:
- Replace raw trial count with conservative effective count $$n_{eff}$$ when forming lower bounds.
- Restrict cross-noise transfer to bounded-kurtosis families and explicitly calibrate inflation factor $$delta_{kappa}$$.
- Gate acceptance on both envelope coverage and CI upper-bound constraints, not one metric alone.
- Require instrumentation tuple $$(nu, N_{mc}, tau_{thin}, p_{hat,nu}, LB_{nu}, L_{cp}^{0.95}, CI_{cp}^{0.95})$$ for auditability.

## Paper Patch Notes (actionable edits)

- Insert theorem-level acceptance criterion combining $$LB_{nu}(alpha_{H})$$ and CI latency ceiling.
- Add dependence-aware calibration subsection documenting thinning, block bootstrap, and $$n_{eff}$$.
- Add falsifier table for heavy-tail and strong-memory failure cases.
- Add implementation logging schema and validation checks for reproducible audits.

Source patch draft: `daily/patch_notes/2026-02-25_paper_edits.md` in the upstream research workspace.

## New Literature Integrated (>=3)

1. Wegner and Wendler (2024), dependent wild bootstrap for robust change-point procedures in dependent functional series. This supports CI construction under dependence.
2. Takabatake (2024), quasi-likelihood analysis for fractional Brownian motion with drift. This supports drift-aware Hurst calibration assumptions.
3. Portilla, Seuret, and Mondie (2025), robust data-driven control with unknown delay. This informs delay-certification framing for operational gate criteria.

## Development Actions (next 72 hours)

- Run family-stratified Monte Carlo with explicit thinning schedule and log $$n_{eff}$$ per condition.
- Validate CI coverage for $$L_{cp}^{0.95}$$ on ARFIMA and heavy-tail settings, including failure-rate reports.
- Fit and stress-test $$delta_{kappa}$$ under bounded-kurtosis families ($$t_{nu}$$, $$nu \ge 5$$).
- Translate the strengthened acceptance test into paper theorem statements and experiment checklist.

## Open Problems (carried + new)

Carried:
- Dependence-corrected coverage guarantees for $$b_{H}$$ in long-memory regimes.
- Bootstrap CI validity boundary for $$L_{cp}^{p}$$ under strong dependence.
- Practical upper bounds on cross-noise inflation $$delta_{kappa}$$.

New:
- Quantify how conservative $$n_{eff}$$ estimation must be to avoid optimistic lower bounds.
- Determine whether CI-intersection strategy remains stable under drift spikes and heteroskedastic bursts.

## Next-day Seed

Construct a minimal theorem package proving conservative acceptance under bounded-kurtosis plus weak-dependence assumptions, then run a contradiction-driven simulation set to identify the tightest admissible $$delta_{kappa}$$ and block-size regime.

## References

- Wegner, K., and Wendler, M. (2024). Robust change-point detection for functional time series based on U-statistics and dependent wild bootstrap. *Statistical Papers*. https://doi.org/10.1007/s00362-024-01577-7
- Takabatake, T. (2024). Quasi-likelihood analysis of fractional Brownian motion with constant drift under high-frequency observations. *Statistics and Probability Letters*. https://doi.org/10.1016/j.spl.2023.110006
- Portilla, J., Seuret, A., and Mondie, S. (2025). Robust data-driven control for linear discrete-time systems with unknown delay. *IFAC-PapersOnLine*. https://doi.org/10.1016/j.ifacol.2025.10.040
