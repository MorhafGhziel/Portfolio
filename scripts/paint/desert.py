"""
Renders the desert as separate RGBA layers (sky, far, mid, near, front),
ready for the stroke painter (strokes.py, from the AZAL project).

    uv run --python 3.12 --with numpy --with pillow python scripts/paint/desert.py <out_dir> <dusk|night> <W> <H>

Each dune layer is a silhouette with form: lit on the side facing the low sun,
a warm rim on the crest, falling into shadow below. The painter follows that
form with curved strokes.
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image

out = Path(sys.argv[1])
mood = sys.argv[2]
W, H = int(sys.argv[3]), int(sys.argv[4])
out.mkdir(parents=True, exist_ok=True)
night = mood == "night"
portrait = H > W

rng = np.random.default_rng(7)
xs = np.linspace(0, 1, W, dtype=np.float32)
ys = np.linspace(1, 0, H, dtype=np.float32)  # 1 = top
X, Y = np.meshgrid(xs, ys)
asp = W / H
# Horizon height (0 bottom .. 1 top). Portrait lifts it so the land reads.
HZ = 0.52 if portrait else 0.45
SUN_X = 0.68 if not portrait else 0.62


def hexc(h):
    h = h.lstrip("#")
    return np.array([int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)], np.float32)


P = (
    dict(
        top="#0a0a14", high="#1c1a2e", mid="#4a3d62", low="#9c6f84", hor="#f2b27c",
        glow="#ffd9a8", haze="#8f6a82", dune=["#7a5872", "#5a3f57", "#3a2839", "#1a1219"],
        lit="#e7a07e", shade="#241a2c", rim="#ffc79a",
    )
    if not night
    else dict(
        top="#05050a", high="#0b0b16", mid="#161628", low="#262339", hor="#3d3048",
        glow="#6b5566", haze="#221f33", dune=["#1d1b2c", "#161523", "#100f19", "#0b0a11"],
        lit="#3b3550", shade="#08080d", rim="#6e5f7c",
    )
)
C = {k: (hexc(v) if isinstance(v, str) else [hexc(c) for c in v]) for k, v in P.items()}


def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def mix(a, b, t):
    return a * (1 - t[..., None]) + b * t[..., None]


def save(name, rgb, a=None):
    if a is None:
        a = np.ones(rgb.shape[:2], np.float32)
    arr = np.dstack([np.clip(rgb, 0, 1), np.clip(a, 0, 1)])
    Image.fromarray((arr * 255).astype(np.uint8), "RGBA").save(out / f"{name}.png")
    print("wrote", out / f"{name}.png")


# ---- sky ------------------------------------------------------------------
y = Y - (HZ - 0.45)
sky = mix(C["hor"][None, None].repeat(H, 0).repeat(W, 1), np.broadcast_to(C["low"], (H, W, 3)), smooth(0.44, 0.53, y))
sky = mix(sky, np.broadcast_to(C["mid"], (H, W, 3)), smooth(0.51, 0.66, y))
sky = mix(sky, np.broadcast_to(C["high"], (H, W, 3)), smooth(0.64, 0.84, y))
sky = mix(sky, np.broadcast_to(C["top"], (H, W, 3)), smooth(0.82, 1.0, y))
dx = (X - SUN_X) * max(asp, 0.8)
dy = (y - 0.455) * 2.6
d2 = dx * dx + dy * dy
sky += C["glow"] * (np.exp(-d2 * 10)[..., None] * (0.55 if not night else 0.25) + np.exp(-d2 * 1.8)[..., None] * 0.15)
# a few long, thin cloud bands for the painter to find
for cy, amp, w in ([(0.62, 0.05, 0.010), (0.70, 0.035, 0.008), (0.575, 0.06, 0.006)] if not night else [(0.64, 0.03, 0.01)]):
    band = np.exp(-(((y - cy) / w) ** 2)) * (0.5 + 0.5 * np.sin(X * 9 + cy * 40)) * smooth(0.0, 0.3, X) * smooth(1.0, 0.7, X)
    sky = mix(sky, np.broadcast_to(C["low"] * 1.15 if not night else C["mid"] * 1.3, (H, W, 3)), band * amp * 12)
save("sky", sky)


# ---- dunes ----------------------------------------------------------------
def noise1d(x, seed, octaves=4):
    r = np.random.default_rng(seed)
    v = np.zeros_like(x)
    amp, f = 0.5, 1.0
    for _ in range(octaves):
        knots = r.random(256).astype(np.float32)
        xi = (x + 10) * 2.2 * f  # ~2 soft bumps per unit at the first octave; offset keeps xi positive
        i = np.floor(xi).astype(int) % 255
        t = xi - np.floor(xi)
        t = t * t * (3 - 2 * t)
        v += amp * (knots[i] * (1 - t) + knots[i + 1] * t)
        amp *= 0.45
        f *= 2.07
    return v


layers = [
    # name, base, amplitude, frequency, seed
    ("far", 0.445, 0.022, 2.0, 11),
    ("mid", 0.40, 0.045, 1.4, 23),
    ("near", 0.315, 0.07, 1.0, 37),
    ("front", None, None, None, 51),
]
xw = (xs - 0.5) * max(asp, 0.9) + 0.5
for k, (name, base, amp, freq, seed) in enumerate(layers):
    kk = k / 3
    if name == "front":
        # One broad soft mound, away from the sun, where the headline sits.
        cx = 0.28 if not portrait else 0.35
        ddx = (xw - cx) / (0.62 if not portrait else 0.9)
        h = 0.06 + 0.25 * np.exp(-ddx * ddx * 1.6) + 0.03 * noise1d(xw * 0.8, seed)
    else:
        h = base + amp * noise1d(xw * freq, seed) ** 1.5 * 2.4
    h = h + (HZ - 0.45)
    # smooth the profile so flanks are long and crests are round
    kern = np.exp(-np.linspace(-3, 3, max(3, W // 60)) ** 2)
    kern /= kern.sum()
    h = np.convolve(np.pad(h, len(kern), mode="edge"), kern, mode="same")[len(kern) : -len(kern)]
    slope = np.gradient(h) * W / max(asp, 1)  # dh/dx
    Hh = h[None, :]
    inside = (Y <= Hh).astype(np.float32)
    depth = np.clip(Hh - Y, 0, 1)
    # lit when the flank faces the sun
    facing = np.tanh((SUN_X - xs) * 6)[None, :] * slope[None, :]
    light = np.clip(0.45 + facing * 3.0, 0, 1)
    body = mix(np.broadcast_to(C["shade"], (H, W, 3)), np.broadcast_to(C["dune"][k], (H, W, 3)), 0.55 + 0.45 * np.broadcast_to(light, (H, W)))
    body = mix(body, np.broadcast_to(C["lit"], (H, W, 3)), np.broadcast_to(light, (H, W)) ** 3 * (0.55 - 0.35 * kk) * np.exp(-depth / 0.05))
    # aerial haze on the far layers
    body = mix(body, np.broadcast_to(C["haze"], (H, W, 3)), np.full((H, W), 0.55 * (1 - kk) ** 1.5, np.float32))
    # fall into shadow below the crest
    body = mix(body, np.broadcast_to(C["shade"], (H, W, 3)), smooth(0.0, 0.08 + 0.12 * kk, depth) * (0.35 + 0.55 * kk))
    # rim light
    near_sun = np.exp(-(((xs - SUN_X) * (2.4 - 1.2 * kk)) ** 2))[None, :]
    rim = np.exp(-depth / (0.004 + 0.012 * kk)) * (0.3 + 0.7 * near_sun)
    body += C["rim"] * rim[..., None] * (0.5 - 0.1 * kk) * (0.5 if night else 1)
    save(name, body, inside)

# ---- mist: soft low bands that drift between the dune layers ---------------
mist_a = np.zeros((H, W), np.float32)
r2 = np.random.default_rng(99)
for _ in range(9):
    cx, cy = r2.uniform(-0.1, 1.1), (HZ - 0.45) + r2.uniform(0.36, 0.46)
    wx, wy = r2.uniform(0.18, 0.4), r2.uniform(0.018, 0.035)
    mist_a += np.exp(-(((X - cx) / wx) ** 2 + ((Y - cy) / wy) ** 2)) * r2.uniform(0.3, 0.6)
mist_rgb = np.broadcast_to(C["glow"] * (0.85 if not night else 0.5) + C["low"] * 0.15, (H, W, 3))
save("mist", np.array(mist_rgb), np.clip(mist_a, 0, 0.6) * (1 if not night else 0.6))
