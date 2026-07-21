import type { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/currency";

type OrderSummaryProps = {
  order: Order;
};

function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <dl className="mt-6 space-y-3 border-t border-slate-200 pt-4 text-sm">
      <div className="flex justify-between gap-4">
        <dt>Subtotal</dt>
        <dd>{formatCurrency(order.subtotal)}</dd>
      </div>

      <div className="flex justify-between gap-4">
        <dt>Shipping</dt>
        <dd>
          {order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}
        </dd>
      </div>

      <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 text-base font-semibold">
        <dt>Total</dt>
        <dd>{formatCurrency(order.total)}</dd>
      </div>
    </dl>
  );
}

export default OrderSummary;
