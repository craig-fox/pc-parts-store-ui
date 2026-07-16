import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import CartPage from "./CartPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import OrdersPage from "./OrdersPage";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductsPage from "./ProductsPage";
import { CartProvider } from "../context/CartContext";

describe("pages", () => {
    it("renders the static home, login, and orders headings", () => {
        const { rerender } = render(<HomePage />);
        expect(screen.getByRole("heading", { name: "Welcome to the PC Parts Store" })).toBeInTheDocument();

        rerender(<LoginPage />);
        expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();

        rerender(<OrdersPage />);
        expect(screen.getByRole("heading", { name: "My Orders" })).toBeInTheDocument();
    });

    it("renders the product catalogue", () => {
        render(
            <MemoryRouter>
                <CartProvider>
                    <ProductsPage />
                </CartProvider>
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "Products" })).toBeInTheDocument();
        expect(screen.getByText("AMD Ryzen 7 9800X3D")).toBeInTheDocument();
        expect(screen.getByText("Western Digital Black SN850X")).toBeInTheDocument();
    });

    it("renders the cart empty state and its browse-products link", () => {
        render(
            <MemoryRouter>
                <CartProvider>
                    <CartPage />
                </CartProvider>
            </MemoryRouter>
        );

        expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Browse Products" })).toHaveAttribute("href", "/products");
    });

    it("renders product details for an existing route parameter", () => {
        render(
            <MemoryRouter initialEntries={["/products/1"]}>
                <CartProvider>
                    <Routes>
                        <Route path="/products/:id" element={<ProductDetailsPage />} />
                    </Routes>
                </CartProvider>
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "AMD Ryzen 7 9800X3D" })).toBeInTheDocument();
        expect(screen.getByText("8-Core Gaming Processor")).toBeInTheDocument();
    });

    it("renders a not-found state for an unknown product", () => {
        render(
            <MemoryRouter initialEntries={["/products/999"]}>
                <Routes>
                    <Route path="/products/:id" element={<ProductDetailsPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Product not found")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /back to products/i })).toHaveAttribute("href", "/products");
    });
});
