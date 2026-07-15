type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
};

function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <div className="flex flex-col">
            <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-slate-700"
            >
                Search
            </label>

            <input
                id="search"
                type="text"
                value={value}
                placeholder="Search products..."
                onChange={(event) => onChange(event.target.value)}
                className="rounded-md border border-slate-300 px-4 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
        </div>
    );
}

export default SearchInput;