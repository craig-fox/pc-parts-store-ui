import { useNavigate, Link } from "react-router-dom";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import OrderSummary from "../components/Checkout/OrderSummary";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";
import Button from "../components/common/Button";
import type { Order } from "../types/Order";
import { useState } from "react";
import type { Checkout } from "../types/Checkout";
import type { CheckoutErrors } from "../types/CheckoutErrors";
import type { OrderTotals } from "../utils/orderCalculations";

import { calculateOrderTotals } from "../utils/orderCalculations";
import { useOrders } from "../context/useOrders";

function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [checkout, setCheckout] = useState<Checkout>({
    customer: {
      firstName: "",
      lastName: "",
      email: "",
    },
    shippingAddress: {
      addressLine1: "",
      city: "",
      postcode: "",
      country: "",
    },
  });

  const [errors, setErrors] = useState<CheckoutErrors>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postcode: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const totals: OrderTotals = calculateOrderTotals(items);

    const order: Order = {
      id: crypto.randomUUID(),
      checkout,
      items,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      totalWeight: totals.totalWeight,
      placedAt: new Date(),
      status: "PLACED",
    };
    addOrder(order);
    clearCart();
    navigate("/order-confirmation");
  };

  function validate() {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      country: "",
      postcode: "",
    };

    if (!checkout.customer.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!checkout.customer.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!checkout.customer.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(checkout.customer.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!checkout.shippingAddress.addressLine1.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!checkout.shippingAddress.city.trim()) {
      newErrors.city = "City is required.";
    }
    if (!checkout.shippingAddress.country.trim()) {
      newErrors.country = "Country is required.";
    }

    if (!checkout.shippingAddress.postcode.trim()) {
      newErrors.postcode = "Postcode is required.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  }
  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Add some products before proceeding to checkout."
        action={<Link to="/products">Browse Products</Link>}
      />
    );
  }
  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <CheckoutForm
            checkout={checkout}
            setCheckout={setCheckout}
            errors={errors}
          />

          <div>
            <OrderSummary />

            <Button type="submit" className="mt-6 w-full">
              Confirm Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
