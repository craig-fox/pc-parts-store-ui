import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import SortSelector from "./SortSelector";

describe("SortSelector", () => {
    it("reports the selected sort option", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();

        render(<SortSelector value="name" onChange={onChange} />);

        await user.selectOptions(screen.getByLabelText("Sort By"), "priceDesc");

        expect(onChange).toHaveBeenCalledWith("priceDesc");
    });
});
