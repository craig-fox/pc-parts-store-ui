import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import CartPage from "./CartPage";
import HomePage from "./HomePage";
import OrdersPage from "./OrdersPage";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductsPage from "./ProductsPage";
import { CartProvider } from "../context/CartContext";
import { getProduct, getProducts } from "../services/productService";
import { useOrders } from "../context/useOrders";
import { localProducts } from "../fixtures/products";

vi.mock("../services/productService", () => ({
  getProducts: vi.fn(),
  getProduct: vi.fn(),
}));

vi.mock("../context/useOrders", () => ({
  useOrders: vi.fn(),
}));

describe("pages", () => {
  it("renders the home page heading", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /welcome to the pc parts store/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the orders heading", () => {
    vi.mocked(useOrders).mockReturnValue({
      orders: [],
      loading: false,
      error: null,
      getOrder: vi.fn(),
      addOrder: vi.fn(),
    });

    render(
      <MemoryRouter>
        <OrdersPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /my orders/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/no orders yet/i)).toBeInTheDocument();
  });

  it("renders the product catalogue", async () => {
    vi.mocked(getProducts).mockResolvedValue(localProducts);

    render(
      <MemoryRouter>
        <CartProvider>
          <ProductsPage />
        </CartProvider>
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "Products" }),
    ).toBeInTheDocument();

    expect(await screen.findByText("AMD Ryzen 7 9800X3D")).toBeInTheDocument();
  });

  it("renders the cart empty state and its browse-products link", () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <CartPage />
        </CartProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Browse Products" }),
    ).toHaveAttribute("href", "/products");
  });

  it("renders product details for an existing route parameter", async () => {
    vi.mocked(getProduct).mockResolvedValue(localProducts[0]);

    render(
      <MemoryRouter initialEntries={[`/products/${localProducts[0].id}`]}>
        <CartProvider>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", {
        name: localProducts[0].name,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(localProducts[0].description)).toBeInTheDocument();
  });

  it("renders a not-found state for an unknown product", async () => {
    vi.mocked(getProduct).mockRejectedValue(new Error("Product not found"));

    render(
      <MemoryRouter initialEntries={["/products/unknown-id"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText("Product not found")).toBeInTheDocument();
  });
});
