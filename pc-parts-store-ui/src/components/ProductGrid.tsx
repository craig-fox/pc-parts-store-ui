import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard/ProductCard";

type ProductGridProps = {
    products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
                <h2 className="text-xl font-semibold text-slate-700">
                    No products found
                </h2>

                <p className="mt-2 text-slate-500">
                    Try adjusting your search or filters.
                </p>
            </div>
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