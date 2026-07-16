import { Link, useParams } from "react-router-dom";
import { displayProducts } from "../data/displayProducts";
import EmptyState from "../components/EmptyState";
import ProductImage from "../components/Product/ProductImage";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ProductSummary from "../components/Product/ProductSummary/ProductSummary";

function ProductDetailsPage() {
    const { id } = useParams();
    const productId = Number(id);
    const product = displayProducts.find(
        product => product.id === productId
    );
    if (!product) {
        return(
            <EmptyState
                title="Product not found"
                message="The requested product does not exist."
                action={
                    <Link
                        to="/products"
                        className="inline-block text-sky-600 hover:text-sky-700"
                    >
                        ← Back to Products
                    </Link>
                }
            />
        );
        
    }

    const breadcrumbs = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Products",
            href: "/products",
        },
        {
            label: product.name,
        },
    ];


    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
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

                <ProductSummary product={product} />

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