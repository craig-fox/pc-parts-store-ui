import { useState } from "react";

import type { OrderResponse } from "../../types/OrderResponse";
import { useOrders } from "../../context/useOrders";
import OrderSummary from "./OrderSummary";

type OrderCardProps = {
  order: OrderResponse;
};

function OrderCard({ order }: OrderCardProps) {
  const { cancelOrder } = useOrders();

  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const displayId = order.id.slice(0, 8).toUpperCase();

  const isPaid = ["PAID", "PACKING", "SHIPPED", "DELIVERED"].includes(
    order.status,
  );

  const canCancel = ["PLACED", "PAID"].includes(order.status);

  const handleCancel = async () => {
    setIsCancelling(true);
    setCancelError(null);

    try {
      await cancelOrder(order.id);
    } catch {
      setCancelError("Unable to cancel this order. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <article>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Order #{displayId}</h2>

          <p className="text-sm text-slate-500">
            Placed {new Date(order.orderDate).toLocaleDateString("en-NZ")}
          </p>
        </div>

        <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
          {order.status}
        </span>

        {isPaid && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Payment: Paid
          </span>
        )}
      </div>

      <p className="mt-6 text-sm font-medium text-slate-700">
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </p>

      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {order.items.map((item) => (
          <li key={item.productId}>
            {item.productName} × {item.quantity}
          </li>
        ))}
      </ul>

      <OrderSummary order={order} />

      {canCancel && (
        <div className="mt-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isCancelling}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCancelling ? "Cancelling…" : "Cancel order"}
          </button>

          {cancelError && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {cancelError}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

export default OrderCard;
