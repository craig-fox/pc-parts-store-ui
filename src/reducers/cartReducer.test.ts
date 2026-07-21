import { describe, expect, it } from "vitest";

import { cartReducer } from "./cartReducer";
import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";

const testProduct: Product = {
  id: 1,
  name: "AMD Ryzen 7 9800X3D",
  description: "8-Core Gaming Processor",
  category: "CPU",
  price: 799,
  weightKg: 0.04,
  imageUrl: "",
  brand: "AMD",
  stockQuantity: 42,
  sku: "CPU-AMD-9800X3D",
};

const otherProduct: Product = {
  id: 2,
  name: "NVIDIA RTX 5070",
  description: "16GB Graphics Card",
  category: "GPU",
  price: 999,
  weightKg: 1.2,
  imageUrl: "",
  brand: "NVIDIA",
  stockQuantity: 15,
  sku: "GPU-NV-5070",
};

const testCartItem: CartItem = {
  product: testProduct,
  quantity: 2,
};

describe("cartReducer", () => {
  describe("ADD_ITEM", () => {
    it("adds a new item with quantity 1 if it isn't already in the cart", () => {
      const state = { items: [] };

      const result = cartReducer(state, {
        type: "ADD_ITEM",
        payload: testProduct,
      });

      expect(result).toEqual({
        items: [{ product: testProduct, quantity: 1 }],
      });
    });

    it("increments quantity if the item is already in the cart", () => {
      const state = { items: [testCartItem] };

      const result = cartReducer(state, {
        type: "ADD_ITEM",
        payload: testProduct,
      });

      expect(result).toEqual({
        items: [{ product: testProduct, quantity: 3 }],
      });
    });

    it("leaves other items unaffected when adding a new item", () => {
      const otherItem: CartItem = { product: otherProduct, quantity: 1 };
      const state = { items: [otherItem] };

      const result = cartReducer(state, {
        type: "ADD_ITEM",
        payload: testProduct,
      });

      expect(result.items).toEqual(
        expect.arrayContaining([
          otherItem,
          { product: testProduct, quantity: 1 },
        ]),
      );
      expect(result.items).toHaveLength(2);
    });
  });

  describe("REMOVE_ITEM", () => {
    it("removes the item with the matching product id", () => {
      const state = { items: [testCartItem] };

      const result = cartReducer(state, {
        type: "REMOVE_ITEM",
        payload: testProduct.id,
      });

      expect(result).toEqual({ items: [] });
    });

    it("leaves other items untouched", () => {
      const otherItem: CartItem = { product: otherProduct, quantity: 1 };
      const state = { items: [testCartItem, otherItem] };

      const result = cartReducer(state, {
        type: "REMOVE_ITEM",
        payload: testProduct.id,
      });

      expect(result).toEqual({ items: [otherItem] });
    });

    it("returns an unchanged (but new) items array if the id doesn't exist", () => {
      const state = { items: [testCartItem] };

      const result = cartReducer(state, {
        type: "REMOVE_ITEM",
        payload: 999,
      });

      expect(result).toEqual({ items: [testCartItem] });
    });
  });

  describe("UPDATE_QUANTITY", () => {
    it("updates the quantity of the matching item", () => {
      const state = { items: [testCartItem] };

      const result = cartReducer(state, {
        type: "UPDATE_QUANTITY",
        payload: { productId: testProduct.id, quantity: 5 },
      });

      expect(result).toEqual({
        items: [{ product: testProduct, quantity: 5 }],
      });
    });

    it("removes the item if quantity is set to 0", () => {
      const state = { items: [testCartItem] };

      const result = cartReducer(state, {
        type: "UPDATE_QUANTITY",
        payload: { productId: testProduct.id, quantity: 0 },
      });

      expect(result).toEqual({ items: [] });
    });

    it("removes the item if quantity is negative", () => {
      const state = { items: [testCartItem] };

      const result = cartReducer(state, {
        type: "UPDATE_QUANTITY",
        payload: { productId: testProduct.id, quantity: -1 },
      });

      expect(result).toEqual({ items: [] });
    });

    it("leaves other items untouched when updating one item's quantity", () => {
      const otherItem: CartItem = { product: otherProduct, quantity: 1 };
      const state = { items: [testCartItem, otherItem] };

      const result = cartReducer(state, {
        type: "UPDATE_QUANTITY",
        payload: { productId: testProduct.id, quantity: 5 },
      });

      expect(result).toEqual({
        items: [{ product: testProduct, quantity: 5 }, otherItem],
      });
    });
  });

  describe("CLEAR_CART", () => {
    it("empties the cart", () => {
      const state = { items: [testCartItem] };

      const result = cartReducer(state, { type: "CLEAR_CART" });

      expect(result).toEqual({ items: [] });
    });

    it("returns an empty cart even if state was already empty", () => {
      const state = { items: [] };

      const result = cartReducer(state, { type: "CLEAR_CART" });

      expect(result).toEqual({ items: [] });
    });
  });

  describe("unknown action", () => {
    it("returns the original state unchanged", () => {
      const state = { items: [testCartItem] };

      // @ts-expect-error - intentionally testing an invalid action type
      const result = cartReducer(state, { type: "NOT_A_REAL_ACTION" });

      expect(result).toBe(state);
    });
  });
});
