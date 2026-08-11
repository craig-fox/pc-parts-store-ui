import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import OrdersPage from "./OrdersPage";
import { useOrders } from "../context/useOrders";
import { createMockOrdersContext } from "../test/mocks/ordersContext";

vi.mock("../context/useOrders", () => ({
  useOrders: vi.fn(),
}));

function renderOrdersPage() {
  render(
    <MemoryRouter>
      <OrdersPage />
    </MemoryRouter>,
  );
}

describe("OrdersPage", () => {
  it("shows an empty state when no orders have been placed", () => {
    vi.mocked(useOrders).mockReturnValue(
      createMockOrdersContext({
        orders: [],
        loading: false,
        error: null,
        getOrder: vi.fn(),
      }),
    );

    renderOrdersPage();

    expect(screen.getByText("No orders yet")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Browse Products" }),
    ).toHaveAttribute("href", "/products");
  });

  it("renders a card for each placed order", () => {
    vi.mocked(useOrders).mockReturnValue(
      createMockOrdersContext({
        orders: [
          {
            id: "order-123",
            customerId: "customer-123",
            orderDate: "2026-07-20T00:00:00",
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
          },
        ],
        loading: false,
        error: null,
        getOrder: vi.fn(),
      }),
    );

    renderOrdersPage();

    expect(
      screen.getByRole("heading", { name: "Order #ORDER-12" }),
    ).toBeInTheDocument();

    expect(screen.getByText("AMD Ryzen 7 9800X3D × 1")).toBeInTheDocument();
  });
});
