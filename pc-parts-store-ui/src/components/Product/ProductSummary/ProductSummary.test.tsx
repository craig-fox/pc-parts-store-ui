import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ProductSummary from "./ProductSummary";
import { useCart } from "../../../context/CartContext";
import { testProducts } from "../../../test/fixtures/products";

vi.mock("../../../context/CartContext", () => ({
    useCart: vi.fn(),
}));

describe("ProductSummary", () => {
    it("shows the product details, stock status, and purchase control", () => {
        vi.mocked(useCart).mockReturnValue({ addItem: vi.fn() } as ReturnType<typeof useCart>);

        render(<ProductSummary product={testProducts[0]} />);

        expect(screen.getByRole("heading", { name: testProducts[0].name })).toBeInTheDocument();
        expect(screen.getByText("AMD")).toBeInTheDocument();
        expect(screen.getByText("In Stock")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();
    });
});
