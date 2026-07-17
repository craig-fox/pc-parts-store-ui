import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";

describe("Button", () => {

    it("renders its label", () => {
        render(<Button>Confirm Order</Button>);

        expect(
            screen.getByRole("button", { name: "Confirm Order" })
        ).toBeInTheDocument();
    });

    it("calls onClick when clicked", () => {
        const handleClick = vi.fn();

        render(
            <Button onClick={handleClick}>
                Confirm Order
            </Button>
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Confirm Order" })
        );

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
        const handleClick = vi.fn();

        render(
            <Button disabled onClick={handleClick}>
                Confirm Order
            </Button>
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Confirm Order" })
        );

        expect(handleClick).not.toHaveBeenCalled();
    });

    it("renders the primary variant by default", () => {
        render(<Button>Confirm Order</Button>);

        expect(
            screen.getByRole("button")
        ).toHaveClass("bg-blue-600");
    });

    it("renders the secondary variant", () => {
        render(
            <Button variant="secondary">
                Cancel
            </Button>
        );

        expect(
            screen.getByRole("button")
        ).toHaveClass("bg-gray-200");
    });

    it("renders the danger variant", () => {
        render(
            <Button variant="danger">
                Delete
            </Button>
        );

        expect(
            screen.getByRole("button")
        ).toHaveClass("bg-red-600");
    });

    it("renders as a submit button when specified", () => {
        render(
            <Button type="submit">
                Confirm Order
            </Button>
        );

        expect(
            screen.getByRole("button")
        ).toHaveAttribute("type", "submit");
    });

    it("is disabled when disabled is true", () => {
        render(
            <Button disabled>
                Confirm Order
            </Button>
        );

        expect(
            screen.getByRole("button")
        ).toBeDisabled();
    });
});