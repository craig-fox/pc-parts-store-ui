import { environment } from "../config/environment";
import type { Product } from "../types/Product";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${environment.apiBaseUrl}/api/products`,
  );

  if (!response.ok) {
    throw new Error("Unable to load products");
  }

  const products: Product[] = await response.json();

  return products.map(mapProduct);
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `${environment.apiBaseUrl}/api/products/${id}`,
  );

  if (!response.ok) {
    throw new Error("Unable to load product");
  }

  const product: Product = await response.json();

  return mapProduct(product);
}

function mapProduct(product: Product): Product {
  return {
    ...product,
    imageUrl: `${environment.apiBaseUrl}${product.imageUrl}`,
  };
}