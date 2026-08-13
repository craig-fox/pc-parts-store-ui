import type { ShippingAddress } from "./ShippingAddress";

export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  items: OrderItemRequest[];
  shippingAddress: ShippingAddress;
}
