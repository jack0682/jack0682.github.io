---
title: "ONN Daily — 2026-03-01 — Impulsive-Surgery Bridge for ORTSF"
date: 2026-03-01 09:00:00 +0900
last_modified_at: 2026-03-01 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, impulsive-systems, topology-surgery, q-hat, trajectory-gap]
toc: true
toc_sticky: true
excerpt: "Bridged the frozen-topology ORTSF delay theorem to active topology surgery by reframing runtime behavior as an impulsive perturbation problem with measurable q_hat, sigma_surg, and N_tau diagnostics."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily — 2026-02-28 — Delay-margin repair for ORTSF](/2026-02-28-onn-daily-delay-margin-repair-ortsf/)

## Context

Yesterday's repair narrowed the proof-backed ORTSF delay claim to a frozen-topology semantic flow, but it left the implementation story exposed because active topology surgery was still operating outside the theorem. Today's work closed that narrative gap by recasting the runtime system as a nominal delayed flow plus bounded surgery-induced perturbations instead of pretending the whole active pipeline is one smooth delayed gradient system.

The central risk was reviewer-visible: the paper could still look internally inconsistent if the theorem certified frozen topology while the implementation narrative implicitly claimed stability under active LOGOS and Deep Delta surgery. The publishable move, therefore, was not to overclaim a hybrid theorem, but to make the missing bridge explicit and measurable.

## Today’s Theory Target

Target: Impulsive-Surgery Bridge for ORTSF.

Highest-leverage goals today were:
- operationalize yesterday's abstract Razumikhin factor as a measurable `q_hat` monitor,
- model active topology surgery as an impulsive disturbance channel,
- define a trajectory-gap target that can be tested before a full hybrid theorem exists.

Claims hardened today:
- `C5`: runtime admissibility should be expressed through `tau < 1 / (L sqrt(q_hat))` only when `q_hat` is a safe upper envelope for the true history ratio,
- `C6`: active-surgery dynamics are better modeled as frozen-topology delay flow plus discrete perturbation events,
- `C7`: the next theorem target is a trajectory-gap bound of the form `d_traj(t) <= c_0 e^(-tilde_mu t) d_traj(0) + c_1 N_tau(t) sigma_surg`.

## What Changed in the Theory

### Restatement (cleaned)

The proof-backed theorem remains a frozen-topology certificate, but it now sits inside a larger runtime picture. Let `S_f(t)` denote the frozen-topology delayed semantic trajectory and `S_a(t)` the active-surgery trajectory. Then the disciplined extension is to treat `S_a` as the nominal delayed flow plus surgery events, rather than to claim that one global smoothness argument already covers rewiring, perturbation, and delay together.

### Proof Audit (gaps & required assumptions)

- `q_hat` is only useful if telemetry plus a slack term can upper-bound the true Razumikhin history ratio; otherwise runtime admissibility is unsafe.
- The bridge needs an explicit per-event perturbation bound `sigma_surg`; that constant is not yet logged or proved.
- The event count `N_tau(t)` inside one delay window must be finite and instrumented, not merely assumed.
- Connectivity remains a hard guardrail because `mu = lambda_2(L_G)` must stay positive for the theorem narrative to remain meaningful.
- The active-surgery decomposition is plausible from the current LOGOS / Deep Delta update story, but its constants are still conjectural rather than theorem-backed.

### Strengthening (new lemma / tighter condition / fix)

- Reframed the implementation theorem gap as a bounded-impulse bridge, which cleanly separates nominal proof scope from runtime behavior.
- Promoted `q_hat^+ = q_hat + e_q` as the safer monitoring target for any future admissibility checker.
- Added the explicit trajectory-gap observable `d_traj(t) = ||S_a(t) - S_f(t)||`, which gives the next theorem and experiment a shared object.
- Converted the vague active-surgery extension into a concrete conjecture parameterized by `sigma_surg` and `N_tau(t)`.

## Paper Patch Notes (actionable edits)

- `P-004`: insert an active-surgery bridge paragraph after the repaired frozen-topology theorem, stating that runtime surgery should be treated as an impulsive perturbation channel.
- `P-005`: expand the limitations section so it explicitly says the proof-backed delay certificate applies only to frozen topology, requires measurable surrogates such as `q_hat`, and depends on one unit-checked delay calculator.
- `P-006`: add impulsive delayed-system and topology-control literature to related work so the bridge is grounded in exact references instead of intuition.

## New Literature Integrated (≥3)

1. Chaillet, Pogromsky, and Ruffer (2013): supplied the incremental delayed-systems viewpoint that makes `d_traj` the right bridge object rather than a secondary diagnostic.
2. Chen and Zheng (2008): provided the delayed impulsive-systems abstraction that matches active topology surgery more cleanly than a single smooth delayed-gradient narrative.
3. Kang and Fridman (2025): reinforced the scope boundary between a narrow reduced theorem and a broader delay-robust control story.
4. Sanniti et al. (2022): kept curvature language tied to explicit control-side interpretation rather than informal stability rhetoric.
5. Li, Gao, Yin, and Lin (2026): clarified that explicit topology-control terms are compatible with the paper's story but do not themselves certify delayed stability.

## Development Actions (next 72 hours)

1. Implement dense semantic-energy logging and compute a conservative `q_hat^+`.
2. Log every topology surgery event with pre/post semantic norm deltas to estimate `sigma_surg`.
3. Log `lambda_2(L_G)` after each topology update to preserve a proof-aware connectivity watchdog.
4. Build frozen-topology and active-surgery replay modes with matched seeds so `d_traj(t)` can be measured directly.
5. Test whether the observed trajectory gap scales with `N_tau(t) sigma_surg` strongly enough to justify a formal theorem attempt.

## Open Problems (carried + new)

- `OP-001`: replace empirical `q_hat` with a replay-calibrated conservative envelope `q_hat^+`.
- `OP-002`: upgrade the active-surgery extension into an impulsive delayed-system theorem.
- `OP-003`: route every numerical delay claim through one tested shared calculator.
- `OP-004`: determine whether curvature and homology terms preserve the local smoothness assumptions used by the frozen-topology proof.
- `OP-005`: derive a discrete-time variant that includes event-triggered surgery.
- `OP-006`: bound cumulative perturbation through `N_tau(t) sigma_surg`.
- `OP-007`: build a connectivity watchdog with proof-aware failure reporting.

## Next-day Seed

Estimate `q_hat^+`, `sigma_surg`, and `N_tau(t)` from replayed delayed trajectories, then test whether the conjectured trajectory-gap bound is numerically defensible before drafting any hybrid-systems theorem language.

## References (reference-style links only)

- [Chaillet, Pogromsky, and Ruffer, 2013][chaillet-2013]
- [Chen and Zheng, 2008][chen-zheng-2008]
- [Kang and Fridman, 2025][kang-fridman-2025]
- [Sanniti et al., 2022][sanniti-2022]
- [Li et al., 2026][li-2026]

[chaillet-2013]: https://doi.org/10.1109/CDC.2013.6760110
[chen-zheng-2008]: https://doi.org/10.1109/CDC.2008.4738837
[kang-fridman-2025]: https://doi.org/10.1007/978-981-96-6344-6
[sanniti-2022]: https://doi.org/10.1109/TPWRS.2022.3184189
[li-2026]: https://arxiv.org/abs/2602.13856
