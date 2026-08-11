import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import CheckoutPage from "./CheckoutPage";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/useOrders";
import { testProducts } from "../test/fixtures/products";
import { createMockCartContext } from "../test/mocks/cartContext";
import { createMockOrdersContext } from "../test/mocks/ordersContext";
import { orderService } from "../services/orderService";


vi.mock("../context/CartContext", () => ({ useCart: vi.fn() }));
vi.mock("../context/useOrders", () => ({ useOrders: vi.fn() }));

function renderCheckoutPage() {
  render(
    <MemoryRouter>
      <CheckoutPage />
    </MemoryRouter>,
  );
}

const createdOrder = {
  id: "order-123",
  customerId: "customer-123",
  orderDate: "2026-08-11T05:30:00",
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

describe("CheckoutPage", () => {
  it("shows a browse-products empty state when the cart is empty", () => {
    vi.mocked(useCart).mockReturnValue(createMockCartContext());
    vi.mocked(useOrders).mockReturnValue(createMockOrdersContext());

    renderCheckoutPage();

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Browse Products" }),
    ).toHaveAttribute("href", "/products");
  });

  it("shows checkout fields, the order summary, and confirmation action for cart items", () => {
    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        items: [{ product: testProducts[0], quantity: 1 }],
        totalItems: 1,
        totalPrice: 799,
        totalWeight: 0.04,
      }),
    );

    vi.mocked(useOrders).mockReturnValue(createMockOrdersContext());

    renderCheckoutPage();

    expect(
      screen.getByRole("heading", { name: "Checkout" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Order Summary" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Confirm Order" }),
    ).toBeInTheDocument();
  });

  it("adds the created order to the orders context after successful submission", async () => {
    const addOrder = vi.fn();
  
    vi.mocked(useOrders).mockReturnValue({
      orders: [],
      loading: false,
      error: null,
      getOrder: vi.fn(),
      addOrder,
    });
  
    vi.mocked(orderService.createOrder).mockResolvedValue(createdOrder);
  
    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>,
    );
  
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Craig" },
    });
  
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Fox" },
    });
  
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "craig@example.com" },
    });
  
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "1 Main St" },
    });
  
    fireEvent.change(screen.getByLabelText("City"), {
      target: { value: "Auckland" },
    });
  
    fireEvent.change(screen.getByLabelText("Postcode"), {
      target: { value: "1010" },
    });
  
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "NZ" },
    });
  
    fireEvent.click(
      screen.getByRole("button", { name: "Confirm Order" }),
    );
  
    await waitFor(() => {
      expect(orderService.createOrder).toHaveBeenCalledWith({
        items: [
          {
            productId: testProducts[0].id,
            quantity: 1,
          },
        ],
      });
    });
  
    expect(addOrder).toHaveBeenCalledWith(createdOrder);
  });
});
