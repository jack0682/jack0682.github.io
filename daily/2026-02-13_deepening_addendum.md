# ONN Deepening Addendum — 2026-02-13

## 1) Title + date
- Deepening focus date: 2026-02-13

## 2) What changed vs today’s log (max 6 bullets)
- Re-scoped the target from generic block `mu` computation to a single attack surface: cross-module leakage in `J_onn`.
- Added an explicit decomposition `J_onn = J_blk + J_off` with a measurable leakage ratio `eta_off`.
- Added a proof skeleton with two lemmas and explicit assumption usage.
- Added a 2D minimal counterexample showing false acceptance if leakage control is dropped.
- Added a log-computable diagnostic and pass/fail rule linking `mu` margin to `eta_off`.
- Upgraded paper insertion to include a leakage-aware acceptance inequality and reviewer-preemption note.

## 3) Re-scoped Target = (Object, Property, Failure Mode)
Target = (
Object: $M(j omega) := Gamma_"hat"(Delta t, sigma_"dt") * L_"nom"(j omega) * W_J$ with block model from ONN Jacobian logs,
Property: conservative robust acceptance under bounded off-diagonal leakage,
Failure Mode: optimistic acceptance when off-diagonal coupling is unbounded or unmeasured).

Core anchors used:
- ORTSF loop object: [Definition IV.7 (ORTSF Loop Gain and Delay Margin) | "define the loop transfer function:"]
- Delay stability baseline: [E. Theorem 4: Delay-Small Gain Stability | "The delay margin is ∆t such that ∥L(jω)∥ < 1 for all"]
- ONN active-region guard context: [C. Deep Delta Learning for Gradient Stabilization | "1: if ∥g∥<ϵ then"]

## 4) Depth Artifacts

### Artifact 1 (Proof skeleton)
Assumptions:
- A1. `L(s)` is the loop object used for acceptance checks. Source anchor: [Definition IV.7 (ORTSF Loop Gain and Delay Margin) | "define the loop transfer function:"].
- A2. Stability screening is small-gain flavored. Source anchor: [E. Theorem 4: Delay-Small Gain Stability | "The delay margin is ∆t such that ∥L(jω)∥ < 1 for all"].
- A3. Local ONN certificate is valid on `Omega_eps`. Source anchor: [C. Deep Delta Learning for Gradient Stabilization | "1: if ∥g∥<ϵ then"].
- A4. Jacobian decomposition exists on `Omega_eps`:
  $J_"onn"(x) = J_"blk"(x) + J_"off"(x)$,
  $J_"blk" := sum_i Pi_i J_"onn" Pi_i$,
  $||Pi_i J_"onn" Pi_i||_2 <= c_{J,i}$,
  $||J_"off"||_2 <= c_"off"$.
- A5. Orthogonal projectors `Pi_i` define a block partition and `c_"diag" := max_i c_{J,i} > 0`.

Lemma D1 (Block + leakage norm bound):
If A4-A5 hold, then for all $x in Omega_"eps"$,
$||J_"onn"(x)||_2 <= c_"diag" + c_"off"$.
Usage: A4 gives decomposition + block/off bounds; A5 gives $||J_"blk"||_2 <= c_"diag"$.

Lemma D2 (Coupling-inflated acceptance skeleton) [Needs proof]:
Define $eta_"off" := c_"off" / c_"diag"$ and
$M_"diag"(j omega) := Gamma_"hat" * L_"nom"(j omega) * W_J^"diag"$.
A conservative sufficient condition is
$sup_(omega) mu_"Delta"(M_"diag"(j omega)) < 1 / (1 + eta_"off")$.
Sketch: inflate the diagonal-only gain by $(1 + eta_"off")$ and apply positive homogeneity of `mu`; strict justification for structured perturbation remains **Needs proof**.

Assumption Trace Table:

| Assumption | Used in lemma | Source anchor | Failure if removed |
|---|---|---|---|
| A1 loop object | D2 | [Definition IV.7 (ORTSF Loop Gain and Delay Margin) | "define the loop transfer function:"] | acceptance quantity undefined |
| A2 small-gain baseline | D2 | [E. Theorem 4: Delay-Small Gain Stability | "The delay margin is ∆t such that ∥L(jω)∥ < 1 for all"] | no stability interpretation |
| A3 active region | D1, D2 | [C. Deep Delta Learning for Gradient Stabilization | "1: if ∥g∥<ϵ then"] | certificate applied outside valid regime |
| A4 decomposition/bounds | D1, D2 | (modeling assumption introduced today) | leakage can dominate silently |
| A5 orthogonal block partition | D1 | (modeling assumption introduced today) | `c_diag` no longer upper-bounds `J_blk` |

### Artifact 2 (Minimal counterexample, dimension 2)
Take two modules (`n=2`) with basis vectors `e_1, e_2` and
$J e_1 = kappa e_2, J e_2 = kappa e_1$,
so each diagonal block is zero but off-diagonal coupling is nonzero.
Then `Pi_1 J Pi_1 = 0`, `Pi_2 J Pi_2 = 0`, hence `c_{J,1}=c_{J,2}=0` and diagonal-only model gives `W_J=0`.
Diagonal-only acceptance would always pass (`mu=0`).
But $||J||_2 = |kappa|$, so for $|kappa| > 1`, the map is expansive and can destabilize the handoff.
Conclusion: dropping leakage control (`c_off` or `eta_off`) makes the test refutable.

### Artifact 3 (Implementation-facing diagnostic)
Define per-log-sample estimators on `Omega_eps`:
- $\hat c_"diag"(t) := max_i ||Pi_i J_t Pi_i||_2$ (blockwise JVP power iteration).
- $\hat c_"off"(t) := ||J_t - sum_i Pi_i J_t Pi_i||_2$ (residual JVP estimator).
- $\hat eta_"off"(t) := \hat c_"off"(t) / max(\hat c_"diag"(t), 10^{-6})$.
Aggregate robustly: $eta_"off"^95 := Q_0.95(\hat eta_"off")$.
Pass rule for deployment candidate:
$sup_(omega) \hat mu_"ub"(M_"diag"(j omega)) < 1 / (1 + eta_"off"^95)$ and coverage$(Omega_"eps") >= 0.95$.

Diagnostic Mapping Table:

| Math object | What to compute | Where in pipeline | Pass-fail criterion |
|---|---|---|---|
| $c_{J,i}$ | block JVP spectral norm | ONN Jacobian logging stage | finite and stable across windows |
| $c_"off"$ | residual norm after block projection | ONN Jacobian logging stage | bounded and not increasing trend |
| $eta_"off"^95$ | 95th percentile of $\hat c_"off"/\hat c_"diag"$ | daily robustness audit | must satisfy threshold used in acceptance |
| $\hat mu_"ub"$ | D-scaled `mu` upper bound on frequency grid | ORTSF robust-check stage | $\hat mu_"ub" < 1/(1+eta_"off"^95)$ |

## 5) Bound/Constant (one bound; assumptions clearly stated)
Assume A3-A5 and define
$c_"diag" := max_i c_{J,i}$, $eta_"off" := c_"off" / c_"diag"$.
Then the effective local gain satisfies the loose but falsifiable bound
$c_J^"eff" := sup_(x in Omega_"eps") ||J_"onn"(x)||_2 <= c_"diag" + c_"off" = c_"diag" (1 + eta_"off").$
Loose bound consequence (conservative check):
$Gamma_"hat"(Delta t, sigma_"dt") * c_"diag" * (1 + eta_"off") < 1.$
If this fails while the diagonal-only check passes, the leakage hypothesis is empirically contradicted.

## 6) Deepening Patches (P-###D)

### P-217D
- Target paper: Paper 1
- Target Typst file: `paper/sections/05_theory.typ`
- Insertion cue: after `Remark 8 (Structure Selection)`
- Typst-ready insertion:
```text
== Definition 9 (Off-Diagonal Leakage Ratio)
Let $J_onn(x)$ be the ONN Jacobian on $Omega_eps$ and define a block partition by orthogonal projectors $Pi_i$. Set
$J_blk(x) := sum_i Pi_i J_onn(x) Pi_i$ and $J_off(x) := J_onn(x) - J_blk(x)$.
Define $c_diag := sup_(x in Omega_eps) ||J_blk(x)||_2$, $c_off := sup_(x in Omega_eps) ||J_off(x)||_2$, and $eta_off := c_off / max(c_diag, epsilon_c)$ with small $epsilon_c > 0$.
This separates within-module gain from cross-module leakage.

== Lemma 9 (Coupling-Inflated Local Gain Bound) [Loose bound]
If $c_diag$ and $c_off$ are finite on $Omega_eps$, then $||J_onn(x)||_2 <= c_diag + c_off$ for all $x in Omega_eps$.
Therefore a conservative effective certificate is $c_J^eff := c_diag(1 + eta_off)$.
A sufficient handoff check is $Gamma_hat(Delta t, sigma_dt) * c_J^eff < 1$.
For the structured singular-value route, a conservative screening form is $sup_omega mu_Delta(M_diag(j omega)) < 1/(1+eta_off)$; this step is structure-dependent and remains Needs proof.

== Remark 9 (Why leakage must be monitored)
Consider two modules with $J e_1 = kappa e_2$ and $J e_2 = kappa e_1$.
Then block-diagonal terms are zero, yet $||J||_2 = |kappa|$.
For $|kappa| > 1$, a diagonal-only certificate accepts incorrectly while the map is expansive.
Hence any deployable acceptance rule must report $eta_off$ alongside diagonal block gains.
```
- Reviewer Objection it preempts: "Your block-diagonal `Delta_J` ignores cross-module coupling, so `mu` may be falsely optimistic."
- Rationale: makes the hidden assumption explicit and introduces a falsifiable correction factor.
- Acceptance check: notation consistency (`c_diag`, `c_off`, `eta_off`) with no collision in Section 05; counterexample text is dimension-2 and demonstrates failure when leakage is ignored.

### P-218D
- Target paper: Paper 1
- Target Typst file: `paper/sections/06_experiments.typ`
- Insertion cue: after `Block-uncertainty protocol`
- Typst-ready insertion:
```text
Coupling-leakage diagnostic: for each log window, estimate block norms $c_{J,i}$ and residual leakage $c_off$ from JVP probes on $Omega_eps$.
Compute $eta_off = c_off / max(c_diag, epsilon_c)$ with $c_diag = max_i c_{J,i}$.
Report the 95th percentile $eta_off^95$ and apply the conservative acceptance criterion
$hat_mu_ub < 1/(1+eta_off^95)$ on the same frequency grid used for the baseline `mu` sweep.
Include an ablation where module blocks are merged/split to test sensitivity of $eta_off^95$ and margin decisions.
A run is marked pass only if the criterion holds and `Omega_eps` coverage exceeds 95%.
```
- Reviewer Objection it preempts: "The method is not implementable because required constants are undefined in logs."
- Rationale: specifies exact logged signals and a binary pass/fail decision.
- Acceptance check: diagnostic can be computed from logs (`Pi_i`, JVP traces, active-mask indicator, frequency-grid `mu` outputs).

## 7) Open Problems update (diff-like)
+ NEW: [OP-013] Prove or refute the structured `mu` inflation rule `mu_diag < 1/(1+eta_off)` under block-coupled uncertainty.
~ UPDATED: [OP-012] Add measurable target: keep `eta_off^95 <= 0.25` while preserving predictive margin quality.

## 8) Next-day seed (one sentence, direct continuation)
- 2026-02-14: estimate `eta_off^95` from ONN logs and test whether coupling-inflated `mu` screening matches observed instability boundaries.
