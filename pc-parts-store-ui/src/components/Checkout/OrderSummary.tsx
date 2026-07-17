import { useCart } from "../../context/CartContext";

function OrderSummary() {
    const { items, totalItems, totalPrice } = useCart();

    return (
        <aside className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-semibold">Order Summary</h2>

            <ul className="mt-6 space-y-3">
                {items.map((item) => (
                    <li key={item.product.id}>{item.product.name}</li>
                ))}
            </ul>

            <hr className="my-6 border-slate-200" />

            <dl className="space-y-4">
                <div>
                    <dt>Items</dt>
                    <dd>{totalItems}</dd>
                </div>

                <div>
                    <dt>Subtotal</dt>
                    <dd>${totalPrice}</dd>
                </div>
            </dl>
        </aside>
    );
}

export default OrderSummary;
