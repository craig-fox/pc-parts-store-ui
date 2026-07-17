import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function CartSummary() {
    const { totalItems, totalPrice } = useCart();

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
                    <dd>
                        {totalPrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt>Shipping</dt>
                    <dd>Calculated at checkout</dd>
                </div>
            </dl>

            <hr className="my-6 border-slate-200" />

            <Link
                to="/checkout"
                className="w-full rounded-md bg-sky-600 py-2 font-medium text-white hover:bg-sky-700"
            >
                Checkout
            </Link>
        </section>
    );
}

export default CartSummary;
