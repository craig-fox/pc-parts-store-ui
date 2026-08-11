import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import ProductCard from "./ProductCard";
import { useCart } from "../../../context/CartContext";
import { localProducts } from "../../../fixtures/products";
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
    const product = localProducts[0];
    const productId = "7c2f5db6-8d7a-4b6d-a3d1-1c8d1f2d4e91";
    const expectedUrl = `/products/${productId}`;

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText("$799.00")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", expectedUrl);
  });
});
