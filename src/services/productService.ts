import { environment } from "../config/environment";
import { localProducts } from "../fixtures/products";
import type { Product } from "../types/Product";

export async function getProducts(): Promise<Product[]> {
    if (environment.dataSource === "fixture") {
        return localProducts;
    }

    const response = await fetch(
        `${environment.productApiBaseUrl}/products`
    );

    if (!response.ok) {
        throw new Error("Unable to load products");
    }

    const products: Product[] = await response.json();

    return products.map(product => ({
        ...product,
        imageUrl: `${environment.productApiBaseUrl}${product.imageUrl}`,
    }));

    //return response.json();
}