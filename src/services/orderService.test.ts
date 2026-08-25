import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockShippingAddress } from "../test/mocks/shippingAddress";

const mockEnvironment = vi.hoisted(() => ({
  apiBaseUrl: "http://test-gateway",
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
  });

 
  it("creates an order", async () => {
    const request = {
      items: [
        {
          productId: "1",
          quantity: 2,
        },
      ],
      shippingAddress: mockShippingAddress,
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
      `${mockEnvironment.apiBaseUrl}/api/orders`,
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
        shippingAddress: mockShippingAddress,
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
        `${mockEnvironment.apiBaseUrl}/api/orders`,
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


  it("returns an existing order for an idempotent request", async () => {
    const orderResponse = {
      id: "order-1",
      customerId: "customer-1",
      orderDate: "2026-08-12T10:00:00Z",
      status: "PLACED",
      subtotal: 699.99,
      shipping: 8,
      total: 707.99,
      items: [],
    };
  
    mockAuthenticatedFetch.mockResolvedValue(
      new Response(JSON.stringify(orderResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
  
    const { orderService } = await import("./orderService");
  
    const result = await orderService.createOrder({
      items: [{ productId: "1", quantity: 1 }],
      shippingAddress: mockShippingAddress,
    });
  
    expect(result).toEqual(orderResponse);
  });
  

  
});
