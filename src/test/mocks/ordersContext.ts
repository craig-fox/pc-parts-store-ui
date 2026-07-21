import { vi } from "vitest";
import type { OrdersContextType } from "../../context/OrdersContext";

export const createMockOrdersContext = (
  overrides: Partial<OrdersContextType> = {},
): OrdersContextType => ({
  orders: [],
  latestOrder: undefined,

  addOrder: vi.fn(),
  getOrder: vi.fn(),
  clearOrders: vi.fn(),

  ...overrides,
});
