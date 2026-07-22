import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import SortSelector from "./SortSelector";
import type { ProductSortOption } from "../../types/ProductSortOption";
import type { ProductCategory } from "../../types/ProductCategory";
import ProductCount from "./ProductCount";

type ProductFiltersProps = {
  searchTerm: string;
  category: ProductCategory;
  categories: string[];
  sortBy: ProductSortOption;
  productCount: number;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: ProductCategory) => void;
  onSortChange: (value: ProductSortOption) => void;
};

function ProductFilters({
  searchTerm,
  category,
  categories,
  sortBy,
  productCount,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="mb-8 grid gap-6 rounded-lg bg-white p-6 shadow-sm md:grid-cols-3">
      <SearchInput value={searchTerm} onChange={onSearchChange} />

      <CategoryFilter categories={categories} value={category} onChange={onCategoryChange} />

      <SortSelector value={sortBy} onChange={onSortChange} />

      <div className="mt-6 flex justify-end">
        <ProductCount count={productCount} />
      </div>
    </div>
  );
}

export default ProductFilters;
