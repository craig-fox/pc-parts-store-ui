import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import OrderSummary from "./OrderSummary";
import { useCart } from "../../context/CartContext";
import { testProducts } from "../../test/fixtures/products";
import { formatCurrency } from "../../utils/currency";

vi.mock("../../context/CartContext", () => ({
    useCart: vi.fn(),
}));

describe("OrderSummary", () => {
    it("displays cart product names, item count, and subtotal", () => {
        vi.mocked(useCart).mockReturnValue({
            items: [
                { product: testProducts[0], quantity: 2 },
                { product: testProducts[2], quantity: 1 },
            ],
            totalItems: 3,
            totalPrice: 2597,
            totalWeight: 1.28,
            addItem: vi.fn(),
            removeItem: vi.fn(),
            updateQuantity: vi.fn(),
            clearCart: vi.fn(),
        });

        render(<OrderSummary />);

        expect(
            screen.getByRole("heading", { name: "Order Summary" })
        ).toBeInTheDocument();
        expect(
            screen.getByText(new RegExp(testProducts[0].name))
        ).toBeInTheDocument();
        expect(
            screen.getByText(new RegExp(testProducts[2].name))
        ).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getAllByText(formatCurrency(2597))).toHaveLength(2);
    });

    it("displays the shipping charge and total when shipping is not free", () => {
        vi.mocked(useCart).mockReturnValue({
            items: [{ product: testProducts[4], quantity: 1 }],
            totalItems: 1,
            totalPrice: 269,
            totalWeight: 0.01,
            addItem: vi.fn(),
            removeItem: vi.fn(),
            updateQuantity: vi.fn(),
            clearCart: vi.fn(),
        });

        render(<OrderSummary />);

        expect(screen.getByText(formatCurrency(8))).toBeInTheDocument();
        expect(screen.getByText(formatCurrency(277))).toBeInTheDocument();
    });
});
