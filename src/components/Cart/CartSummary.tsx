import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

function CartSummary() {
  const { totalItems, totalPrice } = useCart();

  const formattedSubtotal = totalPrice.toLocaleString("en-NZ", {
    style: "currency",
    currency: "NZD",
  });

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-semibold">Order Summary</h2>

      <dl className="mt-6 space-y-4">
        <div className="flex justify-between gap-4">
          <dt>Items</dt>
          <dd>{totalItems}</dd>
        </div>

        <div className="flex justify-between gap-4">
          <dt>Subtotal</dt>
          <dd>{formattedSubtotal}</dd>
        </div>

        <div className="flex justify-between gap-4">
          <dt>Shipping</dt>
          <dd>Calculated at checkout</dd>
        </div>
      </dl>

      <hr className="my-6 border-slate-200" />

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Total</span>

        <span className="text-lg font-semibold">Calculated after shipping</span>
      </div>

      <Link
        to="/checkout"
        className="mt-6 flex w-full items-center justify-center rounded-md bg-sky-600 px-4 py-3 font-medium text-white transition-colors hover:bg-sky-700"
      >
        Checkout
      </Link>
    </section>
  );
}

export default CartSummary;
