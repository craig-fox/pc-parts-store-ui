import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import OrderCard from "./OrderCard";
import { useOrders } from "../../context/useOrders";
import type { OrderResponse } from "../../types/OrderResponse";

vi.mock("../../context/useOrders", () => ({
  useOrders: vi.fn(),
}));

const order: OrderResponse = {
  id: "order-12345678",
  customerId: "customer-123",
  orderDate: "2026-07-20T10:00:00",
  status: "PLACED",
  subtotal: 799,
  shipping: 8,
  total: 807,
  items: [
    {
      productId: "product-123",
      productName: "AMD Ryzen 7 9800X3D",
      quantity: 1,
      unitPrice: 799,
      lineTotal: 799,
    },
  ],
};

describe("OrderCard", () => {
  beforeEach(() => {
    vi.mocked(useOrders).mockReturnValue({
      orders: [],
      loading: false,
      error: null,
      addOrder: vi.fn(),
      cancelOrder: vi.fn().mockResolvedValue(order),
    });
  });

  it("renders the order details", () => {
    render(<OrderCard order={order} />);

    expect(
      screen.getByRole("heading", { name: "Order #ORDER-12" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Placed 20/07/2026")).toBeInTheDocument();

    expect(screen.getByText("PLACED")).toBeInTheDocument();

    expect(screen.getByText("1 item")).toBeInTheDocument();

    expect(screen.getByText("AMD Ryzen 7 9800X3D × 1")).toBeInTheDocument();
  });

  it("uses plural items when the order contains multiple items", () => {
    render(
      <OrderCard
        order={{
          ...order,
          items: [
            ...order.items,
            {
              productId: "product-456",
              productName: "RTX 5070",
              quantity: 1,
              unitPrice: 899,
              lineTotal: 899,
            },
          ],
        }}
      />,
    );

    expect(screen.getByText("2 items")).toBeInTheDocument();
  });

  it("renders the order status", () => {
    render(
      <OrderCard
        order={{
          ...order,
          status: "CANCELLED",
        }}
      />,
    );

    expect(screen.getByText("CANCELLED")).toBeInTheDocument();
  });

  it("displays the paid status when the order has been paid", () => {
    render(
      <OrderCard
        order={{
          ...order,
          status: "PAID",
        }}
      />,
    );

    expect(screen.getByText("Payment: Paid")).toBeInTheDocument();
  });

  it("does not display the paid status for an unpaid order", () => {
    render(<OrderCard order={order} />);

    expect(screen.queryByText("Payment: Paid")).not.toBeInTheDocument();
  });

  it("calls cancelOrder when the cancel button is clicked", async () => {
    const cancelOrder = vi.fn().mockResolvedValue(order);
  
    vi.mocked(useOrders).mockReturnValue({
      orders: [],
      loading: false,
      error: null,
      addOrder: vi.fn(),
      cancelOrder,
    });
  
    render(<OrderCard order={order} />);
  
    fireEvent.click(screen.getByRole("button", { name: "Cancel order" }));
  
    await waitFor(() => {
      expect(cancelOrder).toHaveBeenCalledWith(order.id);
    });
  });
  
  it("displays an error when cancellation fails", async () => {
    const cancelOrder = vi
      .fn()
      .mockRejectedValue(new Error("Order cancellation failed: 400"));
  
    vi.mocked(useOrders).mockReturnValue({
      orders: [],
      loading: false,
      error: null,
      addOrder: vi.fn(),
      cancelOrder,
    });
  
    render(<OrderCard order={order} />);
  
    fireEvent.click(screen.getByRole("button", { name: "Cancel order" }));
  
    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent("Unable to cancel this order. Please try again.");
  });
});
