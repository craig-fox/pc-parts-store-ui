import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";

type CartState = {
    items: CartItem[];
};


type CartAction =
    | {
        type: "ADD_ITEM";
        payload: Product;
    }
    | {
        type: "REMOVE_ITEM";
        payload: number;
    }
    | {
        type: "UPDATE_QUANTITY";
        payload: {
            productId: number;
            quantity: number;
        };
    }
    | {
        type: "CLEAR_CART";
    };


export function cartReducer(
    state: CartState,
    action: CartAction
): CartState {

    switch (action.type) {

        case "ADD_ITEM": {
            const existingItem = state.items.find(
                (item) => item.product.id === action.payload.id
            );
        
            if (existingItem) {
                return {
                    items: state.items.map((item) =>
                        item.product.id === action.payload.id
                            ? {
                                ...item,
                                quantity: item.quantity + 1,
                            }
                            : item
                    ),
                };
            }
        
            return {
                items: [
                    ...state.items,
                    {
                        product: action.payload,
                        quantity: 1,
                    },
                ],
            };
        }

        case "REMOVE_ITEM":
            return {
                items: state.items.filter(
                    (item) =>
                        item.product.id !== action.payload
                ),
            };

            case "UPDATE_QUANTITY":
                if (action.payload.quantity <= 0) {
                    return {
                        items: state.items.filter(
                            item =>
                                item.product.id !== action.payload.productId
                        ),
                    };
                }
                return {
                    items: state.items.map((item) =>
                        item.product.id === action.payload.productId
                            ? {
                                ...item,
                                quantity: action.payload.quantity,
                            }
                            : item
                    ),
                };

        case "CLEAR_CART":
            return {
                items: [],
            };

        default:
            return state;
    }

}