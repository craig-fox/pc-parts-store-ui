type ProductCountProps = {
  count: number;
};

function ProductCount({ count }: ProductCountProps) {
  return (
    <div className="text-sm text-slate-600">
      Showing <span className="font-semibold">{count}</span>{" "}
      {count === 1 ? "product" : "products"}
    </div>
  );
}

export default ProductCount;
