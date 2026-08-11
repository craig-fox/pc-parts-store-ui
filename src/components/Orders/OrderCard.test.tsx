import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OrderCard from "./OrderCard";
import type { OrderResponse } from "../../types/OrderResponse";

const order: OrderResponse = {
  id: "order-12345678",
  customerId: "customer-123",
  orderDate: "2026-07-20T10:00:00",
  status: "PLACED",
  subtotal: 799,
  shipping: 8,
  total: 807,
  items: [
    {
      productId: "product-123",
      productName: "AMD Ryzen 7 9800X3D",
      quantity: 1,
      unitPrice: 799,
      lineTotal: 799,
    },
  ],
};

describe("OrderCard", () => {
  it("renders the order details", () => {
    render(<OrderCard order={order} />);

    expect(
      screen.getByRole("heading", { name: "Order #ORDER-12" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Placed 20/07/2026")).toBeInTheDocument();

    expect(screen.getByText("PLACED")).toBeInTheDocument();

    expect(screen.getByText("1 item")).toBeInTheDocument();

    expect(screen.getByText("AMD Ryzen 7 9800X3D × 1")).toBeInTheDocument();
  });

  it("uses plural items when the order contains multiple items", () => {
    render(
      <OrderCard
        order={{
          ...order,
          items: [
            ...order.items,
            {
              productId: "product-456",
              productName: "RTX 5070",
              quantity: 1,
              unitPrice: 899,
              lineTotal: 899,
            },
          ],
        }}
      />,
    );

    expect(screen.getByText("2 items")).toBeInTheDocument();
  });

  it("renders the order status", () => {
    render(
      <OrderCard
        order={{
          ...order,
          status: "CANCELLED",
        }}
      />,
    );

    expect(screen.getByText("CANCELLED")).toBeInTheDocument();
  });
});
