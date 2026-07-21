import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProductImage from "./ProductImage";

describe("ProductImage", () => {
  it("renders an image with accessible product text when a URL is provided", () => {
    render(<ProductImage imageUrl="/gpu.jpg" name="Gaming GPU" />);

    expect(screen.getByRole("img", { name: "Gaming GPU" })).toHaveAttribute(
      "src",
      "/gpu.jpg",
    );
  });

  it("renders a placeholder when no image URL is provided", () => {
    render(<ProductImage imageUrl="" name="Gaming GPU" />);

    expect(screen.getByText("Product Image")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
