---
title: ONN Daily - 2026-02-11 - Finite-Sample Conservative Envelope
date: 2026-02-11 09:00:00 +0900
last_modified_at: 2026-02-11 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, finite-sample, lipschitz-delay, gamma-hat, delay-envelope]
toc: true
toc_sticky: true
excerpt: Established a finite-sample conservative envelope for Gamma_hat using Lipschitz-in-delay bounds and grounded the acceptance check in recent data-driven delay-stabilization literature.
---

[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily - 2026-02-10](/2026-02-10-onn-daily-delay-amplification-calibration-acceptance-inequality/)

## Context
Yesterday replaced symbolic delay amplification with a calibrated monotone envelope but still lacked a finite-sample conservativeness guarantee. Today locked that gap down with a Lipschitz-in-delay assumption and an explicit sampling-resolution condition.

## Today's Theory Target
Define a finite-sample conservative envelope for `Gamma_hat(Delta t)` using a Lipschitz-in-delay assumption and delay-sweep grid spacing.

## What Changed in the Theory
### Restatement (cleaned)
- Assume `Gamma_delay(Delta t)` is locally Lipschitz on `[0, Delta t_max]` over the guard-active region `Omega_eps`.
- Build a conservative envelope from samples: `Gamma_hat(Delta t) := max_i Gamma_emp(Delta t_i) + L_gamma * h + delta_gamma`.
- Use the finite-sample envelope in the acceptance check: `Gamma_hat(Delta t) * c_J_local < 1` on `Omega_eps`.
- Deep Delta guard enforces `Omega_eps` so the local ONN gain bound applies during calibration and runtime.

### Proof Audit (gaps & required assumptions)
- Require `Gamma_delay` to be `L_gamma`-Lipschitz on `[0, Delta t_max]` for guard-active trajectories.
- Grid spacing `h` must bound interpolation error via `L_gamma * h` plus a confidence margin `delta_gamma`.
- Local ONN gain `c_J_local` must remain valid only on `Omega_eps` (guard stability and anti-chatter needed).
- Guard reliability must be enforced in calibration trials to avoid mixing regimes.

### Strengthening (new lemma / tighter condition / fix)
- New lemma: Lipschitz-in-delay + grid spacing `h` yields a conservative envelope `Gamma_hat` for all delays in the calibrated range.
- Alternative proof path: isotonic regression for a monotone envelope, plus a deterministic Lipschitz margin.
- Practical mapping: estimate `L_gamma` from adjacent delay samples and pick `h` to hit a target slack `epsilon_gamma`.

## Paper Patch Notes (actionable edits)
- `P-210` (`paper/sections/05_theory.typ`): add Lemma 5 + Corollary 5 for finite-sample conservative envelopes and the acceptance inequality with `Gamma_hat`.
- `P-211` (`paper/sections/05_theory.typ`): add a short paragraph on delay-sweep sampling resolution and `L_gamma` estimation.
- `paper/sections/06_experiments.typ`: append a sampling-resolution protocol tying `L_gamma * h` to the acceptance margin.

## New Literature Integrated (>=3)
1. Lu and Xiang, Automatica 179 (2025): model-free stabilization of large-scale systems with time-delays; used to justify data-driven delay bounds supporting `Gamma_hat` calibration.
2. Zhang et al., International Journal of Robust and Nonlinear Control (2025): data-driven stabilization with noisy data; used to motivate `delta_gamma` as a norm-bounded uncertainty margin.
3. Brenag et al., European Journal of Control (2025): quasi-data-driven output feedback with input/state delays; used to support estimating `L_gamma` from open-loop delay data.

## Development Actions (next 72 hours)
1. Estimate `L_gamma` from calibration sweeps and test sensitivity under guard settings.
2. Choose sampling spacing `h` to meet the envelope slack target `epsilon_gamma`.
3. Calibrate `delta_gamma` from repeated trials using percentile-based residuals.
4. Validate `Gamma_hat(Delta t) * c_J_local` against observed instability boundaries.
5. Extend the envelope to jitter by defining `Gamma_hat(Delta t, sigma_dt)` on a 2D grid.

## Open Problems (carried + new)
- [OP-009] Estimate `L_gamma` from data and validate the Lipschitz-in-delay assumption for `Gamma_delay`.
- [OP-008] Finite-sample conservative envelope lemma needs empirical validation for `L_gamma` and `delta_gamma`.
- [OP-007] `delta_gamma` requires a calibrated rule-of-thumb tied to data-driven uncertainty bounds.
- [OP-004] Extend delay theorem to jitter/time-varying delay via a 2D envelope.

## Next-day Seed
2026-02-12: estimate `L_gamma` from delay sweeps and evaluate how sampling spacing `h` shifts the acceptance margin.

## References (reference-style links only)
- [Model-free stabilization for discrete-time large-scale systems with time-delays (Automatica 2025)](https://doi.org/10.1016/j.automatica.2025.112439)
- [Data-Driven Stabilization of Linear Discrete-Time Delay Systems With Noisy Data (IJRNC 2025)](https://doi.org/10.1002/rnc.70196)
- [Quasi-data-driven static output feedback control of linear systems with input and state delays (European Journal of Control 2025)](https://doi.org/10.1016/j.ejcon.2025.101385)
