import { useParams } from "react-router-dom";
import { products } from "../data/products";

function ProductDetailsPage() {
    const { id } = useParams();
    const productId = Number(id);
    const product = products.find(
        product => product.id === productId
    );
    if (!product) {
        return (
            <div>
                <h1 className="text-3xl font-bold">
                    Product not found
                </h1>
    
                <p className="mt-4 text-slate-600">
                    The requested product does not exist.
                </p>
            </div>
        );
    }


    return (
        <div>

            <h1 className="text-4xl font-bold">
                {product.name}
            </h1>

            <p className="mt-4 text-slate-600">
                {product.description}
            </p>

            <p className="mt-6 text-3xl font-bold text-sky-700">
                ${product.price.toFixed(2)}
            </p>

        </div>
    );
}

export default ProductDetailsPage;