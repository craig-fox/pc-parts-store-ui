import { expect, type Page } from "@playwright/test";

export async function openProductsPage(page: Page) {
  await page.goto("/");

  await page.getByRole("link", { name: "Products" }).click();

  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
}

export async function openCart(page: Page) {
  await page.getByRole("link", { name: /^Cart \d+$/ }).click();

  await expect(
    page.getByRole("heading", { name: "Shopping Cart" }),
  ).toBeVisible();
}

export async function addProductToCart(
  page: Page,
  productName: string,
) {
  const card = page.getByTestId("product-card").filter({
    has: page.getByRole("heading", {
      name: productName,
    }),
  });

  await card.getByRole("button", { name: "Add to Cart" }).click();
}

export async function addProductsToCart(page: Page, productNames: string[]) {
  await openProductsPage(page);

  for (const productName of productNames) {
    await addProductToCart(page, productName);
  }
}

export async function goToCheckout(page: Page, productNames: string[]) {
  await addProductsToCart(page, productNames);
  await openCart(page);

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
