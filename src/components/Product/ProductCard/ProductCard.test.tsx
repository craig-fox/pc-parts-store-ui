import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import ProductCard from "./ProductCard";
import { useCart } from "../../../context/CartContext";
import { testProducts } from "../../../test/fixtures/products";
import { createMockCartContext } from "../../../test/mocks/cartContext";

vi.mock("../../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

describe("ProductCard", () => {
  it("shows product information and links to product details", () => {
    const addItem = vi.fn();
    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        addItem,
      }),
    );
    const product = testProducts[0];

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText("$799.00")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/products/1");
  });
});
