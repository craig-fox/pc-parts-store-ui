import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AuthProvider, useAuth } from "./AuthContext";
import { authService } from "../services/authService";

import type { LoginResponse } from "./authTypes";
import { vi, describe, beforeEach, it, expect } from "vitest";

vi.mock("../services/authService", () => ({
  authService: {
    login: vi.fn(),
  },
}));

const mockLoginResponse: LoginResponse = {
  token: "test-token",
  customerId: "11111111-1111-1111-1111-111111111111",
  firstName: "Alice",
  preferredName: null,
};

function TestConsumer() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="authenticated">
        {isAuthenticated ? "true" : "false"}
      </div>

      <div data-testid="customer-id">{user?.customerId ?? "none"}</div>

      <button
        onClick={() =>
          login({
            email: "alice.smith@example.com",
            password: "password",
          })
        }
      >
        Login
      </button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

function renderAuthContext() {
  return render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>,
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("starts unauthenticated", () => {
    renderAuthContext();

    expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    expect(screen.getByTestId("customer-id")).toHaveTextContent("none");
  });

  it("logs in and stores the authentication data", async () => {
    vi.mocked(authService.login).mockResolvedValue(mockLoginResponse);

    const user = userEvent.setup();

    renderAuthContext();

    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    });

    expect(screen.getByTestId("customer-id")).toHaveTextContent(
      mockLoginResponse.customerId,
    );

    expect(authService.login).toHaveBeenCalledWith({
      email: "alice.smith@example.com",
      password: "password",
    });

    expect(localStorage.getItem("token")).toBe(mockLoginResponse.token);
    expect(localStorage.getItem("authUser")).toBe(
      JSON.stringify(mockLoginResponse),
    );
  });

  it("logs out and clears the authentication data", async () => {
    vi.mocked(authService.login).mockResolvedValue(mockLoginResponse);

    const user = userEvent.setup();

    renderAuthContext();

    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    });

    await user.click(screen.getByRole("button", { name: "Logout" }));

    expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    expect(screen.getByTestId("customer-id")).toHaveTextContent("none");

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("authUser")).toBeNull();
  });

  it("restores the user from local storage", async () => {
    localStorage.setItem("token", mockLoginResponse.token);
    localStorage.setItem("authUser", JSON.stringify(mockLoginResponse));

    renderAuthContext();

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    });

    expect(screen.getByTestId("customer-id")).toHaveTextContent(
      mockLoginResponse.customerId,
    );
  });

  it("throws when useAuth is used outside AuthProvider", () => {
    function InvalidConsumer() {
      useAuth();
      return null;
    }

    expect(() => render(<InvalidConsumer />)).toThrow(
      "useAuth must be used within an AuthProvider",
    );
  });
});
