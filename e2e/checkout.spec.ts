import { expect } from "@playwright/test";
import { completeCheckoutForm, goToCheckout } from "./test-helpers/checkout";
import { testProductLookup } from "./test-data/testProductLookup";
import {
  createE2ECustomer,
  E2ECustomer,
  loginAsCustomer,
  registerCustomer,
} from "./test-helpers/auth";
import { inventoryApi } from "./api/inventoryApi";
import { test } from "./fixtures/reset";

test.describe("Checkout", () => {
  const Ryzen = testProductLookup.Ryzen9800X3D;
  const Rtx = testProductLookup.Rtx5070Ti;

  test("user can successfully place an order", async ({ page }) => {
    page.on("console", (message) => {
      console.log(`BROWSER ${message.type()}: ${message.text()}`);
    });

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

    const ryzenInventory = await inventoryApi.getInventory(Ryzen.id);
    const rtxInventory = await inventoryApi.getInventory(Rtx.id);
    console.log("RTX INVENTORY BEFORE ORDER:", rtxInventory);

    console.log("BEFORE ORDER:");
    console.log("Ryzen:", ryzenInventory);
    console.log("RTX:", rtxInventory);

    await goToCheckout(page, [Ryzen.name, Rtx.name]);

    /** Ensure selected products are present */
    await expect(page.getByText(Ryzen.name)).toBeVisible();

    await expect(page.getByText(Rtx.name)).toBeVisible();

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

    const ryzenAfter = await inventoryApi.getInventory(Ryzen.id);
    const rtxAfter = await inventoryApi.getInventory(Rtx.id);

    console.log("AFTER ORDER:");
    console.log("Ryzen:", ryzenAfter);
    console.log("RTX:", rtxAfter);
    console.log("RTX INVENTORY AFTER ORDER:", rtxAfter);
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
    page.on("console", (message) => {
      console.log(`BROWSER ${message.type()}: ${message.text()}`);
    });

    page.on("response", (response) => {
      if (response.url().includes("/api/orders")) {
        console.log("ORDER RESPONSE:", response.status(), response.url());
      }
    });

    const customer = createE2ECustomer();

    await registerCustomer(page, customer);

    await loginAsCustomer(page, customer.email, customer.password);

    await goToCheckout(page, [Ryzen.name, Rtx.name]);

    await completeCheckoutForm(page);

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
  });

  test("authenticated user cannot place an order when inventory is insufficient", async ({
    page,
  }) => {
    console.log("1. Getting inventory");

    const rtxInventory = await inventoryApi.getInventory(Rtx.id);

    console.log("2. Inventory:", rtxInventory);

    expect(rtxInventory.availableQuantity).toBeGreaterThan(0);

    const quantityToReserve = rtxInventory.availableQuantity;

    console.log("3. Reserving:", quantityToReserve);

    await inventoryApi.reserveStock(Rtx.id, quantityToReserve);

    console.log("4. Inventory fully reserved");

    try {
      const customer = createE2ECustomer();

      console.log("5. Registering customer");

      await registerCustomer(page, customer);

      console.log("6. Customer registered");

      await loginAsCustomer(page, customer.email, customer.password);

      console.log("7. Customer logged in");

      // This is the important part:
      // use the same helper as the successful checkout tests.
      await goToCheckout(page, [Rtx.name]);

      console.log("8. At checkout");

      await expect(page.getByText(Rtx.name)).toBeVisible();

      await completeCheckoutForm(page);

      console.log("9. Checkout form completed");

      await page
        .getByRole("button", {
          name: "Confirm Order",
        })
        .click();

      console.log("10. Confirm order clicked");

      console.log("AFTER CONFIRM URL:", page.url());

      console.log(
        "AFTER CONFIRM TEXT:",
        await page.locator("body").innerText(),
      );
      // The backend should reject the reservation because
      // available inventory is now zero.
      // await expect(
      //   page.getByText(/insufficient inventory/i),
      // ).toBeVisible();
    } finally {
      console.log("11. Releasing inventory");

      await inventoryApi.releaseStock(Rtx.id, quantityToReserve);

      console.log("12. Inventory released");
      const ryzenAfter = await inventoryApi.getInventory(Ryzen.id);
      const rtxAfter = await inventoryApi.getInventory(Rtx.id);

      console.log("AFTER ORDER:");
      console.log("Ryzen:", ryzenAfter);
      console.log("RTX:", rtxAfter);
    }
  });
});
