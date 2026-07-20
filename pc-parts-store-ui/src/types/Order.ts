import type { CartItem } from "./CartItem";
import type { Checkout } from "./Checkout";

export type OrderStatus =
    "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export type Order = {
    id: string;
    checkout: Checkout;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
    totalWeight: number;
    placedAt: Date;
    status: OrderStatus;
};
