import type { OrderResponse } from "../../types/OrderResponse";
import OrderSummary from "./OrderSummary";

type OrderCardProps = {
  order: OrderResponse;
};

function OrderCard({ order }: OrderCardProps) {
  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const displayId = order.id.slice(0, 8).toUpperCase();

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
    </article>
  );
}

export default OrderCard;
