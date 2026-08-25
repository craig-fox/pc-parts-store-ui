import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import OrderConfirmationPage from "./OrderConfirmationPage";
import { localProducts } from "../test/fixtures/products";

describe("OrderConfirmationPage", () => {
  it("shows a recovery state when there is no order", () => {
    render(
      <MemoryRouter initialEntries={["/order-confirmation"]}>
        <OrderConfirmationPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "No Recent Order" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("We couldn't find a recently placed order."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Continue Shopping" }),
    ).toHaveAttribute("href", "/products");
  });

  it("shows the placed order number and next actions", () => {
    const order = {
      id: "order-123",
      customerId: "customer-123",
      orderDate: "2026-08-12T00:00:00Z",
      status: "PLACED" as const,
      subtotal: 799,
      shipping: 8,
      total: 807,
      items: [
        {
          productId: localProducts[0].id,
          productName: localProducts[0].name,
          quantity: 1,
          unitPrice: 799,
        },
      ],
    };

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/order-confirmation",
            state: { order },
          },
        ]}
      >
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

    expect(
      screen.getByRole("link", { name: "Continue Shopping" }),
    ).toHaveAttribute("href", "/products");
  });

  it("shows the no recent order state when state contains no order", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/order-confirmation",
            state: {},
          },
        ]}
      >
        <OrderConfirmationPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "No Recent Order" }),
    ).toBeInTheDocument();
  });
});
