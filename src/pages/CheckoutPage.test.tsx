import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import CheckoutPage from "./CheckoutPage";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/useOrders";
import { testProducts } from "../test/fixtures/products";
import { createMockCartContext } from "../test/mocks/cartContext";
import { createMockOrdersContext } from "../test/mocks/ordersContext";

vi.mock("../context/CartContext", () => ({ useCart: vi.fn() }));
vi.mock("../context/useOrders", () => ({ useOrders: vi.fn() }));

function renderCheckoutPage() {
  render(
    <MemoryRouter>
      <CheckoutPage />
    </MemoryRouter>,
  );
}

describe("CheckoutPage", () => {
  it("shows a browse-products empty state when the cart is empty", () => {
    vi.mocked(useCart).mockReturnValue(createMockCartContext());
    vi.mocked(useOrders).mockReturnValue(createMockOrdersContext());

    renderCheckoutPage();

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Browse Products" }),
    ).toHaveAttribute("href", "/products");
  });

  it("shows checkout fields, the order summary, and confirmation action for cart items", () => {
    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        items: [{ product: testProducts[0], quantity: 1 }],
        // totalItems: 1,
        // totalPrice: 799,
        // totalWeight: 0.04,
      }),
    );

    vi.mocked(useOrders).mockReturnValue(createMockOrdersContext());

    renderCheckoutPage();

    expect(
      screen.getByRole("heading", { name: "Checkout" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Order Summary" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Confirm Order" }),
    ).toBeInTheDocument();
  });
});
