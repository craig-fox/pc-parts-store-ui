import { test, expect } from "@playwright/test";
import { loginAsCustomer } from "./test-helpers/auth";

test.describe("Authentication", () => {
  test("user can log in and navigate to authenticated pages", async ({
    page,
  }) => {
    const email = `e2e-auth-${Date.now()}@example.com`;
    const password = "password123";

    // Register the customer through the UI
    await page.goto("/register");

    await page.getByLabel("First Name").fill("E2E");
    await page.getByLabel("Last Name").fill("Auth");
    await page.getByLabel("Preferred Name").fill("E2E");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Address").fill("1 Main Street");
    await page.getByLabel("Password").fill(password);

    await page.getByRole("button", { name: "Register" }).click();

    await expect(page).toHaveURL(/\/login$/);

    // Now test login
    await loginAsCustomer(page, email, password);

    // Navigate to an authenticated page
    await page.getByRole("link", { name: "Orders", exact: true }).click();

    await expect(page).toHaveURL(/\/orders$/);

    await page.getByRole("link", { name: "Orders", exact: true }).click();
  });
});
