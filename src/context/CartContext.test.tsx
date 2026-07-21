import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CartProvider, useCart } from "./CartContext";
import { testProducts } from "../test/fixtures/products";
import { displayProducts } from "../data/displayProducts";

function CartControls() {
  const { addItem, clearCart, items, totalItems, totalPrice, updateQuantity } =
    useCart();

  return (
    <>
      <output>{`${items.length}:${totalItems}:${totalPrice}`}</output>
      <button type="button" onClick={() => addItem(testProducts[0])}>
        Add
      </button>
      <button type="button" onClick={() => updateQuantity(1, 3)}>
        Set quantity
      </button>
      <button type="button" onClick={clearCart}>
        Clear
      </button>
    </>
  );
}

function CartImageControl() {
  const { addItem, items } = useCart();
  const staleGpu = { ...testProducts[2], imageUrl: "" };

  return (
    <>
      <button type="button" onClick={() => addItem(staleGpu)}>
        Add stale GPU
      </button>
      {items[0] && <img alt="Cart product" src={items[0].product.imageUrl} />}
    </>
  );
}

describe("CartProvider", () => {
  it("maintains cart items and derived totals through cart actions", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CartControls />
      </CartProvider>,
    );

    expect(screen.getByRole("status")).toHaveTextContent("0:0:0");
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "Set quantity" }));

    expect(screen.getByRole("status")).toHaveTextContent("1:3:2397");

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByRole("status")).toHaveTextContent("0:0:0");
  });

  it("requires consumers to be rendered inside CartProvider", () => {
    function Consumer() {
      useCart();
      return null;
    }

    expect(() => render(<Consumer />)).toThrow(
      "useCart must be used within a CartProvider",
    );
  });

  it("uses current product details for an existing cart item", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CartImageControl />
      </CartProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Add stale GPU" }));

    expect(screen.getByRole("img", { name: "Cart product" })).toHaveAttribute(
      "src",
      displayProducts[2].imageUrl,
    );
  });
});
