import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OrderSummary from "./OrderSummary";
import type { OrderResponse } from "../../types/OrderResponse";

const order: OrderResponse = {
  id: "order-123",
  customerId: "customer-123",
  orderDate: "2026-07-20T10:00:00",
  status: "PLACED",
  subtotal: 799,
  shipping: 8,
  total: 807,
  items: [],
};

describe("OrderSummary", () => {
  it("renders the order totals", () => {
    render(<OrderSummary order={order} />);

    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("$799.00")).toBeInTheDocument();

    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("$8.00")).toBeInTheDocument();

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("$807.00")).toBeInTheDocument();
  });

  it("shows FREE when shipping is zero", () => {
    render(
      <OrderSummary
        order={{
          ...order,
          shipping: 0,
          total: 799,
        }}
      />,
    );

    expect(screen.getByText("FREE")).toBeInTheDocument();
  });
});
