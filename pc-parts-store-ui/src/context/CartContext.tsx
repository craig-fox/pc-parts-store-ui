import {
    createContext,
    useContext,
    useReducer,
    type ReactNode,
} from "react";

import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";
import { cartReducer } from "../reducers/cartReducer";

type CartContextValue = {
    items: CartItem[];

    addItem: (product: Product) => void;

    removeItem: (productId: number) => void;

    updateQuantity: (
        productId: number,
        quantity: number
    ) => void;

    clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
};

export function CartProvider({
    children,
}: CartProviderProps) {

    const [state, dispatch] = useReducer(
        cartReducer,
        {
            items: [],
        }
    );

    const value: CartContextValue = {

        items: state.items,

        addItem(product) {
            dispatch({
                type: "ADD_ITEM",
                payload: product,
            });
        },

        removeItem(productId) {
            dispatch({
                type: "REMOVE_ITEM",
                payload: productId,
            });
        },

        updateQuantity(productId, quantity) {
            dispatch({
                type: "UPDATE_QUANTITY",
                payload: {
                    productId,
                    quantity,
                },
            });
        },

        clearCart() {
            dispatch({
                type: "CLEAR_CART",
            });
        },
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );

}

export function useCart() {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used within a CartProvider"
        );
    }

    return context;

}

