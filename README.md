# murhaf.site

Portfolio of Murhaf Ghziel, designer and full-stack developer in Riyadh.
*The work is the hero. The site is the proof.*

Next.js 15 (App Router) · React 19 · TypeScript · GSAP + ScrollTrigger + Flip · Lenis ·
raw WebGL · View Transitions (`next-view-transitions`) · plain CSS for the public site ·
Prisma + Neon for analytics and messages · Resend for email.

```bash
npm install
npm run dev          # http://localhost:3000  →  redirects to /en
npm run build && npm start
```

Deploy on Vercel as before. Set these in the project's environment variables (values in `.env.local`, never committed):

| Variable | Needed for |
|---|---|
| `DATABASE_URL`, `DIRECT_URL` | analytics, admin, storing contact messages |
| `RESEND_API_KEY` | sending contact-form email. Without it the form answers 503 and tells the visitor to email directly. It never fakes a success. |
| `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` | optional overrides |
| `NEXT_PUBLIC_BASE_URL` | canonical URLs, sitemap, OG (default `https://murhaf.site`) |
| admin auth vars | unchanged, see `docs/admin-dashboard.md` |

## Structure

```
content/          ← everything you edit
  projects.ts     all projects + FEATURED (home order)
  settings.ts     email, WhatsApp, availability, response time, budgets, socials, CV, testimonials
  copy.ts         every interface string, EN + AR (*starred* word = italic serif)
app/(site)/[lang] the public site: /en, /ar, /[lang]/work, /[lang]/work/[slug]
  site.css        tokens, type, nav, hero, reel
  sections.css    work, services, process, about, contact, case study, transitions
app/admin         dashboard (own root layout, unchanged)
components/site   Horizon (shader), Reel, WorkGrid, ProjectCard, Services, Contact, Nav…
public/media/     <slug>/preview.mp4|webm, poster.jpg|webp, m1–m3.webp; reel/; desert/
scripts/          paint/ (desert.py, strokes.py), subset-accent.py
```

`middleware.ts` sends any path without a locale to `/en`; a bare `/` goes to `/ar` when the browser prefers Arabic. Old URLs (`/contact`) redirect.

## Add a project

1. Add one entry to `PROJECTS` in `content/projects.ts`. Leave `challenge`, `idea` and `results` out if you have nothing true to say; the blocks hide themselves.
2. Put media in `public/media/<slug>/`: `preview.mp4` + `preview.webm` (1280×800, muted, ~8 s), `poster.webp` + `poster.jpg`, and `m1–m3.webp` (780×1688). Anything missing falls back to `cover`.
3. To show it on the home page, add its slug to `FEATURED`.

No code changes needed. Case pages, OG images, the sitemap and "Next project" pick it up.

## The three moments

- **The Horizon** (`components/site/Horizon.tsx`) is a hand-painted desert in six layers (sky, far, mist, mid, near, front), the same approach as AZAL. `scripts/paint/desert.py` renders the layers and `scripts/paint/strokes.py` (the AZAL stroke painter) paints them. The pointer shifts the layers apart by depth, scrolling sinks the land, and the mist drifts. Dusk sits in the hero and night in Contact, and every section sits on the painting's ground colour (`--bg`). Files live in `public/media/desert/<dusk|night>/<wide|tall>/`. Repaint with:
  `uv run --python 3.12 --with numpy --with pillow python scripts/paint/desert.py <dir> dusk 1920 1080`, then `strokes.py <dir>/<layer>.png <out>.png <layer>` for each layer.
- **The Reel** (`Reel.tsx`) animates one CSS variable, `--p`, which drives both the clip-path and the corner labels. It pins an inner stage, never the React-owned section.
- **The seamless open**: card media and case hero share `view-transition-name: media-<slug>`. `next-view-transitions` wraps navigation, and browser back reverses the transition.

## Fonts and licences

- Geist, Geist Mono, Instrument Serif and IBM Plex Sans Arabic: SIL OFL, self-hosted by `next/font`.
- Amiri Bold: SIL OFL (`assets/fonts/Amiri-OFL.txt`), subset to the Arabic accent words by `scripts/subset-accent.py` (35 KB instead of ~100 KB).

## Asset sources

- Project videos, posters and phone screens: captured by Claude from the live sites listed in each project (your own work), September 2026.
- Showreel: a montage of those captures. Replace it with a real cut (see CONTENT-NEEDED.md).
- Portrait: `public/images/me.png` (existing).
- Desert: rendered and stroke-painted in code (scripts/paint), no stock.

See **CONTENT-NEEDED.md** for what's still missing.
