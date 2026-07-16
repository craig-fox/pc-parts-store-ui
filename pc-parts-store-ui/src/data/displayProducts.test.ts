import { describe, expect, it } from "vitest";

import { displayProducts } from "./displayProducts";

describe("displayProducts", () => {
    it("provides uniquely identified products with the required display data", () => {
        expect(displayProducts).not.toHaveLength(0);
        expect(new Set(displayProducts.map((product) => product.id)).size).toBe(displayProducts.length);

        displayProducts.forEach((product) => {
            expect(product.name).not.toBe("");
            expect(product.price).toBeGreaterThan(0);
            expect(product.sku).not.toBe("");
        });
    });
});
