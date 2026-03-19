---
title: ONN Daily - 2026-02-13 - Block-Structured Delta_J and mu Bound
date: 2026-02-13 09:00:00 +0900
last_modified_at: 2026-02-13 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, block-uncertainty, d-scaling, jacobian, mu-analysis]
toc: true
toc_sticky: true
excerpt: Defined a block-structured ONN uncertainty Delta_J and a practical D-scaling mu upper-bound recipe, integrating recent time-delay mu-synthesis literature to ground the computation path.
---

[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily - 2026-02-12](/2026-02-12-onn-daily-mimo-mu-acceptance-inequality/)

## Context
Yesterday formalized a MIMO mu-based acceptance inequality but left the uncertainty structure and computation recipe implicit. Today grounds the ONN uncertainty in Jacobian log blocks and provides a concrete D-scaling upper-bound workflow.

## Today’s Theory Target
Define a block-structured ONN uncertainty Delta_J from Jacobian logs and specify a practical mu upper-bound computation recipe for ORTSF acceptance.

## What Changed in the Theory
### Restatement (cleaned)
- ORTSF loop transfer remains $$L(s) := C(s)G(s)e^{-s Delta t}$$ with delay envelope $$Gamma_{hat}(Delta t, sigma_{dt})$$.
- Scalar delay margin uses $$||L(j omega)||_{inf} < 1$$, but MIMO acceptance requires structured uncertainty.
- Define $$Delta_{J} := diag(Delta_{1}, ..., Delta_{m})$$ aligned to ONN modules with block weights estimated from Jacobian logs on $$Omega_{eps}$$.
- Conservative acceptance check: compute D-scaling mu upper bounds of $$M(j omega) := Gamma_{hat} * L_{nom}(j omega) * W_{J}$$ where $$W_{J} := diag(c_{J,1} I, ..., c_{J,m} I)$$.

### Proof Audit (gaps & required assumptions)
- The block partition must reflect true ONN module coupling; mismatched structure yields optimistic bounds.
- D-scaling provides an upper bound, so acceptance is conservative and structure dependent.
- Local ONN bounds remain valid only on $$Omega_{eps}$$; guard chattering can violate the certificate.

### Strengthening (new lemma / tighter condition / fix)
- New definition: block-diagonal $$Delta_{J}$$ with weights $$c_{J,i}$$ derived from JVP logs on $$Omega_{eps}$$.
- New lemma: D-scaling upper bound over a frequency grid provides a practical, conservative mu acceptance check.
- Implementation mapping: estimate $$c_{J,i}$$, assemble $$W_{J}$$, and run `mussv`/D-K iteration for $$mu$$ bounds across frequency.

## Paper Patch Notes (actionable edits)
- `P-217` (`paper/sections/05_theory.typ`): add Definition + Lemma for block-structured $$Delta_{J}$$ and D-scaling mu bound.
- `P-218` (`paper/sections/06_experiments.typ`): add experiment protocol for estimating $$c_{J,i}$$ and comparing mu vs scalar margins.

## New Literature Integrated (≥3)
1. Dlapa, IFAC-PapersOnLine (2024): D-K iteration and algebraic mu-synthesis for time-delay uncertainty; supports the D-scaling computation recipe.
2. Dlapa, ECC 2024: 2-DOF factorization with structured singular value control; provides a concrete structure for $$Delta_{J}$$ + $$Delta_{tau}$$ separation.
3. Dlapa, ICCAD 2024: alternative 2-DOF factorization pipeline for time-delay mu; retained as a backup reference if ECC access is limited.

## Development Actions (next 72 hours)
1. Compute block-wise Jacobian norms $$c_{J,i}$$ from ONN logs on $$Omega_{eps}$$.
2. Implement D-scaled mu upper-bound sweeps over frequency for $$M(j omega)$$.
3. Compare mu vs scalar $$H_{inf}$$ margins on the same delay sweep.
4. Validate block-structure sensitivity by merging/splitting module partitions.
5. Add a runtime guard to recompute block weights when logs drift.

## Deepening Pass (after-run integration)
### Re-scoped target
Target = (Object: $$M(j omega) := Gamma_{hat}(Delta t, sigma_{dt}) * L_{nom}(j omega) * W_{J}$$, Property: conservative robust acceptance under bounded off-diagonal leakage, Failure Mode: optimistic acceptance when cross-module coupling is unbounded or unmeasured).

### Reviewer-facing weakest point
- Weakest point: a purely block-diagonal $$Delta_{J}$$ can understate destabilizing off-diagonal Jacobian terms.
- Added decomposition: $$J_{onn} = J_{blk} + J_{off}$$ with leakage ratio $$eta_{off} := c_{off} / max(c_{diag}, epsilon_{c})$$.

### Minimal counterexample (n=2)
- Let $$J e_{1} = kappa e_{2}$$, $$J e_{2} = kappa e_{1}$$.
- Then diagonal blocks vanish ($$Pi_{1} J Pi_{1} = Pi_{2} J Pi_{2} = 0$$), so diagonal-only model gives zero module gain and can falsely accept.
- But $$||J||_{2} = |kappa|$$; for $$|kappa| > 1$$, the map is expansive and handoff can destabilize.

### Implementation diagnostic
- Compute $$c_{diag} = max_{i} ||Pi_{i} J Pi_{i}||_{2}$$ and $$c_{off} = ||J - sum_{i} Pi_{i} J Pi_{i}||_{2}$$ from JVP logs on $$Omega_{eps}$$.
- Track $$eta_{off}^{95}$$ as the 95th percentile of $$c_{off} / max(c_{diag}, epsilon_{c})$$.
- Apply conservative screening: $$hat_{mu}_{ub} < 1 / (1 + eta_{off}^{95})$$ on the same frequency grid as baseline mu sweep.

### Loose bound and operational check
- Loose bound: $$||J_{onn}||_{2} \le c_{diag} + c_{off}$$.
- Effective certificate: $$c_{J}_{eff} := c_{diag} + c_{off}$$.
- Practical acceptance check: $$Gamma_{hat}(Delta t, sigma_{dt}) * c_{J}_{eff} < 1$$.

## Open Problems (carried + new)
- [OP-013] Prove or refute the structured $$mu$$ inflation rule $$mu_{diag} < 1/(1+eta_{off})$$ under block-coupled uncertainty.
- [OP-012] Validate block partition and D-scaling conservativeness for $$Delta_{J}$$, with measurable target $$eta_{off}^{95} \le 0.25$$.
- [OP-011] $$Delta_{J}$$ now defined as block-diagonal from Jacobian logs; needs empirical validation vs scalar $$H_{inf}$$.
- [OP-003] Provide a reproducible mu computation recipe and confirm numerical stability.

## Next-day Seed
2026-02-14: estimate $$eta_{off}^{95}$$ from ONN logs and test whether coupling-inflated mu screening matches observed instability boundaries.

## References (reference-style links only)
- [Simple Robust Controller via Evolutionary Mu-Synthesis Using Algebraic Approach for Oscillating Plant with Uncertain Time Delay and Astatism (IFAC-PapersOnLine 2024)](https://doi.org/10.1016/j.ifacol.2024.10.295)
- [Structured singular value control with two-degree-of-freedom feedback loop factorization for oscillating plant with uncertain time delay and astatism (ECC 2024)](https://doi.org/10.23919/ECC64448.2024.10590745)
- [Two-degree-of-freedom feedback loop factorization controller for oscillating plant with uncertain time delay and astatism using structured singular value (ICCAD 2024)](https://doi.org/10.1109/ICCAD60883.2024.10553929)
