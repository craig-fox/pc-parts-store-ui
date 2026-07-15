import type { Product } from "../../types/Product";

import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import AddToCartButton from "./AddToCartButton";

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">

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

        </div>
    );
}

export default ProductCard;