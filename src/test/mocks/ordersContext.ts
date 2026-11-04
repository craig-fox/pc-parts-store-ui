import { vi } from "vitest";
import type { OrdersContextType } from "../../context/OrdersContext";
import type { OrderResponse } from "../../types/OrderResponse";

export const createMockOrdersContext = (
  overrides: Partial<OrdersContextType> = {},
): OrdersContextType => ({
  orders: [],
  loading: false,
  error: null,

  addOrder: vi.fn(),
  cancelOrder: vi.fn().mockResolvedValue({} as OrderResponse),

  ...overrides,
});
