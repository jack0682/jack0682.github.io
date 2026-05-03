"""Generate fig24: L1-M soft-count envelope.

The figure is intentionally schematic-numerical: it plots the envelope
families and their theoretical decay bounds, not experimental data.
"""
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "content-assets" / "scc-figures" / "fig24-l1m-softcount-envelope.png"


def apply_style() -> None:
    plt.rcParams.update(
        {
            "figure.facecolor": "white",
            "axes.facecolor": "white",
            "savefig.facecolor": "white",
            "savefig.bbox": "tight",
            "font.family": "sans-serif",
            "font.sans-serif": ["Helvetica", "Arial", "DejaVu Sans"],
            "font.size": 10,
            "axes.titlesize": 11,
            "axes.labelsize": 10,
            "xtick.labelsize": 9,
            "ytick.labelsize": 9,
            "legend.fontsize": 8,
            "axes.edgecolor": "black",
            "axes.linewidth": 0.7,
            "axes.spines.top": False,
            "axes.spines.right": False,
            "xtick.direction": "in",
            "ytick.direction": "in",
            "xtick.major.width": 0.6,
            "ytick.major.width": 0.6,
            "grid.color": "black",
            "grid.alpha": 0.16,
            "grid.linewidth": 0.35,
            "legend.frameon": True,
            "legend.framealpha": 1.0,
            "legend.edgecolor": "black",
            "legend.fancybox": False,
        }
    )


def phi_hard(ell: np.ndarray, ell_min: float) -> np.ndarray:
    return (ell >= ell_min).astype(float)


def phi_logistic(ell: np.ndarray, ell_min: float, slope: float) -> np.ndarray:
    return 1.0 / (1.0 + np.exp(-slope * (ell - ell_min)))


def phi_shift_sat(ell: np.ndarray, ell_min: float, beta: float) -> np.ndarray:
    shifted = np.maximum(ell - ell_min, 0.0)
    return 1.0 - np.exp(-beta * shifted)


def main() -> None:
    apply_style()

    ell_min = 1.0
    tau = 0.08
    tau_star = 0.12

    ell = np.linspace(0.55, 1.55, 800)
    tau_grid = np.linspace(0.005, 0.2, 500)

    fig, axes = plt.subplots(1, 2, figsize=(12.2, 4.8))

    ax = axes[0]
    ax.axvspan(ell_min - tau, ell_min + tau, color="black", alpha=0.055, lw=0)
    ax.axvline(ell_min, color="black", lw=1.0)
    ax.plot(ell, phi_hard(ell, ell_min), color="black", lw=1.45, label=r"hard count  $\mathbf{1}_{\ell \geq \ell_{\min}}$")
    ax.plot(ell, phi_logistic(ell, ell_min, 20), color="black", lw=1.0, ls="--", label=r"logistic  $s=20$")
    ax.plot(ell, phi_logistic(ell, ell_min, 50), color="black", lw=1.1, ls="-.", label=r"logistic  $s=50$")
    ax.plot(ell, phi_shift_sat(ell, ell_min, 20), color="0.25", lw=1.0, ls=(0, (3, 1, 1, 1)), label=r"shift-sat  $\beta=20$")
    ax.plot(ell, phi_shift_sat(ell, ell_min, 50), color="0.45", lw=1.0, ls=":", label=r"shift-sat  $\beta=50$")
    ax.text(ell_min, -0.13, r"$\ell_{\min}$", ha="center", va="top")
    ax.text(ell_min - tau, 1.08, r"$\ell_{\min}-\tau$", ha="right", va="bottom", fontsize=8)
    ax.text(ell_min + tau, 1.08, r"$\ell_{\min}+\tau$", ha="left", va="bottom", fontsize=8)
    ax.text(0.62, 0.08, "sub-threshold\nsuppression", fontsize=8, ha="left")
    ax.text(1.28, 0.84, "dominant-bar\nretention", fontsize=8, ha="left")
    ax.set_title("(a) Envelope functions on bar length")
    ax.set_xlabel(r"bar length  $\ell$")
    ax.set_ylabel(r"soft count weight  $\phi(\ell)$")
    ax.set_xlim(0.55, 1.55)
    ax.set_ylim(-0.16, 1.16)
    ax.set_yticks([0, 0.5, 1])
    ax.grid(True)
    ax.legend(loc="center left", bbox_to_anchor=(0.02, 0.55))

    ax = axes[1]
    log_20 = 3.0 * np.exp(-20.0 * tau_grid)
    log_50 = 3.0 * np.exp(-50.0 * tau_grid)
    log_100 = 3.0 * np.exp(-100.0 * tau_grid)
    sat_20 = np.exp(-20.0 * tau_grid)
    sat_50 = np.exp(-50.0 * tau_grid)
    ax.semilogy(tau_grid, log_20, color="black", lw=1.0, ls="--", label=r"logistic  $3e^{-20\tau}$")
    ax.semilogy(tau_grid, log_50, color="black", lw=1.2, ls="-.", label=r"logistic  $3e^{-50\tau}$")
    ax.semilogy(tau_grid, log_100, color="black", lw=1.0, ls=":", label=r"logistic  $3e^{-100\tau}$")
    ax.semilogy(tau_grid, sat_20, color="0.25", lw=1.0, ls=(0, (3, 1, 1, 1)), label=r"shift-sat  $e^{-20\tau}$")
    ax.semilogy(tau_grid, sat_50, color="0.45", lw=1.0, ls=(0, (5, 2)), label=r"shift-sat  $e^{-50\tau}$")
    ax.axvspan(0.0, tau_star, color="black", alpha=0.045, lw=0)
    ax.axvline(tau_star, color="black", lw=1.0)
    ax.text(tau_star + 0.004, 2.2e-4, r"$\tau_*=\min(2\rho_{\rm pert},\rho_{\rm res},r_{\rm birth})$", fontsize=8, va="bottom")
    ax.text(0.022, 2.0e-3, r"admissible edge-band regime" "\n" r"$\tau<\tau_*$", fontsize=8)
    ax.set_title("(b) L1-M error-bound decay")
    ax.set_xlabel(r"edge-band half-width  $\tau$")
    ax.set_ylabel("bound contribution")
    ax.set_xlim(0.0, 0.2)
    ax.set_ylim(1e-5, 4)
    ax.grid(True, which="both")
    ax.legend(loc="upper right")

    fig.suptitle(
        "L1-M Soft-Count Envelope: controlled approximation to active-slot count",
        y=1.02,
        fontsize=13,
    )
    fig.text(
        0.5,
        -0.035,
        r"Under T-L1-F regime P0-P11 plus $\phi\in\Phi_{\rm res}$, "
        r"$|K_{\rm soft}^{\phi}(U)-K_{\rm act}^{\varepsilon}|$ is controlled by "
        r"sub-threshold leakage and dominant-bar retention errors.",
        ha="center",
        fontsize=9,
    )
    plt.tight_layout()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT, dpi=220)
    print(f"Saved {OUT}")


if __name__ == "__main__":
    main()
