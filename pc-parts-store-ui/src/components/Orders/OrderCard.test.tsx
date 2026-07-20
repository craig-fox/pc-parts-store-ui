import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OrderCard from "./OrderCard";
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
    items: [
        { product: testProducts[0], quantity: 2 },
        { product: testProducts[2], quantity: 1 },
    ],
    subtotal: 2597,
    shipping: 0,
    total: 2597,
    totalWeight: 1.28,
    placedAt: new Date("2026-07-20T00:00:00Z"),
    status: "PLACED",
};

describe("OrderCard", () => {
    it("displays order identity, status, items, and total", () => {
        render(<OrderCard order={order} />);

        expect(
            screen.getByRole("heading", {
                name: "Order #ORDER-12",
            })
        ).toBeInTheDocument();

        expect(screen.getByText("PLACED")).toBeInTheDocument();
        expect(screen.getByText("3 items")).toBeInTheDocument();
        expect(screen.getByText("AMD Ryzen 7 9800X3D × 2")).toBeInTheDocument();
        expect(screen.getByText("NVIDIA RTX 5070 × 1")).toBeInTheDocument();
        expect(screen.getAllByText("$2,597.00")).toHaveLength(2);
    });
});
