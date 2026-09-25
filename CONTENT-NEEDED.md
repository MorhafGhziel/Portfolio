# Content needed

Everything on the site is real. Where something was missing, the block is either
hidden or marked here. Nothing was invented.

## Please confirm or replace

| What | Where | Why |
|---|---|---|
| **WhatsApp number** | `content/settings.ts` → `whatsapp` | Set to `966582737120`, the SIMA Studio line. Change it if you want a personal number on murhaf.site. |
| **Budget ranges** | `content/settings.ts` → `budgets` | Placeholder ranges: under 10k / 10–25k / 25–60k / 60k+ SAR. Set your own. |
| **Response time** | `content/settings.ts` → `responseTime` | "within 24 hours", carried over from the old site. |
| **Availability** | `content/settings.ts` → `availability` | `open: true`. Set to `false` to hide the status line. |
| **Challenge / idea texts** | `content/projects.ts` | Written from your existing build notes, then shortened. Read them once. |
| **Arabic accent font** | `scripts/subset-accent.py` | Re-run the script if you change any `*starred*` Arabic word or an Arabic headline. |

## Missing, so the block is hidden

| What | Projects | Effect now |
|---|---|---|
| **The challenge** (2–4 lines) | Archy, IEDAR, Snaya, Alpha Factory Platform | Case study shows "The idea" only |
| **Real results** (numbers you can back up) | All except INNO | Results block is skipped |
| **Captions for key screens** | All | Screens are shown without captions |
| **Testimonials** (with permission) | — | `settings.testimonials` is empty, so nothing shows |

## Media to improve

- **Final showreel.** `public/media/reel/reel.mp4` is an automatic montage: 6 × 2.4 s of scrolled live sites, hard cuts, no sound. Replace it with a real cut; keep the same file names. The button says "Play full screen" and not "Play with sound", because there is no soundtrack yet.
- **Alpha Factory Platform.** The live site is a login screen, so it has no preview video, only a still. A screen recording of the dashboard would help.
- **Posters.** A few were captured mid-animation (for example IEDAR's is dim). You can re-capture any `poster.webp` / `poster.jpg` at 1280×800.
- **Phone screens.** The 1/3 and 2/3 scroll shots sometimes land on empty space (for example IEDAR `m3.webp`). Replace them with better screens at 780×1688.
- **Studio / portrait photo.** It uses `public/images/me.png`. A wider, better-lit photo would suit the About split better.
