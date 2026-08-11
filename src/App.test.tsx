import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import App from "./App";
import { useCart } from "./context/CartContext";
import { createMockCartContext } from "./test/mocks/cartContext";
import { useAuth } from "./auth/AuthContext";

vi.mock("./context/CartContext", () => ({
  useCart: vi.fn(),
}));

vi.mock("./auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("App", () => {
  it("renders the home route inside the application layout", () => {
    window.history.pushState({}, "", "/");
    vi.mocked(useCart).mockReturnValue(
      createMockCartContext({
        totalItems: 0,
      }),
    );

    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "Welcome to the PC Parts Store",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("© 2026 PC Parts Store")).toBeInTheDocument();
  });
});
