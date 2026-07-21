import { vi } from "vitest";

import type { CartContextType } from "../../context/CartContext";

export const createMockCartContext = (
  overrides: Partial<CartContextType> = {},
): CartContextType => {
  const items = overrides.items ?? [];

  const totalItems =
    overrides.totalItems ?? items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice =
    overrides.totalPrice ??
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const totalWeight =
    overrides.totalWeight ??
    items.reduce((sum, item) => sum + item.product.weightKg * item.quantity, 0);

  return {
    items,
    totalItems,
    totalPrice,
    totalWeight,

    addItem: vi.fn<CartContextType["addItem"]>(),
    removeItem: vi.fn<CartContextType["removeItem"]>(),
    updateQuantity: vi.fn<CartContextType["updateQuantity"]>(),
    clearCart: vi.fn<CartContextType["clearCart"]>(),

    ...overrides,
  };
};
