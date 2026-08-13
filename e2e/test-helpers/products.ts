import { expect, type Page } from "@playwright/test";
import { testProductLookup } from "../test-data/testProductLookup";

export async function openProductsPage(page: Page) {
  await page.goto("/");

  await page.getByRole("link", { name: "Products" }).click();

  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
}


export async function addProductsToCart(page: Page, productNames: string[]) {
  await openProductsPage(page);

  for (const productName of productNames) {
    await addProductToCart(page, productName);
  }
}


export async function openCart(page: Page) {
  await page.getByRole("link", { name: /^Cart \d+$/ }).click();

  await expect(
    page.getByRole("heading", { name: "Shopping Cart" }),
  ).toBeVisible();
}

export function getProductByName(name: string) {
  const product = Object.values(testProductLookup).find(
    (product) => product.name === name,
  );

  if (!product) {
    throw new Error(`Test product not found: ${name}`);
  }

  return product;
}

export async function addProductToCart(
  page: Page,
  productName: string,
) {
  const productCard = page
    .getByTestId("product-card")
    .filter({ hasText: productName });

  await expect(productCard).toBeVisible();

  await productCard
    .getByRole("button", { name: "Add to Cart" })
    .click();
}
