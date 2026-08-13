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
      }),
    );

    renderOrdersPage();

    expect(screen.getByText("No orders yet")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Browse Products" }),
    ).toHaveAttribute("href", "/products");
  });

  it("shows a loading state while orders are being retrieved", () => {
    vi.mocked(useOrders).mockReturnValue(
      createMockOrdersContext({
        orders: [],
        loading: true,
        error: null,
      }),
    );

    renderOrdersPage();

    expect(
      screen.getByRole("heading", { name: "My Orders" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Loading your orders...")).toBeInTheDocument();
  });

  it("shows an error when orders cannot be retrieved", () => {
    vi.mocked(useOrders).mockReturnValue(
      createMockOrdersContext({
        orders: [],
        loading: false,
        error: "Unable to load your orders.",
      }),
    );

    renderOrdersPage();

    expect(
      screen.getByRole("heading", { name: "My Orders" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Unable to load your orders.")).toBeInTheDocument();
  });

  it("renders a card for each order", () => {
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
          {
            id: "order-456",
            customerId: "customer-123",
            orderDate: "2026-07-21T00:00:00",
            status: "PLACED",
            subtotal: 499,
            shipping: 8,
            total: 507,
            items: [
              {
                productId: "product-456",
                productName: "Corsair Vengeance RAM",
                quantity: 1,
                unitPrice: 499,
                lineTotal: 499,
              },
            ],
          },
        ],
        loading: false,
        error: null,
      }),
    );

    renderOrdersPage();

    expect(
      screen.getByRole("heading", { name: "Order #ORDER-12" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Order #ORDER-45" }),
    ).toBeInTheDocument();

    expect(screen.getByText("AMD Ryzen 7 9800X3D × 1")).toBeInTheDocument();

    expect(screen.getByText("Corsair Vengeance RAM × 1")).toBeInTheDocument();
  });
});
