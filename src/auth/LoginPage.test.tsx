import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginPage from "./LoginPage";
import { useAuth } from "./AuthContext";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("./AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("LoginPage", () => {
  const mockAuthenticate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: mockAuthenticate,
      logout: vi.fn(),
    });
  });

  it("renders the login form", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("submits the entered credentials", async () => {
    mockAuthenticate.mockResolvedValue(undefined);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Email"), "alice.smith@example.com");

    await user.type(screen.getByLabelText("Password"), "password");

    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockAuthenticate).toHaveBeenCalledWith({
        email: "alice.smith@example.com",
        password: "password",
      });
    });
  });

  it("shows an error when authentication fails", async () => {
    mockAuthenticate.mockRejectedValue(new Error("Login failed"));

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Email"), "alice.smith@example.com");

    await user.type(screen.getByLabelText("Password"), "wrong-password");

    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("Invalid email or password."),
    ).toBeInTheDocument();
  });

  it("disables the login button while authentication is in progress", async () => {
    let resolveLogin: () => void;

    mockAuthenticate.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveLogin = resolve;
      }),
    );

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Email"), "alice.smith@example.com");

    await user.type(screen.getByLabelText("Password"), "password");

    const button = screen.getByRole("button", { name: "Login" });

    await user.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Logging in...");

    resolveLogin!();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    expect(button).toHaveTextContent("Login");
  });

  it("redirects to the home page after successful authentication", async () => {
    mockAuthenticate.mockResolvedValue(undefined);

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<div>Products Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Email"), "alice.smith@example.com");

    await user.type(screen.getByLabelText("Password"), "password");

    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(await screen.findByText("Products Page")).toBeInTheDocument();
  });
});
