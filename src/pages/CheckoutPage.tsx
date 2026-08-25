import { useNavigate, Link } from "react-router-dom";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import OrderSummary from "../components/Checkout/OrderSummary";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";
import Button from "../components/common/Button";
import { useState } from "react";
import type { Checkout } from "../types/Checkout";
import type { CheckoutErrors } from "../types/CheckoutErrors";
import { orderService } from "../services/orderService";
import { useOrders } from "../context/useOrders";

function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const { addOrder } = useOrders();

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

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      setSubmitError(null);

      const request = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        shippingAddress: checkout.shippingAddress,
        shippingMethod: "STANDARD" as const
      };

      const order = await orderService.createOrder(request);
      addOrder(order);
      clearCart();

      navigate("/order-confirmation", {
        state: { order },
      });
    } catch (error) {
      console.error("Failed to create order:", error);
      setSubmitError("We were unable to place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
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

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <CheckoutForm
            checkout={checkout}
            setCheckout={setCheckout}
            errors={errors}
          />

          <div>
            <OrderSummary />
            {submitError && (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {submitError}
              </p>
            )}

            <Button type="submit" disabled={submitting} className="mt-6 w-full">
              {submitting ? "Placing Order..." : "Confirm Order"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
