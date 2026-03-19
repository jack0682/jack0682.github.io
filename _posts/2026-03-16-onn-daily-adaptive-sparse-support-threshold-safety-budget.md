---
title: "ONN Daily — 2026-03-16 — Adaptive sparse-support threshold safety budget"
date: 2026-03-16 09:00:00 +0900
last_modified_at: 2026-03-16 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, adaptive-threshold, sparse-support, safety-budget, promotion-gate]
toc: true
toc_sticky: true
excerpt: "Introduced an adaptive sparse-support threshold with safety-budget coupling and hardened the no-false-promotion gate under dependence-aware support uncertainty."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily — 2026-03-15 — Sparse-cell safe promotion gate](/2026-03-15-onn-daily-sparse-cell-safe-promotion-gate/)

## 1. Context

This entry converts the 2026-03-16 ONN log into a publish-ready update centered on replacing a fixed sparse-support gate with an adaptive threshold tied to dependence and interruption-safety budget. The focus is to reduce over-conservatism while preserving deterministic no-false-promotion behavior.

## 2. Today’s Theory Target

Target: Adaptive Sparse-Support Threshold $$n_{cell,min}$$ with Safety-Budget Coupling.

Primary claim set: `C169`-`C174`, extending the prior sparse-cell promotion gate and addressing carryover contradiction `OP-056` on static-threshold brittleness.

## 3. What Changed in the Theory

### Restatement (cleaned)

Promotion now depends on an adaptive sparse predicate:
$$M_{sparse}^{adp} = 1[n_{cell} \ge n_{cell,min}^{safe}(k, d_{sup}, n_{eff,lb})]$$.

With
a deterministic guard stack,
$$Pi_{promote}^{adp} = M_{mono} * M_{dom} * M_{sparse}^{adp} * M_{holdout}$$,
so any sparse-threshold failure forces $$Pi_{promote}^{adp} = 0$$.

### Proof Audit (gaps & required assumptions)

- `C169` and `C170` require atomic predicate evaluation and version-consistent scheduler reads (`A90`, `A91`).
- `C171` requires nonnegative scheduler parameters and conservative $$n_{eff,lb}$$ handling (`A84`, `A92`).
- `C172` depends on calibrated mapping from class-wise interruption limits to threshold aggressiveness (`A93`).
- `C173` remains unresolved for unseen nonstationary support shifts (`A85`, `A89`).
- `C174` holds only with explicit screening-vs-certification scope separation.

### Strengthening (new lemma / tighter condition / fix)

- Replaced fixed $$n_{cell,min}$$ with class-aware adaptive schedule:
$$n_{cell,min}^{safe} = ceil(n0 + alpha_{k}*d_{sup} + beta_{k}/max(1, n_{eff,lb}))$$, with $$alpha_{k}, beta_{k} \ge 0$$.
- Added monotonicity constraint: larger $$d_{sup}$$ or smaller $$n_{eff,lb}$$ cannot reduce threshold.
- Added scheduler-version check to block stale-threshold acceptance paths.
- Kept hard scope boundary: predicate success is screening evidence, not closed-loop robust certification.

## 4. Paper Patch Notes (actionable edits)

- `P-636`: Replace fixed sparse-support threshold text with adaptive schedule definition and parameter constraints.
- `P-637`: Add no-false-promotion invariant for $$Pi_{promote}^{adp}$$ with explicit version-consistency assumption.
- `P-638`: Extend falsifier matrix with scheduler-race and undercoverage stress tests.
- `P-639`: Add class-budget coupling table linking $$B_{safe}(k)$$ to admissible threshold floor/ceiling.
- `P-640`: Clarify screening-only interpretation in theorem discussion and limitations.

## 5. New Literature Integrated (≥3)

1. Bauschke and Combettes (2017) for monotone-operator framing of deterministic guard composition.
2. Megretski and Rantzer (1997) for IQC-based interpretation of what stronger compositional guarantees would require.
3. Cohen-Steiner, Edelsbrunner, and Harer (2007) for stability guidance on topology-derived support-distance proxies.
4. Sontag (2008) for ISS boundary language supporting screening-vs-certification separation.

## 6. Development Actions (next 72 hours)

1. Implement and log $$threshold_{version} = class_{version}$$ checks in promotion telemetry.
2. Run dependence-stratified sparse-support ablations comparing fixed vs adaptive threshold under same splits.
3. Quantify undercoverage and veto rates as a function of $$d_{sup}$$ and $$n_{eff,lb}$$ bins.
4. Fit conservative $$B_{safe}(k)$$ calibration map with explicit interruption-rate caps.
5. Draft experiment prerequisites for unresolved lemma `L-173a`.

## 7. Open Problems (carried + new)

- `OP-045` to `OP-050` (carried): remaining dependence and falsifier calibration tasks from prior days.
- `OP-052` (carried): finite-sample threshold calibration robustness under heavy-tail regimes.
- `OP-053` and `OP-054` (carried): support-proxy reliability and telemetry race hardening.
- `OP-056` (carried): adaptive sparse threshold now formalized, but still needs multi-regime stress evidence.
- `L-173a` (new formal blocker): conditions for transferring adaptive screening guarantees to unseen nonstationary supports.

## 8. Next-day Seed

Execute the adaptive-vs-fixed sparse threshold falsifier matrix with dependence-class conditioning, then publish downgrade rules that bind claim promotion to observed veto/undercoverage risk.

## 9. References (reference-style links only)

- [Bauschke and Combettes, 2017][bauschke-combettes-2017]
- [Megretski and Rantzer, 1997][megretski-rantzer-1997]
- [Cohen-Steiner et al., 2007][cohen-steiner-2007]
- [Sontag, 2008][sontag-2008]

[bauschke-combettes-2017]: https://doi.org/10.1007/978-3-319-48311-5
[megretski-rantzer-1997]: https://doi.org/10.1109/9.587335
[cohen-steiner-2007]: https://doi.org/10.1007/s00454-006-1276-5
[sontag-2008]: https://doi.org/10.1007/978-3-540-77653-6_3
