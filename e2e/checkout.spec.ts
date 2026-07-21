import { test, expect } from "@playwright/test";
import { completeCheckoutForm, goToCheckout } from "./testHelpers";

test.describe("Checkout", () => {
  test("user can successfully place an order", async ({ page }) => {
    /** Add products and navigate to checkout */
    await goToCheckout(page, [1, 3]);

    /** Ensure selected products are present */
    await expect(page.getByText("AMD Ryzen 7 9800X3D")).toBeVisible();

    await expect(page.getByText("NVIDIA RTX 5070")).toBeVisible();

    /** Fill in customer details */
    await completeCheckoutForm(page);

    /** Confirm order */
    await page
      .getByRole("button", {
        name: "Confirm Order",
      })
      .click();

    /** Verify confirmation page */
    await expect(
      page.getByRole("heading", {
        name: "Order Confirmed",
      }),
    ).toBeVisible();
  });

  test("user sees validation errors when required fields are empty", async ({
    page,
  }) => {
    await goToCheckout(page, [1]);

    await page.getByRole("button", { name: "Confirm Order" }).click();

    await expect(page.getByText("First name is required")).toBeVisible();

    await expect(page.getByText("Last name is required")).toBeVisible();

    await expect(page.getByText("Email is required")).toBeVisible();

    await expect(page.getByText("Address is required")).toBeVisible();

    await expect(page.getByText("Postcode is required")).toBeVisible();

    await expect(page.getByText("City is required")).toBeVisible();

    await expect(page.getByText("Country is required")).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Checkout",
      }),
    ).toBeVisible();
  });
});
