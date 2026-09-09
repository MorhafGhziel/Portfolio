# Admin dashboard — setup and how it works

A login-protected dashboard at `/admin` with first-party visitor analytics and
a contact inbox. Nothing about the public site's rendering changed: `/` and
`/contact` are still statically prerendered.

---

## Setup (once, ~10 minutes)

### 1. Create a Neon database

1. Sign in at <https://console.neon.tech> and create a project.
2. On the dashboard, copy **two** connection strings:
   - the **pooled** one (host contains `-pooler`) → `DATABASE_URL`
   - the **direct** one (no `-pooler`) → `DIRECT_URL`

Both are already stubbed in `.env.local`; replace the placeholder values.

The split matters: serverless functions open many short-lived connections and
need the pooler, while `prisma migrate` needs a real session because PgBouncer
in transaction mode cannot hold the advisory locks migrations take out.

### 2. Create the tables

```bash
npx prisma migrate deploy
```

### 3. Add the same variables to Vercel

Project → Settings → Environment Variables, for **Production**:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Neon pooled string |
| `DIRECT_URL` | Neon direct string |
| `ADMIN_EMAILS` | `ghzielmorhaf@gmail.com` |
| `ANALYTICS_SALT` | copy from `.env.local` |
| `SESSION_SECRET` | copy from `.env.local` |

`RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL` are already set.

> **Do not change `ANALYTICS_SALT` after launch.** It seeds the visitor hash, so
> changing it makes every returning visitor look new for a day.

### 4. Sign in

Deploy, then open `/admin`. Enter your email, and a six-digit code arrives from
Resend. The session lasts 30 days.

---

## What is collected

| Recorded | Not recorded |
| --- | --- |
| Country, city (Vercel edge headers) | IP addresses |
| Device, browser, OS | Names, emails, employers |
| Page paths, referrer **host** | Full referring URLs |
| UTM source / medium / campaign | Anything cross-site |
| Language read (en / ar) | Any cookie for tracking |

Visitors are identified by `SHA-256(IP + user-agent + ANALYTICS_SALT + UTC date)`,
truncated. The IP is used to compute that and then discarded — it is never
written to a column. Because the date is part of the input, the hash rotates at
UTC midnight: "unique visitors today" is accurate, and following one person
across weeks is impossible by construction.

That is what keeps the site clear of GDPR and Saudi PDPL obligations around
personal data, and why there is no consent banner.

**Not counted:** bots and link unfurlers (WhatsApp, LinkedIn, Slack previews),
anyone sending Do Not Track or Global Privacy Control, automated browsers, and
you — signing in sets a `pf_admin` cookie that the beacon checks.

---

## Events

Beyond page views, four things are recorded:

| Event | Fires when |
| --- | --- |
| `cv_download` | Download CV is clicked on the home page |
| `project_open` | A project sheet is opened (records the slug) |
| `outbound_click` | A live-site or GitHub link is clicked (records the host) |
| `contact_submit` | The contact form submits successfully |

### Tagging a link for a job application

Add UTM parameters to the URL you put in an application:

```
https://morhaf.me/?utm_source=linkedin&utm_campaign=acme-frontend
```

Opens of that exact link appear under **Sources → Campaigns**, so you can tell
which application was actually looked at.

---

## Architecture

```
components/Analytics.tsx        page views on route change
lib/analytics/client.ts         session id, opt-out, sendBeacon
        │
        ▼  POST /api/track      validated, bot-filtered, rate-limited, always 204
lib/analytics/queries.ts        every dashboard read, in one module
        │
        ▼
app/admin/(dash)/*              server components, no client JS except the live badge
```

**Why `/api/track` always returns 204.** A visitor must never see an error, a
delay or a console message because analytics had a problem. Every failure path —
invalid payload, bot, rate limit, database unreachable — exits identically. The
only difference is whether a row was written.

**Where authorization actually happens.** `middleware.ts` only checks that a
session cookie exists, because it runs on the Edge runtime where Prisma cannot
follow. A forged cookie gets past it and then fails in
`app/admin/(dash)/layout.tsx`, which looks the token up in the database. Every
dashboard page renders as a child of that layout, so no route can skip the
check. Server actions re-check independently, since Next exposes each one as a
callable endpoint.

**Sessions are database rows, not JWTs**, so signing out actually revokes
access. The cookie holds a random token; the table stores only its hash.

---

## Running it locally

```bash
npm run dev        # http://localhost:3000/admin
npm test           # 65 unit tests over the pure logic
npm run typecheck
```

Tests cover the parts where bugs hide silently: user-agent parsing (Edge
claiming to be Chrome, Android claiming to be Linux), bot detection, the visitor
hash rotating correctly at UTC midnight, referrer stripping, date-range
boundaries, and the OTP rules.

---

## Adding a new tracked event

1. Add the name to `EVENT_TYPES` in `lib/analytics/events.ts`.
2. Call `track("your_event", { name: "detail" })` from any client component.
3. Read it with `getEventCounts(range, "your_event")`.

No migration is needed — `Event` is one denormalised table on purpose.

---

## Costs

Nothing. Neon's free tier covers this by orders of magnitude; a portfolio
generates a few thousand rows a month against a limit measured in gigabytes.

Neon's free tier suspends a database after five minutes idle, so the first
dashboard load after a quiet period takes a second or two to wake it. Visitor
tracking is unaffected — those writes wake it too, and a failed write is a
missing row rather than a broken page.
