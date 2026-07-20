import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

function CartBadge() {
    const { totalItems } = useCart();
    console.log("CartBadge rendered:", totalItems);

    return (
        <Link to="/cart" className="relative inline-flex items-center">
            <span className="text-lg font-medium">Cart</span>

            {totalItems > 0 && (
                <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-sky-600 px-2 text-xs font-semibold text-white">
                    {totalItems}
                </span>
            )}
        </Link>
    );
}

export default CartBadge;
