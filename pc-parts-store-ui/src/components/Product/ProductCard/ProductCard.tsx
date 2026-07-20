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
        <Link to={`/products/${product.id}`} className="block h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:-translate-y-1 hover:shadow-lg">
                <ProductImage imageUrl={product.imageUrl} name={product.name} />

                <div className="flex flex-1 flex-col p-5">
                    <ProductInfo product={product} />

                    <div className="mt-auto">
                        <ProductPrice price={product.price} />
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
