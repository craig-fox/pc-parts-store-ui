import type { Product } from "../types/Product";
import ProductCard from "./Product/ProductCard/ProductCard";
import EmptyState from "./EmptyState";

type ProductGridProps = {
    products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <EmptyState
                title="No products found"
                message="Try adjusting your search or filters."
            />
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}

export default ProductGrid;