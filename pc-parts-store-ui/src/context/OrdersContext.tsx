import { createContext, useState, type PropsWithChildren, type JSX } from "react";
import type { Order } from "../types/Order";

interface OrdersContextType {
    orders: Order[];
    latestOrder: Order | undefined;
    addOrder: (order: Order) => void;
    getOrder: (id: string) => Order | undefined;
    clearOrders: () => void;
}

export const OrdersContext = createContext<OrdersContextType | undefined>(
    undefined
);

export function OrdersProvider({
    children,
}: PropsWithChildren): JSX.Element {

    const [orders, setOrders] = useState<Order[]>([]);
    const latestOrder  =
        orders.length > 0
            ? orders[orders.length - 1]
            : undefined;
    const addOrder = (order: Order) => {
        console.log("Before:", orders);
    
        setOrders(current => {
            console.log("Adding:", order);
    
            const updated = [...current, order];
    
            console.log("After:", updated);
    
            return updated;
        });
    };
    const getOrder = (id: string) => {
        return orders.find(order => order.id === id);
    };
    const clearOrders = () => {
        setOrders([]);
    };
    return (
        <OrdersContext.Provider
            value={{
                orders,
                latestOrder,
                addOrder,
                getOrder,
                clearOrders,
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
}






