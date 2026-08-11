import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
  type JSX,
} from "react";

import type { OrderResponse } from "../types/OrderResponse";
import { orderService } from "../services/orderService";
import { useAuth } from "../auth/AuthContext";

export type OrdersContextType = {
  orders: OrderResponse[];
  loading: boolean;
  error: string | null;
  getOrder: (id: string) => OrderResponse | undefined;
};

export const OrdersContext = createContext<OrdersContextType | undefined>(
  undefined,
);

export function OrdersProvider({ children }: PropsWithChildren): JSX.Element {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setOrders([]);
      setLoading(false);
      return;
    }

    async function loadOrders() {
      try {
        setLoading(true);
        setError(null);

        const response = await orderService.getOrders();

        setOrders(response);
      } catch (error) {
        console.error("Failed to load orders:", error);
        setError("Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [isAuthenticated]);

  const getOrder = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        error,
        getOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
