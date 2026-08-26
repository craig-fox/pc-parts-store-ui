import { expect } from "@playwright/test";
import { completeCheckoutForm, goToCheckout } from "./test-helpers/checkout";
import { testProductLookup } from "./test-data/testProductLookup";
import {
  createE2ECustomer,
  type E2ECustomer,
  loginAsCustomer,
  registerCustomer,
  createAuthenticatedE2ECustomer,
} from "./test-helpers/auth";

import { inventoryApi } from "./api/inventoryApi";
import { test } from "./fixtures/reset";

test.describe("Checkout", () => {
  const Ryzen = testProductLookup.Ryzen9800X3D;
  const Rtx = testProductLookup.Rtx5070Ti;

  test("user can successfully place an order", async ({ page }) => {
    const customer: E2ECustomer = {
      firstName: "E2E",
      lastName: "Checkout",
      preferredName: "E2E",
      email: `e2e-checkout-${Date.now()}@example.com`,
      address: "1 Main Street",
      password: "password123",
    };

    await registerCustomer(page, customer);
    await loginAsCustomer(page, customer.email, customer.password);
    await goToCheckout(page, [Ryzen.name, Rtx.name]);

    /** Fill in customer details */
    await completeCheckoutForm(page, customer);

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
    const customer = createE2ECustomer();

    await registerCustomer(page, customer);
    await loginAsCustomer(page, customer.email, customer.password);
    await goToCheckout(page, [Ryzen.name, Rtx.name]);
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

  test("authenticated user can place an order and view it in their orders", async ({
    page,
  }) => {
    const customer = createE2ECustomer();

    await registerCustomer(page, customer);

    await loginAsCustomer(page, customer.email, customer.password);

    await goToCheckout(page, [Ryzen.name, Rtx.name]);

    await completeCheckoutForm(page, customer);

    await page
      .getByRole("button", {
        name: "Confirm Order",
      })
      .click();

    await expect(
      page.getByRole("heading", {
        name: "Order Confirmed",
      }),
    ).toBeVisible();

    const orderNumber = await page.locator("p.font-mono").textContent();

    expect(orderNumber).toBeTruthy();

    // Navigate to My Orders
    await page
      .getByRole("link", {
        name: "Orders",
        exact: true,
      })
      .click();

    await expect(
      page.getByRole("heading", {
        name: "My Orders",
      }),
    ).toBeVisible();

    await expect(page.getByText(Ryzen.name)).toBeVisible();
    await expect(page.getByText(Rtx.name)).toBeVisible();
    await expect(page.getByText("Payment: Paid")).toBeVisible();
  });

  test("authenticated user cannot place an order when inventory is insufficient", async ({
    page,
  }) => {
    const { customer, token } = await createAuthenticatedE2ECustomer();
    const rtxInventory = await inventoryApi.getInventory(Rtx.id, token);

    expect(rtxInventory.availableQuantity).toBeGreaterThan(0);

    const quantityToReserve = rtxInventory.availableQuantity;

    await inventoryApi.reserveStock(Rtx.id, quantityToReserve, token);

    try {
      await loginAsCustomer(page, customer.email, customer.password);
      await goToCheckout(page, [Rtx.name]);
      await completeCheckoutForm(page, customer);

      await page
        .getByRole("button", {
          name: "Confirm Order",
        })
        .click();
    } finally {
      await inventoryApi.releaseStock(Rtx.id, quantityToReserve, token);
    }
  });

  test("user can choose between standard and express shipping", async ({
    page,
  }) => {
    const customer = createE2ECustomer();

    await registerCustomer(page, customer);
    await loginAsCustomer(page, customer.email, customer.password);
    await goToCheckout(page, [Ryzen.name]);

    await expect(
      page.getByRole("radio", {
        name: "Standard",
      }),
    ).toBeChecked();

    await expect(page.getByText("$8.00")).toBeVisible();
    await expect(page.getByText("$907.99")).toBeVisible();

    await page
      .getByRole("radio", {
        name: "Express",
      })
      .check();

    await expect(
      page.getByRole("radio", {
        name: "Express",
      }),
    ).toBeChecked();

    await expect(page.getByText("$15.00")).toBeVisible();
    await expect(page.getByText("$914.99")).toBeVisible();
  });

  test("user can choose to enter a new shipping address", async ({ page }) => {
    const customer = createE2ECustomer();

    await registerCustomer(page, customer);
    await loginAsCustomer(page, customer.email, customer.password);

    await goToCheckout(page, [Ryzen.name]);

    await completeCheckoutForm(page, customer);

    await page
      .getByRole("button", {
        name: "Confirm Order",
      })
      .click();

    await expect(
      page.getByRole("heading", {
        name: "Order Confirmed",
      }),
    ).toBeVisible();

    await goToCheckout(page, [Ryzen.name]);

    await expect(page.getByText("Use your saved details?")).toBeVisible();

    await page
      .getByRole("button", {
        name: "Enter New Address",
      })
      .click();

    // Customer details remain saved.
    await expect(page.getByLabel("First Name")).toHaveValue(customer.firstName);

    await expect(page.getByLabel("Last Name")).toHaveValue(customer.lastName);

    await expect(page.getByLabel("Email")).toHaveValue(customer.email);

    // Address is cleared.
    await expect(page.getByLabel("Address")).toHaveValue("");

    await expect(page.getByLabel("City")).toHaveValue("");

    await expect(page.getByLabel("Postcode")).toHaveValue("");

    await expect(page.getByLabel("Country")).toHaveValue("");
  });

  test("user can reuse saved checkout details", async ({ page }) => {
    const customer = createE2ECustomer();

    await registerCustomer(page, customer);
    await loginAsCustomer(page, customer.email, customer.password);

    await goToCheckout(page, [Ryzen.name]);

    await completeCheckoutForm(page, customer);

    await page
      .getByRole("button", {
        name: "Confirm Order",
      })
      .click();

    await expect(
      page.getByRole("heading", {
        name: "Order Confirmed",
      }),
    ).toBeVisible();

    await goToCheckout(page, [Ryzen.name]);
    await expect(page.getByText("Use your saved details?")).toBeVisible();

    await page
      .getByRole("button", {
        name: "Use These Details",
      })
      .click();

    await expect(page.getByLabel("First Name")).toHaveValue(customer.firstName);

    await expect(page.getByLabel("Last Name")).toHaveValue(customer.lastName);

    await expect(page.getByLabel("Email")).toHaveValue(customer.email);

    await expect(page.getByLabel("Address")).toHaveValue(customer.address);
  });
});
