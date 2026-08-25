import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProduct, getProducts } from "./productService";
import { localProducts } from "../fixtures/products";

const mockEnvironment = vi.hoisted(() => ({
  apiBaseUrl: "http://test-gateway",
}));

vi.mock("../config/environment", () => ({
  environment: mockEnvironment,
}));

describe("productService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("getProducts", () => {
    it("fetches products from the API", async () => {
      const products = [localProducts[0]];

      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify(products), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

      const result = await getProducts();

      expect(fetch).toHaveBeenCalledWith(
        `${mockEnvironment.apiBaseUrl}/api/products`,
      );

      expect(result).toEqual([
        {
          ...products[0],
          imageUrl: `${mockEnvironment.apiBaseUrl}${products[0].imageUrl}`,
        },
      ]);
    });

    it("throws when the API request fails", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(null, { status: 500 }),
      );

      await expect(getProducts()).rejects.toThrow(
        "Unable to load products",
      );
    });
  });

  describe("getProduct", () => {
    it("returns a product from the API", async () => {
      const product = localProducts[0];

      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify(product), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

      const result = await getProduct(product.id);

      expect(fetch).toHaveBeenCalledWith(
        `${mockEnvironment.apiBaseUrl}/api/products/${product.id}`
      );

      expect(result).toEqual({
        ...product,
        imageUrl: `${mockEnvironment.apiBaseUrl}${product.imageUrl}`,
      });
    });
  });
});