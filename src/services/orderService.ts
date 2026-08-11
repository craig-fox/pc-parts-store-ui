import { environment } from "../config/environment";
import { authenticatedFetch } from "./api";
import type { OrderResponse } from "../types/OrderResponse";

export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  items: OrderItemRequest[];
}

export const orderService = {
  async createOrder(request: OrderRequest): Promise<OrderResponse> {
    const response = await authenticatedFetch(
      `${environment.orderApiBaseUrl}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      },
    );

    if (!response.ok) {
      throw new Error(`Order creation failed: ${response.status}`);
    }

    return response.json();
  },

  async getOrders(): Promise<OrderResponse[]> {
    const response = await authenticatedFetch(
      `${environment.orderApiBaseUrl}/orders`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to retrieve orders: ${response.status}`);
    }

    return response.json();
  },
};
