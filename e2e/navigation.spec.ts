import { test, expect } from "@playwright/test";

test("user can navigate between public pages from the home page", async ({
  page,
}) => {
  /** Go to Home page */
  await page.goto("/");

  /** Go to Product page */
  await expect(
    page.getByRole("heading", { name: "Welcome to the PC Parts Store" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Products", exact: true }).click();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();

  /** Go to Cart page */
  await page.locator('nav a[href="/cart"]').first().click();
  await expect(page).toHaveURL(/\/cart$/);
  await expect(
    page.getByRole("heading", { name: "Shopping Cart" }),
  ).toBeVisible();
  await expect(page.getByText("Your cart is empty")).toBeVisible();

  /** Go to Orders page. Check there are no orders */
  await page.getByRole("link", { name: "Orders", exact: true }).click();
  await expect(page).toHaveURL(/\/orders$/);
  await expect(page.getByRole("heading", { name: "My Orders" })).toBeVisible();
  await expect(page.getByText("No orders yet")).toBeVisible();

  /** Go to Login page */
  await page.getByRole("link", { name: "Login", exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  /** Go back to Home page */
  await page.locator('nav a[href="/"]').first().click();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("heading", { name: "Welcome to the PC Parts Store" }),
  ).toBeVisible();
});

test("home navigation does not expose checkout without cart items", async ({
  page,
}) => {
  await page.goto("/");

  await page.locator('nav a[href="/cart"]').first().click();

  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.getByText("Your cart is empty")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Checkout", exact: true }),
  ).not.toBeVisible();
});

test("displays the 404 page for an unknown route", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");

  await expect(page.getByRole("heading", { name: /404/i })).toBeVisible();

  await expect(page.getByRole("link", { name: /return home/i })).toBeVisible();
});
