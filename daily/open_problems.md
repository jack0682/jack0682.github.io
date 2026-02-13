# Open Problems

## Active
- [OP-013] Prove or refute the structured `mu` inflation rule `mu_diag < 1/(1+eta_off)` under block-coupled uncertainty.
- [OP-012] Validate block partition and D-scaling conservativeness for `Delta_J`, with measurable target `eta_off^95 <= 0.25`.
- [OP-011] `Delta_J` defined as block-diagonal from Jacobian logs; validate `mu`-based acceptance vs scalar `H_inf`.
- [OP-001] Derive a calibrated operational threshold `c_J^star` using `c_base + c_switch` with delay amplification `Gamma_hat(Delta t)`.
- [OP-003] Formalize ORTSF MIMO robustness via `mu` margin vs scalar `H_inf` and provide a reproducible computation recipe.
- [OP-004] Extend delay theorem to stochastic/time-varying jitter with a testable mean-square or expISS criterion (now framed as 2D envelope `Gamma_hat(Delta t, sigma_dt)`).
- [OP-005] Build latency-injection protocol and compare predicted instability boundary against measured failure onset (tied to `Gamma_emp` measurement).
- [OP-006] Prove tightness (not only conservativeness) of `c_switch = L_sigma * R_delta` under smooth guard dynamics.
- [OP-007] Replace symbolic `Gamma_delay` with calibrated `Gamma_hat(Delta t)` and define confidence margin `delta_gamma` (needs rule-of-thumb).
- [OP-008] Conservativeness of monotone-envelope `Gamma_hat` from finite samples (lemma added; needs empirical validation).
- [OP-009] Estimate `L_gamma` from data and validate Lipschitz-in-delay assumption for `Gamma_delay` (must hold under jittered trajectories).
- [OP-010] Calibrate `sigma_dt` and `delta_jitter` from jittered delay logs; verify heavy-tail robustness.

## Resolved
- [OP-900] Canonical source mismatch fixed (resolved on 2026-02-06).
- [OP-901] Fixed-`k` Deep Delta averagedness now uses operator decomposition, replacing invalid sign inequality (resolved on 2026-02-08).
- [OP-902] Projection scope split into `C_proj = C_affine ∩ C_box` vs nonconvex penalty constraints (resolved on 2026-02-08).
- [OP-002] Variable-`k(x)` switched-map base composition bound established under smooth-gate assumptions (resolved on 2026-02-09).

## Next-day seed
- 2026-02-14: estimate `eta_off^95` from ONN logs and test coupling-inflated `mu` screening against observed instability boundaries.
