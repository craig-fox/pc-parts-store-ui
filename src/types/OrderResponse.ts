export interface OrderResponse {
  id: string;
  customerId: string;
  orderDate: string;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  items: OrderItemResponse[];
}

export interface OrderItemResponse {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}
