import { describe, expect, it } from "vitest";

import { testProducts } from "../test/fixtures/products";
import {
    filterProducts,
    sortProducts,
} from "./productFilters";

describe("filterProducts", () => {

    it("returns products matching the search term", () => {

        const result = filterProducts(
            testProducts,
            "Ryzen",
            "All"
        );

        expect(result).toHaveLength(1);

        expect(result[0].name)
            .toBe("AMD Ryzen 7 9800X3D");
    });

});

it("returns only products in the selected category", () => {

    const result = filterProducts(
        testProducts,
        "",
        "GPU"
    );

    expect(result).toHaveLength(1);

    expect(result[0].category)
        .toBe("GPU");
});

it("returns every product when category is All", () => {

    const result = filterProducts(
        testProducts,
        "",
        "All"
    );

    expect(result)
        .toHaveLength(testProducts.length);
});

describe("sortProducts", () => {

    it("sorts by ascending price", () => {

        const result =
            sortProducts(testProducts, "priceAsc");

        expect(result[0].price)
            .toBe(149);

        expect(result[result.length - 1].price)
            .toBe(999);
    });

});

it("does not mutate the original array", () => {

    const original = [...testProducts];

    sortProducts(testProducts, "priceAsc");

    expect(testProducts).toEqual(original);

});

it("returns no products when the search term does not match", () => {

    const result = filterProducts(
        testProducts,
        "Eniac",
        "All"
    );

    expect(result).toHaveLength(0);

});

it("returns no products when no products match the category", () => {

    const result = filterProducts(
        testProducts,
        "",
        "Motherboard"
    );

    expect(result).toHaveLength(0);

});