import { describe, expect, it, vi } from "vitest";
import { useAuth } from "./AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { render, screen } from "@testing-library/react";

vi.mock("./AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to the login page", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        token: "test-token",
        customerId: "11111111-1111-1111-1111-111111111111",
        firstName: "Alice",
        preferredName: null,
      },
      loading: false,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<div>Checkout Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Checkout Page")).not.toBeInTheDocument();
  });

  it("renders the protected page for authenticated users", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        token: "test-token",
        customerId: "11111111-1111-1111-1111-111111111111",
        firstName: "Alice",
        preferredName: null,
      },
      loading: false,
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<div>Checkout Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Checkout Page")).toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });
});
