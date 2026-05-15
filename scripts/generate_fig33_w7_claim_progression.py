"""Generate fig33: W7 claim progression — CV-1.5 → CV-1.17 stacked bar.

Schematic-numerical: the ledger trajectory of formal claims (Cat A / B / C
/ Retracted) across twelve canonical version increments, anchored at the
documented checkpoints CV-1.5 (W5 D1 G0, 57 claims), CV-1.11 (W6 EOD, 78
claims) and CV-1.17 (W7 EOD, 98 claims). Intermediate values are interpolated
to be consistent with the documented per-CV delta hints.
"""
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "content-assets" / "scc-figures" / "fig33-w7-claim-progression.png"


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


# Canonical-version ledger trajectory.
# Tuples are (Cat A, Cat B, Cat C, Retracted). Totals printed as labels.
LEDGER = [
    ("CV-1.5",      (43, 4,  5, 5)),  # W5 D1 G0  → 57
    ("CV-1.5.2",    (46, 5,  5, 5)),  # W5 close  → 61
    ("CV-1.6",      (47, 6,  5, 5)),  # W6 D4     → 63
    ("CV-1.7",      (49, 7,  5, 5)),  # W6 D4     → 66
    ("CV-1.8/1.9",  (53, 7,  5, 5)),  # W6 D4     → 70
    ("CV-1.10",     (53, 8,  5, 5)),  # W6 D4     → 71
    ("CV-1.11",     (54, 14, 5, 5)),  # W6 EOD    → 78  ★ anchored
    ("CV-1.12",     (55, 14, 6, 5)),  # W7 D1-2   → 80
    ("CV-1.13",     (59, 15, 6, 5)),  # W7 D3     → 85
    ("CV-1.15",     (62, 16, 6, 5)),  # W7 D4     → 89
    ("CV-1.16",     (65, 17, 6, 5)),  # W7 D4     → 92
    ("CV-1.17",     (68, 19, 6, 5)),  # W7 D5 EOD → 98  ★ anchored
]


def main() -> None:
    apply_style()

    labels = [row[0] for row in LEDGER]
    a = np.array([row[1][0] for row in LEDGER], dtype=float)
    b = np.array([row[1][1] for row in LEDGER], dtype=float)
    c = np.array([row[1][2] for row in LEDGER], dtype=float)
    r = np.array([row[1][3] for row in LEDGER], dtype=float)
    totals = a + b + c + r

    fig, ax = plt.subplots(figsize=(11.5, 4.6))

    x = np.arange(len(labels))
    width = 0.62

    # Stack: Cat A (dark) | Cat B (mid) | Cat C (light) | Retracted (hatch)
    ax.bar(x, a, width, color="#1f1f1f", label="Cat A — fully proved", edgecolor="black", linewidth=0.4)
    ax.bar(x, b, width, bottom=a, color="#7a7a7a", label="Cat B — structural parameter", edgecolor="black", linewidth=0.4)
    ax.bar(x, c, width, bottom=a + b, color="#c4c4c4", label="Cat C — conditional", edgecolor="black", linewidth=0.4)
    ax.bar(x, r, width, bottom=a + b + c, color="white", hatch="////", label="Retracted", edgecolor="black", linewidth=0.4)

    # Totals on top.
    for xi, total in zip(x, totals):
        ax.text(xi, total + 1.2, f"{int(total)}", ha="center", va="bottom", fontsize=9)

    # W6/W7 boundary marker between CV-1.11 (index 6) and CV-1.12 (index 7).
    boundary = 6.5
    ax.axvline(boundary, color="black", lw=0.9, ls=":")
    ax.text(boundary - 0.04, 102.5, "W6 EOD", ha="right", va="top", fontsize=8.5, style="italic")
    ax.text(boundary + 0.04, 102.5, "W7", ha="left", va="top", fontsize=8.5, style="italic")

    # Delta annotation for the W7 jump.
    ax.annotate(
        "+20 claims this week\n(+14 A, +5 B, +1 C)",
        xy=(len(labels) - 1, 98),
        xytext=(len(labels) - 3.4, 108),
        fontsize=9,
        ha="left",
        va="center",
        arrowprops=dict(arrowstyle="->", lw=0.7, color="black"),
    )

    ax.set_xticks(x)
    ax.set_xticklabels(labels, rotation=30, ha="right")
    ax.set_ylabel("formal claims (cumulative)")
    ax.set_ylim(0, 116)
    ax.set_yticks([0, 20, 40, 60, 80, 100])
    ax.grid(True, axis="y")
    ax.set_title(r"W7 claim progression — CV-1.5 $\to$ CV-1.17 (W5 D1 G0 $\to$ W7 EOD)")
    ax.legend(loc="upper left", ncol=4, bbox_to_anchor=(0.0, -0.20))

    fig.text(
        0.5,
        -0.10,
        "Anchored checkpoints: CV-1.5 = 57, CV-1.11 = 78 (W6 EOD), CV-1.17 = 98 (W7 EOD). "
        "Intermediate values interpolated from the per-CV delta hints in the W7 weekly summary.",
        ha="center",
        fontsize=8.5,
    )

    plt.tight_layout()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT, dpi=220)
    print(f"Saved {OUT}")


if __name__ == "__main__":
    main()
