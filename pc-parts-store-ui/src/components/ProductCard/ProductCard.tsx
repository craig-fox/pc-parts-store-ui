import type { Product } from "../../types/Product";

import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import AddToCartButton from "./AddToCartButton";
import { Link } from "react-router-dom";

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    return (
        <Link to={`/products/${product.id}`} className="block">
            <ProductImage
                            imageUrl={product.imageUrl}
                            name={product.name}
            />

            <div className="p-5">
                <ProductInfo
                    product={product}
                />

                <ProductPrice price={product.price} />

                <AddToCartButton />
            </div>
        </Link>
    );
}

export default ProductCard;