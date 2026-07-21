import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import OrderConfirmationPage from "./OrderConfirmationPage";
import { useOrders } from "../context/useOrders";
import { testProducts } from "../test/fixtures/products";
import { createMockOrdersContext } from "../test/mocks/ordersContext";

vi.mock("../context/useOrders", () => ({ useOrders: vi.fn() }));

describe("OrderConfirmationPage", () => {
  it("shows a recovery state when there is no latest order", () => {
    vi.mocked(useOrders).mockReturnValue(
      createMockOrdersContext({
        latestOrder: undefined,
      }),
    );

    render(
      <MemoryRouter>
        <OrderConfirmationPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "No Recent Order" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Continue Shopping" }),
    ).toHaveAttribute("href", "/products");
  });

  it("shows the placed order number and next actions", () => {
    vi.mocked(useOrders).mockReturnValue(
      createMockOrdersContext({
        latestOrder: {
          id: "order-123",
          checkout: {
            customer: {
              firstName: "Craig",
              lastName: "Fox",
              email: "craig@example.com",
            },
            shippingAddress: {
              addressLine1: "1 Main St",
              city: "Auckland",
              postcode: "1010",
              country: "NZ",
            },
          },
          items: [{ product: testProducts[0], quantity: 1 }],
          subtotal: 799,
          shipping: 8,
          total: 807,
          totalWeight: 0.04,
          placedAt: new Date(),
          status: "PLACED",
        },
      }),
    );

    render(
      <MemoryRouter>
        <OrderConfirmationPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Order Confirmed" }),
    ).toBeInTheDocument();
    expect(screen.getByText("order-123")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Orders" })).toHaveAttribute(
      "href",
      "/orders",
    );
  });
});
