export function calculateShippingCost(
  subtotal: number,
  totalWeight: number,
): number {
  if (subtotal === 0) {
    return 0;
  }

  // Free shipping for large orders
  if (subtotal >= 1000) {
    return 0;
  }

  if (totalWeight <= 0.5) {
    return 8;
  }

  if (totalWeight <= 2) {
    return 15;
  }

  return 25;
}
