type ProductPriceProps = {
    price: number;
};

function ProductPrice({ price }: ProductPriceProps) {
    return (
        <p className="mt-4 text-2xl font-bold text-slate-800">
            ${price.toFixed(2)}
        </p>
    );
}

export default ProductPrice;
