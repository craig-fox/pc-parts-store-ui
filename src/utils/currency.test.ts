import { describe, expect, it } from "vitest";

import { formatCurrency } from "./currency";

describe("formatCurrency", () => {
  it("formats NZD by default", () => {
    expect(formatCurrency(799)).toBe("$799.00");
  });

  it("formats NZD", () => {
    expect(formatCurrency(799, "NZD")).toBe("$799.00");
  });

  it("formats AUD", () => {
    expect(formatCurrency(799, "AUD")).toBe("$799.00");
  });

  it("formats USD", () => {
    expect(formatCurrency(799, "USD")).toBe("$799.00");
  });
});
