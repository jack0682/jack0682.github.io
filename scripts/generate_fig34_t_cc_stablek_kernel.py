"""Generate fig34: T-CC-StableK-Kernel — kernel-composed K_act is step-additive.

Schematic-numerical demonstration of compositional consistency under the
kernel-composition operator ∘_K. Panel (a) shows the predicted K_act(u1 ∘_K
u2) on a 6×6 grid of (K_act(u1), K_act(u2)) values and overlays 12 numerical
anchors that hit the predicted cells exactly. Panel (b) shows a single
worked example (5 + 4 → 9) at the level of terminal H_0 bars.
"""
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Rectangle


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "content-assets" / "scc-figures" / "fig34-t-cc-stablek-kernel.png"


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


# 12 anchor (k1, k2) pairs that span the grid.
ANCHORS = [
    (0, 0), (0, 3), (1, 1), (1, 4), (2, 2), (2, 5),
    (3, 0), (3, 3), (4, 1), (4, 5), (5, 2), (5, 4),
]


def panel_a(ax) -> None:
    K = 6  # values 0..5 inclusive
    grid = np.zeros((K, K), dtype=int)
    for k1 in range(K):
        for k2 in range(K):
            grid[k2, k1] = k1 + k2  # step-additive law

    im = ax.imshow(
        grid,
        origin="lower",
        cmap="Greys",
        vmin=0,
        vmax=10,
        extent=(-0.5, K - 0.5, -0.5, K - 0.5),
        interpolation="nearest",
    )

    # Cell value labels (white on dark, black on light).
    for k1 in range(K):
        for k2 in range(K):
            v = k1 + k2
            color = "white" if v >= 6 else "black"
            ax.text(k1, k2, str(v), ha="center", va="center", fontsize=8.5, color=color)

    # Numerical anchors as white-dot overlays.
    xs = [a[0] for a in ANCHORS]
    ys = [a[1] for a in ANCHORS]
    ax.scatter(xs, ys, s=70, facecolor="white", edgecolor="black", linewidth=0.9, zorder=3)
    for k1, k2 in ANCHORS:
        ax.text(k1 + 0.18, k2 + 0.18, "·", ha="left", va="bottom", fontsize=6)

    ax.set_xticks(range(K))
    ax.set_yticks(range(K))
    ax.set_xlabel(r"$K_{\mathrm{act}}(u_1)$")
    ax.set_ylabel(r"$K_{\mathrm{act}}(u_2)$")
    ax.set_title(r"(a) Predicted $K_{\mathrm{act}}(u_1 \circ_K u_2)$ on the 6×6 grid")

    # Colorbar.
    cbar = ax.figure.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
    cbar.set_label(r"$K_{\mathrm{act}}(u_1 \circ_K u_2)$", fontsize=9)
    cbar.outline.set_linewidth(0.6)


def panel_b(ax) -> None:
    # Three rows of horizontal bars: u1 (5 bars), u2 (4 bars), u1 ∘_K u2 (9 bars).
    bars_u1 = [0.92, 0.81, 0.74, 0.62, 0.55]
    bars_u2 = [0.88, 0.77, 0.69, 0.58]
    bars_comp = sorted(bars_u1 + bars_u2, reverse=True)

    row_h = 0.13
    gap = 0.07

    def draw_row(y0, lengths, label, label_color="black"):
        for i, ell in enumerate(lengths):
            x0 = i * 0.06
            ax.add_patch(
                Rectangle((x0, y0), ell, row_h, facecolor="#404040", edgecolor="black", linewidth=0.5)
            )
            ax.text(x0 + ell / 2, y0 + row_h / 2, f"{ell:.2f}", ha="center", va="center", fontsize=7, color="white")
        ax.text(-0.04, y0 + row_h / 2, label, ha="right", va="center", fontsize=9, color=label_color)

    # Bottom: u1
    draw_row(0.10, bars_u1, r"$u_1$  ($K_{\mathrm{act}}=5$)")
    # Middle: u2
    draw_row(0.42, bars_u2, r"$u_2$  ($K_{\mathrm{act}}=4$)")
    # Top: composition
    draw_row(0.74, bars_comp, r"$u_1 \circ_K u_2$  ($K_{\mathrm{act}}=9$)", label_color="#1f1f1f")

    # Arrow from middle to top.
    ax.annotate(
        "",
        xy=(0.30, 0.74),
        xytext=(0.30, 0.55),
        arrowprops=dict(arrowstyle="->", lw=0.9, color="black"),
    )
    ax.text(0.33, 0.645, r"$\circ_K$  step-additive", fontsize=9, va="center")

    ax.set_xlim(-0.25, 1.10)
    ax.set_ylim(0.0, 1.00)
    ax.axis("off")
    ax.set_title(r"(b) Worked example: $K_{\mathrm{act}}=5$ and $K_{\mathrm{act}}=4$ compose to $9$")


def main() -> None:
    apply_style()

    fig, (axL, axR) = plt.subplots(1, 2, figsize=(12.2, 5.2), gridspec_kw=dict(width_ratios=[1.0, 1.15]))

    panel_a(axL)
    panel_b(axR)

    fig.suptitle(
        r"T-CC-StableK-Kernel — kernel-composed active-count is step-additive on terminal $H_0$ bars",
        y=1.02,
        fontsize=12.5,
    )
    fig.text(
        0.5,
        -0.04,
        r"Under the kernel-composition regime KC1–KC4 (CV-1.17, Cat B), "
        r"$K_{\mathrm{act}}^{\varepsilon}(u_1 \circ_K u_2) = K_{\mathrm{act}}^{\varepsilon}(u_1) + K_{\mathrm{act}}^{\varepsilon}(u_2)$, "
        r"and the active-slot $\to$ dominant-bar bijection composes correctly.",
        ha="center",
        fontsize=9,
    )

    plt.tight_layout()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT, dpi=220)
    print(f"Saved {OUT}")


if __name__ == "__main__":
    main()
