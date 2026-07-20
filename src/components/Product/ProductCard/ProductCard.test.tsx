import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import ProductCard from "./ProductCard";
import { useCart } from "../../../context/CartContext";
import { testProducts } from "../../../test/fixtures/products";

vi.mock("../../../context/CartContext", () => ({
    useCart: vi.fn(),
}));

describe("ProductCard", () => {
    it("shows product information and links to product details", () => {
        vi.mocked(useCart).mockReturnValue({ addItem: vi.fn() } as ReturnType<
            typeof useCart
        >);
        const product = testProducts[0];

        render(
            <MemoryRouter>
                <ProductCard product={product} />
            </MemoryRouter>
        );

        expect(screen.getByText(product.category)).toBeInTheDocument();
        expect(screen.getByText(product.description)).toBeInTheDocument();
        expect(screen.getByText("$799.00")).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", "/products/1");
    });
});
