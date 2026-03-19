---
title: "ONN Daily — 2026-03-02 — Boundary-safe CI floor + hysteretic guard"
date: 2026-03-02 09:00:00 +0900
last_modified_at: 2026-03-02 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, long-memory, bootstrap-calibration, hysteresis, dwell-time]
toc: true
toc_sticky: true
excerpt: "Falsified the d-independent CI floor near the strong-LRD boundary, replaced it with a dependence-indexed margin, and repaired triple-guard chatter with a hysteresis-plus-cooldown lemma."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily — 2026-03-01 — Impulsive-Surgery Bridge for ORTSF](/2026-03-01-onn-daily-impulsive-surgery-bridge-ortsf/)

## Context

The 2026-02-27 triple-guard repair left two reviewer-visible weak points unresolved: the lower CI floor was still treated as if it remained safe uniformly as the long-memory parameter approached the deployment boundary, and the recalibration branch logic still had no formal protection against rapid threshold chatter. Today's note closed both gaps by replacing the uniform floor with an explicit dependence-indexed safety margin and by recasting the guard as a finite-state hysteresis-plus-cooldown switching rule.

This is a stronger publication position than the prior narrative because it cleanly separates what was falsified, what is now conditionally proved, and what still requires calibration experiments. The source note also tied the repair to CPU-only counterexamples and paper patches, so the blog post can stay close to evidence instead of presenting a generic summary.

## Today’s Theory Target

Target: Boundary-safe CI floor and hysteretic dwell-time repair for the triple guard.

Highest-leverage outcomes today were:
- falsify the d-independent floor claim near $d ≈ 0.45$,
- replace it with $T_{CI}(d) = \underline{c}_{CI} + gamma_{CI}(d, n_{win}, b)$,
- prove a conditional no-one-step-toggle lemma for the repaired branch logic,
- narrow the open-problem list from a vague guarantee request to a specific calibration problem.

Claims hardened today:
- `C92`: the repaired dependence-indexed floor is conservative whenever $gamma_{CI}$ upper-bounds the missing coverage margin,
- `C95`: hysteresis plus cooldown forbids one-step toggling and bounds switch count by $ceil(T / N_{cd})$,
- `C96`: deployment viability now reduces to calibrating false-reject cost instead of defending an already-falsified uniform floor.

## What Changed in the Theory

### Restatement (cleaned)

The correct theorem narrative is no longer "one fixed lower CI floor is safe across the strong-LRD boundary." It is instead: use a repaired floor $T_{CI}(d)$ that explicitly grows with dependence severity, then run the acceptance/fallback branch through a hysteretic score rule with a cooldown counter. This turns the old qualitative reviewer objection into two concrete objects that can be calibrated and tested: $gamma_{CI}(d, n_{win}, b)$ and the pair $(h, N_{cd})$.

### Proof Audit (gaps & required assumptions)

- The repaired floor only stays conservative if $gamma_{CI}(d, n_{win}, b)$ dominates the true extra margin needed near the boundary; this is not calibrated yet.
- The hysteresis lemma depends on bounded score noise $|xi_{t}| < h$ and on cooldown exceeding the lag-burst duration; both remain design assumptions that need logging and stress tests.
- $d$ itself may be observed through a proxy, so any deployed lookup table for $gamma_{CI}$ inherits estimation error.
- The branch rule is a comparator-level stability result, not a full closed-loop control theorem, so chatter suppression does not by itself prove energy or regret bounds.

### Strengthening (new lemma / tighter condition / fix)

- Replaced the failed uniform-floor claim with the conservative repaired threshold $T_{CI}(d)$.
- Promoted $gamma_{CI}(d, n_{win}, b)$ from an implicit fudge factor to the central calibration target.
- Added a hysteresis-plus-cooldown switching lemma that blocks immediate accept/fallback reversals.
- Converted `OP-035` into the more precise margin-fitting task `OP-039` and narrowed `OP-038` to stochastic-lag chatter quantification.

## Paper Patch Notes (actionable edits)

- `P-256`: introduce the dependence-indexed floor $T_{CI}(d) = \underline{c}_{CI} + gamma_{CI}(d, n_{win}, b)$ in the theory section.
- `P-257`: add the hysteresis-plus-cooldown branch lemma and state the bounded-noise / bounded-lag assumptions explicitly.
- `P-258`: add a boundary-margin and chatter stress protocol to experiments, including no-hysteresis and hysteresis-only baselines.
- `P-259`: position the repair against switched-systems dwell-time literature instead of treating the branch rule as an ad hoc engineering fix.

## New Literature Integrated (≥3)

1. Lahiri (2003) grounded the shift from a fixed floor to a dependence-aware calibration margin in standard resampling theory for dependent data.
2. Bucher (2025) supported the need to phrase lower-bound conservatism through explicit block-maxima bootstrap behavior rather than a single constant floor.
3. Cui, Shi, Xu, and Ji (2023) provided average-dwell-time language for turning branch chatter into a countable switching problem.
4. Taousser, Djouadi, and Tomsovic (2022) connected delay-sensitive switching stability to the repaired hysteresis-plus-cooldown narrative.
5. Zhao, Zhang, Shi, and Liu (2012) reinforced the asynchronous-switching caution that motivated the cooldown requirement.

## Development Actions (next 72 hours)

1. Fit a conservative monotone envelope for $gamma_{CI}(d, n_{win}, b)$ on ARFIMA and fGn stress suites.
2. Add unit coverage for monotonicity of the margin lookup and for the no-consecutive-toggle branch invariant.
3. Run false-reject budget sweeps over hysteresis half-width $h$ and cooldown $N_{cd}$.
4. Compare repaired triple guard against no-hysteresis and hysteresis-only baselines.
5. Log lag-burst duration and stale-cache intervals so `A51` and `A52` can be tested instead of assumed.

## Open Problems (carried + new)

- `OP-036`: verify branch-transition stability under recalibration lag with watchdog and TTL coupling.
- `OP-038`: quantify chatter bounds for the triple guard under stochastic lag bursts even after hysteresis and cooldown.
- `OP-039`: calibrate $gamma_{CI}(d, n_{win}, b)$ for $d$ in $[0.35, 0.45]$.
- `OP-040`: validate false-reject cost of the repaired boundary-safe floor on ARFIMA/fGn stress suites.

## Next-day Seed

Calibrate $gamma_{CI}(d, n_{win}, b)$ on ARFIMA and fGn stress grids, then search for the smallest $(h, N_{cd})$ pair that kills chatter without unacceptable false rejects.

## References (reference-style links only)

- [Lahiri, 2003][lahiri-2003]
- [Bucher, 2025][bucher-2025]
- [Cui et al., 2023][cui-2023]
- [Taousser et al., 2022][taousser-2022]
- [Zhao et al., 2012][zhao-2012]

[lahiri-2003]: https://doi.org/10.1007/b97342
[bucher-2025]: https://doi.org/10.1093/jrsssb/qkaf060
[cui-2023]: https://doi.org/10.1007/s11432-022-3659-1
[taousser-2022]: https://doi.org/10.1016/j.ijepes.2021.107456
[zhao-2012]: https://doi.org/10.1016/j.nahs.2012.04.001
