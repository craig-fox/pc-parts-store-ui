import { Link } from "react-router-dom";
import CartItemRow from "../components/Cart/CartItemRow";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";
import CartSummary from "../components/Cart/CartSummary";

function CartPage() {

    const {
        items,
        totalItems,
        totalPrice,
    } = useCart();

    return (

        <div>

            <h1 className="mb-8 text-4xl font-bold">
                Shopping Cart
            </h1>

            {
                items.length === 0 ? (

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

                    <ul className="space-y-4">

                        {
                            items.map(item => (
                                <CartItemRow
                                    key={item.product.id}
                                    item={item}
                                />
                            ))
                        }
                        <CartSummary />

                    </ul>

                )
            }

        </div>

    );

}

export default CartPage;