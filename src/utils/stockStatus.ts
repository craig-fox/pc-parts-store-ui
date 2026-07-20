export type StockStatus = "OUT_OF_STOCK" | "LOW_STOCK" | "IN_STOCK";

export function getStockStatus(stockQuantity: number): StockStatus {
    if (stockQuantity === 0) {
        return "OUT_OF_STOCK";
    } else if (stockQuantity >= 1 && stockQuantity <= 5) {
        return "LOW_STOCK";
    } else {
        return "IN_STOCK";
    }
}
