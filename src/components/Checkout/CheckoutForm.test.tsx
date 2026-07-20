import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CheckoutForm from "./CheckoutForm";
import type { Checkout } from "../../types/Checkout";
import type { CheckoutErrors } from "../../types/CheckoutErrors";

function renderCheckoutForm(
    overrides: Partial<Checkout> = {},
    setCheckout = vi.fn()
) {
    const checkout: Checkout = {
        customer: {
            firstName: "",
            lastName: "",
            email: "",
        },
        shippingAddress: {
            addressLine1: "",
            city: "",
            country: "",
            postcode: "",
        },
        ...overrides,
    };

    const errors: CheckoutErrors = {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        country: "",
        postcode: "",
    };

    render(
        <CheckoutForm
            checkout={checkout}
            setCheckout={setCheckout}
            errors={errors}
        />
    );

    return { setCheckout };
}

describe("CheckoutForm", () => {
    it("renders fields for checkout contact and address details", () => {
        renderCheckoutForm();

        expect(screen.getByLabelText("First Name")).toHaveAttribute(
            "name",
            "firstName"
        );
        expect(screen.getByLabelText("Last Name")).toHaveAttribute(
            "name",
            "lastName"
        );
        expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
        expect(screen.getByLabelText("Address")).toBeInTheDocument();
        expect(screen.getByLabelText("City")).toBeInTheDocument();
        expect(screen.getByLabelText("Postcode")).toBeInTheDocument();
        expect(screen.getByLabelText("Country")).toBeInTheDocument();
    });

    it("calls setCheckout when the user types", async () => {
        const user = userEvent.setup();
        const { setCheckout } = renderCheckoutForm();
        const firstName = screen.getByLabelText("First Name");
        await user.type(firstName, "Craig");
        expect(setCheckout).toHaveBeenCalled();
    });
});
