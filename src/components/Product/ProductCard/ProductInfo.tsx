import type { Product } from "../../../types/Product";

type ProductInfoProps = {
    product: Product;
};

function ProductInfo({ product }: ProductInfoProps) {
    return (
        <>
            <p className="text-sm text-sky-600">{product.category}</p>

            <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>

            <p className="mt-2 text-sm text-slate-600">{product.description}</p>
        </>
    );
}

export default ProductInfo;
