import type { CartItem } from "../types/CartItem";
import type { ShippingMethod } from "../types/ShippingMethod";
import { calculateShippingCost } from "./shipping";

export function calculateOrderTotals(
  items: CartItem[],
  shippingMethod: ShippingMethod = "STANDARD",
) {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const totalWeight = items.reduce(
    (weight, item) => weight + item.product.weightKg * item.quantity,
    0,
  );

  const shipping = calculateShippingCost(totalWeight, shippingMethod);
  const total = subtotal + shipping;

  return {
    subtotal,
    totalWeight,
    shipping,
    total,
  };
}
