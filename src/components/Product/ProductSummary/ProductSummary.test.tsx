import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ProductSummary from "./ProductSummary";
import { useCart } from "../../../context/CartContext";
import { testProducts } from "../../../test/fixtures/products";
import { createMockCartContext } from "../../../test/mocks/cartContext";

vi.mock("../../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

describe("ProductSummary", () => {
  it("shows the product details, stock status, and purchase control", () => {
    const addItem = vi.fn();
    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        addItem,
      }),
    );

    render(<ProductSummary product={testProducts[0]} />);

    expect(
      screen.getByRole("heading", { name: testProducts[0].name }),
    ).toBeInTheDocument();
    expect(screen.getByText("AMD")).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add to Cart" }),
    ).toBeInTheDocument();
  });
});
