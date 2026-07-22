import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import CartPage from "./CartPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import OrdersPage from "./OrdersPage";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductsPage from "./ProductsPage";
import { CartProvider } from "../context/CartContext";
import { OrdersProvider } from "../context/OrdersContext";
import { getProduct, getProducts } from "../services/productService";
import { testProducts } from "../test/fixtures/products";

vi.mock("../services/productService", () => ({
  getProducts: vi.fn(),
  getProduct: vi.fn(),
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

  it("renders the login heading", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("heading", {
        name: /login/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the orders heading", () => {
    render(
      <OrdersProvider>
        <MemoryRouter>
          <OrdersPage />
        </MemoryRouter>
      </OrdersProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /my orders/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/no orders yet/i)).toBeInTheDocument();
  });

  it("renders the product catalogue", async () => {
    vi.mocked(getProducts).mockResolvedValue(testProducts);

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
    vi.mocked(getProduct).mockResolvedValue(testProducts[0]);

    render(
      <MemoryRouter initialEntries={[`/products/${testProducts[0].id}`]}>
        <CartProvider>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", {
        name: testProducts[0].name,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(testProducts[0].description)).toBeInTheDocument();
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
