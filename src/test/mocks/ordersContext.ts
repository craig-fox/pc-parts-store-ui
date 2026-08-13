import { vi } from "vitest";
import type { OrdersContextType } from "../../context/OrdersContext";

export const createMockOrdersContext = (
  overrides: Partial<OrdersContextType> = {},
): OrdersContextType => ({
  orders: [],
  loading: false,
  error: null,

  addOrder: vi.fn(),
  getOrder: vi.fn(),

  ...overrides,
});
