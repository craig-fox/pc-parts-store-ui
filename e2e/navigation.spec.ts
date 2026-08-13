import { test, expect } from "@playwright/test";

test("user can navigate between public pages from the home page", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Welcome to the PC Parts Store",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Products", exact: true }).click();

  await expect(page).toHaveURL(/\/products$/);
  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();

  await page.locator('nav a[href="/cart"]').first().click();

  await expect(page).toHaveURL(/\/cart$/);
  await expect(
    page.getByRole("heading", { name: "Shopping Cart" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Login", exact: true }).click();

  await expect(page).toHaveURL(/\/login$/);
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
