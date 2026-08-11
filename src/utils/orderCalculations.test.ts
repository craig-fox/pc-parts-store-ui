import { describe, expect, it } from "vitest";

import { calculateOrderTotals } from "./orderCalculations";
import { localProducts } from "../fixtures/products";

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
        { product: localProducts[0], quantity: 2 },
        { product: localProducts[2], quantity: 1 },
      ]),
    ).toEqual({
      subtotal: 2597,
      shipping: 0,
      total: 2597,
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
});
