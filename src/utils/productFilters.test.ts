import { describe, expect, it } from "vitest";
import { filterProducts, sortProducts } from "./productFilters";
import { localProducts } from "../fixtures/products";

describe("filterProducts", () => {
  it("returns products matching the search term", () => {
    const result = filterProducts(localProducts, "Ryzen", "All");

    expect(result).toHaveLength(1);

    expect(result[0].name).toBe("AMD Ryzen 7 9800X3D");
  });
});

it("returns only products in the selected category", () => {
  const result = filterProducts(localProducts, "", "GPU");

  expect(result).toHaveLength(1);

  expect(result[0].category).toBe("GPU");
});

it("returns every product when category is All", () => {
  const result = filterProducts(localProducts, "", "All");

  expect(result).toHaveLength(localProducts.length);
});

describe("sortProducts", () => {
  it("sorts by ascending price", () => {
    const result = sortProducts(localProducts, "priceAsc");

    expect(result[0].price).toBe(149);

    expect(result[result.length - 1].price).toBe(999);
  });
});

it("does not mutate the original array", () => {
  const original = [...localProducts];

  sortProducts(localProducts, "priceAsc");

  expect(localProducts).toEqual(original);
});

it("returns no products when the search term does not match", () => {
  const result = filterProducts(localProducts, "Eniac", "All");

  expect(result).toHaveLength(0);
});

it("returns no products when no products match the category", () => {
  const result = filterProducts(localProducts, "", "Motherboard");

  expect(result).toHaveLength(0);
});
