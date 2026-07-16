import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AddToCartButton from "./AddToCartButton";
import { useCart } from "../../context/CartContext";
import { testProducts } from "../../test/fixtures/products";

vi.mock("../../context/CartContext", () => ({
    useCart: vi.fn(),
}));

describe("AddToCartButton", () => {
    it("adds its product to the cart when clicked", async () => {
        const user = userEvent.setup();
        const addItem = vi.fn();
        vi.mocked(useCart).mockReturnValue({ addItem } as ReturnType<typeof useCart>);

        render(<AddToCartButton product={testProducts[0]} />);
        await user.click(screen.getByRole("button", { name: "Add to Cart" }));

        expect(addItem).toHaveBeenCalledWith(testProducts[0]);
    });
});
