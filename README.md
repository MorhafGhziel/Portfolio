# morhaf.me

Personal portfolio for Morhaf Ghziel — full-stack developer, Riyadh.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Design system

Everything visual is defined in **`app/globals.css`**. There is no
`tailwind.config.ts` — Tailwind v4 reads its theme from the `@theme static`
block at the top of that file.

| Token group | Notes |
| --- | --- |
| `--color-ink` → `--color-line-2` | Surface stack. Depth comes from ~4% luminance steps and 1px hairlines, never from shadows or blur. |
| `--color-bone`, `--color-mute`, `--color-dim` | Type neutrals. `bone` also serves as the canvas of the one light section. |
| `--color-copper` | **The only accent.** Change this one value to re-skin the site. `--color-copper-deep` is its accessible counterpart on the light band. |
| `--font-display` | Instrument Serif. Display only, never below 24px. |
| `--font-sans` / `--font-mono` | Geist and Geist Mono. Mono is reserved for micro-labels and numerals. |

Type primitives: `.display` + `.d-xl/.d-lg/.d-md/.d-sm` for headlines,
`.eyebrow` for 11px uppercase mono labels, `.body-lg` / `.body-base` for prose.

Two rules worth keeping:

- **`@theme static` is load-bearing.** Tailwind v4 tree-shakes theme variables
  that no utility class references, and the type primitives read several of
  them through plain `var()`. Dropping `static` silently kills the serif.
- **The `next/font` variables live on `<html>`, not `<body>.`** The theme
  tokens are declared on `:root`, and a `var()` there can only resolve
  variables declared on `:root` itself.

## Content

`SKILL_GROUPS` in `constants/index.ts` lists capabilities, not packages —
every entry is used in at least one project below.

All copy lives in `constants/languages.ts` (English + Arabic, with full RTL).
Projects live in `constants/index.ts`; each entry carries a `kind`
(`client` / `practice`), `year`, `role` and a one-line `summary`
that drives the work index and its filters.

To add a project, append to `PROJECTS` — the counts in the hero ledger and the
filter chips derive from that array, so nothing else needs updating.

## Structure

```
app/
  layout.tsx          fonts, metadata, shell
  page.tsx            hero → marquee → work → reel → about → contact
  og.tsx              shared OG/Twitter card renderer
  api/contact/        Resend-backed contact endpoint
components/
  Work.tsx            the editorial index + cursor-following preview
  ui/ProjectSheet.tsx full-screen project detail
```

## Environment

`.env.local`:

```
RESEND_API_KEY=          # required for the contact form
RESEND_FROM_EMAIL=       # defaults to contact@morhaf.me
RESEND_TO_EMAIL=         # defaults to ghzielmorhaf@gmail.com
NEXT_PUBLIC_BASE_URL=    # defaults to https://morhaf.me
```

## Accessibility & motion

Every animation is gated on `prefers-reduced-motion`: the marquee stops, the
scroll-driven reel holds still, and Lenis never initialises. The project sheet
traps Escape and restores scroll; the work index is fully keyboard-reachable
and its rows reveal previews on focus as well as hover.
