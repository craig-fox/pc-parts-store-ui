import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import CartSummary from "./CartSummary";
import { useCart } from "../../context/CartContext";

vi.mock("../../context/CartContext", () => ({
    useCart: vi.fn(),
}));

function renderCartSummary(totalItems: number, totalPrice: number) {
    vi.mocked(useCart).mockReturnValue({
        items: [],
        totalItems,
        totalPrice,
        addItem: vi.fn(),
        removeItem: vi.fn(),
        updateQuantity: vi.fn(),
        clearCart: vi.fn(),
    });

    render(
        <MemoryRouter>
            <CartSummary />
        </MemoryRouter>
    );
}

describe("CartSummary", () => {
    it("displays the cart item count and formatted subtotal", () => {
        renderCartSummary(3, 2597);

        expect(screen.getByRole("heading", { name: "Order Summary" })).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("$2,597.00")).toBeInTheDocument();
    });

    it("displays checkout shipping information and action", () => {
        renderCartSummary(0, 0);

        expect(
            screen.getAllByText("Calculated at checkout")
        ).toHaveLength(2);
        expect(screen.getByRole("link", { name: "Checkout" })).toHaveAttribute(
            "href",
            "/checkout"
        );
    });
});
