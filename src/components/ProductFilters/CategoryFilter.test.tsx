import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CategoryFilter from "./CategoryFilter";

describe("CategoryFilter", () => {
  it("shows all supported categories and reports the selected category", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<CategoryFilter value="All" onChange={onChange} />);

    expect(screen.getAllByRole("option")).toHaveLength(5);
    await user.selectOptions(screen.getByLabelText("Category"), "GPU");

    expect(onChange).toHaveBeenCalledWith("GPU");
  });
});
