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

vi.mock("./services/productService", () => ({
  getProducts: vi.fn().mockResolvedValue([]),
  getProduct: vi.fn(),
}));

function setupUnauthenticatedUser() {
  vi.mocked(useCart).mockReturnValue(
    createMockCartContext({
      totalItems: 0,
      items: [],
    }),
  );

  vi.mocked(useAuth).mockReturnValue({
    user: null,
    isAuthenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
  });
}

function renderAtRoute(route: string) {
  window.history.pushState({}, "", route);
  setupUnauthenticatedUser();
  return render(<App />);
}

describe("App", () => {
  it("renders the home route inside the application layout", () => {
    renderAtRoute("");

    expect(
      screen.getByRole("heading", {
        name: "Welcome to the PC Parts Store",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("© 2026 PC Parts Store")).toBeInTheDocument();
  });

  it("renders the products route", async () => {
    renderAtRoute("/products");
  
    expect(
      await screen.findByRole("heading", {
        name: "Products",
      }),
    ).toBeInTheDocument();
  });
  
  it("renders the login route", () => {
    renderAtRoute("/login");
  
    expect(
      screen.getByRole("heading", {
        name: /login/i,
      }),
    ).toBeInTheDocument();
  });
  
  it("renders the registration route", () => {
    renderAtRoute("/register");
  
    expect(
      screen.getByRole("heading", {
        name: /register/i,
      }),
    ).toBeInTheDocument();
  });
  
  it("renders the cart route", () => {
    renderAtRoute("/cart");
  
    expect(
      screen.getByText("Your cart is empty"),
    ).toBeInTheDocument();
  });
  
  it("renders the not-found route", () => {
    renderAtRoute("/this-route-does-not-exist");
  
    expect(
      screen.getByRole("heading", {
        name: /404/i,
      }),
    ).toBeInTheDocument();
  });
  it("redirects unauthenticated users from checkout to login", () => {
    renderAtRoute("/checkout");
  
    expect(
      screen.getByRole("heading", {
        name: /login/i,
      }),
    ).toBeInTheDocument();
  });

  it("redirects unauthenticated users from orders to login", () => {
   renderAtRoute("/orders")
  
    expect(
      screen.getByRole("heading", {
        name: /login/i,
      }),
    ).toBeInTheDocument();
  });
});
