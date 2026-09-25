/**
 * Exports the horizon shader as still images, used as the background when a
 * device can't run WebGL (no GPU, blocked, or reduced to software rendering).
 *
 *   npx next start -p 4210   # in another terminal
 *   node scripts/capture-horizon.js
 *
 * Needs Playwright (npx playwright install chromium) and ffmpeg on PATH, and a
 * real GPU (it uses the installed Chrome). Grain is left out on purpose: the
 * site's grain overlay sits on top of the still anyway.
 */
const { chromium } = require("playwright");
const { execFileSync } = require("node:child_process");
const { mkdirSync, rmSync } = require("node:fs");
const path = require("node:path");

const BASE = process.env.BASE || "http://localhost:4210";
const OUT = path.join(__dirname, "..", "public", "media", "horizon");

const shots = [
  { name: "dusk-wide", w: 1600, h: 1000, sel: ".hero .horizon" },
  { name: "dusk-tall", w: 640, h: 1280, sel: ".hero .horizon" },
  { name: "night-wide", w: 1600, h: 1000, sel: "#contact .horizon" },
  { name: "night-tall", w: 640, h: 1280, sel: "#contact .horizon" },
];

(async () => {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({
    channel: "chrome",
    args: ["--headless=new", "--enable-gpu", "--ignore-gpu-blocklist"],
  });
  for (const s of shots) {
    const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
    await page.addInitScript(() => (window.__horizonStill = true));
    await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content: ".nav,.hero__body,.hero__meta,.grain,.contact__inner,.cursor{visibility:hidden!important}",
    });
    await page.locator(s.sel).scrollIntoViewIfNeeded();
    await page.waitForFunction((sel) => document.querySelector(sel)?.dataset.ready === "1", s.sel, { timeout: 15000 });
    await page.waitForTimeout(400);
    const png = path.join(OUT, `${s.name}.png`);
    await page.locator(s.sel).screenshot({ path: png });
    const webp = path.join(OUT, `${s.name}.webp`);
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", png, "-c:v", "libwebp", "-quality", "72", webp]);
    rmSync(png);
    console.log("wrote", path.relative(process.cwd(), webp));
    await page.close();
  }
  await browser.close();
})();
