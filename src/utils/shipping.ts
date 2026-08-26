import type { ShippingMethod } from "../types/ShippingMethod";

export function calculateShippingCost(
  totalWeight: number,
  shippingMethod: ShippingMethod,
): number {
  if (totalWeight <= 0) {
    return 0;
  }

  if (totalWeight <= 0.5) {
    return shippingMethod === "EXPRESS" ? 15 : 8;
  }

  if (totalWeight <= 2) {
    return shippingMethod === "EXPRESS" ? 25 : 15;
  }

  if (totalWeight <= 5) {
    return shippingMethod === "EXPRESS" ? 40 : 25;
  }

  if (totalWeight <= 10) {
    return shippingMethod === "EXPRESS" ? 55 : 35;
  }

  return shippingMethod === "EXPRESS" ? 75 : 50;
}
