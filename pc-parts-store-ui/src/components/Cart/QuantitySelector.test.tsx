import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import QuantitySelector from "./QuantitySelector";

describe("QuantitySelector", () => {
    it("displays the current quantity", () => {
        render(
            <QuantitySelector
                quantity={3}
                onIncrease={vi.fn()}
                onDecrease={vi.fn()}
            />
        );

        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("calls onIncrease when the plus button is clicked", async () => {
        const user = userEvent.setup();
        const onIncrease = vi.fn();

        render(
            <QuantitySelector
                quantity={2}
                onIncrease={onIncrease}
                onDecrease={vi.fn()}
            />
        );

        await user.click(
            screen.getByRole("button", {
                name: /increase quantity/i,
            })
        );

        expect(onIncrease).toHaveBeenCalledOnce();
    });

    it("calls onDecrease when the minus button is clicked", async () => {
        const user = userEvent.setup();
        const onDecrease = vi.fn();

        render(
            <QuantitySelector
                quantity={2}
                onIncrease={vi.fn()}
                onDecrease={onDecrease}
            />
        );

        await user.click(
            screen.getByRole("button", {
                name: /decrease quantity/i,
            })
        );

        expect(onDecrease).toHaveBeenCalledOnce();
    });
});