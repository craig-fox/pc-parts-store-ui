type ProductImageProps = {
    imageUrl: string;
    name: string;
};

function ProductImage({ imageUrl, name }: ProductImageProps) {
    return (
        <div className="flex h-48 items-center justify-center bg-slate-200">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span className="text-slate-500">Product Image</span>
            )}
        </div>
    );
}

export default ProductImage;
