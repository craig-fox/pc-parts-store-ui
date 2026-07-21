import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CartItemRow from "./CartItemRow";
import type { Product } from "../../types/Product";
import type { CartItem } from "../../types/CartItem";
import { useCart, type CartContextType } from "../../context/CartContext";
import { createMockCartContext } from "../../test/mocks/cartContext";

vi.mock("../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

type RenderOptions = Partial<
  Pick<CartContextType, "updateQuantity" | "removeItem">
>;

function renderCartItemRow(item: CartItem, overrides: RenderOptions = {}) {
  const cartContext = createMockCartContext(overrides);

  vi.mocked(useCart).mockReturnValue(cartContext);

  render(<CartItemRow item={item} />);

  return cartContext;
}

const testProduct: Product = {
  id: 1,
  name: "AMD Ryzen 7 9800X3D",
  description: "8-Core Gaming Processor",
  category: "CPU",
  price: 799,
  weightKg: 0.04,
  imageUrl: "",
  brand: "AMD",
  stockQuantity: 42,
  sku: "CPU-AMD-9800X3D",
};

describe("CartItemRow", () => {
  it("displays the product name", () => {
    const item: CartItem = { product: testProduct, quantity: 2 };

    renderCartItemRow(item);

    expect(screen.getByText("AMD Ryzen 7 9800X3D")).toBeInTheDocument();
  });

  it("displays the quantity", () => {
    const item: CartItem = { product: testProduct, quantity: 3 };

    renderCartItemRow(item);

    expect(screen.getByText("Quantity: 3")).toBeInTheDocument();
  });

  it("displays the line total as price times quantity", () => {
    const item: CartItem = { product: testProduct, quantity: 2 };

    renderCartItemRow(item);

    // 799 * 2 = 1598
    expect(screen.getByText(/1598/)).toBeInTheDocument();
  });

  it("updates the quantity when its controls are used", async () => {
    const user = userEvent.setup();
    const item: CartItem = { product: testProduct, quantity: 2 };
    const { updateQuantity } = renderCartItemRow(item);

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));

    expect(updateQuantity).toHaveBeenNthCalledWith(1, 1, 3);
    expect(updateQuantity).toHaveBeenNthCalledWith(2, 1, 1);
  });

  it("removes the item when the remove button is clicked", async () => {
    const user = userEvent.setup();
    const item: CartItem = { product: testProduct, quantity: 2 };
    const { removeItem } = renderCartItemRow(item);

    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(removeItem).toHaveBeenCalledWith(testProduct.id);
  });

  it.each`
    quantity | price  | expectedTotal
    ${1}     | ${799} | ${799}
    ${2}     | ${799} | ${1598}
    ${5}     | ${100} | ${500}
  `(
    "calculates $expectedTotal for quantity=$quantity and price=$price",
    ({ quantity, price, expectedTotal }) => {
      const item: CartItem = {
        product: { ...testProduct, price },
        quantity,
      };

      renderCartItemRow(item);

      expect(
        screen.getByText(new RegExp(String(expectedTotal))),
      ).toBeInTheDocument();
    },
  );
});
