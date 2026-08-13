import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProduct, getProducts } from "./productService";
import { localProducts } from "../fixtures/products";

const mockEnvironment = vi.hoisted(() => ({
  dataSource: "fixture",
  productApiBaseUrl: "http://localhost:8083/api",
  assetBaseUrl: "http://localhost:8083",
}));

vi.mock("../config/environment", () => ({
  environment: mockEnvironment,
}));

describe("productService", () => {
  beforeEach(() => {
    mockEnvironment.dataSource = "fixture";
    vi.restoreAllMocks();
  });

  describe("getProducts", () => {
    it("returns local products when using the fixture data source", async () => {
      const products = await getProducts();

      expect(products).toEqual(localProducts);
    });

    it("fetches products from the API", async () => {
      mockEnvironment.dataSource = "api";

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

      expect(fetch).toHaveBeenCalledWith("http://localhost:8083/api/products");

      expect(result).toEqual([
        {
          ...products[0],
          imageUrl: `http://localhost:8083${products[0].imageUrl}`,
        },
      ]);
    });

    it("throws when the API request fails", async () => {
      mockEnvironment.dataSource = "api";

      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(null, { status: 500 }),
      );

      await expect(getProducts()).rejects.toThrow("Unable to load products");
    });
  });

  describe("getProduct", () => {
    it("returns a product from the fixtures", async () => {
      const product = await getProduct(localProducts[0].id);

      expect(product).toEqual(localProducts[0]);
    });

    it("throws when the product does not exist in the fixtures", async () => {
      await expect(getProduct("unknown-product-id")).rejects.toThrow(
        "Product not found",
      );
    });

    it("fetches a product from the API", async () => {
      mockEnvironment.dataSource = "api";

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
        `http://localhost:8083/api/products/${product.id}`,
      );

      expect(result).toEqual({
        ...product,
        imageUrl: `http://localhost:8083${product.imageUrl}`,
      });
    });

    it("throws when the API request fails", async () => {
      mockEnvironment.dataSource = "api";

      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(null, { status: 500 }),
      );

      await expect(getProduct(localProducts[0].id)).rejects.toThrow(
        "Unable to load product",
      );
    });
  });
});
