import { Link } from "react-router-dom";

import Button from "../components/common/Button";

import { useOrders } from "../context/useOrders";

function OrderConfirmationPage() {
  const { latestOrder } = useOrders();

  if (!latestOrder) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">No Recent Order</h1>

        <p className="mb-8 text-slate-600">
          We couldn't find a recently placed order.
        </p>

        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-8 text-center">
      <div className="mb-4 text-6xl">✅</div>

      <h1 className="mb-4 text-4xl font-bold">Order Confirmed</h1>

      <p className="mb-8 text-slate-600">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      {latestOrder && (
        <div className="mb-8 rounded-lg bg-slate-100 p-4">
          <p className="text-sm tracking-wide text-slate-500 uppercase">
            Order Number
          </p>

          <p className="mt-2 font-mono text-lg font-semibold">
            {latestOrder.id}
          </p>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>

        <Link to="/orders">
          <Button variant="secondary">View Orders</Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
