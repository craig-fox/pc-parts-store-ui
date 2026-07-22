import { environment } from "../config/environment";

export async function getProducts() {
  const response = await fetch(`${environment.productApiBaseUrl}/products`);

  if (!response.ok) {
    throw new Error("Unable to load products");
  }

  return response.json();
}
