import { expect, type Page } from "@playwright/test";

export async function openProductsPage(page: Page) {
    await page.goto("/");

    await page.getByRole("link", { name: "Products" }).click();

    await expect(
        page.getByRole("heading", { name: "Products" })
    ).toBeVisible();
}

export async function openCart(page: Page) {
    await page.getByRole("link", { name: /^Cart \d+$/ }).click();

    await expect(
        page.getByRole("heading", { name: "Shopping Cart" })
    ).toBeVisible();
}

export async function addProductToCart(page: Page, productId: number) {
    await page
        .getByTestId(`product-card-${productId}`)
        .getByRole("button", { name: "Add to Cart" })
        .click();
}

export async function addProductsToCart(
    page: Page,
    productIds: number[]
) {
    await openProductsPage(page);

    for (const productId of productIds) {
        await addProductToCart(page, productId);
    }
}


export async function goToCheckout(page: Page, productIds: number[]) {
    await addProductsToCart(page, productIds);
    await openCart(page);

    await page
        .getByRole("link", { name: "Checkout" })
        .click();

    await expect(
        page.getByRole("heading", { name: "Checkout" })
    ).toBeVisible();
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