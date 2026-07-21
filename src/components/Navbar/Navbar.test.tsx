import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import Navbar from "./Navbar";
import { useCart } from "../../context/CartContext";
import { createMockCartContext } from "../../test/mocks/cartContext";

vi.mock("../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

describe("Navbar", () => {
  it("renders the primary navigation, logo, login, and cart links", () => {
    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        totalItems: 2,
      }),
    );

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", { name: /pc parts store/i }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "Orders" })).toHaveAttribute(
      "href",
      "/orders",
    );
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
