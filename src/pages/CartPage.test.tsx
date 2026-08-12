import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import CartPage from "./CartPage";
import { useCart } from "../context/CartContext";
import { createMockCartContext } from "../test/mocks/cartContext";
import { localProducts } from "../fixtures/products";

vi.mock("../context/CartContext", () => ({
  useCart: vi.fn(),
}));

describe("CartPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows an empty state when the cart is empty", () => {
    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        items: [],
        totalItems: 0,
        totalWeight: 0,
        totalPrice: 0,
      }),
    );

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Shopping Cart" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Browse our products and add something to your cart.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Browse Products" }),
    ).toHaveAttribute("href", "/products");
  });

  it("renders cart items and the order summary in the populated cart layout", async () => {
    const user = userEvent.setup();
    const clearCart = vi.fn();

    vi.spyOn(window, "confirm").mockReturnValue(true);

    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        items: [
          { product: localProducts[0], quantity: 2 },
          { product: localProducts[2], quantity: 1 },
        ],
        totalItems: 3,
        totalWeight: 1.0,
        totalPrice: 2597,
        clearCart,
      }),
    );

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Shopping Cart" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Items" }),
    ).toBeInTheDocument();

    expect(screen.getByText(localProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(localProducts[2].name)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Order Summary" }),
    ).toBeInTheDocument();

    expect(screen.getByText("$2,597.00")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Checkout" }),
    ).toHaveAttribute("href", "/checkout");

    await user.click(
      screen.getByRole("button", { name: "Clear Cart" }),
    );

    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to remove all items from your cart?",
    );

    expect(clearCart).toHaveBeenCalledOnce();
  });

  it("does not clear the cart when clearing is cancelled", async () => {
    const user = userEvent.setup();
    const clearCart = vi.fn();

    vi.spyOn(window, "confirm").mockReturnValue(false);

    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        items: [{ product: localProducts[0], quantity: 1 }],
        totalItems: 1,
        totalWeight: 0.04,
        totalPrice: 799,
        clearCart,
      }),
    );

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: "Clear Cart" }),
    );

    expect(window.confirm).toHaveBeenCalled();
    expect(clearCart).not.toHaveBeenCalled();
  });
});