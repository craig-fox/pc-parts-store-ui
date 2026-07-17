import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CheckoutForm from "./CheckoutForm";

describe("CheckoutForm", () => {
    it("renders fields for checkout contact and address details", () => {
        render(<CheckoutForm />);

        expect(screen.getByLabelText("First Name")).toHaveAttribute("name", "firstName");
        expect(screen.getByLabelText("Last Name")).toHaveAttribute("name", "lastName");
        expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
        expect(screen.getByLabelText("Address")).toBeInTheDocument();
        expect(screen.getByLabelText("City")).toBeInTheDocument();
        expect(screen.getByLabelText("Postcode")).toBeInTheDocument();
        expect(screen.getByLabelText("Country")).toBeInTheDocument();
    });
});
