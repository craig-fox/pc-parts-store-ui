import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProductDetailsPage from "./ProductDetailsPage";
import { getProduct } from "../services/productService";
import { localProducts } from "../test/fixtures/products";
import { CartProvider } from "../context/CartContext";

vi.mock("../services/productService", () => ({
  getProduct: vi.fn(),
}));

function renderProductDetailsPage(
  initialEntry = `/products/${localProducts[0].id}`,
) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <CartProvider>
        <Routes>
          <Route path="/products/:id" element={<ProductDetailsPage />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("ProductDetailsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays a loading state while fetching the product", () => {
    vi.mocked(getProduct).mockReturnValue(new Promise(() => {}));

    renderProductDetailsPage();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("fetches and displays the requested product", async () => {
    const product = localProducts[0];

    vi.mocked(getProduct).mockResolvedValue(product);

    renderProductDetailsPage(`/products/${product.id}`);

    expect(
      await screen.findByRole("heading", {
        name: product.name,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(product.description)).toBeInTheDocument();

    expect(getProduct).toHaveBeenCalledWith(product.id);
  });

  it("displays a not-found state when the product cannot be loaded", async () => {
    vi.mocked(getProduct).mockRejectedValue(new Error("Product not found"));

    renderProductDetailsPage("/products/unknown-id");

    expect(await screen.findByText("Product not found")).toBeInTheDocument();

    expect(
      screen.getByText("The requested product does not exist."),
    ).toBeInTheDocument();
  });

  it("displays a not-found state when no product id is provided", () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Routes>
          <Route path="/products" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Product not found")).toBeInTheDocument();

    expect(getProduct).not.toHaveBeenCalled();
  });
});
