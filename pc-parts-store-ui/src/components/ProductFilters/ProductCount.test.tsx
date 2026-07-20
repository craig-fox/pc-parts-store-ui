import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProductCount from "./ProductCount";

function hasText(node: Element, text: string) {
    return node.textContent === text;
}

function matchesTextAcrossElements(text: string) {
    return (_content: string, element: Element | null) => {
        if (!element) return false;
        const elementHasText = hasText(element, text);
        const childrenDontHaveText = Array.from(element.children).every(
            (child) => !hasText(child, text)
        );
        return elementHasText && childrenDontHaveText;
    };
}

describe("ProductCount", () => {
    it("displays the singular form for one product", () => {
        render(<ProductCount count={1} />);
        expect(
            screen.getByText(matchesTextAcrossElements("Showing 1 product"))
        ).toBeInTheDocument();
    });

    it("displays the plural form for multiple products", () => {
        render(<ProductCount count={4} />);
        expect(
            screen.getByText(matchesTextAcrossElements("Showing 4 products"))
        ).toBeInTheDocument();
    });
});
