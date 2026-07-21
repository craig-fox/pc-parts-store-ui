import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { OrdersProvider } from "./OrdersContext";
import { useOrders } from "./useOrders";
import { testProducts } from "../test/fixtures/products";
import type { Order } from "../types/Order";

const firstOrder: Order = {
  id: "order-1",
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
};

function OrdersControls() {
  const { addOrder, clearOrders, getOrder, latestOrder, orders } = useOrders();
  const secondOrder = { ...firstOrder, id: "order-2" };

  return (
    <>
      <output aria-label="Order state">{`${orders.length}:${latestOrder?.id ?? "none"}`}</output>
      <output aria-label="Found order">
        {getOrder("order-1")?.id ?? "none"}
      </output>
      <button type="button" onClick={() => addOrder(firstOrder)}>
        Add first
      </button>
      <button type="button" onClick={() => addOrder(secondOrder)}>
        Add second
      </button>
      <button type="button" onClick={clearOrders}>
        Clear
      </button>
    </>
  );
}

describe("OrdersProvider and useOrders", () => {
  it("adds, retrieves, tracks, and clears orders", async () => {
    const user = userEvent.setup();

    render(
      <OrdersProvider>
        <OrdersControls />
      </OrdersProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Add first" }));
    expect(
      screen.getByRole("status", { name: "Order state" }),
    ).toHaveTextContent("1:order-1");
    expect(
      screen.getByRole("status", { name: "Found order" }),
    ).toHaveTextContent("order-1");

    await user.click(screen.getByRole("button", { name: "Add second" }));
    expect(
      screen.getByRole("status", { name: "Order state" }),
    ).toHaveTextContent("2:order-2");

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(
      screen.getByRole("status", { name: "Order state" }),
    ).toHaveTextContent("0:none");
  });

  it("requires useOrders consumers to be inside OrdersProvider", () => {
    function Consumer() {
      useOrders();
      return null;
    }

    expect(() => render(<Consumer />)).toThrow(
      "useOrders must be used within an OrdersProvider.",
    );
  });
});
