import { useState } from "react";

import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters/ProductFilters";


import { displayProducts } from "../data/displayProducts";
import {
    filterProducts,
    sortProducts,
} from "../utils/productFilters";
import type { ProductSortOption } from "../types/ProductSortOption";
import type { ProductCategory } from "../types/ProductCategory";

function ProductsPage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState<ProductCategory>("All");
    const [sortBy, setSortBy] = useState<ProductSortOption>("name");

    const filteredProducts = sortProducts(
        filterProducts(
            displayProducts,
            searchTerm,
            category
        ),
        sortBy
    );

    return (
        <>
            <h1 className="mb-8 text-4xl font-bold">
                Products
            </h1>

            <ProductFilters
                searchTerm={searchTerm}
                category={category}
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