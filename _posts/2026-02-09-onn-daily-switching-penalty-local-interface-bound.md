---
title: ONN Daily - 2026-02-09 - Computable Switching-Penalty Local Interface Bound
date: 2026-02-09 09:00:00 +0900
last_modified_at: 2026-02-09 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, switching-penalty, delay-small-gain, deep-delta, guard-smoothing]
toc: true
toc_sticky: true
excerpt: Derived a computable switching-penalty certificate for guarded Deep Delta updates and integrated 2024 switching and delay literature into a runtime ONN-ORTSF acceptance inequality.
---

[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily - 2026-02-08](/2026-02-08-onn-daily-nonexpansive-logos-update-cj-bound/)

## Context
Yesterday established local switching assumptions and identified the missing operational gap: a measurable switching penalty that can be used directly in ONN->ORTSF handoff checks under delay.

## Today's Theory Target
Derive a computable bound for switching penalty in the guarded Deep Delta map and convert it into a local ONN->ORTSF interface inequality.

## What Changed in the Theory
### Restatement (cleaned)
- Smoothed guard map: `T_sigma(x) = (1 - sigma(x))x + sigma(x)T_delta(x)`.
- Active-region envelope: `R_delta = sup_{x in Omega_eps} ||T_delta(x) - x||`.
- Switching penalty: `c_switch = L_sigma * R_delta`.
- Local gain certificate: `c_J_local = c_base + c_switch`, where `c_base = max(c_id, c_delta)`.
- Runtime interface condition: accept ONN->ORTSF handoff when `Gamma_delay(Delta t) * c_J_local < 1`.

### Proof Audit (gaps & required assumptions)
- Require Lipschitz guard smoothness on `Omega_eps`: `sigma` must have bounded slope `L_sigma`.
- Require finite residual envelope: `R_delta` must remain bounded over active windows.
- Require online delay amplification estimate: `Gamma_delay(Delta t)` must be measurable at runtime.
- Failure mode clarified: hard threshold guards can violate Jacobian bounds at transition boundaries.

### Strengthening (new lemma / tighter condition / fix)
- Added computable bound: `||J_sigma(x)||_2 <= c_base + L_sigma ||T_delta(x)-x|| <= c_base + c_switch`.
- Tightened ONN->ORTSF contract from static/global wording to local/measurable inequality.
- Converted qualitative switching argument into theorem-ready quantities (`L_sigma`, `R_delta`, `Gamma_delay`).

## Paper Patch Notes (actionable edits)
- `P-206` (`paper/sections/05_theory.typ`): after guarded-switching lemma, insert explicit definition `c_switch = L_sigma * R_delta` and computable Jacobian bound.
- `P-207` (`paper/sections/05_theory.typ`): after local-switching corollary, add runtime acceptance rule `Gamma_delay(Delta t) * (c_base + c_switch) < 1`.
- Add implementation note mapping symbols to logs: guard slope estimator, residual envelope tracker, and delay amplification probe.

## New Literature Integrated (>=3)
- Ochoa, Espitia, Poveda (2024): prescribed-time stability for switching systems with resets, used to justify guard-transition timing envelopes.
- Gershon, Allerhand, Shaked (2024): robust control for time-delayed stochastic switched systems with dwell, used to motivate delay-aware switched acceptance checks.
- Balsells-Rodas, Wang, Li (ICML 2024): identifiability of switching dynamical systems, used for diagnostics when mode recoverability degrades.
- Weber et al. (2024 survey): learning-control co-design framing used for ONN/ORTSF interface positioning.

## Development Actions (next 72 hours)
1. Implement online `L_sigma` estimator from guard-output finite differences.
2. Add rolling `R_delta` envelope tracker on active windows.
3. Enforce runtime ONN->ORTSF guard: `Gamma_delay(Delta t) * (c_base + c_switch) < 1` with fallback path.
4. Run injected-delay calibration for `Gamma_delay(Delta t)` and compare predicted vs observed instability onset.

## Open Problems (carried + new)
- [OP-001] Operational `c_J^star` under switching penalties remains open; now parameterized by `c_base + c_switch`.
- [OP-006] Tightness proof for `c_switch = L_sigma * R_delta` remains open.
- [OP-007] Empirical-to-formal calibration for `Gamma_delay(Delta t)` remains open.
- [RESOLVED] [OP-002] Variable-composition bound is now established under smooth-gate assumptions.

## Next-day Seed
Calibrate `Gamma_delay(Delta t)` from injected-delay experiments and validate the local acceptance inequality against measured instability thresholds.

## References (reference-style links only)
- [Prescribed-time stability in switching systems with resets (SCL 2024)](https://doi.org/10.1016/j.sysconle.2024.105910)
- [Robust control of time-delayed stochastic switched systems with dwell (SCL 2024)](https://doi.org/10.1016/j.sysconle.2024.105934)
- [On the Identifiability of Switching Dynamical Systems (ICML 2024)](https://proceedings.mlr.press/v235/balsells-rodas24a.html)
- [Combining federated learning and control: A survey (IET CTA 2024)](https://doi.org/10.1049/cth2.12761)
