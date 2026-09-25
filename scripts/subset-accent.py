"""
Subset Amiri Bold down to the Arabic accent words used on the site.

The italic-serif accent in Arabic is Amiri. The full font is ~100 KB for a
handful of words, so this keeps only the glyphs those words need (plus the
shaping tables, so letters still join correctly).

Run after changing any *starred* Arabic word in content/copy.ts or a
project's Arabic headline:

    uv run --python 3.12 --with fonttools --with brotli python scripts/subset-accent.py

Anything outside the subset falls back to IBM Plex Sans Arabic, so a missing
glyph degrades gracefully instead of breaking.
"""

import re
from pathlib import Path

from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "fonts" / "Amiri-Bold.ttf"
OUT = ROOT / "app" / "(site)" / "[lang]" / "fonts" / "amiri-accent.woff2"

text = ""
copy = (ROOT / "content" / "copy.ts").read_text(encoding="utf8")
text += "".join(re.findall(r"\*([^*\n]+)\*", copy))
projects = (ROOT / "content" / "projects.ts").read_text(encoding="utf8")
# Case-study headlines are set in the accent face too.
for block in re.findall(r'"headline":\s*\{[^}]*"ar":\s*"([^"]+)"', projects):
    text += block
# Arabic letters that appear in the accent words, plus basic punctuation.
chars = sorted(set(c for c in text if ord(c) >= 0x0600) | set(" .،؟!"))

opts = subset.Options()
opts.flavor = "woff2"
opts.layout_features = ["*"]
opts.name_IDs = ["*"]
opts.notdef_outline = True
font = subset.load_font(str(SRC), opts)
sub = subset.Subsetter(opts)
sub.populate(text="".join(chars))
sub.subset(font)
OUT.parent.mkdir(parents=True, exist_ok=True)
subset.save_font(font, str(OUT), opts)
print(f"{len(chars)} characters -> {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")
