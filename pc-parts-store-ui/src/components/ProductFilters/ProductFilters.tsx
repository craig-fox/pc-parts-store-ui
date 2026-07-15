import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import SortSelector from "./SortSelector";

type ProductFiltersProps = {
    searchTerm: string;
    category: string;
    sortBy: string;
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onSortChange: (value: string) => void;
};

function ProductFilters({
    searchTerm,
    category,
    sortBy,
    onSearchChange,
    onCategoryChange,
    onSortChange,
}: ProductFiltersProps) {
    return (
        <div className="mb-8 grid gap-6 rounded-lg bg-white p-6 shadow-sm md:grid-cols-3">
            <SearchInput
                value={searchTerm}
                onChange={onSearchChange}
            />

            <CategoryFilter
                value={category}
                onChange={onCategoryChange}
            />

            <SortSelector
                value={sortBy}
                onChange={onSortChange}
            />
        </div>
    );
}

export default ProductFilters;