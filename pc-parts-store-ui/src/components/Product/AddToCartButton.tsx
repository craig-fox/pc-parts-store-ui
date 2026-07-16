import type { Product } from "../../types/Product";
import { useCart } from "../../context/CartContext";

type AddToCartButtonProps = {
    product: Product;
};

function AddToCartButton({ product }: AddToCartButtonProps) {

    const { addItem } = useCart();

    return (
        <button
            className="mt-6 w-full rounded-md bg-sky-600 py-2 font-medium text-white transition-colors hover:bg-sky-700"
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                addItem(product);
            }}
        >
            Add to Cart
        </button>
        
    );
}

export default AddToCartButton;