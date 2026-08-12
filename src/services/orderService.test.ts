import { beforeEach, describe, expect, it, vi } from "vitest";
import { localProducts } from "../fixtures/products";

const mockEnvironment = vi.hoisted(() => ({
  dataSource: "api",
  orderApiBaseUrl: "http://localhost:8082/api",
}));

vi.mock("../config/environment", () => ({
  environment: mockEnvironment,
}));

const mockAuthenticatedFetch = vi.fn();

vi.mock("./api", () => ({
  authenticatedFetch: mockAuthenticatedFetch,
}));

describe("orderService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockEnvironment.dataSource = "api";
  });

  describe("API data source", () => {
    it("creates an order", async () => {
      const request = {
        items: [
          {
            productId: "1",
            quantity: 2,
          },
        ],
      };

      const orderResponse = {
        id: "order-1",
        customerId: "customer-1",
        orderDate: "2026-08-12T10:00:00Z",
        status: "PLACED",
        subtotal: 1399.98,
        shipping: 0,
        total: 1399.98,
        items: [],
      };

      mockAuthenticatedFetch.mockResolvedValue(
        new Response(JSON.stringify(orderResponse), {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

      const { orderService } = await import("./orderService");

      const result = await orderService.createOrder(request);

      expect(mockAuthenticatedFetch).toHaveBeenCalledWith(
        "http://localhost:8082/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        },
      );

      expect(result).toEqual(orderResponse);
    });

    it("throws when order creation fails", async () => {
      mockAuthenticatedFetch.mockResolvedValue(
        new Response("Bad request", {
          status: 400,
        }),
      );

      const { orderService } = await import("./orderService");

      await expect(
        orderService.createOrder({
          items: [{ productId: "1", quantity: 1 }],
        }),
      ).rejects.toThrow("Order creation failed: 400");
    });

    it("retrieves orders", async () => {
      const orders = [
        {
          id: "order-1",
          customerId: "customer-1",
          orderDate: "2026-08-12T10:00:00Z",
          status: "PLACED",
          subtotal: 699.99,
          shipping: 8,
          total: 707.99,
          items: [],
        },
      ];

      mockAuthenticatedFetch.mockResolvedValue(
        new Response(JSON.stringify(orders), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

      const { orderService } = await import("./orderService");

      const result = await orderService.getOrders();

      expect(mockAuthenticatedFetch).toHaveBeenCalledWith(
        "http://localhost:8082/api/orders",
        {
          method: "GET",
        },
      );

      expect(result).toEqual(orders);
    });

    it("throws when retrieving orders fails", async () => {
      mockAuthenticatedFetch.mockResolvedValue(
        new Response("Server error", {
          status: 500,
        }),
      );

      const { orderService } = await import("./orderService");

      await expect(orderService.getOrders()).rejects.toThrow(
        "Failed to retrieve orders: 500",
      );
    });
  });

  describe("fixture data source", () => {
    beforeEach(() => {
      mockEnvironment.dataSource = "fixture";
    });

    it("creates a fixture order", async () => {
      const { orderService } = await import("./orderService");
      const product = localProducts[0];

      const result = await orderService.createOrder({
        items: [
          {
            productId: product.id,
            quantity: 1,
          },
        ],
      });

      expect(result.id).toBe("demo-order-1");
      expect(result.customerId).toBe("demo-customer");
      expect(result.status).toBe("PLACED");

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        productId: product.id,
        productName: "AMD Ryzen 7 9800X3D",
        quantity: 1,
        unitPrice: 799,
        lineTotal: 799,
      });

      expect(result.subtotal).toBe(799);
      expect(result.shipping).toBe(8);
      expect(result.total).toBe(807);
    });

    it("provides free shipping for orders of $1000 or more", async () => {
      const { orderService } = await import("./orderService");
      const product = localProducts[0];

      const result = await orderService.createOrder({
        items: [
          {
            productId: product.id,
            quantity: 2,
          },
        ],
      });

      expect(result.subtotal).toBe(1598);
      expect(result.shipping).toBe(0);
      expect(result.total).toBe(1598);
    });

    it("throws when a fixture order contains an unknown product", async () => {
      const { orderService } = await import("./orderService");

      await expect(
        orderService.createOrder({
          items: [
            {
              productId: "does-not-exist",
              quantity: 1,
            },
          ],
        }),
      ).rejects.toThrow("Product not found: does-not-exist");
    });

    it("returns previously created fixture orders", async () => {
        const { orderService } = await import("./orderService");
        const product = localProducts[0];
      
        const createdOrder = await orderService.createOrder({
          items: [
            {
              productId: product.id,
              quantity: 1,
            },
          ],
        });
      
        const orders = await orderService.getOrders();
      
        expect(orders).toContainEqual(createdOrder);
      });
  });
});