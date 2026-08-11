import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import OrderSummary from "./OrderSummary";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/currency";
import { createMockCartContext } from "../../test/mocks/cartContext";
import { localProducts } from "../../fixtures/products";

vi.mock("../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

describe("OrderSummary", () => {
  it("displays cart product names, item count, and subtotal", () => {
    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        items: [
          { product: localProducts[0], quantity: 2 },
          { product: localProducts[2], quantity: 1 },
        ],
      }),
    );

    render(<OrderSummary />);

    expect(
      screen.getByRole("heading", { name: "Order Summary" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(localProducts[0].name)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(localProducts[2].name)),
    ).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getAllByText(formatCurrency(2597))).toHaveLength(2);
  });

  it("displays the shipping charge and total when shipping is not free", () => {
    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        items: [{ product: localProducts[4], quantity: 1 }],
      }),
    );

    render(<OrderSummary />);

    expect(screen.getByText(formatCurrency(8))).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(277))).toBeInTheDocument();
  });
});
