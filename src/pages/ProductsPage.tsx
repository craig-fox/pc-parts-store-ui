import { useEffect, useMemo, useState } from "react";

import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters/ProductFilters";

import { getProducts } from "../services/productService";
import { filterProducts, sortProducts } from "../utils/productFilters";
import type { ProductSortOption } from "../types/ProductSortOption";
import type { ProductCategory } from "../types/ProductCategory";
import type { Product } from "../types/Product";

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<ProductCategory>("All");
  const [sortBy, setSortBy] = useState<ProductSortOption>("name");
  const [catalogue, setCatalogue] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setCatalogue);
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(catalogue.map((product) => product.category)),
      ).sort(),
    ];
  }, [catalogue]);

  const filteredProducts = sortProducts(
    filterProducts(catalogue, searchTerm, category),
    sortBy,
  );

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">Products</h1>

      <ProductFilters
        searchTerm={searchTerm}
        category={category}
        categories={categories}
        sortBy={sortBy}
        productCount={filteredProducts.length}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategory}
        onSortChange={setSortBy}
      />

      <ProductGrid products={filteredProducts} />
    </>
  );
}

export default ProductsPage;
