import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    it("updates the form values when the user types", async () => {
        const user = userEvent.setup();

        render(<CheckoutForm />);

        const firstName = screen.getByLabelText("First Name");
        const lastName = screen.getByLabelText("Last Name");
        const email = screen.getByLabelText("Email");
        const address = screen.getByLabelText("Address");
        const city = screen.getByLabelText("City");
        const postcode = screen.getByLabelText("Postcode");
        const country = screen.getByLabelText("Country");

        await user.type(firstName, "Craig");
        await user.type(lastName, "Fox");
        await user.type(email, "craig@example.com");
        await user.type(address, "123 Queen Street");
        await user.type(city, "Auckland");
        await user.type(postcode, "1010");
        await user.type(country, "New Zealand");

        expect(firstName).toHaveValue("Craig");
        expect(lastName).toHaveValue("Fox");
        expect(email).toHaveValue("craig@example.com");
        expect(address).toHaveValue("123 Queen Street");
        expect(city).toHaveValue("Auckland");
        expect(postcode).toHaveValue("1010");
        expect(country).toHaveValue("New Zealand");
    });
});