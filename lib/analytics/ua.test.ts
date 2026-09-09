import { describe, expect, it } from "vitest";
import { parseBrowser, parseDevice, parseOs, parseUa } from "./ua";

/**
 * Real user-agent strings, not invented ones. The whole risk in this module is
 * that the ordering of checks is wrong — Edge claiming to be Chrome, Chrome
 * claiming to be Safari, Android claiming to be Linux — and only genuine
 * strings expose that.
 */
const UA = {
  chromeWin:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  edgeWin:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
  safariMac:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
  chromeMac:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  safariIphone:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
  chromeAndroidPhone:
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
  chromeAndroidTablet:
    "Mozilla/5.0 (Linux; Android 13; SM-X700) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  safariIpad:
    "Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
  firefoxLinux:
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:126.0) Gecko/20100101 Firefox/126.0",
  samsung:
    "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36",
  operaWin:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 OPR/111.0.0.0",
};

describe("parseBrowser", () => {
  it("prefers Edge over the Chrome token it also carries", () => {
    expect(parseBrowser(UA.edgeWin)).toBe("Edge");
  });

  it("prefers Opera over the Chrome token it also carries", () => {
    expect(parseBrowser(UA.operaWin)).toBe("Opera");
  });

  it("prefers Samsung Internet over its Chrome token", () => {
    expect(parseBrowser(UA.samsung)).toBe("Samsung Internet");
  });

  it("prefers Chrome over the Safari token it also carries", () => {
    expect(parseBrowser(UA.chromeWin)).toBe("Chrome");
    expect(parseBrowser(UA.chromeMac)).toBe("Chrome");
  });

  it("identifies real Safari", () => {
    expect(parseBrowser(UA.safariMac)).toBe("Safari");
    expect(parseBrowser(UA.safariIphone)).toBe("Safari");
  });

  it("identifies Firefox", () => {
    expect(parseBrowser(UA.firefoxLinux)).toBe("Firefox");
  });

  it("falls back rather than guessing", () => {
    expect(parseBrowser("something entirely unknown")).toBe("Other");
  });
});

describe("parseOs", () => {
  it("reads iOS before macOS, despite 'like Mac OS X'", () => {
    expect(parseOs(UA.safariIphone)).toBe("iOS");
    expect(parseOs(UA.safariIpad)).toBe("iOS");
  });

  it("reads Android before Linux, despite Android being Linux", () => {
    expect(parseOs(UA.chromeAndroidPhone)).toBe("Android");
    expect(parseOs(UA.samsung)).toBe("Android");
  });

  it("reads the desktop platforms", () => {
    expect(parseOs(UA.chromeWin)).toBe("Windows");
    expect(parseOs(UA.safariMac)).toBe("macOS");
    expect(parseOs(UA.firefoxLinux)).toBe("Linux");
  });
});

describe("parseDevice", () => {
  it("treats a phone as mobile", () => {
    expect(parseDevice(UA.safariIphone)).toBe("mobile");
    expect(parseDevice(UA.chromeAndroidPhone)).toBe("mobile");
  });

  it("treats an Android without the Mobile token as a tablet", () => {
    expect(parseDevice(UA.chromeAndroidTablet)).toBe("tablet");
  });

  it("treats an iPad as a tablet", () => {
    expect(parseDevice(UA.safariIpad)).toBe("tablet");
  });

  it("treats desktops as desktop", () => {
    expect(parseDevice(UA.chromeWin)).toBe("desktop");
    expect(parseDevice(UA.safariMac)).toBe("desktop");
    expect(parseDevice(UA.firefoxLinux)).toBe("desktop");
  });
});

describe("parseUa", () => {
  it("never throws on absent input", () => {
    expect(parseUa(null)).toEqual({
      device: "desktop",
      browser: "Other",
      os: "Other",
    });
    expect(parseUa(undefined)).toEqual({
      device: "desktop",
      browser: "Other",
      os: "Other",
    });
    expect(parseUa("")).toEqual({
      device: "desktop",
      browser: "Other",
      os: "Other",
    });
  });

  it("does not choke on an absurdly long string", () => {
    expect(() => parseUa("x".repeat(100_000))).not.toThrow();
  });
});
