---
title: "ONN Daily — 2026-03-04 — Additive topology-noise budget + cell-wise eta_top tolerance"
date: 2026-03-04 09:00:00 +0900
last_modified_at: 2026-03-04 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, topology-noise, eta-top, cell-wise-tolerance, hysteretic-guard]
toc: true
toc_sticky: true
excerpt: "Converted topology residuals into an additive guard budget with a cell-wise tolerance cap, disproved any safe global allowance, and grounded the repair with topology-robust learning and switching-topology literature."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily — 2026-03-03 — Operating envelope + false-reject screen](/2026-03-03-onn-daily-operating-envelope-false-reject-screen/)

## Context

Yesterday's operating envelope made the repaired hysteretic guard deployable only on a screened subset of $$(d, n_{win}, b)$$, but it still treated topology uncertainty as an unnamed caveat. That left a direct reviewer gap: the branch logic had no explicit way to say how persistent-homology or curvature mismatch shrinks the previously safe region.

Today's log closes that gap at the screening level. The main move is to inject a nonnegative topology budget $$eta_{top}$$ into the false-reject surrogate, define the topology-aware viable set $$Gamma_{safe}^{top}(d, n_{win}, b, eta_{top})$$, and replace any universal tolerance story with a cell-wise cap $$eta_{top}^{max}(d, n_{win}, b)$$. The result is narrower than a control theorem, but it is concrete enough to patch the theory section, drive instrumentation, and block overclaiming on already tight boundary cells.

## Today’s Theory Target

Target: add an additive topology-noise budget to the repaired hysteretic guard and derive a cell-wise tolerance screen.

Claims hardened today:
- `C103`: if topology residuals enter additively, the safe region contracts to $$Gamma_{safe}^{top}$$ with an explicit cap $$eta_{top}^{max}(d, n_{win}, b)$$.
- `C104`: any single global allowance such as $$eta_{top} \le 0.01$$ is unsafe.
- `C105`: interior cells with moderate dependence and large windows can retain nontrivial topology tolerance.
- `C106`: scalarization through $$eta_{top} = w_{PH} r_{PH} + w_{kappa} r_{kappa}$$ is still only a conjectural bridge.
- `C107`: topology stress invalidates already tight cells first.
- `C108`: deployment should store $$eta_{top}^{max}$$ per calibration cell instead of using one cap.

## What Changed in the Theory

### Restatement (cleaned)

The repaired screen is no longer only a function of dependence, window length, and block length. It becomes

$$
Delta_{FR}^{top}(d, n_{win}, b, eta_{top}) = min(0.25, 0.01 + 0.8 (gamma_{CI}(d, n_{win}, b) + eta_{top}) + 0.005 (20 / b))
$$

with deployment admitted only when $$Delta_{FR}^{top} \le B_{FR}$$. For unsaturated cells this yields the explicit tolerance rule

$$eta_{top} \le eta_{top}^{max}(d, n_{win}, b) = max(0, (B_{FR} - 0.01 - 0.005 (20 / b)) / 0.8 - gamma_{CI}(d, n_{win}, b))$$.

That reformulation matters because it turns topology uncertainty from an informal warning into a quantity that can preserve, shrink, or eliminate safe cells in a way the paper can state precisely.

### Proof Audit (gaps & required assumptions)

- The contraction result still depends on additive monotonicity: $$eta_{top}$$ must upper-bound topology mismatch without multiplicative or sign-changing effects.
- $$eta_{top}^{max}$$ inherits the surrogate risk in $$gamma_{CI}(d, n_{win}, b)$$, so the numerical cap can move once full ARFIMA and fGn calibration replaces today's approximation.
- The scalarization $$eta_{top} = w_{PH} r_{PH} + w_{kappa} r_{kappa}$$ has no domination proof yet, so it remains a measurement hypothesis rather than a theorem premise.
- Saturation at $$0.25$$ means the screen is only informative away from already failed boundary cells; this is why today's result is a screening lemma, not a global stability guarantee.
- Runtime code still does not expose $$r_{PH}$$, $$r_{kappa}$$, $$eta_{top}$$, or $$eta_{top}^{max}$$, so the theory advance is paper-ready before it is implementation-ready.

### Strengthening (new lemma / tighter condition / fix)

- Added the four-variable safe region $$Gamma_{safe}^{top}$$, making topology-noise stress part of the acceptance rule instead of a future caveat.
- Derived a cell-wise tolerance cap $$eta_{top}^{max}(d, n_{win}, b)$$ and used it to show why a universal topology allowance fails.
- Produced direct counterexamples: $$(d = 0.40, n_{win} = 4000, b = 40)$$ and $$(d = 0.35, n_{win} = 2000, b = 80)$$ both cross the $$B_{FR} = 0.15$$ budget at $$eta_{top} = 0.01$$.
- Preserved a usable interior: $$(d = 0.35, n_{win} = 4000, b = 20)$$ still stays below budget up to $$eta_{top} = 0.08$$, so the repair is selective rather than uniformly fatal.
- Tightened the deployment story from "topology-aware guard exists" to "topology-aware guard requires per-cell tolerance lookup and zero-tolerance alarms near the boundary."

## Paper Patch Notes (actionable edits)

- `P-264`: add $$Gamma_{safe}^{top}$$ and the explicit $$eta_{top}^{max}(d, n_{win}, b)$$ formula to the theory section.
- `P-265`: add a topology-residual stress protocol and an $$eta_{top}^{max}$$ heatmap requirement to experiments.
- `P-266`: add runtime hooks for $$r_{PH}$$, $$r_{kappa}$$, $$eta_{top}$$, and $$eta_{top}^{max}$$ to the method narrative.
- `P-267`: position topology-robust learning and switching-topology delay observers as comparator literature, not as proof substitutes.

## New Literature Integrated (≥3)

1. Vaida, Francesco, and Huang (2026) helps frame $$eta_{top}$$ as a pipeline-level robustness quantity across the topological deep learning stack, which keeps today's budget from being described as a purely local graph heuristic.
2. Nigmetov, Hajnal, and Rieck (2024) gives persistence-sensitive optimization language that justifies treating $$r_{PH}$$ as a measurable residual before it is folded into a scalar budget.
3. Gomez and Memoli (2024) ties curvature summaries to persistence-diagram geometry, supporting the split between $$r_{PH}$$, $$r_{kappa}$$, and the conservative scalar compression $$eta_{top}$$.
4. Yang et al. (2024) reinforces that topology perturbation tolerance is architecture- and state-specific, which aligns with $$eta_{top}^{max}(d, n_{win}, b)$$ and argues against any safe global cap.
5. Zhang, Fu, and Han (2024) gives a switching-topology and asynchronous-delay comparator, which sharpens the systems framing for topology stress plus lag-burst interactions without overstating implementation maturity.

## Development Actions (next 72 hours)

1. Log $$r_{PH}$$, $$r_{kappa}$$, $$eta_{top}$$, and $$eta_{top}^{max}$$ on the runtime path so the paper claim can be audited against actual traces.
2. Replay topology residual sweeps together with threshold-noise and lag-burst drivers to test whether additive budgeting is conservative.
3. Replace today's surrogate $$gamma_{CI}$$ inputs with full ARFIMA and fGn calibration before treating the tolerance cap as numerically stable.
4. Add per-cell rejection and zero-tolerance alerts so boundary cells cannot silently pass under a stale global allowance.
5. Build the $$eta_{top}^{max}$$ heatmap and contraction plots needed by the experiments section.

## Open Problems (carried + new)

- `OP-039`: validate the topology-aware screen $$Gamma_{safe}^{top}$$ on full ARFIMA and fGn calibration runs rather than the surrogate table.
- `OP-040`: justify the false-reject budget $$B_{FR}$$ and test whether the topology-aware cap is sensitive to that policy choice.
- `OP-041`: define $$eta_{top}$$ from measurable persistence and curvature residuals and validate the additive budget on runtime traces.
- `OP-042`: test whether $$eta_{top} = w_{PH} r_{PH} + w_{kappa} r_{kappa}$$ upper-bounds branch risk or whether a two-dimensional budget is required.

## Next-day Seed

Replay measured persistence and curvature residual traces through the repaired branch and test whether additive $$eta_{top}$$ budgeting is conservative, or whether the acceptance layer needs a two-dimensional replacement that separates $$r_{PH}$$ from $$r_{kappa}$$.

## References (reference-style links only)

- [Vaida et al., 2026][vaida-2026]
- [Nigmetov et al., 2024][nigmetov-2024]
- [Gomez and Memoli, 2024][gomez-memoli-2024]
- [Yang et al., 2024][yang-2024]
- [Zhang et al., 2024][zhang-2024]

[vaida-2026]: https://arxiv.org/abs/2601.19522
[nigmetov-2024]: https://www.sciencedirect.com/science/article/pii/S0925772124000417
[gomez-memoli-2024]: https://dl.acm.org/doi/10.1145/3653683
[yang-2024]: https://arxiv.org/abs/2406.14769
[zhang-2024]: https://www.sciencedirect.com/science/article/pii/S0016003223010870
