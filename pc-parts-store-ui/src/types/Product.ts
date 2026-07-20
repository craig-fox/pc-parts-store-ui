import type { ProductCategory } from "./ProductCategory";

export type Product = {
    id: number;
    name: string;
    description: string;
    category: ProductCategory;
    price: number;
    imageUrl: string;
    weightKg: number;
    brand: string;
    stockQuantity: number;
    sku: string;
};
