import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import EmptyState from "./EmptyState";

describe("EmptyState", () => {
    it("renders its title, message, and optional action", () => {
        render(
            <EmptyState
                title="Nothing here"
                message="Try again later."
                action={<button type="button">Retry</button>}
            />
        );

        expect(screen.getByRole("heading", { name: "Nothing here" })).toBeInTheDocument();
        expect(screen.getByText("Try again later.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });

    it("does not render an action container when no action is supplied", () => {
        const { container } = render(
            <EmptyState title="Nothing here" message="Try again later." />
        );

        expect(container.querySelectorAll("button, a")).toHaveLength(0);
    });
});
