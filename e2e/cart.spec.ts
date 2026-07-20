import { test, expect, type Page } from "@playwright/test";

async function openProductsPage(page: Page) {
    await page.goto("/");
    await page.getByRole("link", { name: "Products", exact: true }).click();
    await expect(page).toHaveURL(/\/products$/);
}

async function openCart(page: Page) {
    await page.locator('nav a[href="/cart"]').first().click();
    await expect(page).toHaveURL(/\/cart$/);
}

test("user can add products, update quantities, and remove an item", async ({ page }) => {
    
    /** Go to Products page and select products */
    await openProductsPage(page);

    const ryzenCard = page.getByTestId("product-card-1");
    const rtxCard = page.getByTestId("product-card-3");
    
    await ryzenCard.getByRole("button", { name: "Add to Cart" }).click();
    await ryzenCard.getByRole("button", { name: "Add to Cart" }).click();
    await rtxCard.getByRole("button", { name: "Add to Cart" }).click();

    await openCart(page);

    /** Go to Cart page and check results */
    const ryzenItem = page.locator("li").filter({
        has: page.getByRole("heading", { name: "AMD Ryzen 7 9800X3D" }),
    });
    const rtxItem = page.locator("li").filter({
        has: page.getByRole("heading", { name: "NVIDIA RTX 5070" }),
    });

    await expect(ryzenItem.getByText("Quantity: 2")).toBeVisible();
    await expect(rtxItem.getByText("Quantity: 1")).toBeVisible();

    /** Increase quantity and remove item */
    await ryzenItem
        .getByRole("button", { name: "Increase quantity" })
        .click();
    await expect(ryzenItem.getByText("Quantity: 3")).toBeVisible();

    await rtxItem.getByRole("button", { name: "Remove" }).click();
    await expect(
        page.getByRole("heading", { name: "NVIDIA RTX 5070" })
    ).not.toBeVisible();
    await expect(ryzenItem.getByText("Quantity: 3")).toBeVisible();
});

test("user can clear all cart items", async ({ page }) => {
    await openProductsPage(page);

    await page
        .getByTestId("product-card-5")
        .getByRole("button", { name: "Add to Cart" })
        .click();

    await openCart(page);
    await expect(
        page.getByRole("heading", { name: "Samsung 990 Pro 2TB" })
    ).toBeVisible();

    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "Clear Cart" }).click();

    await expect(page.getByText("Your cart is empty")).toBeVisible();
});
