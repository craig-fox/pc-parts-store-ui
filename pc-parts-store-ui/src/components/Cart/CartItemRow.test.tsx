import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CartItemRow from "./CartItemRow";
import type { Product } from "../../types/Product";
import type { CartItem } from "../../types/CartItem";

const testProduct: Product = {
    id: 1,
    name: "AMD Ryzen 7 9800X3D",
    description: "8-Core Gaming Processor",
    category: "CPU",
    price: 799,
    imageUrl: "",
    brand: "AMD",
    stockQuantity: 42,
    sku: "CPU-AMD-9800X3D",
};

describe("CartItemRow", () => {

    it("displays the product name", () => {
        const item: CartItem = { product: testProduct, quantity: 2 };

        render(<CartItemRow item={item} />);

        expect(screen.getByText("AMD Ryzen 7 9800X3D")).toBeInTheDocument();
    });

    it("displays the quantity", () => {
        const item: CartItem = { product: testProduct, quantity: 3 };

        render(<CartItemRow item={item} />);

        expect(screen.getByText("Quantity: 3")).toBeInTheDocument();
    });

    it("displays the line total as price times quantity", () => {
        const item: CartItem = { product: testProduct, quantity: 2 };

        render(<CartItemRow item={item} />);

        // 799 * 2 = 1598
        expect(screen.getByText(/1598/)).toBeInTheDocument();
    });

    it.each`
        quantity | price | expectedTotal
        ${1}     | ${799} | ${799}
        ${2}     | ${799} | ${1598}
        ${5}     | ${100} | ${500}
    `(
        "calculates $expectedTotal for quantity=$quantity and price=$price",
        ({ quantity, price, expectedTotal }) => {
            const item: CartItem = {
                product: { ...testProduct, price },
                quantity,
            };

            render(<CartItemRow item={item} />);

            expect(screen.getByText(new RegExp(String(expectedTotal)))).toBeInTheDocument();
        }
    );

});