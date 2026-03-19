---
title: "ONN Daily — 2026-03-19 — Dependence-Aware Confidence Radius Closure for CBBO Feasibility"
date: 2026-03-19 09:00:00 +0900
last_modified_at: 2026-03-19 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, dependence-aware, confidence-radius, cbbo-feasibility, safety-screening]
toc: true
toc_sticky: true
excerpt: "Closed the CBBO feasibility blocker by introducing a dependence-aware conservative confidence radius with explicit empty-set downgrade semantics and integrated robust/scenario literature for manuscript-ready patches."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: ONN Daily — 2026-03-18 — Confidence-Bounded Optimization of Class Budget Map](/2026-03-18-onn-daily-confidence-bounded-optimization-class-budget-map/)

## 1. Context

This entry converts the 2026-03-19 ONN research log into a publish-ready post focused on dependence-aware closure of CBBO feasibility screening under classwise uncertainty.

## 2. Today’s Theory Target

Target: **Dependence-Aware Confidence Radius Closure for CBBO Feasibility**.

Primary claim focus: `C187`-`C192`, with direct closure on the carryover gap behind `C184` by tying feasibility decisions to conservative classwise effective-count logic.

## 3. What Changed in the Theory

### Restatement (cleaned)

For each dependence class `k`, define a conservative radius and upper unsafe bound:

`r_k(delta) = sqrt(log(1/delta) / (2 * max(1, n_eff_lb(k)))) + zeta_k_dep`

`u_k^U(B) = u_k(B) + r_k(delta)`

Construct feasible set:

`F_k = {B: u_k^U(B) <= u_tol,k, rho_k(B) >= rho_min, M_async(B) = 1}`

If `F_k` is non-empty, choose `B_k^*` via safety-dominant objective minimization with deterministic tie-break; if `F_k` is empty, force fallback-only with no activation.

### Proof Audit (gaps & required assumptions)

- `C187`-`C190` and `C192` are now supported under explicit assumptions `A95`, `A96`, `A98`, `A99`, `A100`, and `A101`.
- The remaining fragile point is transfer beyond replay support (`C191`), still contingent on unresolved topology-noise and novelty-coupling bounds.
- Identified failure paths were optimistic `n_eff_lb`, stale async transaction state, and hidden activation when feasible set is empty.
- Repairs now require conservative lower-count auditing, transaction-scoped async guards, and hard no-activation semantics.

### Strengthening (new lemma / tighter condition / fix)

- Added monotonic-radius lemma: increasing conservative evidence cannot increase `r_k`.
- Added feasibility sufficiency closure: accepted budgets must satisfy both confidence-adjusted unsafe cap and async validity.
- Added deterministic tie-break rule to prevent oscillation under equal objective values.
- Added mandatory downgrade rule when `F_k = emptyset`, preventing stale cached budget activation.

## 4. Paper Patch Notes (actionable edits)

- `P-656`: Extend telemetry contract for classwise radius audits and explicit no-activation feasibility flag.
- `P-657`: Insert DARC proposition, radius monotonicity lemma, and deterministic tie-break proof notes.
- `P-658`: Insert falsifier matrix and matched-budget replay upgrade gate for `C184`.
- `P-659`: Add related-work bridge to DRO/scenario comparators with explicit scope boundary.
- `P-660`: Append bibliography set aligned to robust/chance-constrained comparators.

## 5. New Literature Integrated (≥3)

1. Ben-Tal, El Ghaoui, and Nemirovski (2009): robust feasibility framing for conservative downgrade semantics.
2. Bertsimas and Sim (2004): price-of-robustness interpretation for interruption-vs-safety tradeoffs.
3. Delage and Ye (2010): moment-uncertainty rationale for dependence inflation terms.
4. Campi and Garatti (2008): finite-sample feasibility logic for claim-upgrade gating.
5. Esfahani and Kuhn (2018): Wasserstein-DRO comparator for dependence-shift robustness boundaries.

## 6. Development Actions (next 72 hours)

1. Run matched-budget DARC replay cube over class, support-distance, lag skew, and effective-count stress axes.
2. Execute `test_darc_radius_monotone_in_n_eff_lb` and `test_empty_feasible_set_forces_no_activation`.
3. Add transaction atomicity checks that veto stale-budget activation paths.
4. Quantify fallback occupancy and unsafe-accept deltas under sparse-class and parser-loss regimes.
5. Gate `C184` promotion strictly on full falsifier-matrix pass.

## 7. Open Problems (carried + new)

- Carried: `OP-045`, `OP-046`, `OP-047`, `OP-048`, `OP-049`, `OP-050`, `OP-052`, `OP-053`, `OP-054`, `OP-056`, `OP-057`.
- Updated: `OP-058` (matched-budget DARC replay pass required), `OP-059` (classwise radius coverage audit under parser-loss perturbations).
- New: `OP-060` (prove fallback saturation cannot hide unsafe-accept regression under prolonged lag bursts), `OP-061` (quantify topology-noise class-mislabel impact on DARC feasibility decisions).

## 8. Next-day Seed

Execute the full DARC matched-budget replay cube on 2026-03-20 and decide whether `C184` can be promoted from `{PLAUSIBLE}` to `{PROVED}`.

## 9. References (reference-style links only)

- [Ben-Tal et al., 2009][ben-tal-2009]
- [Bertsimas and Sim, 2004][bertsimas-sim-2004]
- [Delage and Ye, 2010][delage-ye-2010]
- [Campi and Garatti, 2008][campi-garatti-2008]
- [Esfahani and Kuhn, 2018][esfahani-kuhn-2018]

[ben-tal-2009]: https://press.princeton.edu/books/hardcover/9780691143682/robust-optimization
[bertsimas-sim-2004]: https://doi.org/10.1287/opre.1030.0065
[delage-ye-2010]: https://doi.org/10.1287/opre.1090.0741
[campi-garatti-2008]: https://doi.org/10.1137/07069821X
[esfahani-kuhn-2018]: https://doi.org/10.1007/S10107-017-1172-1
