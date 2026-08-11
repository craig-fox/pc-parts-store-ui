import { environment } from "../config/environment";
import { localProducts } from "../fixtures/products";
import { authenticatedFetch } from "./api";
import type { OrderResponse } from "../types/OrderResponse";

export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  items: OrderItemRequest[];
}

const demoOrders: OrderResponse[] = [];

let nextDemoOrderId = 1;

export const orderService = {
  async createOrder(request: OrderRequest): Promise<OrderResponse> {
    if (environment.dataSource === "fixture") {
      return createDemoOrder(request);
    }

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
    if (environment.dataSource === "fixture") {
      return [...demoOrders];
    }

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

function createDemoOrder(request: OrderRequest): OrderResponse {
  const items = request.items.map((item) => {
    const product = localProducts.find(
      (product) => product.id === item.productId,
    );

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    const lineTotal = product.price * item.quantity;

    return {
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      unitPrice: product.price,
      lineTotal,
    };
  });

  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);

  const shipping = subtotal >= 1000 ? 0 : 8;
  const total = subtotal + shipping;

  const order: OrderResponse = {
    id: `demo-order-${nextDemoOrderId++}`,
    customerId: "demo-customer",
    orderDate: new Date().toISOString(),
    status: "PLACED",
    subtotal,
    shipping,
    total,
    items,
  };

  demoOrders.push(order);

  return order;
}
