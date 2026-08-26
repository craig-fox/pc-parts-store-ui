import { type Page, expect } from "@playwright/test";
import { addProductsToCart } from "./products";
import type { E2ECustomer } from "./auth";

export async function goToCheckout(page: Page, productNames: string[]) {
  await addProductsToCart(page, productNames);

  await page.getByRole("link", { name: "Cart", exact: true }).click();

  await expect(
    page.getByRole("heading", { name: "Shopping Cart" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Checkout" }).click();

  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
}

export async function completeCheckoutForm(
  page: Page,
  customer: E2ECustomer,
) {
  await page.getByLabel("First Name").fill(customer.firstName);
  await page.getByLabel("Last Name").fill(customer.lastName);
  await page.getByLabel("Email").fill(customer.email);
  await page.getByLabel("Address").fill(customer.address);
  await page.getByLabel("City").fill("Auckland");
  await page.getByLabel("Postcode").fill("1010");
  await page.getByLabel("Country").fill("New Zealand");
}
