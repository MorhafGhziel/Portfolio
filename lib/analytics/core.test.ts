import { describe, expect, it } from "vitest";
import { isBot } from "./bots";
import { normalisePath } from "./events";
import { referrerHost, referrerLabel } from "./referrer";
import {
  bucketStarts,
  percentChange,
  resolveRange,
  isRangeKey,
} from "./range";
import { utcDateKey, visitorHash, clientIp } from "./visitor";

describe("isBot", () => {
  it("drops the link unfurlers that fire when a URL is pasted into a chat", () => {
    expect(isBot("WhatsApp/2.23.20.0")).toBe(true);
    expect(isBot("Mozilla/5.0 (compatible; LinkedInBot/1.0)")).toBe(true);
    expect(isBot("Slackbot-LinkExpanding 1.0")).toBe(true);
    expect(isBot("facebookexternalhit/1.1")).toBe(true);
    expect(isBot("TelegramBot (like TwitterBot)")).toBe(true);
  });

  it("drops crawlers and automation", () => {
    expect(isBot("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
    expect(isBot("Mozilla/5.0 HeadlessChrome/126.0.0.0")).toBe(true);
    expect(isBot("curl/8.4.0")).toBe(true);
    expect(isBot("python-requests/2.31.0")).toBe(true);
    expect(isBot("Chrome-Lighthouse")).toBe(true);
  });

  it("treats a missing or stub user agent as a script", () => {
    expect(isBot(null)).toBe(true);
    expect(isBot(undefined)).toBe(true);
    expect(isBot("")).toBe(true);
    expect(isBot("x")).toBe(true);
  });

  it("lets real browsers through", () => {
    expect(
      isBot(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      ),
    ).toBe(false);
    expect(
      isBot(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
      ),
    ).toBe(false);
  });
});

describe("normalisePath", () => {
  it("strips the query string and hash", () => {
    expect(normalisePath("/work?utm_source=linkedin")).toBe("/work");
    expect(normalisePath("/about#skills")).toBe("/about");
  });

  it("collapses a trailing slash so one page is one row", () => {
    expect(normalisePath("/contact/")).toBe("/contact");
    expect(normalisePath("/contact")).toBe("/contact");
  });

  it("leaves the root alone", () => {
    expect(normalisePath("/")).toBe("/");
  });

  it("always returns an absolute path", () => {
    expect(normalisePath("work")).toBe("/work");
  });

  it("caps absurd input", () => {
    expect(normalisePath(`/${"a".repeat(1000)}`).length).toBeLessThanOrEqual(300);
  });
});

describe("referrerHost", () => {
  const self = "morhaf.me";

  it("returns null for direct traffic", () => {
    expect(referrerHost(null, self)).toBeNull();
    expect(referrerHost("", self)).toBeNull();
  });

  it("returns null for internal navigation, with or without www", () => {
    expect(referrerHost("https://morhaf.me/work", self)).toBeNull();
    expect(referrerHost("https://www.morhaf.me/work", self)).toBeNull();
  });

  it("keeps only the host, never the path or query", () => {
    expect(
      referrerHost("https://www.google.com/search?q=secret+terms", self),
    ).toBe("google.com");
  });

  it("ignores non-http schemes and unparseable values", () => {
    expect(referrerHost("android-app://com.linkedin", self)).toBeNull();
    expect(referrerHost("not a url", self)).toBeNull();
  });
});

describe("referrerLabel", () => {
  it("names direct traffic", () => {
    expect(referrerLabel(null)).toBe("Direct");
  });

  it("groups a source's many domains under one name", () => {
    expect(referrerLabel("google.com")).toBe("Google");
    expect(referrerLabel("google.co.uk")).toBe("Google");
    expect(referrerLabel("lnkd.in")).toBe("LinkedIn");
    expect(referrerLabel("linkedin.com")).toBe("LinkedIn");
    expect(referrerLabel("t.co")).toBe("X / Twitter");
  });

  it("falls back to the bare host", () => {
    expect(referrerLabel("some-blog.dev")).toBe("some-blog.dev");
  });
});

describe("resolveRange", () => {
  const now = new Date("2026-06-15T12:00:00.000Z");

  it("picks a bucket size that suits the span", () => {
    expect(resolveRange("24h", now).bucket).toBe("hour");
    expect(resolveRange("7d", now).bucket).toBe("day");
    expect(resolveRange("30d", now).bucket).toBe("day");
    expect(resolveRange("90d", now).bucket).toBe("week");
  });

  it("compares against a previous window of identical length", () => {
    const r = resolveRange("7d", now);
    expect(r.from?.toISOString()).toBe("2026-06-08T12:00:00.000Z");
    expect(r.previousFrom?.toISOString()).toBe("2026-06-01T12:00:00.000Z");
    expect(r.previousTo?.toISOString()).toBe("2026-06-08T12:00:00.000Z");
  });

  it("has no lower bound or comparison window for all-time", () => {
    const r = resolveRange("all", now);
    expect(r.from).toBeNull();
    expect(r.previousFrom).toBeNull();
  });
});

describe("isRangeKey", () => {
  it("accepts only the known keys", () => {
    expect(isRangeKey("7d")).toBe(true);
    expect(isRangeKey("all")).toBe(true);
    expect(isRangeKey("1y")).toBe(false);
    expect(isRangeKey(null)).toBe(false);
    expect(isRangeKey(undefined)).toBe(false);
  });
});

describe("percentChange", () => {
  it("computes ordinary movement", () => {
    expect(percentChange(150, 100)).toBe(50);
    expect(percentChange(50, 100)).toBe(-50);
    expect(percentChange(100, 100)).toBe(0);
  });

  it("reports growth from zero as unknown rather than infinite", () => {
    expect(percentChange(10, 0)).toBeNull();
  });

  it("treats nothing-to-nothing as flat, not unknown", () => {
    expect(percentChange(0, 0)).toBe(0);
  });
});

describe("bucketStarts", () => {
  const now = new Date("2026-06-15T12:00:00.000Z");

  it("produces a gap-free axis so quiet days still appear", () => {
    const range = resolveRange("7d", now);
    const points = bucketStarts(range, now);
    // Seven days, plus the partial day at each end.
    expect(points.length).toBeGreaterThanOrEqual(8);
    expect(points.length).toBeLessThanOrEqual(9);
  });

  it("returns nothing for an unbounded range", () => {
    expect(bucketStarts(resolveRange("all", now), now)).toEqual([]);
  });

  it("stays bounded rather than looping forever", () => {
    const range = resolveRange("24h", now);
    expect(bucketStarts(range, now).length).toBeLessThanOrEqual(400);
  });
});

describe("visitorHash", () => {
  const ip = "203.0.113.9";
  const ua = "Mozilla/5.0 Chrome/126";
  const salt = "a-sufficiently-long-salt";

  it("is stable within a day, so a repeat visit is the same visitor", () => {
    const a = visitorHash(ip, ua, salt, new Date("2026-06-15T01:00:00Z"));
    const b = visitorHash(ip, ua, salt, new Date("2026-06-15T23:00:00Z"));
    expect(a).toBe(b);
  });

  it("rotates at UTC midnight, so nobody is tracked across days", () => {
    const a = visitorHash(ip, ua, salt, new Date("2026-06-15T23:59:59Z"));
    const b = visitorHash(ip, ua, salt, new Date("2026-06-16T00:00:01Z"));
    expect(a).not.toBe(b);
  });

  it("separates different visitors", () => {
    const a = visitorHash(ip, ua, salt);
    const b = visitorHash("198.51.100.4", ua, salt);
    expect(a).not.toBe(b);
  });

  it("changes completely when the salt does, so it cannot be precomputed", () => {
    const a = visitorHash(ip, ua, "salt-one-that-is-long");
    const b = visitorHash(ip, ua, "salt-two-that-is-long");
    expect(a).not.toBe(b);
  });

  it("does not leak the address it was built from", () => {
    expect(visitorHash(ip, ua, salt)).not.toContain("203");
    expect(visitorHash(ip, ua, salt)).toMatch(/^[0-9a-f]{32}$/);
  });
});

describe("utcDateKey", () => {
  it("is UTC, not local, so the rotation point never moves", () => {
    expect(utcDateKey(new Date("2026-06-15T23:30:00.000Z"))).toBe("2026-06-15");
    expect(utcDateKey(new Date("2026-06-16T00:30:00.000Z"))).toBe("2026-06-16");
  });
});

describe("clientIp", () => {
  it("takes the left-most entry, the only one a proxy cannot forge", () => {
    const h = new Headers({ "x-forwarded-for": "203.0.113.9, 70.41.3.18" });
    expect(clientIp(h)).toBe("203.0.113.9");
  });

  it("falls back to x-real-ip", () => {
    const h = new Headers({ "x-real-ip": "203.0.113.9" });
    expect(clientIp(h)).toBe("203.0.113.9");
  });

  it("returns a constant rather than throwing when nothing is present", () => {
    expect(clientIp(new Headers())).toBe("0.0.0.0");
  });
});
