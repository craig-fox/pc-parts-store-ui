import { useCart } from "../../context/CartContext";
import { calculateShippingCost } from "../../utils/shipping";
import { formatCurrency } from "../../utils/currency";

function OrderSummary() {
  const { items, totalItems, totalPrice, totalWeight } = useCart();

  const shipping = calculateShippingCost(totalPrice, totalWeight);
  const total = totalPrice + shipping;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-semibold">Order Summary</h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between gap-4">
            <span>
              {item.product.name} × {item.quantity}
            </span>

            <span>{formatCurrency(item.product.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <hr className="my-6 border-slate-200" />

      <dl className="space-y-4">
        <div className="flex justify-between">
          <dt>Items</dt>
          <dd>{totalItems}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Weight</dt>
          <dd>{totalWeight.toFixed(2)} kg</dd>
        </div>

        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{formatCurrency(totalPrice)}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</dd>
        </div>
      </dl>

      <hr className="my-6 border-slate-200" />

      <div className="flex items-center justify-between text-lg font-semibold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </section>
  );
}

export default OrderSummary;
