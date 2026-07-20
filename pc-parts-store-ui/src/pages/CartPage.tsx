import { Link } from "react-router-dom";
import CartItemRow from "../components/Cart/CartItemRow";
import CartSummary from "../components/Cart/CartSummary";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";
import Button from "../components/common/Button";

function CartPage() {
    const { clearCart, items } = useCart();
    const handleClearCart = () => {
        if (
            window.confirm(
                "Are you sure you want to remove all items from your cart?"
            )
        ) {
            clearCart();
        }
    };

    return (
        <div>
            <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>

            {items.length === 0 ? (
                <EmptyState
                    title="Your cart is empty"
                    message="Browse our products and add something to your cart."
                    action={
                        <Link
                            to="/products"
                            className="rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
                        >
                            Browse Products
                        </Link>
                    }
                />
            ) : (
                <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">Items</h2>

                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li key={item.product.id}>
                                    <CartItemRow item={item} />
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant="danger"
                            onClick={handleClearCart}
                            className="mt-6"
                        >
                            Clear Cart
                        </Button>
                    </section>

                    <CartSummary />
                </div>
            )}
        </div>
    );
}

export default CartPage;
