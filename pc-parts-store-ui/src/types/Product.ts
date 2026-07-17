import type { ProductCategory } from "./ProductCategory";

export type Product = {
    id: number;
    name: string;
    description: string;
    category: ProductCategory;
    price: number;
    imageUrl: string;

    brand: string;
    stockQuantity: number;
    sku: string;
}