import { test, expect } from "@playwright/test";

test.describe("Registration and Login", () => {
  test("user can register and then log in", async ({ page }) => {
    page.on("request", (request) => {
        if (request.url().includes("/customers")) {
          console.log("REQUEST:", request.method(), request.url());
          console.log("BODY:", request.postData());
        }
      });
      
      page.on("response", async (response) => {
        if (response.url().includes("/customers")) {
          console.log("RESPONSE:", response.status(), response.url());
          console.log("BODY:", await response.text());
        }
      });
      
    const email = `e2e-${Date.now()}@example.com`;
    const password = "password123";

    // Open registration page
    await page.goto("/register");

    await expect(
      page.getByRole("heading", { name: "Register an Account" }),
    ).toBeVisible();

    // Register
    await page.getByLabel("First Name").fill("E2E");
    await page.getByLabel("Last Name").fill("Tester");
    await page.getByLabel("Preferred Name").fill("E2E");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Address").fill("1 Main Street");
    await page.getByLabel("Password").fill(password);

    await page.getByRole("button", { name: "Register Account" }).click();

    // Successful registration should redirect to login
    await expect(page).toHaveURL(/\/login$/);

    await expect(
      page.getByRole("heading", { name: "Login" }),
    ).toBeVisible();

    // Login
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);

    await page.getByRole("button", { name: "Login" }).click();

    // Successful login should take us to products
    await expect(page).toHaveURL(/\/products$/);

    await expect(
        page.getByRole("heading", { name: "Products", exact: true }),
      ).toBeVisible();
  });
});