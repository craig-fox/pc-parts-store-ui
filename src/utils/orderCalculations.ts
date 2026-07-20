import type { CartItem } from "../types/CartItem";
import { calculateShippingCost } from "./shipping";

export type OrderTotals = {
    subtotal: number;
    shipping: number;
    total: number;
    totalWeight: number;
};

export function calculateOrderTotals(items: CartItem[]): OrderTotals {
    const subtotal = items.reduce(
        (subtotal, item) => subtotal + item.product.price * item.quantity,
        0
    );

    const totalWeight = items.reduce(
        (weight, item) => weight + item.product.weightKg * item.quantity,
        0
    );
    const shipping = calculateShipping(subtotal, totalWeight);
    return {
        subtotal,
        shipping,
        total: subtotal + shipping,
        totalWeight,
    };
}

function calculateShipping(subtotal: number, totalWeight: number): number {
    if (subtotal === 0) {
        return 0;
    }

    return calculateShippingCost(subtotal, totalWeight);
}
