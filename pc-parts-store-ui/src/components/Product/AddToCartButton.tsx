import type { Product } from "../../types/Product";
import { useCart } from "../../context/CartContext";
import Button from "../common/Button";

type AddToCartButtonProps = {
    product: Product;
};

function AddToCartButton({ product }: AddToCartButtonProps) {

    const { addItem } = useCart();

    return (
        <Button
            className="mt-6 w-full"
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                addItem(product);
            }}
        >
            Add to Cart
        </Button>
        
    );
}

export default AddToCartButton;