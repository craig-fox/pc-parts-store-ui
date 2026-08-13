import { Page, expect } from "@playwright/test";
import { addProductsToCart } from "./products";

export async function goToCheckout(page: Page, productNames: string[]) {
  await addProductsToCart(page, productNames);

  await page.getByRole("link", { name: "Cart", exact: true }).click();

  await expect(
    page.getByRole("heading", { name: "Shopping Cart" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Checkout" }).click();

  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
}

export async function completeCheckoutForm(page: Page) {
  await page.getByLabel("First Name").fill("Craig");
  await page.getByLabel("Last Name").fill("Fox");
  await page.getByLabel("Email").fill("craig@example.com");
  await page.getByLabel("Address").fill("1 Main Street");
  await page.getByLabel("City").fill("Auckland");
  await page.getByLabel("Postcode").fill("1010");
  await page.getByLabel("Country").fill("New Zealand");
}
