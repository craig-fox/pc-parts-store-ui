import { Link } from "react-router-dom";

import { useOrders } from "../context/useOrders";
import EmptyState from "../components/EmptyState";
import OrderCard from "../components/Orders/OrderCard";

export default function OrdersPage() {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">My Orders</h1>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">My Orders</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

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
  );
}
