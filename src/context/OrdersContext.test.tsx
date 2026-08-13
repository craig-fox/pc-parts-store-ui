import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { OrdersProvider } from "./OrdersContext";
import { useOrders } from "./useOrders";
import { useAuth } from "../auth/AuthContext";
import { orderService } from "../services/orderService";
import type { OrderResponse } from "../types/OrderResponse";

vi.mock("../auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../services/orderService", () => ({
  orderService: {
    getOrders: vi.fn(),
  },
}));

const mockOrder: OrderResponse = {
  id: "order-123",
  customerId: "11111111-1111-1111-1111-111111111111",
  orderDate: "2026-08-11T10:00:00",
  status: "PLACED",
  subtotal: 799,
  shipping: 8,
  total: 807,
  items: [
    {
      productId: "22222222-2222-2222-2222-222222222222",
      productName: "AMD Ryzen 7 9800X3D",
      quantity: 1,
      unitPrice: 799,
      lineTotal: 799,
    },
  ],
};

function wrapper({ children }: { children: React.ReactNode }) {
  return <OrdersProvider>{children}</OrdersProvider>;
}

describe("OrdersContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads orders for an authenticated user", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: true,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    vi.mocked(orderService.getOrders).mockResolvedValue([mockOrder]);

    const { result } = renderHook(() => useOrders(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toEqual([mockOrder]);
    expect(result.current.error).toBeNull();
    expect(orderService.getOrders).toHaveBeenCalledOnce();
  });

  it("sets an error when loading orders fails", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: true,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    vi.mocked(orderService.getOrders).mockRejectedValue(
      new Error("Request failed"),
    );

    const { result } = renderHook(() => useOrders(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBe("Unable to load your orders.");
  });

  it("returns an order from getOrder", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: true,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    vi.mocked(orderService.getOrders).mockResolvedValue([mockOrder]);

    const { result } = renderHook(() => useOrders(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.getOrder("order-123")).toEqual(mockOrder);
  });

  it("returns undefined when getOrder cannot find an order", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: true,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    vi.mocked(orderService.getOrders).mockResolvedValue([mockOrder]);

    const { result } = renderHook(() => useOrders(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.getOrder("does-not-exist")).toBeUndefined();
  });

  it("does not load orders when the user is not authenticated", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    const { result } = renderHook(() => useOrders(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toEqual([]);
    expect(orderService.getOrders).not.toHaveBeenCalled();
  });
});
