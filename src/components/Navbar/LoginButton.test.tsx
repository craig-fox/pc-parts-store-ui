import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import LoginButton from "./LoginButton";
import { useAuth } from "../../auth/AuthContext";
import userEvent from "@testing-library/user-event";

vi.mock("../../auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("LoginButton", () => {
  it("renders a Login link when the user is not authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <LoginButton />
      </MemoryRouter>,
    );

    const loginLink = screen.getByRole("link", { name: "Login" });

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("renders a Logout button when the user is authenticated", async () => {
    const logout = vi.fn();
    const user = userEvent.setup();

    vi.mocked(useAuth).mockReturnValue({
      user: {
        token: "test-token",
        customerId: "customer-123",
        firstName: "Alice",
        preferredName: null,
      },
      loading: false,
      isAuthenticated: true,
      login: vi.fn(),
      logout,
    });

    render(<LoginButton />);

    const logoutButton = screen.getByRole("button", { name: "Logout" });

    expect(logoutButton).toBeInTheDocument();

    await user.click(logoutButton);

    expect(logout).toHaveBeenCalledTimes(1);
  });
});
