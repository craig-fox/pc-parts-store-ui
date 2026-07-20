import type { ProductCategory } from "../../types/ProductCategory";

type CategoryFilterProps = {
    value: ProductCategory;
    onChange: (value: ProductCategory) => void;
};

function CategoryFilter({ value, onChange }: CategoryFilterProps) {
    const categories = ["All", "CPU", "GPU", "Memory", "Storage"];

    return (
        <div className="flex flex-col">
            <label
                htmlFor="category"
                className="mb-2 text-sm font-medium text-slate-700"
            >
                Category
            </label>

            <select
                id="category"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value as ProductCategory)
                }
                className="rounded-md border border-slate-300 px-4 py-2"
            >
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CategoryFilter;
