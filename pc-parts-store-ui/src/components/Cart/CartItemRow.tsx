import { useCart } from "../../context/CartContext";
import type { CartItem } from "../../types/CartItem";

import ProductImage from "../Product/ProductImage";
import ProductPrice from "../Product/ProductPrice";
import QuantitySelector from "./QuantitySelector";

type CartItemRowProps = {
    item: CartItem;
};

function CartItemRow({ item }: CartItemRowProps) {

    const lineTotal = item.product.price * item.quantity;

    const { updateQuantity } = useCart();

    return (
        <div className="flex items-center gap-6 rounded-lg border border-slate-200 p-4">

            <div className="w-28 flex-shrink-0">
                <ProductImage
                    imageUrl={item.product.imageUrl}
                    name={item.product.name}
                />
            </div>

            <div className="flex-1">

                <h2 className="text-lg font-semibold">
                    {item.product.name}
                </h2>

                <p className="mt-1 text-slate-600">
                    Quantity: {item.quantity}
                </p>

            </div>

            <QuantitySelector
                quantity={item.quantity}
                onDecrease={() =>
                    updateQuantity(
                        item.product.id,
                        item.quantity - 1
                    )
                }
                onIncrease={() =>
                    updateQuantity(
                        item.product.id,
                        item.quantity + 1
                    )
                }
            />

            <div className="text-right">

                <ProductPrice
                    price={lineTotal}
                />

            </div>

        </div>
    );
}

export default CartItemRow;