---
title: "ONN Daily — 2026-03-13 — Dominance-calibrated extrapolation envelope"
date: 2026-03-13 09:00:00 +0900
last_modified_at: 2026-03-13 09:00:00 +0900
categories: [Research, ONN, Daily]
tags: [ONN, ORTSF, LOGOS, extrapolation, dominance-calibration, envelope-family, fallback]
toc: true
toc_sticky: true
excerpt: "Defined a monotone dominance-calibrated extrapolation envelope with explicit fallback invalidation logic and integrated bootstrap, topology-stability, and robust-delay literature to tighten screening claims."
---

## Continuity Link
[ONN Daily Index](/onn-daily/)
[Previous: 2026-03-12](/2026-03-12-onn-daily-extrapolation-inflation-closure-tri-guard-support/)

## 1. Context

This entry converts the 2026-03-13 ONN/ORTSF log into a publish-ready update centered on closing the extrapolation-envelope gap left by `L-154a`. The focus is a minimal envelope family for `zeta_ext(d_sup)` that is monotone, auditable, and tied to downgrade behavior when dominance residuals turn positive.

## 2. Today’s Theory Target

Target: **Dominance-Calibrated Extrapolation Envelope** (`C157`–`C162`).

The target is high-leverage because it resolves yesterday's unresolved envelope-family requirement, gives explicit falsifiers (slope reversal, missed fallback, underfit replay cells), and turns novelty inflation handling into a testable promotion gate.

## 3. What Changed in the Theory

### Restatement (cleaned)

Define the candidate envelope family:

\[
F_\theta(d)=a(1-e^{-bd})+cd,\quad a,b,c\ge 0.
\]

Use dominance-aware guard and safe bound:

\[
\Phi_{\text{dom}}=\max(\Phi_{\text{ext}},\,u_{\text{cov}}-u_{\text{tol}}),\quad
U_{(p,\alpha)}^{\text{safe,dom}}=\hat Q_p+m_{\text{conf}}+\zeta_{\text{cls}}+F_\theta(d_{\text{sup}}).
\]

Accept only when `Phi_dom <= 0`; otherwise fallback is mandatory.

### Proof Audit (gaps & required assumptions)

- `C157`, `C158`, `C160`, `C161`, `C162` were promoted with explicit assumptions and downgrade policy.
- `C159` remains conditional on envelope sufficiency across replay novelty cells (`A81`, `A85`, `A87`), so no global guarantee is claimed.
- Unresolved lemma: `L-159a` (global sufficiency under coupled nonstationary shocks) remains `{NEEDS-EXPERIMENT}`.
- Main risk: sparse replay-cell coverage can hide underfit at mid-support `d_sup`.

### Strengthening (new lemma / tighter condition / fix)

- Enforced monotonicity by constraining fitted parameters to `a,b,c >= 0` and requiring dense-grid slope checks.
- Added dominance residual `r_dom=u_cov-u_tol` into guard precedence so any positive residual forces non-ignorable fallback.
- Tightened manuscript boundary: result is a screening-layer conservatism repair, not robust closed-loop synthesis certification.
- Added explicit promotion gate: no status upgrade without replay evidence for monotonicity, guard precedence, and fit-cell support.

## 4. Paper Patch Notes (actionable edits)

- `P-626`: extend telemetry with `(a,b,c,r_dom,Phi_dom,fit_cell_count)`.
- `P-627`: add theorem block for dominance-calibrated envelope and guard (`C157`–`C162`).
- `P-628`: insert falsifier matrix and promotion criteria in experiments.
- `P-629`: clarify related-work boundary against robust synthesis claims.
- `P-630`: maintain append-only, duplicate-safe bibliography bridge handling.

## 5. New Literature Integrated (≥3)

1. Künsch (1989), *The jackknife and the bootstrap for general stationary observations*.
2. Politis and Romano (1994), *The Stationary Bootstrap*.
3. Bellandi, Levi, and Vernazza (2024), *Stability of Persistence Diagrams Under Metric Perturbation*.
4. Pinheiro and Colon (2024), *On the mu-analysis and synthesis for uncertain time-delay systems with Padé approximations*.
5. Zheng and Zhao (2024), *Robust H-infinity stabilization for systems with uncertain input time-delay*.

## 6. Development Actions (next 72 hours)

1. Add unit tests for monotonicity of `F_theta` over dense `d_sup` grids.
2. Enforce guard precedence test: `Phi_dom > 0` must trigger immediate fallback.
3. Run replay matrix across `(d_sup, parser_drop, drift_latency)` and log `r_dom`.
4. Quantify minimal `fit_cell_count` thresholds for reliable parameter identification.
5. Attempt `L-159a` stress validation under coupled novelty and topology shocks.

## 7. Open Problems (carried + new)

- `OP-045` to `OP-050`, `OP-052`, `OP-053` remain active from carryover.
- `OP-054` remains active: derive an explicit minimal admissible envelope family surviving coupled parser/drift/topology shocks.
- New focus: formalize sufficient conditions to promote `C159` beyond conditional plausibility.

## 8. Next-day Seed

Test piecewise and saturating-plus-linear envelope variants against replay falsifiers, then decide whether `C159` can move from `{PLAUSIBLE}` to `{PROVED}` without overclaiming.

## 9. References (reference-style links only)

- [Künsch, 1989][kunsch-1989]
- [Politis and Romano, 1994][politis-romano-1994]
- [Bellandi et al., 2024][bellandi-2024]
- [Pinheiro and Colon, 2024][pinheiro-colon-2024]
- [Zheng and Zhao, 2024][zheng-zhao-2024]

[kunsch-1989]: https://projecteuclid.org/journals/annals-of-statistics/volume-17/issue-3/The-jackknife-and-the-bootstrap-for-general-stationary-observations/10.1214/aos/1176347265.full
[politis-romano-1994]: https://www.jstor.org/stable/2290993
[bellandi-2024]: https://doi.org/10.1016/j.amc.2024.128804
[pinheiro-colon-2024]: https://doi.org/10.1016/j.jfranklin.2024.01.044
[zheng-zhao-2024]: https://doi.org/10.1016/j.jfranklin.2024.107223
