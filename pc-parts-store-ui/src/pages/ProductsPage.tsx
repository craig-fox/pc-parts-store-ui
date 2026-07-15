import { useState } from "react";

import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters/ProductFilters";

import { products } from "../data/products";

function ProductsPage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("name");

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesCategory =
                category === "All" ||
                product.category === category;

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
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

    return (
        <>
            <h1 className="mb-8 text-4xl font-bold">
                Products
            </h1>

            <ProductFilters
                searchTerm={searchTerm}
                category={category}
                sortBy={sortBy}
                onSearchChange={setSearchTerm}
                onCategoryChange={setCategory}
                onSortChange={setSortBy}
            />

            <div className="mb-6 rounded bg-slate-200 p-4">
                <p>Search: {searchTerm}</p>
                <p>Category: {category}</p>
                <p>Sort: {sortBy}</p>
            </div>

            <ProductGrid products={filteredProducts} />
        </>
    );
}

export default ProductsPage;