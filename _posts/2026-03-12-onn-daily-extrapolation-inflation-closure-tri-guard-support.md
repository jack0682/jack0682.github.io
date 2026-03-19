---
title: "ONN Daily — 2026-03-12 — Extrapolation inflation closure"
date: 2026-03-12 09:00:00 +0900
last_modified_at: 2026-03-12 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, extrapolation, tri-guard, novelty, support-distance]
toc: true
toc_sticky: true
excerpt: "Introduced novelty-triggered extrapolation inflation for tri-guard screening, tightened fallback invalidation logic, and integrated dependent-bootstrap and robust-delay literature for out-of-support conservatism."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: 2026-03-11](/2026-03-11-onn-daily-tri-guard-finite-sample-closure/)

## 1. Context

This entry converts the 2026-03-12 ONN/ORTSF daily log into a publish-ready post focused on extrapolation risk outside calibration support. The objective is to preserve screening-layer conservatism when novelty appears and support-distance grows beyond calibrated cells.

## 2. Today’s Theory Target

Target: Extrapolation Inflation Closure for Tri-Guard Outside Calibration Support (`C151`–`C156`).

Rationale: yesterday's unresolved extrapolation lemma (`L-145a`) blocked promotion of the prior tri-guard closure under unseen regimes, so today's work introduced an explicit novelty-conditioned extrapolation branch.

## 3. What Changed in the Theory

### Restatement (cleaned)

Define total inflation and extrapolation-safe bound as:

$$
\zeta_{\text{tot}}(t)=\zeta_{\text{cls}}(t)+\zeta_{\text{ext}}(d_{\text{sup}}(t)), \quad
U_{(p,\alpha)}^{\text{safe,ext}}=\hat Q_p+m_{\text{conf}}+\zeta_{\text{tot}}.
$$

Define novelty-aware guard:

$$
\Phi_{\text{ext}}=\max\left(\Phi_{\text{tri}},\ u_{\text{cov}}-u_{\text{tol}},\ d_{\text{sup}}-d_{\text{thr}}\right).
$$

Acceptance is allowed only when $$Phi_{tri} \le 0$$ for in-support behavior, or $$Phi_{ext} \le 0$$ under novelty; otherwise fallback is mandatory.

### Proof Audit (gaps & required assumptions)

- `C151` and `C154` remain conditional on `A84`/`A85` because sufficiency depends on how tightly $$zeta_{ext}(d_{sup})$$ upper-bounds optimism outside support.
- `C152`/`C153`/`C155` were upgraded via policy-theorem linkage: novelty-triggered invalidation and forced fallback are explicit and auditable.
- Main unresolved gap: identify an envelope family for $$zeta_{ext}$$ with monotonicity and finite-sample undercoverage guarantees under coupled nonstationary shifts (`L-154a`).
- Critical risk remains novelty delay: a one-window lag can temporarily violate undercoverage unless fallback triggers conservatively.

### Strengthening (new lemma / tighter condition / fix)

- Added decomposition $$zeta_{tot} = zeta_{cls} + zeta_{ext}$$ to separate in-support and extrapolation optimism sources.
- Introduced hard invalidation rule: if extrapolation guard fails ($$Phi_{ext} > 0$$), prior closure claims are downgraded immediately and alarmed.
- Tightened scope language: the result is a screening-level safety guarantee, not a closed-loop robust-stability certificate.
- Added explicit experiment gate for claim promotion: no upgrade of `C154` without replay-cell evidence on out-of-support regimes.

## 4. Paper Patch Notes (actionable edits)

- `P-621`: extend telemetry tuple with $$(d_{sup}, zeta_{ext}, zeta_{tot}, phi_{nov}, Phi_{ext})$$.
- `P-622`: insert extrapolation inflation closure theorem (`C151`–`C155`) in theory.
- `P-623`: add out-of-support falsifier matrix and claim-status gate in experiments.
- `P-624`: strengthen related-work boundary between screening guarantees and certification claims.
- `P-625`: keep bibliography bridge append-only and deduplicated in `refs.bib`.

## 5. New Literature Integrated (≥3)

1. Lahiri (1999), *Theoretical comparisons of block bootstrap methods* — dependence-aware calibration limits and block-length sensitivity.
2. Voleti and Prabhu (2024), *Persistence and Stationarity Under Block Bootstrap* — regime-change diagnostics relevant to novelty thresholds.
3. Bellandi, Levi, and Vernazza (2024), *Stability of Persistence Diagrams Under Metric Perturbation* — support-distance interpretation under topological perturbation.
4. Pinheiro and Colon (2024), *mu-analysis and synthesis for uncertain time-delay systems* — uncertainty-channel comparator and boundary framing.
5. Zheng and Zhao (2024), *Robust H-infinity stabilization with uncertain input delay* — explicit contrast to controller-level guarantees.

## 6. Development Actions (next 72 hours)

1. Implement monotonicity and invariant tests for $$zeta_{ext}(d_{sup})$$ and $$zeta_{tot} \ge zeta_{cls}$$.
2. Add hard downgrade assertion for $$phi_{nov} = 1$$ with $$Phi_{ext} > 0$$.
3. Build out-of-support replay matrix across $$(d_{sup}, parser_{drop}, drift_{latency})$$.
4. Quantify novelty detector delay and stale-accept persistence bounds.
5. Run interruption-vs-safety Pareto analysis before promoting `C154`.

## 7. Open Problems (carried + new)

- `UPDATED OP-052`: extrapolation stability under unseen dependence classes remains open.
- `UPDATED OP-053`: prove sufficiency and monotonicity conditions for $$zeta_{ext}$$.
- `NEW OP-054`: identify minimal $$zeta_{ext}(d_{sup})$$ envelope family preserving undercoverage tolerance under coupled shocks.

## 8. Next-day Seed

Construct candidate $$zeta_{ext}(d_{sup})$$ families, falsify them on full out-of-support replay cells, and decide whether `C154` can be promoted to `{PROVED}`.

## 9. References (reference-style links only)

- [Lahiri, 1999][lahiri-1999]
- [Voleti and Prabhu, 2024][voleti-prabhu-2024]
- [Bellandi et al., 2024][bellandi-2024]
- [Pinheiro and Colon, 2024][pinheiro-colon-2024]
- [Zheng and Zhao, 2024][zheng-zhao-2024]

[lahiri-1999]: https://projecteuclid.org/journals/annals-of-statistics/volume-27/issue-1/Theoretical-comparisons-of-block-bootstrap-methods/10.1214/aos/1018031117.full
[voleti-prabhu-2024]: https://doi.org/10.3390/math12081156
[bellandi-2024]: https://doi.org/10.1016/j.amc.2024.128804
[pinheiro-colon-2024]: https://doi.org/10.1016/j.jfranklin.2024.01.044
[zheng-zhao-2024]: https://doi.org/10.1016/j.jfranklin.2024.107223
