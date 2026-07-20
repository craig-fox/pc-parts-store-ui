import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import OrdersPage from "./OrdersPage";
import { useOrders } from "../context/useOrders";
import { testProducts } from "../test/fixtures/products";

vi.mock("../context/useOrders", () => ({ useOrders: vi.fn() }));

function renderOrdersPage() {
    render(
        <MemoryRouter>
            <OrdersPage />
        </MemoryRouter>
    );
}

function createOrdersContext(
    overrides: Partial<ReturnType<typeof useOrders>> = {}
): ReturnType<typeof useOrders> {
    return {
        orders: [],
        latestOrder: undefined,
        addOrder: vi.fn(),
        getOrder: vi.fn(),
        clearOrders: vi.fn(),
        ...overrides,
    };
}

describe("OrdersPage", () => {
    it("shows an empty state when no orders have been placed", () => {
        vi.mocked(useOrders).mockReturnValue(createOrdersContext());

        renderOrdersPage();

        expect(screen.getByText("No orders yet")).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "Browse Products" })
        ).toHaveAttribute("href", "/products");
    });

    it("renders a card for each placed order", () => {
        vi.mocked(useOrders).mockReturnValue({
            orders: [
                {
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
                    items: [{ product: testProducts[0], quantity: 1 }],
                    subtotal: 799,
                    shipping: 8,
                    total: 807,
                    totalWeight: 0.04,
                    placedAt: new Date("2026-07-20T00:00:00Z"),
                    status: "PLACED",
                },
            ],
        } as ReturnType<typeof useOrders>);

        renderOrdersPage();

        expect(
            screen.getByRole("heading", { name: "Order #ORDER-12" })
        ).toBeInTheDocument();
        expect(screen.getByText("AMD Ryzen 7 9800X3D × 1")).toBeInTheDocument();
    });
});
