import type { Product } from "../../../types/Product";

import ProductImage from "../ProductImage";
import ProductInfo from "./ProductInfo";
import ProductPrice from "../ProductPrice";
import AddToCartButton from "../AddToCartButton";
import { Link } from "react-router-dom";

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    return (
        <div data-testid={`product-card-${product.id}`} 
            className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:-translate-y-1 hover:shadow-lg">

            <Link
                to={`/products/${product.id}`}
                className="block"
            >
                <ProductImage imageUrl={product.imageUrl} name={product.name} />

                <div className="p-4">
                    <ProductInfo product={product} />
                </div>
            </Link>

            <div className="mt-auto p-4 pt-0">
                <ProductPrice price={product.price} />
                <AddToCartButton product={product} />
            </div>

        </div>
    );
}

export default ProductCard;
