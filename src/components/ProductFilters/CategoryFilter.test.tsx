import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CategoryFilter from "./CategoryFilter";

describe("CategoryFilter", () => {
  it("renders the supplied categories and reports the selected category", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const categories = ["All", "CPU", "GPU", "Memory", "Storage"] as const;

    render(
      <CategoryFilter
        categories={[...categories]}
        value="All"
        onChange={onChange}
      />,
    );

    categories.forEach((category) => {
      expect(
        screen.getByRole("option", { name: category }),
      ).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText("Category"), "GPU");

    expect(onChange).toHaveBeenCalledWith("GPU");
  });
});
