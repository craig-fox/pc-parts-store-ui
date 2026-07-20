import { getStockStatus } from "../../utils/stockStatus";

type StockBadgeProps = {
    stockQuantity: number;
};

function StockBadge({ stockQuantity }: StockBadgeProps) {
    const status = getStockStatus(stockQuantity);
    if (status === "OUT_OF_STOCK") {
        return (
            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                Out of Stock
            </span>
        );
    }

    if (status === "LOW_STOCK") {
        return (
            <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                Low Stock
            </span>
        );
    }

    return (
        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            In Stock
        </span>
    );
}

export default StockBadge;
