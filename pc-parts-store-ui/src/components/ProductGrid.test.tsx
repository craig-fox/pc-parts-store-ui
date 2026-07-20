import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import ProductGrid from "./ProductGrid";
import { testProducts } from "../test/fixtures/products";
import { CartProvider } from "../context/CartContext";

describe("ProductGrid", () => {
    it("displays a card for every product", () => {
        render(
            <MemoryRouter>
                <CartProvider>
                    <ProductGrid products={testProducts} />
                </CartProvider>
            </MemoryRouter>
        );

        testProducts.forEach((product) => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
        });
    });
    it("displays the empty state when there are no products", () => {
        render(
            <MemoryRouter>
                <ProductGrid products={[]} />
            </MemoryRouter>
        );

        expect(screen.getByText("No products found")).toBeInTheDocument();
        expect(
            screen.getByText("Try adjusting your search or filters.")
        ).toBeInTheDocument();
    });
});
