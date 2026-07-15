type SortSelectorProps = {
    value: string;
    onChange: (value: string) => void;
};

function SortSelector({
    value,
    onChange,
}: SortSelectorProps) {
    return (
        <div className="flex flex-col">
            <label
                htmlFor="sort"
                className="mb-2 text-sm font-medium text-slate-700"
            >
                Sort By
            </label>

            <select
                id="sort"
                value={value}
                onChange={(event) => onChange(event.target.value)}
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