import type { Product } from "../../../types/Product";

import ProductPrice from "../../Product/ProductPrice";
import StockBadge from "../../Product/StockBadge";
import AddToCartButton from "../../Product/AddToCartButton";

type ProductSummaryProps = {
    product: Product;
};

function ProductSummary({ product }: ProductSummaryProps) {
    return (
        <div>
            <p className="text-sky-600">{product.category}</p>

            <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>

            <p className="mt-2 text-lg text-slate-600">{product.brand}</p>

            <div className="mt-6">
                <StockBadge stockQuantity={product.stockQuantity} />
            </div>

            <div className="mt-8">
                <ProductPrice price={product.price} />
            </div>

            <div className="mt-8 max-w-xs">
                <AddToCartButton product={product} />
            </div>
        </div>
    );
}

export default ProductSummary;
