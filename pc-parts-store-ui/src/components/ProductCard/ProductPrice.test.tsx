import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProductPrice from "./ProductPrice";

describe("ProductPrice", () => {
    it("displays whole number prices in a $###.00 format", () => {
        render(<ProductPrice price={999} />)
        expect(
            screen.getByText("$999.00")
        ).toBeInTheDocument();
    });    

    it("displays decimal prices in a $###.nn format", () => {
        render(<ProductPrice price={999.5} />)
        expect(
            screen.getByText("$999.50")
        ).toBeInTheDocument();
    });

    it("displays zero value prices in a $0.00 format", () => {
        render(<ProductPrice price={0} />)
        expect(
            screen.getByText("$0.00")
        ).toBeInTheDocument();
    });


});