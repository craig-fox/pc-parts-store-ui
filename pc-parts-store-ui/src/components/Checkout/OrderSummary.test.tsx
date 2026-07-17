import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import OrderSummary from "./OrderSummary";
import { useCart } from "../../context/CartContext";
import { testProducts } from "../../test/fixtures/products";

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
            addItem: vi.fn(),
            removeItem: vi.fn(),
            updateQuantity: vi.fn(),
            clearCart: vi.fn(),
        });

        render(<OrderSummary />);

        expect(screen.getByRole("heading", { name: "Order Summary" })).toBeInTheDocument();
        expect(screen.getByText(testProducts[0].name)).toBeInTheDocument();
        expect(screen.getByText(testProducts[2].name)).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("$2597")).toBeInTheDocument();
    });
});
