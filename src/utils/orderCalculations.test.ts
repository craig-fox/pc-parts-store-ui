import { describe, expect, it } from "vitest";

import { calculateOrderTotals } from "./orderCalculations";
import { localProducts } from "../test/fixtures/products";

describe("calculateOrderTotals", () => {
  it("returns zero totals for an empty order", () => {
    expect(calculateOrderTotals([])).toEqual({
      subtotal: 0,
      shipping: 0,
      total: 0,
      totalWeight: 0,
    });
  });

  it("calculates price, weight, shipping, and total for multiple items", () => {
    expect(
      calculateOrderTotals([
        { product: localProducts[0], quantity: 1 },
        { product: localProducts[1], quantity: 1 },
        { product: localProducts[2], quantity: 1 },
      ]),
    ).toEqual({
      subtotal: 2447,
      shipping: 15,
      total: 2462,
      totalWeight: 1.28,
    });
  });

  it("includes shipping for a smaller order", () => {
    expect(
      calculateOrderTotals([{ product: localProducts[4], quantity: 1 }]),
    ).toEqual({
      subtotal: 269,
      shipping: 8,
      total: 277,
      totalWeight: 0.01,
    });
  });

  it("calculates express shipping", () => {
    expect(
      calculateOrderTotals(
        [{ product: localProducts[4], quantity: 1 }],
        "EXPRESS",
      ),
    ).toEqual({
      subtotal: 269,
      totalWeight: 0.01,
      shipping: 15,
      total: 284,
    });
  });
});
