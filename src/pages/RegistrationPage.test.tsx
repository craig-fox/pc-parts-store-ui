import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import RegistrationPage from "./RegistrationPage";
import { customerService } from "../services/customerService";

vi.mock("../services/customerService", () => ({
  customerService: {
    registerCustomer: vi.fn(),
  },
}));

function renderRegistrationPage() {
  return render(
    <MemoryRouter>
      <RegistrationPage />
    </MemoryRouter>,
  );
}

describe("RegistrationPage", () => {
  it("renders the registration form", () => {
    renderRegistrationPage();

    expect(
      screen.getByRole("heading", { name: "Create an Account" }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Create Account" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Log in" })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("shows validation errors and does not submit invalid data", async () => {
    renderRegistrationPage();

    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    expect(screen.getByText("First name is required.")).toBeInTheDocument();

    expect(screen.getByText("Last name is required.")).toBeInTheDocument();

    expect(screen.getByText("Email is required.")).toBeInTheDocument();

    expect(screen.getByText("Address is required.")).toBeInTheDocument();

    expect(screen.getByText("Password is required.")).toBeInTheDocument();

    expect(customerService.registerCustomer).not.toHaveBeenCalled();
  });

  it("registers a customer and navigates to login", async () => {
    vi.mocked(customerService.registerCustomer).mockResolvedValue({
      id: "customer-123",
      firstName: "Craig",
      lastName: "Fox",
      displayName: "Craig",
      email: "craig@example.com",
      address: "1 Main St",
      status: "ACTIVE",
    });

    renderRegistrationPage();

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Craig" },
    });

    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Fox" },
    });

    fireEvent.change(screen.getByLabelText("Preferred Name"), {
      target: { value: "Craig" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "craig@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "1 Main St" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() => {
      expect(customerService.registerCustomer).toHaveBeenCalledWith({
        firstName: "Craig",
        lastName: "Fox",
        preferredName: "Craig",
        email: "craig@example.com",
        address: "1 Main St",
        password: "password123",
      });
    });
  });

  it("sends null when preferred name is left blank", async () => {
    vi.mocked(customerService.registerCustomer).mockResolvedValue({
      id: "customer-123",
      firstName: "Craig",
      lastName: "Fox",
      displayName: "Craig",
      email: "craig@example.com",
      address: "1 Main St",
      status: "ACTIVE",
    });

    renderRegistrationPage();

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Craig" },
    });

    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Fox" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "craig@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "1 Main St" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() => {
      expect(customerService.registerCustomer).toHaveBeenCalledWith({
        firstName: "Craig",
        lastName: "Fox",
        preferredName: null,
        email: "craig@example.com",
        address: "1 Main St",
        password: "password123",
      });
    });
  });

  it("shows an error when registration fails", async () => {
    vi.mocked(customerService.registerCustomer).mockRejectedValue(
      new Error("Customer already exists"),
    );

    renderRegistrationPage();

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Craig" },
    });

    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Fox" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "craig@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "1 Main St" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to complete registration. Please check your details and try again.",
    );
  });
});
