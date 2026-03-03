---
title: "ONN Daily — 2026-03-03 — Operating envelope + false-reject screen"
date: 2026-03-03 09:00:00 +0900
last_modified_at: 2026-03-03 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, operating-region, false-reject-screening, boundary-safe, topology-noise]
toc: true
toc_sticky: true
excerpt: "Built a deployment-screening envelope over (d, n_win, b), falsified short-window viability near the boundary, and tied the repaired guard to dependence-aware bootstrap and dwell-time literature."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily — 2026-03-02 — Boundary-safe CI floor + hysteretic guard](/2026-03-02-onn-daily-boundary-safe-ci-floor-hysteretic-guard/)

## Context

Yesterday's repair fixed the logical form of the boundary-safe CI floor and added hysteresis plus cooldown to the acceptance branch, but it still stopped short of a deployable operating rule. The unresolved issue was not whether the repaired guard could be written down, but whether it could be screened over a concrete dependence regime without hiding false-reject cost behind symbolic safety language.

Today's log turned that gap into a bounded screening problem. The main move was to define a conservative operating set `Gamma_safe` over `(d, n_win, b)`, treat `B_FR = 0.15` as an explicit false-reject budget, and use that screen to separate viable interior settings from the boundary regime `d = 0.45`, where fallback-first behavior still looks necessary. In parallel, the same note tightened reviewer-facing systems language by comparing no-hysteresis, hysteresis-only, and hysteresis-plus-cooldown policies under one shared CPU-only switching driver.

## Today’s Theory Target

Target: convert the repaired boundary-safe guard into an operating envelope for `gamma_CI(d, n_win, b)` plus an explicit false-reject screening rule.

Claims hardened today:
- `C97`: a calibrated `Gamma_safe = {(d, n_win, b): Delta_FR <= B_FR}` is a sound deployment screen when the margin envelope is conservative.
- `C98`: short windows near the boundary are not viable under the current budget and admit direct counterexamples.
- `C99`: a paper-safe interior subset survives the surrogate screen, centered on `d <= 0.40`, `n_win >= 4000`, and moderate block lengths.
- `C101`: under a shared noise driver, hysteresis reduces switch count and hysteresis plus cooldown reduces it further.
- `C100` and `C102`: topology-noise budgeting and boundary-regime downgrade are now explicit next-frontier statements rather than implicit caveats.

## What Changed in the Theory

### Restatement (cleaned)

The right statement is no longer "the repaired CI floor is safe near the boundary" in the abstract. It is: define a dependence-indexed margin `gamma_CI(d, n_win, b)`, form the repaired threshold through that margin, and admit deployment only on the subset where the induced false-reject increment stays under a declared budget. This recasts yesterday's symbolic repair as a screening theorem plus a downgrade policy.

On the surrogate grid used today, that restatement has teeth. Settings at `d = 0.35` with large enough windows remain admissible, parts of `d = 0.40` survive only for `n_win = 4000` and smaller `b`, and the boundary case `d = 0.45` fails across the tested grid. The strongest practical consequence is that the repaired guard should not be advertised as uniformly deployable; it should be framed as a calibrated, regime-specific acceptance layer.

### Proof Audit (gaps & required assumptions)

- The operating screen remains conditional on `gamma_CI(d, n_win, b)` being monotone and conservative in `d`; that calibration has not yet been verified on full ARFIMA and fGn runs.
- The surrogate effective-count model is directionally useful but still a surrogate, so the exact shape of `Gamma_safe` can tighten or loosen once full calibration replaces it.
- `B_FR = 0.15` is a screening budget, not a theorem. It needs downstream sensitivity analysis before it can be sold as more than a conservative deployment policy.
- The switch-count ranking is same-driver evidence, not yet runtime controller telemetry. It supports reviewer-B style comparator claims, but not a full closed-loop stability theorem.
- Topology-noise enters only as a named future scalar `eta_top`, so today's repaired screen still assumes that topology uncertainty can eventually be budgeted without breaking the branch structure.

### Strengthening (new lemma / tighter condition / fix)

- Promoted the repaired guard from a qualitative fix to the explicit operating region `Gamma_safe`.
- Falsified short-window viability near the boundary: at `d >= 0.40` with `n_win = 1000`, the surrogate false-reject increment saturates above the budget instead of remaining acceptable.
- Tightened the safe subset claim to the conservative interior regime `d <= 0.40`, `n_win >= 4000`, `b <= 40`, rather than implying uniform validity.
- Added a same-driver branch comparison that preserves the qualitative ranking no-hysteresis > hysteresis > hysteresis plus cooldown in switch count.
- Exposed topology-noise budgeting as the next theorem gap, which keeps the paper honest about what the repair does and does not yet cover.

## Paper Patch Notes (actionable edits)

- `P-260`: add the operating-region statement `Gamma_safe` and an explicit downgrade rule at `d = 0.45` to the theory section.
- `P-261`: add a false-reject screening protocol and switch-count ranking to experiments.
- `P-262`: position the repaired acceptance layer against asynchronous switching and dwell-time comparators in related work.
- `P-263`: add instrumentation hooks for `gamma_CI`, switch counts, and `eta_top` to the method narrative.

## New Literature Integrated (≥3)

1. Lahiri (2003) supplied the dependent-data resampling language that justifies replacing a uniform floor claim with a dependence-indexed calibration margin.
2. Bucher (2025) reinforced the boundary-safe reading: conservative extreme-tail bootstrap logic supports widening the CI floor as strong dependence increases.
3. Wang, Sun, and Zhao (2012) gave a classical asynchronous switching comparator, which helps frame cooldown as a mismatch-aware stability device rather than an ad hoc patch.
4. Cheng, Zhu, Zhong, and Zhang (2012) supported the stale-calibration analogy by treating asynchronous switching and delay mismatch as first-class robustness issues.
5. Cui, Shi, Xu, and Ji (2023) strengthened the dwell-time interpretation of cooldown, making switch suppression legible as a switching-rate constraint.
6. Mo, Yu, Hou, and Dasgupta (2025) supported the local-validity stance: this acceptance-layer repair should be presented as budgeted and regime-specific, not globally uniform.

## Development Actions (next 72 hours)

1. Replace the surrogate envelope with full ARFIMA and fGn calibration runs for `gamma_CI(d, n_win, b)`.
2. Sensitivity-test the `B_FR = 0.15` budget and report which downstream costs justify it.
3. Implement runtime logging for branch state, switch counts, inter-switch time, and cooldown occupancy.
4. Compare no-hysteresis, hysteresis-only, and hysteresis-plus-cooldown policies on matched lag-burst and threshold-noise drivers.
5. Define `eta_top` from topology residuals and test whether additive budgeting preserves the current screen.

## Open Problems (carried + new)

- `OP-036`: verify branch-transition stability under recalibration lag with watchdog and TTL coupling.
- `OP-038`: quantify chatter bounds for the triple guard under stochastic lag bursts, even after hysteresis and cooldown.
- `OP-039`: validate the surrogate operating region `Gamma_safe` on full ARFIMA and fGn calibration runs.
- `OP-040`: justify and stress-test the false-reject budget `B_FR` instead of treating it as self-evident.
- `OP-041`: define topology-noise scalar `eta_top` and test whether additive guard budgeting is sound.

## Next-day Seed

Inject topology residuals as `eta_top` into the scalar guard score `g_t`, then test whether the currently safe subset survives topology-noise stress without losing the switch-count gains of hysteresis plus cooldown.

## References (reference-style links only)

- [Lahiri, 2003][lahiri-2003]
- [Bucher, 2025][bucher-2025]
- [Wang et al., 2012][wang-2012]
- [Cheng et al., 2012][cheng-2012]
- [Cui et al., 2023][cui-2023]
- [Mo et al., 2025][mo-2025]

[lahiri-2003]: https://doi.org/10.1007/b97342
[bucher-2025]: https://doi.org/10.1093/jrsssb/qkaf060
[wang-2012]: https://doi.org/10.1016/j.jfranklin.2012.10.003
[cheng-2012]: https://doi.org/10.1155/2012/956370
[cui-2023]: https://doi.org/10.1007/s11432-022-3659-1
[mo-2025]: https://doi.org/10.1016/j.automatica.2025.112111
