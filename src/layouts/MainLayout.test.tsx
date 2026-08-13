import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import MainLayout from "./MainLayout";
import { CartProvider } from "../context/CartContext";
import { useAuth } from "../auth/AuthContext";

vi.mock("../auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("MainLayout", () => {
  it("renders the navigation, routed page content, and footer", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <CartProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<h1>Page content</h1>} />
            </Route>
          </Routes>
        </CartProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Page content" }),
    ).toBeInTheDocument();
    expect(screen.getByText("© 2026 PC Parts Store")).toBeInTheDocument();
  });
});
