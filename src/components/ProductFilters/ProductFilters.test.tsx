import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import ProductFilters from "./ProductFilters";
import type { ProductCategory } from "../../types/ProductCategory";
import type { ProductSortOption } from "../../types/ProductSortOption";

type ProductFiltersHarnessProps = {
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: ProductCategory) => void;
    onSortChange: (value: ProductSortOption) => void;
};

function ProductFiltersHarness({
    onSearchChange,
    onCategoryChange,
    onSortChange,
}: ProductFiltersHarnessProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState<ProductCategory>("All");
    const [sortBy, setSortBy] = useState<ProductSortOption>("name");

    return (
        <ProductFilters
            searchTerm={searchTerm}
            category={category}
            sortBy={sortBy}
            productCount={2}
            onSearchChange={(value) => {
                setSearchTerm(value);
                onSearchChange(value);
            }}
            onCategoryChange={(value) => {
                setCategory(value);
                onCategoryChange(value);
            }}
            onSortChange={(value) => {
                setSortBy(value);
                onSortChange(value);
            }}
        />
    );
}

describe("ProductFilters", () => {
    it("forwards changes from each control to its handler", async () => {
        const user = userEvent.setup();
        const onSearchChange = vi.fn();
        const onCategoryChange = vi.fn();
        const onSortChange = vi.fn();

        render(
            <ProductFiltersHarness
                onSearchChange={onSearchChange}
                onCategoryChange={onCategoryChange}
                onSortChange={onSortChange}
            />
        );

        await user.type(screen.getByLabelText("Search"), "ryzen");
        await user.selectOptions(screen.getByLabelText("Category"), "CPU");
        await user.selectOptions(screen.getByLabelText("Sort By"), "priceAsc");

        expect(onSearchChange).toHaveBeenLastCalledWith("ryzen");
        expect(onCategoryChange).toHaveBeenCalledWith("CPU");
        expect(onSortChange).toHaveBeenCalledWith("priceAsc");
        expect(screen.getByText(/Showing/)).toHaveTextContent(
            "Showing 2 products"
        );
    });
});
