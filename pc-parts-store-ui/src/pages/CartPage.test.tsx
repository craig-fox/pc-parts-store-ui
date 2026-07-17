import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CartPage from "./CartPage";
import { useCart } from "../context/CartContext";
import { testProducts } from "../test/fixtures/products";

vi.mock("../context/CartContext", () => ({
    useCart: vi.fn(),
}));

describe("CartPage", () => {
    it("renders cart items and the order summary in the populated cart layout", async () => {
        const user = userEvent.setup();
        const clearCart = vi.fn();
        vi.spyOn(window, "confirm").mockReturnValue(true);

        vi.mocked(useCart).mockReturnValue({
            items: [
                { product: testProducts[0], quantity: 2 },
                { product: testProducts[2], quantity: 1 },
            ],
            totalItems: 3,
            totalPrice: 2597,
            addItem: vi.fn(),
            removeItem: vi.fn(),
            updateQuantity: vi.fn(),
            clearCart,
        });

        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "Shopping Cart" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Items" })).toBeInTheDocument();
        expect(screen.getByText(testProducts[0].name)).toBeInTheDocument();
        expect(screen.getByText(testProducts[2].name)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Order Summary" })).toBeInTheDocument();
        expect(screen.getByText("$2,597.00")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Checkout" })).toHaveAttribute(
            "href",
            "/checkout"
        );
        await user.click(screen.getByRole("button", { name: "Clear Cart" }));
        expect(clearCart).toHaveBeenCalledOnce();
    });
});
