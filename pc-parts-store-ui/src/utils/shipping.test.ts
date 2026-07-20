import { describe, expect, it } from "vitest";

import { calculateShippingCost } from "./shipping";

describe("calculateShipping", () => {

    it("returns free shipping for orders of $1000 or more", () => {
        expect(calculateShippingCost(1000, 0.04)).toBe(0);
        expect(calculateShippingCost(1500, 1.2)).toBe(0);
        expect(calculateShippingCost(2500, 5)).toBe(0);
    });

    it("returns $8 shipping for orders under $1000 weighing up to 0.5kg", () => {
        expect(calculateShippingCost(999, 0.01)).toBe(8);
        expect(calculateShippingCost(999, 0.25)).toBe(8);
        expect(calculateShippingCost(999, 0.5)).toBe(8);
    });

    it("returns $15 shipping for orders under $1000 weighing more than 0.5kg and up to 2kg", () => {
        expect(calculateShippingCost(999, 0.51)).toBe(15);
        expect(calculateShippingCost(999, 1.2)).toBe(15);
        expect(calculateShippingCost(999, 2)).toBe(15);
    });

    it("returns $25 shipping for orders under $1000 weighing more than 2kg", () => {
        expect(calculateShippingCost(999, 2.01)).toBe(25);
        expect(calculateShippingCost(999, 3.5)).toBe(25);
        expect(calculateShippingCost(999, 10)).toBe(25);
    });

});
