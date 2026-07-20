import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OrderSummary from "./OrderSummary";
import { testProducts } from "../../test/fixtures/products";
import type { Order } from "../../types/Order";

const order: Order = {
    id: "order-123",
    checkout: {
        customer: {
            firstName: "Craig",
            lastName: "Fox",
            email: "craig@example.com",
        },
        shippingAddress: {
            addressLine1: "1 Main St",
            city: "Auckland",
            postcode: "1010",
            country: "NZ",
        },
    },
    items: [{ product: testProducts[0], quantity: 2 }],
    subtotal: 1598,
    shipping: 0,
    total: 1598,
    totalWeight: 0.08,
    placedAt: new Date("2026-07-20T00:00:00Z"),
    status: "PLACED",
};

describe("OrderSummary", () => {
    it("displays an order's subtotal, shipping, and total", () => {
        render(<OrderSummary order={order} />);

        expect(screen.getByText("Subtotal")).toBeInTheDocument();
        expect(screen.getByText("Shipping")).toBeInTheDocument();
        expect(screen.getByText("FREE")).toBeInTheDocument();
        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getAllByText("$1,598.00")).toHaveLength(2);
    });
});
