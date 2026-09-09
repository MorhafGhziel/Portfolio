/**
 * Bot filtering.
 *
 * Unfiltered, a portfolio's numbers are mostly crawlers: Google, Bing, the
 * LinkedIn and WhatsApp link unfurlers, uptime monitors, and every headless
 * browser that renders the page for a preview card. A dashboard that counts
 * those is not merely inaccurate, it is actively misleading — it reports a
 * spike every time a link is pasted into a chat.
 *
 * This is a denylist, so it is never complete. It is deliberately biased
 * towards dropping traffic: a missed human is one row, a counted crawler
 * distorts every chart on the page.
 */

const BOT_PATTERNS = [
  // Generic self-identification. Most well-behaved crawlers say one of these.
  "bot",
  "crawl",
  "spider",
  "slurp",

  // Headless and automation — Lighthouse, PageSpeed, Playwright, Puppeteer.
  "headless",
  "phantomjs",
  "electron",
  "lighthouse",
  "pagespeed",
  "gtmetrix",
  "pingdom",
  "uptime",
  "monitor",
  "curl",
  "wget",
  "python-requests",
  "axios",
  "node-fetch",
  "got ",
  "okhttp",
  "java/",

  // Link unfurlers. These fire whenever the URL is pasted into a chat and are
  // the single largest source of phantom traffic on a personal site.
  "facebookexternalhit",
  "whatsapp",
  "telegrambot",
  "slackbot",
  "discordbot",
  "twitterbot",
  "linkedinbot",
  "skypeuripreview",
  "embedly",
  "quora link preview",
  "redditbot",
  "applebot",

  // Platform and SEO tooling.
  "vercel",
  "chrome-lighthouse",
  "ahrefs",
  "semrush",
  "mj12",
  "dotbot",
  "petalbot",
  "dataprovider",
  "screaming frog",
];

/**
 * True when the request should not be counted.
 *
 * An empty or absent user agent counts as a bot: every real browser sends one,
 * so a missing UA means a script.
 */
export function isBot(ua: string | null | undefined): boolean {
  if (!ua) return true;
  const s = ua.toLowerCase();
  if (s.length < 12) return true; // no real browser UA is this short
  return BOT_PATTERNS.some((pattern) => s.includes(pattern));
}
