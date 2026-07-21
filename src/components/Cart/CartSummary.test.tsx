import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import CartSummary from "./CartSummary";
import { useCart } from "../../context/CartContext";
import { createMockCartContext } from "../../test/mocks/cartContext";

vi.mock("../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

function renderCartSummary(
  totalItems: number,
  totalWeight: number,
  totalPrice: number,
) {
  vi.mocked(useCart).mockReturnValue(
    createMockCartContext({
      totalItems,
      totalWeight,
      totalPrice,
    }),
  );

  render(
    <MemoryRouter>
      <CartSummary />
    </MemoryRouter>,
  );
}

describe("CartSummary", () => {
  it("displays the cart item count and formatted subtotal", () => {
    renderCartSummary(3, 1.0, 2597);

    expect(
      screen.getByRole("heading", { name: "Order Summary" }),
    ).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("$2,597.00")).toBeInTheDocument();
  });

  it("displays checkout shipping information and action", () => {
    renderCartSummary(0, 0, 0);

    expect(screen.getByText("Calculated at checkout")).toBeInTheDocument();
    expect(screen.getByText("Calculated after shipping")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Checkout" })).toHaveAttribute(
      "href",
      "/checkout",
    );
  });
});
