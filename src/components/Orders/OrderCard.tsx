import type { Order } from "../../types/Order";
import OrderSummary from "./OrderSummary";

type OrderCardProps = {
  order: Order;
};

function OrderCard({ order }: OrderCardProps) {
  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const displayId = order.id.slice(0, 8).toUpperCase();

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Order #{displayId}</h2>
          <p className="mt-1 text-sm text-slate-600">
            Placed {order.placedAt.toLocaleDateString("en-NZ")}
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
          <li key={item.product.id}>
            {item.product.name} × {item.quantity}
          </li>
        ))}
      </ul>

      <OrderSummary order={order} />
    </article>
  );
}

export default OrderCard;
