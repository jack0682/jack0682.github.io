---
title: ONN Daily - 2026-02-10 - Delay-Amplification Calibration Acceptance Inequality
date: 2026-02-10 09:00:00 +0900
last_modified_at: 2026-02-10 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, delay-calibration, small-gain, injected-delay, acceptance-inequality]
toc: true
toc_sticky: true
excerpt: Replaced symbolic delay amplification with a calibrated monotone envelope from injected-delay rollouts and grounded the ONN-ORTSF acceptance inequality with three delay-control literature integrations.
---

[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily - 2026-02-09](/2026-02-09-onn-daily-switching-penalty-local-interface-bound/)

## Context
Yesterday established a computable local ONN->ORTSF certificate $$c_{J,local} = c_{base} + c_{switch}$$ but left $$Gamma_{delay}(Delta t)$$ symbolic. Today focused on converting that delay term into a measurable quantity tied to injected-delay experiments.

## Today's Theory Target
Calibrate delay amplification from injected-delay experiments and convert it into a conservative acceptance inequality that is testable at runtime.

## What Changed in the Theory
### Restatement (cleaned)
- Define empirical amplification by delay sweep: $$Gamma_{emp}(Delta t) := sup_{i} ||e_{i}(Delta t)|| / ||e_{i}(0)||$$.
- Build a conservative monotone envelope: $$Gamma_{hat}(Delta t) = sup_{s \in [0, Delta t]} Gamma_{emp}(s) + delta_{gamma}$$.
- Keep local ONN certificate from prior day: $$c_{J,local} = c_{base} + c_{switch}$$ on active region $$Omega_{eps}$$.
- Replace symbolic acceptance test with calibrated test: $$Gamma_{hat}(Delta t) * c_{J,local} < 1$$.

### Proof Audit (gaps & required assumptions)
- Reproducible injected-delay rollouts are required so $$Gamma_{emp}$$ is statistically stable across seeds and trajectories.
- The envelope fit must be explicitly upper-bounding; under-fit creates false acceptance and invalidates the safety margin.
- Deep Delta guard activation on $$Omega_{eps}$$ must be enforced during calibration and runtime checks to avoid regime mismatch.
- Remaining gap: finite-sample conservativeness bound for $$Gamma_{hat}$$ still needs a formal statement.

### Strengthening (new lemma / tighter condition / fix)
- Introduced a monotone-envelope calibration lemma so delay amplification is measurable instead of symbolic.
- Tightened the interface condition to a runtime-checkable inequality using lookup/interpolation over calibrated bins.
- Added confidence margin $$delta_{gamma}$$ to absorb measurement noise and switching-induced variance.

## Paper Patch Notes (actionable edits)
- `P-208` (`paper/sections/05_theory.typ`): insert Lemma 4 defining empirical delay amplification calibration and monotone envelope construction.
- `P-209` (`paper/sections/05_theory.typ`): insert Corollary 4 replacing $$Gamma_{delay}$$ with $$Gamma_{hat}$$ in the ONN->ORTSF acceptance inequality.
- Add implementation paragraph mapping symbols to logs: delay sweep protocol, ratio extraction, envelope fit artifact, and runtime lookup policy.

## New Literature Integrated (>=3)
1. Wei et al., Systems & Control Letters 193 (2024): periodic event-triggered data-driven control with time-varying delays; used as precedent for data-based delay calibration protocols.
2. Gong et al., Information 16(10) 893 (2025): data-driven event-triggering for discrete time-delay systems; used to justify discrete-time estimation of conservative delay bounds.
3. Fridman and Selivanov, Annual Review of Control, Robotics, and Autonomous Systems 8 (2025): delay-for-control survey; used to frame calibrated delay amplification as standard delay-aware control practice.

## Development Actions (next 72 hours)
1. Implement injected-delay sweep harness to log $$||e(Delta t)|| / ||e(0)||$$ with synchronized seeds.
2. Fit monotone $$Gamma_{hat}$$ via upper-envelope (isotonic/upper-hull) and attach confidence margin $$delta_{gamma}$$.
3. Add runtime lookup/interpolation for $$Gamma_{hat}(Delta t)$$ in the ONN->ORTSF handoff gate.
4. Validate predicted instability boundary against observed failure onset across delay sweep bins.
5. Extend calibration from $$Gamma_{hat}(Delta t)$$ to $$Gamma_{hat}(Delta t, sigma_{dt})$$ for jitter-aware checks.

## Open Problems (carried + new)
- [OP-001] Operational $$c_{J}^{star}$$ still depends on calibrated delay multiplier quality.
- [OP-005] Delay-injection protocol must isolate switching-frequency confounds during calibration.
- [OP-007] Formal confidence accounting for $$Gamma_{hat}$$ remains incomplete.
- [OP-008] New: prove finite-sample conservativeness of monotone envelope fit under noisy trials.

## Next-day Seed
Run the full delay sweep, fit $$Gamma_{hat}$$, and compare inequality predictions with measured instability thresholds under guard switching.

## References (reference-style links only)
- [Periodic event-triggered data-driven control for networked control systems with time-varying delays (SCL 2024)](https://doi.org/10.1016/j.sysconle.2024.105951)
- [Data-Driven Event-Triggering Control of Discrete Time-Delay Systems (Information 2025)](https://doi.org/10.3390/info16100893)
- [Using Delay for Control (Annual Review of Control, Robotics, and Autonomous Systems 2025)](https://doi.org/10.1146/annurev-control-022723-033031)
