import type { Product } from "../types/Product";
import type { ProductSortOption } from "../types/ProductSortOption";

export function filterProducts(
  products: Product[],
  searchTerm: string,
  category: string,
): Product[] {
  return products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });
}

export function sortProducts(
  products: Product[],
  sortBy: ProductSortOption,
): Product[] {
  const sortedProducts = [...products];

  sortedProducts.sort((a, b) => {
    switch (sortBy) {
      case "priceAsc":
        return a.price - b.price;

      case "priceDesc":
        return b.price - a.price;

      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return sortedProducts;
}
