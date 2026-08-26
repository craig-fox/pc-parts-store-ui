import { formatCurrency } from "../../utils/currency";

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  total: number;
};

function OrderSummary({ subtotal, shipping, total }: OrderSummaryProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
      <dl className="space-y-3 text-sm text-slate-600">
        <div className="flex justify-between gap-4">
          <dt>Subtotal</dt>
          <dd>{formatCurrency(subtotal)}</dd>
        </div>

        <div className="flex justify-between gap-4">
          <dt>Shipping</dt>
          <dd>{formatCurrency(shipping)}</dd>
        </div>

        <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd>{formatCurrency(total)}</dd>
        </div>
      </dl>
    </div>
  );
}

export default OrderSummary;
