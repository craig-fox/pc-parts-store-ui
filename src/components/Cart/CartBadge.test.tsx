import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import CartBadge from "./CartBadge";
import { useCart } from "../../context/CartContext";
import { createMockCartContext } from "../../test/mocks/cartContext";

vi.mock("../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

const mockedUseCart = vi
  .mocked(useCart)
  .mockReturnValue(createMockCartContext({}));

function renderCartBadge(totalItems: number) {
  mockedUseCart.mockReturnValue({ totalItems } as ReturnType<typeof useCart>);

  render(
    <MemoryRouter>
      <CartBadge />
    </MemoryRouter>,
  );
}

describe("CartBadge", () => {
  it("links to the cart page", () => {
    renderCartBadge(0);

    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute(
      "href",
      "/cart",
    );
  });

  it("does not display a badge when the cart is empty", () => {
    renderCartBadge(0);

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("displays the item count when the cart contains items", () => {
    renderCartBadge(3);

    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
