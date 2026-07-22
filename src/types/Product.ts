import type { ProductCategory } from "./ProductCategory";

export type Product = {
  id: string;
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
