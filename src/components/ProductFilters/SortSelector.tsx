import type { ProductSortOption } from "../../types/ProductSortOption";

type SortSelectorProps = {
  value: ProductSortOption;
  onChange: (value: ProductSortOption) => void;
};

function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="sort" className="mb-2 text-sm font-medium text-slate-700">
        Sort By
      </label>

      <select
        id="sort"
        value={value}
        onChange={(event) => onChange(event.target.value as ProductSortOption)}
        className="rounded-md border border-slate-300 px-4 py-2"
      >
        <option value="name">Name</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
      </select>
    </div>
  );
}

export default SortSelector;
