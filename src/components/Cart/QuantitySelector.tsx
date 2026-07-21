type QuantitySelectorProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-md border border-slate-300">
      <button
        type="button"
        onClick={onDecrease}
        className="px-3 py-2 text-lg hover:bg-slate-100"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span className="min-w-10 px-4 text-center font-medium">{quantity}</span>

      <button
        type="button"
        onClick={onIncrease}
        className="px-3 py-2 text-lg hover:bg-slate-100"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
