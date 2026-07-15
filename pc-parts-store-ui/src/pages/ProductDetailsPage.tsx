import { Link, useParams } from "react-router-dom";
import { displayProducts } from "../data/displayProducts";
import EmptyState from "../components/EmptyState";
import ProductImage from "../components/Product/ProductImage";
import ProductPrice from "../components/Product/ProductPrice";
import AddToCartButton from "../components/Product/AddToCartButton";
import StockBadge from "../components/Product/StockBadge";




function ProductDetailsPage() {
    const { id } = useParams();
    const productId = Number(id);
    const product = displayProducts.find(
        product => product.id === productId
    );
    if (!product) {
        return (
            <EmptyState
                title="Product not found"
                message="The requested product does not exist."
                backTo="/products"
                backLabel="Back to Products"
            />
        );
    }


    return (
        <>
            <Link
                to="/products"
                className="mb-8 inline-block text-sky-600 hover:text-sky-700"
            >
                ← Back to Products
            </Link>

            <div className="grid gap-10 lg:grid-cols-2">
                <ProductImage
                    imageUrl={product.imageUrl}
                    name={product.name}
                />

                <div>
                    <p className="text-sky-600">
                        {product.category}
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">
                        {product.name}
                    </h1>

                    <p className="mt-2 text-lg text-slate-600">
                        {product.brand}
                    </p>

                    <div className="mt-6">
                        <StockBadge stockQuantity={product.stockQuantity} />
                    </div>

                    <div className="mt-8">
                        <ProductPrice price={product.price} />
                    </div>

                    <div className="mt-8 max-w-xs">
                        <AddToCartButton />
                    </div>
                </div>
            </div>
            <div className="mt-12">

                <h2 className="text-2xl font-semibold">
                    Description
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                    {product.description}
                </p>

            </div>
        </>

        
    );
}

export default ProductDetailsPage;