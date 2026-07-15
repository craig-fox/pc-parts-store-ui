import { Link } from "react-router-dom";

function NavLinks() {
    return (
        <div className="flex items-center gap-8">

            <Link
                to="/"
                className="hover:text-sky-400 transition-colors"
            >
                Home
            </Link>

            <Link
                to="/products"
                className="hover:text-sky-400 transition-colors"
            >
                Products
            </Link>

            <Link
                to="/cart"
                className="hover:text-sky-400 transition-colors"
            >
                Cart
            </Link>

            <Link
                to="/orders"
                className="hover:text-sky-400 transition-colors"
            >
                Orders
            </Link>

        </div>
    );
}

export default NavLinks;