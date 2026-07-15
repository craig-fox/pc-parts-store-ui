import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import StockBadge from "./StockBadge";

describe("StockBadge", () => {

    it("displays 'Out of Stock' when the stock quantity is zero", () => {

        render(<StockBadge stockQuantity={0} />);

        expect(
            screen.getByText("Out of Stock")
        ).toBeInTheDocument();

    });

    it("displays 'Low Stock' when the stock quantity is between one and five", () => {

        render(<StockBadge stockQuantity={3} />);

        expect(
            screen.getByText("Low Stock")
        ).toBeInTheDocument();

    });

    it("displays 'In Stock' when the stock quantity is greater than five", () => {

        render(<StockBadge stockQuantity={10} />);

        expect(
            screen.getByText("In Stock")
        ).toBeInTheDocument();

    });

    it("displays 'Low Stock' when the stock quantity is one", () => {

        render(<StockBadge stockQuantity={1} />);
    
        expect(
            screen.getByText("Low Stock")
        ).toBeInTheDocument();
    
    });
    
    it("displays 'Low Stock' when the stock quantity is five", () => {
    
        render(<StockBadge stockQuantity={5} />);
    
        expect(
            screen.getByText("Low Stock")
        ).toBeInTheDocument();
    
    });
    
    it("displays 'In Stock' when the stock quantity is six", () => {
    
        render(<StockBadge stockQuantity={6} />);
    
        expect(
            screen.getByText("In Stock")
        ).toBeInTheDocument();
    
    });

});