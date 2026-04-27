#!/usr/bin/env python3
"""Compose the three Kanagawa preview screenshots into a single cover.

Reads every ``*.png`` (sorted by filename) in this directory and stacks them
diagonally from top-left to bottom-right; each later image partially covers
the previous one. The result is written to ``cover.png`` next to this script.

Tunables at the top of the file: ``TILE_WIDTH`` controls the rendered size of
each preview, ``STEP_RATIO`` controls how far each subsequent preview is
offset (0.0 = fully overlapped, 1.0 = no overlap). Defaults give a balanced
"~60% visible per layer" cascade.

Usage:
    python3 generate.py
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

# ---- Tunables --------------------------------------------------------------

#: Target width (pixels) of each individual preview after resizing.
TILE_WIDTH: int = 1600

#: Diagonal step between successive previews, expressed as a fraction of
#: each tile's own width / height. 0.40 -> each new tile shifts 40% of its
#: own size, leaving 60% of the previous tile visible. Tweak between roughly
#: 0.30 and 0.50 to taste.
STEP_RATIO: float = 0.40

#: Background color of the composite (RGBA). Fully transparent by default
#: so the source images' own alpha channels are preserved end-to-end.
BG_COLOR: tuple[int, int, int, int] = (0, 0, 0, 0)

#: Outer margin around the cascade (pixels, after resizing).
MARGIN: int = 0

# ---- Implementation --------------------------------------------------------

HERE = Path(__file__).resolve().parent
OUTPUT = HERE / "cover.png"


def collect_inputs() -> list[Path]:
    """Find input PNGs in this directory, sorted by filename, excluding the
    output file itself.
    """
    files = sorted(p for p in HERE.glob("*.png") if p.name != OUTPUT.name)
    if len(files) < 2:
        sys.exit(
            f"generate.py: need at least 2 input PNGs in {HERE}, found {len(files)}"
        )
    return files


def resize_to_width(img: Image.Image, width: int) -> Image.Image:
    """Resize ``img`` so its width matches ``width``, preserving aspect."""
    ratio = width / img.width
    new_size = (width, max(1, round(img.height * ratio)))
    return img.resize(new_size, Image.Resampling.LANCZOS)


def add_border(img: Image.Image) -> Image.Image:  # pragma: no cover - kept for API stability
    """No-op; borders are intentionally disabled to preserve the source alpha."""
    return img


def main() -> None:
    inputs = collect_inputs()
    print(f"Compositing {len(inputs)} image(s):")
    for p in inputs:
        print(f"  - {p.name}")

    # Load + normalize all tiles to the same width.
    tiles: list[Image.Image] = []
    for path in inputs:
        with Image.open(path) as src:
            tile = src.convert("RGBA")
        tile = resize_to_width(tile, TILE_WIDTH)
        tile = add_border(tile)
        tiles.append(tile)

    # Determine canvas size from the bounding box of the cascade.
    # Each tile i is anchored at (i * dx, i * dy).
    tile_w, tile_h = tiles[0].size
    dx = round(tile_w * STEP_RATIO)
    dy = round(tile_h * STEP_RATIO)
    n = len(tiles)
    canvas_w = tile_w + dx * (n - 1) + MARGIN * 2
    canvas_h = tile_h + dy * (n - 1) + MARGIN * 2

    canvas = Image.new("RGBA", (canvas_w, canvas_h), BG_COLOR)

    # Paste in order: earlier filenames sit further back; later ones cover.
    for i, tile in enumerate(tiles):
        x = MARGIN + i * dx
        y = MARGIN + i * dy
        canvas.alpha_composite(tile, (x, y))

    canvas.save(OUTPUT, format="PNG", optimize=True)
    print(f"Wrote {OUTPUT.relative_to(HERE.parent.parent)} "
          f"({canvas_w}x{canvas_h})")


if __name__ == "__main__":
    main()
