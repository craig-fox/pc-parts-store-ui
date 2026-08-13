import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CheckoutPage from "./CheckoutPage";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/useOrders";
import { localProducts } from "../fixtures/products";
import { createMockCartContext } from "../test/mocks/cartContext";
import { createMockOrdersContext } from "../test/mocks/ordersContext";
import { orderService } from "../services/orderService";

vi.mock("../context/CartContext", () => ({ useCart: vi.fn() }));
vi.mock("../context/useOrders", () => ({ useOrders: vi.fn() }));
vi.mock("../services/orderService", () => ({
  orderService: {
    createOrder: vi.fn(),
  },
}));

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
        items: [{ product: localProducts[0], quantity: 1 }],
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
    const user = userEvent.setup();
    const addOrder = vi.fn();

    vi.mocked(useOrders).mockReturnValue({
      orders: [],
      loading: false,
      error: null,
      getOrder: vi.fn(),
      addOrder,
    });

    vi.mocked(orderService.createOrder).mockResolvedValue(createdOrder);

    const clearCart = vi.fn();

    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        items: [{ product: localProducts[0], quantity: 1 }],
        totalItems: 1,
        totalPrice: 799,
        totalWeight: 0.04,
        clearCart,
      }),
    );

    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-confirmation"
            element={<div>Order Confirmation Page</div>}
          />
        </Routes>
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("First Name"), "Craig");
    await user.type(screen.getByLabelText("Last Name"), "Fox");
    await user.type(screen.getByLabelText("Email"), "craig@example.com");
    await user.type(screen.getByLabelText("Address"), "1 Main St");
    await user.type(screen.getByLabelText("City"), "Auckland");
    await user.type(screen.getByLabelText("Postcode"), "1010");
    await user.type(screen.getByLabelText("Country"), "NZ");

    await user.click(screen.getByRole("button", { name: "Confirm Order" }));

    await waitFor(() => {
      expect(orderService.createOrder).toHaveBeenCalledWith({
        items: [
          {
            productId: localProducts[0].id,
            quantity: 1,
          },
        ],
      });
    });

    expect(addOrder).toHaveBeenCalledWith(createdOrder);
    expect(clearCart).toHaveBeenCalled();
    expect(
      await screen.findByText("Order Confirmation Page"),
    ).toBeInTheDocument();
  });

  it("shows validation errors and does not submit an invalid checkout", async () => {
    const user = userEvent.setup();

    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        items: [{ product: localProducts[0], quantity: 1 }],
        totalItems: 1,
        totalPrice: 799,
        totalWeight: 0.04,
      }),
    );

    vi.mocked(useOrders).mockReturnValue(createMockOrdersContext());

    renderCheckoutPage();

    await user.click(screen.getByRole("button", { name: "Confirm Order" }));

    expect(screen.getByText("First name is required.")).toBeInTheDocument();

    expect(screen.getByText("Last name is required.")).toBeInTheDocument();

    expect(screen.getByText("Email is required.")).toBeInTheDocument();

    expect(screen.getByText("Address is required.")).toBeInTheDocument();

    expect(screen.getByText("City is required.")).toBeInTheDocument();

    expect(screen.getByText("Country is required.")).toBeInTheDocument();

    expect(screen.getByText("Postcode is required.")).toBeInTheDocument();

    expect(orderService.createOrder).not.toHaveBeenCalled();
  });

  it("does not clear the cart or add an order when order creation fails", async () => {
    const user = userEvent.setup();
    const clearCart = vi.fn();
    const addOrder = vi.fn();

    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        items: [{ product: localProducts[0], quantity: 1 }],
        totalItems: 1,
        totalPrice: 799,
        totalWeight: 0.04,
        clearCart,
      }),
    );

    vi.mocked(useOrders).mockReturnValue({
      orders: [],
      loading: false,
      error: null,
      getOrder: vi.fn(),
      addOrder,
    });

    vi.mocked(orderService.createOrder).mockRejectedValue(
      new Error("Order creation failed"),
    );

    renderCheckoutPage();

    await user.type(screen.getByLabelText("First Name"), "Craig");
    await user.type(screen.getByLabelText("Last Name"), "Fox");
    await user.type(screen.getByLabelText("Email"), "craig@example.com");
    await user.type(screen.getByLabelText("Address"), "1 Main St");
    await user.type(screen.getByLabelText("City"), "Auckland");
    await user.type(screen.getByLabelText("Postcode"), "1010");
    await user.type(screen.getByLabelText("Country"), "NZ");

    await user.click(screen.getByRole("button", { name: "Confirm Order" }));

    await waitFor(() => {
      expect(orderService.createOrder).toHaveBeenCalled();
    });

    expect(addOrder).not.toHaveBeenCalled();
    expect(clearCart).not.toHaveBeenCalled();
  });
});
