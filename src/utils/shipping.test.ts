import { describe, expect, it } from "vitest";

import { calculateShippingCost } from "./shipping";

describe("calculateShippingCost", () => {
  describe("standard shipping", () => {
    it("charges $8 for weights up to 0.5kg", () => {
      expect(calculateShippingCost(0.01, "STANDARD")).toBe(8);
      expect(calculateShippingCost(0.25, "STANDARD")).toBe(8);
      expect(calculateShippingCost(0.5, "STANDARD")).toBe(8);
    });

    it("charges $15 for weights over 0.5kg up to 2kg", () => {
      expect(calculateShippingCost(0.51, "STANDARD")).toBe(15);
      expect(calculateShippingCost(1.2, "STANDARD")).toBe(15);
      expect(calculateShippingCost(2, "STANDARD")).toBe(15);
    });

    it("charges $25 for weights over 2kg up to 5kg", () => {
      expect(calculateShippingCost(2.01, "STANDARD")).toBe(25);
      expect(calculateShippingCost(3.5, "STANDARD")).toBe(25);
      expect(calculateShippingCost(5, "STANDARD")).toBe(25);
    });

    it("charges $35 for weights over 5kg up to 10kg", () => {
      expect(calculateShippingCost(5.01, "STANDARD")).toBe(35);
      expect(calculateShippingCost(7, "STANDARD")).toBe(35);
      expect(calculateShippingCost(10, "STANDARD")).toBe(35);
    });

    it("charges $50 for weights over 10kg", () => {
      expect(calculateShippingCost(10.01, "STANDARD")).toBe(50);
      expect(calculateShippingCost(15, "STANDARD")).toBe(50);
    });
  });

  describe("express shipping", () => {
    it("charges $15 for weights up to 0.5kg", () => {
      expect(calculateShippingCost(0.01, "EXPRESS")).toBe(15);
      expect(calculateShippingCost(0.25, "EXPRESS")).toBe(15);
      expect(calculateShippingCost(0.5, "EXPRESS")).toBe(15);
    });

    it("charges $25 for weights over 0.5kg up to 2kg", () => {
      expect(calculateShippingCost(0.51, "EXPRESS")).toBe(25);
      expect(calculateShippingCost(1.2, "EXPRESS")).toBe(25);
      expect(calculateShippingCost(2, "EXPRESS")).toBe(25);
    });

    it("charges $40 for weights over 2kg up to 5kg", () => {
      expect(calculateShippingCost(2.01, "EXPRESS")).toBe(40);
      expect(calculateShippingCost(3.5, "EXPRESS")).toBe(40);
      expect(calculateShippingCost(5, "EXPRESS")).toBe(40);
    });

    it("charges $55 for weights over 5kg up to 10kg", () => {
      expect(calculateShippingCost(5.01, "EXPRESS")).toBe(55);
      expect(calculateShippingCost(7, "EXPRESS")).toBe(55);
      expect(calculateShippingCost(10, "EXPRESS")).toBe(55);
    });

    it("charges $75 for weights over 10kg", () => {
      expect(calculateShippingCost(10.01, "EXPRESS")).toBe(75);
      expect(calculateShippingCost(15, "EXPRESS")).toBe(75);
    });
  });

  it("returns zero for zero weight", () => {
    expect(calculateShippingCost(0, "STANDARD")).toBe(0);
    expect(calculateShippingCost(0, "EXPRESS")).toBe(0);
  });
});
