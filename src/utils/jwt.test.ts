import { describe, expect, it, vi, afterEach } from "vitest";

import { getTokenExpiry, isTokenExpired } from "./jwt";

function createToken(payload: object): string {
  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `header.${encodedPayload}.signature`;
}

describe("JWT expiry utilities", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the expiry timestamp", () => {
    const token = createToken({ exp: 2_000_000_000 });

    expect(getTokenExpiry(token)).toBe(2_000_000_000);
  });

  it("recognizes a token with a future expiry as valid", () => {
    vi.setSystemTime(new Date("2026-11-03T00:00:00Z"));

    const token = createToken({ exp: 2_000_000_000 });

    expect(isTokenExpired(token)).toBe(false);
  });

  it("recognizes a token with a past expiry as expired", () => {
    vi.setSystemTime(new Date("2026-11-03T00:00:00Z"));

    const token = createToken({ exp: 1_700_000_000 });

    expect(isTokenExpired(token)).toBe(true);
  });

  it("treats a missing expiry as invalid", () => {
    const token = createToken({ sub: "customer-123" });

    expect(getTokenExpiry(token)).toBeNull();
    expect(isTokenExpired(token)).toBe(true);
  });

  it("treats malformed tokens as invalid", () => {
    expect(getTokenExpiry("not-a-jwt")).toBeNull();
    expect(isTokenExpired("not-a-jwt")).toBe(true);
  });
});