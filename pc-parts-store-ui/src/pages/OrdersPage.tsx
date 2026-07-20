import { Link } from "react-router-dom";

import { useOrders } from "../context/OrdersContext";
import EmptyState from "../components/EmptyState";
import OrderCard from "../components/Orders/OrderCard";

export default function OrdersPage() {
    const { orders } = useOrders();
    return <div className="mx-auto max-w-5xl p-6">
        <h1 className="mb-8 text-4xl font-bold">
                My Orders
            </h1>

            {orders.length === 0 ? (
                <EmptyState
                    title="No orders yet"
                    message="You haven't placed any orders yet."
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
                <div className="space-y-6">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
    </div>
}
