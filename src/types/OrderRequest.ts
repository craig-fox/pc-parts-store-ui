import type { ShippingAddress } from "./ShippingAddress";

export type ShippingMethod = "STANDARD" | "EXPRESS";

export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  items: OrderItemRequest[];
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
}
