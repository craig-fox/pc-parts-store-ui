import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";

function ProductsPage() {
    return (
        <>
            <h1 className="mb-8 text-4xl font-bold">
                Products
            </h1>

            <ProductGrid products={products} />
        </>
    );
}

export default ProductsPage;