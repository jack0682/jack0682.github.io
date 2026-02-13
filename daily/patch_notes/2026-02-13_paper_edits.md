# Patch Notes — 2026-02-13

Patch IDs: P-217, P-218

## P-217
- Target Paper: Paper 1 (ONN-ORTSF)
- Target Typst file: `paper/sections/05_theory.typ`
- Insertion cue: after "Remark 7 (H_inf vs mu in ORTSF)"
- Typst-ready insertion:
```text
== Definition 8 (Module-Block ONN Uncertainty)
Partition the ONN state into $m$ semantic modules with orthogonal projectors $Pi_i$. Define block-wise Jacobian bounds
$c_{J,i} := sup_{x in Omega_eps} ||Pi_i J_onn(x) Pi_i||_2$,
estimated from JVP logs. Represent ONN uncertainty by
$Delta_J := diag(Delta_1, ..., Delta_m)$ with $||Delta_i||_2 <= 1$ and weight
$W_J := diag(c_{J,1} I, ..., c_{J,m} I)$.

== Lemma 8 (Practical mu Upper Bound via D-Scaling) [Needs proof]
Let $Delta = diag(Delta_J, Delta_tau)$ and $M(j omega) := Gamma_hat(Delta t, sigma_dt) * L_nom(j omega) * W_J$. A conservative acceptance check is obtained by the D-scaling bound
$mu_Delta(M) <= inf_{D in D_struct} ||D M D^{-1}||_inf$,
computed over a frequency grid. If the resulting upper bound satisfies $sup_omega mu_Delta(M(j omega)) < 1$, the handoff is accepted as robustly stable under the assumed structure.

== Remark 8 (Structure Selection)
The module partition should follow the ontology graph or ONN block structure used in training. Overly coarse blocks make the bound too conservative; overly fine blocks risk optimistic `mu` estimates when off-diagonal coupling is strong.
```
- Rationale: gives an explicit, computable `Delta_J` structure and a conservative `mu` upper-bound recipe.
- Acceptance check: `mu` bound computed from D-scaling is monotone in `c_{J,i}` and respects `Omega_eps` locality.

## P-218
- Target Paper: Paper 1 (ONN-ORTSF)
- Target Typst file: `paper/sections/06_experiments.typ`
- Insertion cue: after the MIMO robustness check paragraph
- Typst-ready insertion:
```text
Block-uncertainty protocol: partition the ONN Jacobian into module blocks using the ontology graph, estimate $c_{J,i}$ from JVP logs on $Omega_eps$, and assemble $W_J = diag(c_{J,1} I, ..., c_{J,m} I)$. Compute D-scaled `mu` upper bounds over frequency for $M(j omega) = Gamma_hat * L_nom * W_J$ and compare with the scalar $H_inf$ margin on the same delay sweep.
```
- Rationale: adds a reproducible experiment plan for `Delta_J` estimation and `mu` calculation.
- Acceptance check: block-weight estimates are stable across runs and `mu` curves predict observed instability boundary.

## Deepening patches (2026-02-13 after-run)

Patch IDs: P-217D, P-218D

### P-217D
- Target Paper: Paper 1 (ONN-ORTSF)
- Target Typst file: `paper/sections/05_theory.typ`
- Insertion cue: after "Remark 8 (Structure Selection)"
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
- Reviewer Objection it preempts: block-diagonal `Delta_J` may ignore destabilizing cross-module coupling.
- Rationale: introduces explicit leakage term and conservative correction.
- Acceptance check: symbols (`c_diag`, `c_off`, `eta_off`) do not collide with existing notation; counterexample is dimension 2 and falsifies leakage-free screening when `|kappa|>1`.

### P-218D
- Target Paper: Paper 1 (ONN-ORTSF)
- Target Typst file: `paper/sections/06_experiments.typ`
- Insertion cue: after "Block-uncertainty protocol"
- Typst-ready insertion:
```text
Coupling-leakage diagnostic: for each log window, estimate block norms $c_{J,i}$ and residual leakage $c_off$ from JVP probes on $Omega_eps$.
Compute $eta_off = c_off / max(c_diag, epsilon_c)$ with $c_diag = max_i c_{J,i}$.
Report the 95th percentile $eta_off^95$ and apply the conservative acceptance criterion
$hat_mu_ub < 1/(1+eta_off^95)$ on the same frequency grid used for the baseline `mu` sweep.
Include an ablation where module blocks are merged/split to test sensitivity of $eta_off^95$ and margin decisions.
A run is marked pass only if the criterion holds and `Omega_eps` coverage exceeds 95%.
```
- Reviewer Objection it preempts: constants are not operationally measurable.
- Rationale: converts the proof-side constants into log-side diagnostics.
- Acceptance check: requires only logged module projectors, JVP traces, active-mask coverage, and frequency-grid `mu` outputs.
