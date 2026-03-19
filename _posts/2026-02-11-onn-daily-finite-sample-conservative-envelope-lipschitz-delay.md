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
Define a finite-sample conservative envelope for $$Gamma_{hat}(Delta t)$$ using a Lipschitz-in-delay assumption and delay-sweep grid spacing.

## What Changed in the Theory
### Restatement (cleaned)
- Assume $$Gamma_{delay}(Delta t)$$ is locally Lipschitz on $$[0, Delta t_{max}]$$ over the guard-active region $$Omega_{eps}$$.
- Build a conservative envelope from samples: $$Gamma_{hat}(Delta t) := max_{i} Gamma_{emp}(Delta t_{i}) + L_{gamma} * h + delta_{gamma}$$.
- Use the finite-sample envelope in the acceptance check: $$Gamma_{hat}(Delta t) * c_{J,local} < 1$$ on $$Omega_{eps}$$.
- Deep Delta guard enforces $$Omega_{eps}$$ so the local ONN gain bound applies during calibration and runtime.

### Proof Audit (gaps & required assumptions)
- Require $$Gamma_{delay}$$ to be $$L_{gamma}$$-Lipschitz on $$[0, Delta t_{max}]$$ for guard-active trajectories.
- Grid spacing $$h$$ must bound interpolation error via $$L_{gamma} * h$$ plus a confidence margin $$delta_{gamma}$$.
- Local ONN gain $$c_{J,local}$$ must remain valid only on $$Omega_{eps}$$ (guard stability and anti-chatter needed).
- Guard reliability must be enforced in calibration trials to avoid mixing regimes.

### Strengthening (new lemma / tighter condition / fix)
- New lemma: Lipschitz-in-delay + grid spacing $$h$$ yields a conservative envelope $$Gamma_{hat}$$ for all delays in the calibrated range.
- Alternative proof path: isotonic regression for a monotone envelope, plus a deterministic Lipschitz margin.
- Practical mapping: estimate $$L_{gamma}$$ from adjacent delay samples and pick $$h$$ to hit a target slack $$epsilon_{gamma}$$.

## Paper Patch Notes (actionable edits)
- `P-210` (`paper/sections/05_theory.typ`): add Lemma 5 + Corollary 5 for finite-sample conservative envelopes and the acceptance inequality with $$Gamma_{hat}$$.
- `P-211` (`paper/sections/05_theory.typ`): add a short paragraph on delay-sweep sampling resolution and $$L_{gamma}$$ estimation.
- `paper/sections/06_experiments.typ`: append a sampling-resolution protocol tying $$L_{gamma} * h$$ to the acceptance margin.

## New Literature Integrated (>=3)
1. Lu and Xiang, Automatica 179 (2025): model-free stabilization of large-scale systems with time-delays; used to justify data-driven delay bounds supporting $$Gamma_{hat}$$ calibration.
2. Zhang et al., International Journal of Robust and Nonlinear Control (2025): data-driven stabilization with noisy data; used to motivate $$delta_{gamma}$$ as a norm-bounded uncertainty margin.
3. Brenag et al., European Journal of Control (2025): quasi-data-driven output feedback with input/state delays; used to support estimating $$L_{gamma}$$ from open-loop delay data.

## Development Actions (next 72 hours)
1. Estimate $$L_{gamma}$$ from calibration sweeps and test sensitivity under guard settings.
2. Choose sampling spacing $$h$$ to meet the envelope slack target $$epsilon_{gamma}$$.
3. Calibrate $$delta_{gamma}$$ from repeated trials using percentile-based residuals.
4. Validate $$Gamma_{hat}(Delta t) * c_{J,local}$$ against observed instability boundaries.
5. Extend the envelope to jitter by defining $$Gamma_{hat}(Delta t, sigma_{dt})$$ on a 2D grid.

## Open Problems (carried + new)
- [OP-009] Estimate $$L_{gamma}$$ from data and validate the Lipschitz-in-delay assumption for $$Gamma_{delay}$$.
- [OP-008] Finite-sample conservative envelope lemma needs empirical validation for $$L_{gamma}$$ and $$delta_{gamma}$$.
- [OP-007] $$delta_{gamma}$$ requires a calibrated rule-of-thumb tied to data-driven uncertainty bounds.
- [OP-004] Extend delay theorem to jitter/time-varying delay via a 2D envelope.

## Next-day Seed
2026-02-12: estimate $$L_{gamma}$$ from delay sweeps and evaluate how sampling spacing $$h$$ shifts the acceptance margin.

## References (reference-style links only)
- [Model-free stabilization for discrete-time large-scale systems with time-delays (Automatica 2025)](https://doi.org/10.1016/j.automatica.2025.112439)
- [Data-Driven Stabilization of Linear Discrete-Time Delay Systems With Noisy Data (IJRNC 2025)](https://doi.org/10.1002/rnc.70196)
- [Quasi-data-driven static output feedback control of linear systems with input and state delays (European Journal of Control 2025)](https://doi.org/10.1016/j.ejcon.2025.101385)
