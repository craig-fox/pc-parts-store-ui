import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import SearchInput from "./SearchInput";
import { useState } from "react";

function SearchInputHarness() {
    const [value, setValue] = useState("");

    return (
        <SearchInput
            value={value}
            onChange={setValue}
        />
    );
}

describe("SearchInput", () => {

    it("displays the supplied value", () => {

        render(
            <SearchInput
                value="Ryzen"
                onChange={vi.fn()}
            />
        );

        expect(
            screen.getByDisplayValue("Ryzen")
        ).toBeInTheDocument();

    });

    it("updates the displayed value as the user types", async () => {
        const user = userEvent.setup();
    
        render(<SearchInputHarness />);
    
        const input = screen.getByRole("textbox");
    
        await user.type(input, "Ryzen");
    
        expect(input).toHaveValue("Ryzen");
    });

});