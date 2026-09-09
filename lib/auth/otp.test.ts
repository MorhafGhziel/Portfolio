import { afterEach, describe, expect, it } from "vitest";
import {
  codeMatches,
  generateCode,
  hashCode,
  isAllowedEmail,
  isWellFormedCode,
  normaliseEmail,
  allowedEmails,
} from "./otp";

const originalAdminEmails = process.env.ADMIN_EMAILS;

afterEach(() => {
  if (originalAdminEmails === undefined) delete process.env.ADMIN_EMAILS;
  else process.env.ADMIN_EMAILS = originalAdminEmails;
});

describe("generateCode", () => {
  it("is always six digits, including when the value is small", () => {
    for (let i = 0; i < 500; i++) {
      expect(generateCode()).toMatch(/^\d{6}$/);
    }
  });

  it("does not return the same code twice in a row", () => {
    const codes = new Set(Array.from({ length: 100 }, generateCode));
    // Collisions are possible in 100 draws from a million, but 100 identical
    // draws would mean the generator is broken.
    expect(codes.size).toBeGreaterThan(90);
  });
});

describe("hashCode / codeMatches", () => {
  it("never stores the code itself", () => {
    const code = "123456";
    expect(hashCode(code)).not.toContain(code);
    expect(hashCode(code)).toMatch(/^[0-9a-f]{64}$/);
  });

  it("accepts the right code", () => {
    expect(codeMatches("123456", hashCode("123456"))).toBe(true);
  });

  it("rejects a wrong code, including one digit out", () => {
    expect(codeMatches("123457", hashCode("123456"))).toBe(false);
    expect(codeMatches("000000", hashCode("123456"))).toBe(false);
  });

  it("rejects rather than throwing on a malformed stored hash", () => {
    expect(codeMatches("123456", "not-a-hash")).toBe(false);
    expect(codeMatches("123456", "")).toBe(false);
  });
});

describe("isWellFormedCode", () => {
  it("accepts exactly six digits", () => {
    expect(isWellFormedCode("000000")).toBe(true);
    expect(isWellFormedCode("999999")).toBe(true);
  });

  it("rejects anything else before it reaches the database", () => {
    expect(isWellFormedCode("12345")).toBe(false);
    expect(isWellFormedCode("1234567")).toBe(false);
    expect(isWellFormedCode("12345a")).toBe(false);
    expect(isWellFormedCode(" 123456 ")).toBe(false);
    expect(isWellFormedCode("")).toBe(false);
  });
});

describe("allowedEmails", () => {
  it("is empty when unset, which locks the dashboard rather than opening it", () => {
    delete process.env.ADMIN_EMAILS;
    expect(allowedEmails()).toEqual([]);
    expect(isAllowedEmail("anyone@example.com")).toBe(false);
  });

  it("parses a comma list, tolerating spacing and case", () => {
    process.env.ADMIN_EMAILS = " Me@Example.com , other@example.com ";
    expect(allowedEmails()).toEqual(["me@example.com", "other@example.com"]);
  });

  it("matches regardless of the case typed at the login form", () => {
    process.env.ADMIN_EMAILS = "me@example.com";
    expect(isAllowedEmail("ME@EXAMPLE.COM")).toBe(true);
    expect(isAllowedEmail("  me@example.com  ")).toBe(true);
    expect(isAllowedEmail("someone-else@example.com")).toBe(false);
  });

  it("ignores empty entries from a trailing comma", () => {
    process.env.ADMIN_EMAILS = "me@example.com,,";
    expect(allowedEmails()).toEqual(["me@example.com"]);
  });
});

describe("normaliseEmail", () => {
  it("lowercases and trims", () => {
    expect(normaliseEmail("  Me@Example.COM ")).toBe("me@example.com");
  });

  it("caps length", () => {
    expect(normaliseEmail("a".repeat(500)).length).toBe(200);
  });
});
